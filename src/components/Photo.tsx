import NextImage from "next/image";
import type { Photo as PhotoData } from "@/photos";

type PhotoProps = {
  photo: PhotoData;
  /**
   * Viewport-relative rendered width, e.g. "100vw" for a full-bleed band or
   * "(min-width: 640px) 33vw, 100vw" for a grid. Next uses this to pick a variant —
   * getting it wrong is the usual cause of a page shipping needlessly large images.
   */
  sizes: string;
  /** Stretch to fill a positioned parent and crop. For full-bleed bands. */
  fill?: boolean;
/**
   * Load immediately instead of lazily. Set on the LCP image only.
   *
   * Next 16 deprecated `priority` in favour of `preload`, and its own guidance says to
   * prefer `loading="eager"` + `fetchPriority="high"` when several images could be the
   * LCP depending on viewport — which is exactly this page.
   */
  eager?: boolean;
  /** Override the library's alt text when context makes a better one available. */
  alt?: string;
  className?: string;
};

/**
 * Wraps `next/image` with the library's own alt text and a blur-up placeholder.
 *
 * Width, height and blurDataURL come free from the static import in src/photos — which
 * is why nothing here has to pass them, and why there is no layout shift on load.
 *
 *   <Photo photo={photo("a7500819")} sizes="100vw" fill eager />
 */
export function Photo({
  photo,
  sizes,
  fill,
  eager,
  alt,
  className,
}: PhotoProps) {
  return (
    <NextImage
      src={photo.src}
      alt={alt ?? photo.alt}
      sizes={sizes}
      fill={fill}
      loading={eager ? "eager" : undefined}
      fetchPriority={eager ? "high" : undefined}
      placeholder="blur"
      className={className}
    />
  );
}

/**
 * Full-bleed band. The photo crops to the given aspect ratio rather than dictating it —
 * the library is portrait-dominant, so most editorial bands need an explicit ratio.
 *
 *   <PhotoBand photo={photo("dsc-9270")} className="aspect-21/9" />
 */
export function PhotoBand({
  photo,
  sizes = "100vw",
  eager,
  alt,
  className,
}: Omit<PhotoProps, "fill">) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Photo
        photo={photo}
        sizes={sizes}
        alt={alt}
        eager={eager}
        fill
        className="object-cover"
      />
    </div>
  );
}
