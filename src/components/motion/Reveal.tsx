"use client";

import { useEffect, useRef } from "react";

/**
 * The gesture set. FOUR, and adding a fifth means widening this type — which is the
 * review checkpoint, and the point.
 *
 * The first time someone adds a 700ms variant "because this section needed it", the page
 * stops feeling scored and starts feeling animated. The loss is diffuse enough that
 * nobody will be able to name what changed.
 */
export type Gesture = "rise" | "wipe" | "settle" | "draw" | "none";

type RevealProps = {
  as?: "div" | "figure" | "figcaption" | "span" | "li" | "p";
  gesture?: Gesture;
  /** Stagger index. Capped at 4 internally, so no tail exceeds 360ms. */
  i?: number;
  axis?: "x" | "y";
  origin?: "left" | "center";
  className?: string;
  /** Optional: a hairline rule reveals with no content of its own. */
  children?: React.ReactNode;
};

/** One observer for the whole app, created lazily. */
let io: IntersectionObserver | null = null;
function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-revealed", "");
        io!.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  return io;
}

/**
 * Flips one attribute and does nothing else — every line of actual animation is CSS.
 * Reveals once and unobserves; nothing ever re-hides, because re-triggering is the tell
 * of cheap scroll animation.
 *
 * Takes children, so every section using it stays a server component: the children render
 * on the server and pass through the RSC payload.
 */
export function Reveal({
  as: As = "div",
  gesture = "rise",
  i = 0,
  axis,
  origin,
  className,
  children,
  ...rest
}: RevealProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (gesture === "none") return;
    const el = ref.current;
    if (!el) return;
    // No motion flag → the hidden pre-states in motion.css do not apply, so there is
    // nothing to reveal and observing would be pure cost.
    if (document.documentElement.getAttribute("data-motion") !== "on") return;
    const obs = observer();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [gesture]);

  return (
    <As
      // @ts-expect-error — one ref type across the element union
      ref={ref}
      data-gesture={gesture}
      data-axis={axis}
      data-origin={origin}
      style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
      className={className}
      {...rest}
    >
      {children}
    </As>
  );
}
