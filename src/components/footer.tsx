import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{
        padding: '12px 24px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'var(--text-muted)',
        background: 'var(--bg-2)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span>&copy; {new Date().getFullYear()} Chih-Ho Chou</span>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <span>
          built with{' '}
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>
          {' '}+{' '}
          <a href="https://www.sanity.io/" target="_blank" rel="noopener noreferrer">Sanity</a>
        </span>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <a
          href="https://github.com/lasthero"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', display: 'flex' }}
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.209 11.385.6.111.819-.261.819-.578 0-.286-.011-1.24-.017-2.251-3.338.724-4.042-1.606-4.042-1.606-.546-1.386-1.333-1.755-1.333-1.755-1.089-.743.082-.728.082-.728 1.205.085 1.839 1.236 1.839 1.236 1.07 1.834 2.808 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.312.469-2.386 1.236-3.227-.124-.304-.536-1.527.116-3.182 0 0 1.011-.324 3.313 1.234A11.53 11.53 0 0112 5.164c1.025.003 2.054.138 3.015.405 2.301-1.558 3.311-1.234 3.311-1.234.654 1.655.244 2.878.12 3.182.771.84 1.234 1.915 1.234 3.227 0 4.61-2.807 5.622-5.478 5.921.429.371.814 1.102.814 2.218 0 1.605-.014 2.896-.014 3.29 0 .32.215.694.825.576C20.569 21.794 24 17.296 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/chih-ho-chou-7012073/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', display: 'flex' }}
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M5.24 20H2V8h3.24v12zM3.62 6.57a1.81 1.81 0 1 1-3.63 0 1.81 1.81 0 0 1 3.63 0zM20 20h-3.24v-5.71c0-1.37-.49-2.3-1.71-2.3s-2.05 1.12-2.05 2.86V20H10V8h3.19v1.52h.05c.45-.86 1.55-1.77 3.17-1.77 3.39 0 4 2.23 4 5.13V20z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
