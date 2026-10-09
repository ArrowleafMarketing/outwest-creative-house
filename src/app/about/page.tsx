import type { Metadata } from "next";
import { Fragment } from "react";
import { Illustration } from "@/components/brand";
import { Plate, Spread, Statement, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/pages/Band";
import { Index } from "@/components/pages/Index";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { PageShell } from "@/components/site/PageShell";
import { aboutIntro, aboutManifesto, purpose, triad, visit, yuccaStory } from "@/content/about";
import { inquiryHref } from "@/content/book";

export const metadata: Metadata = {
  title: "About · OutWest Creative House",
  description:
    "OutWest is a creative house in Boise, Idaho — a place for independent creatives, brands and businesses to make work that gets remembered.",
};

/**
 * Tonal order: paper header · paper manifesto · CANVAS triad · paper purpose · OLIVE yucca
 * · band · paper close · ink footer. The yucca gets the one Olive ground because it is the
 * brand's symbol and the only beat here that is a single object on an empty field.
 */
export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow={aboutIntro.eyebrow}
        lines={aboutIntro.lines}
        lead={aboutIntro.lead}
        slug={aboutIntro.slug}
        focal={aboutIntro.focal}
        size="lg"
      />

      <Surface tone="paper" rhythm="vast">
        <Spread
          split="5/7"
          align="center"
          gap="wide"
          left={
            <Plate
              slug={aboutManifesto.slug}
              sizes="(min-width: 768px) 34vw, 100vw"
              drift="down"
              className="md:[&_img]:max-h-[80svh] md:[&_img]:object-cover"
            />
          }
          right={
            <Statement
              eyebrow={aboutManifesto.eyebrow}
              lines={aboutManifesto.lines}
              size="lg"
              as="h2"
              body={aboutManifesto.body}
            />
          }
        />
      </Surface>

      <Surface tone="canvas" rhythm="vast">
        <Statement
          eyebrow={triad.eyebrow}
          lines={triad.lines}
          size="xl"
          as="h2"
          lead={triad.lead}
          measure="wide"
        />
        <Index entries={triad.entries} className="mt-16 md:mt-24" />
      </Surface>

      <Surface tone="paper" rhythm="vast">
        <Spread
          split="6/6"
          gap="wide"
          stagger
          left={
            <Statement
              eyebrow={purpose.mission.eyebrow}
              lead={purpose.mission.lead}
              measure="normal"
            />
          }
          right={
            <Statement
              eyebrow={purpose.vision.eyebrow}
              lead={purpose.vision.lead}
              measure="normal"
            />
          }
        />
      </Surface>

      <Surface tone="olive" rhythm="vast">
        <Reveal gesture="rise" className="flex justify-center">
          {/* Decorative: the heading beside it carries the meaning. */}
          <Illustration name="yucca" className="w-20 text-on-ground md:w-28" />
        </Reveal>
        <Statement
          className="mt-12"
          eyebrow={yuccaStory.eyebrow}
          lines={yuccaStory.lines}
          size="xl"
          as="h2"
          align="center"
          lead={yuccaStory.lead}
          body={yuccaStory.body}
        />
        <Reveal gesture="draw" origin="left" className="mx-auto mt-14 h-px w-16 bg-rule" />
        <Reveal gesture="rise" i={1} className="mt-8">
          <p className="eyebrow mx-auto max-w-[62ch] text-center text-on-ground-dim">
            {yuccaStory.values.map((value, i) => (
              <Fragment key={value}>
                {i > 0 ? (
                  <>
                    {" "}
                    <span aria-hidden="true">·</span>{" "}
                  </>
                ) : null}
                <span className="inline-block">{value}</span>
              </Fragment>
            ))}
          </p>
        </Reveal>
      </Surface>

      <Band slug={visit.band} />

      <Invitation
        eyebrow={visit.eyebrow}
        lines={visit.lines}
        action={{ label: visit.action.label, href: inquiryHref(visit.action.value) }}
      />
    </PageShell>
  );
}
