import type { LocationPage } from "../location-pages";

import pMuralMachines from "@/public/media/princeton/princeton-mural-machines.jpg";
import pFrontDeskLamps from "@/public/media/princeton/princeton-front-desk-lamps.jpg";
import pCardioMural from "@/public/media/princeton/princeton-cardio-mural.jpg";
import pSelectorized from "@/public/media/princeton/princeton-selectorized-mural-lamp.jpg";
import pFrontDeskRugs from "@/public/media/princeton/princeton-front-desk-rugs.jpg";
import pLoungeStorefront from "@/public/media/princeton/princeton-lounge-storefront.jpg";
import pRacksPlatform from "@/public/media/princeton/princeton-racks-platform.jpg";
import pRackRoom from "@/public/media/princeton/princeton-rack-room.jpg";
import pBackRoom from "@/public/media/princeton/princeton-back-room-plate-loaded.jpg";
import pDumbbellRoom from "@/public/media/princeton/princeton-dumbbell-room.jpg";
import pLoungeBookshelves from "@/public/media/princeton/princeton-lounge-bookshelves.jpg";

/* Princeton — "The Original" (approved Checkpoint 4A). Sources: /princeton, /princetonphotos, /about, /faqs. */

const trainingEmail =
  "mailto:support@fitnessgrizzly.com?subject=Personal%20training%20at%20Grizzly%20Fitness%20Princeton";

