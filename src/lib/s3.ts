// src/lib/s3.ts
import "server-only";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION ?? "us-east-1" });

export async function getResumeUrl() {
  // List all files in the resume/ prefix
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME!,
    Prefix: "resumes/",
  });

  const listResponse = await s3.send(listCommand);

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