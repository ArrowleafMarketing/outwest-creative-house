import { Illustration, Logo } from "@/components/brand";
import { Surface, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { footer, nav, people } from "@/content/home";

/**
 * ⚠ TWO FIELDS THIS BEAT NEEDS AND src/content/home.ts DOES NOT EXPORT.
 *
 * 1. CONTACT AND SOCIAL. The spec gives these their own column (grid columns 8–10) as
 *    plain text links. There is no email, no phone and no social handle anywhere in
 *    src/content/home.ts, and an href is the one thing a section file may never invent —
 *    a footer link that 404s or points at the wrong Instagram is worse than no link.
 *    The column is therefore absent, not faked. When `footer.contact` lands it drops
 *    into the gap at `md:col-span-3 md:col-start-8` and nothing else here moves.
 *
 *    NOT the same thing as `footer.columns`, which the content file DOES export and which
 *    is deliberately unread here. It is eight links in three titled groups, and seven of
 *    its eight destinations already appear in `nav` or under it. Rendering it would build
 *    exactly the sitemap wall this beat's spec rules out, twice over.
 *
 * 2. THE SEND-OFF. The spec's line is "Come make something here." — four words, which is
 *    why it was given a two-column slot. The nearest thing the content file exports is
 *    `people.lead`, used here in its place, and the slot is widened into the space the
 *    missing contact column leaves because 62 characters will not set in two columns.
 *    A `footer.sendoff` field restores the authored `md:col-span-2 md:col-start-11`.
 *
 *    This is the sentence's ONLY printing on the page — People.tsx sets `people.lines`
 *    and deliberately withholds `people.lead` for exactly this reason. The two files are
 *    coupled by that omission: whoever adds `footer.sendoff` must also hand `people.lead`
 *    back to the People beat, or the sentence disappears from the site entirely.
 */

/**
 * Beat 12 — the footer, and the page's second and final Ink ground.
 *
 * DELIBERATELY MINIMAL: no newsletter box, no amenity list, no FAQ, no sitemap wall. BOOK
 * does not reappear here either — it is permanent in the masthead, and a second filled
 * control would cost the first one its weight. Everything below is a text link.
 *
 * THE NAV COLUMN READS THE SAME `nav` ARRAY THE MASTHEAD DOES, which is the point rather
 * than a convenience: docs/DIRECTION.md conflict #2 leaves these five labels open and they
 * become URLs. Two hand-maintained lists of the same destinations drift, and the drift
 * shows up as a dead footer link months later. One edit updates both.
 *
 * It is a `ul`, not a `nav`. The masthead already publishes two navigation landmarks; a
 * third carrying the identical five destinations makes the landmark list worse, not better.
 *
 * TONE TOKENS ONLY. On Ink, Alabaster measures 17.49:1 and River Clay 6.27:1 — this is the
 * one ground where the dim tier is genuinely a second readable level rather than a second
 * run of near-black, which is the payoff for making it tone-dependent in globals.css.
 *
 * THE `<footer>` WRAPPER IS THE LANDMARK, and it is here rather than in page.tsx so this
 * component is correct wherever it is mounted. Surface renders a `<section>`, which is a
 * region and not a `contentinfo`, so without the wrapper the page would ship with no
 * footer landmark at all. Surface is given no `label` for the same reason: an unnamed
 * `<section>` is a generic container, so the tree reads contentinfo → content, with no
 * redundant same-named region inside it. ⚠ page.tsx must NOT wrap `<Footer />` in a second
 * `<footer>` — nested footers publish two contentinfo landmarks.
 */
export function Footer() {
  /*
   * Not an invented year. Rule: no fabricated dates on the page — this one is read from the
   * clock at render, so it is either the build date (static) or today (dynamic), never a
   * guess typed into a string. It is also why no year appears on a single photograph: the
   * library records none.
   */
  const year = new Date().getFullYear();

  return (
    <footer>
      <Surface tone="ink" rhythm="tight">
        {/* Stacks in source order below md: identity, then destinations, then the send-off —
            which is the order it should be read in on a phone, so no reordering is needed. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal i={0} className="md:col-span-4">
            {/* The lockup carries the only accessible name down here; the yucca below is
                decorative and stays hidden from screen readers. */}
            <Logo mark="lockup" title={footer.address[0]} className="w-44 text-on-ground" />
            <p className="eyebrow mt-6 text-on-ground-dim">{footer.address[1]}</p>
          </Reveal>

          <Reveal i={1} className="md:col-span-3 md:col-start-5">
            {/* `space-y-3` needs block children: TextLink is inline-flex, and vertical
                margin on an inline-level box does not open the line box. The `li` spaces. */}
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} variant="plain" size="eyebrow">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Spans 8–12 rather than the authored 11–12: see note 2 above. It still closes on
              the grid's right edge, which is the part of the composition that matters. */}
          <Reveal i={2} className="md:col-span-5 md:col-start-8">
            <p className="paragraph-header text-on-ground">{people.lead}</p>
          </Reveal>
        </div>

        {/* An element, not `border-t`. `draw` is a scaleX transform and a border cannot
            carry one, so a bordered divider would be the only hairline on the page that
            simply appears. This is the page-wide pattern (Cover, Booking, People,
            Collective, Icons). With motion off it paints as a plain 1px rule. */}
        <Reveal gesture="draw" i={3} className="mt-16 h-px w-full bg-rule" />

        {/* Last index in the beat, so the yucca is the last thing to land rather than the
            first — structure, then content, then the mark.

            `gap-4` and `shrink-0`: at 390px the copyright line is ~300px of tracked caps
            and the mark is 24px. They fit, but only just, and `justify-between` alone would
            let a longer owner-supplied name squeeze the mask element toward zero width —
            a mask has no intrinsic size to stop it. The gap is the guard, not a nicety. */}
        <Reveal i={4} className="flex items-center justify-between gap-4 pt-8">
          <Illustration name="yucca" className="w-6 shrink-0 text-on-ground-dim" />
          <p className="eyebrow text-on-ground-dim">© {year} {footer.address[0]}</p>
        </Reveal>
      </Surface>
    </footer>
  );
}
