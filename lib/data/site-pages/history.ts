/**
 * Company history (Phase 5 · About page). One source for the About page copy AND the fact register.
 *
 * SOURCE CODES (every public statement carries one or more):
 *   OH  "Grizzly Fitness Official History Source.md" — owner-supplied, received 26 Oct 2026
 *       (working copy: Phase 5/References/). `ref` gives the line numbers in that file.
 *   WX  the existing Wix website (Phase 1 Website Inventory)
 *   P1  Phase 1 verified materials (photo metadata, GymMaster club list, crawl)

 *   OW  owner, in writing in the project conversation (26 Oct 2026, approving Checkpoint 5A)
 *   OA  owner's photo archive (folders shared 26 Oct 2026); dates = camera EXIF dates
 *   CI  creative interpretation — framing or comparison written by us, not a factual claim about the company
 *
 * `approx: true` = the brief or source treats the figure as approximate; the page says "about" / "around".
 * `date` is only set where the source gives one. The source's own historical note says some early name
 * transitions, the Green Lake ownership/exit and certain location openings are unconfirmed — so those stages
 * are shown without dates, never guessed.
 */
export type Src = "OH" | "OW" | "OA" | "WX" | "P1" | "CI";

export type Fact = { id: string; text: string; src: Src[]; ref?: string; approx?: boolean; flag?: string };

