// MyPersonalWebsite/src/app/careerforge/privacy/page.tsx
// Publicly hosted privacy policy for the CareerForge mobile app —
// required by App Store / Play Store submission.

export const metadata = {
  title: 'CareerForge Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <article style={{ maxWidth: '720px', fontFamily: 'monospace' }}>
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '24px' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ cat careerforge/privacy-policy.md
      </div>

      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '14px' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '22px', marginBottom: '4px' }}>
          Privacy Policy — CareerForge
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '24px' }}>
          Last updated: 07/22/2026
        </p>

        <p>
          CareerForge (&quot;the App&quot;) is developed by Chih-Ho Chou (&quot;we,&quot; &quot;us&quot;).
          This Privacy Policy explains what information the App collects, how it&apos;s used, and what it doesn&apos;t do.
        </p>

        <h2 style={sectionStyle}>Summary</h2>
        <ul style={listStyle}>
          <li>Your resume file never leaves your device except as text sent for one-time AI analysis.</li>
          <li>We do not require an account, login, email address, or password.</li>
          <li>We do not store your resume on our servers, ever.</li>
          <li>We collect minimal data: a device identifier and the job titles you search for.</li>
        </ul>

        <h2 style={sectionStyle}>Information We Collect</h2>
        <p><strong>Resume content.</strong> When you upload a resume, the App extracts its text on our server only long enough to analyze it with an AI model and return results to your device. The extracted text and any analysis results are stored locally on your device (using secure on-device storage) and are not retained on our servers after the request completes.</p>
        <p><strong>Device identifier.</strong> The App generates a random identifier stored on your device to enforce a daily usage limit (currently 3 analyses per day). This identifier is not linked to your name, email, or any other personal information we collect, since we don&apos;t collect any.</p>
        <p><strong>Search queries.</strong> When you search for jobs, the job title or keywords you enter are logged in aggregate to help us understand which job categories are commonly searched, so we can improve the freshness of cached job listings. This is stored as anonymous search-term statistics, not tied to your device identifier or any personal profile.</p>
        <p><strong>We do not collect:</strong> your name, email address, phone number, precise location, contacts, or any account credentials, because the App does not have an account system.</p>

        <h2 style={sectionStyle}>How We Use Information</h2>
        <ul style={listStyle}>
          <li>To parse your resume and generate job match analysis and interview preparation content</li>
          <li>To search for relevant job postings matching your query</li>
          <li>To enforce fair usage limits across users</li>
          <li>To improve which job categories we cache for faster results</li>
        </ul>

        <h2 style={sectionStyle}>Third-Party Services</h2>
        <p>The App relies on the following third-party services to function:</p>
        <ul style={listStyle}>
          <li><strong>Amazon Web Services (AWS)</strong> — hosts our backend infrastructure and provides the AI model (Amazon Bedrock) used to analyze resumes and generate results. Resume text is sent to AWS for processing and is not retained after the request completes.</li>
          <li><strong>Adzuna</strong> — provides job posting search results. Your search query (e.g. a job title) is sent to Adzuna to retrieve matching postings.</li>
        </ul>
        <p>Neither service receives your name, email, or any identifying information, since the App doesn&apos;t collect these in the first place.</p>

        <h2 style={sectionStyle}>Data Retention &amp; Deletion</h2>
        <ul style={listStyle}>
          <li>Your resume and its parsed content are stored only on your device. You can delete this at any time via the Settings screen (&quot;Clear Resume from Device&quot;), or by uninstalling the App.</li>
          <li>We do not retain resume content on our servers after each request is processed.</li>
          <li>Aggregate, anonymous search-term statistics are retained to improve service quality and are not personally identifiable.</li>
        </ul>

        <h2 style={sectionStyle}>Children&apos;s Privacy</h2>
        <p>The App is not directed at children under 13 (or the relevant minimum age in your jurisdiction) and we do not knowingly collect information from children.</p>

        <h2 style={sectionStyle}>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date above.</p>

        <h2 style={sectionStyle}>Contact</h2>
        <p>Questions about this policy can be sent to: <strong>chihho.chou@gmail.com</strong></p>
      </div>
    </article>
  );
}

const sectionStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  fontSize: '15px',
  marginTop: '28px',
  marginBottom: '10px',
};

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginBottom: '14px',
};