import { Plate, Spread, Statement, Surface, type Tone } from "@/components/editorial";

type PageHeaderProps = {
  eyebrow: string;
  lines: readonly string[];
  lead?: string;
  body?: string | readonly string[];
  action?: { label: string; href: string };
  /** A portrait (or any) frame set beside the title, bleeding off the right edge. */
  slug?: string;
  focal?: string;
  tone?: Tone;
  size?: "lg" | "xl" | "colossal";
};

/**
 * The opening of every inner page — the inner-page equivalent of the homepage Cover.
 *
 * Carries the page's only h1. With a `slug` it is a Cover-shaped spread: title left, one
 * frame right, bleeding to the edge. Without one it is type and negative space alone, which
 * the direction explicitly allows a whole section to be.
 *
 * The frame is the LCP candidate on every page that has one, so it loads eagerly and
 * `settle`s — scale only, no opacity — so it is painted from the first frame.
 */
export function PageHeader({
  eyebrow,
  lines,
  lead,
  body,
  action,
  slug,
  focal,
  tone = "paper",
  size = "xl",
}: PageHeaderProps) {
  const statement = (
    <Statement
      eyebrow={eyebrow}
      lines={lines}
      size={size}
      as="h1"
      lead={lead}
      body={body}
      action={action}
    />
  );

  return (
    <Surface tone={tone} rhythm="vast" className="pt-16 md:pt-24">
      {slug ? (
        <Spread
          split="6/6"
          align="center"
          gap="wide"
          bleed="right"
          left={statement}
          right={
            <Plate
              slug={slug}
              focal={focal}
              // col-span-6 of the 90vw measure plus the 5vw the bleed reclaims ≈ 46vw.
              sizes="(min-width: 768px) 50vw, 100vw"
              eager
              reveal="settle"
              className="md:[&_img]:max-h-[78svh] md:[&_img]:object-cover"
            />
          }
        />
      ) : (
        statement
      )}
    </Surface>
  );
}
