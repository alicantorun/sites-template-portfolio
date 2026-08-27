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
// This template leads with the WORK. It is now a multi-page site — the nav entries are ROUTES,
// not in-page anchors — and every project carries a `slug`, because /work/[slug] renders a real
// case study from it. `areas` and `hours` stay absent: the contract marks fields optional
// precisely so a template can leave out what would be filler.
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
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "Pricing", href: "/pricing" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    hero: {
        eyebrow: "Independent studio · Lisbon",
        title: "Brand and editorial design for people with something specific to say.",
        subtitle:
            "I work with small teams on identity, publications and the odd stubborn website. Usually six weeks, usually just me.",
        primaryCta: { label: "See the work", href: "/work" },
        secondaryCta: { label: "Start a project", href: "/contact" },
        stats: [
            { value: "9 yrs", label: "independent" },
            { value: "40+", label: "projects shipped" },
            { value: "1", label: "project at a time" },
        ],
    },
    work: {
        title: "Selected work",
        subtitle: "A few recent projects. Happy to walk through any of them.",
        projects: [
            {
                slug: "quarto-review",
                name: "Quarto Review",
                kind: "Identity · Editorial",
                year: "2026",
                blurb:
                    "A quarterly literary review that had outgrown a logo made in a hurry. New wordmark, a type system that survives long essays, and a grid the volunteer editors can actually use.",
                detail: {
                    summary:
                        "Rebuilding a literary quarterly's identity around the constraint that nobody on staff is a designer.",
                    role: "Identity, editorial system, templates",
                    services: ["Identity", "Editorial design", "Type system"],
                    body: [
                        "Quarto had been running for eleven years on a wordmark someone made in an afternoon and a layout that had been rebuilt from scratch for every issue. The brief was not really a rebrand. It was to make the next forty issues possible without a designer in the room.",
                        "We settled on one text face and one display cut, and a grid with three permitted column arrangements — not because three is elegant, but because a volunteer editor at eleven at night should not be making a layout decision. Everything else in the system is a rule about spacing.",
                        "The identity came last and stayed quiet. A review is judged on what it publishes, and a wordmark that competes with the essays is a wordmark doing the wrong job.",
                    ],
                    outcome: [
                        { value: "4 issues", label: "produced without design help" },
                        { value: "3", label: "permitted layouts" },
                    ],
                },
            },
            {
                slug: "hallow-press",
                name: "Hallow Press",
                kind: "Identity · Packaging",
                year: "2025",
                blurb:
                    "A small press printing poetry on a shoestring. The whole identity had to survive one-colour letterpress and a photocopier, so it was designed for both from the first sketch.",
                detail: {
                    summary:
                        "An identity designed for one-colour letterpress and a photocopier, because those were the only two presses available.",
                    role: "Identity, packaging, print specification",
                    services: ["Identity", "Packaging", "Print"],
                    body: [
                        "Hallow prints short runs of poetry on a 1960s platen press and photocopies everything else. Any identity with a gradient, a tint or a hairline would have been a fiction, so the constraint went in at the sketch stage rather than being discovered at proof.",
                        "The mark is a single closed form that holds at 8mm and does not fill in when the ink is heavy. It was tested by printing it badly on purpose — over-inked, under-packed, on the wrong paper — and keeping only what survived.",
                    ],
                    outcome: [{ value: "1 colour", label: "across every application" }],
                },
            },
            {
                slug: "field-notes-app",
                name: "Field Notes",
                kind: "Product · Web",
                year: "2025",
                blurb:
                    "A note-taking tool for field researchers working offline in bad light. Mostly a typography and contrast problem wearing a product brief.",
                detail: {
                    summary:
                        "A research tool used outdoors, offline, in glare — which made it a legibility project more than a product one.",
                    role: "Product design, design system",
                    services: ["Product design", "Design system"],
                    body: [
                        "The team arrived asking for a visual refresh. Two days of watching people use it in a car park settled that the real problem was that nothing was readable at arm's length in daylight, and that the most-used control was the smallest one on screen.",
                        "The redesign is mostly bigger type, far more contrast, and a layout that assumes one thumb and a dirty screen. It looks less designed than what it replaced, which is the point.",
                    ],
                    outcome: [
                        { value: "2.4×", label: "faster entry in field tests" },
                        { value: "AAA", label: "contrast on primary text" },
                    ],
                },
            },
            {
                slug: "atlas-cartography",
                name: "Atlas Cartography",
                kind: "Identity",
                year: "2024",
                blurb:
                    "A two-person mapmaking studio that needed to look like it could take on institutional work without pretending to be bigger than it is.",
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
    services: {
        title: "How I work",
        subtitle: "Three ways projects usually start. Most end up somewhere between two of them.",
        items: [
            {
                name: "Identity",
                desc: "A wordmark, a type system and the rules that keep them coherent once I am no longer in the room. Usually four to six weeks.",
            },
            {
                name: "Editorial",
                desc: "Publications, reports and long-form layouts. Grids built for the people who will actually be filling them, not for the pitch deck.",
            },
            {
                name: "Websites",
                desc: "Small, fast, well-typeset sites. I design and build them, which means fewer handoffs and no drawings of things that cannot exist.",
            },
        ],
    },
    pricing: {
        title: "What it costs",
        subtitle:
            "Published because being cagey about money wastes both our time. Every project is quoted properly after a conversation.",
        tiers: [
            {
                name: "Short",
                price: "€4,000",
                cadence: "from",
                blurb: "One focused piece of work — a wordmark, a report, a single-page site.",
                features: ["Two weeks", "One round of revisions", "Files and a short handover"],
            },
            {
                name: "Standard",
                price: "€12,000",
                cadence: "from",
                blurb: "The usual shape: an identity or a publication system, start to finish.",
                features: [
                    "Four to six weeks",
                    "Research and two concept directions",
                    "Full system and templates",
                    "A written guide, not a PDF of screenshots",
                ],
                featured: true,
                cta: { label: "Start here", href: "/contact" },
            },
            {
                name: "Ongoing",
                price: "€2,400",
                cadence: "per month",
                blurb: "For teams who keep needing design and do not want to keep re-explaining themselves.",
                features: ["Rolling monthly", "Roughly four days a month", "Cancel with a month's notice"],
            },
        ],
        note: "Prices exclude VAT. Print, licensing and photography are quoted separately and passed through at cost.",
    },
    testimonials: {
        title: "What people say afterwards",
        items: [
            {
                quote:
                    "She spent the first week telling us which parts of the brief were wrong. It saved us about three months.",
                name: "Ines Almeida",
                role: "Editor, Quarto Review",
            },
            {
                quote:
                    "The system is simple enough that our volunteers use it correctly without being told twice. That has never been true before.",
                name: "Tomas Reis",
                role: "Hallow Press",
            },
            {
                quote:
                    "We asked for a refresh and got told our real problem was contrast. She was right, and it was cheaper.",
                name: "Dr. Sarah Cole",
                role: "Field Notes",
            },
        ],
    },
    faq: {
        title: "Before you write",
        items: [
            {
                q: "How far ahead are you booked?",
                a: "Usually six to ten weeks. I take one project at a time, which is the honest reason — and the reason the work gets full attention when it starts.",
            },
            {
                q: "Do you work with agencies?",
                a: "Sometimes, as a named collaborator rather than white-label. If my name is not on it I am probably not the right fit.",
            },
            {
                q: "Can you just do the logo?",
                a: "Rarely well. A mark with no system around it gets used badly within a month, and that is not a saving.",
            },
            {
                q: "What do you need from me to quote?",
                a: "What the thing is, roughly when you need it, and a budget range. A range is enough — I would rather tell you early that we are not a match.",
            },
        ],
    },
    contact: {
        title: "Work together",
        subtitle:
            "Tell me what you are making and roughly when. I reply to everything, usually within two days.",
    },
};
