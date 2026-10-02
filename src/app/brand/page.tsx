import type { Metadata } from "next";
import { Logo, Illustration, illustrationNames } from "@/components/brand";

export const metadata: Metadata = {
  title: "Brand system · OutWest Creative House",
  description:
    "Living reference for the OutWest Creative House palette, typography, logo marks, and illustrations.",
};

const palette = [
  { name: "Alabaster", hex: "#F0EBE2", token: "alabaster", note: "Primary background" },
  { name: "Canvas", hex: "#DDD2C6", token: "canvas", note: "Secondary surface" },
  { name: "River Clay", hex: "#998B7C", token: "river-clay", note: "Hairlines only — 2.79:1 on Alabaster, fails AA as text" },
  { name: "Horizon", hex: "#B1BAC8", token: "horizon", note: "Cool accent, sparing" },
  { name: "Agave", hex: "#B1B280", token: "agave", note: "Light sage accent" },
  { name: "Olive", hex: "#6B6644", token: "olive", note: "Deep green surface" },
  { name: "Desert Rose", hex: "#C4957A", token: "desert-rose", note: "Warm clay accent" },
  { name: "Adobe", hex: "#865336", token: "adobe", note: "Strongest warm accent" },
  { name: "White", hex: "#FFFFFF", token: "white", note: "" },
  { name: "Ink", hex: "#010203", token: "ink", note: "Primary text" },
] as const;

const marks = [
  { mark: "lockup", label: "Lockup", note: "Primary mark. OUTWEST over CREATIVE HOUSE.", w: "w-48" },
  { mark: "wordmark", label: "Wordmark", note: "Tight horizontal space.", w: "w-44" },
  { mark: "monogram", label: "Monogram", note: "Avatars, favicons, small marks.", w: "w-12" },
] as const;

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule pt-10 mt-20 first:mt-0">
      <p className="eyebrow text-on-ground-dim">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl tracking-display sm:text-4xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function BrandPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <header>
        <Logo mark="lockup" title="OutWest Creative House" className="w-64 text-ink" />
        <p className="paragraph-header mt-10 max-w-xl text-xl text-on-ground-dim">
          Editorial elegance meets the spirit of the American West — refined
          craftsmanship with creative freedom.
        </p>
      </header>

      <Section eyebrow="01 — Colour" title="PALETTE">
        <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-5">
          {palette.map((c) => (
            <div key={c.token} className="bg-background">
              <div
                className="aspect-4/3 w-full border border-rule"
                style={{ backgroundColor: c.hex }}
              />
              <div className="px-1 py-3">
                <p className="eyebrow">{c.name}</p>
                <p className="mt-1 font-sans text-xs tabular-nums text-on-ground-dim">
                  {c.hex}
                </p>
                <p className="mt-1 font-sans text-xs text-on-ground-dim">
                  bg-{c.token}
                </p>
                {c.note ? (
                  <p className="mt-2 font-sans text-xs text-on-ground-dim/80">
                    {c.note}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="02 — Type" title="TYPOGRAPHY">
        <div className="space-y-12">
          <div>
            <p className="eyebrow text-on-ground-dim">Abril · font-display · titles</p>
            <p className="mt-4 font-display text-4xl font-light tracking-display sm:text-6xl">
              A HOME FOR PHOTOGRAPHERS
            </p>
            <p className="mt-3 font-display text-2xl tracking-display">
              A space creatives roam free
            </p>
          </div>
          <div>
            <p className="eyebrow text-on-ground-dim">
              Preztik Light Italic · .paragraph-header
            </p>
            <p className="paragraph-header mt-4 text-2xl">
              Designed with intention and built for versatility.
            </p>
          </div>
          <div>
            <p className="eyebrow text-on-ground-dim">
              Hanken Grotesk · font-sans · body
            </p>
            <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed">
              OutWest is a natural light studio and creative house for
              photographers, brands, and storytellers. One destination gives your
              team access to multiple distinct environments and a network of
              creative professionals, making it easier to produce a large, varied
              content library in a single shoot.
            </p>
          </div>
          <div>
            <p className="eyebrow text-on-ground-dim">.eyebrow · tracked caps label</p>
            <p className="eyebrow mt-4">Boise, Idaho</p>
          </div>
        </div>
        <p className="mt-10 font-sans text-sm text-on-ground-dim">
          Full weight specimen, including italics and the non-standard Preztik
          axis, at{" "}
          <a className="underline underline-offset-4" href="/type">
            /type
          </a>
          .
        </p>
      </Section>

      <Section eyebrow="03 — Marks" title="LOGO MARKS">
        <div className="space-y-10">
          {marks.map((m) => (
            <div
              key={m.mark}
              className="flex flex-col gap-6 border-b border-rule pb-10 sm:flex-row sm:items-start"
            >
              <div className="sm:w-52 shrink-0">
                <p className="eyebrow">{m.label}</p>
                <p className="mt-2 font-sans text-xs text-on-ground-dim">{m.note}</p>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex min-h-28 items-center justify-center bg-alabaster p-6 ring-1 ring-rule">
                  <Logo mark={m.mark} className={`${m.w} max-w-full text-ink`} />
                </div>
                <div className="flex min-h-28 items-center justify-center bg-olive p-6">
                  <Logo mark={m.mark} className={`${m.w} max-w-full text-alabaster`} />
                </div>
                <div className="flex min-h-28 items-center justify-center bg-canvas p-6">
                  <Logo mark={m.mark} className={`${m.w} max-w-full text-adobe`} />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="sm:w-52 shrink-0">
              <p className="eyebrow">Badge</p>
              <p className="mt-2 font-sans text-xs text-on-ground-dim">
                Yucca in the oval. Stamps, seals, packaging.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center bg-alabaster p-6 ring-1 ring-rule">
                <Illustration name="badge" className="w-20 text-ink" />
              </div>
              <div className="flex items-center justify-center bg-olive p-6">
                <Illustration name="badge" className="w-20 text-alabaster" />
              </div>
              <div className="flex items-center justify-center bg-canvas p-6">
                <Illustration name="badge" className="w-20 text-adobe" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="04 — Motif" title="ILLUSTRATIONS">
        <p className="max-w-2xl font-sans text-sm leading-relaxed text-on-ground-dim">
          Hand-drawn charcoal marks. The yucca is the signature — resilience,
          growth, and creative independence — and the rest of the set extends it.
          Each is a single black source tinted with <code>currentColor</code>, so
          any brand colour works.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-8 sm:grid-cols-5">
          {illustrationNames.map((name, i) => (
            <figure key={name} className="flex flex-col items-center gap-3">
              <div className="flex h-28 w-full items-center justify-center">
                <Illustration
                  name={name}
                  className={`h-28 ${
                    ["text-ink", "text-olive", "text-adobe", "text-desert-rose", "text-river-clay"][i % 5]
                  }`}
                />
              </div>
              <figcaption className="eyebrow text-center text-on-ground-dim">
                {name.replace(/-/g, " ")}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </main>
  );
}
