import { site } from "@/lib/content";

// Editorial hero: large type, no image, no stats row. A portfolio's hero should get out of the
// way of the work rather than compete with it.
export function Hero() {
    const h = site.hero;
    return (
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pb-24 sm:pt-32">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                {h.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
                {h.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
                {h.subtitle}
            </p>
            <a
                href={h.primaryCta.href}
                className="mt-8 inline-block border-b border-neutral-900 pb-0.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-60"
            >
                {h.primaryCta.label} →
            </a>
        </section>
    );
}
