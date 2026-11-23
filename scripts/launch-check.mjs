#!/usr/bin/env node
/**
 * Launch check (Milestone E). Development-only † markers hide unconfirmed data in production builds,
 * but hiding a marker does not make the data correct. This script lists every value in lib/data that
 * is still unconfirmed and exits non-zero until each one is resolved — run it before any launch.
 * Phase 5 adds lib/data/site-pages (FAQ, training, memberships, legal…), owner edits still needed on
 * verified external forms, legal review, draft pages and class schedules being confirmed.
 *   npm run check:launch
 */
import { readdirSync, readFileSync } from "node:fs";

const dir = (d) => readdirSync(new URL(`../lib/data/${d}/`, import.meta.url)).filter((f) => f.endsWith(".ts")).map((f) => `lib/data/${d}/${f}`);
const files = ["lib/data/site.ts", "lib/data/locations.ts", "lib/data/content.ts", ...dir("pages"), ...dir("site-pages")];
const findings = [];
for (const f of files) {
  const lines = readFileSync(new URL(`../${f}`, import.meta.url), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\*|\/\/|\/\*)/.test(line)) return; // comments
    const hit =
      /verified:\s*false/.test(line) ? "unverified value" :
      /whereVerified:\s*false/.test(line) ? "gym list for this service not confirmed" :
      /statNote:/.test(line) ? "stat awaiting confirmation" :
      /memberPortal|shop/.test(line) && /href:\s*""/.test(line) ? "missing destination" :
      f.endsWith("site.ts") && /export const tracking = \{\s*gtmId:\s*"",\s*ga4Id:\s*""/.test(line) ? "no analytics ID set (GA4 or GTM) — owner to supply" :
      /status:\s*"pending"/.test(line) ? "legal review pending" :
      /status:\s*"draft"/.test(line) ? "draft page — owner approval required" :
      f.includes("/pages/") && /\bnote:\s*["a-zA-Z]/.test(line) ? "location-page detail awaiting confirmation" :
      f.includes("/site-pages/") && /\b(note|\w+Note):\s*["a-zA-Z]/.test(line) ? "page detail awaiting confirmation" :
      f.endsWith("site.ts") && /verified:\s*true/.test(line) && /note:\s*"/.test(line) ? "verified link, but the destination needs an owner edit" :
      f.endsWith("site.ts") && /^\s*note:\s*"/.test(line) && /verified:\s*true/.test(lines.slice(Math.max(0, i - 6), i).join(" ")) ? "verified link, but the destination needs an owner edit" : null;
    if (!hit) return;
    // nearest preceding identifier for context
    let ctx = (line.match(/^\s*(\w+Note|\w+(?=:\s*\{\s*url:))/) || line.match(/export const (tracking)/) || [])[1] || "";
    for (let k = i; !ctx && k >= Math.max(0, i - 12); k--) {
      const m = lines[k].match(/(?:id|slug|title|label):\s*"([^"]+)"|^\s{2}(\w+):\s*\{/);
      if (m) { ctx = m[1] || m[2]; break; }
    }
    const note = (line.match(/[nN]ote:\s*"((?:[^"\\]|\\.)+)"/) || lines.slice(i, i + 3).join(" ").match(/[nN]ote:\s*"((?:[^"\\]|\\.)+)"/) || [])[1] || "";
    findings.push(`${f}:${i + 1}  [${ctx}]  ${hit}${note ? " — " + note.replace(/\\"/g, '"') : ""}`);
  });
}
// Informational only — listed, but they don't fail the check:
// · photos that are screenshots, not camera originals (owner, 19 Nov 2026: keep the current Rosendale photos as is);
// · GoHighLevel embeds left empty (owner, 19 Nov 2026: not used at launch; the pages show call / text / email).
const info = [];
{
  const site = readFileSync(new URL("../lib/data/site.ts", import.meta.url), "utf8");
  const empty = [...site.matchAll(/^\s*(\w+):\s*\{\s*url:\s*""/gm)].map((m) => m[1]);
  if (empty.length) info.push(`lib/data/site.ts  [ghl]  ${empty.join(", ")} not set — call / text / email buttons shown instead`);
}
for (const f of files.filter((x) => x.includes("/pages/"))) {
  const n = (readFileSync(new URL(`../${f}`, import.meta.url), "utf8").match(/source:\s*(shot|"screenshot")/g) || []).length;
  if (n) info.push(`${f}  [photos]  ${n} photo entries are screenshots — accepted as is by the owner; swap in camera originals when reshot (npm run photo)`);
}
if (info.length) console.log("Not blocking:\n" + info.map((x) => "  · " + x).join("\n") + "\n");
if (findings.length) {
  console.log(`LAUNCH CHECK: ${findings.length} item(s) must be confirmed or removed before going live:\n`);
  findings.forEach((x) => console.log("  • " + x));
  console.log("\nSee START HERE - DEVELOPER HANDOFF.md §9 for the owner action on each item.");
  process.exit(1);
}
console.log("LAUNCH CHECK: all site data confirmed.");
