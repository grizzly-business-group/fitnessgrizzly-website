import type { LocationPage } from "../location-pages";

import pMuralMachines from "@/public/media/princeton/princeton-mural-machines.jpg";
import pSelectorized from "@/public/media/princeton/princeton-selectorized-mural-lamp.jpg";
import pFrontDeskRugs from "@/public/media/princeton/princeton-front-desk-rugs.jpg";
import pDumbbellRoom from "@/public/media/princeton/princeton-dumbbell-room.jpg";
// Newest photos from the owner's Princeton album (2025), edited for exposure, colour and sharpness only.
import pMainRoom from "@/public/media/princeton/princeton-2025-main-room.jpg";
import pDeskView from "@/public/media/princeton/princeton-2025-front-desk-view.jpg";
import pLongRoom from "@/public/media/princeton/princeton-2025-long-room.jpg";
import pCardio25 from "@/public/media/princeton/princeton-2025-cardio-mural.jpg";
import pTreadmills from "@/public/media/princeton/princeton-2025-treadmills.jpg";
import pCable from "@/public/media/princeton/princeton-2025-cable-station.jpg";
import pPoem from "@/public/media/princeton/princeton-2025-mural-poem.jpg";
import pCorner from "@/public/media/princeton/princeton-2025-storefront-corner.jpg";
import pEntrance from "@/public/media/princeton/princeton-2025-entrance.jpg";
import pRackRoom25 from "@/public/media/princeton/princeton-2025-rack-room.jpg";
import pPlatform25 from "@/public/media/princeton/princeton-2025-platform.jpg";
import pPlateRoom from "@/public/media/princeton/princeton-2025-plate-loaded-room.jpg";
import pLounge25 from "@/public/media/princeton/princeton-2025-lounge.jpg";

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
      src: pMainRoom,
      asset: "IMG_8483",
      alt: "The main room at Grizzly Fitness Princeton: white and blue machines and apparel racks on plank floors, the antique painted mural along both walls",
      caption: "The main room — machines under the antique mural",
      position: "50% 55%",
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
      { src: pDeskView, asset: "IMG_8479", alt: "The view from the front desk: a wooden table with plants, machines and apparel racks down the long room under the mural and exposed ductwork", caption: "From the front desk, down the long room" },
      { src: pPlatform25, asset: "IMG_6185", alt: "Squat racks around a wooden lifting platform with a painted logo inset", caption: "Racks and a lifting platform with a painted logo inset" },
      { src: pCorner, asset: "IMG_6176", alt: "A glass café table, chairs and a rug by the storefront doors, beside a lit black shelving unit", caption: "The corner by the storefront doors" },
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
      { src: pMainRoom, asset: "IMG_8483", alt: "The main room from the front: white and blue machines and apparel racks on plank floors, the painted mural along both walls", caption: "The main room" },
      { src: pLongRoom, asset: "IMG_8475", alt: "The long main room on plank floors: machines down both sides under the antique mural and exposed ductwork", caption: "The long room" },
      { src: pDeskView, asset: "IMG_8479", alt: "From the front desk: a wooden table with plants, machines and apparel racks down the long room", caption: "From the front desk" },
      { src: pCardio25, asset: "IMG_6179", alt: "Bikes, a rower and ellipticals in front of the antique painted mural, a fern in a brass planter in the foreground", caption: "Cardio beside the mural" },
      { src: pTreadmills, asset: "IMG_6639", alt: "A long row of Matrix treadmills along the front windows, ellipticals and the mural on the left", caption: "Treadmills by the windows" },
      { src: pCable, asset: "IMG_9204", alt: "A white cable station in the foreground, selectorized machines on plank floors and the mural behind", caption: "Cable station and machines" },
      { src: pPoem, asset: "IMG_8017", alt: "A section of the antique mural with a hand-lettered spring poem signed Bryant, and a wall clock", caption: "A poem on the old mural" },
      { src: pRackRoom25, asset: "IMG_6182", alt: "A row of black squat racks and a wooden lifting platform in the dark-walled rack room, a wooden stool in front", caption: "The rack room" },
      { src: pPlatform25, asset: "IMG_6185", alt: "Squat racks around a wooden lifting platform with a painted logo inset", caption: "Racks and platform" },
      { src: pPlateRoom, asset: "IMG_6183", alt: "Silver plate-loaded machines with blue pads on a tile floor, dark block walls behind", caption: "Plate-loaded machines" },
      { src: pLounge25, asset: "IMG_6180", alt: "A lounge with a navy sofa, armchairs and bookshelves, squat racks along the dark wall behind", caption: "The lounge" },
      { src: pCorner, asset: "IMG_6176", alt: "A glass café table, chairs and a rug by the storefront doors, beside a lit black shelving unit", caption: "By the storefront doors" },
      { src: pEntrance, asset: "IMG_8673", alt: "The entrance vestibule with a blue Grizzly Fitness Center sign in the window", caption: "The front entrance" },
      { src: pMuralMachines, asset: "2d2fd04e", alt: "Purple plate-loaded and white selectorized machines in front of the antique painted mural", caption: "Machines against the mural" },
      { src: pSelectorized, asset: "54b2a541", alt: "Cybex selectorized machines on plank floors below the mural, with a lamp on the front counter", caption: "Selectorized machines" },
      { src: pFrontDeskRugs, asset: "ab4b7ab6", alt: "The front desk with rugs, a lounge chair and a brass planter on plank floors", caption: "Front desk and rugs" },
      { src: pDumbbellRoom, asset: "94941ccf", alt: "Dumbbell racks and adjustable benches in a dark-walled room with rubber flooring", caption: "The dumbbell room" },
    ],
  },
  testimonials: [
    { quote: "Grizzly Fitness is a great place for all the locals who want gains! If you want to get healthy and exercise without being leered at, this is the place! Thanks Colton for this business!", name: "Lisa" },
    { quote: "Awesome gym! Super cool people, training, equipment, and atmosphere all around. I would recommend 10/10.", name: "Caleb Kozlowski" },
  ],
  closing: { photo: { src: pCardio25, asset: "IMG_6179", alt: "", caption: "" } },
  missingPhotos: ["Exterior / storefront on W. Water St.", "People training (with consent)", "Coaching space in use", "InBody device", "Night / 24-7 shot"],
  heldBack: [
    "Wix meta description mentions a supplement shop — not shown until the owner confirms one is at Princeton.",
    "Founding year and building history — not shown until owner-verified (Phase 2 decision).",
    "Wix hero image e21386cc — not used; its steel-truss room appears to be Berlin.",
    "Restroom photo dc69eddd — amenity proof only, excluded from marketing (Phase 1).",
    "Service background images 3b257b6c, fec11ebd, 628b3464 and the InBody image cdb5eca2 — stock, not migrated (Phase 1: Do not migrate).",
    "Wix page structured data (LocalBusiness at 101 Mechanic Street, phone 920-290-5807) — not carried over; conflicts with the on-page address and phone (launch blockers #5, #6).",
  ],
};
