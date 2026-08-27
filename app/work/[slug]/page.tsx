import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Contact } from "@/components/contact";
import { Container, Section } from "@/lib/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/lib/ui/reveal";
import { PhotoSlot } from "@/components/visual";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

// A case study, rendered from the project's own `detail` block.
//
// generateStaticParams lists ONLY projects that have a detail block, so a project without a
// written case study lists on the index and has no page — which is deliberate. A case study
// containing nothing is worse than a card that links nowhere.
function project(slug: string) {
    return site.work?.projects.find((p) => p.slug === slug);
}

export function generateStaticParams() {
    return (site.work?.projects ?? []).filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const p = project((await params).slug);
    if (!p) return buildMetadata({ title: "Not found", description: "" });
    return buildMetadata({
        title: `${p.name} — ${site.business.name}`,
        description: p.detail?.summary ?? p.blurb,
    });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const p = project((await params).slug);
    if (!p?.detail) notFound();
    const d = p.detail;

    return (
            <main id="main">
                <Section className="border-b border-line">
                    <Container>
                        <Reveal travel="sm" duration="fast">
                            <Link
                                href="/work"
                                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle transition-colors hover:text-fg"
                            >
                                ← Work
                            </Link>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-fg">
                                {p.name}
                            </h1>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
                                {d.summary}
                            </p>
                        </Reveal>
                        <Reveal delay={0.18} travel="sm">
                            <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
                                <div>
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                                        Year
                                    </dt>
                                    <dd className="mt-2 tabular-nums text-fg">{p.year}</dd>
                                </div>
                                {d.role ? (
                                    <div>
                                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                                            Role
                                        </dt>
                                        <dd className="mt-2 text-fg">{d.role}</dd>
                                    </div>
                                ) : null}
                                {d.services?.length ? (
                                    <div>
                                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                                            Services
                                        </dt>
                                        <dd className="mt-2 text-fg">{d.services.join(", ")}</dd>
                                    </div>
                                ) : null}
                            </dl>
                        </Reveal>
                    </Container>
                </Section>

                <Section>
                    <Container>
                        <Reveal travel="lg">
                            <PhotoSlot label={`${p.name} — lead image`} ratio="16 / 9" />
                        </Reveal>
                        <Stagger className="mx-auto mt-16 max-w-2xl space-y-6">
                            {d.body.map((para) => (
                                <StaggerItem key={para.slice(0, 32)} travel="sm">
                                    <p className="text-lg leading-relaxed text-fg-muted">{para}</p>
                                </StaggerItem>
                            ))}
                        </Stagger>
                        {d.outcome?.length ? (
                            <Reveal travel="sm">
                                <dl className="mx-auto mt-14 flex max-w-2xl flex-wrap gap-x-14 gap-y-6 border-t border-line pt-8">
                                    {d.outcome.map((o) => (
                                        <div key={o.label}>
                                            <dt className="font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-fg">
                                                {o.value}
                                            </dt>
                                            <dd className="mt-1 text-sm text-fg-subtle">{o.label}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Reveal>
                        ) : null}
                        <Reveal travel="lg" className="mt-16">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <PhotoSlot label={`${p.name} — detail`} />
                                <PhotoSlot label={`${p.name} — detail`} />
                            </div>
                        </Reveal>
                    </Container>
                </Section>
                <Contact />
            </main>
    );
}
