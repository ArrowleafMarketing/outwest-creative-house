# Brand assets

Served static assets. The source of truth for all of these is the client Drive:
`Arrowleaf Marketing & Media / OutWest Studios / LOGOs & Graphic Design`.

## `logos/`

Four marks × nine colourways, optimized with SVGO. File names here are **renamed**
from the Drive originals for clarity:

| Here | In the Drive | What it is |
|---|---|---|
| `lockup-*` | `OutWest_logo_OutWestCreativeHouse_*` | OUTWEST over CREATIVE HOUSE — the primary mark |
| `wordmark-*` | `OutWest_logo_OutWest_*` | OUTWEST alone |
| `monogram-*` | `OutWest_logo_Wordmark_*` | the interlocking OW |
| `badge-*` | `OutWest_logo_badge_*` | the yucca in the oval |

⚠️ The Drive file named `Wordmark` is the **monogram**, not the wordmark. The names
were swapped upstream. Renamed here so the code reads correctly — keep that in mind
when pulling new exports.

Colourways: `black` `white` `canvas` `river clay` `agave` `olive` `desert rose`
`adobe` `horizon`. (The Drive ships the lockup's black as `_Black` with a capital B.)

**You usually don't need these files.** The `<Logo>` component inlines the marks and
draws them in `currentColor`, so any brand colour works from one source. These static
colourways exist for handoff — decks, email signatures, print, third parties.

## `illustrations/`

The nine hand-drawn charcoal marks, optimized with SVGO. Each is black-only and
rendered through a CSS mask by `<Illustration>`, which tints it with `currentColor`.

These are heavy — traced charcoal texture, 86–292 KB each (roughly 30–95 KB over the
wire once compressed). That's why they are static files rather than inlined SVG.

## `icon-512.png`

Rasterized monogram tile, for anywhere that needs a square PNG (social, Open Graph,
PWA manifests). The app icons themselves live in `src/app/` as `icon.svg`,
`apple-icon.png`, and `favicon.ico`.

## Regenerating

After replacing any asset here, re-run the manifest generator so aspect ratios and
inline path data stay in sync:

```bash
node scripts/generate-logo-paths.mjs
```
