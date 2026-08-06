// MyPersonalWebsite/src/app/careerforge/support/page.tsx
// Support page for CareerForge AI — required by App Store Connect / Play Console

export const metadata = {
  title: 'CareerForge AI Support',
};

const faqs = [
  {
    q: 'How do I upload my resume?',
    a: 'On the home screen, tap "Upload Resume PDF" and select a PDF file from your device. Only PDF files are supported.',
  },
  {
    q: 'Why can I only do 5 analyses per day?',
    a: 'This limit is shared across resume parsing, job matching, and interview prep — it helps us keep the AI free for everyone. It resets at midnight and does not require an account.',
  },
  {
    q: 'Is my resume stored anywhere?',
    a: 'No. Your resume is processed only long enough to generate your analysis, then discarded. The parsed result is stored only on your device, never on our servers.',
  },
  {
    q: 'The app says "no jobs found near me" — why?',
    a: 'Job search uses a 20-mile radius around the location you enter. Try a nearby city, or leave the location field blank to search nationwide.',
  },
  {
    q: 'Can I use CareerForge AI for any industry, not just tech?',
    a: 'Yes — CareerForge AI is built to work across healthcare, education, sales, skilled trades, and more, not just software engineering roles.',
  },
  {
    q: 'How do I delete my resume from the app?',
    a: 'Go to Settings → "Clear Resume from Device." This removes it immediately from your phone.',
  },
];

export default function SupportPage() {
  return (
    <article style={{ maxWidth: '720px', fontFamily: 'monospace' }}>
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '24px' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ cat careerforge/support.md
      </div>

      <h1 style={{ color: 'var(--text-primary)', fontSize: '22px', marginBottom: '8px' }}>
        CareerForge AI Support
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8', marginBottom: '32px' }}>
        Need help with CareerForge AI? Check the common questions below, or reach out directly.
      </p>

      <div style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderLeft: '2px solid var(--green)',
        padding: '16px',
        marginBottom: '32px',
        borderRadius: '0 4px 4px 0',
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Contact
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Email: <a href="mailto:careerforge@chihho-dev.info" style={{ color: 'var(--green)' }}>careerforge@chihho-dev.info</a>
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px' }}>
          We aim to respond within 2-3 business days.
        </p>
      </div>

      <h2 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px' }}>
        Frequently Asked Questions
      </h2>

      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <p style={{ color: 'var(--green)', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
            {item.q}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
            {item.a}
          </p>
        </div>
      ))}

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          See also: <a href="/careerforge/privacy" style={{ color: 'var(--green)' }}>Privacy Policy</a>
          {' · '}
          <a href="/careerforge/terms" style={{ color: 'var(--green)' }}>Terms of Service</a>
        </p>
      </div>
    </article>
  );
}
