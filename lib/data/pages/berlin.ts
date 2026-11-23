import type { LocationPage } from "../location-pages";

import bTurfFlags from "@/public/media/berlin/berlin-turf-flags.jpg";
import bMainFloor from "@/public/media/berlin/berlin-main-floor-turf.jpg";
import bTurfCircuit from "@/public/media/berlin/berlin-turf-strength-circuit.jpg";
import bPowerRack from "@/public/media/berlin/berlin-power-rack.jpg";
import bPlateCluster from "@/public/media/berlin/berlin-plate-loaded-cluster.jpg";
import bBenches from "@/public/media/berlin/berlin-benches-cobalt-wall.jpg";
import bDumbbells from "@/public/media/berlin/berlin-dumbbells-service-flags.jpg";
import bConquer from "@/public/media/berlin/berlin-cardio-conquer-banner.jpg";
import bCardioCobalt from "@/public/media/berlin/berlin-cardio-cobalt-wall.jpg";
import bMezzCardio from "@/public/media/berlin/berlin-mezzanine-cardio-yellow-wall.jpg";
import bMezzLifeFitness from "@/public/media/berlin/berlin-mezzanine-life-fitness.jpg";
import bLounge from "@/public/media/berlin/berlin-lounge.jpg";
import bDesk from "@/public/media/berlin/berlin-front-desk-supplements.jpg";
import bPlatforms from "@/public/media/berlin/berlin-platforms-functional-trainer.jpg";
import bBuildFraming from "@/public/media/berlin/berlin-warehouse-before.jpg";
import bBuildForklift from "@/public/media/berlin/berlin-buildout-forklift.jpg";
import bBuildLift from "@/public/media/berlin/berlin-buildout-scissor-lift.jpg";
import bBuildBlue from "@/public/media/berlin/berlin-buildout-blue-wall.jpg";

/*
 * MEZZANINE (Phase 5 correction, owner-confirmed 26 Oct 2026): the mezzanine photos are
 * berlin-mezzanine-cardio-yellow-wall (fc73ee99) and berlin-mezzanine-life-fitness (c773398a) — the owner
 * sent both as the mezzanine. The photo previously captioned "Mezzanine cardio" (28c9be2f, cardio against
 * the cobalt wall, turf at its edge) is on the main floor; it is now captioned as such. Photos that only
 * *implied* the mezzanine in the background (hero turf lane, main floor, build-out framing) no longer claim it.
 *
 * Berlin — "The Warehouse". Sources: /berlin (feature list verbatim, services incl. tanning),
 * /berlinphotos (13 photos + 5 build-out), Location Identity §2, Visual Blueprint §2.
 */

const trainingEmail =
  "mailto:support@fitnessgrizzly.com?subject=Personal%20training%20at%20Grizzly%20Fitness%20Berlin";

