# Photo library

102 web-ready frames, indexed and typed. Import from `@/photos`, render with
`@/components/Photo`. Browse everything at **`/photos`** — filterable by category,
series and tag.

> **Space photography arrives in drops.** The client is shooting the rooms unpeopled, and
> presenting the space is a large part of the site. Two drops have landed (tagged `empty`);
> expect more — the importer and index regenerate cleanly, so a new drop is a two-command job.
>
> **October 2026 drop:** 23 frames from `~/Downloads/outwest-website-media-web` (1800px web
> exports, imported with `--source`). Five more files in that folder — `A7500703`, `704`,
> `738`, `819`, `862` — are the same exposures as masters already here at higher resolution,
> and were skipped. The drop finally covers the Warehouse (white brick, concrete, a row of
> mismatched chairs), the Lounge (velvet, bouclé, brass) and real texture (fluted wood, a
> plaster niche, terracotta tile). Which room each frame belongs to is inferred from what is
> visible — see the note at the top of `src/content/house.ts`.

## Where things live

| | |
|---|---|
| `files/` | The web masters — WebP, long edge 2560px, ~20 MB total. Generated; don't edit. |
| `metadata.ts` | **Hand-authored.** Alt text, category, series, tags. Edit this freely. |
| `index.ts` | Generated. Static imports + the typed `photos` array and helpers. |

Originals stay in the client Drive (`OutWest Studios / Photo`) — 1.17 GB across 81 files,
far too large for the repo. Two were byte-identical duplicates (`DSC_8996 (1)` and
`DSC_9292 (1)`) and were dropped, leaving 79. The space frames come from the
`Space SHOTZZ` subfolder; when duplicates exist the importer keeps the canonical filename,
so those two are indexed as `dsc-8996` / `dsc-9292`.

## Why `src/` and not `public/`

Static imports. Because each file is imported rather than referenced by URL, Next.js
supplies the intrinsic `width`, `height` **and** a generated `blurDataURL` at build time.
That's what makes `placeholder="blur"` work and eliminates layout shift — none of which
is available for files served out of `public/`.

`next/image` then generates the responsive variants it actually serves, so 2560px on the
long edge only needs to cover the largest rendering (full-bleed on a 2x display).

## Using them

```tsx
import { photo, byCategory, bySeries, editorialRhythm } from "@/photos";
import { Photo, PhotoBand } from "@/components/Photo";

// One known frame, full-bleed and prioritised as the LCP image
<PhotoBand photo={photo("first-light-17")} className="aspect-21/9" priority />

// A grid — `sizes` must describe the rendered width, or oversized files ship
{byCategory("work").map((p) => (
  <Photo key={p.slug} photo={p} sizes="(min-width: 640px) 33vw, 100vw" />
))}

// PLACE → PERSON → DETAIL → WORK, alternating
{editorialRhythm(8).map((p) => …)}
```

Alt text comes from `metadata.ts` automatically; pass `alt` only when page context
warrants something better.

## Categories

`place` · `person` · `detail` · `work` — the rhythm from `docs/DIRECTION.md`. Alternating
them across a page is what keeps a run of images feeling editorial rather than like a
gallery dump. `editorialRhythm()` does that for you.

## What the library actually holds

Worth knowing before designing around it. **41 person · 15 work · 29 place · 17 detail.**

- **Still portrait-dominant.** Editorial bands and full-bleed heroes are landscape-shaped,
  so many frames need cropping via `PhotoBand` rather than driving their own ratio. The
  space frames help — most of them are landscape, and two are near-letterbox.
- **The `empty` tag is the one to reach for when presenting the house.** Seven frames,
  composed rather than documentary: plaster pedestals, olive trees, a cream lounge chair,
  and hard blind-slatted light throwing long shadows. `a7500819` and `a7500862` are the
  strongest — they read like the Amangiri / Altter register the brief asks for.
  `a7500738-2` is a natural thin full-bleed band at roughly 21:9.
- **Texture now has a real set** — thirteen frames tagged `texture`: cast plaster grain
  (`a7500704-2`), fluted wood (`a7502866`, `a7502867`), a plaster niche (`a7502873`),
  terracotta tile (`a7502875`), bouclé in hard light (`a7502848`, `a7502859`). Leather, chrome
  and hands are still open.
- **8 of the 18 `place` frames are holiday sets** (tagged `holiday`) — seasonal, not usable
  on the evergreen site. Three more are behind-the-scenes. Filter with
  `byTag("empty")` for the composed space, not `byCategory("place")`.
- **No architectural exteriors, no golden hour, no film/video.**
- **The strongest brand-fit people work** is `Rambler x Westbound` (western through a
  fashion lens, exactly the brief) and the `bts` frames — photographers actually working,
  which is what the "people, not rooms" section needs.

## Re-importing

After adding originals to the Drive folder:

```bash
node scripts/import-photos.mjs
node scripts/generate-photo-index.mjs
```

Then add an entry to `metadata.ts` for each new slug — `index.ts` throws on a photo with
no metadata rather than shipping an empty `alt`.

Both scripts take flags: `--source "<dir>"`, `--max 2560`, `--quality 78`.
