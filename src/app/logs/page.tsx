import { sanityFetch } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import LogsClient from './logsClient';

export const dynamic = 'force-dynamic';

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  tags,
  canonicalUrl
}`;

export default async function LogsPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await sanityFetch<SanityDocument[]>({ query: POSTS_QUERY });

  // collect all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p: any) => p.tags ?? []))
  ).sort() as string[];

  return <LogsClient posts={posts as any[]} allTags={allTags} activeTag={searchParams.tag} />;
}
