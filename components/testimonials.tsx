import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Stagger, StaggerItem } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";

// Social proof, kept separate from `about` because it is the client's words.
//
// ONE SECTION PER FILE. All five of these lived in a single `section-blocks.tsx`, which meant
// "change the pricing tiers" made the agent read the services, about, testimonials and FAQ markup
// too — the exact cost the one-file rule exists to prevent, and a rule that was agreed before this
// was written. Splitting them was the first fix out of that audit.

export function Testimonials() {
    const t = site.testimonials;
    if (!t) return null;
    return (
        <Section className="border-y border-line bg-surface-2">
            <Container>
                <SectionHeading title={t.title} subtitle={t.subtitle} />
                <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
                    {t.items.map((item) => (
                        <StaggerItem key={item.name}>
                            <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-8">
                                <blockquote className="flex-1 text-lg leading-relaxed text-balance text-fg">
                                    “{item.quote}”
                                </blockquote>
                                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                                    <span className="font-medium text-fg">{item.name}</span>
                                    {item.role ? (
                                        <span className="text-fg-subtle"> · {item.role}</span>
                                    ) : null}
                                </figcaption>
                            </figure>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Container>
        </Section>
    );
}
