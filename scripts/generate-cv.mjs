#!/usr/bin/env node
// Renders the downloadable CV PDF from scripts/cv-data.js using pdfkit.
// Deterministic: re-running `npm run build:cv` regenerates the same content
// (only the PDF's internal CreationDate metadata may differ byte-for-byte).
//
// Light-themed / print-friendly on purpose — this is a document people print,
// not a reskin of the dark website theme.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { cv } from './cv-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'assets', 'cv');
const OUT_FILE = path.join(OUT_DIR, 'Zoran-Jezdimirovic-CV.pdf');

const COLOR = {
  ink: '#111827', // near-black body text
  subtle: '#4b5563', // secondary/meta text
  accent: '#0e7490', // darker teal — legible on white print (site cyan is #22d3ee)
  rule: '#9ca3af',
};

const FONT = {
  regular: 'Sans',
  bold: 'Sans-Bold',
};

fs.mkdirSync(OUT_DIR, { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 46, bottom: 46, left: 54, right: 54 },
  info: {
    Title: `${cv.name} - CV`,
    Author: cv.name,
  },
});

// The name "Jezdimirović" and other Serbian Latin text use diacritics (ć, č,
// š, ž, đ) outside the standard 14 PDF fonts' WinAnsi encoding. Embed DejaVu
// Sans (bundled in assets/fonts/dejavu/, not relying on the host system's
// fonts) so the PDF renders correctly and reproducibly on any machine.
const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts', 'dejavu');
doc.registerFont(FONT.regular, path.join(FONTS_DIR, 'DejaVuSans.ttf'));
doc.registerFont(FONT.bold, path.join(FONTS_DIR, 'DejaVuSans-Bold.ttf'));

const stream = fs.createWriteStream(OUT_FILE);
doc.pipe(stream);

let pageCount = 1;
doc.on('pageAdded', () => {
  pageCount += 1;
});

const left = doc.page.margins.left;
const right = doc.page.width - doc.page.margins.right;

function sectionHeader(title) {
  doc.moveDown(0.8);
  doc
    .font(FONT.bold)
    .fontSize(11)
    .fillColor(COLOR.accent)
    .text(title.toUpperCase(), { characterSpacing: 1.1 });
  const ruleY = doc.y + 2;
  doc.moveTo(left, ruleY).lineTo(right, ruleY).lineWidth(1).strokeColor(COLOR.accent).stroke();
  doc.moveDown(0.55);
  doc.fillColor(COLOR.ink);
}

// ---- Header ----
doc.font(FONT.bold).fontSize(23).fillColor(COLOR.ink).text(cv.name);
doc.font(FONT.regular).fontSize(13).fillColor(COLOR.accent).text(cv.title);
doc.font(FONT.regular).fontSize(10).fillColor(COLOR.subtle).text(cv.location);

doc.moveDown(0.35);
const contactLine = [cv.contact.email, cv.contact.website, cv.contact.linkedin, cv.contact.github].join('   ·   ');
doc.font(FONT.regular).fontSize(9.5).fillColor(COLOR.subtle).text(contactLine);

doc.moveDown(0.5);
doc.moveTo(left, doc.y).lineTo(right, doc.y).lineWidth(1.2).strokeColor(COLOR.rule).stroke();

// ---- Summary ----
sectionHeader('Summary');
doc.font(FONT.regular).fontSize(10).fillColor(COLOR.ink).text(cv.summary, { lineGap: 2 });

// ---- Skills ----
sectionHeader('Skills');
cv.skills.forEach((s) => {
  doc.font(FONT.bold).fontSize(9.5).fillColor(COLOR.ink).text(`${s.group}:  `, { continued: true });
  doc.font(FONT.regular).fontSize(9.5).fillColor(COLOR.subtle).text(s.items);
});

// ---- Experience ----
sectionHeader('Experience');
cv.experience.forEach((job, idx) => {
  doc.font(FONT.bold).fontSize(10.5).fillColor(COLOR.ink).text(job.role, { continued: true });
  doc.font(FONT.regular).fontSize(10.5).fillColor(COLOR.ink).text(`  —  ${job.company}`);
  doc.font(FONT.regular).fontSize(9).fillColor(COLOR.subtle).text(`${job.place}    ${job.dates}`);
  doc.moveDown(0.2);
  job.bullets.forEach((b) => {
    doc.font(FONT.regular).fontSize(9.5).fillColor(COLOR.ink).text(`•  ${b}`, { lineGap: 1 });
  });
  if (idx !== cv.experience.length - 1) doc.moveDown(0.45);
});

// ---- Education ----
sectionHeader('Education');
doc.font(FONT.bold).fontSize(10.5).fillColor(COLOR.ink).text(cv.education.degree);
doc.font(FONT.regular).fontSize(9.5).fillColor(COLOR.subtle).text(`${cv.education.school}    ${cv.education.dates}`);

doc.end();

stream.on('finish', () => {
  console.log(`CV PDF written to ${path.relative(process.cwd(), OUT_FILE)} (${pageCount} page(s))`);
});
