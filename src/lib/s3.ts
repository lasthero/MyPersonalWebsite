// src/lib/s3.ts
import "server-only";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unstable_cache } from 'next/cache';
import Anthropic from '@anthropic-ai/sdk';

const s3 = new S3Client({ region: process.env.AWS_REGION ?? "us-east-1" });
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

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

  const apiUrl = process.env.AI_API_URL;
  const apiKey = process.env.AI_API_KEY;

  if (!apiUrl || !apiKey) throw new Error('AI_API_URL or AI_API_KEY not configured');

  const ai_response = await fetch(`${apiUrl}/career`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      messages: [{
        role: 'user',
        content: `Parse this resume text into JSON. Return ONLY valid JSON, no explanation or markdown.

Schema:
{
  "name": string,
  "alias": string or null,
  "title": string,
  "contact": { "email": string, "linkedin": string, "website": string or null },
  "skills": { [category: string]: string[] },
  "experience": [{ "title": string, "company": string, "period": string, "bullets": string[] }],
  "additional": string[],
  "certifications": [{ "name": string, "year": string }]
}

Do not include phone number.

Resume text:
${text}`,
      }],
    }),
  });

  if (!ai_response.ok) {
    const err = await ai_response.json().catch(() => ({}));
    throw new Error(`AI API error: ${err.error ?? ai_response.status}`);
  }

  const data = await ai_response.json();
  const raw = data.content?.trim() ?? '';
  const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(clean);

}, ['resume-data'], { revalidate: 604800, tags: ['resume'] });

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