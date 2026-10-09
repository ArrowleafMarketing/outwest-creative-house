import { Plate, Surface, type Tone } from "@/components/editorial";
import type { PlateDrift } from "@/components/editorial/Plate";

type BandProps = {
  slug: string;
  /** `native` crops nothing; `2/1` turns a 3:2 frame into a band without losing the subject. */
  ratio?: "native" | "2/1" | "16/9";
  focal?: string;
  drift?: PlateDrift;
  tone?: Tone;
};

/**
 * A full-bleed photograph as its own flush, gutterless ground — the pattern the homepage
 * uses for its booking and closing bands, extracted so inner pages can breathe between
 * type-led sections without inventing their own.
 *
 * Anchored, because it runs edge to edge: a travelling frame would open a seam against the
 * sections either side. Only the image pans, inside the frame.
 */
export function Band({ slug, ratio = "native", focal, drift = "right", tone = "paper" }: BandProps) {
  return (
    <Surface tone={tone} rhythm="flush" gutter={false}>
      <Plate slug={slug} ratio={ratio} focal={focal} sizes="100vw" drift={drift} anchored />
    </Surface>
  );
}
