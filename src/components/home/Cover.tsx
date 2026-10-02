import { Logo } from "@/components/brand";
import { Plate, Spread, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { cover } from "@/content/home";

/**
 * GAP — src/content/home.ts exports no slug for the cover frame, though every other
 * beat's slugs live there. It belongs in `cover` as `slug: "dsc-9333"`; it sits here only
 * because this file may not edit that one. Move it and delete this constant.
 */
const COVER_SLUG = "dsc-9333";

/**
 * Assembled from the cover's own copy rather than written out a second time, so the
 * house's name has exactly one source on the page.
 */
const HOUSE_NAME = `${cover.lines.join(" ")} ${cover.sub}`;

/**
 * Beat 01.
 *
 * There is no film, and a slow pan across a still is a fake film that looks like a fake
 * film — so the house opens the other way a fashion house opens: a cover. One wordmark,
 * one frame, one action. A full-bleed still would also pre-burn the frame beat 04 needs.
 *
 * dsc-9333 earns the slot because directional light as a graphic element is the brand's
 * signature device and this frame carries its own hard cast shadow, with no props to date
 * it. At native ratio in a half-width column it crops essentially nothing, which is the
 * whole reason for opening this way rather than with a cropped landscape band.
 *
 * LCP — this plate is the LCP element. `eager` compiles to loading="eager" +
 * fetchPriority="high" rather than Next 16's `preload`, because the LCP candidate varies
 * by viewport here. `settle` is scale-only with no opacity change, so the image is fully
 * painted at t=0.
 *
 * No scroll chevron anywhere: beat 02's reveal does that job more quietly.
 */
export function Cover() {
  /**
   * The hairline and the single action. Rendered TWICE, in two responsive wrappers, and
   * that is deliberate — it is the only way one Spread can satisfy both compositions:
   *
   *   md+    it belongs inside the left column, under the wordmark, so the whole text
   *          block centres against the plate and the action stays on the first screen.
   *   <md    the grid is one column in SOURCE ORDER, so anything in `left` lands above
   *          the plate. A phone that meets the call to action before it meets a frame has
   *          been handed an explanation, not a cover — so on a phone it renders after.
   *
   * Only one copy is ever in the accessibility tree: `hidden` is display:none, so the
   * other is removed outright rather than duplicated to a screen reader.
   */
  const enter = (
    <>
      {/* Structure precedes content: the hairline draws, then the line it carries rises. */}
      <Reveal gesture="draw" i={2} className="h-px w-full bg-rule" />
      <Reveal gesture="rise" i={3} className="mt-6 flex items-baseline justify-between gap-6">
        <span className="eyebrow text-on-ground-dim">{cover.location}</span>
        <TextLink href={cover.action.href}>{cover.action.label}</TextLink>
      </Reveal>
    </>
  );

  return (
    <Surface
      tone="paper"
      rhythm="flush"
      // h-[100svh] with the bar's height subtracted, not min-h-[100svh] beneath it. The
      // masthead is sticky and therefore IN FLOW, so a 100svh cover plus an 89px bar is
      // 989px of hero in a 900px viewport and the single call to action falls below the
      // fold. Capping the plate keeps the type and the CTA together above it.
      className="flex items-center pt-20 pb-12 md:max-h-[100svh] md:min-h-[calc(100svh-5.5rem)] md:pt-24 md:pb-16"
    >
      <Spread
        split="6/6"
        align="center"
        gap="wide"
        bleed="right"
        left={
          <>
            {/* The page's only h1. The mark carries the accessible name, so the heading
                has text without printing the wordmark twice. */}
            <Reveal gesture="rise" i={0}>
              <h1>
                <Logo
                  mark="wordmark"
                  title={HOUSE_NAME}
                  className="w-full max-w-[34rem] text-on-ground"
                />
              </h1>
            </Reveal>
            <Reveal as="p" gesture="rise" i={1} className="eyebrow text-on-ground-dim mt-6">
              {cover.sub}
            </Reveal>
            <div className="hidden md:mt-24 md:block">{enter}</div>
          </>
        }
        right={
          <Plate
            slug={COVER_SLUG}
            // ~46vw on md+: a col-span-6 of a 12-column grid inside the 90vw gutter, plus
            // the 5vw the right bleed reclaims. 50vw is the nearest honest overshoot —
            // never under-state the width of the LCP image. Below md the bleed runs the
            // frame to both edges, so it really is 100vw.
            sizes="(min-width: 768px) 50vw, 100vw"
            eager
            reveal="settle"
            // NO `rail`. The spec asks for "OUTWEST — NO. 01", which exists nowhere in
            // src/content/home.ts, and an edition number is exactly the kind of thing that
            // must not be invented. The nearest exported string, `yucca.place`, is another
            // beat's place label and would set the word OUTWEST vertically beside the
            // OUTWEST wordmark. Add `rail` to `cover` in the content file to restore it.
            //
            // The cap sits on the img, not on the figure: the figure's height is content
            // driven, so a max-height there has nothing for `h-full` to resolve against
            // and the frame simply overflows. Capping the img's own height against its
            // definite width is what lets object-cover take the crop — and it stays a
            // maximum, so a shorter viewport is left alone.
            className="md:[&_img]:max-h-[68svh] md:[&_img]:object-cover md:[&_img]:object-[50%_22%]"
          />
        }
      />

      <div className="mt-14 md:hidden">{enter}</div>

      {/*
        Masthead observes this 1px line to know it has cleared the cover — an
        IntersectionObserver, not a scroll listener and not a scroll-driven animation, so
        the bar acquires its background in every engine. Remove this and the nav is
        alabaster type on an alabaster ground for the entire page below the hero, with
        nothing thrown and nothing logged. The id is the contract: Masthead must watch
        this exact string.
      */}
      <div id="cover-sentinel" data-cover-sentinel aria-hidden className="h-px" />
    </Surface>
  );
}
