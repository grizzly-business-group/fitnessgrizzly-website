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
  join: { href: "https://grizzlyfitness.gymmasteronline.com/portal/signup?utm_source=fitnessgrizzly.com&utm_medium=website&utm_campaign=join", label: "Join online", verified: true, external: true },
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
  // Membership cancellation (owner, 23 Nov 2026). Embedded on the hidden /cancel page (noindex, not in the sitemap or
  // menus; linked only from a small line on /members). Opened read-only 23 Nov 2026 — never submitted.
  cancelForm: { href: "https://docs.google.com/forms/d/e/1FAIpQLSfZVsHHtXVWyNMQCMRX9m2RpaE4QBFTcB1j_GYSrW1mYWu3uw/viewform", label: "Cancellation form", verified: true, external: true },
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
 * The one "Start" path (Nov 2026 audit): every generic Join button goes to /join, where the visitor picks a home
 * gym and is handed to GymMaster with that gym preselected (and, once set below, sees its starting price).
 * Gym pages and gym cards keep their own direct "Join at <gym>" links.
 */
export const startHref = "/join";

/**
 * Prices — copied from the live GymMaster sign-up portal on 23 Nov 2026 (identical at all five gyms; owner pointed
 * us there). GymMaster stays the source of truth: when a price changes there, change it here too.
 * Shown on /join, /memberships and each gym page. Temporary promos (e.g. Black Friday) are deliberately not listed.
 */
export const pricing = {
  asOf: "2026-11-23",
  biweekly: [
    { plan: "Adult", price: "$20" },
    { plan: "Military & veterans", price: "$18" },
    { plan: "Senior (65+)", price: "$14" },
    { plan: "Student (full-time, 25 & under)", price: "$14" },
  ],
  familyAddOn: "$14",
  signupFee: "$20",
  passes: [
    { plan: "1-day pass", price: "$15", note: "no sign-up fee" },
    { plan: "7-day pass", price: "$25", note: "+ $20 sign-up fee" },
  ],
  prepaid: [
    { plan: "1 month", price: "$55" },
    { plan: "4 months", price: "$159" },
    { plan: "1 year", price: "$429" },
    { plan: "2 years", price: "$799" },
  ],
  prepaidReduced: "Senior and student prepaid: $35 / $140 / $329 / $639",
  fobReplacement: "$20",
};

/**
 * Standing first-visit offer — owner to supply. Empty headline = no offer is shown anywhere.
 * Shown as a strip on /join, /memberships, the gym pages and under the homepage hero buttons.
 */
export const offer = {
  // Owner, 24 Nov 2026: no introductory offer for now. Fill in a headline and set live: true to show one
  // (only once checkout in GymMaster actually gives it).
  live: false,
  headline: "",
  detail: "",
  cta: "Claim it",
  href: "/join",
};

/**
 * GoHighLevel (Grizzly Fitness sub-account), wired 24 Nov 2026 from the owner's existing forms and calendars:
 *   - "Grizzly Fitness | Website | Contact & PT" (website-only copy of the A2P Compliant Opt-in form, 24 Nov 2026: name, phone, email, gym, service interest + unchecked SMS consent)
 *     → the contact form on /contact and the "we'll reach out" form on /personal-training
 *   - "Grizzly Fitness — Free Tour Request" → the tour form on /join
 *   - "Grizzly Consultations" calendars, one per gym → the consult buttons on /personal-training
 * Set each form's on-submit action in GHL to redirect to https://www.fitnessgrizzly.com/thank-you/ so the lead
 * event fires (GA4 generate_lead, Meta Lead). Empty url = that spot falls back to call / text / email.
 */
