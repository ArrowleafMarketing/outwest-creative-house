# OutWest Creative House — Brand Reference

Source: `OutWest - Brand Presentation.pdf` (Arrowleaf Marketing and Media, August 2026).
Rebranded from **OutWest Studios** → **OutWest Creative House**. Site: outweststudios.com.
This file is the authority for all design and copy decisions on this site.

> **See also [`DIRECTION.md`](./DIRECTION.md)** — the owner's own creative direction for the
> site, which pushes the positioning well beyond "photography studio." It is directional
> rather than approved, and it **conflicts with this document in six places** (the yucca's
> treatment, navigation naming, the editorial property, palette extensions, audience, and
> homepage video). Read its *Conflicts to resolve* section before building anything that
> touches those areas.

## What it is

A natural-light photography studio and creative house in Boise / Treasure Valley, Idaho.
Multiple distinct sets under one roof, plus membership, education, community, and events.
It is a *creative authority*, not a rental studio — the site must read that way.

**Mission** — Build the premier studio and community where photographers and brands come
together, and where photographers are taught to build sustainable, year-round creative businesses.

**Vision** — Become the most recognized, "household name" studio in the Treasure Valley — the
default "Brand HQ" photographers and brands think of first — while helping the photographers who
use it grow into full-time, sustainable creative businesses.

## Voice & tone

**Voice** — A trusted creative partner, not a corporation. Welcoming, encouraging,
relationship-driven, with a refined editorial tone. Inspires people to create meaningful work and
see new possibilities **without ever feeling exclusive or intimidating**.

**Tone** — Conversational and optimistic. Clarity and purpose. Balances inspiration with practical
value. Celebrates creativity, encourages collaboration, reflects an elevated experience.

Copy rules that follow from this:
- Warm and direct. No corporate filler, no hype, no exclamation points.
- Short declarative sentences. Let whitespace and photography carry the emotion.
- Second person ("you", "your work"), never "clients shall" or institutional voice.
- Never gatekeep. Aspirational, never elitist.

## Aesthetic

Editorial elegance meets the spirit of the American West. Timeless architecture, natural
materials, quiet luxury. Refined craftsmanship + creative freedom. Warm, intentional, enduring.

Keywords: *Editorial. Architectural. Elevated. Creative. Authentic. Warm. Natural. Collected.
Quietly Luxurious. Sophisticated. Inviting. Inspiring.*

## Design goals & challenges (the eight constraints)

| # | Goal | Meaning |
|---|------|---------|
| 01 | Luxury but not exclusive | Elevated without feeling stuffy |
| 02 | Western restraint | Evoke West without going cowboy |
| 03 | Visual variety | Unite wildly different photography |
| 04 | Growth ready | Expand beyond studio rentals |
| 05 | Distinctive presence | Stand apart from studios |
| 06 | Incorporate the yucca | Iconic without feeling cheesy |
| 07 | Human touch | Polished without feeling corporate |
| 08 | Lasting style | Timeless rather than trend-driven |

"A minimal brand foundation creates consistency while allowing a wide range of photographic
styles to shine." The brand is the quiet frame; the photography is the content.

**Simplicity** — the studio, the work, and the community speak for themselves without the brand
being overstated in any way.

## Color palette

