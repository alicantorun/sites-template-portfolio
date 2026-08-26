import { site } from "@/lib/content";

// The work grid. Each project is a text card rather than an image tile on purpose: the
// template ships with no photography, and a grid of grey placeholders reads as unfinished.
// Swapping a card for an image is a component edit the agent can make once real work exists.
export function Work() {
    const w = site.work;
    // `work` is optional in the shared contract, so a site without it renders NOTHING here rather
    // than an empty headed section. Same guard in every optional-section component.
    if (!w) return null;

    return (
        <section id="work" className="border-t border-neutral-200 bg-brand-tint">
            <div className="mx-auto max-w-5xl px-6 py-20">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {w.title}
                </h2>
                {w.subtitle && <p className="mt-3 max-w-xl text-neutral-600">{w.subtitle}</p>}
                <div className="mt-12 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
                    {w.projects.map((p) => (
                        <article key={p.name} className="bg-white p-8">
                            <div className="flex items-baseline justify-between gap-4">
                                <h3 className="text-lg font-semibold tracking-tight">
                                    {p.name}
                                </h3>
                                <span className="shrink-0 text-xs text-neutral-400">
                                    {p.year}
                                </span>
                            </div>
                            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-neutral-400">
                                {p.kind}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                                {p.blurb}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
