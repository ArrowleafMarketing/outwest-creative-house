import { Plate, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { closer } from "@/content/home";

/**
 * The band is its own Surface at gutter={false}, so the plate is genuinely edge to edge at
 * every viewport. Stated rather than guessed, because a full-bleed frame is exactly the
 * one a defaulted `sizes` ships at twice the pixels it needs.
 */
const SIZES_BAND = "100vw";

/**
 * Beat 12 — the last screen.
 *
 * ⚠ THE BEAT ASKED FOR A GOLDEN-HOUR EXTERIOR — someone walking out through the warehouse
 * doors as the light goes. There is no exterior, no doorway and no golden hour anywhere in
 * the 79 frames this library holds, and a warm gradient laid over an interior would be a
 * simulation of the one thing the brand sells. This frame is the closest TRUE answer:
 * movement, departure and the warmest light in the library, all of them real. It is the
 * single most asset-hungry beat on the page and the one to re-shoot first.
 *
 * TYPE ON THE GROUND, NOT OVER THE FRAME. The brand's rule is that type never fights the
 * image, and this frame's backdrop is a bright warm field with no reliably dark region — a
 * scrim that reached AA over it would have to be measured per frame and would flatten the
 * very light that makes the frame worth using. So the question gets the last word verbally
 * and the photograph gets it visually.
 *
 * THE CTA IS A TEXT LINK, at large scale and nothing more. BOOK in the Masthead stays the
 * only filled control on the site. Ending on restraint rather than on a button is the
 * whole argument of the brand, and this is the last place anyone would notice it being
 * given away.
 *
 * MOBILE: the headline sits at colossal's 12vw floor over the authored line breaks, each
 * of which may still wrap further rather than overflow; the band runs full width at its
 * native ratio, which needs no art direction and crops nothing.
 */
export function Closer() {
  return (
    <>
      <Surface tone="paper" rhythm="vast">
        <Statement size="colossal" as="h2" align="center" lines={closer.lines} />

        {/*
         * Not Statement's own `action`, which is eyebrow-sized and spaced for a beat that
         * has body copy above it. The index continues Statement's fixed entrance order
         * (eyebrow 0, lines 1..n, lead, body, action) so the closing link still lands last,
         * exactly as the action does in the other eleven beats.
         *
         * text-center is what centres it: TextLink is inline-flex, which is inline-level.
         */}
        <Reveal gesture="rise" i={closer.lines.length + 3} className="mt-14 text-center">
          <TextLink href={closer.action.href} size="lg">
            {closer.action.label}
          </TextLink>
        </Reveal>
      </Surface>

      <Surface tone="paper" rhythm="flush" gutter={false}>
        {/*
         * `settle` — the image scales 1.045→1 with no opacity change, so the figure appears
         * to keep walking as the frame lands. The photograph's own motion plus a slow scale
         * is the closest this library gets to film, and it costs nothing. A `wipe` here
         * would uncover a still; this one arrives.
         */}
        <Plate slug={closer.slug} ratio="native" sizes={SIZES_BAND} reveal="settle" />
      </Surface>
    </>
  );
}
