import { Plate, Spread } from "@/components/editorial";
import type { PlateDrift } from "@/components/editorial/Plate";
import { photo } from "@/photos";

export type GalleryItem = {
  slug: string;
  /** A real series name from metadata.ts — never invented. */
  credit?: string;
  /** A truthful descriptor: "Fashion editorial", "Product", "Portrait". */
  kind?: string;
  focal?: string;
};

type GalleryProps = {
  items: readonly GalleryItem[];
  /** Vertical edge label on the first plate. */
  rail?: string;
  className?: string;
};

/**
 * Hanging positions, cycled down each column. Each frame is hung at its own width from its
 * own edge so nothing lines up across the gutter — the MADE OUTWEST device from the
 * homepage, generalised so any list of frames can be laid out the same way rather than as a
 * uniform grid.
 *
 * Portraits hang narrower than landscapes. A 2:3 frame at full column width stands ~60vw
 * tall, so a run of them turns a page into a scroll marathon; at two-thirds width it is
 * still the largest thing on screen and nothing has to be cropped to get there.
 */
const HANG = {
  left: {
    landscape: [
      { width: "w-full", align: "start" },
      { width: "w-[88%]", align: "end" },
    ],
    portrait: [
      { width: "w-[72%]", align: "start" },
      { width: "w-[64%]", align: "end" },
      { width: "w-[78%]", align: "start" },
    ],
  },
  right: {
    landscape: [
      { width: "w-[88%]", align: "end" },
      { width: "w-full", align: "start" },
    ],
    portrait: [
      { width: "w-[64%]", align: "end" },
      { width: "w-[78%]", align: "start" },
      { width: "w-[70%]", align: "end" },
    ],
  },
} as const;

type Hang = { width: string; align: string };

function hangFor(side: "left" | "right", slug: string, i: number): Hang {
  const set = HANG[side][photo(slug).orientation === "portrait" ? "portrait" : "landscape"];
  return set[i % set.length];
}

/**
 * A col-span-6 slot at Spread's `wide` gap measures ~41.5vw; 46vw rounds up, which costs a
 * slightly larger variant rather than a soft image. Each hanging width scales from that.
 */
const WIDTH_SIZES: Record<string, string> = {
  "w-full": "46vw",
  "w-[88%]": "41vw",
  "w-[78%]": "36vw",
  "w-[72%]": "34vw",
  "w-[70%]": "33vw",
  "w-[64%]": "30vw",
};

const DRIFT: readonly PlateDrift[] = ["down", "right", "down", "left"];

function Hung({
  item,
  hang,
  drift,
  rail,
}: {
  item: GalleryItem;
  hang: Hang;
  drift: PlateDrift;
  rail?: string;
}) {
  return (
    <Plate
      slug={item.slug}
      sizes={`(min-width: 768px) ${WIDTH_SIZES[hang.width]}, 100vw`}
      credit={item.credit}
      kind={item.kind}
      focal={item.focal}
      rail={rail}
      drift={drift}
      className={`${hang.width} ${hang.align === "end" ? "ms-auto" : "me-auto"}`}
    />
  );
}

/**
 * Two offset columns above md, one column below it in the authored order. Items alternate
 * left/right, so the source order IS the reading order on a phone and on a desktop the
 * eye zig-zags across the gutter in the same sequence.
 *
 * The phone copy and the desktop copy are both rendered; the inactive one is display:none,
 * so its lazy images are never fetched.
 */
export function Gallery({ items, rail, className }: GalleryProps) {
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <div className={className}>
      <div className="space-y-12 md:hidden">
        {items.map((item, i) => (
          <Plate
            key={item.slug}
            slug={item.slug}
            sizes="100vw"
            credit={item.credit}
            kind={item.kind}
            focal={item.focal}
            drift={DRIFT[i % DRIFT.length]}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <Spread
          split="6/6"
          gap="wide"
          stagger
          left={
            <div className="space-y-20">
              {left.map((item, i) => (
                <Hung
                  key={item.slug}
                  item={item}
                  hang={hangFor("left", item.slug, i)}
                  drift={DRIFT[i % DRIFT.length]}
                  rail={i === 0 ? rail : undefined}
                />
              ))}
            </div>
          }
          right={
            <div className="space-y-20">
              {right.map((item, i) => (
                <Hung
                  key={item.slug}
                  item={item}
                  hang={hangFor("right", item.slug, i)}
                  drift={DRIFT[(i + 1) % DRIFT.length]}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
}
