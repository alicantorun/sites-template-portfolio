import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

// SEO metadata is driven from the content contract, so a content edit updates the tab title and
// the share card too. It goes through `buildMetadata` rather than a hand-written object because
// Next REPLACES a parent `openGraph` wholesale — a page that later sets one field of its own would
// silently drop everything inherited from here. One builder, always the complete block.
export const metadata: Metadata = buildMetadata({
    title: `${site.business.name} — ${site.business.tagline}`,
    description: site.hero.subtitle,
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-white text-neutral-900 antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
