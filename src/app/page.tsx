import { Masthead } from "@/components/site/Masthead";
import { Footer } from "@/components/site/Footer";
import { Cover } from "@/components/home/Cover";
import { TheStatement } from "@/components/home/TheStatement";
import { Manifesto } from "@/components/home/Manifesto";
import { TheHouse } from "@/components/home/TheHouse";
import { Scale } from "@/components/home/Scale";
import { People } from "@/components/home/People";
import { Icons } from "@/components/home/Icons";
import { Shoots } from "@/components/home/Shoots";
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
      <Masthead />
      <main id="main">
        <Cover />
        <TheStatement />
        <Manifesto />
        <TheHouse />
        <Scale />
        <People />
        <Icons />
        <Shoots />
        <Collective />
        <Booking />
        <YuccaMoment />
        <Closer />
      </main>
      <Footer />
    </>
  );
}
