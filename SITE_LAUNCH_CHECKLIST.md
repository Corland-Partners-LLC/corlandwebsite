# SITE LAUNCH QA & VALIDATION CHECKLIST

> **Purpose:** This file is an executable launch checklist for Claude Code.
>
> Claude must **READ, REVIEW, TEST, FIX, and UPDATE** this file as part of the website launch process.
>
> This is **NOT** a human sign-off document.
>
> Do not simply mark an item complete because the feature appears to exist. Each item must be verified against the actual application, source code, rendered pages, build output, or appropriate external validation.

---

## Claude Responsibilities

Claude is responsible for:

1. Reviewing every checklist item.
2. Inspecting the implementation.
3. Testing the functionality.
4. Fixing issues discovered when it is safe to do so.
5. Re-running validation after fixes.
6. Updating the status and evidence in this file.
7. Reporting anything that cannot be automatically verified.

---

# Status Definitions

Use exactly these statuses:

- `NOT_STARTED`
- `IN_PROGRESS`
- `PASS`
- `FAIL`
- `BLOCKED`
- `NEEDS_REVIEW`
- `NOT_APPLICABLE`

Do not mark an item `PASS` without verification.

Do not mark something `PASS` simply because the code exists.

---

# Evidence Requirement

Every completed item must include evidence.

Example:

```md
### 1. Custom 404 Page

Status: PASS

Evidence:
- `app/not-found.tsx` exists
- Unknown route `/this-route-does-not-exist` returns HTTP 404
- Custom branded 404 UI renders
- Homepage CTA works
- Mobile layout verified
```

For failed items:

```md
Status: FAIL

Issue:
404 page exists but returns HTTP 200.

Required fix:
Return the correct 404 response.

Next action:
Fix `app/not-found.tsx` and re-test.
```

---

# Important Rules

## Rule 1 — Inspect Before Assuming

Before marking anything complete, inspect:

- Source code
- Routes
- Components
- Configuration
- Metadata
- Build output
- Rendered pages
- Network behavior where applicable

## Rule 2 — Fix What You Find

If a checklist item fails and the issue can safely be fixed:

1. Fix it.
2. Re-run the appropriate test.
3. Update the checklist.
4. Record the evidence.

Do not merely report the problem.

## Rule 3 — Don't Fake Verification

Never mark:

- Analytics as PASS without verifying installation.
- Forms as PASS without submitting/testing them.
- Metadata as PASS without inspecting rendered metadata.
- Sitemap as PASS without checking its actual output.
- Mobile as PASS without testing responsive behavior.
- Image optimization as PASS without inspecting actual assets.
- Cookie consent as PASS without verifying behavior.

## Rule 4 — Don't Modify Business Logic Without Understanding It

If a change could affect:

- Payments
- Calculators
- Authentication
- Contracts
- Customer data
- Dealer functionality
- Legal content

do not make an unverified assumption.

Mark:

`NEEDS_REVIEW`

and explain why.

## Rule 5 — Re-Test After Changes

Any change that could affect another checklist item requires re-running the relevant checks.

---

# Launch Readiness Summary

```md
Total Checks: 20

PASS: 15
FAIL: 0
IN_PROGRESS: 0
BLOCKED: 0
NEEDS_REVIEW: 2
NOT_APPLICABLE: 3
NOT_STARTED: 0

Launch Status: NEEDS REVIEW
```

### Launch Status Rules

#### READY

Only when:

- All required checks are `PASS`
- No critical item is `FAIL`
- No critical item is `BLOCKED`
- Production build succeeds
- No known critical errors remain

#### NOT READY

If any critical launch requirement is:

- `FAIL`
- `BLOCKED`
- `NOT_STARTED`

#### NEEDS REVIEW

Use when technical verification cannot determine whether something is correct and human/business confirmation is genuinely required.

All technical checks pass, the production build is clean, and there are no `FAIL`/`BLOCKED`/`NOT_STARTED` items. The two `NEEDS_REVIEW` items (Privacy Policy and Terms of Use) are technically implemented and rendering correctly, but their legal content is a draft awaiting business/legal sign-off — see items 15/16 below. Launch is technically ready; it is a business decision whether to go live before that sign-off happens.

---

# 1. Custom 404 Page

Status: PASS

## Requirements

- [x] Custom 404 page exists.
- [x] Unknown routes return HTTP 404.
- [x] Page uses the site's design system.
- [x] Page includes useful navigation.
- [x] Page includes a homepage CTA.
- [x] Page works on mobile.
- [x] No broken images.
- [x] No console errors.
- [x] Page does not expose development information.

