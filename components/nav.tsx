import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "@/lib/ui/container";

// Site navigation. Multi-page now, so every entry is a ROUTE and next/link handles it — the
// single-page version used in-page anchors, which silently do nothing from /work/anything.
//
// Sticky with a translucent backdrop rather than a solid bar: on a gallery-first site the work
// should keep showing through the chrome, which is the whole reason the chrome is this quiet.
export function Nav() {
    return (
        <header className="sticky top-0 z-50 border-b border-line/70 bg-surface/80 backdrop-blur-md">
            <Container>
                <nav className="flex h-16 items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="font-display text-sm font-semibold tracking-[-0.01em] text-fg transition-opacity hover:opacity-70"
                    >
                        {site.business.name}
                    </Link>
                    <ul className="flex items-center gap-7">
                        {site.nav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm text-fg-muted transition-colors duration-[var(--motion-fast)] hover:text-fg"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
