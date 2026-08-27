import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Reveal } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { contactDeliveryConfigured } from "@/lib/services/contact";

// The contact section. The mailto and the phone number come FIRST and work with no JavaScript;
// the form is the second way to make contact, never the only one.
export function Contact() {
    return (
        <Section id="contact" className="border-t border-line">
            <Container>
                <div className="grid gap-14 md:grid-cols-2">
                    <Reveal>
                        <div>
                            <SectionHeading
                                title={site.contact.title}
                                subtitle={site.contact.subtitle}
                            />
                            <div className="mt-8 space-y-2">
                                <a
                                    href={`mailto:${site.business.email}`}
                                    className="block text-lg text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-brand"
                                >
                                    {site.business.email}
                                </a>
                                {site.business.phone ? (
                                    <a
                                        href={`tel:${site.business.phoneHref ?? site.business.phone}`}
                                        className="block text-lg text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-brand"
                                    >
                                        {site.business.phone}
                                    </a>
                                ) : null}
                                {site.business.location ? (
                                    <p className="pt-2 text-sm text-fg-subtle">{site.business.location}</p>
                                ) : null}
                            </div>
                        </div>
                    </Reveal>
                    {/* The form renders only when delivery is actually configured. A form that
                        silently drops a visitor's message is worse than no form. */}
                    {contactDeliveryConfigured() ? (
                        <Reveal delay={0.1}>
                            <div className="rounded-[var(--radius-card)] border border-line bg-surface-2 p-8">
                                <ContactForm />
                            </div>
                        </Reveal>
                    ) : null}
                </div>
            </Container>
        </Section>
    );
}
