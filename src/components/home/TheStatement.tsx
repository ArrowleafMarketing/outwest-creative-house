import { Surface, TextLink } from "@/components/editorial";
import { Drift } from "@/components/motion/Drift";
import { Reveal } from "@/components/motion/Reveal";
import { statement } from "@/content/home";

/**
 * Beat 02 — the statement. Zero photographs, and zero yucca, deliberately.
 *
 * NO YUCCA HERE. The mark appears exactly twice on this page: beat 11, whose entire
 * purpose is its arrival, and tiny in the footer. A watermark in this beat would spend
 * that arrival nine beats early and leave beat 11 carrying a reprise.
 *
 * This is the beat that proves the type system can hold a full screen alone — which is
 * what buys the page the restraint to show thirty photographs as an edit rather than as
 * inventory. It should stay empty even when the photography becomes abundant.
 */
export function TheStatement() {
  // Composed here rather than passed to Statement as `lines` because exactly one line —
  // the last — needs a wrapper of its own. Read as a list rather than destructured to
  // [first, second] so that a third line added in @/content/home renders instead of
  // silently vanishing; the drift stays on whichever line lands last.
  const lines = statement.lines;
  const last = lines.length - 1;

  return (
    <Surface tone="paper" rhythm="vast">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Indented one column and stopped short of the last two: the display type wants
            an asymmetric field, not a centred one. Full width inside the 16px gutter on a
            phone, where colossal's 12vw floor keeps "REMEMBER" wrapping rather than
            overflowing. */}
        <div className="md:col-span-9 md:col-start-2">
          <Reveal gesture="rise" i={0}>
            <h2 className="font-display text-[clamp(2.5rem,12vw,11rem)] leading-[0.92] font-light tracking-display uppercase">
              {/* The last line drifts 32px across the scroll against lines that do not
                  move. At this scale it is barely conscious — and it means the brief's
                  "type moves slightly against photography" lands first in a beat with no
                  photography at all, where the type moves against itself. Symmetric about
                  zero, so engines without view() timelines simply get the mid-scroll
                  position. The 1rem amplitude is exactly the phone gutter (px-4), so the
                  drifted block travels to the viewport edge and never past it. */}
              {lines.map((line, idx) =>
                idx === last ? (
                  <Drift
                    key={line}
                    as="span"
                    x={["-1rem", "1rem"]}
                    className="display-line block"
                  >
                    {line}
                  </Drift>
                ) : (
                  <span key={line} className="display-line block">
                    {line}
                  </span>
                ),
              )}
            </h2>
          </Reveal>

          <Reveal gesture="rise" i={1}>
            <p className="paragraph-header mt-16 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.375rem)] text-on-ground md:mt-24">
              {statement.body}
            </p>
          </Reveal>

          <Reveal gesture="rise" i={2}>
            <div className="mt-10">
              <TextLink href={statement.action.href}>
                {statement.action.label}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Surface>
  );
}
