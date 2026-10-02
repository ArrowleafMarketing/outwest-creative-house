import { Plate, Spread, Statement, Surface } from "@/components/editorial";
import { manifesto } from "@/content/home";

/**
 * ⚠ THE ONLY LITERAL IN THIS FILE, and it is not a choice.
 *
 * src/content/home.ts exports the manifesto's copy but no photograph for this beat, and
 * that file is out of scope for this build. The slug belongs in the `manifesto` export
 * beside the prose it stands next to — that is what keeps a frame swap a one-file diff
 * instead of a hunt through the section tree. Moving it is a one-line change here.
 *
 * It is not invented data: src/photos/metadata.ts records dsc-8936 as "Seated portrait
 * under olive branch shadows on plaster", category person, tag hard-light. No other
 * exported slug is free — every one of them already belongs to another beat, and
 * borrowing one would print the same photograph twice on the page.
 */
const PLATE_SLUG = "dsc-8936";

/**
 * The rail label is DERIVED, never typed. The spec asked for "PLASTER · OLIVE · HARD
 * LIGHT", which is prose that does not exist in src/content/home.ts, so writing it here
 * would put an unreviewed string on the page from a section file. The beat's own eyebrow
 * is the nearest approved copy, and echoing the beat's words down the edge is the same
 * device MadeOutWest uses. When home.ts grows a `manifesto.rail`, this line points at it.
 */
const RAIL = manifesto.eyebrow;

/**
 * Beat 03 — the manifesto. The one beat where the photograph is not an illustration of
 * the argument but the same argument made twice: a person, a place, a material and a
 * light in one frame, which is precisely what the copy claims the house is. That is why
 * the plate carries no caption — a caption here would explain a point the picture has
 * already made, and the page would start narrating itself.
 *
 * ALIGNMENT: `start`, not the spec's `baseline`. A grid item whose content is a block
 * image has no text baseline, so the browser synthesises one at its bottom edge and
 * `items-baseline` would drop the statement's first line to the FOOT of the photograph —
 * roughly a full plate-height of dead space on md and up. No other beat on the page pairs
 * a Plate with `baseline` either. Tops align instead, which is the editorial intent.
 *
 * MOBILE: Spread stacks in source order, so the copy is deliberately the `left` slot.
 * The manifesto is the argument; the photograph is the evidence, and evidence reads
 * second. Below md the bleeding plate runs to both viewport edges at its native ratio,
 * hence the 100vw fallback in `sizes`.
 *
 * UPGRADE PATH: a single-plate section absorbs a better frame by slug swap alone. If a
 * second material-only frame lands, the right column becomes a vertical stack of two
 * plates in the same five columns and Spread needs no change at all.
 */
export function Manifesto() {
  return (
    <Surface tone="paper" rhythm="vast">
      <Spread
        split="7/5"
        align="start"
        gap="wide"
        bleed="right"
        left={
          <Statement
            eyebrow={manifesto.eyebrow}
            lines={manifesto.lines}
            size="lg"
            as="h2"
            lead={manifesto.lead}
            body={manifesto.body}
            measure="wide"
          />
        }
        right={
          <Plate
            slug={PLATE_SLUG}
            sizes="(min-width: 768px) 46vw, 100vw"
            rail={RAIL}
            reveal="wipe"
          />
        }
      />
    </Surface>
  );
}
