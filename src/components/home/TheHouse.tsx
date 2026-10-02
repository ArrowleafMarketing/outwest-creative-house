import { Plate, Spread, Statement, Surface } from "@/components/editorial";
import { spaces } from "@/content/home";

/**
 * Beat 04 — the house.
 *
 * ONE SPACE PER SCROLL, as three stacked spreads. No sticky column, no cross-fade, no
 * client JS: a stacked spread honours "one space per scroll" more literally than a sticky
 * crossfade and, unlike a crossfade, it cannot half-work.
 *
 * EACH SPACE IS A PAIR — one frame that shows the room, one that shows it in use. The
 * library holds exactly one unpeopled frame per space worth showing at this size, so a
 * section built only from empty rooms would have to show the same furniture three times
 * and call it three destinations. It would also contradict the photography direction,
 * which asks for the house occupied rather than for wide-angle frames of empty rooms.
 *
 * The section id lives on the Surface, once. The articles carry none, so three of the
 * same beat cannot collide into a duplicate-id bug.
 */

/**
 * The two column widths. Inside Surface's 5vw gutter the grid is 90vw across, and
 * Spread's `gutter` gap puts 4vw between all twelve tracks, so an 8-span measures ~59vw
 * and a 4-span ~27vw. These round UP to 62vw and 32vw: overstating `sizes` only costs a
 * slightly larger variant, while understating it ships a soft image.
 *
 * They are keyed to COLUMN SPAN, not to which photograph sits in the slot, because the
 * middle space inverts the split — describing the pair's roles instead of their real
 * widths would hand Next the wrong variant for both of the Villa's frames.
 */
const SIZES_MAJOR = "(min-width: 768px) 62vw, 100vw";
const SIZES_MINOR = "(min-width: 768px) 32vw, 100vw";

export function TheHouse() {
  return (
    <Surface id="the-house" tone="paper" rhythm="vast">
      {spaces.map((space, i) => {
        // The middle space inverts the split so the visual mass alternates sides and the
        // three spaces do not stack into one identical column.
        const flipped = i === 1;

        return (
          <article
            key={space.name}
            aria-label={space.name}
            className={i > 0 ? "mt-16 md:mt-28" : ""}
          >
            {/*
              The room frame ALWAYS takes the wide slot, so the split never inverts.

              Flipping it put the Villa's 2:3 portrait into the 8-column slot, where at
              845px wide it rendered 1,267px tall — one plate, 28% of this section, and the
              single largest contributor to the page's length. The alternation the flip was
              reaching for now comes from which edge bleeds, which costs no height at all.
            */}
            <Spread
              split="8/4"
              align="end"
              gap="gutter"
              bleed={flipped ? "right" : "none"}
              stagger
              // The room frame is `left` in every space, because Spread stacks in source
              // order below md and the room has to establish the place before the frame
              // that shows it occupied means anything.
              left={
                <Plate
                  slug={space.wide}
                  ratio="native"
                  sizes={SIZES_MAJOR}
                  reveal="wipe"
                  // A portrait frame at native ratio in the wide slot runs over 1,200px
                  // tall — the Villa has no landscape frame in the library at all. Cap it,
                  // but crop from the BOTTOM: a centred object-cover takes equal bites off
                  // the top and bottom and decapitates a standing subject, which the whole
                  // page otherwise refuses to do.
                  className="md:[&_img]:max-h-[74svh] md:[&_img]:object-cover md:[&_img]:object-[50%_18%]"
                />
              }
              right={
                <Plate
                  slug={space.tall}
                  ratio="native"
                  sizes={SIZES_MINOR}
                  reveal="wipe"
                  className="md:mt-14 md:[&_img]:max-h-[56svh] md:[&_img]:object-cover md:[&_img]:object-[50%_18%]"
                />
              }
            />

            {/*
              One naming formula, three entries — never three ad-hoc treatments.

              h2, not h3: this Surface emits no heading of its own, so an h3 here would
              follow the Cover's h1 with a level skipped. Every other beat titles itself
              at h2, which makes the three spaces siblings of the other sections rather
              than orphans. `size` still carries the visual scale, so nothing moves.

              The action label is the space's own name. The spec asked for "EXPLORE " +
              the name with "THE " stripped, but that is authored prose living in a
              section file, and `spaces` exports no verb to use instead. TextLink's arrow
              already supplies the go-affordance, and the href is the exported one.
            */}
            <Statement
              className="mt-8 md:mt-10"
              eyebrow={space.no}
              lines={[space.name]}
              size="lg"
              as="h2"
              lead={space.line}
              body={space.copy}
              action={{ label: space.name, href: space.href }}
              measure="normal"
            />
          </article>
        );
      })}
    </Surface>
  );
}
