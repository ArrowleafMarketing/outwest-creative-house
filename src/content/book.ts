/**
 * BOOK — /book. Every string on the page and every label in the inquiry form.
 *
 * ⚠ DRAFT COPY. The steps describe a generic enquire → confirm → shoot flow; confirm the
 * real process (deposits, minimums, how far ahead) with the owner before launch. Nothing
 * here states a price, a minimum or a capacity, and that should stay true until the owner
 * supplies them — that's the Peerspace-density information docs/REFERENCES.md says lives
 * on this page, and it is the biggest content gap left on the site.
 *
 * ⚠ "A WALKTHROUGH OF THE HOUSE" assumes the owner offers visits. Remove the option if not.
 */
import { booking, claims, shoots, tiers } from "./home";

export const bookIntro = {
  eyebrow: "BOOK THE HOUSE",
  lines: booking.lines,
  lead: "Tell us what you're making and when. We'll come back with availability and everything you need to plan the day.",
  slug: "a7500862",
  focal: "30% 50%",
} as const;

export const howItWorks = "HOW IT WORKS";

export const steps = [
  {
    no: "01",
    title: "TELL US THE IDEA",
    copy: "The shoot, the date, roughly how long, and who's coming. A sentence is plenty to start.",
  },
  {
    no: "02",
    title: "WE CONFIRM THE DAY",
    copy: "We reply with availability, which rooms suit the work, and anything worth knowing before you arrive.",
  },
  {
    no: "03",
    title: "THE HOUSE IS YOURS",
    copy: "Arrive, set up, make the thing. Nobody else is booked in while you're here.",
  },
] as const;

export const privateClaim = claims.privateBooking;

/** `value` is what lands in the inquiry and what `?for=` preselects. */
export const inquiryOptions = [
  ...shoots.map((s) => ({ value: `shoot-${s.no}`, label: s.name })),
  { value: "membership", label: "MEMBERSHIP — NOT SURE WHICH TIER" },
  ...tiers.map((t) => ({
    value: `membership-${t.href.split("#")[1]}`,
    label: `MEMBERSHIP — ${t.name}`,
  })),
  { value: "walkthrough", label: "A WALKTHROUGH OF THE HOUSE" },
  { value: "other", label: "SOMETHING ELSE" },
] as const;

/** Deep link into the form with the request type already chosen. */
export function inquiryHref(value: string) {
  return `/book?for=${encodeURIComponent(value)}#inquiry`;
}

export const form = {
  eyebrow: "THE INQUIRY",
  heading: "START HERE",
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone (optional)",
    for: "What are you planning?",
    forPlaceholder: "Choose one",
    spaces: "Which rooms? (optional)",
    date: "Preferred date (optional)",
    length: "How long?",
    message: "Tell us about it",
    messageHint: "The idea, the team, anything we should know.",
  },
  lengths: ["A FEW HOURS", "HALF DAY", "FULL DAY", "NOT SURE YET"],
  submit: "SEND INQUIRY",
  sending: "SENDING…",
  sent: {
    heading: "THANK YOU.",
    body: "Your inquiry is with us. We'll be in touch soon to talk dates and details.",
  },
  errors: {
    name: "Please tell us your name.",
    email: "Please enter an email address we can reply to.",
    for: "Please choose what you're planning.",
    general: "Something went wrong sending that. Please try again in a moment.",
  },
} as const;

export const bookRooms = {
  eyebrow: "STILL DECIDING?",
  lines: ["SEE THE ROOMS."],
} as const;
