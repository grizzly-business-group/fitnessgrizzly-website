/**
 * Site-wide facts. Source of truth: Phase 1 Website Inventory + Functionality Matrix.
 * `verified: false` = shown with a † marker in development and tracked in the
 * Phase 2 Launch Blocker Register. Never invent values here.
 */
export type Verifiable<T> = { value: T; verified: boolean; note?: string };

export const site = {
  name: "Grizzly Fitness",
  tagline: "We operate in small towns, but Grizzly Fitness is for Big Dreamers.", // /about, verbatim
  phone: {
    value: { display: "920-990-2795", tel: "+19209902795", sms: "+19209902795" },
    verified: true, // owner-confirmed Nov 2026: the one public number everywhere (site, schema, legal pages)
  } as Verifiable<{ display: string; tel: string; sms: string }>,
  email: "support@fitnessgrizzly.com",
  // Legal business entity named in Terms & Privacy. Owner to supply (launch blocker); "Grizzly Fitness" shows until then.
  legalEntity: { value: "Grizzly Fitness LLC", verified: true } as Verifiable<string>, // owner, 19 Nov 2026
  access: "Open 24/7 — 365 days a year with key fob access at every gym.",
  insurancePrograms: ["Silver Sneakers", "Renew Active", "Prime Active", "Active & Fit", "Silver & Fit"],
  equipmentBrands: ["Hammer Strength", "Precor", "Matrix", "Cybex", "Nautilus", "Magnum"],
} as const;

/** External destinations. Only `verified: true` links are rendered as clickable links. */
export const links = {
  join: { href: "https://grizzlyfitness.gymmasteronline.com/portal/signup", label: "Join online", verified: true, external: true },
  // Verified 26 Oct 2026 (Phase 5): opens the Grizzly tenant's "GymMaster Member Portal — Member Log In" page.
  memberPortal: { href: "https://grizzlyfitness.gymmasteronline.com/portal/login", label: "Member portal", verified: true, external: true },
  appStore: { href: "https://apps.apple.com/us/app/gymmaster-member/id1297093746", label: "App Store", verified: true, external: true },
  googlePlay: { href: "https://play.google.com/store/apps/details?id=com.treshna.memberportal", label: "Google Play", verified: true, external: true },
  // Verified 26 Oct 2026 (Phase 5): loads over HTTPS as "The Grizzly Life" apparel store (Grizzly Fitness tees,
  // hoodies, hats; contact marketing@fitnessgrizzly.com). The old Wix link used http:// — fixed.
  shop: { href: "https://www.thegrizzlylife.com/", label: "Shop", verified: true, external: true },
  // Google Forms — opened read-only 26 Oct 2026 (never submitted). Owner decision 19 Nov 2026: keep the repair form
  // link as is (the form itself is shared with other properties; editing it is the owner's call, in Google Forms).
  repairForm: {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd203Xv4qeJxAgPotI19_kwu4s9zhBOjB4l4QaIw2UbkkZ_Wg/viewform",
    label: "Repair request form",
    verified: true,
    external: true,
  },
  // Owner decision (Nov 2026): careers is email-only. The Google Form (which still lists Baraboo and Priority Fitness
  // roles) is not linked. Set formReady: true only if the form is edited and the owner wants it back.
  careers: { formReady: false, href: "https://docs.google.com/forms/d/e/1FAIpQLScD0Yk0wTnDXobBnGjLHwvZvSVtso0wizdjJ-hHXbKs_RIGug/viewform", label: "Careers", verified: true, external: true },
  podcastGuest: { href: "https://docs.google.com/forms/d/e/1FAIpQLSdE42FXttAUFPwRsRrZQ0Lm7vA14bVtsA_j3twCHzD4aR1jLA/viewform", label: "Be a guest", verified: true, external: true },
  spotify: { href: "https://open.spotify.com/show/5E97tqguBNkMANWKAdtT10", label: "Spotify", verified: true, external: true },
  applePodcasts: { href: "https://podcasts.apple.com/us/podcast/the-grizzly-life-podcast/id1799753510", label: "Apple Podcasts", verified: true, external: true },
  youtube: { href: "https://www.youtube.com/@TheGrizzlyLifePodcast", label: "YouTube", verified: true, external: true },
  instagram: { href: "https://www.instagram.com/fitness.grizzly", label: "Instagram", verified: true, external: true },
  facebook: { href: "https://www.facebook.com/profile.php?id=61556601655715", label: "Facebook", verified: true, external: true },
  // TikTok intentionally absent: current site links to the Wix placeholder @wix (blocker #3).
} as const;

export type LinkKey = keyof typeof links;

/**
 * GoHighLevel embeds (forms + consult calendar). NOT used at launch (owner, 19 Nov 2026): the pages show the call /
 * text / email buttons. The code is ready — to add one later, paste the full widget URL from GHL → Sites → Forms/Calendars →
 * Integrate → "Embed" (e.g. https://api.leadconnectorhq.com/widget/form/<id> or …/widget/booking/<id>).
 * Empty = the page shows the email / call / text fallback instead. The SMS-consent checkbox (unchecked, carrier
 * wording, links to /terms and /privacy) must be built INTO each GHL form — the website can't add fields to a GHL iframe.
 * Candidate seen on the old Wix site (destination unconfirmed): https://link.apisystem.tech/widget/form/DImfz5kKV83gLgQYKAha
 */
export const ghl = {
  ptForm: { url: "", title: "Interested in personal training?", height: 760 },
  consultCalendar: { url: "", title: "Book a personal training consult", height: 900 },
  contactForm: { url: "", title: "Contact Grizzly Fitness", height: 720 },
};

/**
 * Tracking IDs (owner, 19 Nov 2026): GA4 + Meta Pixel, loaded directly (no GTM). Google Ads: none yet — paste an
 * "AW-…" ID into googleAdsId later and it loads through the same gtag (the CSP already allows Google Ads).
 * Empty = that tag doesn't load. If GTM is ever used instead, put GA4 / Ads / Pixel inside GTM and leave the
 * other three empty to avoid double counting. Events sent: join_click (GymMaster sign-up, with gym),
 * click_to_call, click_to_text, generate_lead (on /thank-you, the page GHL forms redirect to after submit).
 */
export const tracking = { gtmId: "", ga4Id: "G-V6074L14E4", googleAdsId: "", metaPixelId: "789997473854772" };
