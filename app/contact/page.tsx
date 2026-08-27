import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: `Contact — ${site.business.name}`,
    description: site.contact.subtitle,
});

export default function ContactPage() {
    return (
            <main id="main">
                <Contact />
            </main>
    );
}