export const facts: Fact[] = [
  { id: "start-year", text: "The business began in 2017", src: ["OH"], ref: "5" },
  { id: "start-place", text: "It began in Princeton, Wisconsin, with a small training studio", src: ["OH", "WX"], ref: "5, 180" },
  { id: "start-name", text: "Its roots are Priority Athlete, a personal training and athletic development business", src: ["OH"], ref: "7" },
  { id: "founder", text: "Priority Athlete was founded by Colton Burt at 18", src: ["OH"], ref: "7" },
  { id: "investment", text: "About $3,000 of initial investment", src: ["OH"], ref: "7", approx: true },
  { id: "space-400", text: "A training space of roughly 400 sq ft", src: ["OH"], ref: "7", approx: true },
  { id: "mechanic", text: "Princeton started at 101 Mechanic St., in a small section of the building, with minimal equipment", src: ["OW"] },
  { id: "focus", text: "Focus on strength, athletic performance and overall fitness", src: ["OH"], ref: "7" },
  { id: "modest", text: "The early operation ran on a modest budget and depended on resourcefulness", src: ["OH"], ref: "9" },
  { id: "space-1500", text: "Expanded into a roughly 1,500 sq ft facility", src: ["OH"], ref: "11", approx: true, flag: "Date and town not given" },
  { id: "space-3000", text: "Eventually a 3,000 sq ft location", src: ["OH"], ref: "11", approx: true, flag: "The source gives 3,000 without \"roughly\"; shown as \"about\" per the Phase 5 brief. Date and town not given" },
  { id: "relocations", text: "Princeton relocated three times: the original gym (101 Mechanic St.), a second and a third location, then today's gym", src: ["OW"], flag: "Which space was ≈1,500 and which ≈3,000 sq ft isn't stated, so the page doesn't pair them; addresses of the 2nd and 3rd gyms not given" },
  { id: "relocation-reason", text: "The moves weren't simply about outgrowing each space: as property owners made new plans for their buildings, the business had to relocate and start fresh more than once (owner's own paragraph, used verbatim in \"Same town. Four rooms.\")", src: ["OW"], flag: "Refines source line 11 (\"expanded into larger training spaces\"). The page no longer says every move was for growth; which move had which reason isn't stated, so none is assigned" },
  { id: "photos-princeton", text: "Original gym photos dated Dec 2017; second gym photos dated Jul and Sep 2020; third gym photos dated Mar 2022", src: ["OA"], flag: "IMG_2065 (7 Mar 2022) was in the \"After OG Princeton 1\" folder but shows the same room as the \"2\" photos from the day before; it is treated as the third gym and is not used on the page" },
  { id: "photos-berlin", text: "Berlin warehouse photos dated 28 Jan 2021, before the April 2021 opening", src: ["OA"] },
  { id: "photos-wautoma", text: "Wautoma building and empty store photos dated May 2021", src: ["OA"] },
  { id: "garage", text: "\"About the size of a two-car garage\" (a common 20 × 20 ft comparison)", src: ["CI"] },
  { id: "wix-origin", text: "\"Grizzly Fitness started as a small personal gym in beautiful Princeton, Wisconsin.\"", src: ["WX"] },
  { id: "pf-used", text: "Instead of relying only on expensive new equipment, the company sourced used equipment through Craigslist, Facebook Marketplace and other channels", src: ["OH"], ref: "19" },
  { id: "pf-activities", text: "Buying, selling, transporting, repairing and installing equipment became a growing part of the operation", src: ["OH"], ref: "21" },
  { id: "pf-separate", text: "That grew into a separate business, Priority Fitness — commercial equipment sales, installation, servicing, maintenance and facility support", src: ["OH"], ref: "23–25, 51, 104" },
  { id: "pf-advantage", text: "The equipment work built experience in gym design, sourcing and maintenance, which became an advantage as the gyms expanded", src: ["OH"], ref: "27–29, 120" },
  { id: "brands", text: "Hammer Strength, Precor, Matrix, Cybex, Nautilus and Magnum equipment; an old-school feel", src: ["WX"] },
  { id: "gl-manage", text: "In 2019 the business assumed management of Green Lake Fitness, an existing 24-hour gym at the Town Square Community Center in Green Lake", src: ["OH"], ref: "33" },
  { id: "gl-own", text: "The management arrangement developed into full ownership", src: ["OH"], ref: "37", flag: "Ownership date unconfirmed (source note, line 204) — none shown" },
  { id: "gl-exit", text: "The company later moved on, ending its ownership and operations there; Green Lake is not part of today's network", src: ["OH"], ref: "43–45", flag: "Exit date unconfirmed — none shown" },
  { id: "gl-lessons", text: "Green Lake built knowledge in membership management, facility operations, equipment maintenance and serving different communities", src: ["OH"], ref: "41" },
  { id: "name", text: "Grizzly Fitness emerged as the primary identity of the growing network of gyms, while Priority Fitness continued as a separate equipment business", src: ["OH"], ref: "51", flag: "Date unconfirmed (line 204) — none shown; placed after Green Lake and before Berlin as in the source" },
  { id: "overlooked", text: "An opportunity in towns larger chains often overlooked: many rural communities lacked convenient access to well-equipped strength gyms, 24-hour access and professional fitness services", src: ["OH"], ref: "55–57" },
  { id: "philosophy", text: "People should be able to pursue serious fitness goals without travelling to larger cities", src: ["OH"], ref: "59" },
  { id: "model", text: "Operating model: 24/7 key-fob access; quality strength and cardio equipment; welcoming to lifters and beginners; accessible small-town fitness; strong local relationships; real training needs over unnecessary amenities", src: ["OH"], ref: "61–68" },
  { id: "berlin-open", text: "Berlin opened in April 2021", src: ["OH"], ref: "74" },
  { id: "berlin-region", text: "Berlin strengthened the company's presence in Central Wisconsin and helped establish it as a growing regional brand", src: ["OH"], ref: "76" },
  { id: "berlin-levels", text: "Berlin has a mezzanine cardio section with a heavy lifting section below", src: ["WX", "P1"] },
  { id: "berlin-warehouse", text: "Berlin was built out inside a bare Industrial Park warehouse (build-out photos)", src: ["WX", "P1"] },
  { id: "network", text: "Over the following years the network grew across Central Wisconsin to serve Princeton, Wautoma, Berlin, Omro and Rosendale", src: ["OH"], ref: "88–90", flag: "Individual opening dates unconfirmed (line 204) — none shown" },
  { id: "six", text: "\"Six fitness centers by 2025\" (broader company)", src: ["OH"], ref: "90, 150", flag: "NOT PUBLISHED — the brief forbids presenting the historical count as the current network, and the sixth facility isn't named" },
  { id: "coordinated", text: "Equipment, processes, membership systems and service standards became increasingly coordinated across the network", src: ["OH"], ref: "94–96" },
  { id: "wautoma-2021", text: "Wautoma was renovated from an empty Main Street retail space; renovation photos dated 2021", src: ["WX", "P1"], flag: "Opening date not given — none shown" },
  { id: "omro-iron", text: "Omro was formerly known as Omro Iron", src: ["WX"], flag: "When it joined not given" },
  { id: "rosendale", text: "Rosendale is a Main Street storefront gym", src: ["WX", "P1"], flag: "Opening date not given" },
  { id: "coaching", text: "2024–2025: expanded coaching — personal training, semi-private personal training, InBody assessments, nutritional guidance and ongoing accountability", src: ["OH"], ref: "126–136" },
  { id: "sppt", text: "Semi-private training became increasingly important: small groups, professional coaching, individual programs", src: ["OH", "WX"], ref: "138–142" },
  { id: "welcome", text: "Greater emphasis on people who may not feel comfortable in a gym: adults returning to exercise, people focused on weight loss, people building or keeping muscle, older adults improving strength, mobility and independence", src: ["OH"], ref: "144–146" },
  { id: "nutrition", text: "Nutrition guidance is part of semi-private personal training (not a separate service)", src: ["OW"] },
  { id: "team", text: "By September 2025 the broader organization had more than 20 full- and part-time employees (owner approved for publication, 26 Oct)", src: ["OH", "OW"], ref: "150" },
  { id: "medical", text: "Exploring additional health-related services, incl. medically supported weight-management approaches", src: ["OH"], ref: "166", flag: "NOT PUBLISHED — described as exploratory, not a current service; health claim needs owner sign-off" },
  { id: "services-where", text: "Semi-private training, InBody and Pocket Trainer are listed on the Princeton, Berlin and Wautoma pages only", src: ["WX"] },
  { id: "decade", text: "As of October 2026, nearly a decade of business development", src: ["OH"], ref: "178" },
  { id: "five-today", text: "Five active gyms today: Princeton, Berlin, Wautoma, Omro, Rosendale", src: ["OH", "WX", "P1"], ref: "90" },
  { id: "tagline", text: "\"We operate in small towns, but Grizzly Fitness is for Big Dreamers.\"", src: ["WX"] },
  { id: "purpose", text: "Grizzly Fitness exists to make quality fitness opportunities more accessible in small-town Wisconsin; ambitious goals can begin anywhere", src: ["OH"], ref: "196–198" },
];

