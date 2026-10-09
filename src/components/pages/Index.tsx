import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type IndexEntry = {
  no: string;
  title: string;
  lead?: string;
  copy?: string;
  href?: string;
};

/** Same rule as TextLink: in-page anchors must be native so a repeat click still scrolls. */
function anchorFor(href: string) {
  return href.startsWith("#") ? "a" : Link;
}

/**
 * A hairline-ruled, numbered index — the homepage's membership-tier device, generalised.
 * Used wherever a page lists a small set of things (pillars, steps, shoots) so that none of
 * them turn into cards.
 *
 * Rules are elements, not borders, so they can `draw`; each row's content rises behind its
 * own rule. Structure first, then content — the same typesetter's order as the homepage.
 */
export function Index({ entries, className }: { entries: readonly IndexEntry[]; className?: string }) {
  return (
    <div className={className}>
      {entries.map((entry, i) => {
        const Anchor = entry.href ? anchorFor(entry.href) : null;
        return (
        <div key={entry.no}>
          <Reveal gesture="draw" i={i} className="h-px w-full bg-rule" />
          <Reveal
            gesture="rise"
            i={i + 1}
            className="group grid grid-cols-1 items-baseline gap-3 py-8 md:grid-cols-12 md:gap-6 md:py-10"
          >
            <span className="eyebrow text-on-ground-dim md:col-span-2">{entry.no}</span>
            <h3 className="font-display text-2xl uppercase tracking-display md:col-span-4">
              {entry.href && Anchor ? (
                // Not a TextLink: that component is eyebrow type by construction, and this
                // is a display title that happens to be a link. Same hairline, same timing.
                <Anchor
                  href={entry.href}
                  className="relative inline-flex items-baseline gap-3 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-60 after:transition-transform after:duration-[420ms] after:ease-[var(--ease-editorial)] group-hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current focus-visible:after:scale-x-100"
                >
                  {entry.title}
                  <span
                    aria-hidden="true"
                    className="font-sans text-base transition-transform duration-[240ms] ease-[var(--ease-editorial)] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Anchor>
              ) : (
                entry.title
              )}
            </h3>
            {entry.lead ? (
              <p className={`paragraph-header text-on-ground ${entry.copy ? "md:col-span-3" : "md:col-span-6"}`}>
                {entry.lead}
              </p>
            ) : null}
            {entry.copy ? (
              <p
                className={`font-sans text-sm leading-[1.7] text-on-ground-dim ${entry.lead ? "md:col-span-3" : "md:col-span-6"}`}
              >
                {entry.copy}
              </p>
            ) : null}
          </Reveal>
        </div>
        );
      })}
      <Reveal gesture="draw" i={entries.length} className="h-px w-full bg-rule" />
    </div>
  );
}
