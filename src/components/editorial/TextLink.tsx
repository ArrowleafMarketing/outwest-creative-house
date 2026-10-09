import Link from "next/link";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "arrow" | "rule" | "plain";
  size?: "eyebrow" | "body" | "lg";
  className?: string;
  /** Marks the current page in a nav list. Reaches the anchor, where AT expects it. */
  "aria-current"?: "page";
  /** Overrides the accessible name when the visible label is not descriptive on its own. */
  "aria-label"?: string;
};

/**
 * Every call to action on the site.
 *
 * THERE IS NO `filled` VARIANT IN THIS TYPE, on purpose — no section can reach for a
 * button by accident. The single filled control on the entire site is BOOK, written once
 * by hand inside Masthead.tsx. This component is the enforcement point.
 */
export function TextLink({
  href,
  children,
  variant = "arrow",
  size = "eyebrow",
  className,
  "aria-current": ariaCurrent,
  "aria-label": ariaLabel,
}: TextLinkProps) {
  const sizing =
    size === "body"
      ? "font-sans text-base tracking-normal normal-case"
      : size === "lg"
        ? "text-[clamp(0.875rem,1.4vw,1.125rem)] tracking-[var(--tracking-eyebrow)]"
        : "";

  const underline =
    variant === "plain"
      ? ""
      : "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-60 after:transition-transform after:duration-[420ms] after:ease-[var(--ease-editorial)] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100";

  // In-page anchors ("#the-house") are a plain <a>. next/link treats a click on the URL
  // you are already on as a no-op, so once the hash is in the address bar a second click on
  // ENTER THE HOUSE did nothing at all. A native anchor scrolls to its target on every click.
  const Anchor = href.startsWith("#") ? "a" : Link;

  return (
    <Anchor
      href={href}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center gap-2 text-on-ground eyebrow ${sizing} ${underline} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className ?? ""}`}
    >
      {children}
      {variant === "arrow" ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-[240ms] ease-[var(--ease-editorial)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
        >
          →
        </span>
      ) : null}
    </Anchor>
  );
}
