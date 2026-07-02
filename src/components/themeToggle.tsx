'use client'
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'var(--bg-3)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '4px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        transition: 'border-color 0.15s',
      }}
    >
      <span>{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? 'dark' : 'light'}</span>
    </button>
  );
}