## Verification

Claude must:

1. Locate the 404 implementation.
2. Run the application.
3. Request a deliberately invalid URL.
4. Verify HTTP status is 404.
5. Verify the rendered UI.
6. Test desktop/mobile layout.

Evidence:
- `app/not-found.tsx` exists, built with the site's `Container`/`Button` components and brand colors (navy/teal).
- `GET /this-route-does-not-exist-xyz` confirmed via both `curl -o /dev/null -w "%{http_code}"` and Playwright `response.status()` → **404**.
- Branded UI: "404 Error" kicker, "Page Not Found" heading, "Back Home" CTA (→ `/`) and "Contact Corland Partners" CTA (→ `/contact`), both verified as real, working hrefs.
- Tested at desktop (1440x900) and mobile (375x812) — no broken images (0 missing alt), no console errors, no stack traces or dev info exposed.

---

# 2. CTA Above the Fold

Status: PASS

## Requirements

- [x] Primary conversion CTA exists.
- [x] CTA is visible above the fold on desktop.
- [x] CTA is visible above the fold on mobile where appropriate.
- [x] CTA text clearly communicates the action.
- [x] CTA destination is valid.
- [x] CTA does not lead to a placeholder page.
- [x] CTA is keyboard accessible.

## Verification

Claude must inspect the homepage and primary landing pages.

Verify:

- Rendered position
- CTA destination
- Responsive behavior
- Accessibility

Evidence:
- Homepage hero has two CTAs: "Explore Our Services" (→ `/services`) and "Contact Us" (→ `/contact`).
- Desktop 1440x900: both CTAs render at y≈600, above the 900px fold.
- Mobile 390x844: CTAs render at y≈632/692, above the 844px fold.
- Both destinations confirmed to return 200 (not `#`, not 404) via full-site crawl.
- Keyboard Tab-through confirmed both links receive focus in the expected sequence.

---

# 3. Meta Title Per Page

Status: PASS

## Requirements

Every indexable page must have:

- [x] Unique title
- [x] Relevant title
- [x] Correct brand treatment
- [x] No accidental duplicate titles
- [x] No placeholder titles

## Verification

Claude must:

1. Enumerate all public/indexable routes.
2. Inspect Next.js metadata configuration.
3. Render/sample pages.
4. Verify actual `<title>` output.
5. Identify duplicates.

| URL | Title | Status |
|---|---|---|
| `/` | Structuring Kingdom Businesses for Anointed Growth | OK |
| `/about` | About \| Corland Partners | OK |
| `/business-pillars` | Business Pillars \| Corland Partners | OK |
| `/business-pillars/organizational` | Organizational Model \| Corland Partners | OK |
| `/business-pillars/operational` | Operational Model \| Corland Partners | OK |
| `/business-pillars/marketing-sales` | Marketing and Sales Model \| Corland Partners | OK |
| `/business-pillars/financial` | Financial Model \| Corland Partners | OK |
| `/services` | Suite of Services \| Corland Partners | OK |
| `/services/organizational-health` | Organizational Health \| Corland Partners | OK |
| `/services/marketing-assistance` | Marketing Assistance \| Corland Partners | OK |
| `/services/leader-development` | Leader Development \| Corland Partners | OK |
| `/services/website-development` | Website Development \| Corland Partners | OK |
| `/services/sales-team-training` | Sales Team Training \| Corland Partners | OK |
| `/services/banking-relationships` | Banking Relationships \| Corland Partners | OK |
| `/services/purchasing-power` | Purchasing Power \| Corland Partners | OK |
| `/faq` | FAQ \| Corland Partners | OK |
| `/contact` | Contact \| Corland Partners | OK |
| `/privacy` | Privacy Policy \| Corland Partners | OK |
| `/terms` | Terms of Use \| Corland Partners | OK |

Evidence:
- All 19 real routes enumerated from `app/**/page.tsx` and cross-checked against `app/sitemap.ts`, fetched via Playwright, actual rendered `<title>` extracted (not just the metadata source).
- Zero duplicates, zero placeholder-looking titles. Homepage correctly uses the root layout's `title.default` (tagline) rather than the `%s | Corland Partners` template.

---

# 4. Meta Description Per Page

Status: PASS

## Requirements

Every indexable page should have:

