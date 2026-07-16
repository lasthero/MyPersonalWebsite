import Assistant from '@/components/assistant';

export default function AssistantPage() {
  return (
    <div>
      <div style={{ marginBottom: '8px', color: 'var(--green)', fontSize: '13px', fontFamily: 'monospace' }}>
        <span style={{ color: 'var(--text-muted)' }}>chihho@dev</span>:~$ ./assistant.sh
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '32px', fontFamily: 'monospace' }}>
        // AI assistant — type /jobs, /kb, /career, or /code to switch modes
      </p>
      <Assistant />
    </div>
  );
}
