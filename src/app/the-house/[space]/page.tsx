import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Statement, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/pages/Band";
import { Gallery } from "@/components/pages/Gallery";
import { Index } from "@/components/pages/Index";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { SpaceCards } from "@/components/pages/SpaceCards";
import { PageShell } from "@/components/site/PageShell";
import { inquiryHref } from "@/content/book";
import { allSpaces, houseClose, spacePage, type SpaceKey } from "@/content/house";
import { photo } from "@/photos";

type Props = { params: Promise<{ space: string }> };

/** Three rooms, three pages, all prerendered. Anything else under /the-house/ is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allSpaces.map((space) => ({ space: space.key }));
}

function find(key: string) {
  return allSpaces.find((space) => space.key === (key as SpaceKey));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const space = find((await params).space);
  if (!space) return {};
  const name = space.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} · OutWest Creative House`,
    description: `${space.copy} ${space.body[0]}`,
  };
}

export default async function SpacePage({ params }: Props) {
  const space = find((await params).space);
  if (!space) notFound();

  // A 3:2 frame at full bleed is most of a viewport tall; crop it to a band. Anything
  // already letterbox-shaped runs native and loses nothing.
  const band = photo(space.band);
  const bandRatio = band.width / band.height >= 1.9 ? "native" : "2/1";

  const others = allSpaces.filter((s) => s.key !== space.key);

  return (
    <PageShell>
      <PageHeader
        eyebrow={space.no}
        lines={[space.name]}
        lead={space.line}
        body={space.body}
        slug={space.portrait}
        focal={"portraitFocal" in space ? space.portraitFocal : undefined}
        // `lg`, not `xl`: WAREHOUSE is one nine-letter word in a half-width column, and at
        // xl it breaks mid-word rather than wrapping.
        size="lg"
      />

      <Band slug={space.band} ratio={bandRatio} />

      <Surface tone="paper" rhythm="vast">
        <Reveal gesture="rise">
          <p className="eyebrow text-on-ground-dim">{`${spacePage.inside} ${space.name}`}</p>
        </Reveal>
        <Gallery
          items={space.gallery}
          rail={`${space.no} · ${space.name}`}
          className="mt-12 md:mt-16"
        />
      </Surface>

      {space.madeFor.length ? (
        <Surface tone="canvas" rhythm="vast">
          <Statement
            eyebrow={spacePage.madeFor}
            lines={[space.name]}
            size="lg"
            as="h2"
            lead={spacePage.madeForLead}
          />
          <Index
            className="mt-14 md:mt-20"
            entries={space.madeFor.map((shoot) => ({
              no: shoot.no,
              title: shoot.name,
              lead: shoot.lead,
              href: inquiryHref(`shoot-${shoot.no}`),
            }))}
          />
        </Surface>
      ) : null}

      <Surface tone="paper" rhythm="vast">
        <Reveal gesture="rise">
          <p className="eyebrow text-on-ground-dim">{spacePage.otherRooms}</p>
        </Reveal>
        <SpaceCards spaces={others} className="mt-12 md:mt-16" />
      </Surface>

      <Invitation
        tone="canvas"
        eyebrow={houseClose.eyebrow}
        lines={houseClose.lines}
        action={spacePage.action}
      />
    </PageShell>
  );
}
