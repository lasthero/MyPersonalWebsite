'use client';
import { useState } from 'react';
import Link from 'next/link';

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  tags?: string[];
  canonicalUrl?: string;
};

type GroupedPosts = {
  [year: string]: {
    [month: string]: Post[];
  };
};

const Tag = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? 'var(--green)' : 'var(--bg-3)',
      border: `1px solid ${active ? 'var(--green)' : 'var(--border-2)'}`,
      color: active ? 'var(--bg)' : 'var(--green)',
      fontSize: '11px',
      padding: '2px 8px',
      borderRadius: '3px',
      fontFamily: 'monospace',
      cursor: 'pointer',
      margin: '3px 4px 3px 0',
      transition: 'all 0.15s',
    }}
  >
    {label}
  </button>
);

export default function LogsClient({
  posts,
  allTags,
  activeTag,
}: {
  posts: Post[];
  allTags: string[];
  activeTag?: string;
}) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(activeTag);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['all']));

  // filter by tag
  const filtered = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts;

  // group by year → month
  const grouped = filtered.reduce<GroupedPosts>((acc, post) => {
    const date = new Date(post.publishedAt);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(post);
    return acc;
  }, {});

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '8px', fontFamily: 'monospace' }}>
          <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ ls logs/
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {selectedTag && <span> tagged <span style={{ color: 'var(--green)' }}>{selectedTag}</span></span>}
        </p>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            // filter by tag
          </div>
          <Tag
            label="all"
            active={!selectedTag}
            onClick={() => setSelectedTag(undefined)}
          />
          {allTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={selectedTag === tag}
              onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
            />
          ))}
        </div>
      )}

      {/* No posts */}
      {filtered.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'monospace' }}>
          // no posts found
        </div>
      )}

      {/* Grouped posts */}
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a)) // newest year first
        .map(([year, months]) => (
          <div key={year} style={{ marginBottom: '24px' }}>
            {/* Year header */}
            <button
              onClick={() => toggleGroup(year)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                padding: 0,
                width: '100%',
              }}
            >
              <span style={{ color: 'var(--green)', fontFamily: 'monospace', fontSize: '13px' }}>
                {expandedGroups.has(year) ? '▾' : '▸'}
              </span>
              <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '14px', fontWeight: 600 }}>
                {year}/
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {Object.values(months).flat().length} posts
              </span>
            </button>

            {expandedGroups.has(year) && (
              <div style={{ paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
                {Object.entries(months).map(([month, monthPosts]) => (
                  <div key={month} style={{ marginBottom: '20px' }}>
                    {/* Month header */}
                    <button
                      onClick={() => toggleGroup(`${year}-${month}`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px',
                        padding: 0,
                      }}
                    >
                      <span style={{ color: 'var(--green)', fontFamily: 'monospace', fontSize: '12px' }}>
                        {expandedGroups.has(`${year}-${month}`) ? '▾' : '▸'}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '12px' }}>
                        {month.toLowerCase()}/
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                        {monthPosts.length} {monthPosts.length === 1 ? 'post' : 'posts'}
                      </span>
                    </button>

                    {(expandedGroups.has(`${year}-${month}`) || !expandedGroups.has(year)) && (
                      <div style={{ paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
                        {monthPosts.map((post) => (
                          <div key={post._id} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                              <Link
                                href={`/logs/${post.slug.current}`}
                                style={{
                                  color: 'var(--text-primary)',
                                  fontFamily: 'monospace',
                                  fontSize: '13px',
                                  textDecoration: 'none',
                                  fontWeight: 500,
                                }}
                              >
                                <span style={{ color: 'var(--green)', marginRight: '8px' }}>›</span>
                                {post.title}
                                {post.canonicalUrl && (
                                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', marginLeft: '6px' }}>[medium]</span>
                                )}
                              </Link>
                              <span style={{ color: 'var(--text-muted)', fontSize: '11px', whiteSpace: 'nowrap' }}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            {post.excerpt && (
                              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '4px 0 0 16px', lineHeight: '1.6' }}>
                                {post.excerpt}
                              </p>
                            )}
                            {post.tags && post.tags.length > 0 && (
                              <div style={{ marginTop: '4px', marginLeft: '16px' }}>
                                {post.tags.map((tag) => (
                                  <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    style={{
                                      background: 'var(--bg-3)',
                                      border: '1px solid var(--border-2)',
                                      color: selectedTag === tag ? 'var(--bg)' : 'var(--green)',
                                      backgroundColor: selectedTag === tag ? 'var(--green)' : 'var(--bg-3)',
                                      fontSize: '10px',
                                      padding: '1px 6px',
                                      borderRadius: '3px',
                                      fontFamily: 'monospace',
                                      cursor: 'pointer',
                                      marginRight: '4px',
                                    }}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
