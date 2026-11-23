# Grizzly Fitness — website application

Next.js **16.4.6** (App Router, **static export**) · React **19.3** · TypeScript **5.9** · Tailwind CSS **4.3** · GSAP **3.15** + ScrollTrigger.

This folder is the complete source of the new **www.fitnessgrizzly.com**. It builds to a plain static site in `out/` and is hosted on **GitHub Pages**. It has **not been deployed**. The live site is still on Wix and **stays untouched until the owner authorizes the launch**. **Nobody changes DNS until then.**

For the project overview, open business items and the launch checklists, read **`../../START HERE - DEVELOPER HANDOFF.md`** first.

---

## Requirements
- **Node.js 22 LTS.** `.nvmrc` = `22`; `package.json` `engines` = `>=20.9.0`.
- npm. Use `npm ci`; the lockfile is committed.
- No database, no server, no secrets. All config is build-time (below).

## Install, run, build

```bash
npm ci                 # install exactly what package-lock.json pins
npm run dev            # dev server with Fast Refresh → http://localhost:3000
npm run typecheck      # next typegen + tsc --noEmit
npm run lint           # ESLint (next/core-web-vitals + TypeScript)
npm run build          # next build → out/, then scripts/postbuild.mjs (WebP images + legacy redirect pages)
npm run preview        # serve out/ exactly like GitHub Pages → http://localhost:3000
npm run check:launch   # lists every unconfirmed fact/ID; exits 1 if anything is unconfirmed (today: 0 — all confirmed)
```

- `/?intro` replays the "Lights On" homepage intro (it normally plays once per browser session).
- `npm run build` takes ~3 min the first time: the postbuild step encodes ~800 WebP image sizes with sharp.
- `Start Preview.command` is the owner's double-click launcher for `npm run dev` on macOS.

## Build-time configuration (GitHub → Settings → Secrets and variables → Actions → **Variables**)

| Variable | Values | Default | Effect |
|---|---|---|---|
| `SITE_INDEXING` | `true` / unset | **unset = not indexable** | `true` switches every search signal at once: `<meta name="robots">` → `index, follow`; `/robots.txt` → `Allow: /` + `Sitemap:`. **Set it only at the authorized launch.** `/equipment-repair`, `/thank-you` and the 404 stay noindex either way |
| `BASE_PATH` (→ `NEXT_PUBLIC_BASE_PATH`) | `/<repo-name>` / unset | unset | For the **preview** at `https://<user>.github.io/<repo-name>/`. **Remove it** once the custom domain is attached; the custom domain serves from `/` |

Both are read at **build time**, so a change needs a new workflow run (Actions → *Deploy to GitHub Pages* → *Run workflow*).

Business configuration lives in code, in `lib/data/site.ts`:
- `ghl.ptForm`, `ghl.consultCalendar`, `ghl.contactForm`: GoHighLevel embed URLs. **Empty at launch (owner decision)** = the call/text/email buttons show. Ready to fill later.
- `tracking`: **GA4 `G-V6074L14E4` + Meta Pixel `789997473854772`** (direct, no GTM). `googleAdsId` is empty and ready for an `AW-…` ID. Empty = that tag doesn't load. Use either GTM or the direct IDs, not both.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push to `main` (and manually):
Node 22 → `npm ci` → lint → typecheck → `npm run build` → upload `./out` → `actions/deploy-pages`.

One-time repo setup (see START HERE §4 for the full order):
1. Settings → Pages → Source: **GitHub Actions**.
2. Variables: `BASE_PATH=/<repo-name>` for the github.io preview; leave `SITE_INDEXING` unset.
3. At launch, after written owner authorization: Settings → Pages → Custom domain `www.fitnessgrizzly.com`, delete `BASE_PATH`, re-run; DNS by the developer; then **Enforce HTTPS**; then `SITE_INDEXING=true` and re-run.

