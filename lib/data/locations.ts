import type { StaticImageData } from "next/image";
import princetonMural from "@/public/media/princeton/princeton-2025-main-room.jpg";
import berlinTurf from "@/public/media/berlin/berlin-2026-turf-bear-wall.jpg";
import wautomaTurf from "@/public/media/wautoma/wautoma-turf-sled.jpg";
import omroRoom from "@/public/media/omro/omro-full-room.jpg";
import rosendaleRoom from "@/public/media/rosendale/rosendale-2024-whole-room.jpg";

/**
 * The five ACTIVE Grizzly Fitness gyms — the only locations that exist in this codebase.
 * Facts from Phase 1 (homepage staffed hours, footer addresses, location pages, GymMaster club list).
 */
export type LocationSlug = "princeton" | "berlin" | "wautoma" | "omro" | "rosendale";

export type Location = {
  slug: LocationSlug;
  town: string;
  tag: string;
  summary: string;
  /** True brand colour (Facebook logo / key fob) — solid fills. */
  color: string;
  /** Same hue, readable on dark backgrounds — small text and thin marks. */
  tint: string;
  address: { street: string; city: string; zip: string; verified: boolean };
  staffed: { label: string; lines: string[]; verified: boolean };
  /** Staffed hours in machine-readable form (schema.org hoursAvailable). Empty = by appointment. */
  staffedHours: { days: string[]; opens: string; closes: string }[];
  /** Google Business Profile rating, read from Google Maps (see googleRatingsAsOf). Shown, never marked up as schema. */
  google: { rating: number; count: number };
  gymmasterClubId: 4 | 6 | 7 | 8 | 9;
  mapsUrl: string;
  showcase: { src: StaticImageData; alt: string; position?: string };
};

