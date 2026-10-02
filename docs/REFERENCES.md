# Reference sites — what to take from each

Nine sites, visited and studied September 2026. Sources: four from the graphic designer,
five from the owner. This is the synthesis — what each one actually does, and which
specific mechanics carry over to OutWest.

Read alongside [`DIRECTION.md`](./DIRECTION.md) (what to build) and [`BRAND.md`](./BRAND.md)
(what it looks like). This file is the *how*.

---

## The references

### Brunello Cucinelli — the designer's top pick
`shop.brunellocucinelli.com`

The closest match to the target feeling, and the most directly copyable structure.

- **Centred serif wordmark, tracked-caps nav underneath it** — a two-row masthead over the
  hero, which collapses to a single sticky row on scroll. The logo disappears; the nav stays.
- **CTAs are text links with a hairline underline**, never filled buttons — two of them side
  by side over the hero ("WOMEN'S COLLECTION" / "MEN'S COLLECTION"). This is exactly the
  restraint `DIRECTION.md` asks for.
- **Hero is a desaturated full-bleed campaign frame** with a light serif title, a small
  subtitle beneath it, and a scroll chevron at the bottom centre.
- **The mega-menu is itself editorial** — a full-width white panel with link columns on the
  left and three image cards with "Discover more" on the right. This is the "subtle animation
  even in the menu" the designer flagged. The menu is a piece of content, not a list.
- Body content sits in a wide white gutter — two-up image grids with a lot of air.

### Amangiri — the module pattern
`aman.com/resorts/amangiri`

Sets the tone with autoplay video, but the real lesson is the **repeating content module**:

```
EYEBROW CATEGORY
Title in serif
One or two sentences, centred and narrow.
Discover more →
```

Repeated for ACCOMMODATION, ADVENTURE, EXPERIENCES, WELLNESS, CELEBRATIONS. That is
structurally identical to OutWest's THE WAREHOUSE / THE VILLA / THE CREATIVE LOUNGE beat.

- Location eyebrow → big serif name → one paragraph. No preamble.
- **Horizontal carousels** (48 slides in one of them) at varied image heights.
- **A single persistent "Reserve" button, top right** — the only filled button on the page,
  and the only transactional element. Everything else is editorial.
- No pricing, no FAQ, no amenity list anywhere on the landing page.

### Our Habitas — the naming system
`ourhabitas.com`

The strongest structural parallel to OutWest, because it solves the same problem: several
distinct places that must read as one world.

- Every property is **"Our Home of ___"** — Our Home of Play, Our Home in Nature, Our Home
  for Connection, Our Expedition Outpost. A formula, applied consistently.
- Card pattern: `LOCATION | REGION` eyebrow → "Our Home of X" → `DISCOVER X`.
- Opens with a manifesto paragraph — "We are a global home for a global community…" — before
  showing a single property.
- Properties not yet open are shown anyway, labelled **"Coming Soon"**. Worth stealing: it
  makes the world feel larger than what exists today.

**Direct application:** THE WAREHOUSE / THE VILLA / THE CREATIVE LOUNGE want the same
treatment — a consistent formula, not three ad-hoc taglines. The owner's notes already
gestured at this ("LIGHT. SCALE. POSSIBILITY."); Habitas shows it done systematically.

### Altter Studio — material as the hero
`altterstudio.com`

- The hero image **is texture** — a split of travertine, bronze and dark plaster in raking
  light. No product, no person. Pure material.
- Lowercase wordmark left, tiny lowercase nav right, centred light-sans statement in the
  middle, thin outline pill CTA.
- Numbered `01–04` methodology list.

This is the reference for the texture and light requirements in `DIRECTION.md`. It proves a
section can carry entirely on material and shadow — which matters, because OutWest's photo
library has almost no texture frames yet.

### Six N. Five — the editorial portfolio
`sixnfive.com`

- **Independently scrolling columns** under pinned oversized serif headers (`DIGITAL` /
  `PHYSICAL`), separated by thin vertical rules. Columns scroll at different rates.
- Captions are `Title (Year)` with an italic serif subtitle underneath.
- Deliberately *not* a uniform grid — image sizes vary down each column.

**Direct application:** MADE OUT WEST. A portfolio of many photographers' work in many
styles needs exactly this — varied sizes and a magazine rhythm, not a tidy grid. Also
delivers the "some imagery moves horizontally" micro-interaction.

