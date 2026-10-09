/**
 * THE ICONS — /the-icons.
 *
 * The first six entries are the homepage's `icons`, in the same order, so ICON NO. 01 is
 * the same frame everywhere. The page then continues the series.
 *
 * Same rules as the homepage beat: NO PERSON'S NAME on an Icon (a series credit is fine; a
 * name under "ICON NO. 07" would publish a real individual as an editorial property she has
 * not been cleared for), no invented series, and no hrefs — the profiles do not exist yet.
 *
 * ⚠ DRAFT COPY — `body`, `status` and the closing lines were written during the build.
 * ⚠ docs/DIRECTION.md conflict #3 (THE ICONS vs The OutWest Edit) is still open; nothing on
 * this page mentions the Edit, so either answer leaves it correct.
 */
import { icons, iconsIntro } from "./home";

export const iconsPage = {
  eyebrow: iconsIntro.eyebrow,
  lines: iconsIntro.lines,
  lead: iconsIntro.lead,
  body: "An ongoing portrait series of the photographers, founders, makers and artists who work in the house — shot with the same care they bring to their own clients' work.",
  status: "Profile coming soon",
  indexLabel: "THE SERIES SO FAR",
} as const;

export const allIcons = [
  ...icons,
  { no: "ICON NO. 07", slug: "dsc-9333" },
  { no: "ICON NO. 08", slug: "denim-daze-77", credit: "DENIM DAZE" },
  { no: "ICON NO. 09", slug: "first-light-09", credit: "FIRST LIGHT" },
  { no: "ICON NO. 10", slug: "dscf5779" },
  { no: "ICON NO. 11", slug: "a7402189-2" },
  { no: "ICON NO. 12", slug: "photo-28-07-2026-15-01-11-79" },
] as const;

export const iconsClose = {
  eyebrow: iconsIntro.eyebrow,
  lines: ["THE NEXT ICON", "IS PROBABLY", "ALREADY BOOKED."],
  lead: "Make something here. The series is drawn from the people who do.",
  action: { label: "BOOK THE HOUSE", href: "/book" },
} as const;
