# Corland Partners Website

Production-ready Next.js (App Router + TypeScript + Tailwind CSS) rebuild of
the Corland Partners marketing site — a faith-based "Kingdom Business"
consulting and development firm.

This repo is being built in phases. This phase establishes the foundation:
project scaffold, design tokens, the full content data layer, shared
components, every route (with real, verbatim copy), the contact API route,
and Docker packaging. Later phases refine visual polish, animations, and SEO.

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for color/font/spacing tokens.

## Tech stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)
- Typed content layer under `content/` (no CMS yet — plain TS modules)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build (must pass before merging)
npm run start    # run the production build locally
npm run lint      # ESLint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL, used for metadata/sitemap/robots
- `RESEND_API_KEY` — reserved for the future email/CRM integration on the
  contact form (`app/api/contact/route.ts`); not wired up yet

## Docker

```bash
docker compose up --build
```

This builds a multi-stage, standalone Next.js production image
(`next.config.ts` sets `output: "standalone"`) and serves it on port 3000.

## Project structure

- `app/` — routes (App Router)
- `components/` — shared UI components
- `content/` — typed content data (company info, pillars, services, FAQ, impact)
- `public/` — static assets
