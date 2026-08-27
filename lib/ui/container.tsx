import { cn } from "@/lib/ui/cn";

// The page's horizontal rhythm, in one place. Every section uses it, so changing the measure
// changes the whole site rather than eleven components — and a section that hardcodes its own
// max-width is the thing that makes a redesign take a week.
//
// ONE width, no prop. It had three; twelve call sites all passed the same one and the other two
// were never used. A reading column is a `max-w-*` on the prose itself, where it belongs, rather
// than a container variant nobody reached for.
export function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("mx-auto w-full max-w-[88rem] px-6 md:px-8", className)}>{children}</div>;
}

/** Vertical rhythm. Reads its padding from the density token so a template can be airy or compact
 *  without every section being edited. */
export function Section({
    children,
    id,
    className,
}: {
    children: React.ReactNode;
    id?: string;
    className?: string;
}) {
    return (
        <section id={id} className={cn("py-[var(--space-section)]", className)}>
            {children}
        </section>
    );
}
