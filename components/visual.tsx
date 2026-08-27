import { cn } from "@/lib/ui/cn";

// CODE-DRAWN ARTWORK — the default visual material for these templates.
//
// It is drawn from the theme tokens rather than shipped as image files, which buys three things
// that a stock photograph cannot: it re-skins automatically when a design reference rewrites the
// palette, it carries no licence and no bytes into the client's repository, and it can never be
// the same picture as another client's site.
//
// Client photographs go in the slots below (`PhotoSlot`), which are deliberately obvious about
// being empty rather than pretending with a grey rectangle.

/** A soft field of overlapping brand-derived washes. Used behind heroes and as a card backdrop. */
export function Aura({ className, seed = 0 }: { className?: string; seed?: number }) {
    const a = 30 + ((seed * 37) % 40);
    const b = 55 + ((seed * 53) % 30);
    return (
        <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
            <div
                className="absolute -inset-[20%] opacity-[0.55]"
                style={{
                    background: `radial-gradient(60% 55% at ${a}% ${b}%, var(--color-brand-tint), transparent 70%),
                                 radial-gradient(45% 45% at ${100 - a}% ${100 - b}%, var(--color-brand-tint), transparent 65%)`,
                }}
            />
        </div>
    );
}

/** A fine rule grid. Reads as drafting paper rather than decoration, and costs one element. */
export function Grid({ className }: { className?: string }) {
    return (
        <div
            aria-hidden
            className={cn("pointer-events-none absolute inset-0", className)}
            style={{
                backgroundImage:
                    "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent 85%)",
            }}
        />
    );
}

/** Where a client photograph goes. Says so, rather than shipping a placeholder that looks like a
 *  design decision — an unfilled slot the client cannot recognise never gets filled. */
export function PhotoSlot({
    label,
    ratio = "4 / 3",
    className,
}: {
    label: string;
    ratio?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative isolate flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-dashed border-line bg-surface-2",
                className,
            )}
            style={{ aspectRatio: ratio }}
        >
            <Aura seed={label.length} />
            <p className="relative z-10 max-w-[16rem] px-6 text-center font-mono text-[11px] leading-relaxed tracking-wide text-fg-subtle">
                {label}
                <br />
                <span className="opacity-70">add an image to replace this</span>
            </p>
        </div>
    );
}
