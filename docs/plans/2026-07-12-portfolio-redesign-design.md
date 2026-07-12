# Portfolio Redesign v2 — Design Spec

**Date:** 2026-07-12
**Owner:** Zoran Jezdimirović
**Site:** https://jezdimirovic.github.io (public repo, GitHub Pages)
**Status:** Design — awaiting approval

## Goal

Turn the half-filled BootstrapMade "MyResume" template into a top-tier personal
portfolio / CV. Serves three audiences at once: employers/recruiters, freelance
clients, and personal brand.

## Decisions (locked)

| Topic | Decision |
|---|---|
| Design vibe | Dark developer (dark navy, single gradient accent, mono accents) |
| CSS framework | Tailwind via **CLI build** → committed static `main.css`. Drop Bootstrap + all vendor libs (AOS, Swiper, Isotope, GLightbox, Typed.js, Boxicons, Purecounter). |
| JS | Vanilla only (scroll-spy nav, mobile menu, on-scroll reveal via IntersectionObserver, typed-role effect small custom). No framework. |
| Contact | **mailto for now** (`Email me` button/simple form → mailto). Real form via Golub relay behind a Cloudflare Worker proxy is a **later** phase. |
| Testimonials | Replaced by "Companies I've worked with" (logos/names). |
| Projects | Describe **all** Zoran's projects (personal `jezdimirovic` + org `jezda-solutions`). Overview-level, grouped, not module-by-module. |
| Privacy | **Never** publish JMBG, address, ID card, or exact date of birth. |
| CV PDF | Generate clean PDF from `cv.docx` → `/assets/cv/Zoran-Jezdimirovic-CV.pdf`, wired to "Download CV". |

## Tech / build

- **Tailwind CLI**: `assets/css/tailwind.src.css` (source w/ `@tailwind` + custom
  layers) → build → `assets/css/main.css` (committed). GitHub Pages serves the
  compiled CSS; visitors need no build step.
- `package.json` dev dependency `tailwindcss` + npm scripts:
  `build:css` (minified) and `watch:css`.
- Fonts: `Inter` (body) + `JetBrains Mono` (accents), self-hosted or Google
  Fonts `<link>` (decide at impl; self-host preferred for perf/privacy).
- Single-page `index.html`. Delete `portfolio-details.html`, `forms/`,
  `assets/vendor/`, unused template assets.
- Icons: inline SVG (or a tiny icon set), no Boxicons/Bootstrap-icons fonts.

## Page structure (single page, anchored nav)

1. **Hero** — Name, animated role line (`Full-Stack .NET + React Engineer`),
   `12+ yrs · London (remote)`, CTAs `[View Work] [Download CV]`, social
   (GitHub, LinkedIn, email). No DOB.
2. **About** — Senior .NET/React engineer pitch from `cv.docx` (12+ yrs, TDD,
   product-minded, co-owner of Jezda Solutions). No personal identifiers.