export const locations: Location[] = [
  {
    slug: "princeton",
    town: "Princeton",
    tag: "The Original",
    summary: "The town where Grizzly Fitness began. Today: strength and cardio set against an antique painted mural, plank floors and lamplight.",
    color: "var(--color-loc-princeton)",
    tint: "var(--color-loc-princeton-tint)",
    address: { street: "429 W. Water St.", city: "Princeton, WI", zip: "54968", verified: true },
    staffed: { label: "Mon / Wed / Fri · 8 AM–4 PM", lines: ["Mon / Wed / Fri", "8:00 AM – 4:00 PM"], verified: true },
    staffedHours: [{ days: ["Monday", "Wednesday", "Friday"], opens: "08:00", closes: "16:00" }],
    gymmasterClubId: 4,
    google: { rating: 4.9, count: 49 },
    mapsUrl: "https://www.google.com/maps/place/Grizzly+Fitness+Princeton/@43.9616104,-89.2718115,11z/data=!4m10!1m2!2m1!1sGrizzly+Fitness!3m6!1s0x88013511839e4ad7:0xc70e651bedd22fad!8m2!3d43.8496327!4d-89.1285395!15sCg9Hcml6emx5IEZpdG5lc3OSAQNneW2qAVwKDS9nLzExYzRicDZmXzgQASoTIg9ncml6emx5IGZpdG5lc3MoADIfEAEiG6It0DNIYkGgKtymd2ZTkRH61nzkBl0XIAjQXjITEAIiD2dyaXp6bHkgZml0bmVzc-ABAA!16s%2Fg%2F11g0zn7p4d!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
    showcase: { src: princetonMural, alt: "Machines and apparel racks on plank floors under the antique painted mural at Grizzly Fitness Princeton", position: "50% 55%" },
  },
  {
    slug: "berlin",
    town: "Berlin",
    tag: "The Warehouse",
    summary: "A mezzanine cardio section, a heavy lifting section below, a turf area and over 80 pieces of equipment.",
    color: "var(--color-loc-berlin)",
    tint: "var(--color-loc-berlin-tint)",
    address: { street: "480 N Industrial Park Rd", city: "Berlin, WI", zip: "54923", verified: true },
    // Updated by the owner 23 Nov 2026 (was Mon/Wed/Fri 8–3). Not staffed Tue, Thu, Sat, Sun.
    staffed: { label: "Mon & Wed 8–7 · Fri 8–2", lines: ["Mon & Wed 8 AM – 7 PM", "Fri 8 AM – 2 PM"], verified: true },
    staffedHours: [{ days: ["Monday", "Wednesday"], opens: "08:00", closes: "19:00" }, { days: ["Friday"], opens: "08:00", closes: "14:00" }],
    gymmasterClubId: 6,
    google: { rating: 4.9, count: 47 },
    mapsUrl: "https://www.google.com/maps/place/Grizzly+Fitness+Berlin/@43.9616104,-89.2718115,11z/data=!4m10!1m2!2m1!1sGrizzly+Fitness!3m6!1s0x88015b34d9e0cc81:0x9550a0e9e32321ba!8m2!3d43.9595668!4d-88.9304424!15sCg9Hcml6emx5IEZpdG5lc3OSAQ5maXRuZXNzX2NlbnRlcqoBXAoNL2cvMTFjNGJwNmZfOBABKhMiD2dyaXp6bHkgZml0bmVzcygAMh8QASIboi3QM0hiQaAq3KZ3ZlOREfrWfOQGXRcgCNBeMhMQAiIPZ3JpenpseSBmaXRuZXNz4AEA!16s%2Fg%2F11r9gw8bwf!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
    showcase: { src: berlinTurf, alt: "The green turf lane with a sled, leading to the painted bear on the blue wall at Grizzly Fitness Berlin", position: "50% 55%" },
  },
  {
    slug: "wautoma",
    town: "Wautoma",
    tag: "The Community Hub",
    summary: "Two separate free-weight areas, plate-loaded and easy-to-use machines, plus Group Fit and Senior Fit classes.",
    color: "var(--color-loc-wautoma)",
    tint: "var(--color-loc-wautoma-tint)",
    address: { street: "230 E. Main St.", city: "Wautoma, WI", zip: "54982", verified: true },
    staffed: { label: "M/W 8–8 · T/Th 9–7 · F 9–4", lines: ["Mon / Wed 8 AM – 8 PM", "Tue / Thu 9 AM – 7 PM", "Fri 9 AM – 4 PM"], verified: true },
    staffedHours: [{ days: ["Monday", "Wednesday"], opens: "08:00", closes: "20:00" }, { days: ["Tuesday", "Thursday"], opens: "09:00", closes: "19:00" }, { days: ["Friday"], opens: "09:00", closes: "16:00" }],
    gymmasterClubId: 7,
    google: { rating: 4.9, count: 71 },
    mapsUrl: "https://www.google.com/maps/place/Grizzly+Fitness+Wautoma/@44.0744075,-89.2849883,18z/data=!4m15!1m8!3m7!1s0x880122f53616109f:0xbed5acd7015fbdb5!2s230+E+Main+St,+Wautoma,+WI+54982!3b1!8m2!3d44.0744075!4d-89.2835077!16s%2Fg%2F11bw43ymk3!3m5!1s0x880123fa48099777:0x7f8f4d939b5e8e70!8m2!3d44.0742988!4d-89.2835617!16s%2Fg%2F11sjh2b1r0!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
    showcase: { src: wautomaTurf, alt: "Turf lane with a sled and strength machines at Grizzly Fitness Wautoma", position: "50% 60%" },
  },
  {
    slug: "omro",
    town: "Omro",
    tag: "The Powerhouse",
    summary: "Formerly Omro Iron. Rows of plate-loaded machines, racks and dumbbells — straightforward training, no frills.",
    color: "var(--color-loc-omro)",
    tint: "var(--color-loc-omro-tint)",
    address: { street: "125 W. Huron St.", city: "Omro, WI", zip: "54963", verified: true },
    staffed: { label: "Mon & Fri 8–12 · Tue & Thu 2–6", lines: ["Mon & Fri 8 AM – 12 PM", "Tue & Thu 2 PM – 6 PM"], verified: true },
    staffedHours: [{ days: ["Monday", "Friday"], opens: "08:00", closes: "12:00" }, { days: ["Tuesday", "Thursday"], opens: "14:00", closes: "18:00" }],
    gymmasterClubId: 9,
    google: { rating: 4.8, count: 11 },
    mapsUrl: "https://www.google.com/maps/place/Grizzly+Fitness+Omro/@44.0388574,-89.0255671,11z/data=!4m10!1m2!2m1!1sGrizzly+Fitness!3m6!1s0x8803e1283368eb57:0xcfd2ccbb66589e8e!8m2!3d44.0388574!4d-88.7454157!15sCg9Hcml6emx5IEZpdG5lc3OSAQ5maXRuZXNzX2NlbnRlcqoBXAoNL2cvMTFjNGJwNmZfOBABKhMiD2dyaXp6bHkgZml0bmVzcygAMh8QASIboi3QM0hiQaAq3KZ3ZlOREfrWfOQGXRcgCNBeMhMQAiIPZ3JpenpseSBmaXRuZXNz4AEA!16s%2Fg%2F11x2xkgzmp!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
    showcase: { src: omroRoom, alt: "Treadmills, benches and plate-loaded machines across the floor at Grizzly Fitness Omro", position: "50% 55%" },
  },
  {
    slug: "rosendale",
    town: "Rosendale",
    tag: "The Neighborhood Gym",
    summary: "A bright Main Street storefront with selectorized machines, racks, plate-loaded machines and cardio.",
    color: "var(--color-loc-rosendale)",
    tint: "var(--color-loc-rosendale-tint)",
    address: { street: "102 S. Main St.", city: "Rosendale, WI", zip: "54974", verified: true },
    staffed: { label: "Staffed by appointment", lines: ["By appointment"], verified: true },
    staffedHours: [],
    gymmasterClubId: 8,
    google: { rating: 4.0, count: 4 },
    mapsUrl: "https://www.google.com/maps/place/Grizzly+Fitness+Rosendale/@43.8072628,-88.9554803,11z/data=!4m10!1m2!2m1!1sGrizzly+Fitness!3m6!1s0x8803f967fc3f6c8f:0x917e891aafba5cbc!8m2!3d43.8072628!4d-88.6753289!15sCg9Hcml6emx5IEZpdG5lc3OSAQ5maXRuZXNzX2NlbnRlcqoBXAoNL2cvMTFjNGJwNmZfOBABKhMiD2dyaXp6bHkgZml0bmVzcygAMh8QASIboi3QM0hiQaAq3KZ3ZlOREfrWfOQGXRcgCNBeMhMQAiIPZ3JpenpseSBmaXRuZXNz4AEA!16s%2Fg%2F11vkp4904p!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
    showcase: { src: rosendaleRoom, alt: "Racks, a lifting platform, a bike and dumbbells inside Grizzly Fitness Rosendale, the storefront at the far end", position: "50% 50%" },
  },
];