| Name | Hex | Role |
|------|-----|------|
| Alabaster | `#F0EBE2` | Primary background — the brand's default canvas |
| Canvas | `#DDD2C6` | Secondary surface, section alternation, cards |
| River Clay | `#998B7C` | Muted brown — borders, hairlines, quiet fills. **Not text on light grounds** (see below) |
| Horizon | `#B1BAC8` | Cool blue-grey accent — sparing |
| Agave | `#B1B280` | Light sage accent |
| Olive | `#6B6644` | Deep green — dark surfaces, accents |
| Desert Rose | `#C4957A` | Warm clay accent |
| Adobe | `#865336` | Saturated terracotta — strongest warm accent |
| White | `#FFFFFF` | |
| Black | `#010203` | Primary text, logo, near-black (not pure #000) |

Usage: Alabaster/Canvas dominate. Black for type. Earth accents (Adobe, Desert Rose, Olive) used
sparingly, never as large flat brand blocks. Horizon and Agave are the rarest.

⚠ **River Clay is not an accessible text colour on light grounds.** Measured: 2.79:1 on Alabaster
and 2.23:1 on Canvas — it fails WCAG AA for body copy *and* for large text. This guide names it
"secondary text", which holds only on Ink (6.27:1). Everywhere else the site uses the
`on-ground-dim` token, which resolves per surface to a compliant value — 5.03:1 on Alabaster,
4.99:1 on Canvas, 4.90:1 on Olive, 6.27:1 on Ink. The visible consequence is that secondary text
runs slightly darker and warmer than the guide's swatch. That is a deliberate departure from a
signed-off document and is worth confirming with the owner rather than shipping quietly.

In code these are Tailwind colour tokens — `bg-alabaster`, `text-river-clay`, `bg-olive`,
`text-adobe`, and so on (Black is `ink`). Semantic aliases: `background`, `foreground`, `muted`,
`surface`, and `rule` for hairlines. Defined in `src/app/globals.css`.

The site is light-only by design. The brand has no dark mode — Olive and Ink are *dark surfaces*
used for sections, not a second theme — so the create-next-app `prefers-color-scheme` block was
removed rather than mapped.

## Typography

| Face | Role | Notes |
|------|------|-------|
| **Abril** | Headings, subheadings, ads | Envato / brand drive / Canva Pro. **Free fallback: Cormorant Garamond** (Google Font) |
| **HK Grotesk** (Hanken Grotesk) | Subheaders & general body copy | Free Google Font — *primary* for body text |
| **Preztik** | Callouts & paragraph headers | Envato. Paragraph headers often Preztik Light Italic |

Hierarchy: Titles = Abril · Subheaders = HK Grotesk · Paragraph header = Preztik Light Italic ·
Body = HK Grotesk. Both Preztik and HK Grotesk are variable; use multiple weights. HK Grotesk
stays primary for body.

All three licensed families are installed in this repo — see `src/fonts/README.md`. Tailwind
classes: `font-display` (Abril), `font-sans` (Hanken Grotesk), `font-accent` (Preztik). The
paragraph-header style is the `.paragraph-header` class, and `.eyebrow` is the tracked-caps label
treatment. Live specimen at `/type`; the whole system is at `/brand`.

Display type is set with generous letter-spacing in all-caps — the wordmark treatment
(`O U T W E S T`) is characteristic.

## Logo system

The deck presented two directions; the delivered asset set **merges them** — it ships the
yucca badge from Identity #1 *and* the OW monogram from Identity #2. Four marks in nine
colourways each:

| Mark | Use |
|---|---|
| **Lockup** | `OUTWEST` over `CREATIVE HOUSE`. The primary mark. |
| **Wordmark** | `OUTWEST` alone. Tight horizontal space, or where "Creative House" is already nearby. |
| **Monogram** | Interlocking `OW`. Avatars, favicons, small marks. |
| **Badge** | Yucca in the oval, ringed by `OUTWEST · CREATIVE HOUSE`. Stamps, seals, packaging. |

`OUTWEST` is wide-tracked serif caps with `CREATIVE HOUSE` in tracked sans caps beneath.
Renders black on light, white on dark or photography.

In code: `<Logo mark="lockup" />` inlines the small marks in `currentColor`; the badge comes
from `<Illustration name="badge" />`. Static colourways are in `public/brand/logos/` for
handoff. See `public/brand/README.md` — note that the Drive's `Wordmark_*` files are
actually the *monogram*; the names are swapped upstream and renamed in this repo.

## Signature motif — the yucca

A hand-drawn yucca is the signature illustration. Charcoal-like texture, imperfect and expressive —
a fine-art counterpoint to the precision of the typography and architecture. Native to the
landscapes that inspire OutWest, it represents **resilience, growth, and creative independence**.
Its sculptural form and unexpected bloom reflect a brand built around creating something beautiful,
distinctive, and enduring. Values it carries: *Creativity · Growth · Human Touch · Inspiration ·
Adaptation.*

The wordmark stays simple and timeless; the yucca is the recognizable thread.

**Extended hand-drawn icon set** (same charcoal line style), delivered as nine SVGs: yucca,
saguaro, cactus flower, fig leaf (two), citrus, cow skull, pomegranate, sun. Used across digital,
print, packaging, merchandise, and environmental applications.

In code: `<Illustration name="yucca" className="w-24 text-olive" />`. Each is one black source
rendered as a CSS mask tinted with `currentColor`, so every brand colour works from one file.

## Audience personas

1. **Lauren** — Established photographer, 34, Boise. Full-time, polished brand of her own, shoots
   branding/lifestyle/commercial. Wants a studio that elevates her client experience and gives
   several completely different looks without changing locations. Values: Quality · Flexibility ·
   Efficiency · Creativity · Professionalism. Pain: studios with only one look, limited set
   variety, repetitive locations, time lost moving between them.
2. **Emma** — Growing photographer, 28, Meridian. Successful side business in weddings/portraits,
   wants year-round sustainability. Unsure how to package, price, or sell brand work. Values:
   Education · Community · Opportunity · Inspiration · Growth. Pain: seasonal income, pricing
   uncertainty, isolation, needing professional space without huge overhead.
3. **Rachel** — Small business owner, 39, Boise. Constant demand for fresh content across social,
   web, campaigns, launches, team photos. Values: Quality · Convenience · Distinction ·
   Consistency · Expertise. Pain: generic imagery, coordinating multiple locations and
   photographers, not enough variety per session, finding trusted creative partners.

The site must serve all three: *book a beautiful space* (Lauren), *join and grow* (Emma), and
*get content made for my brand* (Rachel).

## Website direction — "Editorial. Immersive."

Mocked nav: **THE STUDIO · SETS · MEMBERSHIP · ABOUT · JOURNAL · [INQUIRE]**
Hero headline in the mock: "A HOME FOR PHOTOGRAPHERS" / "A HOME FOR VISIONARIES", with subcopy
"OutWest is a natural light studio and creative house for photographers, brands, and storytellers."
and a text CTA "EXPLORE THE STUDIO". Secondary section: "A space creatives roam free", eyebrow
"BOISE, IDAHO".

Six stated principles:
- **Editorial Layout** — Generous whitespace keeps everything elevated and easy to navigate.
- **Image-Led Design** — Large photography lets the work sell the space.
- **Clear Hierarchy** — Minimal navigation keeps choices simple and intentional.
- **Strategic Pathways** — Users quickly find sets, memberships, events, or booking.
- **Modular Structure** — Flexible sections easily grow with OutWest.
- **Subtle Animations** — Quiet interactions support rather than distract.

Implementation implications:
- Full-bleed photography heroes with light type overlaid; type never fights the image.
- Tracked, small, all-caps labels and text-link CTAs with hairline underlines — not filled buttons
  everywhere. Buttons, where used, are thin-ruled and restrained.
- Hairline rules (River Clay / Canvas at low opacity) instead of heavy borders or shadows.
- Editorial asymmetric grids; rectangular image bands of varied aspect ratios.
- Animation = slow fades and small translations on scroll. No parallax stunts, no bounce.
- Every section must be a reusable module — the brand explicitly plans to grow past rentals.

## The OutWest Edit

A physical + digital editorial publication (`OUTWEST · EDIT No.01`) that positions OutWest as a
creative authority. It showcases the studio's versatility, gives photographers exposure and social
currency, builds prestige and community, attracts brands, generates months of content, connects to
the digital **Journal**, supports gifting and outreach, and creates an archive over time.

On the site this means the **Journal** is a first-class section, not a blog afterthought — it
should read like a magazine index.

## Photography

72 web-ready frames live in `src/photos` — see `src/photos/README.md` for usage and for an
honest read on what the library does and doesn't cover. Browse them at `/photos`.

Short version: strong on people and on styled fashion work (`Rambler x Westbound` is the
closest thing to the brief), and now with a first set of seven composed, unpeopled frames of
the space — plaster, olive, and hard slatted light — tagged `empty`. **More space
photography is being shot and will land in batches.** Still missing: exteriors, golden hour,
most material/texture, and any film. The brand campaign called for in `DIRECTION.md` has not
been shot yet.

## Guardrails

- Never cowboy-kitsch: no ropes, horseshoes, wanted posters, distressed-western display faces,
  sepia filters.
- Never corporate-SaaS: no gradient blobs, no drop shadows, no rounded-pill-button UI kit look,
  no stock icon sets (only the hand-drawn charcoal marks).
- Never loud: no pure black `#000` backgrounds, no high-saturation color, no oversized filled CTAs.
- Never crowded: whitespace is a brand asset. When in doubt, remove and give it more room.