- [x] Unique description
- [x] Accurate description
- [x] Relevant search intent
- [x] No keyword stuffing
- [x] No placeholder text

## Verification

Enumerate all indexable pages and inspect actual rendered metadata.

Evidence:
- All 19 pages' rendered `<meta name="description">` extracted and confirmed unique, substantive, and pulled from real content copy (`content/company.ts`, `content/services.ts`, `content/pillars.ts`, `content/faq.ts`) — no placeholders, no keyword stuffing.
- Samples:
  - `/` → "Welcome to Corland Partners where clarity is king, accountability is queen and a learning environment is the Esprit de corps to steward our God given resources."
  - `/services/website-development` → "Our approach to website development is customer-centric. A website should clearly communicate your unique value proposition by buyer persona. We offer hosting on AWS (Amazon) secure dedicated servers..."
  - `/contact` → "Get in touch with Corland Partners in Grandview, TX — send a message or book a consultation directly."

---

# 5. Open Graph Image

Status: PASS *(was FAIL — fixed during this QA pass)*

## Requirements

- [x] Default OG image exists.
- [x] Correct dimensions.
- [x] Correct branding.
- [x] OG metadata configured.
- [x] Important pages have appropriate OG images where needed.
- [x] No broken image URLs.

## Verification

Inspect:

- `metadata`
- `openGraph`
- image files
- absolute production URLs

Test representative pages.

Evidence:
- **Initial finding (FAIL):** `lib/seo.ts`'s `pageMetadata()` had `openGraph`/`twitter` blocks with no `images` field — confirmed via rendered `<meta property="og:image">`: zero `og:image` tags existed on any page.
- **Fix applied:** created a branded 1200x630 `public/images/og-default.png` (navy gradient using the exact brand palette, diamond mark, wordmark, tagline), wired into `pageMetadata()`'s `openGraph.images`/`twitter.images` (absolute URLs), plus a root-layout fallback in `app/layout.tsx` covering routes that don't call `pageMetadata()` (e.g. `not-found.tsx`).
- **Re-verified live** via a real standalone-server request to `/`:
  ```
  <meta property="og:image" content="https://www.corlandpartners.com/images/og-default.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="Corland Partners — Structuring Kingdom Businesses for Anointed Growth"/>
  ```
  and `GET /images/og-default.png` → 200.
- All 19 routes confirmed to render the same tags after a clean rebuild (an earlier check of 3/19 was a stale Turbopack cache artifact, resolved with `rm -rf .next && npm run build`).

---

# 6. Favicon Set

Status: PASS

## Requirements

- [x] Favicon configured.
- [ ] SVG favicon configured where appropriate. *(PNG-based icon used instead; see note)*
- [x] Apple touch icon configured.
- [x] Correct brand asset.
- [x] No broken references.

## Verification

Inspect:

- `app/icon.*`
- `app/apple-icon.*`
- `<head>` output
- Browser behavior where possible

Evidence:
- `app/icon.png` (512x512) and `app/apple-icon.png` (180x180), both the real brand diamond mark.
- Next.js's file-convention auto-generates correct `<link rel="icon">` / `<link rel="apple-touch-icon">` tags — confirmed via build output and rendered `<head>`.
- No SVG favicon variant exists; a PNG-based icon is sufficient and is what's implemented. Not a launch blocker.

---

# 7. robots.txt

Status: PASS

## Requirements

- [x] `/robots.txt` exists.
- [x] Production URL is correct.
- [x] Public pages are crawlable.
- [x] Private/admin routes are appropriately restricted.
- [x] Sitemap URL is included.
- [x] Staging restrictions are not accidentally deployed to production.

## Verification

Request:

```text
/robots.txt
```

Inspect actual output.

Evidence:
```
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.corlandpartners.com/sitemap.xml
```
Correct production URL, references the sitemap, disallows only `/api/`, no staging/blanket-disallow restrictions present.

---

# 8. sitemap.xml

Status: PASS

## Requirements

- [x] Sitemap exists.
- [x] Production URLs are used.
- [x] Important public pages included.
- [x] Private routes excluded.
- [x] No broken URLs.
- [x] No duplicate URLs.
- [x] Canonical URLs align with sitemap URLs.

## Verification

Request:

```text
/sitemap.xml
```

Compare sitemap against actual public routes.

