# Meridian — Corporate Lead Generation Platform

[![Live Demo](https://img.shields.io/badge/demo-corporate--leadgen--platform.vercel.app-brightgreen?style=flat-square)](https://corporate-leadgen-platform.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![NextAuth](https://img.shields.io/badge/NextAuth-v5-blue?style=flat-square)](https://authjs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)


Meridian is a full-stack enterprise marketing platform: a WebGL-driven marketing site, a headless CMS, a lead CRM, and an authenticated admin dashboard, all in one Next.js 15 codebase.

It's built as a portfolio-grade demonstration of production frontend and full-stack engineering — real database schema, real server actions, real auth, real charts — not a static template.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8) ![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)

## What's inside

- **Marketing site** — hero with a custom React Three Fiber + GLSL shader scene, scroll-driven reveals (Framer Motion + Lenis), an interactive dashboard preview (Recharts), testimonials, an engineering showcase, and case studies.
- **Case studies** — four full, in-depth engagement write-ups (problem → research → architecture → results → lessons learned), each backed by a real relational schema.
- **Blog** — Tiptap-powered rich text authoring in the admin, category/tag filtering, search, pagination, related posts, and a generated RSS feed.
- **CRM** — a lead pipeline with statuses, tags, notes, activity timelines, assignment, email notifications (Resend), and CSV export.
- **Admin dashboard** — analytics (Recharts), full CRUD for every content type, role-based access (Admin / Editor / Viewer), scoped dark mode, and a media library backed by Cloudinary.
- **Auth** — NextAuth v5: email/password, Google, GitHub, forgot/reset password, middleware-protected routes.
- **SEO** — Metadata API, dynamic Open Graph images, Schema.org JSON-LD, sitemap.xml, robots.txt, canonical URLs, RSS.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, custom design tokens (no black background — warm white / soft gray / mesh gradients) |
| Motion | Framer Motion, GSAP-style scroll reveals, Lenis smooth scroll |
| 3D | React Three Fiber, Drei, hand-written GLSL shaders |
| UI primitives | Radix UI + a small shadcn-style component layer |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (Credentials, Google, GitHub) |
| Email | Resend |
| Media | Cloudinary |
| Rich text | Tiptap |

## Getting started

### 1. Prerequisites

- Node.js 20+
- Docker (for local Postgres) — or any reachable PostgreSQL 14+ instance

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in at least `DATABASE_URL` and `AUTH_SECRET` (generate one with `npx auth secret`) to run locally. OAuth, Resend, and Cloudinary credentials are optional — the app degrades gracefully without them (see [Notes on running without every credential](#notes-on-running-without-every-credential)).

### 4. Start Postgres

```bash
docker compose up -d
```

This provisions a local Postgres instance matching the default `DATABASE_URL` in `.env.example`.

### 5. Run migrations and seed data

```bash
npx prisma migrate deploy
npm run db:seed
```

Seeding creates:

- An admin user — `admin@meridian.io` / `Password123!`
- An editor user — `editor@meridian.io` / `Password123!`
- All homepage content, 4 projects, 4 full case studies, 6 blog posts, testimonials, clients, FAQs, sample leads, and site settings.

**Change these seeded passwords immediately in any environment beyond local development.**

### 6. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` for the marketing site and `http://localhost:3000/admin` for the dashboard (sign in with the seeded admin account).

> The app is built to boot and render real content even without a database connection — every public data query has a curated fallback. This means `npm install && npm run dev` works immediately for evaluating the frontend, even before Postgres is configured. Admin/CRM screens do require a live database.

## Project structure

```
app/                    Next.js App Router routes
  (marketing)/          Public site: home, case studies, blog, contact, legal
  (auth)/                Login, register, forgot/reset password
  admin/                 Protected admin dashboard, CRM, and CMS screens
  api/                   Route handlers (NextAuth, CSV export)
components/
  ui/                    Design-system primitives (button, card, dialog, table, ...)
  webgl/                 React Three Fiber scenes and GLSL shaders
  shared/                Navbar, footer, reveal/marquee/tilt-card animation helpers
features/                Feature-scoped UI: home sections, blog, CRM, admin screens
hooks/                   Shared client hooks
lib/                     Constants, utilities, Zod schemas, seed/fallback content data
server/queries/          Server-side data-fetching with DB-fallback resilience
actions/                 Server Actions (mutations) per domain
services/                Email (Resend), Cloudinary, Prisma-adjacent integrations
providers/               Client-side context providers (Lenis, theme, session, cursor)
emails/                  Transactional email HTML templates
prisma/                  Schema, migrations, seed script
types/                   Shared/ambient TypeScript types
scripts/                 One-off tooling (cover-art generator)
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build (also type-checks and lints) |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Seed the database with realistic content |
| `npm run db:migrate` | Apply migrations (production-safe, no prompts) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:reset` | Reset the database and re-seed (destructive, local only) |

## Notes on running without every credential

Several integrations are optional at runtime and fail gracefully rather than crashing the app:

- **No `DATABASE_URL` reachable** — public pages (home, case studies, blog) fall back to the same curated content used to seed the database. Admin/CRM pages require a real connection.
- **No `RESEND_API_KEY`** — transactional emails are logged to the server console instead of sent.
- **No Cloudinary credentials** — the media library upload widget renders but uploads will fail until configured.
- **No Google/GitHub OAuth credentials** — those sign-in buttons will error if clicked; email/password auth still works.

## Deployment (Vercel + managed Postgres)

1. Push this repository to GitHub (see below).
2. Provision a Postgres database (Vercel Postgres, Neon, Supabase, or RDS all work).
3. Import the repo into [Vercel](https://vercel.com/new).
4. Add every variable from `.env.example` to the Vercel project's Environment Variables, using your production values. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your deployed domain.
5. Set the build command to `npm run build` (default) — `postinstall` already runs `prisma generate`.
6. After the first deploy, run migrations and seed once against the production database:
   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   DATABASE_URL="<production-url>" npm run db:seed
   ```
7. Configure OAuth redirect URIs (`https://yourdomain.com/api/auth/callback/google` and `.../github`) in the Google Cloud Console and GitHub OAuth App settings.

## Known scope trade-offs

Built for a single, continuous engineering pass rather than a multi-week team effort. A few areas were intentionally scoped down rather than left as broken placeholders:

- **Navigation CMS** — the site header's links are fully CMS-editable at `/admin/navigation` (add, edit, reorder, delete), backed by the `NavigationItem` model with the same DB-fallback pattern as the rest of the site. The footer's four link columns remain static by design — footer information architecture rarely needs runtime editing, and the model doesn't currently group items by column.
- **Analytics** — the dashboard's traffic/signup chart uses illustrative sample data; lead-sourced metrics (pipeline, status, source breakdown) are fully real, computed from your database. Wire up GA4/Plausible for real traffic data.
- **"View Project" links** — the four engineering-showcase cards link to specific folders in this repository's own source code rather than external client sites, since the four projects described are subsystems of this same platform (attribution engine, WebGL layer, admin/CRM console, CMS) — not four unrelated client engagements needing external URLs.

## License

MIT — see [LICENSE](./LICENSE).
