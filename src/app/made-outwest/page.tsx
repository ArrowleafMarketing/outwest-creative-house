import type { Metadata } from "next";
import { Statement, Surface } from "@/components/editorial";
import { Gallery } from "@/components/pages/Gallery";
import { Index } from "@/components/pages/Index";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { PageShell } from "@/components/site/PageShell";
import { aroundTheHouse, series, workClose, workIntro } from "@/content/work";
import { bySeries } from "@/photos";

export const metadata: Metadata = {
  title: "Made OutWest · OutWest Creative House",
  description:
    "Campaigns, editorials, portraits and product work made at OutWest Creative House in Boise, Idaho.",
};

/**
 * Frames read live from the library by series. Wide `place` frames inside a series are the
 * set rather than the work (Denim Daze's sofa-and-lighting frame), so they stay out.
 */
const shoots = series.map((s) => ({
  ...s,
  items: bySeries(s.series)
    .filter((p) => p.category !== "place")
    .map((p) => ({ slug: p.slug })),
}));

/**
 * The full portfolio, one shoot at a time. Grounds alternate paper / canvas down the page,
 * so each shoot is a chapter with its own ground rather than one continuous wall of plates —
 * the "busy grid of tiny photographs" the direction rules out.
 *
 * The index at the top is the only navigation: anchors into each chapter, with a real frame
 * count beside each name.
 */
export default function MadeOutWestPage() {
  const chapters = [
    ...shoots.map((s) => ({ id: s.id, name: s.name, kind: s.kind, line: s.line, items: s.items })),
    {
      id: aroundTheHouse.id,
      name: aroundTheHouse.name,
      kind: undefined,
      line: aroundTheHouse.line,
      items: aroundTheHouse.items,
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow={workIntro.eyebrow}
        lines={workIntro.lines}
        lead={workIntro.lead}
        body={workIntro.body}
        size="colossal"
      />

      <Surface tone="paper" rhythm="tight" label={workIntro.indexLabel}>
        <p className="eyebrow text-on-ground-dim">{workIntro.indexLabel}</p>
        <Index
          className="mt-8"
          entries={chapters.map((c, i) => ({
            no: String(i + 1).padStart(2, "0"),
            title: c.name,
            lead: c.line,
            copy: [c.kind, `${c.items.length} frames`].filter(Boolean).join(" · "),
            href: `#${c.id}`,
          }))}
        />
      </Surface>

      {chapters.map((chapter, i) => (
        <Surface
          key={chapter.id}
          id={chapter.id}
          tone={i % 2 === 0 ? "canvas" : "paper"}
          rhythm="vast"
          className="scroll-mt-20"
        >
          <Statement
            eyebrow={chapter.kind ?? String(i + 1).padStart(2, "0")}
            lines={[chapter.name]}
            size="lg"
            as="h2"
            lead={chapter.line}
          />
          <Gallery items={chapter.items} rail={chapter.name} className="mt-14 md:mt-20" />
        </Surface>
      ))}

      <Invitation lines={workClose.lines} action={workClose.action} />
    </PageShell>
  );
}
