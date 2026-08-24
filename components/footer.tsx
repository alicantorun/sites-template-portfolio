import { site } from "@/lib/content";

export function Footer() {
    return (
        <footer className="border-t border-neutral-200">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-neutral-400">
                <p>
                    © {new Date().getFullYear()} {site.business.name} ·{" "}
                    {site.business.location}
                </p>
                <div className="flex gap-4">
                    {site.business.social.map((s) => (
                        <a
                            key={s.href}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-neutral-900"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
