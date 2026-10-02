export type Tone = "paper" | "canvas" | "olive" | "ink";
type Rhythm = "flush" | "tight" | "normal" | "vast";

type SurfaceProps = {
  id?: string;
  tone?: Tone;
  rhythm?: Rhythm;
  gutter?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Nine of the twelve beats asked for "vast". At 224px a side that was ~4,000px of padding
 * on its own, and a page where every section is maximally airy has no pacing at all —
 * contrast between rhythms is what reads as editorial. Trimmed roughly 40%; the ratios
 * between the four steps are unchanged, so the relative pacing the beats were designed
 * around still holds.
 */
const RHYTHM: Record<Rhythm, string> = {
  flush: "",
  tight: "py-10 md:py-14",
  normal: "py-14 md:py-24",
  vast: "py-20 md:py-32",
};

/**
 * The ground. Owns the tone tokens every descendant reads, the vertical rhythm, and the
 * side gutter. The page's whole tonal sequence lives in a dozen `tone` props and nowhere
 * else, so it is one grep away from being understood.
 *
 * NO max-width container, deliberately: the gutter is the only horizontal constraint and
 * type measure is capped in `ch` on Statement instead. That is what lets Spread's `bleed`
 * reach the true viewport edge with a plain negative margin, rather than a
 * calc(50% - 50vw) hack that breaks inside a grid child.
 *
 * A full-bleed band is its own Surface with gutter={false} rhythm="flush", placed as a
 * sibling. There is no Bleed primitive.
 */
export function Surface({
  id,
  tone = "paper",
  rhythm = "normal",
  gutter = true,
  label,
  className,
  children,
}: SurfaceProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      aria-label={label}
      className={`bg-ground text-on-ground ${RHYTHM[rhythm]} ${className ?? ""}`}
    >
      {gutter ? <div className="w-full px-4 md:px-[5vw]">{children}</div> : children}
    </section>
  );
}
