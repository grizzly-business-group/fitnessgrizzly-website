import type { LocationPage } from "../location-pages";

import wMainFloor from "@/public/media/wautoma/wautoma-main-floor.jpg";
import wTurfSled from "@/public/media/wautoma/wautoma-turf-sled.jpg";
import wPlateRows from "@/public/media/wautoma/wautoma-plate-loaded-rows.jpg";
import wDumbbells from "@/public/media/wautoma/wautoma-dumbbells-flags.jpg";
import wRedPlate from "@/public/media/wautoma/wautoma-red-plate-loaded.jpg";
import wTurfPersp from "@/public/media/wautoma/wautoma-turf-perspective.jpg";
import wBikes from "@/public/media/wautoma/wautoma-bikes-cardio.jpg";
import wTreadmills from "@/public/media/wautoma/wautoma-treadmills.jpg";
import wDance from "@/public/media/wautoma/wautoma-dance-studio.jpg";
import wClassroom from "@/public/media/wautoma/wautoma-main-classroom.jpg";
import wBefore from "@/public/media/wautoma/wautoma-2021-before-renovation.jpg";
import wCounter from "@/public/media/wautoma/wautoma-2021-old-counter.jpg";
import wGutted from "@/public/media/wautoma/wautoma-2021-gutted.jpg";
import wFraming from "@/public/media/wautoma/wautoma-2021-framing.jpg";
import wTile from "@/public/media/wautoma/wautoma-2021-entry-tile.jpg";
import wBoxed from "@/public/media/wautoma/wautoma-2021-boxed-equipment.jpg";
import wCardioArrives from "@/public/media/wautoma/wautoma-2021-cardio-arrives.jpg";
// Owner's Wautoma albums (2022 main floor; May 2024 strength area), edited for exposure, colour and sharpness only.
import wStrength from "@/public/media/wautoma/wautoma-2024-strength-area.jpg";
import wRacks from "@/public/media/wautoma/wautoma-2024-racks.jpg";
import wPlatform from "@/public/media/wautoma/wautoma-2024-lifting-platform.jpg";
import wBench from "@/public/media/wautoma/wautoma-2024-bench-press.jpg";
import wPlateCables from "@/public/media/wautoma/wautoma-2024-plate-loaded-cables.jpg";
import wRacksBenches from "@/public/media/wautoma/wautoma-2024-racks-benches.jpg";
import wDownStrength from "@/public/media/wautoma/wautoma-2024-down-the-strength-area.jpg";
import wMachinesTurf from "@/public/media/wautoma/wautoma-2022-machines-turf.jpg";
import wFrontDesk from "@/public/media/wautoma/wautoma-2022-front-desk.jpg";
import wEntrance from "@/public/media/wautoma/wautoma-2022-entrance.jpg";

/*
 * Wautoma — "The Community Hub". Sources: /wautoma (description verbatim, services incl. Exercise
 * Programming, classes section, studio addresses), /wautomaphotos (9 + 7 renovation), the Nov 2024
 * class descriptions (no schedule is published — owner decision Nov 2026: "Call or text for current class times"),
 * homepage testimonial (Clarence Lont).
 */

const trainingEmail = "mailto:support@fitnessgrizzly.com?subject=Personal%20training%20at%20Grizzly%20Fitness%20Wautoma";

