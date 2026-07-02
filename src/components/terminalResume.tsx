import TypewriterBio from './typewriterBio';

const Section = ({ command, children }: { command: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '12px', fontFamily: 'monospace' }}>
      <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ {command}
    </div>
    <div style={{ paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
      {children}
    </div>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--green)', fontSize: '11px', marginRight: '8px', opacity: 0.7 }}>{children}</span>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    background: 'var(--bg-3)',
    border: '1px solid var(--border-2)',
    color: 'var(--green)',
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '3px',
    fontFamily: 'monospace',
    display: 'inline-block',
    margin: '3px 4px 3px 0',
  }}>
    {children}
  </span>
);

const JobEntry = ({
  title, company, period, bullets
}: {
  title: string; company: string; period: string; bullets: string[];
}) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
      <div>
        <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{title}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}> @ </span>
        <span style={{ color: 'var(--green)', fontSize: '13px' }}>{company}</span>
      </div>
      <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{period}</span>
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7', paddingLeft: '16px', position: 'relative', marginBottom: '4px' }}>
          <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>›</span>
          {b}
        </li>
      ))}
    </ul>
  </div>
);

type ResumeData = {
  name: string;
  alias: string | null;
  title: string;
  contact: { email: string; linkedin: string; website?: string };
  skills: Record<string, string[]>;
  experience: { title: string; company: string; period: string; bullets: string[] }[];
  additional: string[];
  certifications: { name: string; year: string }[];
};

export default function TerminalResume({ resumeUrl, data, bio }: { resumeUrl: string; data: ResumeData, bio: string[] }) {
  return (
    <div style={{ fontFamily: 'monospace', maxWidth: '800px' }}>

      <Section command="cat about.md">
        <TypewriterBio lines={bio} />
      </Section>
      <Section command="whoami">
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700 }}>{data.name}</span>
          {data.alias && (
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}> / {data.alias}</span>
          )}
        </div>
        <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '12px' }}>{data.title}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <a href={`mailto:${data.contact.email}`} style={{ color: 'var(--text-secondary)' }}>
            <Label>//</Label>{data.contact.email}
          </a>
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
            <Label>//</Label>linkedin
          </a>
          <a href={data.contact.website ?? "https://chihho-dev.info"} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
            <Label>//</Label>{data.contact.website ?? "chihho-dev.info"}
          </a>
        </div>
      </Section>

      {/* Skills */}
      <Section command="cat skills.json">
        {Object.entries(data.skills).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {category}
            </div>
            {items.map(s => <Tag key={s}>{s}</Tag>)}
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section command="cat experience.md">
        {data.experience.map((job) => (
          <JobEntry
            key={`${job.company}-${job.period}`}
            title={job.title}
            company={job.company}
            period={job.period}
            bullets={job.bullets}
          />
        ))}
        {data.additional.length > 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>
            + {data.additional.join(' · ')}
          </div>
        )}
      </Section>

      {/* Certifications */}
      <Section command="ls certifications/">
        {data.certifications.map((cert) => (
          <div key={cert.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span><Label>›</Label>{cert.name}</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '16px', whiteSpace: 'nowrap' }}>{cert.year}</span>
          </div>
        ))}
      </Section>

      {/* Download */}
      <Section command="open resume.pdf --download">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-3)',
            border: '1px solid var(--green)',
            color: 'var(--green)',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '13px',
            textDecoration: 'none',
            fontFamily: 'monospace',
          }}
        >
          ↓ download resume.pdf
        </a>
      </Section>

    </div>
  );
}
