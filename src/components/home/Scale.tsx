import { Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { book, claims } from "@/content/home";

/**
 * Beat 05 — the scale moment, and the only Olive surface on the site. Spending the single
 * dark-warm ground on the commercial beat is what makes the sell read as part of the house
 * rather than as a sales section; a second Olive anywhere quietly costs this one its weight.
 *
 * ZERO PHOTOGRAPHS, and not because the right frame has not arrived yet. A photograph set
 * under a claim about square footage has to carry a scale reference or it argues against
 * the number — and the library's nearest candidates are tabletop still lifes with no
 * architecture in them at all. The beat is a claim: a photograph dilutes it, and the wrong
 * photograph refutes it. This stays correct whatever photography arrives later.
 *
 * THE PACING IS THE DESIGN. The figure wipes up from its baseline as one mass over 1100ms
 * — something being built rather than something appearing — while everything beneath it
 * waits out the standard 90ms stagger. For roughly a second the numeral is alone on an
 * olive field. Cutting that hold to make the section "feel faster" removes the only thing
 * the section does.
 *
 * Every colour here comes from the tone tokens. River Clay measures 1.76:1 on Olive, so it
 * must never appear on this ground — as text or as a hairline — and reading the tokens
 * instead of naming a colour is what keeps that true without anyone having to remember it.
 */
export function Scale() {
  return (
    <Surface tone="olive" rhythm="vast">
      {/*
       * Set by hand rather than through Statement: Statement hard-codes `rise` for display
       * type, and this figure is the page's one exception. The values are its `numeral`
       * ramp — tracking pulled IN, because a four-character number at this size needs less
       * air between glyphs, not more, and tabular-nums so the comma and three zeros set
       * evenly.
       *
       * `pb-[0.1em]` is NOT spacing — it is what stops the figure being sliced. `wipe`
       * leaves clip-path: inset(0 0 0 0) on the wrapper permanently, which clips to the
       * border box, and Abril's figures are OLD-STYLE: `5` drops 0.178em below the
       * baseline (measured, 182/1024 upem). leading-[0.85] puts the baseline at 0.745em
       * inside an 0.85em box, so the tail of the 5 lands at 0.923em and gets cut flat —
       * 21px at the 18rem cap. The padding grows the clip's reference box to contain the
       * descender. It is on the <p>, where 1em is the clamped display size; on the Reveal
       * wrapper an em would resolve against the inherited 16px and do almost nothing.
       * Anything that changes `leading` here has to re-measure this.
       */}
      <Reveal gesture="wipe" i={0}>
        <p className="font-display font-light text-center text-[clamp(4.5rem,24vw,18rem)] leading-[0.85] tracking-[var(--tracking-numeral)] tabular-nums pb-[0.1em] text-on-ground">
          {claims.squareFeet}
        </p>
      </Reveal>

      <Reveal gesture="rise" i={1} className="mt-8">
        <p className="eyebrow text-center text-on-ground-dim">{claims.squareFeetCaption}</p>
      </Reveal>

      <Reveal gesture="rise" i={2} className="mt-12">
        <p className="paragraph-header mx-auto max-w-[34ch] text-center text-[clamp(1.05rem,1.6vw,1.375rem)] text-on-ground">
          {claims.scaleLead}
        </p>
      </Reveal>

      {/*
       * A TextLink, never a filled control — the one filled control on the site is BOOK in
       * the Masthead. `book` is the site's canonical booking CTA, so the destination can
       * never drift out of step with the nav.
       *
       * text-center is what centres it: TextLink is inline-flex, which is inline-level.
       */}
      <Reveal gesture="rise" i={3} className="mt-10 text-center">
        <TextLink href={book.href}>{book.label}</TextLink>
      </Reveal>
    </Surface>
  );
}
