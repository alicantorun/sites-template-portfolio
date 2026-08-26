import { site } from "@/lib/content";

export function Nav() {
    return (
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
                <a href="#" className="min-w-0">
                    <span className="truncate text-base font-semibold tracking-tight text-brand">
                        {site.business.name}
                    </span>
                </a>
                <nav className="flex gap-6">
                    {site.nav.map((n) => (
                        <a
                            key={n.href}
                            href={n.href}
                            className="text-sm text-neutral-500 transition-colors hover:text-brand"
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