/** The timeline, in the source's order. `when` is shown exactly as written. */
export type Stage = {
  id: string;
  when: string;
  /** machine-readable date where one exists */
  dateTime?: string;
  dated: boolean;
  place?: string;
  title: string;
  body: string;
  former?: boolean;
  facts: string[];
};

export const timeline: Stage[] = [
  {
    id: "2017",
    when: "2017",
    dateTime: "2017",
    dated: true,
    place: "Princeton",
    title: "Priority Athlete opens",
    body: "A personal-training and athletic-development business in a small section of the building at 101 Mechanic St. — about 400 square feet with minimal equipment — started with around $3,000 and run on a modest budget.",
    facts: ["start-year", "start-place", "start-name", "mechanic", "space-400", "investment", "modest"],
  },
  {
    id: "growing",
    when: "The next few years",
    dated: false,
    place: "Princeton",
    title: "Moving and rebuilding",
    body: "As property owners made new plans for their buildings, the Princeton gym had to relocate and start fresh more than once — through spaces of about 1,500 and 3,000 square feet — rebuilding each time. Photos from the second and third gyms date from 2020 and 2022.",
    facts: ["space-1500", "space-3000", "relocations", "relocation-reason", "photos-princeton"],
  },
  {
    id: "equipment",
    when: "Alongside",
    dated: false,
    title: "The equipment business",
    body: "Sourcing used equipment, then buying, selling, moving, repairing and installing it, grew into a separate business: Priority Fitness, still its own company today.",
    facts: ["pf-used", "pf-activities", "pf-separate"],
  },
  {
    id: "2019",
    when: "2019",
    dateTime: "2019",
    dated: true,
    place: "Green Lake",
    title: "Beyond Princeton",
    body: "The business took over management of Green Lake Fitness, an existing 24-hour gym at the Town Square Community Center in Green Lake. The arrangement became full ownership; the company later moved on from the location. Along the way it learned membership management, facility operations, equipment maintenance and how to serve a different community.",
    former: true,
    facts: ["gl-manage", "gl-own", "gl-exit", "gl-lessons"],
  },
  {
    id: "name",
    when: "Then",
    dated: false,
    title: "Grizzly Fitness emerges",
    body: "Grizzly Fitness became the name of the growing network of gyms — built for the small towns larger chains often overlook — while Priority Fitness carried on as a separate equipment business.",
    facts: ["name", "overlooked"],
  },
  {
    id: "2021",
    when: "April 2021",
    dateTime: "2021-04",
    dated: true,
    place: "Berlin",
    title: "Berlin opens",
    body: "A bare Industrial Park warehouse becomes a two-level gym, with cardio on the mezzanine and iron below. Berlin strengthened Grizzly Fitness's presence in Central Wisconsin and helped make it a growing regional brand.",
    facts: ["berlin-open", "berlin-region", "berlin-warehouse", "berlin-levels", "photos-berlin"],
  },
  {
    id: "five",
    when: "The following years",
    dated: false,
    place: "Wautoma · Omro · Rosendale",
    title: "A network across Central Wisconsin",
    body: "An empty Main Street storefront in Wautoma is renovated into a gym. Omro Iron becomes Grizzly Fitness Omro. A bright storefront on Rosendale's Main Street joins too — and equipment, systems and standards are increasingly shared across the gyms.",
    facts: ["network", "wautoma-2021", "photos-wautoma", "omro-iron", "rosendale", "coordinated"],
  },
  {
    id: "2024",
    when: "2024–2025",
    dateTime: "2024",
    dated: true,
    title: "Beyond the membership",
    body: "Coaching moves to the centre: personal training, semi-private personal training with nutrition guidance and ongoing accountability built in, and InBody assessments. By September 2025 the organization has a team of more than 20 full- and part-time staff.",
    facts: ["coaching", "sppt", "nutrition", "team"],
  },
  {
    id: "today",
    when: "Today",
    dated: false,
    title: "Five gyms, one mission",
    body: "Nearly a decade on: Princeton, Berlin, Wautoma, Omro and Rosendale — five 24/7 gyms rooted in small-town Wisconsin.",
    facts: ["decade", "five-today"],
  },
];

/** The operating model, as the source lists it (lines 61–68). */
export const model = [
  "24/7 access with secure key-fob entry",
  "Quality strength-training and cardio equipment",
  "Welcoming to experienced lifters and beginners",
  "Fitness that's easy to reach in smaller communities",
  "Strong relationships with members and local communities",
  "Built around real training needs, not unnecessary amenities",
];

/** Who coaching is increasingly built for (lines 144–146). */
export const welcome = [
  "Adults returning to exercise",
  "People focused on weight loss",
  "Anyone building or keeping muscle",
  "Older adults improving strength, mobility and independence",
];
