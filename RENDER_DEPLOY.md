# Deploying to Render

This site is a stateless Next.js app with **no database, no admin service, and no
uploaded-file storage** — every image is a static asset committed under `public/`, and the
only external dependency is Resend for the contact form. That makes this a much smaller move
than a typical Railway-to-Render migration: there's no database to copy and nothing to test
beyond the app itself.

`render.yaml` at the repo root is a Render Blueprint for a single Docker web service. The
Dockerfile already listens on `0.0.0.0:$PORT` (confirmed locally with `PORT=10000
HOSTNAME=0.0.0.0 node .next/standalone/server.js`, Render's exact runtime contract), so it
needs no changes to run on Render.

## Environment variables

| Variable | On Render | Why |
|---|---|---|
| `PORT` | `10000`, committed in `render.yaml` | Render's default web port |
| `NEXT_PUBLIC_SITE_URL` | `https://www.corlandpartners.com`, committed in `render.yaml` | Canonical URL for metadata/sitemap/robots — safe to commit, not a secret |
| `RESEND_API_KEY` | `sync: false` — set once in the Render dashboard | Secret |
| `RESEND_EMAIL_FROM` | `sync: false` | Verified sender identity; not strictly secret but operational, so kept out of git |
| `CONTACT_FORM_TO_EMAIL` | `sync: false`, optional | Same reasoning; falls back to `company.email` if unset (see `.env.example`) |

None of Railway's `RAILWAY_*` variables carry over — Render sets its own `RENDER_*`
equivalents, which nothing in this codebase currently reads.

## Steps

1. **Push `render.yaml`** to `main` (this PR does that).
2. **Render → New → Blueprint** → connect the `corlandwebsite` repo → Render reads
   `render.yaml` and prompts for the three `sync: false` values
   (`RESEND_API_KEY`/`RESEND_EMAIL_FROM`/`CONTACT_FORM_TO_EMAIL`) → **Apply**.
3. Wait for the build, then check `https://corland-partners-website.onrender.com/api/health`
   → `{"status":"ok"}`.
4. **Smoke test on the `*.onrender.com` URL** before touching DNS:
   - Every page loads (home, about, business pillars, services, FAQ, contact, privacy, terms).
   - Submit the contact form with a real inbox you control: confirm both the internal
     notification and the visitor confirmation email arrive, and that the logo image in each
     renders (the email HTML derives the logo's absolute URL from the page the form was
     submitted from — see `lib/contact-email.ts`'s `resolveSiteOrigin` — so this works
     correctly even before the custom domain is live).
   - `curl -s https://corland-partners-website.onrender.com/robots.txt` and `/sitemap.xml`
     both return 200.
5. **DNS cutover**: Render → the service → **Settings → Custom Domains** → add
   `corlandpartners.com` (Render adds `www.corlandpartners.com → corlandpartners.com`
   automatically). At your DNS provider, point the apex and `www` records at what Render
   shows. If the provider is Cloudflare, set those records to **DNS only** (grey cloud) until
   Render shows the domain as **Verified** and the certificate is issued, then re-enable the
   proxy with SSL mode **Full (strict)**.
6. **Verify live**:
   ```sh
   curl -sI https://corlandpartners.com/ | grep -i x-render-origin-server
   curl -s  https://corlandpartners.com/api/health
   curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.corlandpartners.com/
   curl -s  https://corlandpartners.com/robots.txt
   curl -s  https://corlandpartners.com/sitemap.xml
   ```
   Re-run the legacy-URL redirect checks from `next.config.ts`'s `legacyRedirects` against the
   live domain too.
7. **Clean up**: keep the Railway deployment running (no traffic) for about a week as a
   fallback, then delete the Railway project. Rotate the Resend API key if it was ever pasted
   anywhere outside Railway's and Render's own dashboards.

## What does NOT apply here

The general Railway→Render playbook this doc is adapted from also covers: copying a
PostgreSQL database, moving uploaded files off a Railway Volume, and a second admin service.
None of that exists in this codebase — skip it.