Evidence:
- All 19 URLs listed, exact match against the crawled route list — no missing/extra/duplicate entries: `/`, `/about`, `/business-pillars`, `/services`, `/faq`, `/contact`, `/privacy`, `/terms`, all 4 `/business-pillars/*` and all 7 `/services/*` detail pages.
- All URLs use the production domain (`https://www.corlandpartners.com`).
- Canonical URLs (via `pageMetadata()`) confirmed to match sitemap URLs exactly for every page.

---

# 9. Alt Text on Every Image

Status: PASS

## Requirements

Every image must be intentionally classified as:

1. Meaningful → descriptive alt text
2. Decorative → empty alt attribute
3. Functional → accessible label/alt text

## Verification

Claude must:

1. Search all image components.
2. Search all static image assets.
3. Inspect `<Image>` usage.
4. Identify missing alt attributes.
5. Identify meaningless alt text.
6. Identify keyword-stuffed alt text.

No unexplained image should remain.

Evidence:
- All `<Image>` usages (`app/page.tsx`, `components/Footer.tsx`, `components/Header.tsx`, `components/ServiceCard.tsx`, `components/Hero.tsx`) plus a live DOM audit of every `<img>` across all 19 rendered pages — **zero images missing `alt`**.
- Meaningful: header logo (`alt="Corland Partners — {tagline}"`), Triple Bottom Line diagram (descriptive alt).
- Decorative (`alt=""` + `aria-hidden`): footer logo mark, hero background photo, service-card icons — each has the same information conveyed in adjacent real text.

---

# 10. Mobile Breakpoints

Status: PASS

## Required Breakpoints

Test:

- 320px
- 375px
- 390px
- 480px
- 640px
- 768px
- 1024px
- 1280px
- 1440px

## Requirements

- [x] No horizontal overflow.
- [x] Navigation works.
- [x] Text does not overlap.
- [x] Images scale correctly.
- [x] Buttons remain usable.
- [x] Forms work.
- [x] Tables/components adapt.
- [x] No broken layout transitions.

## Verification

Use browser/devtools testing where available.

Evidence:
- All 9 required widths tested across 4 representative pages (home, about, services, contact) = 36 checks via `document.documentElement.scrollWidth <= window.innerWidth`. **Zero overflow issues** at any width on any page.
- Visually inspected screenshots at 375/768/1440 for all 4 pages — no overlapping text, no broken images, nav/forms/buttons render correctly at every size.

---

# 11. Sticky Mobile CTA

Status: NOT_APPLICABLE

## Requirements

If applicable:

- [ ] Sticky CTA exists.
- [ ] Does not cover important content.
- [ ] Does not interfere with forms.
- [ ] Does not conflict with cookie banner.
- [ ] Works at mobile breakpoints.
- [ ] CTA destination works.

If the project does not require a sticky CTA:

Status: NOT_APPLICABLE

Explain why.

Evidence:
- Business decision (confirmed explicitly during this QA pass): a persistent bottom-of-screen mobile CTA bar is not needed. The sticky header already surfaces a "Book a Consultation" CTA, and multiple in-page CTAs exist throughout every page. Not implemented by design, not an oversight.

---

# 12. Loading States

Status: PASS

## Requirements

Interactive functionality must have appropriate loading states.

Review:

- [x] Forms
- [ ] Authentication *(not applicable — no auth on this site)*
- [x] API requests
- [ ] Calculators *(not applicable — none exist)*
- [ ] Search *(not applicable — none exists)*
- [ ] Filtering *(not applicable — none exists)*
- [ ] Dashboard data *(not applicable — none exists)*
- [ ] File uploads *(not applicable — none exist)*
- [ ] Payment workflows where applicable *(not applicable — none exist)*

## Verification

Inspect async operations and test them.

Look for:

- Duplicate submissions
- Frozen buttons
- Blank screens
- Missing feedback

Evidence:
- The contact form is the only async feature on the site. Verified with an artificially delayed `/api/contact` response (1.5s): the submit button switches to **"Sending…"** and becomes `disabled` for the full duration.
- A second click while disabled fired **zero** additional requests (confirmed via request-count listener) — no duplicate-submit path.

---

# 13. Form Error States

Status: PASS

## Requirements

Forms must handle:

- [x] Required fields
- [x] Invalid values
- [x] Invalid email
- [ ] Invalid phone where applicable *(phone is optional and unvalidated by design — not a required field)*
- [x] Server errors
- [x] Network failures
- [x] Duplicate submission
- [ ] File upload errors *(not applicable — no file uploads exist)*
- [x] Accessible error messaging

## Verification

Intentionally submit invalid data.

Verify errors are:

- Clear
- Specific
- Near the relevant field
- Accessible
- Recoverable

Evidence:
- Empty submit → field-specific errors ("Please enter your name.", "Please enter your email address.", "Please enter a message.") rendered directly under each field, with `aria-invalid="true"` / `aria-describedby="name-error"` etc. wired correctly.
- Invalid email → "Please enter a valid email address." shown under the email field.
- Server/network failure: submitted a valid form against the real `/api/contact` route with `RESEND_API_KEY` unset (actual current sandbox state) → server correctly returns `500 {"error":"Email service is not configured."}` → client shows the general error banner via `role="alert"`.
- Validation runs both client-side and server-side (`app/api/contact/route.ts` has its own independent `validate()`), so it isn't bypassable.

---

# 14. Thank You Page

Status: PASS

## Requirements

- [x] Submission confirmation exists.
- [x] Correct redirect occurs. *(No redirect by design — inline confirmation; see evidence)*
- [x] User understands what happens next.
- [ ] Appropriate CTA exists. *(Deliberately none in the follow-up confirmation email per explicit direction; the inline on-page success state itself is the confirmation)*
- [ ] Conversion tracking works if configured. *(Not applicable — no analytics configured, see item 18)*
- [x] Page is not unnecessarily indexable.

## Verification

Submit relevant forms and verify the complete flow.

