import type { Site } from "@/lib/site-schema";

// The content for THIS site: every fact about the studio and the work in ONE typed module. Adding
// a project is one entry here; the grid, the footer and the SEO metadata all read from it. The
// agent edits this file for CONTENT and the components for STRUCTURE and DESIGN.
//
// The SHAPE lives in `lib/site-schema.ts` and is identical in every template — only the VALUES
// below are this site's. The plain ANNOTATION is what makes tsc enforce it: a missing required
// field fails here at the definition, and so does a field the contract does not know about.
// Deliberately not `as const` — that produces readonly arrays, which do not satisfy the contract's
// mutable ones, and nothing in this template needs the literal types it would buy.
//
// This template leads with the WORK. There is no services list and no pricing, because a
// portfolio's job is to make someone want to ask — the asking happens in one quiet section at the
// end. `phone`, `hero.secondaryCta`, `hero.stats`, `services`, `areas` and `hours` are absent for
// the same reason: the contract marks them optional precisely so a template can leave out what
// would be filler.
export const site: Site = {
    business: {
        name: "Mira Okonjo",
        // The line that sits under the name and goes in the page title. This was `discipline`
        // before the shared contract; `tagline` is the contract's name for the same job.
        tagline: "Brand & editorial design",
        email: "studio@miraokonjo.example",
        location: "Lisbon, working remotely",
        socials: [
            { label: "Instagram", href: "https://instagram.com/" },
            { label: "Are.na", href: "https://are.na/" },
        ],
    },
    nav: [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ],
    hero: {
        eyebrow: "Independent studio · Lisbon",
        title: "Brand and editorial design for people with something specific to say.",
        subtitle:
            "I work with small teams on identity, publications and the odd stubborn website. Usually six weeks, usually just me.",
        primaryCta: { label: "See the work", href: "#work" },
    },
    work: {
        title: "Selected work",
        subtitle: "A few recent projects. Happy to walk through any of them.",
        projects: [
            {
                name: "Verso Press",
                kind: "Identity & book series",
                year: "2026",
                blurb:
                    "A wordmark and a 40-title series grid for an independent publisher moving from one-off covers to a recognisable shelf.",
            },
            {
                name: "Kessler Labs",
                kind: "Brand system",
                year: "2025",
                blurb:
                    "Naming, identity and a documentation style for a research group that kept being mistaken for a consultancy.",
            },
            {
                name: "The Long Field",
                kind: "Editorial & site",
                year: "2025",
                blurb:
                    "A quarterly essay journal: typographic system, issue templates, and a reading site that stays out of the way.",
            },
            {
                name: "Atlas Coffee",
                kind: "Packaging",
                year: "2024",
                blurb:
                    "A packaging range that survives a wholesale shelf and still reads at arm's length in a café.",
            },
        ],
    },
    about: {
        title: "About",
        body: "I have been designing independently for nine years, mostly for publishers, cultural institutions and small research teams. I like projects with a real constraint in them — a printing budget, a shelf, a reading distance. I work alone and take one project at a time, which is why the calendar is usually the honest answer about when we could start.",
        points: [
            "Identity, editorial and packaging",
            "One project at a time, typically six weeks",
            "Available from March",
        ],
    },
    contact: {
        title: "Work together",
        subtitle:
            "Tell me what you are making and roughly when. I reply to everything, usually within two days.",
    },
};
