// MyPersonalWebsite/src/app/careerforge/page.tsx
// Marketing landing page for CareerForge AI — optional Marketing URL for App Store Connect / Play Console

export const metadata = {
  title: 'CareerForge AI — Your Honest AI Career Assistant',
  description: 'Upload your resume, see your real match score against live job postings, and get tailored interview prep. No auto-apply spam, no resume stored on our servers, no subscription.',
};

const features = [
  { cmd: 'parse_resume', label: 'Parse Your Resume Instantly', desc: 'Upload a PDF and CareerForge AI reads it in seconds — experience, skills, education, credentials — across any industry.' },
  { cmd: 'match_jobs', label: 'See Your Real Match Score', desc: 'Search live postings by title and location, and get an honest AI read on how your background lines up with the role.' },
  { cmd: 'find_gaps', label: 'Know Your Strengths and Gaps', desc: 'Every match breaks down what makes you a fit, and what might be missing — no vague advice, just a straight answer.' },
  { cmd: 'prep_interview', label: 'Prepare for the Interview', desc: 'Tailored prep: likely questions, how to answer given your background, and how to frame gaps positively.' },
];

export default function CareerForgeLanding() {
  return (
    <article style={{ maxWidth: '760px', fontFamily: 'monospace' }}>
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '8px' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ ./careerforge --info
      </div>

      <h1 style={{ color: 'var(--text-primary)', fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
        CareerForge AI
      </h1>
      <p style={{ color: 'var(--green)', fontSize: '16px', marginBottom: '24px' }}>
        Your honest AI career assistant
      </p>

      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
        No auto-apply spam. No resume stored on our servers. No subscription hiding the good stuff.
        Just a straight answer on where you fit — and where you don&apos;t — across any industry.
      </p>

      {features.map((f, i) => (
        <div key={i} style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px',
        }}>
          <div style={{ color: 'var(--green)', fontSize: '12px', marginBottom: '6px' }}>
            $ {f.cmd}
          </div>
          <div style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
            {f.label}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7' }}>
            {f.desc}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a
          href="https://play.google.com/store/apps/details?id=info.chihho.careerforge"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'var(--green)',
            color: 'var(--bg)',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Get it on Google Play
        </a>
      </div>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          <a href="/careerforge/privacy" style={{ color: 'var(--green)' }}>Privacy Policy</a>
          {' · '}
          <a href="/careerforge/terms" style={{ color: 'var(--green)' }}>Terms of Service</a>
          {' · '}
          <a href="/careerforge/support" style={{ color: 'var(--green)' }}>Support</a>
        </p>
      </div>
    </article>
  );
}
