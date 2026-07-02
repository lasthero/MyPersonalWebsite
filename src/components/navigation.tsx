'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavArrayItem = {
  title: string;
  url: string;
}

const Navigation = ({ navArray }: { navArray: NavArrayItem[] }) => {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: '200px',
        minHeight: '100vh',
        background: 'var(--bg-2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: '15px', fontFamily: 'monospace' }}>
            &lt;/&gt; CH
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
            chihho-dev.info
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <div style={{ padding: '12px 0', flex: 1 }}>
        {navArray.map((item: NavArrayItem, ind: number) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={`navItem_${ind}`}
              href={item.url}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '13px',
                color: isActive ? 'var(--green)' : 'var(--text-secondary)',
                textDecoration: 'none',
                borderLeft: isActive ? '2px solid var(--green)' : '2px solid transparent',
                background: isActive ? 'var(--bg)' : 'transparent',
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              <span style={{ color: isActive ? 'var(--green)' : 'var(--text-muted)', fontSize: '11px' }}>~$</span>
              {item.title.toLowerCase()}
            </Link>
          );
        })}
      </div>

      {/* Footer info */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.6' }}>
          <div>next v16</div>
          <div>sanity cms</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
