import { Illustration } from "@/components/brand";
import { Plate, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { yucca } from "@/content/home";

/**
 * GAP — src/content/home.ts exports `yucca` with both lines of copy but no slug for the
 * band they sit under, the way `closer` carries its own. It belongs in `yucca` as
 * `slug: "a7500704-2"`; it sits here only because this file may not edit that one. The
 * same gap is open in Booking, Collective, Cover, Manifesto and People, each of which
 * holds its slug in a module const for the same reason — so close them together rather
 * than one at a time.
 */
const PLASTER_SLUG = "a7500704-2";

/**
 * Beat 11 — the yucca moment. The held breath before the close, and the quietest screen
 * on the page.
 *
 * The brief wants the yucca embossed into limestone like a luxury leather stamp. The
 * library owns exactly one true material photograph and faking an emboss in CSS breaks an
 * explicit guardrail, so this beat puts the real mark on the real material and simulates
 * nothing: one flat Alabaster mask over photographed plaster, both of them real.
 *
 * WHY 2/1 IS THE ONE LEGITIMATE CROP ON A PAGE THAT OTHERWISE NEVER CROPS. a7500704-2 is
 * 1926×2048, and at 2:1 with the focal point at 72% the bowl leaves the frame entirely —
 * what remains is a field of cast plaster grain, a soft shadow gradient and one curved
 * edge. It stops being a photograph *of* something and becomes a surface, which is the
 * only place on this site where a photograph is used as material rather than as content.
 * Cropping an abstract texture removes a bowl, not a head — which is exactly why the
 * no-crop rule can stay absolute everywhere else.
 *
 * NO FAKE LETTERPRESS. A two-layer offset, a drop-shadow filter or any CSS shadow breaks
 * the guardrail, and at a 1px offset on a ~350px hand-drawn charcoal mark it reads as
 * anti-aliasing fuzz rather than as a deboss anyway: a real deboss reads through
 * directional shading, which a flat mask cannot produce. Honest flat mark, real material.
 *
 * MOTION — the band takes `settle` (scale only, 1600ms) while the mark rises at i=1 and
 * the two lines at i=2 and i=3, so the slowest gesture in the beat finishes last and the
 * yucca is never the first thing to land. No Drift anywhere in this beat; total stillness
 * is the point.
 *
 * ⚠ `settle` HERE IS THE THIRD USE, and motion.css reserves it for "LCP plate and the
 * closing frame only" — Cover and Closer. Flagging rather than quietly widening the
 * policy, but `wipe` is not available as the alternative: the mark is a sibling of the
 * Plate, not a child of it, so it sits outside the plate's clip-path. Under `wipe` the
 * yucca would rise into full view over a band that is still half uncovered, floating on
 * the section ground. `settle` paints the plaster from the first frame, which is the only
 * way an overlaid mark reads. Either motion.css's note widens to name this beat, or the
 * mark moves inside Plate — an owner call, and neither is this file's to make.
 *
 * THE YUCCA APPEARS TWICE ON THE PAGE: here, and tiny in the footer. Beat 02 was stripped
 * of its watermark specifically so this is a reveal rather than a diminished repeat of
 * something shown nine beats earlier. A third appearance costs this one its weight.
 *
 * ⚠ FLAG FOR THE CLIENT: this is the beat most blocked on photography — limewash,
 * limestone, leather and linen frames are all still open, and the design should say so in
 * review rather than be read as finished. If the plaster reads as a photograph rather
 * than as a surface, the fallback is ratio="native" with the bowl visible and the mark
 * beside it rather than over it: weaker than the brief wants, but never wrong.
 */
export function YuccaMoment() {
  return (
    <>
      {/* Two Surfaces, not one: the band needs gutter={false} rhythm="flush" and the
          lines need the gutter and their own rhythm. Both carry the same tone, so the
          ground is continuous and the seam is invisible — a full-bleed band is always its
          own Surface placed as a sibling, because there is no Bleed primitive. */}
      <Surface tone="canvas" rhythm="flush" gutter={false} className="relative">
        <Plate
          slug={PLASTER_SLUG}
          ratio="2/1"
          focal="50% 72%"
          // Edge to edge at every width, so the band never downloads more than it shows.
          sizes="100vw"
          // Scale-only, no opacity: the plaster is painted from the first frame and only
          // stops moving. An opacity fade here would announce the beat it is meant to hold.
          reveal="settle"
        />

        {/* The mark sits over a photograph, not over the section's ground, so no tone
            token describes it — text-on-ground on canvas is Ink, which is not the mark
            the brief asks for. Alabaster at 60% is named deliberately for that reason and
            is the one place on the page a colour is stated rather than inherited.
            pointer-events-none keeps the overlay out of the way of everything under it. */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <Reveal gesture="rise" i={1}>
            {/* Decorative: no `title`, so it is hidden from screen readers — the wordmark
                directly beneath already says OUTWEST in text. A mask element has no
                intrinsic size, so the width is explicit and the height follows the
                asset's ratio.

                THE WIDTH IS DERIVED, NOT CHOSEN, because the mark is portrait (687×1067,
                ratio 0.6445) and the band is landscape. Band height is 50vw at every
                width, since the plate is 2:1 and full-bleed. Holding the mark to ~72% of
                that gives a height budget of 36vw, so the width ceiling is
                36vw × 0.6445 ≈ 23vw — and 15.5rem is that same 72% expressed against the
                24rem height cap, which is where the mark stops growing and the band keeps
                going. The spec's `w-[46vw]` below md was a landscape number applied to a
                portrait mark: at 390px it resolves to 179px wide × 278px tall inside a
                195px band, so the yucca hung ~42px out of the photograph top and bottom,
                over the ground of the sections either side. One min() covers every width
                instead of a breakpoint, so there is no span where the sizing is inherited
                rather than stated. */}
            <Illustration name="yucca" className="w-[min(23vw,15.5rem)] text-alabaster/60" />
          </Reveal>
        </div>
      </Surface>

      <Surface tone="canvas" rhythm="tight">
        {/* Wordmark tracking rather than the eyebrow's — this is the house's name signed
            under its own mark, not a label.

            AS A STYLE, NOT A UTILITY, and this is a cascade fact rather than a taste:
            `.eyebrow` is declared unlayered in globals.css, while `@import "tailwindcss"`
            puts every utility inside `@layer utilities`. Unlayered author declarations
            beat layered ones, so `tracking-[var(--tracking-wordmark)]` on an `.eyebrow`
            element is silently dead — it loses to the `letter-spacing:
            var(--tracking-eyebrow)` inside the class, with no error and no warning. An
            inline style is the one place that outranks both. (Same trap is live in
            TextLink's size="body" branch, where `tracking-normal normal-case` cannot beat
            `.eyebrow` either; not this file's to fix.) */}
        <Reveal gesture="rise" i={2}>
          <p
            className="eyebrow text-on-ground text-center"
            style={{ letterSpacing: "var(--tracking-wordmark)" }}
          >
            {yucca.place}
          </p>
        </Reveal>

        <Reveal gesture="rise" i={3}>
          <p className="eyebrow text-on-ground-dim text-center mt-2">{yucca.location}</p>
        </Reveal>
      </Surface>
    </>
  );
}
