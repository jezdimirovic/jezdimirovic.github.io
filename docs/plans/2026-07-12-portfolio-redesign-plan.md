# Portfolio Redesign v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild jezdimirovic.github.io as a top-tier dark "developer" personal portfolio using Tailwind (CLI build) + vanilla JS, filled with Zoran's real CV, experience, and projects.

**Architecture:** Single static `index.html`, anchored single-page layout. Tailwind compiled via CLI to a committed `assets/css/main.css` (no runtime CDN, no build step for visitors). Small vanilla `assets/js/main.js` for nav scroll-spy, mobile menu, on-scroll reveal, and a typed-role effect. All Bootstrap + vendor libraries removed. Contact = mailto (real Golub-backed form deferred to Phase 2).

**Tech Stack:** HTML5, Tailwind CSS v3 (CLI build), vanilla ES6 JS, IntersectionObserver, self-hosted Inter + JetBrains Mono, GitHub Pages hosting.

## Global Constraints

- **No framework runtime.** Drop Bootstrap and all `assets/vendor/*` (AOS, Swiper, Isotope, GLightbox, Typed.js, Boxicons, Purecounter, php-email-form). Vanilla JS only.
- **Tailwind via CLI**, compiled `assets/css/main.css` committed to the repo. Visitors run no build.
- **Dark developer theme:** dark navy base, single gradient accent (cyan→violet), `Inter` body + `JetBrains Mono` accents.
- **Privacy — never publish:** JMBG, home address, ID card, or exact date of birth. No personal identifiers of any kind.
- **Content sources (verbatim facts only):** experience/skills from `cv.docx` (Google Drive, already extracted into the spec); projects from the repo catalog in the spec. Do not invent employers, dates, metrics, or testimonials.
- **Contact = mailto** this phase. No API keys anywhere in the repo. Golub/Worker form is Phase 2, out of scope.
- **Projects:** describe at overview level; never claim `aleacc` or Kaizen repos as Zoran's own products. `aleacc` excluded from Projects entirely.
- **Accessibility:** semantic HTML, alt text, AA contrast on dark, visible focus states, honor `prefers-reduced-motion`.
- **Content language:** English.

---

## File Structure

