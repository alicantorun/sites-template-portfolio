import { site } from "@/lib/content";
import { LeadForm } from "@/components/lead-form";

// One quiet section. The email address stays the headline — it suits the work and it always
// works — with a short form under it for anyone who would rather type than open a mail client.
//
// The form waited for the portal's lead-capture endpoint rather than shipping as decoration; a
// submit that silently goes nowhere would have been worse than none. The endpoint ships, so it does.
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
                <div className="mt-12 max-w-md border-t border-neutral-200 pt-8">
                    <LeadForm
                        source="contact"
                        submitLabel="Send"
                        inputClassName="w-full border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none"
                        buttonClassName="w-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
                    />
                </div>
            </div>
        </section>
    );
}
