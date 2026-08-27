import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { Contact } from "@/components/contact";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: `Work — ${site.business.name}`,
    description: site.work?.subtitle ?? site.hero.subtitle,
});

export default function WorkPage() {
    return (
            <main id="main">
                <WorkGrid />
                <Contact />
            </main>
    );
}
