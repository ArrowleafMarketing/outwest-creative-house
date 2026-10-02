import { art, type ArtName } from "./art-manifest";

export { illustrationNames } from "./art-manifest";
export type { ArtName };

type IllustrationProps = {
  name: ArtName;
  /** Accessible name. Omit for decorative art, which is hidden from screen readers. */
  title?: string;
  className?: string;
};

/**
 * The hand-drawn charcoal marks — yucca, saguaro, pomegranate, cow skull, and the
 * rest of the set, plus the `badge` lockup.
 *
 * These carry a lot of texture detail (the pomegranate is ~290 KB of path data), so
 * they are *not* inlined. Each is drawn as a CSS mask over a `currentColor`
 * background: the browser caches one file per mark, the HTML stays small, and the
 * art still takes any brand colour from a text utility.
 *
 *   <Illustration name="yucca" className="w-24 text-olive" />
 *
 * Give it a width *or* a height — the other dimension follows from the asset's
 * aspect ratio. A mask element has no intrinsic size, so `w-auto`/`h-auto` alone
 * (or only a `max-*` bound) collapses it to zero.
 */
export function Illustration({ name, title, className }: IllustrationProps) {
  const { src, ratio } = art[name];
  const decorative = title === undefined;
  const mask = `url("${src}") center / contain no-repeat`;

  return (
    <span
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      style={{
        display: "block",
        aspectRatio: ratio,
        backgroundColor: "currentColor",
        WebkitMask: mask,
        mask,
      }}
    />
  );
}