/** Date the Google ratings above were read from Google Maps (owner OK'd showing them, 23 Nov 2026). Refresh now and then. */
export const googleRatingsAsOf = "2026-11-23";
/** Ratings below this aren't shown on the site (today that hides Rosendale's 4.0 from 4 reviews). */
export const ratingShowMin = 4.5;
/** All five gyms combined: review-weighted average and total count. */
export const networkRating = (() => {
  const count = locations.reduce((n, l) => n + l.google.count, 0);
  const avg = locations.reduce((n, l) => n + l.google.rating * l.google.count, 0) / count;
  return { rating: Math.round(avg * 10) / 10, count };
})();

/** "Staffed Mon / Wed / Fri · 8 AM–4 PM", or "Staffed by appointment" as-is (no doubled word). */
export const staffedPhrase = (l: Location) => (/^staffed\b/i.test(l.staffed.label) ? l.staffed.label : `Staffed ${l.staffed.label}`);

/**
 * Per-gym GymMaster sign-up link (Phase 5C). The Grizzly portal's club filter is a plain GET form
 * (`select name="companyid"`), so `?companyid=<club id>` opens the sign-up list already filtered to that gym.
 * Verified read-only on 26 Oct 2026 for all five clubs (4 Princeton · 6 Berlin · 7 Wautoma · 8 Rosendale · 9 Omro).
 */
export const joinHref = (l: Pick<Location, "gymmasterClubId">) =>
  `https://grizzlyfitness.gymmasteronline.com/portal/signup?companyid=${l.gymmasterClubId}&utm_source=fitnessgrizzly.com&utm_medium=website&utm_campaign=join`;

