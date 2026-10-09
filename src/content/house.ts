/**
 * THE HOUSE — /the-house and its three space pages. Every string and slug on those routes.
 *
 * Each space's name, line, copy and href stay in `spaces` in ./home.ts — that is the one
 * source the homepage, the shoots index and these pages all read, so a renamed space is a
 * one-line change. This file adds only what the inner pages need on top.
 *
 * ⚠ DRAFT COPY — every `body` below was written during the build and has not had the owner
 * pass. It describes only what the photographs show (white brick, concrete, plaster,
 * terracotta, velvet, bouclé); it states no capacity, amenity or price.
 *
 * ⚠ SPACE ASSIGNMENT IS INFERRED. The October 2026 drop arrived without a note saying which
 * room each frame is in. They are filed here by what is visible — white brick and concrete →
 * Warehouse; plaster, olive and terracotta → Villa; upholstered seating in window light →
 * Lounge — and that needs one confirmation pass with the owner.
 */

import { shoots, spaces } from "./home";

export type SpaceKey = "warehouse" | "villa" | "lounge";

export const houseIntro = {
  eyebrow: "THE HOUSE",
  lines: ["ONE HOUSE.", "THREE WORLDS."],
  lead: "Three distinct spaces under one roof, each with its own light, materials and mood.",
  body: "Move from a white-brick warehouse to a sun-washed villa to a lounge full of velvet and bouclé without packing the car. Every booking takes the whole house, so the next look is always one room away.",
  band: "a7502394",
  explore: "EXPLORE",
  bestFor: "BEST FOR",
} as const;

export const details = {
  eyebrow: "THE DETAILS",
  lines: ["PLASTER. WOOD.", "LINEN. LIGHT."],
  lead: "The house is made of materials that photograph well, and lit by windows that change the room by the hour.",
  frames: [
    { slug: "a7502867", width: "md:col-span-5" },
    { slug: "a7500704-2", width: "md:col-span-3 md:mt-32" },
    { slug: "a7502833", width: "md:col-span-4 md:mt-12" },
  ],
} as const;

export const houseClose = {
  eyebrow: "EVERY BOOKING IS PRIVATE",
  lines: ["THE WHOLE HOUSE.", "JUST YOURS."],
  action: { label: "BOOK THE HOUSE", href: "/book" },
} as const;

/**
 * Per-space page content. `name` must match an entry in `spaces` exactly.
 *
 *   portrait — the frame beside the title (LCP)
 *   band     — the full-bleed frame under the header
 *   card     — the frame on the /the-house index; `detail` is its smaller companion
 *   gallery  — the run of frames lower on the page, in reading order
 */
export const spacePages = [
  {
    key: "warehouse",
    name: "THE WAREHOUSE",
    portrait: "dsc-9267",
    portraitFocal: "50% 40%",
    band: "a7502505",
    card: "dsc-9270",
    detail: "a7502393",
    body: [
      "The biggest room in the house and the most adaptable. White brick, polished concrete, a full cyc wall and high open ceilings — room to build a set, light it properly, and still keep the crew and the client monitor out of frame.",
      "Pull a chair into the middle of the floor or clear it entirely. It is the space that most often turns into something else.",
    ],
    gallery: [
      { slug: "a7502389" },
      { slug: "rambler-x-westbound-102", credit: "RAMBLER × WESTBOUND", kind: "Fashion editorial" },
      { slug: "a7502421" },
      { slug: "photo-28-07-2026-14-49-17-38", kind: "Portrait" },
      { slug: "photo-07-08-2025-11-37-24-99" },
      { slug: "a7502393" },
      { slug: "dsc-9394", kind: "Product" },
      { slug: "photo-28-07-2026-14-16-31-69" },
    ],
  },
  {
    key: "villa",
    name: "THE VILLA",
    portrait: "a7502873",
    band: "a7500768",
    card: "a7502831",
    detail: "a7502875",
    body: [
      "Sun-bleached plaster, arched niches, terracotta underfoot and olive trees in stone. The Villa is built around its light, which moves across the walls all afternoon and throws the long shadows that make a frame look like it was made somewhere far warmer.",
      "It is where portraits go when they want warmth, and where a brand shoot goes when it wants to feel like a trip.",
    ],
    gallery: [
      { slug: "dsc-8431", kind: "Portrait" },
      { slug: "a7500749" },
      { slug: "dsc-9123", kind: "Portrait" },
      { slug: "a7500748" },
      { slug: "a7500743" },
      { slug: "dsc-8936", kind: "Portrait" },
      { slug: "dsc-8996", kind: "Portrait" },
      { slug: "a7500703-2" },
    ],
  },
  {
    key: "lounge",
    name: "THE CREATIVE LOUNGE",
    portrait: "a7502859",
    band: "a7502846",
    card: "a7502869",
    detail: "a7502855",
    body: [
      "Velvet, bouclé, brass and linen — a room that looks lived in, because it is. The Lounge is where crews regroup, clients settle in, and the plan for the next frame gets better.",
      "It photographs as well as it hosts: low furniture, raking window light and enough texture to carry a lifestyle or product set on its own.",
    ],
    gallery: [
      { slug: "first-light-17", credit: "FIRST LIGHT", kind: "Editorial portraits" },
      { slug: "a7500819" },
      { slug: "a7502837" },
      { slug: "dscf0005", kind: "Portrait" },
      { slug: "a7502848" },
      { slug: "a7500774" },
      { slug: "first-light-38", credit: "FIRST LIGHT", kind: "Editorial portraits" },
      { slug: "a7502861" },
    ],
  },
] as const satisfies readonly {
  key: SpaceKey;
  name: string;
  portrait: string;
  portraitFocal?: string;
  band: string;
  card: string;
  detail: string;
  body: readonly string[];
  gallery: readonly { slug: string; credit?: string; kind?: string }[];
}[];

/**
 * One space with everything the pages need: the shared homepage entry, this file's page
 * content, and the shoots whose `where` names it. Throws on a name mismatch so a renamed
 * space fails the build instead of rendering a page with no title.
 */
export function resolveSpace(key: SpaceKey) {
  const page = spacePages.find((p) => p.key === key);
  const space = spaces.find((s) => s.name === page?.name);
  if (!page || !space) throw new Error(`No space "${key}" in content/house.ts + content/home.ts.`);
  const madeFor = shoots.filter((shoot) => (shoot.where as readonly string[]).includes(space.name));
  return { ...space, ...page, madeFor };
}

export const allSpaces = spacePages.map((p) => resolveSpace(p.key));

export const spacePage = {
  inside: "INSIDE",
  madeFor: "MADE FOR",
  madeForLead: "The shoots people most often bring to this room.",
  otherRooms: "THE REST OF THE HOUSE",
  action: { label: "BOOK THE HOUSE", href: "/book" },
} as const;