**Create:**
- `package.json` — Tailwind dev dependency + `build:css` / `watch:css` scripts.
- `tailwind.config.js` — theme tokens (colors, fonts, content globs).
- `assets/css/tailwind.src.css` — Tailwind directives + custom `@layer` styles.
- `assets/css/main.css` — compiled output (committed).
- `assets/js/main.js` — nav scroll-spy, mobile menu toggle, IntersectionObserver reveal, typed-role effect.
- `assets/cv/Zoran-Jezdimirovic-CV.pdf` — generated from `cv.docx`.
- `assets/img/og-image.png` — 1200×630 social card.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`.
- `.gitignore` — add `node_modules/`.

**Modify / rewrite:**
- `index.html` — full rewrite (single page, all sections, SEO head).
- `README.md` — short project description + local build instructions.

**Delete:**
- `portfolio-details.html`, `forms/`, `assets/vendor/`, `assets/scss/`, template `Readme.txt` files, `assets/img/{delete.jpg,hero-bg-org.jpg,hero-bg1.jpg}`, unused `assets/img/portfolio/*` and `assets/img/testimonials/*`, `assets/js` template leftovers not used.

**Keep:**
- `assets/img/profile-img.jpg` (optimized), `assets/img/favicon.png`, `assets/img/apple-touch-icon.png`, `LICENSE`.

**Reusable verification helper (used by most tasks):**
```bash
# from repo root: build CSS, serve, assert content, check no obvious errors
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ > /tmp/page.html
# ...task-specific grep asserts on /tmp/page.html...
kill $SRV
```
Manual browser check (via the `run` skill or opening `http://localhost:8099/`) is the final gate on each visual task: confirm the section renders, layout is correct, and the browser console shows no errors.

---

### Task 1: Project scaffold + Tailwind build + SEO head skeleton

**Files:**
- Create: `package.json`, `tailwind.config.js`, `assets/css/tailwind.src.css`, `.gitignore`
- Create/overwrite: `assets/css/main.css` (build output)
- Rewrite (skeleton only): `index.html`

**Interfaces:**
- Produces: compiled `assets/css/main.css`; `index.html` with `<head>` SEO block, dark `<body>` shell, and `<link rel="stylesheet" href="assets/css/main.css">`. Later tasks fill `<body>` sections.

- [ ] **Step 1: Create `.gitignore` entry**

Append to `.gitignore`:
```
node_modules/
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "jezdimirovic-portfolio",
  "version": "2.0.0",
  "private": true,
  "description": "Personal portfolio of Zoran Jezdimirović",
  "scripts": {
    "build:css": "tailwindcss -i ./assets/css/tailwind.src.css -o ./assets/css/main.css --minify",
    "watch:css": "tailwindcss -i ./assets/css/tailwind.src.css -o ./assets/css/main.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

- [ ] **Step 3: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        base: '#0a0e17',      // dark navy background
        surface: '#111827',   // card surface
        line: '#1f2937',      // borders
        muted: '#94a3b8',     // secondary text
        ink: '#e5edf5',       // primary text
        accent: '#22d3ee',    // cyan
        accent2: '#a78bfa',   // violet
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create `assets/css/tailwind.src.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-base text-ink font-sans antialiased; }
  ::selection { @apply bg-accent/30 text-ink; }
}

@layer components {
  .container-page { @apply mx-auto w-full max-w-6xl px-5 sm:px-8; }
  .section { @apply py-20 sm:py-28; }
  .eyebrow { @apply font-mono text-sm uppercase tracking-widest text-accent; }
  .h-section { @apply text-3xl sm:text-4xl font-bold text-ink; }
  .card { @apply rounded-xl border border-line bg-surface/60 p-6 transition hover:border-accent/50; }
  .tag { @apply inline-block rounded-md border border-line bg-base/60 px-2.5 py-1 font-mono text-xs text-muted; }
  .btn { @apply inline-flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition; }
  .btn-primary { @apply btn bg-accent-gradient text-base hover:opacity-90; }
  .btn-ghost { @apply btn border border-line text-ink hover:border-accent/60; }
  .reveal { @apply opacity-0 translate-y-4 transition-all duration-700; }
  .reveal.is-visible { @apply opacity-100 translate-y-0; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { @apply opacity-100 translate-y-0 transition-none; }
}
```

- [ ] **Step 5: Create `index.html` skeleton (head + empty body shell)**

Full `<head>` with SEO/OG/JSON-LD (self-hosted or Google Fonts link), body with empty `<header>`, `<main>`, `<footer>` placeholders and the CSS link. Head content:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Zoran Jezdimirović — Full-Stack .NET &amp; React Engineer</title>
  <meta name="description" content="Zoran Jezdimirović — senior full-stack software engineer with 12+ years building .NET and React products. Available for remote work and collaboration." />
  <meta name="keywords" content="Zoran Jezdimirović, full-stack developer, .NET engineer, React developer, C#, software engineer Serbia, remote developer" />
  <link rel="canonical" href="https://jezdimirovic.github.io/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Zoran Jezdimirović — Full-Stack .NET &amp; React Engineer" />
  <meta property="og:description" content="Senior full-stack engineer, 12+ years in .NET and React." />
  <meta property="og:url" content="https://jezdimirovic.github.io/" />
  <meta property="og:image" content="https://jezdimirovic.github.io/assets/img/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="assets/img/favicon.png" />
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/main.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zoran Jezdimirović",
    "jobTitle": "Full-Stack Software Engineer",
    "url": "https://jezdimirovic.github.io/",
    "sameAs": [
      "https://github.com/jezdimirovic",
      "https://www.linkedin.com/in/zoranjezdimirovic/"
    ]
  }
  </script>
</head>
<body>
  <header id="site-header"></header>
  <main></main>
  <footer id="site-footer"></footer>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```
(Self-hosting fonts is preferred; the Google Fonts `<link>` above is acceptable for v1 — switch to self-host in Task 8 if time allows.)

- [ ] **Step 6: Install deps and build CSS**

Run:
```bash
npm install
npm run build:css
```
Expected: `assets/css/main.css` is created/updated, no build errors.

- [ ] **Step 7: Verify page loads with dark theme**

Run:
```bash
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ | grep -q 'assets/css/main.css' && echo "CSS linked OK"
grep -q 'bg-base' assets/css/main.css && echo "theme compiled OK"
kill $SRV
```
Expected: both "OK" lines print. Open `http://localhost:8099/` in a browser: background is dark navy, no console errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tailwind.config.js .gitignore assets/css/tailwind.src.css assets/css/main.css index.html
git commit -m "feat: scaffold Tailwind build + SEO head skeleton"
```

---

### Task 2: Navigation, hero, footer + interaction JS

**Files:**
- Modify: `index.html` (fill `<header>`, add hero to `<main>`, fill `<footer>`)
- Create: `assets/js/main.js`

**Interfaces:**
- Consumes: `.btn-primary`, `.btn-ghost`, `.container-page`, `.reveal` from Task 1.
- Produces: nav anchor links (`#about #skills #experience #projects #companies #contact`) that later tasks' section `id`s must match; `.reveal` + `is-visible` toggling available site-wide; `data-typed` hook on hero role element.

- [ ] **Step 1: Add sticky nav to `<header>`**

Nav with brand `ZJ`, desktop anchor links (About, Skills, Experience, Projects, Companies, Contact), a "Download CV" button linking `assets/cv/Zoran-Jezdimirovic-CV.pdf`, and a mobile hamburger button `#nav-toggle` controlling `#nav-menu`. Use `.container-page`, `bg-base/80 backdrop-blur border-b border-line`, `sticky top-0 z-50`.

- [ ] **Step 2: Add hero section to `<main>`**

```html
<section id="hero" class="section min-h-[92vh] flex items-center">
  <div class="container-page">
    <p class="eyebrow">Full-Stack Engineer · London (remote)</p>
    <h1 class="mt-4 text-5xl sm:text-7xl font-bold tracking-tight">Zoran Jezdimirović</h1>
    <p class="mt-6 text-xl text-muted font-mono">
      <span class="text-accent">&gt;</span>
      <span id="typed-role" data-typed="Full-Stack .NET + React Engineer|.NET &amp; C# specialist|React &amp; TypeScript developer|Co-Owner @ Jezda Solutions"></span><span class="animate-pulse">_</span>
    </p>
    <p class="mt-6 max-w-2xl text-lg text-muted">12+ years building production software — .NET back ends, React front ends, and full ERP platforms.</p>
    <div class="mt-10 flex flex-wrap gap-4">
      <a href="#projects" class="btn-primary">View Work</a>
      <a href="assets/cv/Zoran-Jezdimirovic-CV.pdf" class="btn-ghost" download>Download CV</a>
    </div>
    <div class="mt-8 flex gap-5 text-muted">
      <a href="https://github.com/jezdimirovic" aria-label="GitHub" class="hover:text-accent">GitHub</a>
      <a href="https://www.linkedin.com/in/zoranjezdimirovic/" aria-label="LinkedIn" class="hover:text-accent">LinkedIn</a>
      <a href="mailto:zoran.jezdimirovic@gmail.com" aria-label="Email" class="hover:text-accent">Email</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add footer**

Footer with `© 2026 Zoran Jezdimirović`, quick anchor links, and a small "Built with Tailwind · Hosted on GitHub Pages" line. Use `border-t border-line text-muted`.

- [ ] **Step 4: Write `assets/js/main.js`**

```js
// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('hidden'));
  navMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => navMenu.classList.add('hidden'))
  );
}

// On-scroll reveal
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduce) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Scroll-spy: highlight active nav link
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('[data-nav]');
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((l) => l.classList.toggle('text-accent', l.getAttribute('href') === `#${e.target.id}`));
    }
  }),
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => spy.observe(s));

// Typed role effect
const typedEl = document.getElementById('typed-role');
if (typedEl && !reduce) {
  const phrases = (typedEl.dataset.typed || '').split('|').filter(Boolean);
  let pi = 0, ci = 0, deleting = false;
  const tick = () => {
    const word = phrases[pi];
    typedEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
    else if (ci > 0) { ci--; setTimeout(tick, 35); }
    else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 300); }
  };
  tick();
} else if (typedEl) {
  typedEl.textContent = (typedEl.dataset.typed || '').split('|')[0];
}
```
(Nav links in Step 1 must carry `data-nav` and `href="#section"` for scroll-spy.)

- [ ] **Step 5: Rebuild CSS and verify**

Run:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ > /tmp/page.html
grep -q 'Zoran Jezdimirović' /tmp/page.html && echo "hero OK"
grep -q 'id="nav-menu"' /tmp/page.html && echo "nav OK"
grep -q 'Download CV' /tmp/page.html && echo "cta OK"
kill $SRV
```
Expected: three "OK" lines. Browser check: hero renders, typed effect animates, mobile hamburger toggles the menu, no console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/js/main.js assets/css/main.css
git commit -m "feat: nav, hero, footer + interaction JS"
```

---

### Task 3: About + Skills sections

**Files:**
- Modify: `index.html` (add `#about`, `#skills` to `<main>`)

**Interfaces:**
- Consumes: `.section`, `.container-page`, `.eyebrow`, `.h-section`, `.card`, `.tag`, `.reveal`.
- Produces: `#about` and `#skills` section anchors.

- [ ] **Step 1: Add About section**

Two-column: optimized `profile-img.jpg` (rounded, bordered) + copy. Text (from CV, no personal identifiers):
> Senior full-stack software engineer with 12+ years shipping production systems across fintech, iGaming, banking, and retail. Deep in the Microsoft stack (.NET / C#) with a strong React/TypeScript front-end practice and a test-driven approach. Currently building complex web apps at Kaizen Ticketing (London, remote) and, as co-owner of Jezda Solutions, an entire modular ERP platform, POS, and e-commerce suite.

Include compact facts row: `12+ yrs experience`, `London · remote`, `Bachelor — Belgrade Metropolitan University`, `Available for work`. **No date of birth.**

- [ ] **Step 2: Add Skills section**

Four `.card` groups with `.tag` chips (from `cv.docx`):
- **Backend:** C#, .NET / ASP.NET Core, EF Core, CQRS, Web API, REST
- **Frontend:** React, Angular, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- **Data:** PostgreSQL, MS SQL Server, Redis, Firebase
- **Practices & DevOps:** TDD (NUnit/xUnit), Docker, Git, CI/CD, Agile

- [ ] **Step 3: Rebuild CSS and verify**

Run:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ > /tmp/page.html
grep -q 'id="about"' /tmp/page.html && grep -q 'id="skills"' /tmp/page.html && echo "sections OK"
grep -q 'EF Core' /tmp/page.html && echo "skills content OK"
kill $SRV
```
Expected: both "OK" lines. Browser check: sections render, cards laid out, reveal animates on scroll.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: about + skills sections"
```

---

### Task 4: Experience timeline

**Files:**
- Modify: `index.html` (add `#experience`)

**Interfaces:**
- Consumes: `.section`, `.container-page`, `.card`, `.tag`, `.reveal`.
- Produces: `#experience` anchor.

- [ ] **Step 1: Add Experience section (vertical timeline)**

One entry per role, newest first, each with title, company, location/mode, dates, 1–2 line description, tech tags. Exact content (from `cv.docx` / spec):

1. **Software Developer — Kaizen Ticketing**, London, UK (remote) · 2023–Present. Building and maintaining complex web apps with .NET Core and React; TDD with NUnit; PostgreSQL optimization; Redis-in-Docker caching. Tags: .NET Core, React, PostgreSQL, Redis, TDD.
2. **Co-Owner / Founder — Jezda Solutions** · 2022–Present. Running a software studio: a modular ERP platform, cross-platform POS, e-commerce storefronts, and dedicated development teams for international clients. Tags: .NET, React, Flutter, PostgreSQL.
3. **Software Developer — Bethard**, Belgrade (hybrid) · 2021–2023. iGaming platforms in C# MVC + Web API; optimized large MS SQL stored procedures; third-party API integrations. Tags: C#, MVC, Web API, MS SQL.
4. **Software Developer — CPA Global**, Belgrade (hybrid) · 2020–2021. Designed high-performance APIs for complex business logic; maintained a large AngularJS front end. Tags: .NET, AngularJS, REST.
5. **Software Developer — GET**, Belgrade (office) · 2016–2020. Banking solutions in C# MVC + MS SQL; a Xamarin mobile app for a leading bank; led a Swiss warehouse project (dev + PM). Tags: C#, MVC, Xamarin, MS SQL.
6. **Mobile Web Developer — Usablenet**, Belgrade (office) · 2012–2016. Transformed sites into optimized mobile experiences with XML/XPath/XSLT and responsive HTML/CSS/JS. Tags: XSLT, XML, JavaScript, jQuery.

Add an education line: **Bachelor's — Management of IT Systems, Belgrade Metropolitan University · 2008–2013**.

- [ ] **Step 2: Rebuild CSS and verify**

Run:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ | tee /tmp/page.html | grep -q 'id="experience"' && echo "section OK"
grep -q 'Kaizen Ticketing' /tmp/page.html && grep -q 'Usablenet' /tmp/page.html && echo "roles OK"
kill $SRV
```
Expected: both "OK" lines. Browser check: timeline renders top-to-bottom, all 6 roles + education present.

- [ ] **Step 3: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: experience timeline"
```

---

### Task 5: Projects section

**Files:**
- Modify: `index.html` (add `#projects`)

**Interfaces:**
- Consumes: `.section`, `.container-page`, `.card`, `.tag`, `.reveal`.
- Produces: `#projects` anchor.

- [ ] **Step 1: Add Projects grid**

Grid of `.card`s, each: title, one-line overview, tech tags, and a link only where public/live. Content (from spec catalog):

- **Jezda Platform** — Modular-monolith ERP unifying identity, HR, tasks, commerce/retail, accounting, finance, CRM and notifications behind one Web API. Tags: .NET 10, PostgreSQL, EF Core, CQRS, Hangfire. *(private)*
- **SERP** — Unified React SPA front end for the platform: commerce, HRMS, tasks, accounting and real-time notifications with shared auth and permissions. Tags: React 19, TypeScript, Vite, Tailwind, SignalR. *(private)*
- **Jezda POS** — Cross-platform Point-of-Sale (Windows + Android) with retail & HoReCa modes, fiscal receipts, split payments, inventory, loyalty and platform sync. Tags: Flutter, Dart, ESC/POS. *(private)*
- **Golub** — Smart email relay that stacks multiple providers' free tiers (SendGrid, Brevo, Mandrill) with priority rotation, quota tracking and full audit logging. Tags: .NET 9, PostgreSQL, MIT. *(private code)*
- **Jezda Common Libs** — Published reusable .NET NuGet libraries (domain, data access, integrations) underpinning the platform. Tags: .NET 10, NuGet. **Link:** `https://github.com/jezda-solutions/common-libs` *(public)*
- **PriceRadar** — Retail price-intelligence scraper harvesting products, barcodes and images from 23 Serbian chains via a stealth browser, feeding the platform. Tags: Node.js, stealth browser, Docker. *(private)*
- **Storefronts** — Modern e-commerce fronts on the platform's commerce API: ASIX (Next.js 16 / React 19), Wearify, Bon Appetit, and reusable shop templates. Tags: Next.js, React, TypeScript, Stripe. *(private)*
- **Piazza / Liflet.rs** — Digital promotional-leaflet platform for retail catalog offers. Tags: .NET, PostgreSQL. **Link:** `https://liflet.rs` *(live)*
- **jezda.net** — Jezda Solutions company site + multi-tenant admin. Tags: React 19, Vite, TypeScript, i18n. **Link:** `https://www.jezda.net` *(live)*
- **Sports Almanac** — Personal prematch arbitrage / sure-bet detector crawling bookmakers and flagging inverse-odds < 1 opportunities. Tags: Python, FastAPI, PostgreSQL. *(personal)*

Mark private items with a small `private` / commercial badge (no dead links).

- [ ] **Step 2: Rebuild CSS and verify**

Run:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ | tee /tmp/page.html | grep -q 'id="projects"' && echo "section OK"
grep -q 'Jezda Platform' /tmp/page.html && grep -q 'Golub' /tmp/page.html && echo "projects OK"
grep -q 'github.com/jezda-solutions/common-libs' /tmp/page.html && echo "public link OK"
kill $SRV
```
Expected: three "OK" lines. Browser check: grid renders, public/live links clickable, private items badged without links.

- [ ] **Step 3: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: projects section"
```

---

### Task 6: Companies + Contact (mailto)

**Files:**
- Modify: `index.html` (add `#companies`, `#contact`)

**Interfaces:**
- Consumes: `.section`, `.container-page`, `.card`, `.btn-primary`, `.reveal`.
- Produces: `#companies` and `#contact` anchors.

- [ ] **Step 1: Add "Companies I've worked with" strip**

Row of company names (text or simple monochrome wordmarks): Kaizen Ticketing, Bethard, CPA Global, GET, Usablenet, Jezda Solutions. Muted styling, hover to accent. No fabricated logos — text wordmarks are fine.

- [ ] **Step 2: Add Contact section (mailto, no live form yet)**

Heading + short line ("Have a project or role in mind? Let's talk.") and:
- Primary button `mailto:zoran.jezdimirovic@gmail.com?subject=Hello%20Zoran` labeled "Email me".
- Secondary links: LinkedIn, GitHub.
- A styled **non-submitting** contact card is acceptable, but the CTA must be the mailto (no fake form action). Do NOT embed any API key or endpoint.

- [ ] **Step 3: Rebuild CSS and verify**

Run:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ | tee /tmp/page.html | grep -q 'id="contact"' && echo "contact OK"
grep -q 'mailto:zoran.jezdimirovic@gmail.com' /tmp/page.html && echo "mailto OK"
grep -q 'id="companies"' /tmp/page.html && echo "companies OK"
! grep -qiE 'golub|x-api-key|VITE_' /tmp/page.html && echo "no secrets OK"
kill $SRV
```
Expected: four "OK" lines (including "no secrets OK").

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: companies + contact (mailto)"
```

---

### Task 7: Assets — CV PDF, OG image, image cleanup

**Files:**
- Create: `assets/cv/Zoran-Jezdimirovic-CV.pdf`, `assets/img/og-image.png`
- Modify: `assets/img/profile-img.jpg` (optimized)
- Delete: unused template images + folders

**Interfaces:**
- Consumes: nothing.
- Produces: `assets/cv/Zoran-Jezdimirovic-CV.pdf` (referenced by hero + nav), `assets/img/og-image.png` (referenced by head).

- [ ] **Step 1: Generate CV PDF from `cv.docx`**

Fetch `cv.docx` content (already extracted in the spec / Google Drive) and produce a clean 1–2 page PDF. Prefer a simple pipeline, e.g. author a minimal HTML CV and render to PDF, or use `pandoc cv.md -o Zoran-Jezdimirovic-CV.pdf` if available. Place at `assets/cv/Zoran-Jezdimirovic-CV.pdf`. Verify it opens and text is selectable.

Run:
```bash
mkdir -p assets/cv
# ...generate PDF into assets/cv/Zoran-Jezdimirovic-CV.pdf...
test -s assets/cv/Zoran-Jezdimirovic-CV.pdf && echo "CV PDF OK"
```
Expected: "CV PDF OK".

- [ ] **Step 2: Create OG image (1200×630)**

Dark card with name + role + accent gradient. Generate `assets/img/og-image.png` at 1200×630. Verify dimensions:
```bash
python3 -c "from PIL import Image; im=Image.open('assets/img/og-image.png'); print(im.size)"
```
Expected: `(1200, 630)`.

- [ ] **Step 3: Optimize profile image and remove cruft**

```bash
# optimize profile-img.jpg (resize max 800px wide, recompress)
python3 - <<'PY'
from PIL import Image
im = Image.open('assets/img/profile-img.jpg')
im.thumbnail((800, 1000))
im.save('assets/img/profile-img.jpg', quality=82, optimize=True)
print('profile optimized', im.size)
PY
git rm -q assets/img/delete.jpg assets/img/hero-bg-org.jpg assets/img/hero-bg1.jpg 2>/dev/null || true
```
Then remove `assets/img/portfolio/` and `assets/img/testimonials/` if unreferenced by `index.html`:
```bash
grep -rq 'img/portfolio' index.html || git rm -qr assets/img/portfolio 2>/dev/null || true
grep -rq 'img/testimonials' index.html || git rm -qr assets/img/testimonials 2>/dev/null || true
```

- [ ] **Step 4: Verify page still references valid assets**

```bash
for a in assets/img/profile-img.jpg assets/img/og-image.png assets/cv/Zoran-Jezdimirovic-CV.pdf assets/img/favicon.png; do test -s "$a" && echo "ok $a" || echo "MISSING $a"; done
```
Expected: four "ok" lines, no "MISSING".

- [ ] **Step 5: Commit**

```bash
git add assets/cv assets/img/og-image.png assets/img/profile-img.jpg
git add -u assets/img
git commit -m "feat: CV PDF, OG image, optimize + prune images"
```

---

### Task 8: SEO files, manifest, template cleanup, final audit

**Files:**
- Create: `robots.txt`, `sitemap.xml`, `site.webmanifest`
- Modify: `README.md`
- Delete: `portfolio-details.html`, `forms/`, `assets/vendor/`, `assets/scss/`, template `Readme.txt` files, unused `assets/js` template leftovers

- [ ] **Step 1: Create `robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://jezdimirovic.github.io/sitemap.xml
```

- [ ] **Step 2: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://jezdimirovic.github.io/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
```

- [ ] **Step 3: Create `site.webmanifest`**

```json
{
  "name": "Zoran Jezdimirović — Portfolio",
  "short_name": "Zoran J.",
  "icons": [{ "src": "assets/img/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }],
  "theme_color": "#0a0e17",
  "background_color": "#0a0e17",
  "display": "standalone"
}
```

- [ ] **Step 4: Remove all template leftovers**

```bash
git rm -q portfolio-details.html 2>/dev/null || true
git rm -qr forms assets/vendor assets/scss 2>/dev/null || true
git rm -q Readme.txt assets/*/Readme.txt 2>/dev/null || true
# remove old template JS if any remain and are unreferenced
grep -rq 'assets/js/' index.html && echo "keep referenced js"
```
Confirm nothing referenced by `index.html` was deleted:
```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
for path in $(grep -oE '(href|src)="[^"]+"' index.html | sed -E 's/.*="([^"]+)".*/\1/' | grep -vE '^https?://|^mailto:|^#'); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:8099/$path"); echo "$code $path"; done
kill $SRV
```
Expected: every local asset returns `200` (no `404`).

- [ ] **Step 5: Update `README.md`**

```markdown
# jezdimirovic.github.io

