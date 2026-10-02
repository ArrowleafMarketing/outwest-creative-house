/**
 * Every copy string and every photo slug on the homepage. No section file contains a
 * literal string of prose or a literal slug.
 *
 * Three reasons this is one file:
 *   1. docs/DIRECTION.md flags the commercial claims as needing an owner confirmation
 *      pass before launch — that pass is a one-file diff.
 *   2. New photography arrives in batches; swapping a frame should be a slug, not a rewrite.
 *   3. The nav labels are still open (DIRECTION.md conflict #2) and they become URLs.
 */

export const nav = [
  { label: "THE HOUSE", href: "/the-house" },
  { label: "THE ICONS", href: "/the-icons" },
  { label: "THE COLLECTIVE", href: "/the-collective" },
  { label: "MADE OUT WEST", href: "/made-out-west" },
  { label: "ABOUT", href: "/about" },
] as const;

export const book = { label: "BOOK", href: "/book" } as const;

/**
 * ⚠ OWNER CONFIRMATION REQUIRED BEFORE LAUNCH.
 * docs/DIRECTION.md flags both the square footage and "every booking is private" as
 * commercial claims a customer could hold OutWest to. They are rendered at the two
 * largest type sizes on the page.
 */
export const claims = {
  squareFeet: "5,000",
  squareFeetCaption: "SQUARE FEET OF ROOM TO CREATE.",
  privateBooking: "EVERY BOOKING IS PRIVATE — THE ENTIRE 5,000 SQ FT IS YOURS.",
  scaleLead: "One private booking. One creative house. No shared studios.",
} as const;

export const cover = {
  location: "BOISE, IDAHO",
  lines: ["OUTWEST"],
  sub: "CREATIVE HOUSE",
  action: { label: "ENTER THE HOUSE", href: "#the-house" },
} as const;

export const statement = {
  lines: ["MAKE THEM", "REMEMBER YOU."],
  body: "OutWest is a 5,000-square-foot creative house built for photographers, filmmakers, creators, entrepreneurs and brands making work worth remembering.",
  action: { label: "DISCOVER OUTWEST", href: "#the-house" },
} as const;

export const manifesto = {
  eyebrow: "WELCOME OUT WEST",
  lines: ["NOT JUST A STUDIO.", "A PLACE TO MAKE", "SOMETHING MATTER."],
  lead: "OutWest is not a photography studio. It is a creative house — a place for independent creatives, brands and businesses to make work that gets remembered.",
  body: [
    "Photography lives here, but so do brand campaigns, commercial shoots, content production, videography, social, product launches, editorial work and creative direction.",
    "The building matters. The work happening inside it is the story.",
  ],
} as const;

export const spaces = [
  {
    no: "HOUSE NO. 01",
    name: "THE WAREHOUSE",
    line: "LIGHT. SCALE. POSSIBILITY.",
    copy: "High open ceilings, a full cyc wall, and enough floor to build whatever the shot needs.",
    href: "/the-house/warehouse",
    wide: "dsc-9270",
    tall: "photo-28-07-2026-14-49-17-38",
  },
  {
    no: "HOUSE NO. 02",
    name: "THE VILLA",
    line: "SOMEWHERE ELSE, WITHOUT LEAVING BOISE.",
    copy: "Plaster arches, olive trees, and a light that moves across the wall all afternoon.",
    href: "/the-house/villa",
    wide: "dsc-8431",
    tall: "dsc-9123",
  },
  {
    no: "HOUSE NO. 03",
    name: "THE CREATIVE LOUNGE",
    line: "WHERE THE WORK HAPPENS BETWEEN THE SHOTS.",
    copy: "Somewhere to sit, think, change the plan, and get the next frame right.",
    href: "/the-house/lounge",
    wide: "a7500819",
    tall: "first-light-38",
  },
] as const;

/**
 * ⚠ docs/DIRECTION.md conflict #5 (audience). "FOUNDERS" and "AGENCIES" have no persona
 * research behind them — the approved guide's three personas are photographers and one
 * small-business owner. This line is the page's only commitment to the wider audience.
 */
export const roles = [
  "PHOTOGRAPHERS",
  "FILMMAKERS",
  "FOUNDERS",
  "CREATORS",
  "AGENCIES",
  "BRANDS",
  "ARTISTS",
] as const;

export const people = {
  lines: ["DIFFERENT WORK.", "SAME HOUSE."],
  lead: "This is where interesting people come to make interesting things.",
} as const;

/**
 * Entries with no `credit` have no `series` in src/photos/metadata.ts. NEVER invent a
 * series name. No `href` on any entry: the profiles do not exist, so nothing here is a
 * fake link. ⚠ DIRECTION.md conflict #3 decides where these eventually point; the
 * homepage treatment is identical either way.
 */
