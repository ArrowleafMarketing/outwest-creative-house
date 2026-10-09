import { Plate, Spread, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { collective, tiers } from "@/content/home";

/**
 * ⚠ THE ONLY LITERAL IN THIS FILE, and it is not a choice.
 *
 * src/content/home.ts exports this beat's eyebrow, display lines and action but no
 * photograph, and that file was out of scope for this build. The slug belongs in the
 * `collective` export beside the copy it stands next to — that is what keeps a frame swap
 * a one-file diff instead of a hunt through the section tree. No other exported slug is
 * free; every one of them already belongs to another beat.
 *
 * "dsc-8658" is not invented: it is what src/photos/metadata.ts already records as three
 * women gathered around a chair, laughing — category person, tag group, nothing seasonal.
 * It is the only frame in the library that is unmistakably about people liking each other,
 * which is the entire emotional sell of a collective, so this beat is not waiting on any
 * incoming shoot. Designated substitute if the client objects: "dscf2069", the
 * black-and-white group of three on a settee.
 *
 * This is the same treatment Manifesto.tsx gives its own slug gap.
 */
const PLATE_SLUG = "dsc-8658";

/**
 * ~40vw on md and up. Measured, not guessed, because `gap="wide"` is what a guess gets
 * wrong: Spread's grid is twelve tracks with an md gap of 7vw, so the eleven gaps eat
 * 77vw of the 90vw Surface and the five-column slot is 5 tracks + 4 gaps ≈ 33vw. The
 * left bleed cancels the 5vw gutter and hands ~38vw back. 40vw rounds up from that, the
 * same few points of headroom TheHouse.tsx leaves on its own slots.
 *
 * Below md the plate bleeds to both viewport edges, hence 100vw.
 */
const SIZES_PLATE = "(min-width: 768px) 40vw, 100vw";

/**
 * Beat 09 — membership, on Canvas. The palette's second ground reads as plaster after
 * paper, and it is what separates this beat from the Alabaster ones on either side.
 * (The spec calls this Canvas's first appearance; it is not — YuccaMoment.tsx is Canvas
 * too, and Icons is ink and Scale is olive. Nothing here depends on that claim, but the
 * next person reading it should not trust it either.)
 *
 * THE TIERS ARE AN INDEX, NOT CARDS. Three cards read as a pricing table however they
 * are styled, and docs/REFERENCES.md pattern 7 settles that pricing does not appear on
 * the homepage at all — the emotional sell lives here and the maths lives on the
 * membership page. A hairline-ruled row carries the same information without the retail
 * grammar, and it absorbs a fourth tier, or a `price` field, with no layout change. Three
 * cards would not.
 *
 * MOBILE: Spread stacks in source order, so the plate is deliberately the `left` slot.
 * The photograph is the emotional argument in this beat and it has to land before the
 * words, which is the reverse of the manifesto's ordering and correct for the same reason.
 *
 * MOTION IS A TYPESETTER'S ORDER: the statement rises, the rules draw left to right, then
 * each row's content rises behind its own rule. The structure is ruled before it is
 * filled. Nothing in the index drifts — these rows are information, and information
 * should hold still.
 *
 * Every colour here is a tone token. Canvas needs a heavier rule mix than Alabaster to
 * read at the same weight, and River Clay is unusable as text on it at 2.23:1 — both
 * facts live in the tone block in globals.css, so no section has to remember either.
 */
export function Collective() {
  return (
    <Surface id="the-collective" tone="canvas" rhythm="vast">
      <Spread
        split="5/7"
        align="center"
        gap="wide"
        bleed="left"
        // Vertical drift only: the plate bleeds to the left edge, where sideways travel
        // would open a gap.
        left={<Plate slug={PLATE_SLUG} ratio="native" sizes={SIZES_PLATE} drift="down" />}
        right={
          /*
           * ⚠ NO BODY COPY. The spec calls for a paragraph under these lines — the one
           * written straight out of the Emma persona, about seasonal work making for a
           * hard year — but src/content/home.ts exports no body or lead for `collective`
           * and prose is not something a section file may invent. One field in the
           * `collective` export fills this with no change here.
           */
          <Statement
            eyebrow={collective.eyebrow}
            lines={collective.lines}
            size="lg"
            as="h2"
            measure="normal"
          />
        }
      />

      <div className="mt-24 md:mt-32">
        {tiers.map((tier, i) => (
          <div key={tier.no}>
            {/*
             * The rules are elements, not `border-t`. `draw` is a scaleX transform and a
             * border cannot carry one, so a bordered row would be the only hairline on
             * the page that simply appears. With motion off the element paints as a
             * plain 1px rule and nothing is lost.
             */}
            <Reveal gesture="draw" i={i} className="h-px w-full bg-rule" />

            {/*
             * `group` on the row, not on the link: hovering anywhere along a ruled row
             * grows the entry's underline, which is what makes the row read as one target
             * instead of four columns with a link stuck on one end.
             *
             * ⚠ THE ENTRY NUMBER IS THE LINK, and the spec's fifth "LEARN MORE" cell is
             * gone. Two reasons, and the first is not negotiable:
             *
             *   1. "LEARN MORE" is authored prose and `tiers` exports no verb, so writing
             *      it here would put an unreviewed string on the page from a section file
             *      — the same call TheHouse.tsx makes about its own "EXPLORE" label. The
             *      nearest exported label for this link is the entry's own handle.
             *   2. The spec's `md:col-span-1 md:justify-self-end` is 43px at the md
             *      breakpoint. Any label overflows it, and with justify-self:end the
             *      overflow runs LEFT, into tier.copy. Four cells at 3/3/3/3 fit at every
             *      width instead, and an index whose number is its link is the plainer
             *      device anyway.
             *
             * `variant="rule"` drops the arrow: an eyebrow-tracked number plus an arrow is
             * the one thing that would not fit the cell at md.
             *
             * WHEN home.ts GROWS A `tierAction`: restore the trailing cell at
             * md:col-span-2 and take that column back off this one. Better still, give
             * `tiers` a per-entry action label — three links reading "TIER NO. 01/02/03"
             * are distinguishable but not descriptive, and three reading "LEARN MORE"
             * would have been neither.
             */}
            <Reveal
              gesture="rise"
              i={i + 1}
              className="group grid grid-cols-1 items-baseline gap-4 py-8 md:grid-cols-12 md:py-10"
            >
              {/* The visible label stays the plate number, which is the design. The
                  accessible name carries the tier, because three links reading only
                  "TIER NO. 01/02/03" fail WCAG 2.4.4 — in a screen reader's link list
                  they are three bare numbers with no purpose. */}
              <TextLink
                href={tier.href}
                variant="rule"
                className="md:col-span-3"
                aria-label={`${tier.name} membership`}
              >
                {tier.no}
              </TextLink>
              <h3 className="font-display text-2xl uppercase tracking-display md:col-span-3">
                {tier.name}
              </h3>
              <p className="paragraph-header text-on-ground md:col-span-3">{tier.lead}</p>
              <p className="font-sans text-sm leading-[1.7] text-on-ground-dim md:col-span-3">
                {tier.copy}
              </p>
            </Reveal>
          </div>
        ))}

        {/* The index is closed as well as opened — an open-ended last row reads as a list
            that got cut off rather than as a set of three. */}
        <Reveal gesture="draw" i={tiers.length} className="h-px w-full bg-rule" />
      </div>

      {/*
       * One section-level action, into the page where the maths lives. A TextLink, never
       * a filled control — the site's single filled control is BOOK in the Masthead.
       * text-center is what centres it: TextLink is inline-flex, which is inline-level.
       */}
      <Reveal gesture="rise" className="mt-16 text-center">
        <TextLink href={collective.action.href} size="lg">
          {collective.action.label}
        </TextLink>
      </Reveal>
    </Surface>
  );
}
