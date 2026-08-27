import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PhotoSlot } from "@/components/visual";

// The about section: a portrait slot beside the studio's own words.
//
// ONE SECTION PER FILE. All five of these lived in a single `section-blocks.tsx`, which meant
// "change the pricing tiers" made the agent read the services, about, testimonials and FAQ markup
// too — the exact cost the one-file rule exists to prevent, and a rule that was agreed before this
// was written. Splitting them was the first fix out of that audit.

export function About() {
    const a = site.about;
    if (!a) return null;
    return (
        <Section id="about" className="border-y border-line bg-surface-2">
            <Container>
                <div className="grid gap-14 md:grid-cols-2 md:items-center">
                    <Reveal travel="lg">
                        <PhotoSlot label="A portrait, or the studio" ratio="4 / 5" />
                    </Reveal>
                    <div>
                        <SectionHeading title={a.title} />
                        <Reveal delay={0.1}>
                            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{a.body}</p>
                        </Reveal>
                        {a.points?.length ? (
                            <Stagger className="mt-8 space-y-3">
                                {a.points.map((p) => (
                                    <StaggerItem key={p} travel="sm" className="flex gap-3">
                                        <span aria-hidden className="mt-2 h-px w-5 shrink-0 bg-brand" />
                                        <span className="leading-relaxed text-fg-muted">{p}</span>
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        ) : null}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
