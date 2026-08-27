import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: `Pricing — ${site.business.name}`,
    description: site.pricing?.subtitle ?? site.hero.subtitle,
});

export default function Page() {
    return (
            <main id="main">
                <Pricing />
                <Faq />
                <Contact />
            </main>
    );
}
