// THE CONTENT CONTRACT — identical in every template, by design.
//
// Before this, each template's `lib/content.ts` was its own shape: three schemas sharing six key
// paths. That made every instruction more specific than "edit lib/content.ts" wrong for at least
// one template, so no shared agent prompt could name a field.
//
// Now the SHAPE is fixed here and only the VALUES differ per site. Sections a given template does
// not use are simply absent — that is what the optional markers are for. Adding a field means
// adding it here first, which is the point: the contract is one file, and tsc enforces it.
export interface Site {
    business: {
        name: string;
        /** One short line under the name. Used in the page title. */
        tagline: string;
        email: string;
        /** Display form, e.g. "+44 20 7946 0321". */
        phone?: string;
        /** Dialable form for a tel: href — digits and a leading + ONLY, no spaces. */
        phoneHref?: string;
        /** Free text, e.g. "Berlin, Germany" or a street address. */
        location?: string;
        socials?: { label: string; href: string }[];
    };
    nav: { label: string; href: string }[];
    hero: {
        eyebrow: string;
        title: string;
        subtitle: string;
        primaryCta: { label: string; href: string };
        secondaryCta?: { label: string; href: string };
        /** Small proof points under the hero — years, clients, rating. */
        stats?: { value: string; label: string }[];
    };
    services?: {
        title: string;
        subtitle?: string;
        items: { name: string; price?: string; desc: string }[];
    };
    about?: { title: string; body: string; points?: string[] };
    work?: {
        title: string;
        subtitle?: string;
        projects: {
            /** URL segment for /work/[slug]. Lowercase, hyphens only — it becomes a route. */
            slug: string;
            name: string;
            kind: string;
            year: string;
            blurb: string;
            /** The detail page. Absent means the project lists but has no page of its own, which
             *  is deliberate: a case study with nothing written is worse than a card. */
            detail?: {
                summary: string;
                role?: string;
                services?: string[];
                /** Body copy, one paragraph per entry. */
                body: string[];
                outcome?: { value: string; label: string }[];
            };
        }[];
    };
    /** Published tiers. Many service businesses deliberately do not publish prices — this section
     *  is absent for them rather than filled with "POA". */
    pricing?: {
        title: string;
        subtitle?: string;
        tiers: {
            name: string;
            price: string;
            /** e.g. "per month", "per session". Absent for one-off prices. */
            cadence?: string;
            blurb: string;
            features: string[];
            /** Exactly one tier may set this; it gets the emphasised treatment. */
            featured?: boolean;
            cta?: { label: string; href: string };
        }[];
        note?: string;
    };
    /** Social proof. Kept separate from `about` because it is the client's words, not the site's. */
    testimonials?: {
        title: string;
        subtitle?: string;
        items: { quote: string; name: string; role?: string }[];
    };
    /** The questions a buyer asks before they enquire. Also the cheapest SEO surface on the site. */
    faq?: { title: string; subtitle?: string; items: { q: string; a: string }[] };
    /** Where a local business operates. */
    areas?: { title: string; subtitle?: string; items: string[] };
    hours?: { title: string; note?: string; days: { day: string; open: string }[] };
    contact: { title: string; subtitle: string };
}
