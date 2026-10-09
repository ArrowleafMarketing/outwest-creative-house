import { Fragment } from "react";
import { Plate, Statement, Surface } from "@/components/editorial";
import { Drift } from "@/components/motion/Drift";
import { Reveal } from "@/components/motion/Reveal";
import { people, roles } from "@/content/home";

/**
 * ⚠ THE ONLY TWO LITERALS IN THIS FILE, and neither is a choice.
 *
 * src/content/home.ts exports this beat's copy (`people`, `roles`) but no photograph for
 * it, and that file was out of scope for this build. Both slugs belong in the `people`
 * export beside the prose they stand next to — that is what keeps a frame swap a one-file
 * diff instead of a hunt through the section tree.
 *
 * Neither slug is invented: both are recorded in src/photos/metadata.ts, which is also
 * where their alt text comes from, so neither Plate below asserts anything about its own
 * frame. Moving them into `people` is a two-line change here.
 */
const BAND_SLUG = "dsc-8488";
const OVERLAP_SLUG = "dsc-8635";

/**
 * Beat 06 — people, not rooms. The only beat where type and photograph share a plane, and
 * the page's one deliberate overlap: a second frame crossing the band's lower-right corner
 * and running off the right edge. Done once, on purpose, for the price of one extra plate.
 * A second overlap anywhere would make it a layout rather than a gesture.
 *
 * WHY THE ROLES ARE SET BENEATH THE BAND AND NOT OVERLAID ON IT. Two reasons, and the
 * second is the real one.
 *
 * First, contrast. Type over a bright studio sweep needs a scrim whose opacity has to be
 * measured per frame, not asserted: over this frame, where the photograph sits around
 * L≈200, alabaster on a 28% ink wash measures 2.69:1 at 0.75rem — the requirement is 4.5:1.
 * The brand's rule is that type never fights the image, and a scrim is type fighting the
 * image with extra steps.
 *
 * Second, and more important: the frame holds photographers, while the line claims seven
 * disciplines. Overlaid, the words read as a caption asserting who is in the shot — which
 * would be false. Set beneath, they read as the house's constituency, which is true.
 *
 * MOBILE: the band runs full width at its native 3:2, so it is short enough that the
 * overlap plate at 46vw still clears the type beneath it; no art direction and no crop are
 * needed at any width. The roles wrap naturally over three or four lines.
 *
 * ⚠ docs/DIRECTION.md conflict #5. This line is the page's only commitment to an audience
 * wider than the approved personas — "FOUNDERS" and "AGENCIES" have no research behind
 * them. The flag lives on the `roles` export; it is repeated here because this is the one
 * place it is rendered.
 *
 * UPGRADE PATH: the roles line is the thing on this page that wants better assets most. As
 * soon as the library holds a filmmaker, a founder or an agency shoot, it can become a row
 * of small plates keyed to the words, or each word can link into MADE OUTWEST filtered by
 * discipline. Today it is a typographic statement that costs nothing and claims nothing it
 * cannot support.
 */
export function People() {
  return (
    <>
      {/* `relative` is what the overlap plate positions against; gutter={false} is what
          lets the band reach both viewport edges. */}
      <Surface tone="paper" rhythm="flush" gutter={false} className="relative">
        {/*
         * NATIVE 3:2, never cropped to a cinematic band. This is one of the few genuine
         * landscape frames in a portrait-dominant library, and the thing worth seeing in it
         * — several photographers working a set together — is spread across the full
         * height. A 21:9 crop would remove the evidence and keep the wallpaper.
         *
         * The image drifts DOWN inside its frame as the beat scrolls past, against the
         * roles beneath it, which travel up: the page's clearest counter-movement.
         * Anchored, because the band runs edge to edge and flush with the beats around
         * it — a travelling frame would open a seam.
         */}
        <Plate slug={BAND_SLUG} ratio="native" sizes="100vw" drift="down" anchored />

        {/*
         * Hangs below the band's lower edge, which is exactly why the type Surface carries
         * extra top padding. The plate rises across the band while the band holds still,
         * which keeps the overlap alive while it is on screen rather than freezing it into
         * a composition. Vertical only: it runs off the right edge, so any sideways travel
         * would pull it away from the edge and open a gap.
         */}
        <div className="absolute -bottom-[12%] right-0 z-10 w-[46vw] md:-bottom-[18%] md:w-[22vw]">
          <Plate
            slug={OVERLAP_SLUG}
            ratio="native"
            sizes="(min-width: 768px) 24vw, 46vw"
            drift="down"
          />
        </div>
      </Surface>

      {/* pt-28 md:pt-40 clears the overlap plate hanging out of the band above. */}
      <Surface tone="paper" rhythm="normal" className="pt-28 md:pt-40">
        {/*
         * The counter-movement's other half. Only the roles drift — the rule and the
         * statement beneath stay put, so the list reads as moving against the photograph
         * rather than the whole section sliding.
         */}
        <Drift y={["1.5rem", "-1.5rem"]}>
          <p className="eyebrow mx-auto max-w-[62ch] text-center text-on-ground-dim">
            {roles.map((role, i) => (
              <Fragment key={role}>
                {/*
                 * The separator sits between the words, not inside them: an inline-block
                 * has no break opportunity inside it, so joining the dot to the role would
                 * give the browser nowhere to wrap the line.
                 *
                 * Three nodes, and each is load-bearing. The leading NO-BREAK space binds
                 * the dot to the word it follows, so the separator's only break
                 * opportunity is the plain space AFTER the dot and a wrapped line can
                 * never open with a stranded interpunct. Both spaces sit OUTSIDE the
                 * aria-hidden span: hiding the dot is right, since a decorative interpunct
                 * is noise to a screen reader, but hiding the whitespace along with it
                 * drops the only word boundary the roles have and runs them together in
                 * the accessibility tree.
                 */}
                {i > 0 ? (
                  <>
                    {"\u00a0"}
                    <span aria-hidden="true">·</span>{" "}
                  </>
                ) : null}
                {/*
                 * inline-block, not inline: `rise` moves the element with `translate`, and
                 * translate does not apply to a non-replaced inline box — the words would
                 * fade in without travelling and the stagger would lose its rhythm.
                 * The index is capped at 4 inside Reveal, so the seventh role lands with
                 * the fifth and the tail never exceeds 360ms.
                 */}
                <Reveal as="span" gesture="rise" i={i} className="inline-block">
                  {role}
                </Reveal>
              </Fragment>
            ))}
          </p>
        </Drift>

        {/* Structure precedes the content it carries, so the hairline draws before the
            statement rises. origin="left" — centre-out is reserved for beat 10 alone. */}
        <Reveal gesture="draw" origin="left" className="mx-auto mt-16 h-px w-16 bg-rule" />

        {/* mt-8 md:mt-10 is Statement's own lines→lead step, reused so the gap under the
            rule belongs to the same rhythm as everything inside the block.

            NO `lead` HERE, deliberately. `people.lead` exists in the content file, but the
            footer already sets that exact sentence as the page's send-off in place of the
            `footer.sendoff` field the content file lacks. Setting it here too would print
            the same sentence twice on one page, with the second printing landing a few
            hundred pixels below the first. When `footer.sendoff` lands, `people.lead`
            becomes free and belongs on this Statement. */}
        <Statement
          className="mt-8 md:mt-10"
          size="lg"
          as="h2"
          align="center"
          lines={people.lines}
        />
      </Surface>
    </>
  );
}