Personal portfolio of Zoran Jezdimirović — Full-Stack .NET & React Engineer.

## Local development

```sh
npm install
npm run watch:css   # rebuild Tailwind on change
python3 -m http.server 8099   # serve at http://localhost:8099
```

Build production CSS: `npm run build:css`. Static site, hosted on GitHub Pages.
```

- [ ] **Step 6: Accessibility + Lighthouse pass**

Manual/browser audit at `http://localhost:8099/`:
- All images have `alt`. Interactive elements reachable by keyboard with visible focus.
- Color contrast AA on dark background.
- `prefers-reduced-motion` disables typed effect + reveal (toggle in devtools to confirm).
- Run Lighthouse (Chrome devtools). Target: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100. Fix any flagged issues inline.

- [ ] **Step 7: Commit**

```bash
git add robots.txt sitemap.xml site.webmanifest README.md
git add -u
git commit -m "chore: SEO files, manifest, remove template leftovers"
```

---

### Task 9: Final review, PR, and Pages deploy note

- [ ] **Step 1: Full-page smoke test**

```bash
npm run build:css
python3 -m http.server 8099 --directory . >/tmp/srv.log 2>&1 &
SRV=$!; sleep 1
curl -s http://localhost:8099/ > /tmp/page.html
for id in hero about skills experience projects companies contact; do grep -q "id=\"$id\"" /tmp/page.html && echo "ok #$id" || echo "MISSING #$id"; done
! grep -qiE 'lorem|ipsum|golub|x-api-key' /tmp/page.html && echo "clean OK"
kill $SRV
```
Expected: seven "ok" lines + "clean OK", no "MISSING".

