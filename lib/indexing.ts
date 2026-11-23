/**
 * Search-engine indexing switch (Phase 5D).
 *
 * The whole site is NOT indexable unless the build is started with SITE_INDEXING=true (GitHub Actions
 * repository variable). That single build-time setting controls every signal together, so they can't disagree:
 *   1. <meta name="robots"> in every page (root layout; /equipment-repair, /thank-you and the 404 stay noindex)
 *   2. /robots.txt (app/robots.ts) — "Disallow: /" until launch, then "Allow: /" + the sitemap
 *   3. /sitemap.xml (app/sitemap.ts) — always generated, only advertised once indexing is on
 * (GitHub Pages can't send an X-Robots-Tag header, so there is no header signal in the static build.)
 * Turning it on is a Phase 7 (launch) action and needs owner authorization.
 */
export const SITE_URL = "https://www.fitnessgrizzly.com";
export const indexingEnabled = process.env.SITE_INDEXING === "true";
