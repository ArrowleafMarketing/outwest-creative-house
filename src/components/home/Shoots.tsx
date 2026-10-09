import { Plate, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { madeOutWest, shoots, shootsIntro, spaces } from "@/content/home";
import { ShootFinder } from "./ShootFinder";

/**
 * The panel frame is a fixed 4:5 so the sheet holds its height while you move between
 * shoots — a native-ratio frame would make the whole panel jump between a 2:3 portrait
 * and a 2:1 room. ~28vw is the image column inside the 8/12 panel above md; the sheet is
 * full-bleed below md.
 */
const SIZES = "(min-width: 768px) 28vw, 100vw";

/**
 * Beat 08 — WHAT ARE YOU SHOOTING FOR?, and the page's third Alabaster return.
 *
 * NINE SHOOTS IN ONE VIEWPORT, not nine beats. Each shoot opens into a sheet rather than
 * scrolling past as its own spread, so a visitor reads the menu first and goes deep only
 * on the one they came for. It replaces the old two-column MADE OUT WEST run, which was
 * the longest stretch of scroll on the page; MadeOutWest.tsx is untouched and can go
 * back into page.tsx in one line.
 *
 * SERVER / CLIENT SPLIT. Every panel body is rendered HERE, on the server, and handed to
 * ShootFinder as finished output. That keeps Plate — and with it the photo index and
 * all 79 blur placeholders — out of the client bundle, which only carries the state and
 * the transition. A panel's photograph is not fetched until its panel opens.
 */
export function Shoots() {
  const panels = shoots.map((shoot) => {
    const credit = "credit" in shoot ? shoot.credit : undefined;
    const where = shoot.where
      .map((name) => spaces.find((space) => space.name === name))
      .filter((space) => space !== undefined);

    return (
      <div
        key={shoot.no}
        className="grid gap-8 md:grid-cols-[5fr_6fr] md:gap-[3vw] lg:gap-[4vw]"
      >
        <Plate slug={shoot.slug} ratio="4/5" focal={shoot.focal} sizes={SIZES} credit={credit} />

        <div className="flex flex-col">
          {/* No eyebrow: the sheet's own bar already prints NO. 01 / 09 above this. */}
          <Statement
            lines={[shoot.name]}
            size="md"
            as="h3"
            lead={shoot.lead}
            body={shoot.copy}
            measure="normal"
          />

          {/* An index, not a tag cloud: a hairline, then the rooms this shoot lives in,
              each one a link into its space. Structure draws before the names rise. */}
          <div className="mt-10">
            <Reveal gesture="draw" i={2} className="h-px w-full bg-rule" />
            <Reveal gesture="rise" i={3} className="pt-5">
              <p className="eyebrow text-on-ground-dim">{shootsIntro.where}</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {where.map((space) => (
                  <li key={space.name}>
                    <TextLink href={space.href} variant="rule">
                      {space.name}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal gesture="rise" i={4} className="mt-10 md:mt-auto md:pt-10">
            <TextLink href={shootsIntro.action.href} size="lg">
              {shootsIntro.action.label}
            </TextLink>
          </Reveal>
        </div>
      </div>
    );
  });

  return (
    <Surface id="what-are-you-shooting-for" tone="paper" rhythm="vast">
      <Statement
        eyebrow={shootsIntro.eyebrow}
        lines={shootsIntro.lines}
        size="xl"
        as="h2"
        lead={shootsIntro.lead}
      />

      <ShootFinder
        className="mt-12 md:mt-20"
        items={shoots.map(({ no, name }) => ({ no, name }))}
        panels={panels}
        nextLabel={shootsIntro.next}
      />

      {/* The full portfolio still has a door from the homepage. A TextLink, never a
          filled control — the one filled control on the site is BOOK in the Masthead. */}
      <Reveal gesture="rise" className="mt-16 text-center">
        <TextLink href={madeOutWest.action.href} size="lg">
          {madeOutWest.action.label}
        </TextLink>
      </Reveal>
    </Surface>
  );
}
