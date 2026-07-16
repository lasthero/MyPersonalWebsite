'use client';
import { useState, useRef, useEffect } from 'react';

type Mode = 'jobs' | 'kb' | 'career' | 'code';
type Role = 'user' | 'assistant';

type Message = {
  id:      string;
  role:    Role;
  content: string;
  type?:   'jobs'; // for structured job results
  data?:   any;
};

type JobMatch = {
  jobId:          string;
  jobTitle:       string;
  company:        string;
  matchScore:     number;
  matchSummary:   string;
  strengths:      string[];
  gaps:           string[];
  recommendation: string;
  applyUrl:       string;
};

type JobResult = {
  jobsAnalyzed:   number;
  overallSummary: string;
  topMatches:     JobMatch[];
  skillGaps:      string[];
};

// ── Mode config ──────────────────────────────────────────────────────────────
const MODES: Record<Mode, { label: string; placeholder: string; intro: string }> = {
  jobs: {
    label: '/jobs',
    placeholder: 'describe the role you\'re looking for...',
    intro: 'Job matcher active — I\'ll compare your resume against live postings.\nTry: "find senior SRE roles in NYC" or "am I a good fit for staff engineer?"',
  },
  kb: {
    label: '/kb',
    placeholder: 'ask a technical question... (coming soon)',
    intro: 'Knowledge base coming soon — building a RAG pipeline to index notes and articles.',
  },
  career: {
    label: '/career',
    placeholder: 'ask for career advice...',
    intro: 'Career advisor active — I know your resume. Ask about interview prep, salary negotiation, or how to position your experience.',
  },
  code: {
    label: '/code',
    placeholder: 'paste code or describe what to review...',
    intro: 'Code reviewer active — paste code and I\'ll review for correctness, performance, and best practices.',
  },
};

const SLASH_COMMANDS: Mode[] = ['jobs', 'kb', 'career', 'code'];

// ── Sub-components ───────────────────────────────────────────────────────────
const ScoreBar = ({ score }: { score: number }) => {
  const color = score >= 75 ? 'var(--green)' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
      <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ color: 'var(--green)', fontSize: '11px', fontFamily: 'monospace', minWidth: '30px' }}>{score}%</span>
    </div>
  );
};

const Tag = ({ children, highlight }: { children: string; highlight?: boolean }) => (
  <span style={{
    background: highlight ? '#14532d' : 'var(--bg-3)',
    border: `1px solid ${highlight ? '#16a34a' : 'var(--border-2)'}`,
    color: 'var(--green)',
    fontSize: '10px',
    padding: '1px 6px',
    borderRadius: '3px',
    fontFamily: 'monospace',
    display: 'inline-block',
    margin: '2px 3px 2px 0',
  }}>
    {children}
  </span>
);

const JobCard = ({ job }: { job: JobMatch }) => {
  const [open, setOpen] = useState(false);
  const recColors: Record<string, string> = {
    'strong yes': 'var(--green)',
    'yes': 'var(--green)',
    'maybe': '#f59e0b',
    'no': '#ef4444',
  };
  const color = recColors[job.recommendation] ?? 'var(--text-muted)';

  return (
    <div style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '8px', overflow: 'hidden' }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: '10px 14px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
          <div>
            <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{job.jobTitle}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}> @ {job.company}</span>
          </div>
          <span style={{ color, border: `1px solid ${color}`, fontSize: '10px', padding: '1px 6px', borderRadius: '3px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {job.recommendation}
          </span>
        </div>
        <ScoreBar score={job.matchScore} />
        <div style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5 }}>{job.matchSummary}</div>
      </div>
      {open && (
        <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--border)' }}>
          {job.strengths.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>// strengths</div>
              {job.strengths.map(s => <Tag key={s} highlight>{s}</Tag>)}
            </div>
          )}
          {job.gaps.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>// gaps</div>
              {job.gaps.map(g => <Tag key={g}>{g}</Tag>)}
            </div>
          )}
          {job.applyUrl && (
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: 'var(--green)', border: '1px solid var(--green)', padding: '4px 10px', borderRadius: '3px', fontSize: '12px', textDecoration: 'none' }}>
              → apply
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const JobResultView = ({ data }: { data: JobResult }) => (
  <div>
    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '12px' }}>
      analyzed {data.jobsAnalyzed} jobs · {data.topMatches.length} top matches
    </div>
    <div style={{ borderLeft: '2px solid var(--green)', paddingLeft: '12px', marginBottom: '16px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{data.overallSummary}</p>
    </div>
    {data.skillGaps.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>// skill gaps</div>
        {data.skillGaps.map(g => <Tag key={g}>{g}</Tag>)}
      </div>
    )}
    <div style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
      // top matches — click to expand
    </div>
    {data.topMatches.map(job => <JobCard key={job.jobId} job={job} />)}
  </div>
);

