import type { Metadata } from "next";
import { site } from "@/lib/content";
import { SITE_URL } from "@/lib/consts";

// Build a page's metadata.
//
// The trap this exists for: Next.js REPLACES the parent `openGraph` object wholesale — there is no
// deep merge — so a page that sets only `openGraph.title` silently loses the og:image inherited
// from the layout. Every page therefore carries the complete block, and this builds it.
export function buildMetadata(params: {
    title: string;
    description: string;
    path?: string;
}): Metadata {
    const url = new URL(params.path ?? "/", SITE_URL).toString();
    return {
        title: params.title,
        description: params.description,
        alternates: { canonical: url },
        openGraph: {
            title: params.title,
            description: params.description,
            url,
            siteName: site.business.name,
            type: "website",
        },
        twitter: { card: "summary_large_image", title: params.title, description: params.description },
    };
}
