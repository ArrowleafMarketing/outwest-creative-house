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
  { label: "MADE OUTWEST", href: "/made-outwest" },
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
  /**
   * The cover collage, back to front. `lead` is the large frame and the LCP image; `cross`
   * overlaps its lower-left corner; `detail` is pinned small at the bottom right. Two people
   * and one room, so the first screen says light, people and place at once.
   */
  frames: {
    lead: "dsc-8936",
    cross: "rambler-x-westbound-094",
    detail: "a7502873",
  },
} as const;

export const statement = {
  lines: ["MAKE THEM", "REMEMBER YOU."],
  body: "OutWest is a 5,000-square-foot creative house built for photographers, filmmakers, creators, entrepreneurs and brands making work worth remembering.",
  action: { label: "DISCOVER OUTWEST", href: "#the-house" },
} as const;

export const manifesto = {
  eyebrow: "WELCOME OUTWEST",
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

/**
 * ⚠ DRAFT COPY — every `lead` and `copy` below was written during the build and has not
 * been through the owner pass. None of it states a price, a capacity or an amenity the
 * house has not already claimed elsewhere on this page; keep it that way when editing.
 *
 * `where` names entries in `spaces` by their exact `name`, so a renamed space has to be
 * renamed here too. The pairings are suggestions, not a booking rule — confirm with the
 * owner.
 *
 * FRAMES. Family, couples and weddings show the house EMPTY, because the library has no
 * family, couple or wedding work in it yet. An unpeopled room claims nothing; a fashion
 * frame filed under WEDDINGS & BRIDAL would claim a wedding that never happened. Swap the
 * slug the day real work arrives. `focal` is the object-position for the 4:5 crop.
 */
export const shootsIntro = {
  eyebrow: "BRING THE WORK",
  lines: ["WHAT ARE YOU", "SHOOTING FOR?"],
  lead: "Nine reasons people book the house. Pick yours and see how it comes together here.",
  where: "WHERE IT HAPPENS",
  next: "NEXT",
  action: { label: "BOOK THIS SHOOT", href: "/book" },
} as const;

export const shoots = [
  {
    no: "01",
    name: "TEAM BUILDING SHOOTS",
    lead: "Bring the whole crew. Leave with photos everyone actually likes.",
    copy: "Headshots, group frames and the unplanned ones in between. Room for the whole team to spread out, change outfits and keep the energy up — it ends up feeling more like an outing than an appointment.",
    where: ["THE WAREHOUSE", "THE CREATIVE LOUNGE"],
    slug: "dsc-8740",
    focal: "50% 30%",
  },
  {
    no: "02",
    name: "FAMILY & MOTHERHOOD",
    lead: "The season you'll want to remember exactly as it was.",
    copy: "Maternity, newborn and family sessions in soft natural light, with comfortable corners to settle into between frames and space for little ones to wander.",
    where: ["THE VILLA", "THE CREATIVE LOUNGE"],
    slug: "a7500862",
    focal: "38% 50%",
  },
  {
    no: "03",
    name: "PORTRAITS & MILESTONES",
    lead: "Graduations, birthdays, new chapters — the frames that mark a year.",
    copy: "Seniors, headshots, anniversaries and the portrait you've been meaning to make for years. A clean sweep for something timeless, plaster and olive trees for something warmer.",
    where: ["THE WAREHOUSE", "THE VILLA"],
    slug: "dsc-9070",
    focal: "50% 25%",
  },
  {
    no: "04",
    name: "BRANDING & CONTENT",
    lead: "Content for the months ahead, made in a single booking.",
    copy: "Founders, creators and small teams build the library their brand runs on — headshots, lifestyle, social and web — across three distinct sets without ever changing locations.",
    where: ["THE WAREHOUSE", "THE VILLA", "THE CREATIVE LOUNGE"],
    slug: "dscf3201",
    focal: "50% 30%",
  },
  {
    no: "05",
    name: "COUPLES & ENGAGEMENTS",
    lead: "Two people, good light, and nowhere else to be.",
    copy: "Engagements, anniversaries and save-the-dates, unhurried and out of the weather, with enough variety in the house that it never looks like one backdrop.",
    where: ["THE VILLA", "THE CREATIVE LOUNGE"],
    slug: "a7500769",
    focal: "34% 50%",
  },
  {
    no: "06",
    name: "VIDEO & CAMPAIGN PRODUCTION",
    lead: "Room for the crew, the gear and the second take.",
    copy: "Brand films, commercials, music videos and full campaign days. A cyc wall, high ceilings and enough floor to build a set, light it properly and still keep hair, makeup and the client monitor out of frame.",
    where: ["THE WAREHOUSE"],
    slug: "photo-07-08-2025-11-37-24-99",
    focal: "38% 50%",
  },
  {
    no: "07",
    name: "COMMERCIAL & PRODUCT",
    lead: "Make the product the most interesting thing in the room.",
    copy: "Tabletop, e-commerce, packaging and lifestyle product work — from clean white sweeps to styled sets with texture and hard window light.",
    where: ["THE WAREHOUSE", "THE VILLA"],
    slug: "dsc-9456",
    focal: "50% 40%",
  },
  {
    no: "08",
    name: "WEDDINGS & BRIDAL",
    lead: "The quiet hour before the day begins — or the portraits after.",
    copy: "Bridal portraits, getting-ready coverage, elopements and styled shoots. The Villa's plaster arches and olive trees read like somewhere else entirely, without leaving Boise.",
    where: ["THE VILLA"],
    slug: "a7500748",
    focal: "50% 50%",
  },
  {
    no: "09",
    name: "CREATIVE PROJECTS",
    lead: "The idea that doesn't fit a category. Bring it anyway.",
    copy: "Editorials, fashion, personal work, test shoots and the concept you've been sketching for months. If it needs light, room and a little nerve, it belongs here.",
    where: ["THE WAREHOUSE", "THE VILLA", "THE CREATIVE LOUNGE"],
    slug: "rambler-x-westbound-097",
    credit: "RAMBLER × WESTBOUND",
    focal: "55% 50%",
  },
] as const;

export const madeOutWest = {
  eyebrow: "SELECTED WORK",
  lines: ["MADE OUTWEST"],
  lead: "Different photographers. Different brands. Different aesthetics. That is the point.",
  action: { label: "SEE EVERYTHING MADE OUTWEST", href: "/made-outwest" },
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
  lines: ["WHAT WILL", "YOU MAKE", "OUTWEST?"],
  action: { label: "BOOK OUTWEST", href: "/book" },
  slug: "photo-07-08-2025-11-08-00-34",
} as const;

export const footer = {
  address: ["OutWest Creative House", "Boise, Idaho"],
  columns: [
    { title: "THE HOUSE", links: [ { label: "The Warehouse", href: "/the-house/warehouse" }, { label: "The Villa", href: "/the-house/villa" }, { label: "The Creative Lounge", href: "/the-house/lounge" } ] },
    { title: "THE WORK", links: [ { label: "Made OutWest", href: "/made-outwest" }, { label: "The Icons", href: "/the-icons" } ] },
    { title: "JOIN", links: [ { label: "The Collective", href: "/the-collective" }, { label: "Book the house", href: "/book" }, { label: "About", href: "/about" } ] },
  ],
} as const;
