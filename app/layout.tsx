import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";

// SEO metadata is driven from the content contract, so a content edit updates the tab title
// and the share description too.
export const metadata: Metadata = {
    title: `${site.business.name} — ${site.business.discipline}`,
    description: site.hero.subtitle,
    openGraph: {
        title: `${site.business.name} — ${site.business.discipline}`,
        description: site.hero.subtitle,
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-white text-neutral-900 antialiased">
                {children}
            </body>
        </html>
    );
}
