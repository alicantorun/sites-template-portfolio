import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Services } from "@/components/services";
import { Faq } from "@/components/faq";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: `Services — ${site.business.name}`,
    description: site.services?.subtitle ?? site.hero.subtitle,
});

export default function Page() {
    return (
            <main id="main">
                <Services />
                <Faq />
                <Contact />
            </main>
    );
}
