import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/consts";

// Allow everything, and say where the sitemap is.
//
// Deliberately permissive: this is a small business's marketing site, and the whole point is to be
// found — by search engines and, increasingly, by the answer engines that now sit in front of them.
// The only exclusion is /api, which holds no content and would only waste a crawler's budget.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
        sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    };
}
