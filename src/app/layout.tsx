import type { Metadata } from "next";
import { fontVariables } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "OutWest Creative House",
  description:
    "A creative house in Boise, Idaho for photographers, filmmakers, founders and brands making work worth remembering.",
};

/**
 * Sets data-motion="on" before the body paints, and only when JavaScript runs AND the
 * user has not asked for reduced motion. Every reveal on the site is scoped under that
 * attribute (see motion.css), so:
 *
 *   DELETE THIS AND EVERY ANIMATION SILENTLY STOPS. Nothing errors, nothing logs, and
 *   the page still looks basically fine — which is what makes it worth the comment.
 *
 * setAttribute, NOT toggleAttribute: toggleAttribute sets an empty value and the
 * [data-motion="on"] selector would never match.
 *
 * DECIDED ONCE PER LOAD, and deliberately not live. An earlier version listened for
 * `change` on the media query, which could set the flag AFTER Reveal had already skipped
 * observing — every element would then pick up a hidden pre-state with no observer left
 * to un-hide it, blanking the whole page until reload. Dropping the listener is safe in
 * both directions because motion.css gates on the media query AS WELL AS this attribute:
 * turn reduced-motion ON mid-session and the hidden states stop matching anyway; turn it
 * OFF and the attribute is simply absent, so nothing hides. Changing the OS setting takes
 * effect on the next navigation.
 */
const MOTION_FLAG = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-motion","on")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides scroll-behavior during navigation; this restores it,
      // which the Cover's in-page "ENTER THE HOUSE →" anchor depends on.
      data-scroll-behavior="smooth"
      // MOTION_FLAG below sets data-motion on this element before React hydrates, so the
      // client DOM legitimately differs from the server HTML. Scoped to this element's own
      // attributes only — it does not suppress anything in the subtree.
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
        {children}
      </body>
    </html>
  );
}
