"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/brand";
// Leaf import, NOT the barrel. The barrel re-exports Plate, which imports @/photos,
// which statically imports all 79 photographs — 63 KB of blur placeholders and
// metadata compiled into this client chunk for a nav bar that never calls photo().
import { TextLink } from "@/components/editorial/TextLink";
import { Reveal } from "@/components/motion/Reveal";
import { book, nav } from "@/content/home";

/**
 * The id of the 1px sentinel Cover.tsx renders as the last child of its Surface.
 *
 * Exported because it is the only coupling between these two files, and a silent
 * mismatch is expensive: the bar would never acquire its background and would fly over
 * the Ink sections as ink type on an ink ground. Cover should import this constant
 * rather than retype the string. `[data-cover-sentinel]` is accepted as a fallback.
 */
export const COVER_SENTINEL_ID = "cover-end";

const PANEL_ID = "masthead-menu";

/**
 * Interface strings, not copy. The landmark name and the two disclosure labels have no
 * entry in @/content/home — every string a visitor reads as *prose* still comes from
 * there. Worth an owner pass if the nav is ever translated.
 */
const NAV_LABEL = "Primary";
const MENU_LABEL = "MENU";
const CLOSE_LABEL = "CLOSE";

/**
 * MENU and CLOSE cannot be TextLinks: TextLink is an anchor with an href, and these are
 * disclosure controls that carry aria-expanded and an onClick. Same 1px hairline growing
 * from the left over 420ms, so they still read as one family with the nav.
 */
const CONTROL =
  "relative inline-flex items-center eyebrow after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-60 after:transition-transform after:duration-[420ms] after:ease-[var(--ease-editorial)] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

/** Statement's `sm` ramp, set on a link — the panel items are display type, not eyebrows. */
const PANEL_ITEM =
  "block font-display font-light uppercase tracking-display text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

/** Colour is inherited from the tone the bar declares — the marks draw in currentColor. */
const MARK_FADE =
  "col-start-1 row-start-1 transition-opacity duration-[260ms] ease-[var(--ease-editorial)] motion-reduce:transition-none";

/**
 * Two rows over the cover, one row past it. The only filled control on the entire site
 * lives here, written by hand and nowhere else — see TextLink, which has no `filled`
 * variant so no section can reach for a button by accident.
 *
 * The state change is driven by an IntersectionObserver on a sentinel, NOT by
 * `animation-timeline: scroll(root)`. In any engine without scroll-driven CSS the bar
 * would then never acquire its background — alabaster type on an alabaster ground for
 * the whole page below the hero. That is an unreadable nav, not a graceful degradation.
 */
