import { Photo, PhotoBand } from "@/components/Photo";
import { photo } from "@/photos";
import { Reveal } from "@/components/motion/Reveal";

type Ratio = "native" | "3/2" | "2/3" | "4/5" | "1/1" | "16/9" | "2/1";

/** Which way the image travels inside its frame as the page scrolls down. */
export type PlateDrift = "left" | "right" | "up" | "down";

type PlateProps = {
  slug: string;
  ratio?: Ratio;
  /**
   * REQUIRED, with no default. Getting `sizes` wrong is the usual cause of shipping
   * oversized images, so every caller states the rendered width explicitly.
   */
  sizes: string;
  focal?: string;
  eager?: boolean;
  index?: string;
  credit?: string;
  kind?: string;
  rail?: string;
  /** `settle` is for the LCP plate and the closing frame only. */
  reveal?: "settle" | "none";
  /**
   * The photograph is on the page from first paint and only shifts a few percent inside
   * its frame across the scroll. Give neighbouring plates different directions so they
   * move against each other. Omit for stillness.
   */
  drift?: PlateDrift;
  /**
   * Hold the frame still and move only the image inside it. For plates that run to a
   * viewport edge, where a travelling frame would open a gap against the edge.
   */
  anchored?: boolean;
  alt?: string;
  className?: string;
};

const RATIO: Record<Exclude<Ratio, "native">, string> = {
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "16/9": "aspect-[16/9]",
  "2/1": "aspect-[2/1]",
};

/**
 * The atomic photograph, and the whole argument of the page.
 *
 * Renders at NATIVE ratio by default so a 2:3 frame is never cropped. The library is
 * portrait-dominant, so a page whose default unit is a landscape band is a page that
 * crops most of its own library.
 *
 * NO INVENTED DATA may ever reach the caption fields. Where metadata.ts has no `series`,
 * omit `credit` and let `kind` carry a truthful descriptor. No years anywhere — the
 * library records none, and a fabricated year on client work is the first error a client
 * catches.
 */
export function Plate({
  slug,
  ratio = "native",
  sizes,
  focal,
  eager,
  index,
  credit,
  kind,
  rail,
  reveal = "none",
  drift,
  anchored,
  alt,
  className,
}: PlateProps) {
  const p = photo(slug);
  const hasCaption = Boolean(index || credit || kind);

  return (
    /**
     * The gesture and the clip wrap ONLY the image frame, never the figure, so the
     * rail — which sits at -left-6, outside the figure's box — is never clipped, and the
     * caption arrives on its own rather than travelling with the photograph.
     *
     * The drift sits on the figure: the whole plate, caption and rail included, travels
     * about a title's distance one way while the image inside it pans the other.
     */
    <figure
      data-plate
      data-plate-drift={drift}
      data-plate-anchored={anchored ? "" : undefined}
      className={`relative ${className ?? ""}`}
      style={focal ? ({ "--focal": focal } as React.CSSProperties) : undefined}
    >
      {rail ? (
        <span className="pointer-events-none absolute -left-6 top-0 hidden md:flex md:flex-col md:items-center md:gap-3">
          <Reveal gesture="draw" axis="y" as="span" className="block h-12 w-px bg-rule" />
          <span className="eyebrow text-on-ground-dim [writing-mode:vertical-rl] rotate-180">
            {rail}
          </span>
        </span>
      ) : null}

      {/* clips the image as it pans inside the frame */}
      <Reveal gesture={reveal} className="block overflow-hidden">
        {ratio === "native" ? (
          <Photo photo={p} sizes={sizes} eager={eager} alt={alt} className="block h-auto w-full" />
        ) : (
          <PhotoBand
            photo={p}
            sizes={sizes}
            eager={eager}
            alt={alt}
            className={`${RATIO[ratio]} w-full`}
          />
        )}
      </Reveal>

      {hasCaption ? (
        <Reveal as="figcaption" gesture="rise" i={1} className="mt-3 flex flex-col gap-1">
          {index ? <span className="eyebrow text-on-ground-dim">{index}</span> : null}
          {credit ? (
            <span className="eyebrow text-on-ground transition-colors duration-300">{credit}</span>
          ) : null}
          {kind ? (
            <span className="paragraph-header text-sm text-on-ground-dim">{kind}</span>
          ) : null}
        </Reveal>
      ) : null}
    </figure>
  );
}
