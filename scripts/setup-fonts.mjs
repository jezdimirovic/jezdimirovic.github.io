// One-off: self-host Inter + JetBrains Mono from @fontsource (no Google Fonts CDN).
// Copies the needed woff2 (latin + latin-ext so Serbian ć/č/š/ž/đ render) into
// assets/fonts/ and injects @font-face blocks at the top of tailwind.src.css.
// Re-runnable: skips the injection if @font-face is already present.
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const RANGES = {
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};

const FONTS = [
  { family: 'Inter', pkg: 'inter', slug: 'inter', weights: [400, 500, 600, 700] },
  { family: 'JetBrains Mono', pkg: 'jetbrains-mono', slug: 'jetbrains-mono', weights: [400, 500] },
];

mkdirSync('assets/fonts', { recursive: true });

let css = '/* Self-hosted fonts (Inter, JetBrains Mono) via @fontsource — no external CDN. */\n';
for (const f of FONTS) {
  for (const w of f.weights) {
    for (const subset of ['latin', 'latin-ext']) {
      const file = `${f.slug}-${subset}-${w}-normal.woff2`;
      const src = `node_modules/@fontsource/${f.pkg}/files/${file}`;
      if (!existsSync(src)) throw new Error(`missing ${src}`);
      copyFileSync(src, `assets/fonts/${file}`);
      css +=
        `@font-face{font-family:'${f.family}';font-style:normal;font-weight:${w};` +
        `font-display:swap;src:url('../fonts/${file}') format('woff2');` +
        `unicode-range:${RANGES[subset]};}\n`;
    }
  }
}

const TW = 'assets/css/tailwind.src.css';
let tw = readFileSync(TW, 'utf8');
if (tw.includes('@font-face')) {
  console.log('tailwind.src.css already has @font-face — skipping injection.');
} else {
  writeFileSync(TW, css + '\n' + tw);
  console.log('Injected @font-face blocks into tailwind.src.css.');
}
console.log('Copied woff2 files into assets/fonts/.');
