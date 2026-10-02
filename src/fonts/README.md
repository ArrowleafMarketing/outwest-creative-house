# Fonts

Web fonts for OutWest Creative House. Type roles are defined in [`docs/BRAND.md`](../../docs/BRAND.md).

| Family | Role | Tailwind | CSS var | Files |
|---|---|---|---|---|
| **Abril** | Titles, headings, ads | `font-display` | `--font-abril` | 3 static instances (300/400/500) |
| **Hanken Grotesk** | Body copy, subheaders, UI | `font-sans` | `--font-hanken` | 1 variable (100–900) + italic |
| **Preztik** | Callouts, paragraph headers | `font-accent` | `--font-preztik` | 1 variable (1–1000) + italic |

Wired up in [`index.ts`](./index.ts) via `next/font/local`, applied to `<html>` in
`src/app/layout.tsx`, mapped to Tailwind theme keys in `src/app/globals.css`.

## Source files

Originals (desktop OTF/TTF + the variable masters) live in `assets/fonts/` at the repo
root. They are **not** served — they're there so the design side has them. The `.woff2`
files in this directory are the built web versions, converted from the originals with
`fontTools` (`flavor = "woff2"`).

## Preloading

Preloaded: the three Abril instances and both Hanken variable files (~158 KB) — display
and body type render above the fold. Preztik is **not** preloaded; it's an accent face
used further down the page, and this is an image-led site where the preload budget is
better spent on photography. Change `preload` in `index.ts` if that stops being true.

## Abril has no variable master, and its weight metadata is wrong

The pack ships static instances only, and its declared weights are inverted — the cut
named **"Regular" is the heaviest in the family**, with "Medium" below it. Measured
glyph ink area on `n`:

| File | Declared `usWeightClass` | Measured ink | Assigned CSS weight |
|---|---|---|---|
| `Abril-Thin` | 100 | 0.0222 | 100 *(not wired)* |
| `Abril-Light` | 300 | 0.0538 | **300** |
| `AbrilMedium` | 500 | 0.0738 | **400** |
| `Abril-Regular` | 400 | 0.0917 | **500** |

Weights in `index.ts` are assigned by measured weight, not by filename, so the CSS
ramp stays monotonic. Mapping by filename would make `font-weight: 500` render
*lighter* than `400`.

The true style pairs are Light/LightItalic and Medium/MediumItalic (identical ink).
`Abril-Regular` has no italic counterpart at all.

Converted and sitting in `abril/` but **not** wired: Thin, ThinItalic, LightItalic,
MediumItalic. Add them to the `src` array in `index.ts` if a design calls for them —
LightItalic belongs at 300 italic and MediumItalic at 400 italic.

## Preztik's weight axis is non-standard

Preztik's named instances don't sit on the usual CSS weight scale:

| Instance | Axis value |
|---|---|
| ExtraLight | 1 |
| Light | 200.5 |
| Regular | 400 |
| Medium | 520 |
| SemiBold | 640 |
| Bold | 760 |
| ExtraBold | 880 |
| Black | 1000 |

So `font-weight: 700` lands between the designer's SemiBold and Bold, and `300` lands
between ExtraLight and Light. When you need a designer-exact weight, use the
`--weight-preztik-*` custom properties in `globals.css` rather than a round number.

The brand guide's paragraph-header style (Preztik Light Italic) is available as the
`.paragraph-header` class.

## Licensing

- **Hanken Grotesk** — SIL Open Font License 1.1. `assets/fonts/hanken/OFL.txt`. Webfont
  embedding is permitted.
- **Abril** and **Preztik** — commercial licenses (Envato). No license file was included
  in either pack. **Confirm the purchased license covers webfont embedding** before this
  site goes to production; desktop-only licenses do not.

## Rebuilding the woff2 files

```bash
python3 -c "
from fontTools.ttLib import TTFont
f = TTFont('assets/fonts/abril/Abril-Regular.otf')
f.flavor = 'woff2'
f.save('src/fonts/abril/Abril-Regular.woff2')
"
```

Requires `fonttools` and `brotli`.
