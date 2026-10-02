type DriftProps = {
  as?: "div" | "span";
  /**
   * AUTHOR EVERY RANGE SYMMETRIC ABOUT ZERO — ["1.5rem", "-1.5rem"], never ["0", "-3rem"].
   *
   * Where scroll-driven timelines are unsupported the untransformed element sits at
   * exactly its mid-scroll position, so the page loses its counter-movement and still
   * looks composed rather than broken. That is the one rule that makes the support gap
   * survivable, and it is nearly free.
   */
  x?: [string, string];
  y?: [string, string];
  className?: string;
  children: React.ReactNode;
};

/**
 * The entire continuous-motion layer. A server component: it emits no JavaScript at all,
 * no scroll listener, and runs off the compositor. See motion.css for the rule.
 *
 * Composes with Reveal on the same element — Reveal animates translate/scale/clip-path,
 * Drift animates transform, so they never overwrite each other.
 *
 * When wrapping an image, the image must sit inside an overflow-hidden frame at
 * scale(1.04) so a ±1.5rem translate can never expose an edge. Plate provides the frame;
 * the caller adds the scale with `[&_img]:scale-[1.04]`.
 */
export function Drift({ as: As = "div", x, y, className, children }: DriftProps) {
  return (
    <As
      data-drift
      className={className}
      style={
        {
          "--from-x": x?.[0],
          "--to-x": x?.[1],
          "--from-y": y?.[0],
          "--to-y": y?.[1],
        } as React.CSSProperties
      }
    >
      {children}
    </As>
  );
}
