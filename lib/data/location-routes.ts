import type { LocationSlug } from "./locations";

/**
 * Routes of the location pages that exist (kept apart from the page content so menus and links
 * don't pull photos into client bundles). Add a gym here when its page ships — the header menu,
 * mobile drawer, footer, hero town bar, Five Lights and join picker all follow this list.
 * Old Wix paths redirect to these (next.config.ts → redirects).
 */
export const locationPaths: Partial<Record<LocationSlug, string>> = {
  princeton: "/locations/princeton",
  berlin: "/locations/berlin",
  wautoma: "/locations/wautoma",
  omro: "/locations/omro",
  rosendale: "/locations/rosendale",
};

/** Where a gym name should link: its own page when built, otherwise its card on the homepage. */
export const gymHref = (slug: LocationSlug) => locationPaths[slug] ?? `/#gym-${slug}`;
