import { sanityFetch } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/image';


const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  tags,
  canonicalUrl,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    _type == "block" => {
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href
        }
      }
    }
  }
}`;

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '24px 0' }}>
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? ''}
          style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
        {value.caption && (
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({ value }: any) => (
      <div style={{ margin: '20px 0' }}>
        {value.filename && (
          <div style={{
            background: 'var(--bg-3)',
            border: '1px solid var(--border)',
            borderBottom: 'none',
            padding: '6px 12px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
            borderRadius: '4px 4px 0 0',
          }}>
            {value.filename}
          </div>
        )}
        <pre style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          padding: '16px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: '1.6',
          margin: 0,
          borderRadius: value.filename ? '0 0 4px 4px' : '4px',
        }}>
          <code style={{ color: 'var(--green)', fontFamily: 'monospace' }}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 700, margin: '32px 0 12px', fontFamily: 'monospace' }}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: 600, margin: '28px 0 10px', fontFamily: 'monospace' }}>
        <span style={{ color: 'var(--green)', marginRight: '8px' }}>##</span>{children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600, margin: '24px 0 8px', fontFamily: 'monospace' }}>
        <span style={{ color: 'var(--green)', marginRight: '8px' }}>###</span>{children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px', fontSize: '14px' }}>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        borderLeft: '2px solid var(--green)',
        paddingLeft: '16px',
        margin: '20px 0',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        fontSize: '14px',
      }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }: any) => (
      <code style={{
        background: 'var(--bg-3)',
        border: '1px solid var(--border)',
        color: 'var(--green)',
        padding: '1px 5px',
        borderRadius: '3px',
        fontSize: '12px',
        fontFamily: 'monospace',
      }}>
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul style={{ margin: '0 0 16px', paddingLeft: '0', listStyle: 'none' }}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ margin: '0 0 16px', paddingLeft: '16px', color: 'var(--text-secondary)' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8', paddingLeft: '16px', position: 'relative', marginBottom: '4px' }}>
        <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>›</span>
        {children}
      </li>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← await it

  const post = await sanityFetch<SanityDocument>({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article style={{ maxWidth: '720px' }}>
      {/* Back link */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/logs"
          style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace', textDecoration: 'none' }}
        >
          ← cd ../logs
        </Link>
      </div>

      {/* Terminal prompt */}
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '20px', fontFamily: 'monospace' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ cat logs/{post.slug.current}.md
      </div>

      {/* Post header */}
      <div style={{ marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 700, margin: '0 0 10px', fontFamily: 'monospace' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{date}</span>
          {post.tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/logs?tag=${tag}`}
              style={{
                background: 'var(--bg-3)',
                border: '1px solid var(--border-2)',
                color: 'var(--green)',
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '3px',
                fontFamily: 'monospace',
                textDecoration: 'none',
              }}
            >
              {tag}
            </Link>
          ))}
          {post.canonicalUrl && (
            <a
              href={post.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'monospace' }}
            >
              originally on medium ↗
            </a>
          )}
        </div>
      </div>

      {/* Post body */}
      <div>
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {/* Footer nav */}
      <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <Link
          href="/logs"
          style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace', textDecoration: 'none' }}
        >
          ← back to logs
        </Link>
      </div>
    </article>
  );
}
