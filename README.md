# chihho-dev.info

Personal website and portfolio of Chih-Ho Chou (Andy) — Senior Software Engineer specializing in high-availability backend services and distributed systems.

→ [chihho-dev.info](https://chihho-dev.info)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| CMS | Sanity v6 |
| Styling | Tailwind CSS v4 + CSS variables |
| Storage | AWS S3 (resume PDF) |
| Resume Parser | pdf2json + Claude API |
| Deployment | Vercel |

## Features

- **Terminal-themed UI** — monospace font, green-on-black aesthetic, dark/light toggle
- **Dynamic resume** — PDF stored in private S3 bucket, parsed on the server via Claude API and rendered as terminal output
- **Bio via Sanity CMS** — edit content in Sanity Studio without redeployment
- **Typewriter effect** — bio text animates on page load
- **Side navigation** — sticky terminal-style nav with active state indicators
- **RSS feed reader** — pulls top Hacker News stories and Medium articles

## Project Structure

```
src/
├── app/
│   ├── articles/     # Medium RSS feed
│   ├── feeds/        # Hacker News top stories
│   ├── studio/       # Sanity Studio route
│   ├── layout.tsx    # Root layout with side nav
│   └── page.tsx      # Home — bio + resume
├── components/
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── ThemeToggle.tsx
│   └── TerminalResume.tsx
├── lib/
│   └── s3.ts         # S3 helpers + resume PDF parser
└── sanity/
    └── client.ts     # Sanity fetch client
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Studio available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment Variables

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_PROJECT_ID=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=

# Anthropic (resume parsing)
ANTHROPIC_API_KEY=
```

## License

MIT