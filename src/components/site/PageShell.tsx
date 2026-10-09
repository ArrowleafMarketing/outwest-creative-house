import { Masthead } from "@/components/site/Masthead";
import { Footer } from "@/components/site/Footer";

/**
 * The chrome every inner page shares: skip link, masthead, one <main>, footer.
 *
 * The homepage keeps its own copy of this in app/page.tsx because its Cover owns the
 * sentinel that turns the masthead transparent. Inner pages have no cover, so the masthead
 * finds no sentinel and fails SOLID — the readable state — from first paint.
 *
 * Footer publishes its own <footer> landmark; do not wrap it.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-alabaster focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink eyebrow"
      >
        Skip to content
      </a>
      <Masthead />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
