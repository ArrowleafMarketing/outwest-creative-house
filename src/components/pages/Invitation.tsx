import { Statement, Surface, TextLink, type Tone } from "@/components/editorial";
import { Reveal } from "@/components/motion/Reveal";

type InvitationProps = {
  eyebrow?: string;
  lines: readonly string[];
  lead?: string;
  action: { label: string; href: string };
  tone?: Tone;
};

/**
 * Where every inner page ends: one large centred line and one text link out. The homepage
 * Closer's grammar, so the whole site signs off the same way. A TextLink at `lg`, never a
 * filled control — BOOK in the masthead stays the only one.
 */
export function Invitation({ eyebrow, lines, lead, action, tone = "paper" }: InvitationProps) {
  return (
    <Surface tone={tone} rhythm="vast">
      <Statement
        eyebrow={eyebrow}
        lines={lines}
        lead={lead}
        size="xl"
        as="h2"
        align="center"
      />
      <Reveal gesture="rise" i={lines.length + 3} className="mt-12 text-center md:mt-14">
        <TextLink href={action.href} size="lg">
          {action.label}
        </TextLink>
      </Reveal>
    </Surface>
  );
}
