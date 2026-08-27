import Link from "next/link";
import { cn } from "@/lib/ui/cn";

// Every call-to-action on the site, in one component.
//
// It exists mainly so the focus ring, the press feedback and the transition are the same
// everywhere — the three things that are individually trivial and collectively the difference
// between a site that feels built and one that feels assembled. Brand colour comes from the theme
// tokens, never a fixed Tailwind palette class, so a design-reference apply re-skins every button
// on the site by rewriting three variables.
const BASE =
    "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
    "rounded-[var(--radius-control)] transition-[background-color,color,border-color,transform] " +
    "duration-[var(--motion-fast)] ease-[var(--ease-out)] " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

// Two variants and two sizes, because that is what the templates use. A `ghost` variant and an
// `sm` size were here and had zero callers — options nobody passes are not flexibility, they are
// a larger surface for the agent to choose wrongly from.
const VARIANT = {
    primary: "bg-brand text-on-brand hover:bg-brand-dark",
    secondary: "border border-line bg-surface text-fg hover:bg-surface-2",
} as const;

const SIZE = {
    base: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
} as const;

type Props = {
    children: React.ReactNode;
    href?: string;
    variant?: keyof typeof VARIANT;
    size?: keyof typeof SIZE;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
};

export function Button({
    children,
    href,
    variant = "primary",
    size = "base",
    className,
    type = "button",
    disabled,
}: Props) {
    const classes = cn(BASE, VARIANT[variant], SIZE[size], className);
    // An in-page anchor is a plain <a>: next/link prefetches routes, and "#contact" is not one.
    if (href) {
        return href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") ? (
            <a href={href} className={classes}>
                {children}
            </a>
        ) : (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }
    return (
        <button type={type} className={classes} disabled={disabled}>
            {children}
        </button>
    );
}
