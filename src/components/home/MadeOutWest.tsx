import { Plate, Spread, Statement, Surface, TextLink } from "@/components/editorial";
import type { PlateDrift } from "@/components/editorial/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { madeOutWest, work } from "@/content/home";

type WorkEntry = (typeof work)[number];

/**
 * A full column is 6 of 12 inside a 5vw page gutter and a 7vw grid gap. With
 * grid-cols-12 the eleven internal gaps leave 13vw for the twelve tracks, so a
 * col-span-6 slot measures 6·(13/12) + 5·7 = 41.5vw. 46vw is the figure the rest of
 * the page states for that slot and it is kept here: `sizes` that overstates costs a
 * slightly larger variant, `sizes` that understates ships a blurry plate.
 */
const COLUMN_SIZES = "46vw";

/**
 * But almost none of these plates fill their column — each one is hung at an authored
 * percentage so that no two align across the gutter, and a `w-[60%]` plate declaring
 * the full 46vw ships roughly four times the pixels it can show. The percentages are
 * authored in content/home.ts, so the rendered width is knowable here rather than
 * guessed; anything not listed falls back to the full column, which is the safe
 * direction to be wrong in.
 */
const WIDTH_SIZES: Record<string, string> = {
  "w-full": COLUMN_SIZES,
  "w-[92%]": "43vw",
  "w-[86%]": "40vw",
  "w-[78%]": "36vw",
  "w-[72%]": "34vw",
  "w-[70%]": "33vw",
  "w-[64%]": "30vw",
  "w-[60%]": "28vw",
};

function columnSizes(width: string) {
  return `(min-width: 768px) ${WIDTH_SIZES[width] ?? COLUMN_SIZES}, 100vw`;
}

/**
 * The phone stack is one column of full-width plates inside a 16px gutter, and it never
 * renders at md and up — so it has one honest width and no breakpoint clause.
 */
const MOBILE_SIZES = "100vw";

/**
 * The vertical edge label, and the third and final `rail` on the page. A device used a
 * fourth time is a pattern, not a device. Composed from the two authored strings rather
 * than written out, so a rename in content/home.ts carries here.
 */
const RAIL = `${madeOutWest.lines[0]} · ${madeOutWest.eyebrow}`;

const leftColumn = work.filter((entry) => entry.column === 0);
const rightColumn = work.filter((entry) => entry.column === 1);

/**
 * The phone order is authored, not inherited. Spread stacks its slots in source order
 * below md, which would read as five lefts then five rights — the same ten frames in the
 * one sequence that hides the range. Interleaving by index keeps a phone alternating
 * between the two halves of the argument, and the loop survives the uneven columns that
 * appending a plate will eventually produce.
 */
const interleaved: WorkEntry[] = [];
for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i += 1) {
  if (leftColumn[i]) interleaved.push(leftColumn[i]);
  if (rightColumn[i]) interleaved.push(rightColumn[i]);
}

/**
 * Absent `credit` means metadata.ts records no `series` for that frame. Read through `in`
 * rather than widening the entry type, so adding a plate without a series stays a
 * compile-time truth instead of an optional field someone can fill in by hand.
 */
function creditOf(entry: WorkEntry) {
  return "credit" in entry ? entry.credit : undefined;
}

/**
 * Read as a cycle by position, so adjacent plates — down a column, across the gutter,
 * and in the interleaved phone order — never travel the same way.
 */
const DRIFT_CYCLE: readonly PlateDrift[] = ["down", "right", "down", "left"];
function driftAt(n: number) {
  return DRIFT_CYCLE[n % DRIFT_CYCLE.length];
}

function WorkPlate({
  entry,
  sizes,
  rail,
  drift,
  className,
}: {
  entry: WorkEntry;
  sizes: string;
  rail?: string;
  drift: PlateDrift;
  className?: string;
}) {
  return (
    <Plate
      slug={entry.slug}
      ratio="native"
      sizes={sizes}
      credit={creditOf(entry)}
      kind={entry.kind}
      rail={rail}
      drift={drift}
      className={className}
    />
  );
}

