#!/usr/bin/env node
// Generates the social share (Open Graph) image at assets/img/og-image.png.
// Builds a 1200x630 SVG card and rasterizes it with sharp (via librsvg) — no
// browser or external tool needed. Re-running `npm run build:og` regenerates
// the same layout/content for the same inputs; exact glyph rendering depends
// on the "DejaVu Sans" / "DejaVu Sans Mono" families being resolvable via
// fontconfig on the host (present by default on most Linux dev/CI images).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, '..', 'assets', 'img', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const NAME = escapeXml('Zoran Jezdimirović');
const ROLE = escapeXml('Full-Stack .NET & React Engineer');
const EYEBROW = escapeXml('SOFTWARE ENGINEER · PORTFOLIO');
const TAG = escapeXml('</> jezdimirovic.github.io');

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>
    <radialGradient id="glow1" cx="82%" cy="16%" r="60%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="6%" cy="92%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0e17" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow1)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)" />

  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="url(#accent)" />

  <text x="90" y="210" font-family="DejaVu Sans Mono" font-size="22" fill="#22d3ee" letter-spacing="3px">${EYEBROW}</text>

  <text x="88" y="302" font-family="DejaVu Sans" font-weight="bold" font-size="72" fill="#f8fafc">${NAME}</text>

  <text x="90" y="362" font-family="DejaVu Sans" font-size="32" fill="#a78bfa">${ROLE}</text>

  <rect x="90" y="410" width="200" height="4" rx="2" fill="url(#accent)" />

  <text x="90" y="470" font-family="DejaVu Sans Mono" font-size="24" fill="#94a3b8">${TAG}</text>
</svg>
`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });

const buffer = await sharp(Buffer.from(svg), { density: 144 })
  .resize(WIDTH, HEIGHT)
  .png()
  .toBuffer();

fs.writeFileSync(OUT_FILE, buffer);
console.log(`OG image written to ${path.relative(process.cwd(), OUT_FILE)} (${WIDTH}x${HEIGHT})`);
