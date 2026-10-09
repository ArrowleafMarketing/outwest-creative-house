import { Masthead } from "@/components/site/Masthead";
import { Footer } from "@/components/site/Footer";

/**
 * The chrome every inner page shares: masthead, one <main>, footer.
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
      <Masthead />
      <main id="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
