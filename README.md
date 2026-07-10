# DevScope

**GitHub Wrapped for Engineering Credibility.**

Connect your GitHub, get a shareable Engineering Score card in 60 seconds, see exactly what's holding you back.

→ [Live Demo](https://devscope.mozen.in) (coming soon)

---

## What is DevScope?

DevScope analyzes your public GitHub repositories and produces a credible, defensible Engineering Score — not vanity metrics like commits and stars, but real signal about your frontend, backend, DevOps, testing, documentation, and architecture skills.

**Free tier:**
- Connect GitHub (one OAuth click)
- Engineering Score (0–100)
- 6-axis skill radar chart
- Top 3 strengths + top 3 gaps (cited to actual repos)
- Shareable result card (OG image)
- Public profile URL

**Pro tier** (coming):
- Full 12-category skill matrix
- Repository-level deep dives
- Personalized 30/90/180-day roadmap
- AI Career Coach
- Private repo analysis
- PDF export

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js (App Router), React 19, TypeScript, Tailwind CSS v4 |
| UI | Neobrutalist design system — hard shadows, paper/ink/cyan palette |
| Auth | Better Auth + GitHub OAuth |
| Database | PostgreSQL (Neon) + Prisma ORM |
| AI | OpenRouter (model-tiered: cheap for scoring, strong for summaries) |
| Charts | Recharts (radar) |
| Animations | Framer Motion |
| OG Images | @vercel/og (Satori) |
| Deployment | Vercel |

---

## Getting Started

```bash
# Clone
git clone https://github.com/Abi-de-jo/devscope.git
cd devscope

# Install
bun install

# Set up env
cp .env.example .env
# Fill in DATABASE_URL, GitHub OAuth credentials, etc.

# Database
npx prisma migrate dev

# Run
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Random secret for Better Auth sessions |
| `BETTER_AUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI scoring |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, nav, footer)
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Neobrutalist design tokens
│   └── api/                # API routes
├── components/             # Reusable UI components
├── lib/                    # Utilities, auth config, DB client
├── server/                 # Server-side logic (scoring, GitHub sync)
└── generated/prisma/       # Prisma client (auto-generated)
prisma/
└── schema.prisma           # Database schema
```

---

## How It Works

1. **Connect** — One GitHub OAuth click (public repos only)
2. **Sync** — DevScope fetches your public repos, languages, README, topics
3. **Score** — AI analyzes code quality, architecture, docs, testing across 6 axes
4. **Share** — Get a shareable score card (auto-generated OG image)
5. **Improve** — See exactly what's holding you back, with cited evidence

---

## Design System

Neobrutalist print-editorial aesthetic:
- **Paper + ink** base (off-white `#F5F4F0` / near-black `#0B0C0E`)
- **One accent** — cyan `#00C2D1`
- **Hard shadows** — solid offset, zero blur
- **Typography** — Space Grotesk (display) + Inter (body) + JetBrains Mono (labels)

---

## Brand

**DevScope** by [Mozen.in](https://mozen.in)

---

## License

MIT © 2026 Mozen.in
