import { Plate, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { booking, claims } from "@/content/home";

/**
 * ⚠ GAP — this slug belongs in `booking` in src/content/home.ts, next to its lines and
 * its action, the way `closer.slug` already sits beside `closer.lines`. It is here only
 * because that file is owned by another pass and every section file is a one-file diff.
 * Moving it is one line in each file; until then a photography swap touches a component.
 */
const BAND_SLUG = "a7500738-2";

/**
 * Beat 10 — booking. Alabaster returns after the dark beat, and the whole section is one
 * claim set as a pull quote.
 *
 * NO PRICING, no hourly rate, no capacity table, no FAQ. The card density that belongs in
 * a marketplace listing belongs deep in the booking flow, not on the page that decides
 * whether someone wants the house at all.
 *
 * THE TWO RULES DRAW OUTWARD FROM CENTRE, and this is the only `origin="center"` on the
 * page. It is spent here because this is the single most quotable sentence on the site —
 * a second use anywhere turns a gesture into a pattern and this beat loses its emphasis.
 *
 * ⚠ `claims.privateBooking` is the page's most prominent sentence and docs/DIRECTION.md
 * flags it as a commercial claim. If the owner confirmation pass rewrites it, the line
 * breaking of a set pull quote has to be redrawn — that is a design pass, not a copy edit.
 */
export function Booking() {
  return (
    <>
      <Surface tone="paper" rhythm="vast">
        <Statement size="xl" as="h2" lines={booking.lines} />

        {/* Rule, quote, rule — structure first, so the frame is drawn before the sentence
            it holds arrives. This is the one place on the page where Preztik Light Italic
            genuinely earns its place rather than merely being allowed. */}
        <div className="mt-16 md:mt-20">
          <Reveal gesture="draw" origin="center" i={0} className="h-px w-full bg-rule" />

          {/* Indented one column of twelve above md: a pull quote hung off the measure
              reads as a quotation, whereas flush left it reads as another paragraph.
              THE INDENT SITS ON THE WRAPPER, NOT ON THE <p>: under the border-box
              preflight a `ps` on the same element as `max-w-[46ch]` is subtracted from
              the measure, so the quote would set at ~39ch above md — narrower than the
              lead paragraphs it is meant to out-weigh. Split, the measure is a true
              46ch and the indent is still one twelfth. */}
          <Reveal gesture="rise" i={1} className="md:ps-[8.333%]">
            <p className="paragraph-header max-w-[46ch] py-8 text-[clamp(1.25rem,2.6vw,2rem)] text-on-ground">
              {claims.privateBooking}
            </p>
          </Reveal>

          <Reveal gesture="draw" origin="center" i={2} className="h-px w-full bg-rule" />
        </div>

        {/* A TextLink, never a filled control. The `book` destination travels with the
            copy so the CTA can never drift out of step with the Masthead. */}
        <Reveal gesture="rise" i={3} className="mt-12">
          <TextLink href={booking.action.href}>{booking.action.label}</TextLink>
        </Reveal>
      </Surface>

      {/*
       * A flush, gutterless sibling Surface — there is no Bleed primitive, a band is its
       * own ground.
       *
       * WHY THIS FRAME, AND WHY NOT UNDER THE SQUARE FOOTAGE: it is the only true
       * letterbox in the library (2048×860), so `native` crops nothing at all. It is a
       * plaster table and an olive tree with a long shadow behind it — the wrong picture
       * for floor area, the right one for privacy: the house, empty, nobody else in it.
       *
       * On a phone its native 2.381 makes a thin strip, which is correct. It reads as a
       * rule of light rather than as a photograph, and needs no art-directed alternate.
       *
       * If a genuinely wide architectural interior ever arrives it drops into this same
       * slot and the beat gets MORE letterbox, not less.
       */}
      <Surface tone="paper" rhythm="flush" gutter={false}>
        <Plate slug={BAND_SLUG} ratio="native" sizes="100vw" reveal="wipe" />
      </Surface>
    </>
  );
}
