import { Logo } from "@/components/brand";
import { Plate, Spread, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { cover } from "@/content/home";

/**
 * Assembled from the cover's own copy rather than written out a second time, so the
 * house's name has exactly one source on the page.
 */
const HOUSE_NAME = `${cover.lines.join(" ")} ${cover.sub}`;

/**
 * The right half of the cover: three frames overlapping like prints laid on a table.
 *
 * The box is a fixed 10:11 and every frame is placed in percentages of it, so the
 * composition scales as one object instead of re-flowing. Above md its WIDTH is derived from
 * the viewport height (67svh × 10/11 ≈ 74svh tall), so the collage and the wordmark's single
 * action always share the first screen.
 *
 *   lead    60% wide, top right, hard against the bled edge. The LCP image: eager, `settle`.
 *   cross   60% wide, crossing the lead's lower-left corner — the overlap is the gesture.
 *   detail  26% wide, pinned bottom right over the lead's foot.
 *
 * The overlapping frames sit on a ground-coloured mat (padding in bg-ground) rather than a
 * shadow: the brand has no drop shadows, and a paper border is how prints actually overlap.
 * Every frame drifts VERTICALLY only — the lead and, on a phone, the cross touch a viewport
 * edge, and sideways travel there would scroll the page horizontally.
 *
 * The overlapping frames are `anchored`: only the image pans, inside a frame that holds
 * still. A travelling frame slides within its mat, so the cutout would read thick on one
 * side and thin on the other — the mat has to be the same width on every edge, always.
 */
const MAT = "bg-ground p-2 md:p-3";

function CoverCollage() {
  return (
    <div className="relative aspect-[10/11] w-full md:ms-auto md:w-[min(100%,67svh)]">
      <div className="absolute right-0 top-0 w-[60%]">
        <Plate
          slug={cover.frames.lead}
          // 60% of a ~50vw column on md+; 60% of the full width below it.
          sizes="(min-width: 768px) 32vw, 62vw"
          eager
          reveal="settle"
          drift="down"
          anchored
        />
      </div>

      <Reveal gesture="wipe" i={2} className="absolute bottom-[14%] left-0 z-10 w-[60%]">
        <div className={MAT}>
          <Plate slug={cover.frames.cross} sizes="(min-width: 768px) 32vw, 62vw" drift="up" anchored />
        </div>
      </Reveal>

      <Reveal gesture="wipe" i={3} className="absolute bottom-0 right-[4%] z-20 w-[26%]">
        <div className={MAT}>
          <Plate slug={cover.frames.detail} sizes="(min-width: 768px) 14vw, 28vw" drift="down" anchored />
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Beat 01.
 *
 * There is no film, and a slow pan across a still is a fake film that looks like a fake
 * film — so the house opens the other way a fashion house opens: a cover. One wordmark,
 * one collage, one action. A full-bleed still would also pre-burn the frame beat 04 needs.
 *
 * The collage (above) leads with hard sun and an olive shadow on plaster — directional
 * light as a graphic element, the brand's signature — then crosses it with western through
 * a fashion lens, and pins a plaster niche at the foot. Light, people, place.
 *
 * LCP — the collage's lead plate is the LCP element. `eager` compiles to loading="eager" +
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
        right={<CoverCollage />}
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