export function Masthead() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Scroll position is an external system, so it is subscribed to rather than mirrored
  // into an effect: the server snapshot is always "over the cover", which is what the
  // homepage hydrates into, and nothing sets state on mount for its own sake.
  const pastRef = useRef(false);
  const subscribe = useCallback((onChange: () => void) => {
    const sentinel =
      document.getElementById(COVER_SENTINEL_ID) ??
      document.querySelector("[data-cover-sentinel]");

    // No cover on this route — or the sentinel was dropped. Fail SOLID: a bar that keeps
    // its background everywhere is merely plainer, while a permanently transparent one is
    // unreadable the moment it crosses an Ink section.
    if (!sentinel) {
      pastRef.current = true;
      onChange();
      return () => {};
    }

    // The bar is sticky, so the moment that matters is the cover's bottom edge passing
    // the BAR's bottom edge — not the viewport's top. Measured against the viewport top
    // instead, the bar stays transparent for its own height of scroll while it is already
    // overlapping the section below the cover, which is the ink-on-ink failure the whole
    // sentinel exists to prevent. Height is read in the over-the-cover (tallest) state,
    // which is exactly the edge we want.
    const barHeight = Math.round(headerRef.current?.getBoundingClientRect().height ?? 0);

    // OBSERVE THE COVER SECTION, NOT THE 1px SENTINEL.
    //
    // IntersectionObserver only calls back when the intersecting STATE changes. A 1px
    // target can cross the whole observation band between two samples on a fast scroll —
    // isIntersecting goes false (below the band) to false (above it) with no transition —
    // so no callback fires and the bar stays transparent for the rest of the page. It
    // reproduces on any flung wheel scroll and looks intermittent, which is worse.
    //
    // The cover section is ~1 viewport tall and cannot be skipped. The sentinel is still
    // how we FIND it, so Cover keeps a single explicit contract.
    const target = sentinel.closest("section") ?? sentinel;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Above the root, not merely outside it: the sentinel sits at the foot of a
          // cover taller than the screen, so "not intersecting" alone is true on load too.
          const edge = entry.rootBounds?.top ?? barHeight;
          const next = !entry.isIntersecting && entry.boundingClientRect.top <= edge;
          if (next === pastRef.current) continue;
          pastRef.current = next;
          onChange();
        }
      },
      { rootMargin: `${-barHeight}px 0px 0px 0px` },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);
  const past = useSyncExternalStore(
    subscribe,
    () => pastRef.current,
    () => false,
  );

  // Adjusting state during render rather than in an effect — the documented pattern for
  // "reset this when that changes". Only reachable if a future layout hoists the masthead
  // above the page, which would otherwise leave the panel open across a navigation.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    closeRef.current?.focus();

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // The Tab trap below only covers Tab. `inert` is what removes the page behind the
    // sheet from the accessibility tree, so a screen reader's virtual cursor cannot walk
    // out of the open menu into content that is not on screen.
    const behind = [
      headerRef.current,
      document.getElementById("main"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
    for (const el of behind) el.inert = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey ? active === first : active === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    // The panel is only reachable below md. If the viewport crosses the breakpoint while
    // it is open the trigger disappears with it, leaving a full-screen sheet nothing can
    // dismiss.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      body.style.overflow = previousOverflow;
      for (const el of behind) el.inert = false;
    };
  }, [open, closeMenu]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        ref={headerRef}
        // The masthead DECLARES a tone rather than inheriting one. It is the one element
        // that crosses every ground on the page, so a bar that adopted the tone beneath
        // it would turn ink-on-ink the moment it reached beat 07. Pinning the tone here
        // means bg-ground / text-on-ground / border-rule all resolve to paper locally —
        // no literal alabaster or ink, and nothing to re-check if the palette moves.
        data-tone="paper"
        className={`sticky top-0 z-50 border-b text-on-ground transition-[background-color,border-color,color] duration-[400ms] ease-[var(--ease-editorial)] motion-reduce:transition-none ${
          past ? "border-rule bg-ground/95 backdrop-blur-[2px]" : "border-transparent"
        }`}
      >
        {/* The border is always present and merely transparent, so acquiring the rule
            costs no height and nothing in the bar appears to move. Gutter matches
            Surface's exactly (px-4 md:px-[5vw]) so the wordmark sits on the page measure. */}
        <div className="w-full px-4 md:px-[5vw]">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-5 py-5 md:gap-x-8 md:py-6">
            {/* Both marks are always rendered and stacked in one grid cell, so the
                crossfade cannot reflow the row and BOOK genuinely never moves. The
                monogram is decorative — the wordmark carries the only accessible name.
                The cell's height is set by the monogram (ratio 0.78 → 41px at w-8), never
                by the wordmark, so the swap is opacity only at every width.

                The logo cell needs BOTH a shrinkable floor and min-w-0: a grid `auto`
                track is min-content-floored, and the wordmark is a fixed-width SVG, so
                without this the row cannot shrink below ~344px and the whole DOCUMENT
                scrolls sideways at 320px with BOOK clipped off-screen. w-28 at the
                narrow end, the spec's w-44 from md up. */}
            <div className="col-start-1 row-start-1 grid min-w-0 items-center justify-items-start">
              <Logo
                mark="wordmark"
                title="OutWest Creative House"
                className={`${MARK_FADE} w-28 max-w-full sm:w-36 md:w-44 ${past ? "opacity-0" : "opacity-100"}`}
              />
              <Logo
                mark="monogram"
                className={`${MARK_FADE} w-8 ${past ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            <nav
              aria-label={NAV_LABEL}
              className={`hidden items-center gap-10 md:flex ${
                past
                  ? "col-span-3 col-start-1 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-self-start"
                  : "col-span-3 col-start-1 row-start-2"
              }`}
            >
              {nav.map((item) => (
                <TextLink
                  key={item.href}
                  href={item.href}
                  variant="rule"
                  size="eyebrow"
                  // The current page keeps its hairline permanently drawn.
                  className={isCurrent(item.href) ? "after:scale-x-100" : ""}
                >
                  {item.label}
                </TextLink>
              ))}
            </nav>

            <div className="col-start-3 row-start-1 flex items-center gap-4 md:gap-6">
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                aria-controls={PANEL_ID}
                onClick={() => setOpen((v) => !v)}
                className={`${CONTROL} md:hidden`}
              >
                {MENU_LABEL}
              </button>

              {/* THE ONE FILLED CONTROL ON THE SITE. Deliberately not extracted into
                  TextLink: keeping it a hand-written one-off is what makes the constraint
                  unbreakable. Square corners, no shadow, no rounding.

                  The one place literal palette names survive in this file. bg-ink /
                  text-alabaster is an INVERSION of the bar's ground, not a reading of it,
                  and the tone tokens have no inverse pair to express that — bg-on-ground
                  does not exist. Written exactly as the spec pins it. */}
              <Link
                href={book.href}
                className="eyebrow bg-ink px-4 py-3 text-alabaster sm:px-7 transition-colors duration-300 hover:bg-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {book.label}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sibling of <header>, not a child: `backdrop-blur` establishes a containing block
          for fixed-position descendants, so past the cover this panel would be trapped
          inside the bar instead of covering the viewport. */}
      {open ? (
        <nav
          ref={panelRef}
          id={PANEL_ID}
          aria-label={NAV_LABEL}
          // A visual full-screen sheet is not a modal to assistive tech. Without these,
          // a screen-reader user swipes straight out of the menu into the twelve beats
          // underneath it — content that is not visible on screen. `inert` on the page
          // behind (below) is what actually removes it; aria-modal alone is not enough
          // for iOS VoiceOver.
          role="dialog"
          aria-modal="true"
          // Same declared tone as the bar, for the same reason: this sheet covers whatever
          // ground it was opened over, so it must own its own.
          data-tone="paper"
          // overflow-y-auto, not visible: body scroll is locked while this is open, so on a
          // short viewport (a landscape phone at 320x256) the last two nav items sit below
          // the fold with no way to reach them. overscroll-contain stops the scroll chaining
          // out to the locked page behind.
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ground px-4 pt-5 pb-16 text-on-ground"
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              className={CONTROL}
            >
              {CLOSE_LABEL}
            </button>
          </div>

          <ul className="mt-16 flex flex-col gap-6">
            {nav.map((item, i) => (
              <Reveal key={item.href} as="li" gesture="rise" i={i}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`${PANEL_ITEM} ${
                    isCurrent(item.href)
                      ? "underline decoration-1 underline-offset-8"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </Reveal>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
