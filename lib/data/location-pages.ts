import type { StaticImageData } from "next/image";
import type { LocationSlug } from "./locations";
import { princeton } from "./pages/princeton";
import { berlin } from "./pages/berlin";
import { wautoma } from "./pages/wautoma";
import { omro } from "./pages/omro";
import { rosendale } from "./pages/rosendale";

/**
 * Location-page content model. One entry per gym lives in ./pages/<slug>.ts, kept separate from the
 * components that render it. Shared facts (address, staffed hours, colour, maps link) live in ./locations.ts.
 *
 * Every content line traces to Phase 1 (Website Inventory, Location Identity, Photo Asset Inventory).
 * Anything still awaiting owner confirmation carries a `note` — rendered as a dev-only † and listed by
 * `npm run check:launch` until resolved. Nothing here is invented.
 *
 * One template, five gyms: the page renders `order` top to bottom, and each gym chooses its hero
 * composition, photo tone and feature sections (levels, classes, archive) from the shared set.
 */

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Phase 1 asset ID, for traceability. */
  asset: string;
  position?: string;
  /** Crop in for detail ("macro") compositions — scale factor around `position`. */
  zoom?: number;
  /** Where the file came from. "screenshot" = not a camera original (replace when originals arrive). */
  source?: "camera" | "screenshot" | "archival";
  /** Awaiting owner confirmation (dev-only †, launch check). */
  note?: string;
};

export type ServiceCard = {
  id: string;
  title: string;
  body: string;
  /** Set when a detail is on the current site but not yet re-confirmed by the owner (dev-only † + launch check). */
  note?: string;
  cta?: { label: string; href: string };
};

export type HeroVariant =
  | "fullbleed" /* Princeton — type over a full-bleed photo */
  | "split" /* Berlin — type + scale counters beside a tall portrait frame */
  | "wide" /* Wautoma — wide photo with a classes panel in the first screen */
  | "monument" /* Omro — oversized town name over a monochrome equipment photo */
  | "storefront"; /* Rosendale — dark type column beside the bright, untreated storefront photo */

/** Photo grade for the page (CSS: .loc-tone-*). */
export type Tone = "warm" | "industrial" | "community" | "mono" | "bright";

export type Block = "facts" | "space" | "levels" | "classes" | "equipment" | "services" | "gallery" | "archive" | "testimonials" | "membership" | "others" | "cta";

export type LocationPage = {
  slug: LocationSlug;
  /** Route — matches the approved Phase 2 sitemap. Old Wix paths 308-redirect here (next.config.ts). */
  path: string;
  legacyPaths: string[];
  seo: { title: string; description: string };
  /** Verified place coordinates (from the gym's Google Maps listing). */
  geo?: { lat: number; lng: number };
  tone: Tone;
  hero: {
    variant: HeroVariant;
    photo: Photo;
    eyebrow: string;
    lead: string;
    /** Big counters (Berlin). */
    stats?: { value: string; label: string; note?: string }[];
    /** Lineage strap (Omro: "Formerly Omro Iron"). */
    strap?: string;
    /** First-screen panel (Wautoma classes). */
    panel?: { title: string; items: { name: string; detail?: string }[]; foot?: string; href: string; label: string };
  };
  /** Sections in page order. Hero always comes first. */
  order: Block[];
  space?: {
    eyebrow: string;
    heading: [string, string];
    paragraphs: string[];
    photos: Photo[];
    layout?: "editorial" | "mosaic";
    surface?: "dark" | "paper";
  };
  levels?: {
    eyebrow: string;
    heading: [string, string];
    intro: string;
    zones: { label: string; title: string; body: string; photo: Photo }[];
  };
  classes?: {
    eyebrow: string;
    heading: [string, string];
    intro: string;
    /** `status` is shown to visitors (e.g. "Schedule being confirmed") — never only a dev marker. */
    items: { name: string; body: string; status?: string; note?: string }[];
    studios: { name: string; address: string; mapsUrl: string; photo: Photo }[];
    timesNote: string;
    ctas: { label: string; href: string }[];
  };
  equipment: {
    eyebrow?: string;
    heading: [string, string];
    /** Line under the heading (where the list comes from). */
    intro: string;
    style?: "groups" | "index" | "roster";
    groups: { group: string; items: string[] }[];
    /** Short closing line (Berlin: "over 80 pieces"). */
    footnote?: string;
  };
  services: { heading?: string; intro?: string; items: ServiceCard[] };
  gallery: { photos: Photo[]; shape?: "landscape" | "portrait" };
  archive?: { eyebrow: string; heading: [string, string]; body: string; photos: Photo[] };
  testimonials: { quote: string; name: string }[];
  closing: { photo: Photo };
  /** Photography still needed (reshoot brief), for the report. */
  missingPhotos: string[];
  /** Phase 1 items shown elsewhere or held back, for the preservation matrix. */
  heldBack: string[];
};

export const locationPages: Partial<Record<LocationSlug, LocationPage>> = { princeton, berlin, wautoma, omro, rosendale };

export const pageFor = (slug: LocationSlug) => locationPages[slug];

export { gymHref } from "./location-routes";
