# chess-leader/website

New site for Chess Leader school. Replaces the legacy WordPress
build at `../chess-leader-website/` (kept as a read-only reference).

Live: [chess-spb.com](https://chess-spb.com) — DNS cut over to this
Vercel project 2026-05-31 (propagating ≤24h); also on
chess-leader.vercel.app (secondary). Canonical/OG/sitemap → chess-spb.com.

## Stack

- Vite 7 + React 19 + TypeScript
- react-router-dom v7 — `BrowserRouter` in `main.tsx`, `StaticRouter`
  in `entry-server.tsx`. `vite.config.ts` dedupes React.
- V4 design system in `src/styles/v4.css` (scoped under `.v4v`) —
  hand-written CSS, no Tailwind/PostCSS.
- `libphonenumber-js` — RU phone validation + as-you-type mask
  (`src/lib/phone.ts`).
- Build-time SSG: client build + SSR build + `scripts/prerender.mjs`
  emits per-route `dist/<route>/index.html` with content, meta and
  JSON-LD. Mirrors `maksi/scripts/prerender.mjs`.

## Pages

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` | hero + storyboard + stats + benefits + coaches + reviews + where |
| `/prices` | `Prices` | 3 tiers + compare + promo + included + FAQ |
| `/schedule` | `Schedule` | mode tabs + 7-day week + coaches note |

`MenuOverlay` lists only these three — Турниры / Контакты / Блог
intentionally absent (per user instruction). `*` falls back to Home.

## Content

`src/content/` is the single source of truth — `home.ts`, `prices.ts`,
`schedule.ts`, `nav.ts`. Edit values there, not in components.
Content for hero / stats / coaches / reviews lifted verbatim from
legacy WP blocks (`../chess-leader-website/blocks/*`).

## SEO

- Per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`,
  full `og:*` + `twitter:*` — replaced by `scripts/prerender.mjs`
  from `ROUTES` definitions.
- JSON-LD: `EducationalOrganization` + `WebSite` on `/`; `Service`
  (3 offers) + `FAQPage` on `/prices`; `Course` (2 instances) on
  `/schedule`.
- `public/robots.txt` + auto-generated `dist/sitemap.xml`.
- Yandex.Metrika id `88489627` inlined in `index.html` with
  `ssr:true, webvisor:true, clickmap:true`. `<noscript>` pixel.

## Responsive

Single `src/styles/v4.css`:
- Default: mobile.
- `@media (min-width: 768px)` — tablet: 3-col grids, 2-col schedule
  + where, sticky CTA hidden, full phone in nav.
- `@media (min-width: 1024px)` — desktop: max-width 1100 container,
  inline nav links + header CTA, board-frame hero, 4-col stats /
  benefits, 3-col coaches, 3-col schedule, 4-col footer.

Logo is the real chess-spb.com brand mark — inline SVG in
`src/components/icons/LogoMark.tsx` (paths use `currentColor`).
Dark teal on header / footer-white via CSS `color`.

## Run

```bash
npm install
npm run dev       # vite at http://localhost:5175
npm run build     # tsc + client + SSR + prerender → dist/
```

Or `preview_start chess-leader` (configured in `../../.claude/launch.json`).

## Deploy

```bash
vercel --prod --yes   # from this directory (CLI logged in, no token needed)
```

`vercel.json` rewrites `/prices` → `/prices/index.html`,
`/schedule` → `/schedule/index.html`, fallback for non-asset paths.

## Lead capture

`src/components/LeadForm.tsx` (rendered by `Where.tsx`) posts
`POST /api/submit` (Vercel Function) → Telegram, DMing each lead to **all
admins** via the chess-crm prod bot @leader_chessbot. Env:
`TELEGRAM_BOT_TOKEN` (= @leader_chessbot) + `TELEGRAM_ADMIN_CHAT_IDS`.
Local `.env.local` → `../../.secrets/chess-leader-site.env`; prod env in
the Vercel `chess-leader` project. Map: `../../maksi-vault/channels.md`
+ `secrets-map.md`.

Phone: `src/lib/phone.ts` (`libphonenumber-js`) — prefill `+7`, normalize
`8…`/10-digit to `+7`, `AsYouType` mask, `isValidPhoneNumber` → green
"valid" + inline error; the server normalizes too. Mobile: the form card
has `id="lead-form"`; CTAs scroll to it centred (`scrollToForm` in
`App.tsx`, corrective re-scroll for font/image reflow); the sticky bar
(`StickyCTA.tsx`) hides while the form is on screen (IntersectionObserver).

## Analytics / paid-ads readiness

Mirrors maksi. Yandex.Metrika `88489627` (init in `index.html`).
- `src/lib/analytics.ts` — `reachGoal` / `hit` wrappers.
- `src/lib/utm.ts` — captures `utm_*` on first load (sessionStorage),
  forwarded in the `/api/submit` body → Telegram.
- `src/components/RouteTracker.tsx` — SPA pageview `hit` per route.
- Goals: `lead_submitted` on form success, `phone_click` on tel: links —
  **create matching goals in the Metrika dashboard** for them to register.

The "Где мы" block (`Where.tsx`) is a keyless Yandex `map-widget` iframe
centred on the school — no API key, survives prerender.

## What doesn't work yet

- `/about`, `/contacts` not built (Footer surfaces phone / email /
  address inline instead).
- DNS for `chess-spb.com` cut over to this Vercel project 2026-05-31
  (propagating ≤24h); vercel.app stays as a secondary domain.

## Boundary with vault

`../../maksi-vault/` is the shared semantic layer. Entry:
`../../maksi-vault/systems/chess-leader-site.md`. Don't write to
vault from this repo without explicit instruction —
`../../maksi-vault/principles.md`.
