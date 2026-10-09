import { Illustration, Logo } from "@/components/brand";
import { TextLink } from "@/components/editorial";
import { Photo } from "@/components/Photo";
import { Drift } from "@/components/motion/Drift";
import { Reveal } from "@/components/motion/Reveal";
import { closer, footer, nav, people } from "@/content/home";
import { photo } from "@/photos";
import subjectMask from "@/photos/masks/closer-subject.webp";

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
 * Where the photograph and the mask are cropped from. The same point for both — the
 * photograph's class repeats it as a literal — and it has to stay that way: the mask only lines up with the walker because both layers are
 * `cover`-fitted to the same box from the same point. Centred on her rather than the frame
 * (she walks slightly left of centre) so a phone's narrow crop keeps the swinging bag.
 */
const SCENE_POSITION = "46% 40%";

/**
 * The floor of the frame at a phone's crop, sampled from the photograph rather than taken
 * from the palette: below lg the footer's text runs on beneath the picture, and the
 * picture's own floor has to continue into it without a seam. Change the frame, resample.
 */
const FLOOR = "#e2d8c3";

/**
 * Beat 12 — the footer, set INSIDE the closing photograph.
 *
 * The frame is a figure walking toward the camera across an empty warm sweep, and the
 * footer is staged into it rather than stacked under it:
 *
 *   - OUTWEST, at the full width of the page, stands BEHIND her. The wordmark sits in a
 *     layer masked by her silhouette (src/photos/masks/closer-subject.webp — generated
 *     from this frame with macOS Vision subject lifting, inverted, so it is opaque
 *     everywhere except her), so she and the swinging bag pass in front of the letters.
 *     It drifts sideways across the scroll, like the display lines, while she does not.
 *   - Everything else — identity, the five destinations, the send-off, the copyright — is
 *     set in the open sweep around her. At lg and up it sits on the photograph; below lg
 *     there is no room beside her, so it runs on beneath, on the frame's own floor colour.
 *
 * WHY THE MASK IS A CSS MASK AND NOT A CUT-OUT LAYERED ON TOP. A cut-out photo on top of
 * the wordmark would cross it the moment the cut-out loaded later than the photograph
 * under it — the type would flash across her body. A mask image that has not loaded masks
 * EVERYTHING, so the wordmark simply is not there until it can be correct. No JavaScript.
 *
 * INK ONLY ON THE PHOTOGRAPH. The sweep is bright everywhere type is set: Ink measures
 * 11.1:1 in its darkest zone (top right) and 16:1 in its lightest. The tone's dim tier
 * would fall to ~3.4:1 there, so nothing on the frame uses it.
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
 * ⚠ page.tsx must NOT wrap `<Footer />` in a second `<footer>` — nested footers publish two
 * contentinfo landmarks.
 */
export function Footer() {
  /*
   * Not an invented year. Rule: no fabricated dates on the page — this one is read from the
   * clock at render, so it is either the build date (static) or today (dynamic), never a
   * guess typed into a string. It is also why no year appears on a single photograph: the
   * library records none.
   */
  const year = new Date().getFullYear();
  const mask = `url(${subjectMask.src})`;

  return (
    <footer data-tone="paper" className="relative text-ink" style={{ backgroundColor: FLOOR }}>
      {/* `overflow-clip`, not `overflow-hidden`: hidden would make this box a scroll
          container and strand the wordmark's view() timeline on a box that never scrolls.

          Capped at the viewport less the sticky masthead (89px once compact), so at the
          foot of the page the whole scene sits below the bar instead of under it. */}
      <div className="relative aspect-[4/5] w-full overflow-clip sm:aspect-[3/2] lg:max-h-[calc(100svh-6rem)]">
        <Photo
          photo={photo(closer.slug)}
          sizes="100vw"
          fill
          // Must match SCENE_POSITION. A literal, because Tailwind only sees class names
          // it can read in the source.
          className="object-cover [object-position:46%_40%]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskPosition: SCENE_POSITION,
            WebkitMaskPosition: SCENE_POSITION,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* At her hips: the letters pass behind her legs and the bag swinging at her
              side, which is where the depth reads most clearly. Symmetric drift, so an
              engine without scroll timelines shows it exactly centred. */}
          <Drift
            x={["-1rem", "1rem"]}
            className="absolute inset-x-4 top-[42%] md:inset-x-[5vw]"
          >
            <Logo mark="wordmark" className="block w-full" />
          </Drift>
        </div>

        {/* Joins the frame to the floor it runs on into below lg. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 lg:hidden"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${FLOOR})` }}
        />
      </div>

      {/*
       * Below lg: runs on beneath the photograph, on its floor. At lg and up: laid over the
       * photograph, in the open sweep either side of her. She occupies roughly 29–62% of
       * the frame's width, so the left three columns and the right three are always clear.
       */}
      <div className="px-4 pb-10 pt-4 md:px-[5vw] lg:absolute lg:inset-0 lg:flex lg:flex-col lg:py-[4vw]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-[2vw]">
          <Reveal i={0} className="lg:col-span-3">
            {/* The lockup carries the only accessible name down here; the giant wordmark
                and the yucca are decorative and stay hidden from screen readers. */}
            <Logo mark="lockup" title={footer.address[0]} className="w-40" />
            <p className="eyebrow mt-5">{footer.address[1]}</p>
          </Reveal>

          <Reveal i={1} className="lg:col-span-3 lg:col-start-10">
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
        </div>

        {/* Bottom left, in the brightest part of the sweep, under the bag. */}
        <Reveal i={2} className="mt-10 max-w-[34ch] lg:mt-auto lg:max-w-[24vw]">
          <p className="paragraph-header text-lg lg:text-xl">{people.lead}</p>
        </Reveal>

        {/* No rule above this line on the photograph: the floor is the ground it stands
            on, and a hairline would cut under her boots. `gap-4` and `shrink-0` keep a long
            owner name from squeezing the yucca — a mask has no intrinsic size to stop it.

            Static, not `rise`: this is the last line of the document, and the reveal
            observer ignores the bottom 8% of the viewport — on most screens the page runs
            out of scroll before the line ever clears it, so it would stay hidden for good. */}
        <Reveal gesture="none" className="mt-10 flex items-center justify-between gap-4 lg:mt-8">
          <Illustration name="yucca" className="w-6 shrink-0" />
          <p className="eyebrow">© {year} {footer.address[0]}</p>
        </Reveal>
      </div>
    </footer>
  );
}
