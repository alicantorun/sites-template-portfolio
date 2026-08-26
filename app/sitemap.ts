import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/consts";

// The sitemap is DERIVED from the routes that exist, never hand-listed.
//
// An agent adds pages to this site over its life. A hand-written list would be correct on the day
// it was written and wrong the first time someone asked for a new page — and nothing would report
// it. Walking `app/` costs nothing (this runs at build) and cannot drift.
//
// Route rules follow the App Router: `(group)` and `_private` folders are not URL segments, and a
// `[dynamic]` segment is skipped because its real URLs are only knowable from data this file does
// not have. Better to omit a page than to publish a 404 into a search engine's index.
function routes(dir: string, prefix = ""): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile() && /^page\.[jt]sx?$/.test(entry.name)) out.push(prefix || "/");
        if (!entry.isDirectory()) continue;
        const n = entry.name;
        if (n.startsWith(".") || n === "api" || n === "node_modules") continue;
        if (n.startsWith("[")) continue;
        const segment = n.startsWith("(") || n.startsWith("_") || n.startsWith("@") ? "" : `/${n}`;
        out.push(...routes(join(dir, n), prefix + segment));
    }
    return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const seen = new Set(routes(join(process.cwd(), "app")));
    return [...seen].sort().map((path) => ({
        url: new URL(path, SITE_URL).toString(),
        lastModified: new Date(),
        changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
        priority: path === "/" ? 1 : 0.7,
    }));
}
