import localFont from "next/font/local";

/**
 * OutWest Creative House type system. See docs/BRAND.md.
 *
 *   Abril           display — titles, headings, ads          → --font-abril
 *   Hanken Grotesk  body — primary for all running copy      → --font-hanken
 *   Preztik         callouts & paragraph headers             → --font-preztik
 *
 * Preload is deliberate: the display and body faces render above the fold and
 * are preloaded; Preztik is an accent face used further down the page and is
 * not, to keep the preload budget small on an image-led site.
 */

/**
 * Abril — display. Ships as static instances only (no variable master).
 *
 * The pack's weight metadata is inverted: the cut named "Regular" is the HEAVIEST
 * in the family and "Medium" sits below it (measured glyph ink on `n`: Thin .0222,
 * Light .0538, Medium .0738, Regular .0917). Weights below are assigned by measured
 * weight, not by filename, so the CSS ramp stays monotonic. The true style pairs are
 * Light/LightItalic and Medium/MediumItalic; Abril-Regular has no italic counterpart.
 */
export const abril = localFont({
  src: [
    { path: "./abril/Abril-Light.woff2", weight: "300", style: "normal" },
    { path: "./abril/AbrilMedium.woff2", weight: "400", style: "normal" },
    { path: "./abril/Abril-Regular.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-abril",
  display: "swap",
  preload: true,
  fallback: ["Cormorant Garamond", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

/** Hanken Grotesk — body. Variable, 100–900, upright + true italics. */
export const hankenGrotesk = localFont({
  src: [
    {
      path: "./hanken/HankenGrotesk-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./hanken/HankenGrotesk-Italic-Variable.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-hanken",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/**
 * Preztik — callouts and paragraph headers.
 *
 * The variable axis is non-standard: named instances sit at wght 1 (ExtraLight),
 * 200.5 (Light), 400 (Regular), 520 (Medium), 640 (SemiBold), 760 (Bold),
 * 880 (ExtraBold), 1000 (Black). Asking for CSS 700 lands between the designer's
 * SemiBold and Bold. Use the numeric values above when you need an exact weight —
 * `--weight-preztik-light` and friends in globals.css name the common ones.
 */
export const preztik = localFont({
  src: [
    {
      path: "./preztik/Preztik-Variable.woff2",
      weight: "1 1000",
      style: "normal",
    },
    {
      path: "./preztik/Preztik-Italic-Variable.woff2",
      weight: "1 1000",
      style: "italic",
    },
  ],
  variable: "--font-preztik",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

/** Every family's CSS variable, for the <html> className. */
export const fontVariables = [
  abril.variable,
  hankenGrotesk.variable,
  preztik.variable,
].join(" ");
