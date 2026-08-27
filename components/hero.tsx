import { site } from "@/lib/content";
import { Container } from "@/lib/ui/container";
import { Button } from "@/lib/ui/button";
import { Grid } from "@/components/visual";

// Every element here animates in CSS, not with <Reveal>: a scroll-reveal ships opacity:0 from
// the server and needs hydration to undo it, which leaves the FIRST screen blank for as long as
// the bundle takes. Below the fold that trade is fine. Here it is the first thing anyone sees.
//
// The hero is the only section on this site allowed to be loud, and it is loud through TYPE and
// space rather than colour — a gallery-first template that shouts in colour competes with the work
// it exists to show.
//
// Note the reveal delays: the eyebrow, headline and subtitle arrive in reading order about a tenth
// of a second apart. Long enough to read as deliberate, short enough that a returning visitor is
// not made to wait for their own site.
export function Hero() {
    return (
        <section className="relative isolate overflow-hidden border-b border-line">
            <Grid className="opacity-40" />
            <Container className="relative py-24 md:py-36">
                <div className="max-w-4xl">
                    <div className="enter"><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
                            {site.hero.eyebrow}
                        </p>
                    </div>
                    <div className="enter enter-1">
                        <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-balance text-fg">
                            {site.hero.title}
                        </h1>
                    </div>
                    <div className="enter enter-2">
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted">
                            {site.hero.subtitle}
                        </p>
                    </div>
                    <div className="enter enter-3">
                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <Button href={site.hero.primaryCta.href} size="lg">
                                {site.hero.primaryCta.label}
                            </Button>
                            {site.hero.secondaryCta ? (
                                <Button href={site.hero.secondaryCta.href} variant="secondary" size="lg">
                                    {site.hero.secondaryCta.label}
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>
                {site.hero.stats?.length ? (
                    <div className="enter enter-4">
                        <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-6 border-t border-line pt-8">
                            {site.hero.stats.map((s) => (
                                <div key={s.label}>
                                    <dt className="font-display text-2xl font-semibold tabular-nums tracking-[-0.02em] text-fg">
                                        {s.value}
                                    </dt>
                                    <dd className="mt-0.5 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                                        {s.label}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ) : null}
            </Container>
        </section>
    );
}