3. **Skills** — grouped: Backend (.NET/C#, ASP.NET Core, EF Core, CQRS),
   Frontend (React, Angular, TypeScript, Tailwind), Data (PostgreSQL, MSSQL,
   Redis), Practices/DevOps (TDD/NUnit/xUnit, Docker, CI/CD).
4. **Experience** (timeline) — real roles from `cv.docx`:
   - Software Developer @ **Kaizen Ticketing** (London, remote) 2023–present — .NET Core + React, TDD/NUnit, PostgreSQL, Redis/Docker.
   - Co-Owner / Founder @ **Jezda Solutions** 2022–present — running a software studio (ERP platform, POS, e-commerce, team extension).
   - Software Developer @ **Bethard** (Belgrade, hybrid) 2021–2023 — iGaming, C# MVC/Web API, MS SQL.
   - Software Developer @ **CPA Global** (Belgrade) 2020–2021 — high-perf APIs, AngularJS.
   - Software Developer @ **GET** (Belgrade) 2016–2020 — banking C# MVC, Xamarin; led a Swiss warehouse project.
   - Mobile Web Developer @ **Usablenet** (Belgrade) 2012–2016 — mobile web, XML/XPath/XSLT.
5. **Projects** — grouped cards, overview descriptions + tech tags. Link source
   only where public. See "Projects content" below.
6. **Companies I've worked with** — Kaizen Ticketing, Bethard, CPA Global,
   GET, Usablenet, + Jezda Solutions.
7. **Contact** — mailto CTA + email/LinkedIn/GitHub. (Golub form = later phase.)
8. **Footer** — copyright, quick links, "built with Tailwind, hosted on GitHub Pages".

## Projects content (curated from repo catalog)

**Flagship**
- **Jezda Platform** — modular-monolith ERP unifying identity, HR, tasks,
  commerce/retail, accounting, finance, CRM and notifications behind one Web API.
  *.NET 10, PostgreSQL (DB-per-module), EF Core, CQRS, Hangfire.* (private)
- **SERP** — the unified React SPA frontend for the platform (commerce, HRMS,
  tasks, accounting, notifications) with shared auth, permissions, real-time.
  *React 19, TypeScript, Vite, Tailwind, shadcn/ui, TanStack, SignalR, i18n.* (private)
- **Jezda POS** — cross-platform Point-of-Sale (Windows + Android), retail &
  HoReCa modes, fiscal receipts, split payments, inventory, loyalty, platform sync.
  *Flutter/Dart, ESC/POS, fiscal + IPS QR payments.* (private)
- **Golub** — smart email relay that stacks multiple providers' free tiers
  (SendGrid, Brevo, Mandrill), priority rotation, quota tracking, API-key auth,
  full audit log. *.NET 9, PostgreSQL, MIT.* (private code, MIT-licensed)
- **common-libs** — published reusable .NET NuGet libraries (domain, data-access,
  integrations) underpinning the platform. *.NET 10.* (**public** — link NuGet/GitHub)

**Data / scraping**
- **PriceRadar** — retail price-intelligence scraper harvesting products, barcodes
  and images from 23 Serbian chains via a stealth browser, feeding the platform.
  *Node.js, Patchright/Puppeteer stealth, Docker.* (private)
- **sports-almanac** — personal prematch arbitrage / sure-bet detector crawling
  bookmakers and flagging inverse-odds < 1 opportunities. *Python, FastAPI,
  SQLAlchemy async, PostgreSQL.* (personal, private)

**Commerce**
- **Storefronts** — modern e-commerce fronts consuming the platform's commerce
  API: ASIX shopfront (Next.js 16 / React 19), Wearify (wearify.rs), Bon Appetit,
  and reusable shop templates. *Next.js, React, TypeScript, Tailwind, Stripe/NEXI.* (private)
- **Piazza / Liflet.rs** — digital promotional-leaflet platform for retail offers.
  *.NET, PostgreSQL.* (private)

**Company / infra**
- **jezda.net** — Jezda Solutions company site + multi-tenant admin.
  *React 19, Vite, TypeScript, Tailwind, i18n (7 langs).* (**live** — link jezda.net)

> `aleacc` (iGaming/casino) — TBD: confirm with Zoran whether this is his to
> showcase or prior-employer/contract work before including.
> Excluded (empty/trivial): `fiskalac`, `hrms-js`, `platform-test`,
> `easycartz`, `grebach-cenoteka`, `weed-green-light`, `retail-core`,
> `pos-electron-react`, `vps-phoenix` (may mention infra story only).

## SEO / meta (currently empty — fix all)

- `<title>`, meta description + keywords, canonical.
- OpenGraph + Twitter card (image = a branded OG card or profile).
- `robots` meta + `robots.txt` + `sitemap.xml`.
- JSON-LD `Person` schema (name, jobTitle, url, sameAs: GitHub/LinkedIn).
- Favicon set (reuse/refresh existing).

## Assets

- Keep `profile-img.jpg` (B/W portrait). Optimize/resize.
- New dark hero background or CSS gradient (drop 1MB `hero-bg.jpg`).
- Generate `Zoran-Jezdimirovic-CV.pdf` from `cv.docx`.
- Remove: `delete.jpg`, `hero-bg-org.jpg`, template `portfolio/` + `testimonials/` images if unused.

## Accessibility / performance

- Semantic HTML, landmark regions, alt text, focus states, color-contrast AA on dark theme.
- Respect `prefers-reduced-motion` for reveal animations.
- Lazy-load images, `width/height` set, compressed assets. Target Lighthouse 95+.

## Out of scope (this phase)

- Golub-backed contact form + Cloudflare Worker proxy (Phase 2).
- Blog / CMS.
- Multi-language (site is English).

## Phase 2 (later) — Real contact form

Cloudflare Worker (`contact.jezda.net`) holding the Golub API key as a Worker
secret + Cloudflare Turnstile anti-bot; static site POSTs to the worker, which
forwards to `https://golub-api.jezda.net/api/emails/send`. Key never exposed
client-side. Needs Zoran's Cloudflare access.
