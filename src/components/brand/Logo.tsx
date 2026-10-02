import { logoPaths, type LogoMark } from "./logo-paths";

export type { LogoMark };

type LogoProps = {
  /**
   * `lockup` — OUTWEST over CREATIVE HOUSE. The primary mark; use it unless
   *   there's a reason not to.
   * `wordmark` — OUTWEST alone. For tight horizontal space, or where
   *   "Creative House" already appears nearby.
   * `monogram` — the interlocking OW. For avatars, favicons, and small marks.
   */
  mark?: LogoMark;
  /**
   * Accessible name. Omit for decorative use (e.g. a logo next to a text link
   * that already says "OutWest"), which renders the mark `aria-hidden`.
   */
  title?: string;
  className?: string;
};

/**
 * The OutWest marks, inlined and drawn in `currentColor` — set the colour with a
 * text utility (`text-ink`, `text-alabaster`, `text-adobe`, …).
 *
 * Size by width; height follows from the mark's own aspect ratio.
 *
 *   <Logo mark="lockup" title="OutWest Creative House" className="w-56 text-ink" />
 */
export function Logo({ mark = "lockup", title, className }: LogoProps) {
  const { viewBox, paths, ratio } = logoPaths[mark];
  const decorative = title === undefined;

  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      style={{ aspectRatio: ratio }}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      {paths.map((d) => (
        <path key={d.slice(0, 32)} d={d} />
      ))}
    </svg>
  );
}
