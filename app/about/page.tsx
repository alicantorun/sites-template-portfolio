import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: `About — ${site.business.name}`,
    description: site.about?.body ?? site.hero.subtitle,
});

export default function Page() {
    return (
            <main id="main">
                <About />
                <Testimonials />
                <Contact />
            </main>
    );
}