`public/CNAME` (`www.fitnessgrizzly.com`) documents the domain. Actions deployments ignore it; the domain is set in Settings. `public/.nojekyll` stops Jekyll processing so `/_next/` is served.

## How the static build works

| Concern | Implementation |
|---|---|
| Static export | `next.config.ts`: `output: "export"`, `trailingSlash: true`. Every page is `out/<path>/index.html` |
| Internal links | Plain `<a>` tags with `to()` from `lib/paths.ts`: adds the trailing slash and the base path. **Use `to()` for every new internal href** (and `asset()` for raw `/media/…` URLs outside `<Image>`) |
| Images | `next/image` with the custom loader `lib/image-loader.ts` → `<file>.w<width>.webp`. `scripts/postbuild.mjs` pre-generates those WebP files (q72, never upscaled) at every width in `images.deviceSizes` + `imageSizes`, and drops unreferenced copies from `out/media` |
| Gym pages | `app/locations/[slug]` with `generateStaticParams` + `dynamicParams = false`: only the five gyms exist; anything else is the 404 |
| 404 | `app/not-found.tsx` → `out/404.html`, which GitHub Pages serves with status 404 |
| Legacy Wix URLs | GitHub Pages can't send HTTP redirects. `postbuild.mjs` writes a small page per path in `lib/data/legacy-redirects.json` (table below): `location.replace()` (keeps `?query` and `#hash`), meta refresh fallback, `rel=canonical` to the new page, `noindex` |
| robots / sitemap | `app/robots.ts`, `app/sitemap.ts` (`force-static`). Sitemap = 21 real pages, trailing-slash URLs |
| Security | GitHub Pages can't set headers, so the **CSP is a `<meta http-equiv>`** (production builds only; `lib/csp.ts`), plus `<meta name="referrer" content="strict-origin-when-cross-origin">`. Allowed third parties: GA4/GTM/Google Ads, Meta Pixel, GoHighLevel (`link.apisystem.tech`, `*.leadconnectorhq.com`, `*.msgsndr.com`). **Add any new third-party origin to `lib/csp.ts`** |
| Analytics | `components/layout/Analytics.tsx`: GA4 + Meta Pixel. **Send only on `www.fitnessgrizzly.com`** (add `?tags=1` to test on a preview/localhost for that session); queues start at once, libraries load when the page is idle. Events: `join_click` (with gym), `click_to_call`, `click_to_text`, `generate_lead` (fired on `/thank-you/`; set each GHL form/calendar to redirect there) |
| Forms | `components/page/GhlEmbed.tsx` iframes + `form_embed.js`. **The SMS-consent checkbox (unchecked) and the Terms/Privacy links must be built inside each GHL form** (A2P 10DLC); the site cannot add them to an iframe |

**Not possible on GitHub Pages (accepted):** HSTS, `X-Frame-Options` / `frame-ancestors`, `Permissions-Policy`, real 301s. GitHub serves HTTPS with its own certificate once "Enforce HTTPS" is on. **Paths are case-sensitive** (`/Berlin` → 404).

## Folder map

