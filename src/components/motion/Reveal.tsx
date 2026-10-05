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

/** Longest a reveal will wait on its photographs before animating anyway. */
const MAX_IMAGE_WAIT = 1200;

function lazyImages(el: Element) {
  return el.querySelectorAll<HTMLImageElement>('img[loading="lazy"]');
}

/**
 * Native lazy-loading never fires for an image inside the wipe's pre-state: the browser
 * runs its own intersection check, and `clip-path: inset(0 0 100% 0)` collapses that to
 * zero area — so the fetch only began once the wipe started opening, and the blur
 * placeholder was what got uncovered. This observer does the browser's job instead,
 * flipping images to eager well before they reach the viewport.
 */
let preloadIo: IntersectionObserver | null = null;
function preloader() {
  if (preloadIo) return preloadIo;
  preloadIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        for (const img of lazyImages(e.target)) img.loading = "eager";
        preloadIo!.unobserve(e.target);
      }
    },
    { rootMargin: "150% 0px" },
  );
  return preloadIo;
}

/**
 * Resolves once every photograph in `el` has loaded and decoded, so the gesture never
 * uncovers a placeholder on a fast scroll or slow connection. Capped, so a stalled
 * request delays the reveal rather than cancelling it.
 */
function imagesReady(el: Element) {
  const pending = [...el.querySelectorAll("img")].filter((img) => !img.complete);
  if (pending.length === 0) return Promise.resolve();
  for (const img of pending) img.loading = "eager";
  return Promise.race([
    Promise.allSettled(pending.map((img) => img.decode())),
    new Promise((r) => setTimeout(r, MAX_IMAGE_WAIT)),
  ]);
}

/** One observer for the whole app, created lazily. */
let io: IntersectionObserver | null = null;
function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const target = e.target;
        io!.unobserve(target);
        imagesReady(target).then(() => target.setAttribute("data-revealed", ""));
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
    const pre = lazyImages(el).length > 0 ? preloader() : null;
    pre?.observe(el);
    return () => {
      obs.unobserve(el);
      pre?.unobserve(el);
    };
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
