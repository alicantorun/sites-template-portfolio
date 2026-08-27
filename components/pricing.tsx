import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/lib/ui/button";

// Published prices. Absent from a template whose business does not publish them.
//
// ONE SECTION PER FILE. All five of these lived in a single `section-blocks.tsx`, which meant
// "change the pricing tiers" made the agent read the services, about, testimonials and FAQ markup
// too — the exact cost the one-file rule exists to prevent, and a rule that was agreed before this
// was written. Splitting them was the first fix out of that audit.

export function Pricing() {
    const p = site.pricing;
    if (!p) return null;
    return (
        <Section id="pricing">
            <Container>
                <SectionHeading title={p.title} subtitle={p.subtitle} />
                <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
                    {p.tiers.map((tier) => (
                        <StaggerItem key={tier.name}>
                            <div
                                className={
                                    "flex h-full flex-col rounded-[var(--radius-card)] border p-8 " +
                                    (tier.featured
                                        ? "border-brand bg-brand-tint"
                                        : "border-line bg-surface")
                                }
                            >
                                <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-fg">
                                    {tier.name}
                                </h3>
                                <p className="mt-4 flex items-baseline gap-1.5">
                                    <span className="font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-fg">
                                        {tier.price}
                                    </span>
                                    {tier.cadence ? (
                                        <span className="text-sm text-fg-subtle">{tier.cadence}</span>
                                    ) : null}
                                </p>
                                <p className="mt-4 leading-relaxed text-fg-muted">{tier.blurb}</p>
                                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex gap-3 text-sm text-fg-muted">
                                            <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-brand" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-2">
                                    <Button
                                        href={tier.cta?.href ?? "/contact"}
                                        variant={tier.featured ? "primary" : "secondary"}
                                        className="w-full"
                                    >
                                        {tier.cta?.label ?? "Enquire"}
                                    </Button>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
                {p.note ? (
                    <Reveal travel="sm">
                        <p className="mt-8 text-sm text-fg-subtle">{p.note}</p>
                    </Reveal>
                ) : null}
            </Container>
        </Section>
    );
}
