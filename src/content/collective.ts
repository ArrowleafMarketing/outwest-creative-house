/**
 * THE COLLECTIVE — /the-collective, the membership page.
 *
 * Tier names, numbers, leads and copy stay in `tiers` in ./home.ts so the homepage index
 * and this page can never disagree. The `id`s here are the anchors the homepage already
 * links to (/the-collective#creator etc.) — they are read off the tier hrefs, not retyped.
 *
 * ⚠ NO PRICES, NO INCLUSIONS. The owner has not supplied rates, hours or member benefits,
 * so every tier ends in a conversation rather than a number. The four pillars below come
 * straight from BRAND.md ("membership, education, community, and events") and the mission
 * statement; they describe what membership is FOR, not what any tier includes. When real
 * tier details arrive they slot into `TierDetail` in the page as a ruled list.
 *
 * ⚠ DRAFT COPY — everything not inherited from home.ts. `builtFor` lines are written from
 * the three personas in BRAND.md (Emma, Rachel, Lauren).
 */
import { collective, tiers } from "./home";

export const collectiveIntro = {
  eyebrow: collective.eyebrow,
  lines: collective.lines,
  lead: "Membership for the people who would rather build a year here than book a day.",
  body: "A standing place to make work, learn the business side of it, and be around people doing the same — planned around your calendar instead of squeezed into someone else's.",
  slug: "dscf2069",
  band: "photo-28-07-2026-14-16-31-69",
} as const;

export const pillars = {
  eyebrow: "WHAT MEMBERSHIP MEANS",
  lines: ["MORE THAN", "STUDIO TIME."],
  entries: [
    {
      no: "01",
      title: "THE HOUSE",
      lead: "Three spaces, on a rhythm you can plan around.",
      copy: "Regular time in the Warehouse, the Villa and the Lounge — enough to build a year of work, not just the next session.",
    },
    {
      no: "02",
      title: "EDUCATION",
      lead: "The business side, taught properly.",
      copy: "How to package, price and sell creative work so it carries you through every season — the part most photographers are left to work out alone.",
    },
    {
      no: "03",
      title: "COMMUNITY",
      lead: "A room full of people who get it.",
      copy: "Referrals, collaborators, second shooters and friends. Creative work is less lonely when the people next door make it too.",
    },
    {
      no: "04",
      title: "EVENTS",
      lead: "Gatherings in the house, members first.",
      copy: "Workshops, shoot days and evenings that bring the collective into one room.",
    },
  ],
} as const;

export const tierExtras = {
  "TIER NO. 01": { slug: "dsc-8635", focal: "50% 30%", builtFor: "Photographers turning a side business into a year-round one." },
  "TIER NO. 02": { slug: "dscf3201", focal: "50% 25%", builtFor: "Founders and small teams who need fresh content every month." },
  "TIER NO. 03": { slug: "dsc-9292", focal: "50% 50%", builtFor: "Established photographers and studios who want several looks under one roof." },
} as const;

export const tierPage = {
  label: "Membership tiers",
  builtFor: "BUILT FOR",
  pricing: "Rates and details are shared on enquiry while membership opens.",
  ask: "ASK ABOUT",
};

export const collectiveTiers = tiers.map((tier) => ({
  ...tier,
  ...tierExtras[tier.no],
  id: tier.href.split("#")[1],
}));

export const collectiveClose = {
  eyebrow: collective.eyebrow,
  lines: ["COME MAKE", "SOMETHING HERE."],
  action: { label: collective.action.label, value: "membership" },
} as const;
