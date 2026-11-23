#!/usr/bin/env node
/**
 * Runs after `next build` (see package.json "build"). Finishes the static export in out/ for GitHub Pages:
 *
 * 1. WebP image copies. GitHub Pages has no image server, so for every JPG/PNG the site references
 *    (out/_next/static/media/… and out/media/…) this writes `<file>.w<width>.webp` at each width in
 *    images.deviceSizes + images.imageSizes (next.config.ts). lib/image-loader.ts points <Image> srcsets at
 *    them. Never upscales: widths above the original are encoded at the original size.
 * 2. Legacy Wix redirect pages. For each path in lib/data/legacy-redirects.json, writes out/<path>/index.html
 *    with location.replace() (keeps any #hash and ?query), a meta refresh fallback, a canonical tag pointing
 *    at the new page and noindex. /baraboo and /copy-of-berlin are not listed, so they get the 404 page.
 * 3. Sanity checks: fails the build if out/404.html, CNAME or .nojekyll is missing.
 *
 * Re-running is safe: existing .webp files newer than their source are skipped.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "out");
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const SITE = "https://www.fitnessgrizzly.com";
const WIDTHS = [64, 128, 256, 384, 640, 828, 1080, 1280, 1600, 1920, 2400];
const QUALITY = 72;

if (!existsSync(out)) {
  console.error("postbuild: out/ not found — run `next build` first (next.config.ts must have output: 'export').");
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

/* ---------- 1. WebP copies ---------- */
const files = walk(out);
const textFiles = files.filter((f) => /\.(html|txt|js|css|json|xml)$/.test(f));
// Paths the built pages/scripts actually reference. (?<![\w/]static) keeps "/_next/static/media/x" from
// also counting as "/media/x".
const refRe = /(?:\/_next\/static|(?<!static))\/media\/[A-Za-z0-9._\-/]+?\.(?:jpe?g|png|webp|svg|gif|mp4|ico)/gi;
const refs = new Set();
for (const f of textFiles) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(refRe)) refs.add(m[0]);
}
const sources = [...refs].filter((r) => /\.(jpe?g|png)$/i.test(r)).map((r) => join(out, r)).filter((p) => existsSync(p));

let made = 0;
let skipped = 0;
const t0 = Date.now();
const jobs = [];
for (const src of sources) {
  const srcTime = statSync(src).mtimeMs;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  for (const w of WIDTHS) jobs.push({ src, srcTime, w, dest: `${base}.w${w}.webp` });
}
const widthOf = new Map();
async function run(job) {
  if (existsSync(job.dest) && statSync(job.dest).mtimeMs >= job.srcTime) return skipped++;
  if (!widthOf.has(job.src)) widthOf.set(job.src, (await sharp(job.src).metadata()).width || job.w);
  await sharp(job.src)
    .rotate()
    .resize({ width: Math.min(job.w, widthOf.get(job.src)), withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(job.dest);
  made++;
}
const POOL = Math.max(2, Math.min(8, availableParallelism()));
await Promise.all(Array.from({ length: POOL }, async () => { while (jobs.length) await run(jobs.shift()); }));
console.log(`postbuild: ${sources.length} images → ${made} WebP files written, ${skipped} up to date (${((Date.now() - t0) / 1000).toFixed(1)} s)`);

// public/media is copied into out/media wholesale, but the photos are imported (and served from
// out/_next/static/media), so most of out/media is never requested. Drop the unreferenced copies to keep the
// deployment small. Only out/ is touched — public/media (the source photos) is never modified.
let pruned = 0;
const keep = new Set([...refs].map((r) => join(out, r)));
for (const f of walk(join(out, "media"))) {
  if (keep.has(f)) continue;
  const m = f.match(/^(.*)\.w\d+\.webp$/);
  if (m && [".jpg", ".jpeg", ".png"].some((e) => keep.has(m[1] + e))) continue;
  rmSync(f);
  pruned++;
}
console.log(`postbuild: pruned ${pruned} unreferenced files from out/media`);

/* ---------- 2. Legacy redirect pages ---------- */
const { redirects } = JSON.parse(readFileSync(join(root, "lib/data/legacy-redirects.json"), "utf8"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
let pages = 0;
for (const [from, target] of Object.entries(redirects)) {
  const [path, hash = ""] = target.split("#");
  const url = BASE + path + (hash ? `#${hash}` : "");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting… | Grizzly Fitness</title>
<meta name="robots" content="noindex">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="canonical" href="${esc(SITE + path)}">
<script>location.replace(${JSON.stringify(BASE + path)}+location.search+(location.hash||${JSON.stringify(hash ? `#${hash}` : "")}));</script>
<meta http-equiv="refresh" content="0; url=${esc(url)}">
<style>body{background:#0e0e0d;color:#efece4;font:16px/1.5 system-ui,sans-serif;padding:48px 24px}a{color:#f2b33d}</style>
</head>
<body>
<p>This page has moved to <a href="${esc(url)}">${esc(SITE + path)}</a>.</p>
</body>
</html>
`;
  const dest = join(out, from.replace(/^\//, ""), "index.html");
  if (existsSync(dest) && !readFileSync(dest, "utf8").includes("This page has moved")) {
    console.error(`postbuild: ${relative(root, dest)} already exists as a real page — refusing to overwrite it with a redirect.`);
    process.exit(1);
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  pages++;
}
console.log(`postbuild: ${pages} legacy redirect pages written${BASE ? ` (base path ${BASE})` : ""}`);

/* ---------- 3. Checks ---------- */
const missing = ["404.html", "CNAME", ".nojekyll", "robots.txt", "sitemap.xml"].filter((f) => !existsSync(join(out, f)));
if (missing.length) {
  console.error(`postbuild: missing from out/: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("postbuild: done — out/ is ready for GitHub Pages.");
