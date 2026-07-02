// src/lib/s3.ts
import "server-only";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unstable_cache } from 'next/cache';


const s3 = new S3Client({ region: process.env.AWS_REGION ?? "us-east-1" });

export const getResumeDataFromPdf = unstable_cache(async () => {
  // fetch PDF buffer from S3
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME!,
    Prefix: "resumes/",
  });
  const listResponse = await s3.send(listCommand);

  const pdfFiles = (listResponse.Contents ?? [])
    .filter(obj => obj.Key?.endsWith('.pdf'))
    .sort((a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0));

  if (!pdfFiles.length) throw new Error("No PDF resume found in S3");

  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: pdfFiles[0].Key!,
  });
  const response = await s3.send(getCommand);
  const buffer = await response.Body!.transformToByteArray();

  const PDFParser = (await import('pdf2json')).default;

  const text = await new Promise<string>((resolve, reject) => {
    const parser = new PDFParser(null, true); // true = raw text mode

    parser.on('pdfParser_dataReady', () => {
      resolve(parser.getRawTextContent());
    });

    parser.on('pdfParser_dataError', (err: any) => {
      reject(new Error(err.parserError));
    });

    parser.parseBuffer(Buffer.from(buffer));
  });


  // send to Claude to structure it
  const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: `Parse this resume text into JSON. Return ONLY valid JSON, no explanation or markdown. Do not include phone number.

Schema:
{
  "name": string,
  "alias": string or null,
  "title": string,
  "contact": { "email": string, "linkedin": string, "web site": string },
  "skills": { [category: string]: string[] },
  "experience": [{ "title": string, "company": string, "period": string, "bullets": string[] }],
  "additional": string[],
  "certifications": [{ "name": string, "year": string }]
}

Resume text:
${text}`
      }]
    }),
  });

  const data = await claudeResponse.json();
  const raw = data.content[0].text.trim();
  const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(clean);
},
  ['resume-data'],
  { revalidate: 3600 } // re-parse at most once per hour);
);
  

export async function getResumeUrl() {
  // List all files in the resumes/ prefix
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME!,
    Prefix: "resumes/",
  });

  const listResponse = await s3.send(listCommand);
  console.log('ListResponse', listResponse)

  if (!listResponse.Contents || listResponse.Contents.length === 0) {
    throw new Error("No resume files found in S3");
  }

  // Sort by LastModified descending, pick the newest
  const mostRecent = listResponse.Contents.sort(
    (a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0)
  )[0];

  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: mostRecent.Key!,
  });

  return getSignedUrl(s3, getCommand, { expiresIn: 900 });
}