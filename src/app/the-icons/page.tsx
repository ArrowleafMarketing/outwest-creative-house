import type { Metadata } from "next";
import { Plate, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { PageShell } from "@/components/site/PageShell";
import { allIcons, iconsClose, iconsPage } from "@/content/icons";

export const metadata: Metadata = {
  title: "The Icons · OutWest Creative House",
  description:
    "An OutWest original — an ongoing portrait series of the photographers, founders, makers and artists who work in the house.",
};

/** Three across inside the 90vw measure with 4vw gaps ≈ 27vw; two across ≈ 43vw. */
const SIZES = "(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 100vw";

/**
 * The magazine, inside the site. Ink from the title through the whole index, as the
 * homepage beat is — then a hard cut back to paper for the sign-off, so the page does not
 * run straight into the Ink footer as one undifferentiated block.
 *
 * The index is a three-column hang rather than a grid: the middle column drops, the third
 * drops less, so each row of portraits reads as a spread rather than as a contact sheet.
 * Every frame is 2:3 and set at native ratio — nothing is cropped.
 *
 * Every plate is a <figure>, none is a link: the profiles do not exist yet.
 */
export default function TheIconsPage() {
  const total = String(allIcons.length).padStart(2, "0");

  return (
    <PageShell>
      <PageHeader
        tone="ink"
        eyebrow={iconsPage.eyebrow}
        lines={iconsPage.lines}
        lead={iconsPage.lead}
        body={iconsPage.body}
        size="colossal"
      />

      <Surface tone="ink" rhythm="vast" className="pt-0 md:pt-0">
        <div className="flex items-center gap-6">
          <Reveal gesture="rise" i={1} as="span" className="eyebrow shrink-0 text-on-ground-dim">
            {`${iconsPage.indexLabel} · ${total}`}
          </Reveal>
          <Reveal gesture="draw" i={0} as="span" className="block h-px flex-1 bg-rule" />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-[4vw] gap-y-16 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-y-24 lg:[&>li:nth-child(3n+2)]:mt-28 lg:[&>li:nth-child(3n)]:mt-12">
          {allIcons.map((icon, i) => (
            <li key={icon.slug}>
              <Plate
                slug={icon.slug}
                sizes={SIZES}
                index={icon.no}
                credit={"credit" in icon ? icon.credit : undefined}
                kind={iconsPage.status}
                drift={i % 2 === 0 ? "down" : "up"}
              />
            </li>
          ))}
        </ul>
      </Surface>

      <Invitation
        eyebrow={iconsClose.eyebrow}
        lines={iconsClose.lines}
        lead={iconsClose.lead}
        action={iconsClose.action}
      />
    </PageShell>
  );
}
