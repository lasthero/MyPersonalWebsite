'use client';
import { useEffect, useState } from 'react';

export default function TypewriterBio({ lines }: { lines: string[] }) {
  const fullText = lines.join('\n\n');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 18); // ms per character — lower = faster

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div style={{ position: 'relative' }}>
      {displayed.split('\n\n').map((para, i) => (
        <p
          key={i}
          style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '12px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {para}
        </p>
      ))}
      {/* blinking cursor while typing */}
      {!done && (
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '14px',
          background: 'var(--green)',
          verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }} />
      )}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}