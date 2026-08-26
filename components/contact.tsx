import { site } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
import { contactDeliveryConfigured } from "@/lib/services/contact";

// One quiet section. The email address stays the headline — it suits the work and it always
// works — with a short form under it for anyone who would rather type than open a mail client.
//
// That order is the point, not a layout preference: the mailto needs no JavaScript, no API route
// and no rate limiter to be standing. The form is the convenience; the address is the guarantee.
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
                    className="mt-8 inline-block text-xl font-medium tracking-tight text-brand underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-brand sm:text-2xl"
                >
                    {site.business.email}
                </a>
                <div className="mt-12 max-w-xl border-t border-neutral-200 pt-10">
                    <p className="text-sm text-neutral-500">Or send it from here.</p>
                    <div className="mt-6">
                        {contactDeliveryConfigured() && <ContactForm />}
                    </div>
                </div>
            </div>
        </section>
    );
}