const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === 'user';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: isUser ? 'right' : 'left' }}>
        {isUser ? 'you' : 'assistant'}
      </div>
      <div style={{
        padding: '10px 14px',
        borderRadius: '4px',
        fontSize: '13px',
        lineHeight: 1.7,
        background: isUser ? '#0d2b1a' : 'var(--bg-2)',
        border: `1px solid ${isUser ? '#14532d' : 'var(--border)'}`,
        color: isUser ? 'var(--green)' : 'var(--text-secondary)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.type === 'jobs' && msg.data ? <JobResultView data={msg.data} /> : msg.content}
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
export default function Assistant() {
  const [mode, setMode]       = useState<Mode>('jobs');
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: MODES.jobs.intro },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: MODES[m].intro }]);
    inputRef.current?.focus();
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // handle slash commands
    const slash = text.match(/^\/(jobs|kb|career|code)/);
    if (slash) {
      setInput('');
      switchMode(slash[1] as Mode);
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          messages: history
            .filter(m => m.role === 'user' || (m.role === 'assistant' && !m.data))
            .map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.type === 'jobs' ? 'Here are your job matches:' : data.content,
        type: data.type,
        data: data.type === 'jobs' ? data.content : undefined,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${err.message}`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', fontFamily: 'monospace' }}>
      {/* Prompt */}
      <div style={{ color: 'var(--green)', fontSize: '13px', marginBottom: '16px' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ ./assistant.sh
      </div>

      {/* Mode chips */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {SLASH_COMMANDS.map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            style={{
              background: mode === m ? 'var(--green)' : 'var(--bg-3)',
              color: mode === m ? 'var(--bg)' : 'var(--text-muted)',
              border: `1px solid ${mode === m ? 'var(--green)' : 'var(--border)'}`,
              borderRadius: '3px',
              padding: '3px 10px',
              fontSize: '12px',
              fontFamily: 'monospace',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            /{m}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        ref={chatRef}
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
          height: '380px',
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
        {loading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>assistant</div>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px 14px', color: 'var(--text-muted)', fontSize: '13px' }}>
              thinking
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--green)' }}>_</span>
              <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: '0 0 4px 4px',
        padding: '8px 12px',
      }}>
        <span style={{ color: 'var(--green)', fontSize: '12px', flexShrink: 0 }}>[{MODES[mode].label}]~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={MODES[mode].placeholder}
          disabled={loading}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            background: loading ? 'var(--bg-3)' : 'var(--green)',
            color: loading ? 'var(--text-muted)' : 'var(--bg)',
            border: 'none',
            borderRadius: '3px',
            padding: '4px 10px',
            fontSize: '12px',
            fontFamily: 'monospace',
            cursor: loading ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
        >
          ↵
        </button>
      </div>

      {/* Help */}
      <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '8px', lineHeight: 1.8 }}>
        <span style={{ color: 'var(--green)' }}>/jobs</span> match resume to live postings &nbsp;·&nbsp;
        <span style={{ color: 'var(--green)' }}>/kb</span> knowledge base (coming soon) &nbsp;·&nbsp;
        <span style={{ color: 'var(--green)' }}>/career</span> interview prep &nbsp;·&nbsp;
        <span style={{ color: 'var(--green)' }}>/code</span> code review
      </div>
    </div>
  );
}
