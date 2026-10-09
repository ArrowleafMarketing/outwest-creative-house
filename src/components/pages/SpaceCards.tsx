import { Plate, TextLink } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";
import { houseIntro, type allSpaces } from "@/content/house";

type Space = (typeof allSpaces)[number];

/**
 * The spaces as doorways — one frame, the house number, the name, the line, a link. Used
 * where a page needs to hand the reader on to a room: the foot of each space page and the
 * booking page. Two or three across, never more; the frames stay large.
 *
 * Staggered by column so the row reads as hung rather than gridded.
 */
export function SpaceCards({ spaces, className }: { spaces: readonly Space[]; className?: string }) {
  const three = spaces.length >= 3;
  const sizes = three ? "(min-width: 768px) 30vw, 100vw" : "(min-width: 768px) 44vw, 100vw";

  return (
    <ul
      className={`grid grid-cols-1 gap-14 md:gap-[4vw] ${three ? "md:grid-cols-3" : "md:grid-cols-2"} ${className ?? ""}`}
    >
      {spaces.map((space, i) => (
        <li key={space.key} className={i % 2 === 1 ? "md:mt-20" : ""}>
          <Plate slug={space.card} ratio="4/5" sizes={sizes} drift={i % 2 ? "up" : "down"} />
          <Reveal gesture="rise" i={1} className="mt-6">
            <p className="eyebrow text-on-ground-dim">{space.no}</p>
            <h3 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light uppercase leading-[1.1] tracking-display">
              {space.name}
            </h3>
            <p className="paragraph-header mt-3 text-on-ground">{space.line}</p>
            <div className="mt-5">
              <TextLink href={space.href} aria-label={`Explore ${space.name.toLowerCase()}`}>
                {houseIntro.explore}
              </TextLink>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
