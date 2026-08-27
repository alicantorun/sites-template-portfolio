import Link from "next/link";
import { site } from "@/lib/content";
import { Container, Section } from "@/lib/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/lib/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PhotoSlot } from "@/components/visual";

// The work index, and the same grid used for "selected work" on the home page.
//
// `limit` is why one component serves both: a home page showing three projects and an index
// showing all of them are the same design, and duplicating it is how the two drift apart until a
// change to one is invisible on the other.
export function WorkGrid({ limit, heading = true }: { limit?: number; heading?: boolean }) {
    const work = site.work;
    if (!work) return null;
    const projects = limit ? work.projects.slice(0, limit) : work.projects;

    return (
        <Section id="work">
            <Container>
                {heading ? (
                    <SectionHeading title={work.title} subtitle={work.subtitle} />
                ) : null}

                <Stagger className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2" gap="loose">
                    {projects.map((p, i) => (
                        <StaggerItem key={p.slug} travel="lg" className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                            <Link href={`/work/${p.slug}`} className="group block">
                                <PhotoSlot
                                    label={`${p.name} — cover image`}
                                    ratio={i % 3 === 0 ? "16 / 9" : "4 / 3"}
                                    className="transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:-translate-y-1"
                                />
                                <div className="mt-5 flex items-baseline justify-between gap-6">
                                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-fg">
                                        {p.name}
                                    </h3>
                                    <span className="shrink-0 font-mono text-xs tabular-nums text-fg-subtle">
                                        {p.year}
                                    </span>
                                </div>
                                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                                    {p.kind}
                                </p>
                                <p className="mt-3 max-w-prose leading-relaxed text-fg-muted">{p.blurb}</p>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>

                {limit && work.projects.length > limit ? (
                    <Reveal travel="sm" className="mt-14">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-sm font-medium text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-brand"
                        >
                            All {work.projects.length} projects →
                        </Link>
                    </Reveal>
                ) : null}
            </Container>
        </Section>
    );
}
