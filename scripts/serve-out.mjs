#!/usr/bin/env node
/**
 * Serves out/ the way GitHub Pages does, for checking a static build locally:
 *   npm run build && npm run preview      → http://localhost:3000
 * - /path/ → out/path/index.html ; /path (a folder) → 301 to /path/ ; /file.ext → that file
 * - anything else → out/404.html with status 404
 * - honours NEXT_PUBLIC_BASE_PATH (e.g. /grizzly-fitness-site) like a <user>.github.io/<repo>/ preview
 * - gzips text responses (GitHub Pages does too), so Lighthouse numbers are comparable
 * Port: PORT env var or 3000. No dependencies.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createGzip } from "node:zlib";

const out = resolve(import.meta.dirname, "../out");
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4", ".webmanifest": "application/manifest+json" };

if (!existsSync(out)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

let gzipOk = false;
function send(res, file, status = 200) {
  const type = types[extname(file)] || "application/octet-stream";
  const zip = gzipOk && /^(text|application\/(json|xml|manifest))|svg/.test(type);
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-cache", ...(zip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}) });
  const stream = createReadStream(file);
  (zip ? stream.pipe(createGzip()) : stream).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  gzipOk = /\bgzip\b/.test(req.headers["accept-encoding"] || "");
  let p = decodeURIComponent(url.pathname);
  if (BASE) {
    if (p === "/" ) { res.writeHead(302, { Location: BASE + "/" }); return res.end(); }
    if (p !== BASE && !p.startsWith(BASE + "/")) return send(res, join(out, "404.html"), 404);
    p = p.slice(BASE.length) || "/";
  }
  const file = normalize(join(out, p));
  if (!file.startsWith(out)) return send(res, join(out, "404.html"), 404);
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!p.endsWith("/")) { res.writeHead(301, { Location: BASE + p + "/" + url.search }); return res.end(); }
    const idx = join(file, "index.html");
    return existsSync(idx) ? send(res, idx) : send(res, join(out, "404.html"), 404);
  }
  if (existsSync(file)) return send(res, file);
  if (existsSync(file + ".html")) return send(res, file + ".html");
  return send(res, join(out, "404.html"), 404);
}).listen(port, () => console.log(`Serving out/ like GitHub Pages → http://localhost:${port}${BASE}/`));
