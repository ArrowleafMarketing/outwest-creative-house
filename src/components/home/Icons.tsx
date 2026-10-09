import { Plate, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { icons, iconsIntro } from "@/content/home";

/**
 * ⚠ CONTENT GAP, deliberately left as a gap.
 *
 * The spec asks the three credit-less frames to print "Coming soon" where a series credit
 * would go — three real credits alternating with three not-yet reads as the index of an
 * issue in progress. That string is not exported from src/content/home.ts and has no near
 * equivalent there, and a section file may not put page copy of its own on the page. So
 * those three plates print their number alone until the copy exists.
 *
 * TO CLOSE IT: add `comingSoon` to `iconsIntro` in src/content/home.ts (or a `kind` on the
 * three entries with no `credit` — a7402373-edit, photo-28-07-2026-14-16-26-73, a7402383),
 * then pass it through as Plate's `kind` below. Do NOT resurrect it as a constant here.
 *
 * What must never happen instead is a fabricated series name — "STUDIO PORTRAITS", "ON THE
 * CYC" — for a frame whose metadata.ts entry has no `series`. A missing caption line is
 * honest; an invented one is the single failure this beat exists to avoid.
 */

/**
 * The rail's named scroll-progress timeline, declared on the scroller and read by the
 * progress thumb beneath it.
 *
 * NAMED rather than anonymous, deliberately. `scroll(nearest inline)` resolves only from
 * a descendant of the scroller, and the thumb is a sibling of it — a plate row with an
 * indicator inside it would scroll away with the plates. `timeline-scope` on the wrapper
 * then guarantees the name resolves regardless of how sibling lookup is ordered.
 */
const RAIL_TIMELINE = "--icons-rail";

/**
 * The rendered width of one plate at each breakpoint, which is the whole reason `sizes`
 * has no default: 72vw on a phone, 34vw once two fit, 23vw once the row reads as a row.
 */
const SIZES = "(min-width: 1024px) 23vw, (min-width: 640px) 34vw, 72vw";

/**
 * Beat 07 — THE ICONS, and the only Ink surface on the page. Entered as a hard cut: a
 * fade between two grounds is a gradient, and this brand does not do gradients. River Clay
 * measures 6.27:1 here against 2.79:1 on Alabaster, so this is the one surface where the
 * dim token is genuinely readable — the payoff for making it tone-dependent rather than
 * one fixed colour.
 *
 * THIS IS WHERE PORTRAIT DOMINANCE PAYS THE PAGE BACK. All six frames sit at 2:3, and a
 * sideways rail of true 2:3 portraits is the one layout that wants precisely what this
 * library has: nothing is cropped, at any breakpoint.
 *
 * NOTHING HERE IS FABRICATED. The ICONS profiles do not exist yet, so every plate is a
 * <figure> and no entry carries an href — there is not one fake link on this page. Where
 * metadata.ts has a real `series` the caption prints it as a genuine credit; where it does
 * not, the caption says so. No person's name appears in this beat either: a series credit
 * on client work is normal, but the same string under "ICON NO. 04" would publish a real
 * individual as a branded editorial property she has not been cleared as.
 *
 * The rail is native overflow-x — no pinned section, no scroll-jacking, no JavaScript.
 * Horizontal movement the reader drives, not movement done to the reader.
 */
export function Icons() {
  // Static by design: nothing on this page runs JavaScript, so the figure cannot count up
  // as you scroll — the progress rule beside it carries the position instead. Derived from
  // the content so the format can never drift out of step with the plate captions.
  const counter = `${icons[0].no.replace("ICON ", "")} / ${String(icons.length).padStart(2, "0")}`;

  return (
    <Surface id="the-icons" tone="ink" rhythm="vast">
      {/*
       * Hard left, with the right two columns left empty — the air is what makes an
       * eleven-rem serif on black read as a title page rather than as a banner.
       */}
      <div className="md:w-10/12">
        <Reveal gesture="rise" i={0}>
          <p className="eyebrow text-on-ground-dim">{iconsIntro.eyebrow}</p>
        </Reveal>

        {/*
         * Set by hand rather than through <Statement>, which hard-codes `rise` for every
         * display line. This title wipes: a large serif on black uncovered by a rising
         * edge is the beat's whole tone, and a fade would make it arrive rather than be
         * revealed. The values below are Statement's own `colossal` ramp, copied rather
         * than reinvented so the beat still sets at the same size as the other six.
         */}
        <h2 className="mt-5 font-display text-[clamp(2.5rem,12vw,11rem)] leading-[0.92] font-light tracking-display uppercase">
          {iconsIntro.lines.map((line, i) => (
            <Reveal key={line} gesture="wipe" i={i + 1} as="span" className="block">
              <span className="display-line block">{line}</span>
            </Reveal>
          ))}
        </h2>
      </div>

      <div className="mt-16 md:mt-24" style={{ timelineScope: RAIL_TIMELINE } as React.CSSProperties}>
        {/*
         * tabIndex is not decoration. The spec for the rail assumes the plates are
         * focusable so Tab scrolls it natively — but this beat deliberately has no links
         * in it, so nothing inside the scroller can take focus and a keyboard user would
         * be locked out of five of the six frames. A named, focusable region is the
         * standard answer and costs nothing.
         *
         * `.rail` (motion.css) carries the snap axis, the hidden scrollbar, the edge mask
         * and the 8rem end padding that stops a transform opening a gap at maximum
         * scrollLeft. The negative margins let it run to the true viewport edge; because
         * Surface has no max-width, -5vw cancels the gutter exactly at every size.
         */}
        {/* rail-frame is unmasked and carries the focus ring (see motion.css): the
            scroller's own ring has its ends erased by the edge mask. */}
        <div className="rail-frame -mx-4 md:-mx-[5vw]">
        <div
          role="region"
          aria-label={iconsIntro.lines[0]}
          tabIndex={0}
          className="rail overflow-x-auto [scroll-padding-inline-start:1rem] focus-visible:outline-none md:[scroll-padding-inline-start:5vw]"
          style={
            {
              scrollTimelineName: RAIL_TIMELINE,
              scrollTimelineAxis: "inline",
            } as React.CSSProperties
          }
        >
          <ul className="flex gap-6 px-4 md:gap-8 md:px-[5vw]">
            {icons.map((entry, i) => {
              // Entries without a series in metadata.ts simply have no `credit` key, so
              // this cannot accidentally print an empty credit line — and no `kind` is
              // passed, because the only honest string for those three is not yet in
              // home.ts. See the CONTENT GAP note at the top of this file.
              const credit = "credit" in entry ? entry.credit : undefined;

              return (
                <li
                  key={entry.slug}
                  // 72vw on a phone so the second plate is visibly clipped at the right
                  // edge. That clipping is the only affordance telling you the row
                  // continues — a rail that fits exactly reads as a finished grid.
                  className="w-[72vw] shrink-0 [scroll-snap-align:start] sm:w-[34vw] lg:w-[23vw]"
                >
                  <Plate
                    slug={entry.slug}
                    ratio="native"
                    sizes={SIZES}
                    index={entry.no}
                    credit={credit}
                    // Alternating, so each frame moves against its neighbours.
                    drift={i % 2 === 0 ? "down" : "up"}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        </div>

        <div className="mt-6 flex items-center gap-6 md:mt-8">
          {/*
           * Reading order puts the figure first; entrance order does not. Structure
           * precedes content everywhere on this page, so the rule draws at i=0 and the
           * figure rises against it at i=1 even though it sits to its left.
           */}
          <Reveal gesture="rise" i={1} as="span" className="eyebrow shrink-0 text-on-ground-dim">
            {counter}
          </Reveal>

          <Reveal
            gesture="draw"
            i={0}
            as="span"
            className="relative block h-px flex-1 overflow-hidden bg-rule"
          >
            {/*
             * A travelling segment rather than a growing fill, and the fallback is the
             * reason. This borrows `ow-drift` — the only keyframe the motion system
             * defines, and a translate, which is exactly what a thumb needs — because a
             * section file may not add one to motion.css. That keyframe is declared inside
             * `@supports (animation-timeline: view())` AND `prefers-reduced-motion:
             * no-preference`, so it is gated correctly for free: where scroll timelines
             * are unsupported, or motion is declined, the name does not resolve, no
             * animation runs, and the segment rests at the left at one sixth of the
             * track — which is precisely what the static counter beside it already says.
             *
             * ⚠ This is the one thing on the page that depends on a keyframe by name from
             * outside motion.css. Renaming `ow-drift` breaks it silently.
             *
             * No `animation` shorthand: it resets animation-timeline, and reversing two
             * lines would kill this with no error and no warning.
             */}
            <span
              className="absolute inset-y-0 left-0 block bg-on-ground"
              style={
                {
                  width: `${100 / icons.length}%`,
                  "--from-x": "0%",
                  "--to-x": `${(icons.length - 1) * 100}%`,
                  animationName: "ow-drift",
                  animationTimingFunction: "linear",
                  animationFillMode: "both",
                  animationTimeline: RAIL_TIMELINE,
                } as React.CSSProperties
              }
            />
          </Reveal>
        </div>
      </div>
    </Surface>
  );
}
