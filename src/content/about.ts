/**
 * ABOUT — /about.
 *
 * Built from the two documents the owner has signed off on in some form: the mission,
 * vision and yucca meaning from docs/BRAND.md, and the creative-house positioning and the
 * architecture × fashion × culture triad from docs/DIRECTION.md. Rewritten into the brand
 * voice (second person, short declaratives), not invented.
 *
 * ⚠ NO CONTACT DETAILS. There is no street address, email, phone or social handle anywhere
 * in the content, and an href must never be guessed. `visit` therefore routes to the inquiry
 * form. When the owner supplies them, add a `contact` block here and render it beside the
 * location — the footer has the same gap (see Footer.tsx).
 * ⚠ The walkthrough option assumes visits are offered — see ./book.ts.
 */
import { manifesto } from "./home";

export const aboutIntro = {
  eyebrow: "ABOUT OUTWEST",
  lines: ["A CREATIVE HOUSE", "IN BOISE, IDAHO."],
  lead: manifesto.lead,
  slug: "a7502421",
  focal: "52% 50%",
} as const;

export const aboutManifesto = {
  eyebrow: manifesto.eyebrow,
  lines: manifesto.lines,
  body: manifesto.body,
  slug: "dsc-9149",
} as const;

export const triad = {
  eyebrow: "WHAT WE'RE BUILDING",
  lines: ["ARCHITECTURE.", "FASHION.", "CULTURE."],
  lead: "Architecture without fashion is a boutique hotel. Fashion without architecture is a clothing brand. Without culture, both are beautiful and empty.",
  entries: [
    { no: "01", title: "ARCHITECTURE", lead: "Space, material, scale and light.", copy: "Plaster, brick, wood and stone, lit by windows that change the room by the hour. A house that looks like somewhere." },
    { no: "02", title: "FASHION", lead: "Editorial confidence.", copy: "Photography, styling and typography treated like a campaign — work made to be remembered, not just delivered." },
    { no: "03", title: "CULTURE", lead: "People, brands, collaborations.", copy: "The Icons, the Collective and everyone who books the house. The building matters; the work happening inside it is the story." },
  ],
} as const;

export const purpose = {
  mission: {
    eyebrow: "WHY WE BUILT IT",
    lead: "To be the studio and community where photographers and brands come together — and where photographers learn to build sustainable, year-round creative businesses.",
  },
  vision: {
    eyebrow: "WHERE WE'RE GOING",
    lead: "To be the name the Treasure Valley thinks of first: the brand headquarters photographers and brands reach for, and a place that helps the people who use it grow into full-time creative work.",
  },
} as const;

export const yuccaStory = {
  eyebrow: "THE YUCCA",
  lines: ["RESILIENCE.", "GROWTH.", "INDEPENDENCE."],
  lead: "Native to the landscapes that inspire OutWest, the yucca grows where little else will — and then, unexpectedly, it blooms.",
  body: "It is our mark for a brand built around making something beautiful, distinctive and enduring, and for the people who make their work here.",
  values: ["CREATIVITY", "GROWTH", "HUMAN TOUCH", "INSPIRATION", "ADAPTATION"],
} as const;

export const visit = {
  band: "a7502846",
  eyebrow: "BOISE, IDAHO",
  lines: ["COME SEE", "THE HOUSE."],
  action: { label: "PLAN A VISIT", value: "walkthrough" },
} as const;
