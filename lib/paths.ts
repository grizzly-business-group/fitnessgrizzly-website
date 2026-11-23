/**
 * Internal link helper for the static (GitHub Pages) build.
 *
 * - Adds the trailing slash the export uses (`trailingSlash: true` → /about/index.html), so links don't
 *   bounce through GitHub Pages' /about → /about/ redirect.
 * - Prefixes NEXT_PUBLIC_BASE_PATH (e.g. "/grizzly-fitness-site") for the github.io preview. It's empty for
 *   the real domain.
 * External, mailto:, tel:, sms: and "#hash" links pass through unchanged. Safe to call twice.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export function to(href: string): string;
export function to(href: string | undefined): string | undefined;
export function to(href: string | undefined): string | undefined {
  if (!href || href[0] !== "/" || href.startsWith("//")) return href;
  if (BASE_PATH && (href === BASE_PATH || href.startsWith(BASE_PATH + "/"))) return href;
  const m = href.match(/^([^?#]*)(.*)$/) as RegExpMatchArray;
  let path = m[1] || "/";
  if (!path.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(path)) path += "/";
  return BASE_PATH + path + m[2];
}

/** Public-folder asset URL (e.g. "/media/og/x.jpg") with the base path. */
export const asset = (p: string) => BASE_PATH + p;

/** Compare a link to the current path regardless of trailing slash. */
export const samePath = (a: string, b: string) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");
