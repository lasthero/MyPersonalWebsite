'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type NavArrayItem = {
  title: string;
  url: string;
}

const Navigation = ({ navArray }: { navArray: NavArrayItem[] }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = (
    <>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
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
                padding: '10px 16px',
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
    </>
  );

  // Desktop sidebar
  if (!isMobile) {
    return (
      <nav style={{
        width: '200px',
        minHeight: '100vh',
        background: 'var(--bg-2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        {navLinks}
      </nav>
    );
  }

  // Mobile — top bar + drawer
  return (
    <>
      {/* Mobile top bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        height: '52px',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '14px', fontFamily: 'monospace' }}>
            &lt;/&gt; AC
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            padding: '4px 8px',
            cursor: 'pointer',
            color: 'var(--green)',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          {mobileOpen ? '✕ close' : '☰ menu'}
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0,0,0,0.6)',
          }}
        />
      )}

      {/* Drawer */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 120,
        width: '220px',
        background: 'var(--bg-2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        overflowY: 'auto',
      }}>
        {navLinks}
      </nav>
    </>
  );
};

export default Navigation;
