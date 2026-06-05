# Portfolio — Aman Shankar Singh

Personal portfolio and blog built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

## Features

- **Home** — Hero, about, featured projects, system design spotlight, skills, timeline, and contact form
- **Projects** — Filterable grid of full-stack projects with tags and highlights
- **System Design** — Architecture case studies with component diagrams and trade-off analysis
- **Blog** — Technical articles auto-synced from external repos (see [Content Sync](#content-sync))
- **Dark/Light Mode** — Theme toggle with system preference detection
- **Contact Form** — Powered by Formspree with error feedback

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Framer Motion |
| Fonts | DM Sans, Plus Jakarta Sans, JetBrains Mono |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
content/          # JSON data (site config, projects, skills, experience)
src/
  app/            # Next.js App Router pages
  components/     # UI components (layout, sections, ui)
  lib/            # Utilities and content loaders
public/           # Static assets (resume, images)
```

## Content Sync

Blog posts are automatically synced from linked repositories (e.g., [LLD-System_Design](https://github.com/singhAman05/LLD-System_Design)) via GitHub Actions. When markdown files are pushed to a source repo, a workflow dispatches an event to this repo, which fetches the latest content and deploys.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