export const icons = [
  { no: "ICON NO. 01", slug: "rambler-x-westbound-102", credit: "RAMBLER × WESTBOUND" },
  { no: "ICON NO. 02", slug: "a7402373-edit" },
  { no: "ICON NO. 03", slug: "denim-daze-13", credit: "DENIM DAZE" },
  { no: "ICON NO. 04", slug: "photo-28-07-2026-14-16-26-73" },
  { no: "ICON NO. 05", slug: "first-light-13", credit: "FIRST LIGHT" },
  { no: "ICON NO. 06", slug: "a7402383" },
] as const;

export const iconsIntro = {
  eyebrow: "AN OUTWEST ORIGINAL",
  lines: ["THE ICONS"],
  lead: "The people who make things here, photographed properly.",
} as const;

/**
 * ⚠ TAYLOR SCHIERS is a real individual's name published as a work credit. Normal for a
 * portfolio, but it needs the same clearance pass as the commercial claims.
 */
export const work = [
  // SIX, not ten. This is a teaser that links to the full portfolio, and the argument it
  // makes is RANGE — six registers and two colour worlds make it as well as ten did, in
  // 40% less page. Dropped frames were the nearest neighbours of ones kept: a second boot
  // detail, a second product shot, a second business portrait, a second denim full-length.
  { slug: "rambler-x-westbound-097", credit: "RAMBLER × WESTBOUND", kind: "Fashion editorial", width: "w-full", align: "start", column: 0 },
  { slug: "denim-daze-49", credit: "DENIM DAZE", kind: "Fashion editorial", width: "w-[72%]", align: "end", column: 0 },
  { slug: "dsc-9456", kind: "Product", width: "w-[86%]", align: "start", column: 0 },
  { slug: "taylor-schiers-118", credit: "TAYLOR SCHIERS", kind: "Brand campaign", width: "w-full", align: "start", column: 1 },
  { slug: "rambler-x-westbound-052", credit: "RAMBLER × WESTBOUND", kind: "Fashion editorial", width: "w-[78%]", align: "end", column: 1 },
  { slug: "dsc-9509", kind: "Detail", width: "w-[60%]", align: "start", column: 1 },
] as const;

export const madeOutWest = {
  eyebrow: "SELECTED WORK",
  lines: ["MADE OUT WEST"],
  lead: "Different photographers. Different brands. Different aesthetics. That is the point.",
  action: { label: "SEE EVERYTHING MADE OUT WEST", href: "/made-out-west" },
} as const;

/**
 * NO PRICES. docs/REFERENCES.md pattern 7 settles that pricing does not appear on the
 * homepage at all. The emotional sell lives here; the maths lives on the membership page.
 */
export const tiers = [
  { no: "TIER NO. 01", name: "CREATOR", lead: "for the photographer building a year-round business", copy: "Studio days when you need them, at a rate you can plan a year around instead of a season.", href: "/the-collective#creator" },
  { no: "TIER NO. 02", name: "BRAND BUILDER", lead: "for the brand that needs content constantly", copy: "A standing place to make campaigns, product and social — without booking around someone else's calendar.", href: "/the-collective#brand-builder" },
  { no: "TIER NO. 03", name: "STUDIO PARTNER", lead: "for the studio that wants a second home", copy: "Priority on the house, room for your team, and a seat at what gets made here.", href: "/the-collective#studio-partner" },
] as const;

export const collective = {
  eyebrow: "THE OUTWEST COLLECTIVE",
  lines: ["MAKE THIS", "YOUR CREATIVE", "HOME BASE."],
  action: { label: "JOIN THE COLLECTIVE", href: "/the-collective" },
} as const;

export const booking = {
  lines: ["YOUR HOUSE FOR THE HOUR.", "OR THE WHOLE DAY."],
  action: { label: "CHECK AVAILABILITY", href: "/book" },
} as const;

export const yucca = {
  place: "OUTWEST",
  location: "BOISE, IDAHO",
} as const;

export const closer = {
  lines: ["WHAT WILL", "YOU MAKE", "OUT WEST?"],
  action: { label: "BOOK OUTWEST", href: "/book" },
  slug: "photo-07-08-2025-11-08-00-34",
} as const;

export const footer = {
  address: ["OutWest Creative House", "Boise, Idaho"],
  columns: [
    { title: "THE HOUSE", links: [ { label: "The Warehouse", href: "/the-house/warehouse" }, { label: "The Villa", href: "/the-house/villa" }, { label: "The Creative Lounge", href: "/the-house/lounge" } ] },
    { title: "THE WORK", links: [ { label: "Made Out West", href: "/made-out-west" }, { label: "The Icons", href: "/the-icons" } ] },
    { title: "JOIN", links: [ { label: "The Collective", href: "/the-collective" }, { label: "Book the house", href: "/book" }, { label: "About", href: "/about" } ] },
  ],
} as const;
