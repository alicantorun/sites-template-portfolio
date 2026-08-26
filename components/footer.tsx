import { site } from "@/lib/content";

export function Footer() {
    const { name, location, socials } = site.business;
    return (
        <footer className="border-t border-neutral-200">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-neutral-400">
                {/* `location` is optional in the contract, so the separator is bound to it — a
                    dangling "·" is exactly the kind of small wrongness a template ships forever. */}
                <p>
                    © {new Date().getFullYear()} {name}
                    {location ? ` · ${location}` : ""}
                </p>
                <div className="flex gap-4">
                    {(socials ?? []).map((s) => (
                        <a
                            key={s.href}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-brand"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
