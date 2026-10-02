import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Type specimen · OutWest Creative House",
};

const hankenWeights = [
  ["Thin", 100],
  ["ExtraLight", 200],
  ["Light", 300],
  ["Regular", 400],
  ["Medium", 500],
  ["SemiBold", 600],
  ["Bold", 700],
  ["ExtraBold", 800],
  ["Black", 900],
] as const;

const preztikWeights = [
  ["ExtraLight", 1],
  ["Light", 200.5],
  ["Regular", 400],
  ["Medium", 520],
  ["SemiBold", 640],
  ["Bold", 760],
  ["ExtraBold", 880],
  ["Black", 1000],
] as const;

// Labelled by the file each weight actually maps to — the pack's "Regular" cut is
// the heaviest in the family, so it sits at 500. See src/fonts/index.ts.
const abrilWeights = [
  ["Light (file: Light)", 300],
  ["Regular (file: Medium)", 400],
  ["Semibold (file: Regular)", 500],
] as const;

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-black/10 py-4 sm:flex-row sm:items-baseline sm:gap-6">
      <div className="w-44 shrink-0 font-sans text-[11px] uppercase tracking-[0.18em] text-black/40">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function TypeSpecimen() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-black/40">
        OutWest Creative House
      </p>
      <h1 className="mt-4 font-display text-5xl font-light tracking-[0.12em] sm:text-7xl">
        TYPE SPECIMEN
      </h1>
      <p className="paragraph-header mt-6 text-lg text-black/70">
        Abril for titles, Hanken Grotesk for body, Preztik for callouts.
      </p>

      <section className="mt-16">
        <h2 className="font-display text-2xl tracking-[0.1em]">ABRIL — DISPLAY</h2>
        <div className="mt-4">
          {abrilWeights.map(([name, weight]) => (
            <Row key={name} label={`Abril ${name} · ${weight}`}>
              <p
                className="font-display text-3xl tracking-[0.1em] sm:text-4xl"
                style={{ fontWeight: weight }}
              >
                A HOME FOR PHOTOGRAPHERS
              </p>
            </Row>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl tracking-[0.1em]">
          HANKEN GROTESK — BODY
        </h2>
        <div className="mt-4">
          {hankenWeights.map(([name, weight]) => (
            <Row key={name} label={`Hanken ${name} · ${weight}`}>
              <p className="font-sans text-xl" style={{ fontWeight: weight }}>
                OutWest is a natural light studio and creative house.
              </p>
              <p
                className="font-sans text-xl italic text-black/60"
                style={{ fontWeight: weight }}
              >
                OutWest is a natural light studio and creative house.
              </p>
            </Row>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl tracking-[0.1em]">
          PREZTIK — CALLOUTS
        </h2>
        <div className="mt-4">
          {preztikWeights.map(([name, weight]) => (
            <Row key={name} label={`Preztik ${name} · ${weight}`}>
              <p className="font-accent text-xl" style={{ fontWeight: weight }}>
                A space creatives roam free.
              </p>
              <p
                className="font-accent text-xl italic text-black/60"
                style={{ fontWeight: weight }}
              >
                A space creatives roam free.
              </p>
            </Row>
          ))}
        </div>
      </section>
    </main>
  );
}
