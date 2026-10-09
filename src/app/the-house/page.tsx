import type { Metadata } from "next";
import { Plate, Spread, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { Scale } from "@/components/home/Scale";
import { Band } from "@/components/pages/Band";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { PageShell } from "@/components/site/PageShell";
import { allSpaces, details, houseClose, houseIntro } from "@/content/house";

export const metadata: Metadata = {
  title: "The House · OutWest Creative House",
  description:
    "The Warehouse, the Villa and the Creative Lounge — three distinct spaces under one roof in Boise, Idaho, and every booking takes the whole house.",
};

/** Spread at `gutter`: a 7-span is ~51vw and a 5-span ~35vw inside the 90vw measure. */
const SIZES_CARD = "(min-width: 768px) 54vw, 100vw";
const SIZES_DETAIL = "(min-width: 768px) 26vw, 70vw";

type Space = (typeof allSpaces)[number];

/**
 * One space on the index: the room large, a detail of it small, and the module —
 * number, name, line, copy, what it's best for, a way in. Alternate spaces swap sides so
 * the three read as a sequence rather than a stack.
 */
function SpaceModule({ space, i }: { space: Space; i: number }) {
  const flipped = i % 2 === 1;

  const card = (
    <Plate
      slug={space.card}
      sizes={SIZES_CARD}
      drift={flipped ? "left" : "right"}
      // It bleeds to the viewport edge, so the frame must hold still — a sideways-
      // travelling frame pushes 1rem past the edge and scrolls the page horizontally.
      anchored
      className="md:[&_img]:max-h-[82svh] md:[&_img]:object-cover"
    />
  );

  const text = (
    <div>
      <Statement
        eyebrow={space.no}
        lines={[space.name]}
        size="lg"
        as="h2"
        lead={space.line}
        body={space.copy}
      />

      <Reveal gesture="draw" i={3} className="mt-10 h-px w-full bg-rule" />
      <Reveal gesture="rise" i={4} className="pt-5">
        <p className="eyebrow text-on-ground-dim">{houseIntro.bestFor}</p>
        <ul className="mt-4 space-y-2">
          {space.madeFor.map((shoot) => (
            <li key={shoot.no} className="paragraph-header text-on-ground">
              {shoot.name.toLowerCase()}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TextLink href={space.href} size="lg">
            {`${houseIntro.explore} ${space.name}`}
          </TextLink>
        </div>
      </Reveal>

      <Plate
        slug={space.detail}
        sizes={SIZES_DETAIL}
        drift="down"
        className={`mt-14 w-[70%] ${flipped ? "me-auto" : "ms-auto"}`}
      />
    </div>
  );

  return (
    <article aria-label={space.name} className={i > 0 ? "mt-24 md:mt-40" : ""}>
      {/* The room always comes first on a phone; on a desktop the odd space puts it right. */}
      <Spread
        split={flipped ? "5/7" : "7/5"}
        align="start"
        gap="gutter"
        bleed={flipped ? "right" : "left"}
        left={flipped ? text : card}
        right={flipped ? card : text}
        className={flipped ? "[&>*:first-child]:order-2 md:[&>*:first-child]:order-none" : ""}
      />
    </article>
  );
}

export default function TheHousePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow={houseIntro.eyebrow}
        lines={houseIntro.lines}
        lead={houseIntro.lead}
        body={houseIntro.body}
        size="colossal"
      />

      <Band slug={houseIntro.band} ratio="2/1" focal="50% 60%" />

      <Surface tone="paper" rhythm="vast">
        {allSpaces.map((space, i) => (
          <SpaceModule key={space.key} space={space} i={i} />
        ))}
      </Surface>

      <Scale />

      <Surface tone="canvas" rhythm="vast">
        <Statement
          eyebrow={details.eyebrow}
          lines={details.lines}
          size="xl"
          as="h2"
          lead={details.lead}
        />
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-[4vw]">
          {details.frames.map((frame, i) => (
            <Plate
              key={frame.slug}
              slug={frame.slug}
              sizes="(min-width: 768px) 40vw, 100vw"
              drift={i % 2 ? "up" : "down"}
              className={frame.width}
            />
          ))}
        </div>
      </Surface>

      <Invitation
        eyebrow={houseClose.eyebrow}
        lines={houseClose.lines}
        action={houseClose.action}
      />
    </PageShell>
  );
}
