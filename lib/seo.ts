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

// Structured data, so machines can read the business and not just the page.
//
// This matters more than it used to. Search engines increasingly answer rather than link, and the
// answer engines in front of them read structured data first — a site whose opening hours, phone
// number and location exist only as styled text is legible to a person and opaque to everything
// that now decides whether that person ever arrives.
//
// Built from the SAME `site` contract the page renders, so the markup cannot claim something the
// page does not say. `schemaType` differs per template (a plumber is a LocalBusiness, a coach is a
// ProfessionalService, a designer is a Person), which is why it is a parameter rather than a
// constant — this file is byte-identical across all three templates.
export function buildJsonLd(schemaType: "LocalBusiness" | "ProfessionalService" | "Person") {
    const b = site.business;
    return {
        "@context": "https://schema.org",
        "@type": schemaType,
        name: b.name,
        description: b.tagline,
        url: SITE_URL,
        email: b.email,
        ...(b.phone ? { telephone: b.phoneHref ?? b.phone } : {}),
        // `location` is free text by contract, so it is emitted as an address LOCALITY rather than
        // split into street/city/postcode fields that would be invented rather than known.
        ...(b.location ? { address: { "@type": "PostalAddress", addressLocality: b.location } } : {}),
        ...(b.socials?.length ? { sameAs: b.socials.map((s) => s.href) } : {}),
    };
}
