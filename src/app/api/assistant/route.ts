import { NextRequest, NextResponse } from 'next/server';

const AI_API_ENDPOINTS: Record<string, string> = {
  jobs:   'analyze',
  career: 'career',
  code:   'code',
};

export async function POST(request: NextRequest) {
  try {
    const { mode, messages } = await request.json() as {
      mode: string;
      messages: { role: string; content: string }[];
    };

    // kb is a placeholder until RAG is built
    if (mode === 'kb') {
      return NextResponse.json({
        content: "Knowledge base coming soon — I'm building a RAG pipeline to index my notes and articles. Check back later!",
      });
    }

    const endpoint = AI_API_ENDPOINTS[mode];
    if (!endpoint) {
      return NextResponse.json({ error: `Unknown mode: ${mode}` }, { status: 400 });
    }

    const apiUrl = process.env.AI_API_URL;
    const apiKey = process.env.AI_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json({
        content: 'Assistant is not configured yet — MCP server is being deployed.',
      });
    }

    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { error: err.error ?? 'API server error' },
        { status: res.status }
      );
    }

    const data = await res.json();

    // jobs mode returns structured data
    if (mode === 'jobs') {
      return NextResponse.json({ type: 'jobs', content: data });
    }

    return NextResponse.json({ content: data.content });

  } catch (err: any) {
    console.error('Assistant API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}