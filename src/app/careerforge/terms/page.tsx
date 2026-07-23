// MyPersonalWebsite/src/app/careerforge/terms/page.tsx
// Publicly hosted terms of service for the CareerForge mobile app —
// required by App Store / Play Store submission.

export const metadata = {
  title: 'CareerForge Terms of Service',
};

export default function TermsPage() {
  return (
    <article style={{ maxWidth: '720px', fontFamily: 'monospace' }}>
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '24px' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ cat careerforge/terms-of-service.md
      </div>

      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '14px' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '22px', marginBottom: '4px' }}>
          Terms of Service — CareerForge
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '24px' }}>
          Last updated: 07/22/2026
        </p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of CareerForge (the &quot;App&quot;), developed by
          Chih-Ho Chou (&quot;we,&quot; &quot;us&quot;). By using the App, you agree to these Terms.
        </p>

        <h2 style={sectionStyle}>1. Description of Service</h2>
        <p>CareerForge lets you upload a resume, receive an AI-generated analysis of your fit against job postings, and receive AI-generated interview preparation content. Job listings are sourced from third-party job boards via the Adzuna API and may not be complete, current, or error-free.</p>

        <h2 style={sectionStyle}>2. No Account Required</h2>
        <p>The App does not require you to create an account. Your resume is processed on a per-request basis and stored locally on your device, as described in our Privacy Policy.</p>

        <h2 style={sectionStyle}>3. AI-Generated Content Disclaimer</h2>
        <p>The App uses artificial intelligence to analyze resumes, generate match scores, and produce interview preparation suggestions. <strong>This content is generated automatically and may contain errors, omissions, or inaccuracies.</strong> AI-generated match scores, suggestions, and advice:</p>
        <ul style={listStyle}>
          <li>Do not constitute professional career, legal, or employment advice</li>
          <li>Should not be relied upon as the sole basis for employment decisions</li>
          <li>May not accurately reflect actual job requirements or your genuine fit for a role</li>
        </ul>
        <p>You are solely responsible for verifying job postings, requirements, and any decisions you make based on the App&apos;s output, including whether to apply for a position.</p>

        <h2 style={sectionStyle}>4. Job Listings</h2>
        <p>Job postings displayed in the App are retrieved from third-party sources and may be outdated, filled, or inaccurate by the time you view them. We do not guarantee the accuracy, completeness, or availability of any job listing, and we are not affiliated with the employers or job boards whose postings appear in the App.</p>

        <h2 style={sectionStyle}>5. Usage Limits</h2>
        <p>To manage service costs and ensure fair access, the App enforces a daily limit on the number of resume analyses and job matches you may request. We may change this limit at any time.</p>

        <h2 style={sectionStyle}>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul style={listStyle}>
          <li>Use the App to upload content that is unlawful, fraudulent, or infringes on the rights of others</li>
          <li>Attempt to circumvent usage limits, reverse-engineer the App, or interfere with its normal operation</li>
          <li>Use the App for any purpose other than personal job-search assistance</li>
        </ul>

        <h2 style={sectionStyle}>7. No Warranty</h2>
        <p>THE APP IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not warrant that the App will be uninterrupted, error-free, or that AI-generated content will be accurate.</p>

        <h2 style={sectionStyle}>8. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP, INCLUDING BUT NOT LIMITED TO EMPLOYMENT OUTCOMES, LOST OPPORTUNITIES, OR RELIANCE ON AI-GENERATED CONTENT.</p>

        <h2 style={sectionStyle}>9. Changes to the Service</h2>
        <p>We may modify, suspend, or discontinue the App, or any part of it, at any time without notice.</p>

        <h2 style={sectionStyle}>10. Changes to These Terms</h2>
        <p>We may update these Terms from time to time. Continued use of the App after changes take effect constitutes acceptance of the revised Terms.</p>

        <h2 style={sectionStyle}>11. Governing Law</h2>
        <p>These Terms are governed by the laws of the State of New York, without regard to conflict-of-law principles, unless otherwise required by applicable consumer protection law in your jurisdiction.</p>

        <h2 style={sectionStyle}>12. Contact</h2>
        <p>Questions about these Terms can be sent to: <strong>chihho.chou@gmail.com</strong></p>
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