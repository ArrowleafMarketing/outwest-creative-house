import { Reveal } from "@/components/motion/Reveal";
import { TextLink } from "./TextLink";

type Size = "sm" | "md" | "lg" | "xl" | "colossal" | "numeral";

type StatementProps = {
  eyebrow?: string;
  lines?: readonly string[];
  size?: Size;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  lead?: string;
  body?: string | readonly string[];
  action?: { label: string; href: string };
  align?: "left" | "center";
  measure?: "narrow" | "normal" | "wide";
  className?: string;
};

/**
 * RAMP. Mobile floors are set by the longest WORD in the authored copy, not guessed.
 * `numeral` pulls tracking IN — display tracking is wrong on a four-character figure,
 * which needs less air between glyphs, not more.
 */
const RAMP: Record<Size, string> = {
  sm: "text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.15]",
  md: "text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.1]",
  lg: "text-[clamp(1.75rem,5.5vw,4rem)] leading-[1.05]",
  xl: "text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.98]",
  colossal: "text-[clamp(2.5rem,12vw,11rem)] leading-[0.92]",
  numeral:
    "text-[clamp(4.5rem,24vw,18rem)] leading-[0.85] tracking-[var(--tracking-numeral)] tabular-nums",
};

const MEASURE = {
  narrow: "max-w-[34ch]",
  normal: "max-w-[46ch]",
  wide: "max-w-[62ch]",
} as const;

/**
 * Every piece of display type on the page, and the entrance choreography that goes with
 * it. The seven type-led beats are typographically identical because none of them invents
 * its own size or its own rhythm.
 *
 * Visual scale is decoupled from heading level — `size` styles, `as` sets the element —
 * so an 11rem statement and an h3 are the same component while the document outline stays
 * correct. There is exactly one h1 on the page.
 *
 * ENTRANCE ORDER IS FIXED and identical in every beat: eyebrow, display lines, lead,
 * body, action. That is what makes the page read as one hand rather than as per-section
 * animation.
 */
export function Statement({
  eyebrow,
  lines,
  size = "md",
  as: As = "h2",
  lead,
  body,
  action,
  align = "left",
  measure = "normal",
  className,
}: StatementProps) {
  const n = lines?.length ?? 0;
  const centered = align === "center";
  const measured = `${MEASURE[measure]} ${centered ? "mx-auto" : ""}`;
  const bodyLines = typeof body === "string" ? [body] : body;

  return (
    <div className={`${centered ? "text-center" : ""} ${className ?? ""}`}>
      {eyebrow ? (
        <Reveal gesture="rise" i={0}>
          <p className="eyebrow text-on-ground-dim">{eyebrow}</p>
        </Reveal>
      ) : null}

      {lines?.length ? (
        <As
          className={`${eyebrow ? "mt-5" : ""} font-display font-light uppercase tracking-display ${RAMP[size]}`}
        >
          {lines.map((line, idx) => (
            <Reveal key={line} gesture="rise" i={idx + 1} as="span" className="block">
              {/* never text-balance at xl and up — it fights authored breaks */}
              <span className="display-line block">{line}</span>
            </Reveal>
          ))}
        </As>
      ) : null}

      {lead ? (
        <Reveal gesture="rise" i={n + 1}>
          <p
            className={`${n ? "mt-8 md:mt-10" : ""} paragraph-header text-[clamp(1.05rem,1.6vw,1.375rem)] text-on-ground ${measured}`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {bodyLines?.length ? (
        <Reveal gesture="rise" i={n + 2}>
          <div
            className={`${lead || n ? "mt-6" : ""} space-y-4 font-sans text-base leading-[1.7] text-on-ground-dim ${measured}`}
          >
            {bodyLines.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      ) : null}

      {action ? (
        <Reveal gesture="rise" i={n + 3}>
          <div className="mt-8 md:mt-10">
            <TextLink href={action.href}>{action.label}</TextLink>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