| Path | Contents |
|---|---|
| `app/` | Routes, root layout, `globals.css`, self-hosted fonts, icons, `robots.ts`, `sitemap.ts`, `error.tsx`, `not-found.tsx` |
| `app/page.tsx` | Homepage: 7 scenes (`components/home/S1…S7`) + `components/motion/HomeMotion.tsx` (GSAP) |
| `app/locations/[slug]/page.tsx` | One template for the 5 gym pages, from `lib/data/pages/<gym>.ts`; HealthClub JSON-LD |
| `app/<page>/page.tsx` | about, locations, training, personal-training, classes, memberships, members, faq, gallery, podcast, careers, equipment-repair, contact, terms, privacy, accessibility, thank-you |
| `components/` | `layout/` (Header, Footer, MobileActionBar, Analytics, LeadEvent), `home/`, `location/`, `about/`, `page/` (shell, blocks, GhlEmbed, LegalPage), `ui/primitives.tsx`, `motion/` |
| `lib/data/site.ts` | Phone, email, legal entity, every outbound link, GHL embeds, tracking IDs |
| `lib/data/locations.ts` | The five gyms: address, staffed hours (text + schema), GymMaster club ID, Maps link |
| `lib/data/pages/*.ts`, `lib/data/site-pages/*.ts` | Page content (copy, photos with alt text, SEO, legal text) |
| `lib/data/legacy-redirects.json` | The 17 old Wix paths |
| `lib/paths.ts`, `lib/image-loader.ts`, `lib/csp.ts`, `lib/indexing.ts`, `lib/seo.ts` | Static-hosting helpers, CSP, indexing switch, share tags |
| `public/` | `media/` (real Grizzly photos, EXIF stripped; `og/` share image), `CNAME`, `.nojekyll` |
| `scripts/postbuild.mjs` | WebP sizes, legacy redirect pages, output checks |
| `scripts/serve-out.mjs` | `npm run preview`: local GitHub-Pages-like server (honours `NEXT_PUBLIC_BASE_PATH`, gzip) |
| `scripts/launch-check.mjs` | `npm run check:launch` |
| `scripts/photo.mjs` | `npm run photo -- <src> <gym>/<name>`: replace a photo in place |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages |
| `media-held/` | **Not served.** One photo held back pending owner identification |

## Routes

| Kind | Routes (all with a trailing slash) |
|---|---|
| Pages | `/`, `/about/`, `/locations/`, `/training/`, `/personal-training/`, `/classes/`, `/memberships/`, `/members/`, `/faq/`, `/gallery/`, `/podcast/`, `/careers/`, `/equipment-repair/` (noindex), `/contact/`, `/terms/`, `/privacy/`, `/accessibility/`, `/thank-you/` (noindex, form confirmation) |
| Gym pages | `/locations/princeton/`, `/berlin/`, `/wautoma/`, `/omro/`, `/rosendale/` |
| Files | `/robots.txt`, `/sitemap.xml` (21 URLs), `/icon.png`, `/apple-icon.png`, `/favicon.ico`, `/404.html` |
| Errors | Anything else, including `/baraboo`, `/copy-of-berlin` and `/locations/<other>/` → branded 404 (status 404) |

GitHub Pages answers `/about` with a 301 to `/about/`.

## Legacy Wix URLs (redirect pages, `lib/data/legacy-redirects.json`)

| Old Wix path | New path |
|---|---|
| `/princeton`, `/berlin`, `/wautoma`, `/omro`, `/rosendale` | `/locations/<gym>/` |
| `/princetonphotos`, `/berlinphotos`, `/wautomaphotos`, `/omrophotos`, `/rosendalephotos` | `/locations/<gym>/#gallery` |
| `/photos` | `/gallery/` |
| `/faqs` | `/faq/` |
| `/sppt` | `/personal-training/` |
| `/renew` | `/members/` |
| `/repair` | `/equipment-repair/` |
| `/terms-conditions` | `/terms/` |
| `/privacy-policy` | `/privacy/` |

`/`, `/about`, `/locations` and `/podcast` keep their Wix paths. `/baraboo` and `/copy-of-berlin` are **not** redirected (404); Baraboo is closed and must never point at another gym.

## Content rules baked into the code (don't undo)
- Only five active gyms: Princeton, Berlin, Wautoma, Omro, Rosendale. **Baraboo must not appear.** Green Lake appears only as a former facility on /about.
- No trainer names anywhere. No class schedules: classes say "Call or text 920-990-2795 for current class times."
- No stock or AI photos. No prices or "$1" offers.
- Unverified values show a † **in development builds only**; `npm run check:launch` keeps them listed until confirmed in `lib/data/`.
- No payments on the site: memberships are sold and billed in GymMaster.
