import type { Metadata } from "next";
import { Plate, Spread, Statement, Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/pages/Band";
import { Index } from "@/components/pages/Index";
import { Invitation } from "@/components/pages/Invitation";
import { PageHeader } from "@/components/pages/PageHeader";
import { PageShell } from "@/components/site/PageShell";
import { inquiryHref } from "@/content/book";
import {
  collectiveClose,
  collectiveIntro,
  collectiveTiers,
  pillars,
  tierPage,
} from "@/content/collective";

export const metadata: Metadata = {
  title: "The Collective · OutWest Creative House",
  description:
    "The OutWest Collective — membership for photographers, creators and brands who want a creative home base in Boise, Idaho.",
};

type Tier = (typeof collectiveTiers)[number];

/**
 * One tier as an editorial spread, never a pricing card. The emotional case comes first —
 * who it is for, what it changes — and it ends in a conversation, because there is no
 * number to print yet. `scroll-mt` clears the sticky masthead when the homepage deep-links
 * to #creator / #brand-builder / #studio-partner.
 */
function TierDetail({ tier, i }: { tier: Tier; i: number }) {
  const flipped = i % 2 === 1;

  const plate = (
    <Plate
      slug={tier.slug}
      ratio="4/5"
      focal={tier.focal}
      sizes="(min-width: 768px) 38vw, 100vw"
      drift="down"
    />
  );

  const text = (
    <div>
      <Statement
        eyebrow={tier.no}
        lines={[tier.name]}
        size="lg"
        as="h2"
        lead={tier.lead}
        body={tier.copy}
      />
      <Reveal gesture="draw" i={3} className="mt-10 h-px w-full bg-rule" />
      <Reveal gesture="rise" i={4} className="pt-5">
        <p className="eyebrow text-on-ground-dim">{tierPage.builtFor}</p>
        <p className="paragraph-header mt-3 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.375rem)] text-on-ground">
          {tier.builtFor}
        </p>
        <p className="mt-6 max-w-[46ch] font-sans text-sm leading-[1.7] text-on-ground-dim">
          {tierPage.pricing}
        </p>
        <div className="mt-8">
          <TextLink href={inquiryHref(`membership-${tier.id}`)} size="lg">
            {`${tierPage.ask} ${tier.name}`}
          </TextLink>
        </div>
      </Reveal>
    </div>
  );

  return (
    <article id={tier.id} aria-label={tier.name} className={`scroll-mt-28 ${i > 0 ? "mt-24 md:mt-36" : ""}`}>
      <Spread
        split={flipped ? "7/5" : "5/7"}
        align="center"
        gap="wide"
        left={flipped ? text : plate}
        right={flipped ? plate : text}
        // The photograph leads on a phone whichever side it hangs on above md.
        className={flipped ? "[&>*:first-child]:order-2 md:[&>*:first-child]:order-none" : ""}
      />
    </article>
  );
}

/**
 * Tonal order: paper header · band · paper pillars · CANVAS tiers · OLIVE close · ink footer.
 * One Canvas, one Olive — the homepage's rule that each dark or warm ground appears once.
 */
export default function TheCollectivePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow={collectiveIntro.eyebrow}
        lines={collectiveIntro.lines}
        lead={collectiveIntro.lead}
        body={collectiveIntro.body}
        slug={collectiveIntro.slug}
        size="lg"
      />

      <Band slug={collectiveIntro.band} ratio="2/1" drift="left" />

      <Surface tone="paper" rhythm="vast">
        <Statement eyebrow={pillars.eyebrow} lines={pillars.lines} size="xl" as="h2" />
        <Index entries={pillars.entries} className="mt-16 md:mt-24" />
      </Surface>

      <Surface tone="canvas" rhythm="vast" label={tierPage.label}>
        {collectiveTiers.map((tier, i) => (
          <TierDetail key={tier.id} tier={tier} i={i} />
        ))}
      </Surface>

      <Invitation
        tone="olive"
        eyebrow={collectiveClose.eyebrow}
        lines={collectiveClose.lines}
        action={{
          label: collectiveClose.action.label,
          href: inquiryHref(collectiveClose.action.value),
        }}
      />
    </PageShell>
  );
}
