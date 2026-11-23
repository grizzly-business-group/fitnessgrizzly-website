/**
 * Content-Security-Policy for the static (GitHub Pages) build, delivered as a <meta http-equiv> tag in
 * app/layout.tsx because Pages can't send response headers. Production builds only (next dev needs eval
 * and websockets).
 *
 * Allowed third parties, and nothing else:
 *   - Google tag / GA4 / GTM (+ Google Ads conversion endpoints, used only if an Ads ID is configured)
 *   - Meta Pixel
 *   - GoHighLevel / LeadConnector forms and calendars (link.apisystem.tech, *.leadconnectorhq.com, *.msgsndr.com)
 *   - Google Forms, framed only (the membership cancellation form on /cancel)
 * Next's static export inlines its bootstrap scripts, so 'unsafe-inline' is required for scripts and styles.
 * A meta CSP can't set frame-ancestors / X-Frame-Options (header-only); Pages can't add those.
 */
const google = ["https://www.googletagmanager.com", "https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com", "https://*.g.doubleclick.net", "https://www.googleadservices.com", "https://www.google.com"];
const meta = ["https://connect.facebook.net", "https://www.facebook.com"];
const ghl = ["https://link.apisystem.tech", "https://*.leadconnectorhq.com", "https://*.msgsndr.com"];

export const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://*.g.doubleclick.net", ...meta, ...ghl].join(" ")}`,
  `style-src 'self' 'unsafe-inline' ${ghl.join(" ")}`,
  `img-src 'self' data: blob: ${[...google, ...meta, ...ghl].join(" ")}`,
  "font-src 'self' data:",
  `connect-src 'self' ${[...google, ...meta, ...ghl].join(" ")}`,
  `frame-src ${["https://www.googletagmanager.com", "https://*.doubleclick.net", "https://www.facebook.com", "https://docs.google.com", ...ghl].join(" ")}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self' ${ghl.join(" ")}`,
  "upgrade-insecure-requests",
].join("; ");
