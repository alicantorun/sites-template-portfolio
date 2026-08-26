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
        projects: { name: string; kind: string; year: string; blurb: string }[];
    };
    /** Where a local business operates. */
    areas?: { title: string; subtitle?: string; items: string[] };
    hours?: { title: string; note?: string; days: { day: string; open: string }[] };
    contact: { title: string; subtitle: string };
}