export const wautoma: LocationPage = {
  slug: "wautoma",
  path: "/locations/wautoma",
  legacyPaths: ["/wautoma", "/wautomaphotos"],
  seo: {
    title: "Grizzly Fitness Wautoma, WI | 24/7 Gym & Classes on E. Main St.",
    description:
      "Grizzly Fitness Wautoma: a 24/7 key-fob gym for beginners and lifters with cardio, easy-to-use strength machines, plate-loaded machines, two free-weight areas (dumbbells 5–100+ lbs) and group fitness classes.",
  },
  geo: { lat: 44.0742988, lng: -89.2835617 },
  tone: "community",
  hero: {
    variant: "wide",
    photo: {
      src: wMainFloor,
      asset: "8bbb9382",
      alt: "The wide main floor at Grizzly Fitness Wautoma: rows of black plate-loaded machines on rubber flooring, orange walls and military flags",
      caption: "The main floor",
      position: "50% 55%",
    },
    eyebrow: "03 — The Community Hub",
    lead: "Great for any fitness enthusiast or beginner. A ton of cardio, easy-to-use strength machines, plate-loaded machines, two separate free-weight areas — and classes, right on Main Street.",
    panel: {
      title: "Classes at Wautoma",
      items: [{ name: "Group Fit", detail: "High energy, all ages" }, { name: "Senior Fit", detail: "Silver Sneakers" }],
      foot: "Main Classroom at 230 E. Main · Dance Studio at 220 E. Main",
      href: "#classes",
      label: "See classes",
    },
  },
  order: ["facts", "space", "classes", "equipment", "services", "gallery", "testimonials", "archive", "membership", "others", "cta"],
  space: {
    eyebrow: "The space",
    heading: ["Something", "for everyone."],
    paragraphs: [
      "Our Wautoma location is great for any fitness enthusiast or beginner. We have a ton of cardio and easy-to-use strength machines as well as a variety of plate-loaded machines. There are two separate free-weight areas, with dumbbells from 5 to 100+ lbs.",
      "It's one long, bright floor in a converted Main Street retail space: orange walls, a grid of columns, a green turf lane with a sled, and flags along the walls. A newer strength area adds power racks, benches and a lifting platform.",
    ],
    photos: [
      { src: wPlateRows, asset: "f2231d87", alt: "Black plate-loaded machines lined up in rows down the main floor", caption: "Plate-loaded machines in rows", position: "50% 60%" },
      { src: wDumbbells, asset: "1ee40813", alt: "Dumbbell racks and benches under military flags beside an orange wall", caption: "One of the two free-weight areas", position: "50% 55%" },
      { src: wStrength, asset: "IMG_0034", alt: "The bright strength area: power racks, benches and plate-loaded machines on black rubber flooring under recessed lights", caption: "The strength area", position: "50% 60%" },
    ],
  },
  classes: {
    eyebrow: "Classes",
    heading: ["Classes on", "Main Street."],
    intro: "Classes are also offered here in Wautoma, in two rooms on East Main Street.",
    items: [
      { name: "Group Fit", body: "A high energy workout for various age groups, fun music, dance aerobics, and more." },
      { name: "Senior Fit (Silver Sneakers)", body: "A mixture of chair aerobics, stretching, and weight training." },
    ],
    studios: [
      {
        name: "Main Classroom",
        address: "230 E. Main St., Wautoma",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=230+E+Main+St+Wautoma+WI+54982",
        photo: {
          src: wClassroom,
          asset: "4e851055",
          alt: "The Main Classroom: a long room with mirrors, rubber flooring, green LED trim and stability balls along the wall",
          caption: "Main Classroom",
          // Owner, 19 Nov 2026: keep this photo as is (shown with a gentle exposure lift) until a reshoot.
        },
      },
      {
        name: "Dance Studio",
        address: "220 E. Main St., Wautoma",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=220+E+Main+St+Wautoma+WI+54982",
        photo: { src: wDance, asset: "d7e42aca", alt: "The Dance Studio: a bright, empty room with white walls, a mirror wall and black flooring", caption: "Dance Studio", position: "50% 60%" },
      },
    ],
    timesNote: "Call or text 920-990-2795 for current class times. Silver Sneakers is one of the insurance fitness programs we accept.",
    ctas: [
      { label: "Call 920-990-2795", href: "tel:+19209902795" },
      { label: "Text us", href: "sms:+19209902795" },
    ],
  },
  equipment: {
    heading: ["Easy to start,", "room to grow."],
    intro: "From our Wautoma page and our own photos of the gym — ask at the desk for anything specific.",
    groups: [
      { group: "Main floor", items: ["A ton of cardio — treadmills, bikes and more", "Easy-to-use strength machines", "A variety of plate-loaded machines"] },
      { group: "Free weights", items: ["Two separate free-weight areas", "Dumbbells from 5 to 100+ lbs", "Benches"] },
      { group: "Also here", items: ["Strength area with power racks, benches and a lifting platform", "Turf lane with a sled", "Main Classroom and Dance Studio", "Longest staffed hours of our five gyms", "24/7 key-fob entry"] },
    ],
  },
  services: {
    intro: "Coaching and tools offered at Grizzly Fitness Wautoma, on top of 24/7 access and classes.",
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
        id: "exercise-programming",
        title: "Exercise programming",
        body: "A personal trainer in your pocket: one of our trainers plans personalized workouts for you. Access workouts, watch instructional videos and track your progress from your phone.",
      },
    ],
  },
  gallery: {
    photos: [
      { src: wStrength, asset: "IMG_0034", alt: "The bright strength area: power racks, benches and plate-loaded machines under recessed lights, a rustic wood door on the far wall", caption: "The strength area" },
      { src: wRacks, asset: "IMG_0030", alt: "Power racks and benches on black rubber flooring, a plate-loaded machine along the left wall", caption: "Power racks" },
      { src: wPlatform, asset: "IMG_0038", alt: "A lifting platform with a barbell and coloured bumper plates, a row of racks along the wall", caption: "Lifting platform" },
      { src: wBench, asset: "IMG_0081", alt: "An Olympic bench press with a yellow frame beneath a motivational poster", caption: "Bench press" },
      { src: wRacksBenches, asset: "IMG_0085", alt: "Power racks and a yellow-frame bench across the open floor, black steel columns and a rustic wood door", caption: "Racks and benches" },
      { src: wPlateCables, asset: "IMG_0072", alt: "A neon-yellow plate-loaded machine and a Nautilus assisted pull-up station, more strength equipment behind", caption: "Plate-loaded and cables" },
      { src: wDownStrength, asset: "IMG_0103", alt: "Looking down the long strength area: a plate-loaded bench in front, racks along the far wall", caption: "Down the strength area" },
      { src: wMachinesTurf, asset: "IMG_7581", alt: "Grey selectorized leg machines beside the turf, rows of black plate-loaded machines and orange walls behind", caption: "Machines by the turf" },
      { src: wFrontDesk, asset: "IMG_8611", alt: "The front of the gym: the reception counter, patterned carpet and a turf strip, windows and an orange wall at the far end", caption: "Up front" },
      { src: wEntrance, asset: "IMG_8614", alt: "The entrance by the front windows: a supplement shelf, a small counter and a Grizzly Fitness banner", caption: "The entrance" },
      { src: wMainFloor, asset: "8bbb9382", alt: "The wide main floor with black plate-loaded machines, orange walls and military flags", caption: "The main floor" },
      { src: wTurfSled, asset: "6a613b4c", alt: "A green turf lane with a sled, strength machines along both sides", caption: "Turf lane and sled" },
      { src: wDumbbells, asset: "1ee40813", alt: "Dumbbells and benches under military flags beside an orange wall", caption: "Dumbbells and benches" },
      { src: wPlateRows, asset: "f2231d87", alt: "Black plate-loaded machines lined up in rows", caption: "Plate-loaded rows" },
      { src: wRedPlate, asset: "d19bee17", alt: "A red plate-loaded machine in the foreground of the bright main floor", caption: "Red plate-loaded machine" },
      { src: wTurfPersp, asset: "c85bd081", alt: "The turf lane running down the floor between machines, orange wall at the far end", caption: "Down the turf lane" },
      { src: wBikes, asset: "f771e296", alt: "Air bikes, recumbent bikes and ellipticals across the cardio area", caption: "Bikes and cardio" },
      { src: wTreadmills, asset: "769b0caa", alt: "A row of treadmills facing TVs mounted on the wall", caption: "Treadmills with TVs" },
      { src: wDance, asset: "d7e42aca", alt: "The bright, empty Dance Studio with a mirror wall", caption: "Dance Studio, 220 E. Main" },
    ],
  },
  archive: {
    eyebrow: "Before the gym",
    heading: ["From empty", "storefront."],
    body: "Wautoma's gym was built inside a former Main Street retail space. These renovation photos from our Wautoma gallery (2021) show the empty floor, the old service counter, the gutted ceiling and framing, and the first equipment arriving.",
    photos: [
      { src: wBefore, asset: "2b743b1e", alt: "The empty former retail floor with rows of fluorescent lights and support columns", caption: "The empty floor", source: "archival" },
      { src: wCounter, asset: "89c77b8d", alt: "An old service counter in front of an orange-red wall", caption: "The old counter", source: "archival" },
      { src: wGutted, asset: "d54d9e34", alt: "A gutted counter area with the ceiling tiles removed", caption: "Ceiling out", source: "archival" },
      { src: wFraming, asset: "d29c1e73", alt: "New wall framing going up, with tools and weight plates on the floor", caption: "Framing in progress", source: "archival" },
      { src: wTile, asset: "c76d0314", alt: "Torn-up entry tile inside the storefront doors", caption: "The old entry tile", source: "archival" },
      { src: wBoxed, asset: "10d2a233", alt: "Boxed equipment and plates waiting in a freshly painted room", caption: "Equipment arrives", source: "archival", position: "40% 50%" },
      { src: wCardioArrives, asset: "9132c2a7", alt: "Cardio machines lined up during the renovation", caption: "Cardio goes in", source: "archival" },
    ],
  },
  testimonials: [
    {
      quote: "I have been working out at Grizzly Fitness for over a year now. Absolutely love it! My wife also enjoys the silver sneakers class in the mornings. This is a great place to be able to go to stay in shape. Just what Wautoma needed!",
      name: "Clarence Lont",
    },
  ],
  closing: { photo: { src: wTurfPersp, asset: "c85bd081", alt: "", caption: "" } },
  missingPhotos: [
    "Classes in session (with consent)",
    "Main Classroom reshoot (current photo is underexposed)",
    "Dance Studio exterior at 220 E. Main",
    "Senior Fit class",
    "Storefront exterior on Main St. (the album's exterior shows a shared sign, so it isn't used)",
    "People training, night / 24-7 shot",
  ],
  heldBack: [
    "\"In the future we plan to bring in tanning, more squat racks, a heavy lifting room, more benches\" and the meta's \"Tanning and showers coming soon\" — status unknown; not published.",
    "BOOK buttons and the 4-step portal booking instructions — pointed to another business's GymMaster tenant; removed. Owner decision (Nov 2026): no class schedule or booking on the site — call or text for times.",
    "Class flyers 6f0dba0e and bc089c66 — text baked into images with stock photos; rebuilt as HTML text.",
    "Classroom photo 63d37d24 — a duplicate of 4e851055; not used.",
    "Stock service images (Intense Training, Checking Weight, Phone on Desk) — not migrated.",
  ],
};