export const princeton: LocationPage = {
  slug: "princeton",
  path: "/locations/princeton",
  legacyPaths: ["/princeton", "/princetonphotos"],
  seo: {
    title: "Grizzly Fitness Princeton, WI | 24/7 Gym on W. Water St.",
    description:
      "Grizzly Fitness Princeton, in the town where Grizzly Fitness began: a 24/7 key-fob gym in Princeton, WI with strength and cardio equipment, small-group personal training, InBody scans and app-based programming. Staffed Mon/Wed/Fri 8 AM–4 PM.",
  },
  geo: { lat: 43.8496327, lng: -89.1285395 },
  tone: "warm",
  hero: {
    variant: "fullbleed",
    photo: {
      src: pMuralMachines,
      asset: "2d2fd04e",
      alt: "Purple plate-loaded and white selectorized machines on plank floors in front of the antique painted mural at Grizzly Fitness Princeton",
      caption: "The main room — machines against the antique mural",
      position: "50% 50%",
    },
    eyebrow: "01 — The Original",
    lead: "The town where Grizzly Fitness started as a small personal gym. Today: strength, cardio and coaching in a historic downtown room with an antique painted mural and plank floors.",
  },
  order: ["facts", "space", "equipment", "services", "gallery", "testimonials", "membership", "others", "cta"],
  space: {
    eyebrow: "The space",
    heading: ["An old room", "for real work."],
    paragraphs: [
      "Princeton is where Grizzly Fitness began, as a small personal gym in 2017 — and this room is its fourth home, after three moves (the full story is on our About page). The main room has real character: an antique painted mural runs the length of the wall above plank floors, with the front desk lit by table lamps.",
      "Machines and cardio share that room. Behind it, darker strength rooms hold squat racks, lifting platforms, plate-loaded machines and a dumbbell room, and there's a lounge with a sofa and bookshelves.",
    ],
    photos: [
      { src: pFrontDeskLamps, asset: "46911e7f", alt: "The front desk with table lamps, plants and a rug, looking down the long main room under exposed ductwork", caption: "The front desk and the long main room" },
      { src: pRacksPlatform, asset: "51970b64", alt: "Squat racks around a wooden lifting platform with a painted logo inset", caption: "Racks and a lifting platform with a painted logo inset" },
      { src: pLoungeStorefront, asset: "b9362481", alt: "A glass café table, chairs and rug by the storefront doors, with shelving along the wall", caption: "The corner by the storefront doors" },
    ],
  },
  equipment: {
    heading: ["What's on", "the floor."],
    intro: "Listed from what's visible in our own photos of the gym — ask at the desk for anything specific.",
    groups: [
      { group: "Main room", items: ["Selectorized machines, including Cybex and Precor", "Plate-loaded machines", "Bikes, ellipticals and a Concept2 bike"] },
      { group: "Strength rooms", items: ["Squat racks", "Lifting platforms", "Plate-loaded machines", "Dumbbells and benches"] },
      { group: "Also here", items: ["Staffed front desk", "Lounge with seating", "24/7 key-fob entry"] },
    ],
  },
  services: {
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
    ],
  },
  gallery: {
    photos: [
      { src: pMuralMachines, asset: "2d2fd04e", alt: "Purple plate-loaded and white selectorized machines in front of the antique painted mural", caption: "Machines against the mural" },
      { src: pFrontDeskLamps, asset: "46911e7f", alt: "The front desk with table lamps, looking down the main room under exposed ductwork", caption: "Front desk and main room" },
      { src: pCardioMural, asset: "21d9db20", alt: "A row of bikes and ellipticals beside the mural, with a brass planter in front", caption: "Cardio beside the mural" },
      { src: pSelectorized, asset: "54b2a541", alt: "Cybex selectorized machines on plank floors below the mural, with a lamp on the front counter", caption: "Selectorized machines" },
      { src: pFrontDeskRugs, asset: "ab4b7ab6", alt: "The front desk with rugs, a lounge chair and a brass planter on plank floors", caption: "Front desk and rugs" },
      { src: pLoungeStorefront, asset: "b9362481", alt: "A glass café table and chairs on a rug beside the storefront doors and wall shelving", caption: "By the storefront doors" },
      { src: pRacksPlatform, asset: "51970b64", alt: "Squat racks and a wooden lifting platform with a painted logo inset", caption: "Racks and platform" },
      { src: pRackRoom, asset: "64999f8e", alt: "A dark-walled room with a row of squat racks and lifting platforms on a tile floor", caption: "The rack room" },
      { src: pBackRoom, asset: "990a0591", alt: "Plate-loaded machines on a tile floor in a back room with dark block walls", caption: "Plate-loaded machines, back room" },
      { src: pDumbbellRoom, asset: "94941ccf", alt: "Dumbbell racks and adjustable benches in a dark-walled room with rubber flooring", caption: "The dumbbell room" },
      { src: pLoungeBookshelves, asset: "1508880e", alt: "A lounge with a navy sofa, armchairs, a coffee table and bookshelves, with racks visible behind", caption: "The lounge" },
    ],
  },
  testimonials: [
    { quote: "Grizzly Fitness is a great place for all the locals who want gains! If you want to get healthy and exercise without being leered at, this is the place! Thanks Colton for this business!", name: "Lisa" },
    { quote: "Great equipment hard core stuff. If you are serious about building a great physique this is an outstanding gym. Very hardcore equipment that will get results.", name: "Mitch Melan" },
    { quote: "Awesome gym! Super cool people, training, equipment, and atmosphere all around. I would recommend 10/10.", name: "Caleb Kozlowski" },
  ],
  closing: { photo: { src: pCardioMural, asset: "21d9db20", alt: "", caption: "" } },
  missingPhotos: ["Exterior / storefront on W. Water St.", "Mural detail close-ups", "People training (with consent)", "Coaching space in use", "InBody device", "Night / 24-7 shot", "HEIC camera originals"],
  heldBack: [
    "Wix meta description mentions a supplement shop — not shown until the owner confirms one is at Princeton.",
    "Founding year and building history — not shown until owner-verified (Phase 2 decision).",
    "Wix hero image e21386cc — not used; its steel-truss room appears to be Berlin.",
    "Restroom photo dc69eddd — amenity proof only, excluded from marketing (Phase 1).",
    "Service background images 3b257b6c, fec11ebd, 628b3464 and the InBody image cdb5eca2 — stock, not migrated (Phase 1: Do not migrate).",
    "Wix page structured data (LocalBusiness at 101 Mechanic Street, phone 920-290-5807) — not carried over; conflicts with the on-page address and phone (launch blockers #5, #6).",
  ],
};
