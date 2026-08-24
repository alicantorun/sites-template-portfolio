import { site } from "@/lib/content";

// One quiet section. No form: until the portal's lead-capture endpoint ships, an email link is
// the path that actually works, and a form that silently goes nowhere would be worse than none.
export function Contact() {
    const c = site.contact;
    return (
        <section id="contact" className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl px-6 py-20">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {c.title}
                </h2>
                <p className="mt-3 max-w-xl text-neutral-600">{c.subtitle}</p>
                <a
                    href={`mailto:${site.business.email}`}
                    className="mt-8 inline-block text-xl font-medium tracking-tight text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 sm:text-2xl"
                >
                    {site.business.email}
                </a>
            </div>
        </section>
    );
}
