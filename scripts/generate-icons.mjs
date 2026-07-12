// Generates branded PWA / favicon icons from an inline SVG monogram via sharp.
// Outputs: icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png (180), favicon.svg
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const BASE = '#0a0e17';
const CYAN = '#22d3ee';
const VIOLET = '#a78bfa';

// `pad` = fraction of padding around the monogram (maskable needs a safe zone).
function monogramSVG(size, { rounded = 0.18, pad = 0.0 } = {}) {
  const r = Math.round(size * rounded);
  const fontSize = Math.round(size * (0.5 - pad * 0.6));
  const cy = size / 2 + fontSize * 0.02;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CYAN}"/>
      <stop offset="1" stop-color="${VIOLET}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${BASE}"/>
  <text x="50%" y="${cy}" text-anchor="middle" dominant-baseline="central"
        font-family="'JetBrains Mono','Courier New',monospace" font-weight="700"
        font-size="${fontSize}" fill="url(#g)">ZJ</text>
</svg>`;
}

const targets = [
  { file: 'assets/img/icon-192.png', size: 192, opts: {} },
  { file: 'assets/img/icon-512.png', size: 512, opts: {} },
  // maskable: extra padding so the monogram stays inside the safe zone when cropped
  { file: 'assets/img/icon-maskable-512.png', size: 512, opts: { rounded: 0, pad: 0.16 } },
  { file: 'assets/img/apple-touch-icon.png', size: 180, opts: {} },
];

for (const t of targets) {
  await sharp(Buffer.from(monogramSVG(t.size, t.opts))).png().toFile(t.file);
  console.log('wrote', t.file);
}

// Scalable favicon
writeFileSync('assets/img/favicon.svg', monogramSVG(64));
console.log('wrote assets/img/favicon.svg');