### Shoppe Amber Lewis — the warm minimal baseline
`shoppe.amberinteriordesign.com`

- Wide-tracked serif wordmark, hairline nav, very light warm-neutral ground.
- Hero with bottom-left overlay text and a **thin outline button**, then a centred serif
  statement line: *"A covetable collection of timeless pieces that make any house a home."*
- Commerce that doesn't look like commerce. Restraint at every level.

Useful as the calibration point for how light and warm the ground can go while still
feeling premium — very close to Alabaster `#F0EBE2`.

### ECB Studio — the functional model
`everythingcottonball.com`

A rental studio that also sells memberships, products and residencies. Aesthetically
templated, but the **information architecture** is the closest to OutWest's actual business:

- Announcement bar: `Studio Memberships Available | Become A Member`
- Nav carries **"Artist In Residence"** and **"Story"** alongside the commerce items
- A scrolling marquee for current offers

Worth noting that membership, rental, residency and editorial can coexist in one nav.

### Peerspace — the listing card
`peerspace.com/venues/seattle--wa`

Not an aesthetic reference — a **functional** one, and the designer flagged it for the
layout of spaces and options. The card is the useful part:

> image · name · neighbourhood · rating · capacity · truncated description · **From $X/hr** ·
> **N hr min**

Four-up grids, grouped into rows by activity, each row ending in "See all listings."

**Direct application:** the booking page, not the homepage. When OutWest finally has to be
transactional, this is the density the information wants — capacity, hourly rate, and
minimum are the three facts a renter looks for. Keep it deep in the site.

### Icon Studio Space — the counter-example
`iconstudiospace.com`

A direct competitor, and a near-perfect inventory of what `DIRECTION.md` says to avoid:
"Unleash Your Creativity" as a headline, a filled pill BOOK NOW, `Home / Rooms / Info /
Policies / About / Contact` navigation, and a wall of keyword-bolded SEO copy.

**One thing worth taking:** the rooms are *named* — White Room, Iconic Room, Art Room, Soho
Room, Elle Room — each with its own page. The instinct is right; the execution is generic.
OutWest's Warehouse / Villa / Lounge is the same move with actual conviction.

---

## What this settles

Patterns that appear in three or more of the references, which I'll treat as decided
unless told otherwise:

1. **Text-link CTAs, not buttons.** Brunello, Amangiri, Habitas and Six N. Five all use
   underlined or arrow-suffixed text links for navigation into content. Filled buttons are
   reserved for the single transactional action. → OutWest gets one filled control, `BOOK`,
   and everything else is `EXPLORE →`.

2. **One persistent booking affordance, top right.** Amangiri's "Reserve", ECB's "Become A
   Member", Peerspace's "Sign Up". The owner's nav spec already puts BOOK on the right; the
   references confirm it should be the only emphasised element in the masthead.

3. **Eyebrow → Title → short copy → link.** The universal content module. Every reference
   uses some version. This becomes a single reusable `<Module>` component.

4. **A naming formula for the spaces.** Habitas proves consistency matters more than any
   individual tagline.

5. **Editorial navigation.** Brunello's mega-menu carries imagery. Given that OutWest's
   whole argument is "the work is the story," the nav should preview the house, not list it.

6. **Varied image sizes, never a uniform grid.** Six N. Five, Brunello, Amangiri all break
   the grid deliberately. Relevant given the library is 55/72 portrait — irregularity is an
   asset here, not a problem to solve.

7. **No pricing, no FAQ, no amenity lists above the fold** — or anywhere near the homepage.
   Amangiri and Habitas carry none at all. Peerspace and Icon carry them everywhere, and
   both read as marketplaces rather than destinations.

## What to be careful about

- **Brunello and Amangiri have enormous photo libraries.** Both lean on many frames per
  section. OutWest has 72 usable frames, only five of which show the space. Copying their
  density will expose the gaps — better to use fewer images larger.
- **Amangiri's hero is video.** We don't have any. The opening beat needs an honest fallback
  until the film exists (a strong stills-based hero, built so video can drop in later).
- **Altter's hero is pure material.** We have effectively no texture frames. That section is
  blocked on photography, not on build.
- **Habitas is very heavy JavaScript** — slow first paint, blank until hydration. The
  aesthetic is worth taking; the performance is not.
