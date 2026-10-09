/**
 * MADE OUT WEST — /made-out-west, the full portfolio.
 *
 * Organised by shoot rather than by category, because a series is how the work was made
 * and how a client will recognise it. Each series' frames are read live from
 * src/photos/metadata.ts by its exact `series` value, so a new frame tagged into a series
 * appears here with no edit to this file.
 *
 * NO YEARS AND NO INVENTED CLIENTS. `kind` is a truthful descriptor of the frames, never a
 * claimed brief. Uncredited work lives in AROUND THE HOUSE with a plain kind and no credit.
 *
 * ⚠ TAYLOR SCHIERS is a real individual's name published as a work credit — the same
 * clearance flag as in ./home.ts.
 * ⚠ "Editorial portraits" for FIRST LIGHT describes the frames; confirm the shoot's real
 * framing with the owner.
 */
import { closer, madeOutWest } from "./home";

export const workIntro = {
  eyebrow: madeOutWest.eyebrow,
  lines: madeOutWest.lines,
  lead: madeOutWest.lead,
  body: "Campaigns, editorials, portraits and product work, made in the house by the photographers and brands who book it.",
  indexLabel: "THE SHOOTS",
} as const;

export const series = [
  { id: "rambler-x-westbound", series: "Rambler x Westbound", name: "RAMBLER × WESTBOUND", kind: "Fashion editorial", line: "Western through a fashion lens." },
  { id: "denim-daze", series: "Denim Daze", name: "DENIM DAZE", kind: "Fashion editorial", line: "Faded denim, terracotta and a woven sun." },
  { id: "taylor-schiers", series: "Taylor Schiers", name: "TAYLOR SCHIERS", kind: "Brand campaign", line: "Sharp tailoring, in motion." },
  { id: "first-light", series: "First Light", name: "FIRST LIGHT", kind: "Editorial portraits", line: "Dappled light and deep shadow." },
] as const;

/** Holiday sets and behind-the-scenes frames are deliberately absent: neither is the work. */
export const aroundTheHouse = {
  id: "around-the-house",
  name: "AROUND THE HOUSE",
  line: "Portraits, product and the work in between.",
  items: [
    { slug: "dsc-9333", kind: "Portrait" },
    { slug: "dsc-9456", kind: "Product" },
    { slug: "dsc-8329", kind: "Portrait" },
    { slug: "dscf5779", kind: "Portrait" },
    { slug: "dsc-9365", kind: "Product" },
    { slug: "photo-28-07-2026-14-03-26-0", kind: "Portrait" },
    { slug: "dsc-9509", kind: "Detail" },
    { slug: "a7402373-edit", kind: "Portrait" },
    { slug: "dsc-9070", kind: "Portrait" },
    { slug: "dscf5969", kind: "Portrait" },
    { slug: "a7402481", kind: "Portrait" },
    { slug: "dsc-9321", kind: "Portrait" },
  ],
} as const;

export const workClose = {
  lines: closer.lines,
  action: closer.action,
} as const;