function Column({
  items,
  rail,
  offset = 0,
}: {
  items: readonly WorkEntry[];
  rail?: string;
  /** Shifts the drift cycle so this column's plates oppose the other column's. */
  offset?: number;
}) {
  return (
    <>
      {items.map((entry, i) => (
        <WorkPlate
          key={entry.slug}
          entry={entry}
          sizes={columnSizes(entry.width)}
          rail={i === 0 ? rail : undefined}
          drift={driftAt(i + offset)}
          // `width` is a percentage of the column and `align` decides which edge it hangs
          // from, both authored per frame in content/home.ts. That pairing — not the
          // grid — is what guarantees nothing lines up across the gutter.
          className={`${entry.width} ${entry.align === "end" ? "ms-auto" : "me-auto"}`}
        />
      ))}
    </>
  );
}

/**
 * Beat 08 — the work, and the page's third Alabaster return.
 *
 * NOT A PORTFOLIO GRID. A grid flattens ten photographs into ten equal claims, and the
 * lead's whole argument is that they are not equal. The magazine rhythm here is LAYOUT
 * rather than differential scroll rate: a static 12rem column offset, a hand-authored
 * width per plate, and each photograph drifting a few percent inside its own frame, in a
 * direction opposed to its neighbours. Pure CSS, zero JavaScript, and perfectly still
 * under prefers-reduced-motion.
 *
 * THE RANGE IS THE ARGUMENT, so the selection in content/home.ts is deliberately
 * incompatible with itself — warm cream western beside a black-and-white group beside a
 * hot orange product stripe beside a blazer-and-laptop portrait. A tighter selection
 * drawn from two adjacent series would look more coherent and would argue the opposite of
 * the headline above it.
 *
 * TEN IS A CEILING, NOT A TARGET. Copying a luxury house's density with a library this
 * size exposes how thin it still is: better a tenth of the work large than a third of it
 * small. This is the one beat that gets strictly better by adding photographs with no
 * design change — append to whichever column is shorter and author a `width`, then add
 * that width to WIDTH_SIZES above.
 *
 * NO YEARS AND NO INVENTED CLIENTS reach the captions. Where there is no `series`, `kind`
 * stands alone rather than printing a blank line or a guessed name; a fabricated year on
 * client work is the first error a client catches.
 */
export function MadeOutWest() {
  return (
    <Surface id="made-outwest" tone="paper" rhythm="vast">
      <Statement
        eyebrow={madeOutWest.eyebrow}
        lines={madeOutWest.lines}
        size="xl"
        as="h2"
        lead={madeOutWest.lead}
      />

      {/*
       * Two renderings rather than one, because no amount of ordering utilities can
       * interleave two nested column stacks — and the alternative, one flat grid, would
       * lock every left plate into a row with its right neighbour and undo the offset
       * that the beat exists for. The cost is bounded: the inactive copy is display:none,
       * so its lazy images are never in a viewport and are never fetched.
       */}
      <div className="mt-12 space-y-12 md:hidden">
        {interleaved.map((entry, i) => (
          // Full width at native ratio on a phone. The authored percentages are a
          // two-column device; at one column they would just make the work small.
          <WorkPlate
            key={entry.slug}
            entry={entry}
            sizes={MOBILE_SIZES}
            drift={driftAt(i)}
            className="w-full"
          />
        ))}
      </div>

      <div className="hidden md:mt-20 md:block">
        <Spread
          split="6/6"
          gap="wide"
          // Drops the right column 12rem, so nothing aligns across the gutter. The
          // columns themselves hold still; only the images move, inside their frames.
          stagger
          // A hairline in the gutter, drawn by the right slot's leading edge so it needs
          // no element of its own. border-rule reads the Surface tone, so the rule is
          // correct on any ground this beat is ever moved to.
          className="md:[&>*+*]:border-s md:[&>*+*]:border-rule md:[&>*+*]:ps-[4vw]"
          left={
            <div className="md:space-y-20">
              <Column items={leftColumn} rail={RAIL} />
            </div>
          }
          right={
            <div className="md:space-y-20">
              <Column items={rightColumn} offset={1} />
            </div>
          }
        />
      </div>

      {/*
       * A TextLink at `lg`, never a filled control — the one filled control on the site is
       * BOOK in the Masthead. Closing the work on restraint is the argument the brand is
       * making, and a button here would contradict it louder than the copy can.
       */}
      <Reveal gesture="rise" className="mt-16 text-center">
        <TextLink href={madeOutWest.action.href} size="lg">
          {madeOutWest.action.label}
        </TextLink>
      </Reveal>
    </Surface>
  );
}