export const berlin: LocationPage = {
  slug: "berlin",
  path: "/locations/berlin",
  legacyPaths: ["/berlin", "/berlinphotos"],
  seo: {
    title: "Grizzly Fitness Berlin, WI | 24/7 Warehouse Gym on Industrial Park Rd",
    description:
      "Grizzly Fitness Berlin: a 24/7 key-fob warehouse gym with a mezzanine cardio section, a heavy lifting section below, a Life Fitness circuit, Hammer Strength, a turf area and tanning. Staffed Mon & Wed 8 AM–7 PM, Fri 8 AM–2 PM.",
  },
  geo: { lat: 43.9595668, lng: -88.9304424 },
  tone: "industrial",
  hero: {
    variant: "split",
    photo: {
      src: bTurfFlags,
      asset: "2b358b5a",
      alt: "A long green turf lane beneath a row of international flags in the Grizzly Fitness Berlin warehouse",
      caption: "The turf lane under the flags",
      position: "50% 40%",
    },
    eyebrow: "02 — The Warehouse",
    lead: "A warehouse built out for training: a mezzanine cardio section up top, a heavy lifting section below, a turf area for functional fitness and over 80 pieces of equipment.",
    stats: [
      { value: "80+", label: "Pieces of equipment" },
      { value: "2", label: "Levels" },
      { value: "24/7", label: "Key-fob access" },
    ],
  },
  order: ["facts", "levels", "equipment", "services", "gallery", "archive", "membership", "others", "cta"],
  levels: {
    eyebrow: "Two levels, one warehouse",
    heading: ["Cardio upstairs.", "Iron below."],
    intro:
      "Berlin is an open steel-frame warehouse in the Industrial Park, painted out in black, cobalt blue and yellow, with a mezzanine level above the main floor and flags along the walls.",
    zones: [
      {
        label: "Mezzanine",
        title: "Top-of-the-line cardio",
        body: "Upstairs on the mezzanine: rows of Matrix bikes and treadmills under the low insulated ceiling, with more cardio along the yellow wall.",
        photo: { src: bMezzCardio, asset: "fc73ee99", alt: "The mezzanine cardio section: rows of Matrix bikes and treadmills under a low insulated ceiling, with a bright yellow wall and more bikes at the far end", caption: "Mezzanine cardio by the yellow wall" },
      },
      {
        label: "Mezzanine",
        title: "The Life Fitness line",
        body: "The mezzanine also holds a line of Life Fitness selectorized strength machines beneath the flags, with the railing looking out over the main floor.",
        photo: { src: bMezzLifeFitness, asset: "c773398a", alt: "A line of grey Life Fitness selectorized machines on the mezzanine beneath international flags, a black railing along the right edge overlooking the main floor", caption: "Life Fitness machines on the mezzanine" },
      },
      {
        label: "Main floor",
        title: "The heavy lifting section",
        body: "Hammer Strength squat racks and leg press, power racks on wooden platforms, benches and a dumbbell wall beneath the service flags.",
        photo: { src: bPowerRack, asset: "ee453246", alt: "A black power rack on a wooden lifting platform, with flags hanging above and yellow plate-loaded machines behind", caption: "Power rack on a wooden platform" },
      },
      {
        label: "Turf",
        title: "Room for functional fitness",
        body: "A turf area for functional fitness runs along the main floor under the international flags, beside a variety of plate-loaded machines.",
        photo: { src: bTurfCircuit, asset: "c36f70a3", alt: "White strength machines with blue pads beside the green turf, under the steel warehouse ceiling", caption: "The turf and the strength machines" },
      },
    ],
  },
  equipment: {
    eyebrow: "Equipment & amenities",
    heading: ["This 24/7 gym", "features:"],
    style: "index",
    intro: "The list from our Berlin page, word for word. Below it, what else shows up in our own photos.",
    groups: [
      {
        group: "From the Berlin page",
        items: [
          "A top-of-the-line mezzanine cardio section",
          "A heavy lifting section below",
          "A full Life Fitness circuit of strength machines",
          "Hammer Strength leg press",
          "Hammer Strength squat racks",
          "A variety of other plate-loaded machines",
          "A turf area for functional fitness",
          "And more!",
        ],
      },
      {
        group: "Also in our photos",
        items: ["Matrix treadmills, ellipticals and bikes", "Power racks on wooden lifting platforms", "Flat and incline bench stations", "A dumbbell wall", "A cable / functional trainer", "Lounge with a leather sofa", "Front desk with supplement shelving", "Tanning (Berlin only)"],
      },
    ],
    footnote: "In total we have over 80 different pieces of equipment that are ready to be utilized by you!",
  },
  services: {
    intro: "Coaching, tools and tanning at Grizzly Fitness Berlin, on top of 24/7 access to the whole warehouse.",
    items: [
      {
        id: "semi-private",
        title: "Small-group personal training",
        body: "Train in a small group setting (2–6 people) with the personal attention of a coach. Get customized workouts, accountability and community support — all at a fraction of the cost of one-on-one training.",
        cta: { label: "Email us about training", href: trainingEmail },
      },
      {
        id: "inbody",
        title: "InBody scans",
        body: "InBody scanning is a specialized scale that gives you an accurate measurement of your water weight, muscle mass, skeletal weight and fat.",
      },
      {
        id: "pocket-trainer",
        title: "Pocket trainer",
        body: "A personal trainer in your pocket: one of our trainers plans personalized workouts for you. Access workouts, watch instructional videos and track your progress from your phone.",
      },
      {
        id: "tanning",
        title: "Tanning",
        body: "Need a tan for a vacation or bodybuilding competition, swimsuit season, or a little extra Vitamin D? We offer tanning at our Berlin location, and carry lotion, tan extender and tanning goggles as well.",
      },
    ],
  },
  gallery: {
    shape: "portrait",
    photos: [
      { src: bTurfFlags, asset: "2b358b5a", alt: "Green turf lane beneath a row of international flags", caption: "Turf under the flags" },
      { src: bMainFloor, asset: "ca90cc80", alt: "The main floor: rows of machines, the green turf lane and flags along the far wall", caption: "The main floor" },
      { src: bTurfCircuit, asset: "c36f70a3", alt: "White strength machines with blue pads beside the turf under the steel ceiling", caption: "Turf and strength machines" },
      { src: bPlateCluster, asset: "5c926edf", alt: "A cluster of white plate-loaded machines under a long row of flags", caption: "Plate-loaded machines" },
      { src: bPowerRack, asset: "ee453246", alt: "A black power rack on a wooden lifting platform, flags overhead", caption: "Power rack on a platform" },
      { src: bBenches, asset: "2d4be4c7", alt: "Bench press stations with yellow frames lined up against a cobalt-blue wall", caption: "Benches on the cobalt wall" },
      { src: bDumbbells, asset: "ec3ed59a", alt: "A long dumbbell rack beneath US military service flags", caption: "Dumbbells under the service flags" },
      { src: bPlatforms, asset: "7882943e", alt: "A lifting platform with a barbell in front of a cable and functional trainer, black ceiling overhead", caption: "Platforms and functional trainer" },
      { src: bMezzLifeFitness, asset: "c773398a", alt: "Grey Life Fitness selectorized machines on the mezzanine beneath flags, the railing along the right", caption: "Mezzanine · Life Fitness line" },
      { src: bMezzCardio, asset: "fc73ee99", alt: "Rows of Matrix bikes and treadmills on the mezzanine beside a bright yellow wall", caption: "Mezzanine · cardio" },
      { src: bCardioCobalt, asset: "28c9be2f", alt: "Treadmills and ellipticals against a cobalt-blue wall on the main floor, the turf at its edge", caption: "Cardio by the cobalt wall" },
      { src: bConquer, asset: "7d37958b", alt: "Recumbent bikes and ellipticals in front of a black wall with a CONQUER bear banner", caption: "Cardio and the CONQUER banner" },
      { src: bLounge, asset: "ad03d9e2", alt: "A lounge with wood cabinets, a leather sofa, lamps and a plaid carpet", caption: "The lounge" },
      { src: bDesk, asset: "6725b5c1", alt: "The front desk with shelves of supplements and apparel by the entrance", caption: "Front desk and supplements" },
    ],
  },
  archive: {
    eyebrow: "Before the iron",
    heading: ["From an empty", "warehouse."],
    body: "Berlin started as a bare warehouse. These are the build-out photos from our Berlin gallery: wooden framing going up, a forklift on the bare floor, the crew on a scissor lift and the first wall painted blue.",
    photos: [
      { src: bBuildFraming, asset: "de28ed35", alt: "The empty warehouse with wooden framing built along one wall", caption: "Framing goes up", source: "archival" },
      { src: bBuildForklift, asset: "bd0b4d28", alt: "A forklift parked on the bare warehouse floor beside the new wooden framing", caption: "Bare floor and forklift", source: "archival" },
      { src: bBuildLift, asset: "70afcac3", alt: "Two crew members on a scissor lift working on the warehouse ceiling lights", caption: "Crew on the scissor lift", source: "archival" },
      { src: bBuildBlue, asset: "65a94a45", alt: "The empty warehouse with the far wall freshly painted blue and a forklift by the door", caption: "The first blue wall", source: "archival" },
    ],
  },
  testimonials: [],
  closing: { photo: { src: bDumbbells, asset: "ec3ed59a", alt: "", caption: "" } },
  missingPhotos: [
    "Landscape (16:9) wide shots — every current Berlin photo is portrait",
    "Mezzanine: a wide shot showing the whole upper level, and one from the main floor looking up (owner confirmed the old \"mezzanine\" photo was not the mezzanine — Phase 5)",
    "The tanning room (the Wix page used a stock render)",
    "Exterior on N. Industrial Park Rd",
    "People training (with consent)",
    "Night / 24-7 shot",
    "Berlin video tour original (Wix-hosted; needs export)",
    "Higher-resolution build-out originals (current files are 474×632)",
  ],
  heldBack: [
    "Showers — in the Wix meta description only, not on the page; not published until confirmed.",
    "Supplement shop — the page shows supplement shelving (visible in photo 6725b5c1) without claiming a shop.",
    "Video tour — the Wix-hosted file couldn't be exported in this phase; slot ready once the original is supplied (launch blocker #17).",
    "BOOK buttons — pointed to another business's GymMaster tenant (launch blocker #1); not migrated.",
    "Stock InBody (cdb5eca2) and tanning-booth (875164f3) images — not migrated.",
    "Build-out photo 240dc7e5 (crated equipment) — Phase 1 flagged it may be another warehouse; not used.",
    "\"We are excited to bring another location to a community close to home!\" — an opening-day line; not repeated as current news.",
  ],
};