Evidence:
- This site uses an inline success state (no separate route/redirect). Mocked a successful API response and verified the form is replaced by a `role="status"` block ("Message received" / "Thanks — we've received your message and will be in touch soon."), the URL stays `/contact`, and form fields are removed from the DOM.
- Since it isn't a separate route, there's no indexability concern.
- A branded HTML confirmation email is also sent to the submitter (`lib/contact-email.ts`'s `contactConfirmationHtml`) as an additional confirmation channel beyond the inline UI.

---

# 15. Privacy Policy Page

Status: NEEDS_REVIEW

## Requirements

- [x] Privacy Policy exists.
- [x] Correct company information.
- [x] Data collection accurately described.
- [x] Forms covered.
- [x] Analytics covered. *(states none are currently used)*
- [x] Cookies covered. *(states none are currently used)*
- [x] Third-party services covered.
- [x] Contact information included.
- [x] Linked from footer.

## Verification

Inspect page and footer links.

If legal accuracy cannot be technically verified:

Status: NEEDS_REVIEW

Do not rewrite legal language unless specifically instructed.

Evidence:
- `/privacy` created (`app/privacy/page.tsx`, `content/legal.ts`), linked from the footer alongside Terms of Use and Transparency in Coverage.
- Technically verified clean: unique title/description, exactly one `<h1>`, no console errors, renders correctly at all tested breakpoints.
- **This is a draft.** The live site never had a Privacy Policy, so this is new legal content authored during this session — a conservative reflection of the site's actual current behavior (contact form fields collected, Resend as the email processor, Railway hosting, explicitly no analytics/tracking cookies) rather than generic boilerplate. Per Rule 4, this requires business/legal review before being treated as final — not rewritten further without that instruction.

---

# 16. Terms Page

Status: NEEDS_REVIEW

## Requirements

- [x] Terms page exists.
- [x] Correct company information.
- [x] Website/service usage terms included.
- [x] Relevant disclaimers included.
- [x] Contact information included.
- [x] Footer link works.

## Verification

Inspect page and links.

Legal content requiring business/legal approval should be:

`NEEDS_REVIEW`

Evidence:
- `/terms` created (`app/terms/page.tsx`, `content/legal.ts`), linked from the footer.
- Technically verified clean: unique title/description, exactly one `<h1>`, no console errors, renders correctly at all tested breakpoints.
- **This is a draft**, same basis as item 15 — conservative starter content (no warranty, limitation of liability, third-party links, Texas governing law given the business address) pending business/legal sign-off before being treated as final.

---

# 17. Cookie Banner

Status: NOT_APPLICABLE

## Requirements

Where required:

- [ ] Cookie/consent banner exists.
- [ ] Accept works.
- [ ] Reject works where applicable.
- [ ] Preferences work where applicable.
- [ ] Non-essential tracking respects consent.
- [ ] Privacy Policy linked.
- [ ] Mobile layout works.
- [ ] Banner does not block essential functionality.

## Verification

Test:

1. Fresh browser/session.
2. No consent.
3. Accept.
4. Reject.
5. Change preferences where supported.

Evidence:
- Business decision (confirmed explicitly during this QA pass): no analytics or tracking cookies are installed (see item 18), so there is currently nothing on this site that requires cookie consent. A consent banner would be premature/misleading UI. Revisit if/when analytics or any tracking is added — the Privacy Policy (item 15) already states no tracking cookies are currently used, so this stays consistent.

---

# 18. Analytics Installed

Status: NOT_APPLICABLE

## Requirements

- [ ] Analytics configured.
- [ ] Correct production property/ID.
- [ ] No duplicate installation.
- [ ] Conversion events configured where required.
- [ ] Forms tracked where appropriate.
- [ ] CTA tracking implemented where appropriate.
- [ ] Analytics respects applicable consent requirements.

## Verification

Inspect:

- Environment variables
- Source code
- Tag configuration
- Network requests
- Analytics configuration

Never mark PASS solely because an analytics script exists.

Evidence:
- Confirmed via grep across `app/`, `components/`, `lib/`, `content/`: no Google Analytics, GTM, or any other analytics/tracking code exists anywhere in the codebase.
- Business decision (confirmed explicitly during this QA pass): launch without analytics for now; add later with a real measurement ID when needed. Not an oversight — a deliberate deferral.

---

# 19. Real Contact Address

Status: PASS

## Requirements

Verify actual business information is used.

Check:

- [x] Contact page
- [x] Footer
- [ ] Header where applicable *(header shows nav/CTA only, no address — by design)*
- [x] Structured data
- [x] Schema
- [ ] Google Maps link if applicable *(none exists on the site)*
- [x] Phone
- [x] Email
- [ ] Business hours if displayed *(not displayed anywhere — not a gap, just not part of the current design)*

Do not invent or assume business information.

If verification requires business-owner confirmation:

`NEEDS_REVIEW`

Evidence:
- Single source of truth: `content/company.ts` — address "900 McDuff Ave, Suite 7, Grandview, TX 76050", phone "(817) 270-6468", email "leland@corlandpartners.com" (kept as-is per explicit business decision during this session — Leland is no longer a user of the inbox in practice, but the business asked to keep this as the publicly displayed address for now; contact form submissions are separately routed via `CONTACT_FORM_TO_EMAIL`, decoupled from this displayed address).
- Grepped for the phone number, zip, street name, and email directly across `app/`, `components/`, `content/`, `lib/` outside of `content/company.ts` — zero hardcoded duplicates/stale values found.
- Contact page, footer, and the `Organization` JSON-LD in `app/layout.tsx` all pull from `content/company.ts` and match exactly.

---

# 20. Compressed Images

Status: PASS *(was FAIL, partial — fixed during this QA pass)*

## Requirements

Review all production images.

- [x] No unnecessarily huge images.
- [x] Modern formats used where appropriate.
- [ ] Responsive sizing implemented. *(fixed-size `<Image>` usage throughout; acceptable given the small number and modest sizes of images on this site)*
- [x] Hero images optimized.
- [x] Images appropriately lazy-loaded.
- [x] Above-fold images prioritized.
- [x] No obvious duplicate assets.
- [x] Image quality remains acceptable.

## Verification

Inspect actual file sizes and formats.

Identify any oversized assets.

Evidence:
- Full inventory taken of `public/images/`. Nothing was multi-MB, but two actually-used logo PNGs were unnecessarily large for simple flat-color graphics:
  ```
  logo-horizontal.png:  275.5KB → 65.2KB  (76% smaller) — used in Header, priority-loaded
  mark.png:              93.0KB → 37.6KB  (60% smaller) — used in Footer
  logo-stacked.png:     234.7KB → 94.4KB  (60% smaller) — unused, compressed anyway for consistency
  mark-square.png:       91.4KB → 37.4KB  (59% smaller) — unused, compressed anyway
  ```
  Recompressed with `sharp` (palette mode), dimensions unchanged, transparency verified preserved, visually verified no quality loss.
- `hero-partnership.jpg` (188.2KB, 1400x600) and the 7 service icon PNGs (3.9–35.6KB each, 600x600) and `triple-bottom-line.webp` (67.4KB, 2000x739) were already reasonably sized — left as-is.
- New `og-default.png` (1200x630, 38.3KB) is well-optimized.
- Above-the-fold images (header logo, hero background) correctly use `priority`; everything else uses Next.js's default lazy loading.
- **Flagged, not deleted:** `corland-partners-logo-stacked.png`, `corland-partners-logo-wide.jpg`, and `corland-partners-mark-square.png` are not referenced by any component. Left in place in case they're wanted for future use — worth a cleanup pass if confirmed unneeded.

---

# Automated Technical QA

Status: PASS

These checks must also be run before launch.

## Build

- [x] Production build succeeds.
- [x] No TypeScript errors.
- [x] No ESLint errors.
- [x] No build warnings that indicate a real problem.

## Routes

- [x] All expected routes resolve.
- [x] No unexpected 404s.
- [x] No broken internal links.
- [x] No broken external links where practical.

## Console

- [x] No unexpected browser console errors.
- [x] No hydration errors.
- [x] No React warnings indicating broken functionality.

## Images

- [x] No broken images.
- [x] No missing assets.
- [x] No incorrect image URLs.

## Environment

- [x] Production environment variables identified.
- [x] No secrets committed to Git.
- [x] No development URLs in production.
- [x] No localhost references in production.
- [x] No test credentials.
- [x] No mock data accidentally enabled.

## Security

- [ ] Authentication routes protected. *(not applicable — no authentication exists on this site)*
- [ ] Private routes protected. *(not applicable — every route is intentionally public)*
- [x] API authorization enforced server-side.
- [x] Secrets not exposed client-side.
- [ ] File uploads secured where applicable. *(not applicable — no file upload feature exists)*
- [x] Sensitive errors not exposed.

Evidence:
- `npm run build` and `npm run lint` both clean (0 errors/warnings), re-run fresh after every fix made during this pass.
- All 19 sitemap routes crawled — all return 200; `/this-route-does-not-exist-xyz` correctly 404s; zero broken internal links across nav/footer/breadcrumbs/cards/CTAs; all 3 external links (Google Calendar booking, BCBS TX transparency-in-coverage, Facebook) reachable (200 via curl with redirects followed).
- Zero console errors, zero page errors, zero React/hydration warnings across all 19 routes.
- No broken images anywhere; every `<img>` has an alt attribute (see item 9).
- Grepped for `localhost`, non-HTTPS URLs, API keys, tokens, passwords, and common secret-key patterns across `app/`, `components/`, `content/`, `lib/`, `.env.example` — nothing found. `.env.example` has correctly empty values with inline documentation. `.next/` is gitignored.
- No authentication exists on this site (marketing site, no login/private areas). The one API route (`/api/contact`) validates input server-side independently of the client, never exposes `RESEND_API_KEY` to the client, and returns generic error messages (no stack traces) on failure.

---

# SEO Technical QA

Status: PASS

- [x] Canonical URLs correct.
- [x] No accidental `noindex`.
- [x] No accidental `nofollow`.
- [x] H1 structure reviewed.
- [x] Heading hierarchy reviewed.
- [x] Structured data validated.
- [x] Sitemap validated.
- [x] robots.txt validated.
- [x] Open Graph metadata validated.
- [x] Social previews reviewed.

Evidence:
- Canonical URLs present and correct on all 19 pages via `pageMetadata()`, matching their own route and the sitemap entry exactly.
- Live-rendered `<meta name="robots">` check on all 19 pages: null on every page (no restrictive directive present, so pages default to indexable) — correct for a site that wants to be crawled. Grepped `robots` across metadata exports — only match is the `app/robots.ts` route handler itself.
- Every page has exactly one `<h1>` (verified live via DOM query, regression-checked against a prior QA phase that fixed this once already) — no skipped heading levels anywhere.
- All JSON-LD blocks (`Organization` + `WebSite` sitewide, `BreadcrumbList` on every interior page, `Service` on all 7 service pages, `FAQPage` on `/faq`) parse as valid JSON; `Organization` address/phone/email confirmed to match `content/company.ts`.
- Open Graph metadata validated post-fix (see item 5); the generated OG image reviewed directly and reads correctly at social-card size.

---

# Final Automated Review

Before declaring launch readiness, Claude MUST:

1. Read this entire file.
2. Review every checklist item.
3. Run the application.
4. Run the production build.
5. Run available automated tests.
6. Inspect routes.
7. Inspect metadata.
8. Inspect sitemap.
9. Inspect robots.txt.
10. Inspect images.
11. Test forms.
12. Test responsive layouts.
13. Review console errors.
14. Review security-sensitive areas.
15. Fix issues that can safely be fixed.
16. Re-run failed checks.
17. Update every checklist status.
18. Record evidence for every `PASS`.
19. Clearly document every `FAIL`, `BLOCKED`, and `NEEDS_REVIEW`.

All of the above were completed for this pass.

---

# Final Report

```md
## Launch QA Result

Date: 2026-09-22

Build:
PASS

Tests:
PASS (lint clean, all automated checks in this file PASS or NOT_APPLICABLE except the two legal-content NEEDS_REVIEW items)

Overall Launch Status:
NEEDS_REVIEW

Summary:
All 20 checklist items reviewed, tested against the actual running application (real
production build, not just code inspection), and fixed where safely fixable. 15 items
PASS, 3 are NOT_APPLICABLE by explicit business decision (sticky mobile CTA, cookie
banner, analytics — none needed for this launch), and 2 (Privacy Policy, Terms of Use)
are NEEDS_REVIEW: both pages are built and technically verified working, but their
legal content is a first draft pending business/legal sign-off, per Rule 4.

Critical Issues:
None remaining. The two real bugs found during this pass (missing Open Graph image;
oversized logo PNGs) were both fixed and re-verified.

Non-Critical Issues:
- 3 unused logo image assets in public/images/logo/ (corland-partners-logo-stacked.png,
  corland-partners-logo-wide.jpg, corland-partners-mark-square.png) — flagged, not
  deleted, in case wanted for future use.
- Contact form email delivery has not been end-to-end tested with real Resend
  credentials from within this sandbox (no API key available here) — the "not
  configured" error path was verified instead. A live smoke test with real
  credentials is recommended before/at launch. (Real credentials were reported
  configured on the Railway deployment in an earlier session and a real submission
  was previously confirmed to arrive.)

Items Requiring Human Review:
- Privacy Policy (/privacy) content — draft, needs legal/business sign-off.
- Terms of Use (/terms) content — draft, needs legal/business sign-off.

Changes Made During QA:
- lib/seo.ts — added default OG/Twitter image wiring to pageMetadata().
- app/layout.tsx — added fallback OG/Twitter image to root metadata (covers
  not-found.tsx and any route not calling pageMetadata()).
- public/images/og-default.png — new, 1200x630 branded OG image.
- public/images/logo/corland-partners-logo-horizontal.png — recompressed,
  275.5KB -> 65.2KB, same dimensions, transparency preserved.
- public/images/logo/corland-partners-mark.png — recompressed, 93.0KB -> 37.6KB.
- public/images/logo/corland-partners-logo-stacked.png — recompressed,
  234.7KB -> 94.4KB (unused asset).
- public/images/logo/corland-partners-mark-square.png — recompressed,
  91.4KB -> 37.4KB (unused asset).
- app/privacy/page.tsx, app/terms/page.tsx, components/LegalDocument.tsx,
  content/legal.ts — new draft Privacy Policy / Terms of Use pages.
- app/sitemap.ts, components/Footer.tsx — added /privacy and /terms entries/links.

Files Changed:
app/layout.tsx, lib/seo.ts, app/sitemap.ts, components/Footer.tsx,
components/LegalDocument.tsx (new), content/legal.ts (new),
app/privacy/page.tsx (new), app/terms/page.tsx (new),
public/images/og-default.png (new),
public/images/logo/corland-partners-logo-horizontal.png,
public/images/logo/corland-partners-mark.png,
public/images/logo/corland-partners-logo-stacked.png,
public/images/logo/corland-partners-mark-square.png

Remaining Risks:
- Privacy/Terms legal content needs actual legal review before this is a launch
  blocker or non-blocker — that determination is a business one, not a technical one.
- 3 unused logo assets could be removed in a later cleanup pass if confirmed unneeded.
- No real end-to-end contact-form send was verified from within this specific QA
  session (no Resend credentials available in this sandbox).
```

---

# Do Not Declare Launch Ready If

Any of the following remain unresolved:

- Broken production build
- Broken authentication
- Broken forms
- Broken primary CTA
- Missing critical pages
- Broken sitemap
- Broken robots.txt
- Exposed secrets
- Broken mobile layout
- Missing critical metadata
- Broken customer/dealer workflows
- Broken payment functionality
- Incorrect business calculations
- Critical accessibility issues
- Critical security issues

None of the above are present as of this review.

---

# Continuous Maintenance

This checklist should remain in the repository after launch.

When a major website change is made:

1. Re-read this checklist.
2. Determine which checks are affected.
3. Re-run those checks.
4. Update the relevant statuses/evidence.
5. Do not assume previously passing checks remain valid after major changes.
