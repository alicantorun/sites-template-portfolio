"use client";

import { LazyMotion, domAnimation } from "motion/react";

// The ONE place the animation feature bundle is loaded.
//
// Every animated element in these templates is an `m.*` component, never `motion.*`. `motion.*`
// pulls the whole library into the client bundle (~34kb); `m.*` plus this provider loads only the
// DOM animation features (~6kb), which is what keeps the performance budget while still using a
// real animation library.
//
// THE TRAP: `m.*` renders perfectly happily with no LazyMotion above it — it simply does not
// animate. There is no warning and no error, so a missing provider looks like "the motion is a bit
// subtle" rather than a bug. It is mounted once in the root layout for exactly that reason, and a
// test asserts every template's layout has it.
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
