import { site } from "@/lib/content";

export function About() {
    const a = site.about;
    // Optional in the shared contract — absent content renders nothing, never an empty heading.
    if (!a) return null;

    return (
        <section id="about" className="mx-auto max-w-5xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {a.title}
                </h2>
                <div>
                    <p className="text-base leading-relaxed text-neutral-700">
                        {a.body}
                    </p>
                    {a.points?.length ? (
                        <ul className="mt-8 space-y-2 border-t border-neutral-200 pt-6">
                            {a.points.map((p) => (
                                <li key={p} className="text-sm text-neutral-500">
                                    {p}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
