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

  const message = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 2000,
  system: [
  {
    type: "text",
    text: `You are an expert resume parser with deep knowledge of software engineering roles, technical skills, and career progression patterns across the technology industry.

Your sole task is to analyze raw resume text extracted from a PDF and transform it into a precise, well-structured JSON object. The resume text may contain formatting artifacts, inconsistent spacing, or garbled characters from the PDF extraction process — you should intelligently interpret and normalize the content.

STRICT OUTPUT RULES:
- Return ONLY a valid JSON object. No explanation, no preamble, no markdown code fences, no trailing comments.
- If a field cannot be found in the resume, use null for string fields and [] for array fields.
- Do not include phone numbers anywhere in the output under any circumstances.
- Do not invent or hallucinate information not present in the resume text.

CONTACT RULES:
- email: extract the email address as-is
- linkedin: extract the full LinkedIn URL including https://
- website: extract personal site URL if present; do not use LinkedIn URL here; use null if absent

SKILLS RULES:
- Group skills into logical categories such as: languages, backend, frontend, cloud, ci/cd, observability, ml/ai, databases, tools
- Do not duplicate the same skill across multiple categories
- Normalize casing consistently (e.g. "typescript" → "TypeScript", "aws" → "AWS")
- Split combined entries into individual items (e.g. "TypeScript/JavaScript" → ["TypeScript", "JavaScript"])
- Omit generic terms that are not meaningful skills (e.g. "etc", "and more")

EXPERIENCE RULES:
- title: the job title exactly as stated, including any department or team qualifier
- company: the legal or common company name only, without department suffixes
- period: normalize to "MM/YYYY – MM/YYYY" format, or "MM/YYYY – present" for current roles
- bullets: concise achievement-oriented statements; preserve all quantitative metrics such as percentages, counts, timeframes, and scale indicators; each bullet should be a complete sentence

CERTIFICATIONS RULES:
- name: full certification name as stated
- year: extract the 4-digit year only, even if a full date is provided

ADDITIONAL RULES:
- additional: list only company names for older or briefly-mentioned roles not covered in the main experience section

OUTPUT SCHEMA:
{
  "name": string,
  "alias": string or null,
  "title": string,
  "contact": {
    "email": string,
    "linkedin": string,
    "website": string or null
  },
  "skills": {
    [category: string]: string[]
  },
  "experience": [
    {
      "title": string,
      "company": string,
      "period": string,
      "bullets": string[]
    }
  ],
  "additional": string[],
  "certifications": [
    {
      "name": string,
      "year": string
    }
  ]
}`,
  cache_control: { type: "ephemeral", ttl: "1h" },
  }],
  messages: [{
    role: "user",
    content: `Parse this resume:\n\n${text}` // ← only the variable content here
  }],
});

  console.log('Full usage:', JSON.stringify(message.usage, null, 2));
  const raw = message.content[0].type === 'text' ? message.content[0].text.trim() : '';

  if (!raw) throw new Error('Empty response from Claude');

  const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(clean);
},
  ['resume-data'],
  { revalidate: 604800 }
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