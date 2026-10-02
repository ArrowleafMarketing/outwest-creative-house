import { Masthead } from "@/components/site/Masthead";
import { Footer } from "@/components/site/Footer";
import { Cover } from "@/components/home/Cover";
import { TheStatement } from "@/components/home/TheStatement";
import { Manifesto } from "@/components/home/Manifesto";
import { TheHouse } from "@/components/home/TheHouse";
import { Scale } from "@/components/home/Scale";
import { People } from "@/components/home/People";
import { Icons } from "@/components/home/Icons";
import { MadeOutWest } from "@/components/home/MadeOutWest";
import { Collective } from "@/components/home/Collective";
import { Booking } from "@/components/home/Booking";
import { YuccaMoment } from "@/components/home/YuccaMoment";
import { Closer } from "@/components/home/Closer";

/**
 * THE TONAL SEQUENCE IS LOAD-BEARING.
 *
 *   paper · paper · paper · paper · OLIVE · paper · INK · paper · CANVAS · paper · CANVAS · paper
 *   ending on INK in the footer.
 *
 * Light → olive → light → ink → light → canvas → light → canvas → light → ink. This is what
 * keeps a dozen light sections from flattening into one. A second Olive or a second Ink
 * quietly costs the page its structure, so each is used exactly once above the footer.
 *
 * Each section owns its own <Surface> and therefore its own tone; there is no wrapper here
 * that could override one. Footer publishes its own <footer> landmark — do NOT wrap it.
 */
export default function Home() {
  return (
    <>
      {/* Keyboard users would otherwise tab through six nav items and BOOK on every page.
          Visually hidden until focused, then it lands on the page's own ground. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-alabaster focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink eyebrow"
      >
        Skip to content
      </a>
      <Masthead />
      <main id="main" tabIndex={-1}>
        <Cover />
        <TheStatement />
        <Manifesto />
        <TheHouse />
        <Scale />
        <People />
        <Icons />
        <MadeOutWest />
        <Collective />
        <Booking />
        <YuccaMoment />
        <Closer />
      </main>
      <Footer />
    </>
  );
}
