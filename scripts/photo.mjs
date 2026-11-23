#!/usr/bin/env node
/**
 * Swap in a new photo (e.g. Rosendale camera originals replacing screenshots).
 *   npm run photo -- <source image> <gym>/<file-name>
 *   npm run photo -- ~/Desktop/IMG_1234.jpg rosendale/rosendale-whole-room
 *
 * Auto-rotates from EXIF, resizes to 2400 px on the long edge (never upscales) and saves a
 * quality-84 progressive JPEG to public/media/<gym>/<file-name>.jpg — overwriting the old file at the
 * same path. Every page that imports that file picks up the new photo (and its new size and blur
 * placeholder) automatically. Afterwards: check the alt text still describes the new photo, and
 * remove `source: "screenshot"` from its entry in lib/data/pages/<gym>.ts.
 * (Uses sharp, which Next.js already installs for image optimisation.)
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [src, dest] = process.argv.slice(2);
if (!src || !dest || !/^[a-z]+\/[a-z0-9-]+$/.test(dest)) {
  console.error("usage: npm run photo -- <source image> <gym>/<file-name>   (e.g. rosendale/rosendale-whole-room)");
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`not found: ${src}`);
  process.exit(1);
}
const out = resolve(import.meta.dirname, "../public/media", `${dest}.jpg`);
mkdirSync(dirname(out), { recursive: true });
const info = await sharp(src)
  .rotate()
  .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(out);
console.log(`saved public/media/${dest}.jpg — ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`);
