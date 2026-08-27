"use client";

import { m } from "motion/react";
import { DURATION, EASE, TRAVEL, STAGGER, VIEWPORT } from "@/lib/motion";

// SCROLL REVEALS — the whole motion surface of these templates, in two components.
//
// They are WRAPPERS, and that is the point: the section they animate is passed as `children` and
// stays a Server Component. Only this file ships to the browser, so adding motion to a page costs
// the wrapper, not the page. It also means the coding agent edits copy and layout in plain server
// components and cannot break the motion system while doing it.
//
// `prefers-reduced-motion` is honoured by rendering the content in its final state with no
// animation at all, rather than by shortening the duration. Someone who asks for reduced motion is
// often asking because movement makes them ill, and a fast animation is still an animation.
//
// EVERY wrapper carries `data-reveal`, and globals.css has a <noscript> rule forcing those to full
// opacity. Without it the server sends `opacity: 0` inline and JavaScript is the only thing that
// ever removes it — so a failed hydration, a blocked bundle or a client with JS off gets a page
// with a header, a footer and nothing in between. Found by screenshotting the page: a full-page
// capture does not scroll, so IntersectionObserver never fires and every section below the fold
// came out blank. A real visitor scrolling is fine; a crawler, a screenshot and a no-JS reader
// are not, and this site is screenshotted by our own design-reference feature.

export function Reveal({
    children,
    delay = 0,
    travel = "base",
    duration = "base",
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    travel?: keyof typeof TRAVEL;
    duration?: keyof typeof DURATION;
    className?: string;
}) {
    return (
        <m.div
            data-reveal
            className={className}
            initial={{ opacity: 0, y: TRAVEL[travel] }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DURATION[duration], ease: EASE.out, delay }}
        >
            {children}
        </m.div>
    );
}

/** A group whose children arrive one after another. Wrap the group in <Stagger> and each child in
 *  <StaggerItem>; the delay is computed by the parent so a card does not need to know its index. */
export function Stagger({
    children,
    gap = "base",
    className,
}: {
    children: React.ReactNode;
    gap?: keyof typeof STAGGER;
    className?: string;
}) {
    return (
        <m.div
            data-reveal
            className={className}
            initial="hidden"
            whileInView="shown"
            viewport={VIEWPORT}
            variants={{ shown: { transition: { staggerChildren: STAGGER[gap] } } }}
        >
            {children}
        </m.div>
    );
}

export function StaggerItem({
    children,
    travel = "base",
    className,
}: {
    children: React.ReactNode;
    travel?: keyof typeof TRAVEL;
    className?: string;
}) {
    return (
        <m.div
            data-reveal
            className={className}
            variants={{
                hidden: { opacity: 0, y: TRAVEL[travel] },
                shown: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
            }}
        >
            {children}
        </m.div>
    );
}
