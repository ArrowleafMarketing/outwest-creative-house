"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal, flushSync } from "react-dom";

type Item = { no: string; name: string };

type ShootFinderProps = {
  items: readonly Item[];
  /** One server-rendered body per item, in the same order. */
  panels: readonly React.ReactNode[];
  nextLabel: string;
  className?: string;
};

const PANEL_ID = "shoot-panel";

/** Interface string, not copy — the same call Masthead makes about its own CLOSE. */
const CLOSE_LABEL = "CLOSE";

/** Masthead's disclosure-control treatment, so CLOSE reads as one family across the site. */
const CONTROL =
  "relative inline-flex items-center eyebrow after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-60 after:transition-transform after:duration-[420ms] after:ease-[var(--ease-editorial)] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

const DESKTOP = "(min-width: 768px)";

/** Longest the transition will hold its frozen frame waiting on the panel's photograph. */
const MAX_IMAGE_WAIT = 500;

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Same gate as every other motion on the site: the flag layout.tsx sets, and the OS. */
function motionOn() {
  return (
    document.documentElement.getAttribute("data-motion") === "on" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Lets the sheet slide in with its photograph already painted rather than its blur
 * placeholder. The view transition holds the previous frame while this resolves, so it
 * is capped: a slow request costs half a second of stillness, never a stuck page.
 */
function imagesReady(el: Element | null) {
  if (!el) return Promise.resolve();
  const pending = [...el.querySelectorAll("img")].filter((img) => !img.complete);
  if (pending.length === 0) return Promise.resolve();
  for (const img of pending) img.loading = "eager";
  return Promise.race([
    Promise.allSettled(pending.map((img) => img.decode())),
    new Promise((resolve) => setTimeout(resolve, MAX_IMAGE_WAIT)),
  ]);
}

/**
 * The nine-shoot index and the sheet it opens.
 *
 * CLOSED: a hairline-ruled 3×3 index above md, a ruled list below it. Nine buttons, one
 * viewport, no scroll.
 *
 * OPEN, md and up: the index re-flows into a single column on the left and the sheet
 * opens beside it on Canvas, with the active row filled in the same Canvas so it reads as
 * the tab the sheet hangs from. Every other shoot stays one click away.
 *
 * OPEN, below md: the sheet is a full-screen dialog that slides in from the right, the
 * same modal contract as the Masthead menu — scroll lock, `inert` behind, Tab trapped,
 * Escape closes. It is portalled to <body> because the page behind it is made inert, and
 * an inert <main> would take a sheet rendered inside it down with it.
 *
 * THE MOTION IS A VIEW TRANSITION (motion.css, "the shoots index"): each tile is its own
 * named snapshot, so the grid morphs into the column rather than snapping, and the sheet
 * wipes in from the right edge. Where view transitions are unsupported, or motion is
 * declined, the same state change simply happens — nothing here depends on the animation.
 */
export function ShootFinder({ items, panels, nextLabel, className }: ShootFinderProps) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  // Server snapshot is "not desktop", which is harmless: the sheet is closed on load, and
  // both layouts render the closed index identically apart from md: utilities.
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const transitionId = useRef(0);

  const go = useCallback((next: number | null) => {
    const apply = () => {
      flushSync(() => setActive(next));

      // The layout just changed under the click. Opening from the bottom row of the grid
      // would otherwise leave the top of the sheet above the viewport. Done inside the
      // transition's update, so the new frame is captured at the corrected scroll.
      const root = rootRef.current;
      if (!root || !window.matchMedia(DESKTOP).matches) return;
      const top = root.getBoundingClientRect().top;
      const margin = parseFloat(getComputedStyle(root).scrollMarginTop) || 0;
      if (top < margin) {
        window.scrollTo({ top: window.scrollY + top - margin, behavior: "instant" });
      }
    };

    if (!motionOn() || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    // Scopes the root-snapshot overrides in motion.css to THIS transition. Counted, so a
    // fast second click cannot have the first transition's cleanup strip the flag out from
    // under the second one.
    const id = ++transitionId.current;
    const html = document.documentElement;
    html.setAttribute("data-shoots-vt", "");
    const transition = document.startViewTransition(async () => {
      apply();
      await imagesReady(panelRef.current);
    });
    transition.finished.finally(() => {
      if (id === transitionId.current) html.removeAttribute("data-shoots-vt");
    });
  }, []);

  // Focus follows the sheet: into it on open, back to the shoot that opened it on close.
  // Moving between shoots leaves focus where it is — on the row or on NEXT — which is what
  // lets a keyboard user walk the list without being thrown around.
  const lastActive = useRef<number | null>(null);
  useEffect(() => {
    const previous = lastActive.current;
    lastActive.current = active;
    if (active === null) {
      if (previous !== null) tileRefs.current[previous]?.focus({ preventScroll: true });
      return;
    }
    if (previous === null) {
      if (isDesktop) panelRef.current?.focus({ preventScroll: true });
      else closeRef.current?.focus({ preventScroll: true });
    }
  }, [active, isDesktop]);

  // Escape closes at every size. Above md the sheet is inline rather than modal, so it
  // only listens while focus is inside the index — Escape elsewhere on the page is not ours.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isDesktop && !rootRef.current?.contains(document.activeElement)) return;
      event.preventDefault();
      go(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, isDesktop, go]);

  // Below md the sheet is a modal. Same contract as the Masthead menu, for the same reasons.
  useEffect(() => {
    if (!open || isDesktop) return;
    const panel = panelRef.current;
    if (!panel) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const behind = [
      document.querySelector("header"),
      document.getElementById("main"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
    for (const el of behind) el.inert = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (event.shiftKey ? current === first || current === panel : current === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      for (const el of behind) el.inert = false;
    };
  }, [open, isDesktop]);

  const count = String(items.length).padStart(2, "0");
  const following = active === null ? null : (active + 1) % items.length;

  const sheet =
    active !== null && following !== null ? (
      <div
        ref={panelRef}
        id={PANEL_ID}
        role={isDesktop ? "region" : "dialog"}
        aria-modal={isDesktop ? undefined : true}
        aria-label={items[active].name}
        tabIndex={-1}
        // Canvas, so the sheet reads as plaster laid over the paper ground — and so the
        // active row can wear the same ground and become the tab it hangs from.
        data-tone="canvas"
        style={{ viewTransitionName: "shoot-panel" }}
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ground text-on-ground focus:outline-none md:static md:z-auto md:col-span-7 md:overflow-visible lg:col-span-8"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-6 bg-ground px-4 py-5 md:static md:px-[3vw] md:pt-8 md:pb-0">
          <p className="eyebrow text-on-ground-dim">
            NO. {items[active].no} / {count}
          </p>
          <button ref={closeRef} type="button" onClick={() => go(null)} className={CONTROL}>
            {CLOSE_LABEL}
          </button>
        </div>

        {/* Keyed, so every shoot's type re-runs its entrance instead of swapping in place. */}
        <div key={active} className="px-4 pt-4 pb-12 md:px-[3vw] md:pt-8 md:pb-10">
          {panels[active]}
        </div>

        <div className="mt-auto px-4 md:px-[3vw]">
          <button
            type="button"
            onClick={() => go(following)}
            className="group flex w-full items-baseline gap-4 border-t border-rule py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:py-7"
          >
            <span className="eyebrow shrink-0 text-on-ground-dim">{nextLabel}</span>
            <span className="flex-1 font-display text-lg leading-[1.15] font-light uppercase tracking-display md:text-[clamp(1rem,1.3vw,1.25rem)]">
              {items[following].name}
            </span>
            <span
              aria-hidden="true"
              className="eyebrow transition-transform duration-[240ms] ease-[var(--ease-editorial)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
            >
              →
            </span>
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div
      ref={rootRef}
      // Clears the sticky masthead when the open sheet is scrolled back into view.
      className={`scroll-mt-28 md:grid md:grid-cols-12 ${className ?? ""}`}
    >
      {/*
       * The hairlines are the 1px gaps between rows and tiles, showing the rule colour
       * through — so there is never a doubled rule where two tiles meet, in either layout.
       * bg-clip-padding keeps the translucent rule from painting twice under the border.
       */}
      <ul
        className={`grid gap-px border-y border-rule bg-rule bg-clip-padding ${
          open ? "md:col-span-5 md:self-start lg:col-span-4" : "md:col-span-12 md:grid-cols-3"
        }`}
      >
        {items.map((item, i) => {
          const current = active === i;
          return (
            <li
              key={item.no}
              className={current ? "bg-ground md:bg-canvas" : "bg-ground"}
              style={{ viewTransitionName: `shoot-tile-${i}`, viewTransitionClass: "shoot-tile" }}
            >
              <button
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={current}
                aria-controls={open ? PANEL_ID : undefined}
                onClick={() => go(current ? null : i)}
                className={`group relative flex w-full items-baseline gap-4 px-1 py-5 text-left transition-colors duration-300 ease-[var(--ease-editorial)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current ${
                  open
                    ? `md:py-4 md:pr-6 ${current ? "md:pl-5" : "md:pl-1 md:text-on-ground-dim md:hover:text-on-ground"}`
                    : "md:min-h-[13rem] md:flex-col md:items-stretch md:justify-between md:p-7 md:hover:bg-[color-mix(in_srgb,var(--color-canvas)_45%,var(--color-alabaster))] lg:min-h-[15rem] lg:p-9"
                }`}
              >
                <span className="eyebrow w-7 shrink-0 text-on-ground-dim md:w-auto">
                  <span className={open ? "hidden" : "hidden md:inline"}>NO. </span>
                  {item.no}
                </span>
                <span
                  className={`flex-1 font-display text-lg leading-[1.15] font-light uppercase tracking-display ${
                    open
                      ? "md:text-[clamp(0.95rem,1.2vw,1.15rem)]"
                      : "md:flex-none md:max-w-[14ch] md:text-[clamp(1.3rem,2.1vw,2.1rem)] md:leading-[1.08]"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  aria-hidden="true"
                  className={`eyebrow transition-[translate,opacity] duration-[240ms] ease-[var(--ease-editorial)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 ${
                    open
                      ? current
                        ? ""
                        : "md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
                      : "md:absolute md:top-7 md:right-7 lg:top-9 lg:right-9"
                  }`}
                >
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {sheet && isDesktop ? sheet : null}
      {sheet && !isDesktop ? createPortal(sheet, document.body) : null}
    </div>
  );
}
