type Split = "4/8" | "5/7" | "6/6" | "7/5" | "8/4";

type SpreadProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  split?: Split;
  align?: "start" | "center" | "end" | "baseline";
  /** Drops the right column 7rem on md+ — enough that nothing lines up across the
   *  gutter, without spending a viewport on the offset. A no-op below md. */
  stagger?: boolean;
  gap?: "hair" | "gutter" | "wide";
  bleed?: "none" | "left" | "right";
  className?: string;
};

const GAP = {
  hair: "gap-px",
  gutter: "gap-6 md:gap-[4vw]",
  wide: "gap-12 md:gap-[7vw]",
} as const;

const ALIGN = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
} as const;

const SPAN: Record<Split, [string, string]> = {
  "4/8": ["md:col-span-4", "md:col-span-8"],
  "5/7": ["md:col-span-5", "md:col-span-7"],
  "6/6": ["md:col-span-6", "md:col-span-6"],
  "7/5": ["md:col-span-7", "md:col-span-5"],
  "8/4": ["md:col-span-8", "md:col-span-4"],
};

/**
 * The 12-column editorial measure. Two slots at a named split, with an optional vertical
 * offset that drops the second column — the magazine rhythm achieved by layout rather
 * than by differential scroll, so it costs no motion budget and is identical under
 * prefers-reduced-motion.
 *
 * BELOW md the grid is one column and the slots stack in SOURCE ORDER, so every caller
 * must put the slot that should read first on mobile into `left`.
 */
export function Spread({
  left,
  right,
  split = "6/6",
  align = "start",
  stagger,
  gap = "gutter",
  bleed = "none",
  className,
}: SpreadProps) {
  const [l, r] = SPAN[split];
  // -5vw exactly cancels Surface's gutter at every viewport size, because Surface has no
  // max-width. Below md a bleeding slot runs to both edges, which is correct for a
  // stacked plate on a phone.
  const bleedLeft = bleed === "left" ? "-mx-4 md:-ms-[5vw] md:me-0" : "";
  const bleedRight = bleed === "right" ? "-mx-4 md:-me-[5vw] md:ms-0" : "";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 ${GAP[gap]} ${ALIGN[align]} ${className ?? ""}`}
    >
      <div className={`${l} ${bleedLeft}`}>{left}</div>
      <div className={`${r} ${bleedRight} ${stagger ? "md:mt-[7rem]" : ""}`}>{right}</div>
    </div>
  );
}
