// Generates abstract mesh-gradient SVG cover art for projects, case studies, and blog posts.
// Run with: node scripts/generate-cover-art.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const PALETTES = {
  blue: ["#2563eb", "#6366f1", "#06b6d4"],
  purple: ["#8b5cf6", "#6366f1", "#2563eb"],
  emerald: ["#10b981", "#06b6d4", "#2563eb"],
  cyan: ["#06b6d4", "#2563eb", "#8b5cf6"],
  indigo: ["#6366f1", "#8b5cf6", "#10b981"],
  sunrise: ["#2563eb", "#10b981", "#8b5cf6"],
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function blobPath(rand, cx, cy, r) {
  const points = 8;
  const angleStep = (Math.PI * 2) / points;
  let d = "";
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const radius = r * (0.75 + rand() * 0.5);
    pts.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }
  d += `M ${pts[0][0]},${pts[0][1]} `;
  for (let i = 0; i < points; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % points];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += `Q ${x0},${y0} ${mx},${my} `;
  }
  d += "Z";
  return d;
}

function generateArt({ width, height, seed, palette, monogram, dense = false }) {
  const rand = seededRandom(hashStr(seed));
  const [c1, c2, c3] = PALETTES[palette] ?? PALETTES.blue;
  const id = `g${hashStr(seed)}`;

  const blobs = [];
  const blobCount = dense ? 4 : 3;
  for (let i = 0; i < blobCount; i++) {
    const cx = width * (0.15 + rand() * 0.7);
    const cy = height * (0.15 + rand() * 0.7);
    const r = Math.min(width, height) * (0.22 + rand() * 0.2);
    const colors = [c1, c2, c3];
    blobs.push(
      `<path d="${blobPath(rand, cx, cy, r)}" fill="${colors[i % 3]}" opacity="${0.35 + rand() * 0.2}" filter="url(#${id}-blur)" />`
    );
  }

  const lines = [];
  const lineCount = 5;
  for (let i = 0; i < lineCount; i++) {
    const y = (height / (lineCount + 1)) * (i + 1);
    lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="white" stroke-opacity="0.06" stroke-width="1" />`);
  }

  const monogramBlock = monogram
    ? `
    <g transform="translate(${width - 84}, ${height - 84})">
      <rect width="56" height="56" rx="14" fill="white" fill-opacity="0.14" />
      <text x="28" y="36" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="white" text-anchor="middle">${monogram}</text>
    </g>`
    : "";

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f1115" />
      <stop offset="100%" stop-color="#181b22" />
    </linearGradient>
    <filter id="${id}-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${Math.min(width, height) * 0.045}" />
    </filter>
    <filter id="${id}-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.02 0" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id}-bg)" />
  ${blobs.join("\n  ")}
  ${lines.join("\n  ")}
  <rect width="${width}" height="${height}" filter="url(#${id}-noise)" />
  ${monogramBlock}
</svg>`;
}

function write(path, svg) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg, "utf8");
  console.log("wrote", path);
}

const ROOT = "public/images";

const projects = [
  { file: "projects/attribution-engine.svg", seed: "attribution-engine", palette: "blue", monogram: "RA" },
  { file: "projects/webgl-experience.svg", seed: "webgl-experience", palette: "purple", monogram: "3D" },
  { file: "projects/admin-console.svg", seed: "admin-console", palette: "emerald", monogram: "OPS" },
  { file: "projects/cms-platform.svg", seed: "cms-platform", palette: "cyan", monogram: "CMS" },
];

const caseStudies = [
  { file: "case-studies/ashford-cover.svg", seed: "ashford-cover", palette: "blue", monogram: "AL", w: 800, h: 600 },
  { file: "case-studies/ashford-hero.svg", seed: "ashford-hero", palette: "blue", monogram: "AL", w: 1600, h: 900, dense: true },
  { file: "case-studies/nordwind-cover.svg", seed: "nordwind-cover", palette: "emerald", monogram: "NH", w: 800, h: 600 },
  { file: "case-studies/nordwind-hero.svg", seed: "nordwind-hero", palette: "emerald", monogram: "NH", w: 1600, h: 900, dense: true },
  { file: "case-studies/vantage-cover.svg", seed: "vantage-cover", palette: "indigo", monogram: "VC", w: 800, h: 600 },
  { file: "case-studies/vantage-hero.svg", seed: "vantage-hero", palette: "indigo", monogram: "VC", w: 1600, h: 900, dense: true },
  { file: "case-studies/circuitry-cover.svg", seed: "circuitry-cover", palette: "sunrise", monogram: "CR", w: 800, h: 600 },
  { file: "case-studies/circuitry-hero.svg", seed: "circuitry-hero", palette: "sunrise", monogram: "CR", w: 1600, h: 900, dense: true },
];

const blogPosts = [
  { file: "blog/attribution-scale.svg", seed: "attribution-scale", palette: "blue" },
  { file: "blog/abm-maturity.svg", seed: "abm-maturity", palette: "purple" },
  { file: "blog/csuite-dashboard.svg", seed: "csuite-dashboard", palette: "indigo" },
  { file: "blog/composable-martech.svg", seed: "composable-martech", palette: "cyan" },
  { file: "blog/predictive-scoring.svg", seed: "predictive-scoring", palette: "emerald" },
  { file: "blog/consolidation-cost.svg", seed: "consolidation-cost", palette: "sunrise" },
];

const avatars = [
  { file: "blog/author-evelyn.svg", seed: "evelyn-marsh", palette: "purple", monogram: "EM" },
  { file: "blog/author-tomas.svg", seed: "tomas-reindl", palette: "blue", monogram: "TR" },
];

for (const p of projects) {
  write(`${ROOT}/${p.file}`, generateArt({ width: 800, height: 600, seed: p.seed, palette: p.palette, monogram: p.monogram }));
}
for (const c of caseStudies) {
  write(`${ROOT}/${c.file}`, generateArt({ width: c.w, height: c.h, seed: c.seed, palette: c.palette, monogram: c.monogram, dense: c.dense }));
}
for (const b of blogPosts) {
  write(`${ROOT}/${b.file}`, generateArt({ width: 800, height: 500, seed: b.seed, palette: b.palette }));
}
for (const a of avatars) {
  write(`${ROOT}/${a.file}`, generateArt({ width: 200, height: 200, seed: a.seed, palette: a.palette, monogram: a.monogram }));
}

console.log("Done.");
