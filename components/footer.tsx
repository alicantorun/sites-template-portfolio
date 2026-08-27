import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "@/lib/ui/container";

export function Footer() {
    return (
        <footer className="border-t border-line py-14">
            <Container>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-display text-lg tracking-[-0.015em] text-fg">
                            {site.business.name}
                        </p>
                        <p className="mt-1 text-sm text-fg-muted">{site.business.tagline}</p>
                        <a
                            href={`mailto:${site.business.email}`}
                            className="mt-4 inline-block text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-brand"
                        >
                            {site.business.email}
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {site.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-fg-muted transition-colors hover:text-fg"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {site.business.socials?.map((s) => (
                            <a
                                key={s.href}
                                href={s.href}
                                className="text-sm text-fg-muted transition-colors hover:text-fg"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
                <p className="mt-10 text-xs text-fg-subtle">
                    © {new Date().getFullYear()} {site.business.name}.
                    {site.business.location ? ` ${site.business.location}.` : ""}
                </p>
            </Container>
        </footer>
    );
}
