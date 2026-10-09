import type { Metadata } from "next";
import { Spread, Statement, Surface } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/pages/PageHeader";
import { SpaceCards } from "@/components/pages/SpaceCards";
import { PageShell } from "@/components/site/PageShell";
import { bookIntro, bookRooms, form, howItWorks, inquiryOptions, privateClaim, steps } from "@/content/book";
import { allSpaces } from "@/content/house";
import { InquiryForm } from "./InquiryForm";

export const metadata: Metadata = {
  title: "Book · OutWest Creative House",
  description:
    "Book OutWest Creative House in Boise, Idaho. Every booking is private — the entire house is yours.",
};

type Props = { searchParams: Promise<{ for?: string | string[] }> };

/**
 * The one transactional page. Everything else on the site sells the feeling; this is where
 * the information lives — so it is the plainest page, and the form sits high.
 *
 * `?for=` preselects the request type, so every "BOOK THIS SHOOT" / "ASK ABOUT CREATOR" link
 * on the site lands with its context already chosen. Only known values are honoured.
 *
 * The form sits on paper, not canvas, on purpose: its error colour (Adobe) measures 5.3:1 on
 * Alabaster and only 4.3:1 on Canvas.
 */
export default async function BookPage({ searchParams }: Props) {
  const raw = (await searchParams).for;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const defaultFor = inquiryOptions.some((o) => o.value === requested) ? requested : undefined;

  return (
    <PageShell>
      <PageHeader
        eyebrow={bookIntro.eyebrow}
        lines={bookIntro.lines}
        lead={bookIntro.lead}
        slug={bookIntro.slug}
        focal={bookIntro.focal}
        size="lg"
      />

      <Surface id="inquiry" tone="paper" rhythm="vast" className="scroll-mt-20 pt-0 md:pt-0">
        <Spread
          split="4/8"
          gap="wide"
          align="start"
          left={
            <div>
              <Reveal gesture="rise">
                <h2 className="eyebrow mb-6 text-on-ground-dim">{howItWorks}</h2>
              </Reveal>
              <ol>
                {steps.map((step, i) => (
                  <li key={step.no}>
                    <Reveal gesture="draw" i={i} className="h-px w-full bg-rule" />
                    <Reveal gesture="rise" i={i + 1} className="py-7">
                      <p className="eyebrow text-on-ground-dim">{step.no}</p>
                      <h3 className="mt-3 font-display text-xl uppercase tracking-display">{step.title}</h3>
                      <p className="mt-3 font-sans text-sm leading-[1.7] text-on-ground-dim">{step.copy}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <Reveal gesture="draw" i={steps.length} className="h-px w-full bg-rule" />
              <Reveal gesture="rise" i={4} className="mt-10">
                <p className="paragraph-header text-[clamp(1.15rem,1.8vw,1.5rem)] text-on-ground">
                  {privateClaim}
                </p>
              </Reveal>
            </div>
          }
          right={
            <div>
              <Statement eyebrow={form.eyebrow} lines={[form.heading]} size="md" as="h2" />
              <div className="mt-10 md:mt-14">
                <InquiryForm
                  copy={form}
                  options={inquiryOptions}
                  spaces={allSpaces.map(({ key, name }) => ({ key, name }))}
                  defaultFor={defaultFor}
                />
              </div>
            </div>
          }
        />
      </Surface>

      <Surface tone="canvas" rhythm="vast">
        <Statement eyebrow={bookRooms.eyebrow} lines={bookRooms.lines} size="xl" as="h2" />
        <SpaceCards spaces={allSpaces} className="mt-14 md:mt-20" />
      </Surface>
    </PageShell>
  );
}