const GHL = "https://link.apisystem.tech/widget";
export const ghl = {
  ptForm: { url: `${GHL}/form/xzEKK8SkR4Xy8hAhmSiO`, title: "Personal training — get in touch", height: 980 },
  contactForm: { url: `${GHL}/form/xzEKK8SkR4Xy8hAhmSiO`, title: "Contact Grizzly Fitness", height: 980 },
  tourForm: { url: `${GHL}/form/rdGijbWBXR8L4udtN2FS`, title: "Request a free tour", height: 900 },
  /** Booking pages of the per-gym consultation calendars (verified to load, 24 Nov 2026). */
  consult: {
    princeton: `${GHL}/booking/kNweIg7seSuzsR9yKVZ4`,
    berlin: `${GHL}/booking/P8TdfOcFv4xDWmI88NYa`,
    wautoma: `${GHL}/booking/FVMRqfLXzPH7kW9HhGXc`,
    omro: `${GHL}/booking/ch10TOtlZX9E1RtuZ7kG`,
    rosendale: `${GHL}/booking/l5Lr3ZXjJthe5bhmIGpR`,
  } as Record<string, string>,
  /** New London founders list (/new-london): GHL form "GF New London | Founders List | Interest" — name, phone, email + SMS consent; redirects to /thank-you/. GHL workflow "GF New London | Founders List | Tag Lead" (published 24 Nov 2026) tags each submission `new london founder lead`. */
  newLondonForm: { url: `${GHL}/form/qrSnI8Gd4RZBsGcXrQ7t`, title: "New London founders list", height: 900 },
};

/**
 * Grizzly Fitness New London — coming soon (owner, 24 Nov 2026). Address and 24/7 from the New London Facebook page.
 *
 * FOUNDERS OFFER (from Gavino, approved by the owner 24 Nov 2026). Every plan is + the usual $20 sign-up fee.
 * Founders pricing ends 7 days after opening day. `founders.phase` drives the page:
 *   "list"   — offers shown; the call to action is the founders list (first access)          ← now
 *   "early"  — list-only presale is open: page says "join now and we'll text you the link"
 *   "open"   — public founders sale: "Claim your founders membership" → founders.href (GymMaster link with the offer)
 *   "closed" — founders pricing has ended: offers hidden, form becomes "opening updates"
 * `was` is only shown where it's a real regular price (1 year $429, bi-weekly $20 — GymMaster, 23 Nov 2026; 6 months $229).
 * 6-month regular price $229 (owner, 24 Nov 2026 — $249 with the sign-up fee).
 * GymMaster membership types (created 24 Nov 2026, club Grizzly New London only, Online Sign-Up OFF until presale):
 *   489203 "New London Founders | 1 Year | $365"  — renews online at the regular $429
 *   489204 "New London Founders | 6 Months | $199" — online renewal off (staff move them to a regular plan)
 *   489205 "New London Founders | Bi-weekly | $15 first year" — $20 bi-weekly with a $15 promo for 1 year, 3-month minimum
 */
export const newLondon = {
  town: "New London",
  address: { street: "210 Wisconsin St.", city: "New London, WI", zip: "54961" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=210+Wisconsin+St+New+London+WI+54961",
  facebook: "https://www.facebook.com/profile.php?id=61596818194157",
  founders: {
    phase: "list" as "list" | "early" | "open" | "closed",
    href: "", // GymMaster sign-up link with the founders offer — needed for phase "open"
    deadline: "Founders pricing ends 7 days after opening day",
    presaleDate: "Monday, Nov. 30", // list-only presale opens (owner, 24 Nov 2026)
    presaleAt: "2026-11-30T10:00:00-06:00", // countdown target on /new-london = when the GHL presale text sends
    signupFee: "$20",
    offers: [
      { id: "year", name: "Founders Year", price: "$365", unit: "paid in full for 12 months", hook: "That's $1 a day", was: "$429", badge: "Best value" },
      { id: "six", name: "Founders 6 Months", price: "$199", unit: "paid in full for 6 months", hook: "Six months, one payment", was: "$229", badge: "" },
      { id: "biweekly", name: "Founders Bi-weekly", price: "$15", unit: "every 2 weeks for your first year, then $20", hook: "Lowest way to start", was: "$20", badge: "" },
    ],
  },
};

/**
 * Tracking IDs (owner, 19 Nov 2026): GA4 + Meta Pixel, loaded directly (no GTM). Google Ads: none yet — paste an
 * "AW-…" ID into googleAdsId later and it loads through the same gtag (the CSP already allows Google Ads).
 * Empty = that tag doesn't load. If GTM is ever used instead, put GA4 / Ads / Pixel inside GTM and leave the
 * other three empty to avoid double counting. Events sent: join_click (GymMaster sign-up, with gym),
 * click_to_call, click_to_text, generate_lead (on /thank-you, the page GHL forms redirect to after submit).
 */
export const tracking = { gtmId: "", ga4Id: "G-V6074L14E4", googleAdsId: "", metaPixelId: "789997473854772" };