- [ ] **Step 2: Push branch and open PR**

```bash
git push -u origin feature/portfolio-redesign-v2
gh pr create --base dev --title "Portfolio redesign v2 (dark developer, Tailwind)" --body "Full rebuild per docs/plans/2026-07-12-portfolio-redesign-design.md. Dark developer theme, Tailwind CLI build, real CV/experience/projects, mailto contact. Golub-backed form is Phase 2."
```

- [ ] **Step 3: Note GitHub Pages source**

After merge, confirm GitHub Pages "Build and deployment" source points at the branch that serves the site (repo Settings → Pages). For a `username.github.io` user site this is typically `main`/`master` root. If the site currently deploys from a different branch, coordinate the merge target accordingly (the plan opens the PR against `dev` per repo convention; final publish branch is a repo setting to verify, not a code change).

---

## Self-Review Notes

- **Spec coverage:** hero/about/skills/experience/projects/companies/contact (Tasks 2–6); Tailwind build (Task 1); mailto contact (Task 6); CV PDF + OG + image prune (Task 7); SEO/JSON-LD/robots/sitemap/manifest + a11y + reduced-motion (Tasks 1, 8); template/vendor removal (Task 8); privacy (no DOB/JMBG enforced in Tasks 3 & content rules). Phase-2 Golub form correctly excluded.
- **Placeholder scan:** CV PDF generation (Task 7 Step 1) and OG image (Task 7 Step 2) describe the deliverable + verification but leave the exact rendering tool to the implementer since available binaries (pandoc/wkhtmltopdf/Pillow) vary — acceptable, each has a concrete pass check.
- **Type/anchor consistency:** section `id`s (`hero,about,skills,experience,projects,companies,contact`) match nav `href`s and the Task 9 smoke test; CSS component classes defined in Task 1 are reused verbatim throughout.
