import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Stagger, StaggerItem } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";

// The questions a buyer asks before enquiring. Also the cheapest SEO surface on the site.
//
// ONE SECTION PER FILE. All five of these lived in a single `section-blocks.tsx`, which meant
// "change the pricing tiers" made the agent read the services, about, testimonials and FAQ markup
// too — the exact cost the one-file rule exists to prevent, and a rule that was agreed before this
// was written. Splitting them was the first fix out of that audit.

export function Faq() {
    const f = site.faq;
    if (!f) return null;
    return (
        <Section>
            <Container>
                <SectionHeading title={f.title} subtitle={f.subtitle} />
                <Stagger className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
                    {f.items.map((item) => (
                        <StaggerItem key={item.q} travel="sm">
                            {/* A real <details>: open by keyboard, findable by in-page search, and
                                works with no JavaScript at all. */}
                            <details className="group py-5">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-medium text-fg marker:hidden">
                                    {item.q}
                                    <span
                                        aria-hidden
                                        className="shrink-0 text-fg-subtle transition-transform duration-[var(--motion-fast)] group-open:rotate-45"
                                    >
                                        +
                                    </span>
                                </summary>
                                <p className="mt-3 max-w-prose leading-relaxed text-fg-muted">{item.a}</p>
                            </details>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Container>
        </Section>
    );
}
