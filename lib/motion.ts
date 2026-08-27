// THE MOTION VOCABULARY — byte-identical in every template, by design.
//
// Three templates with three art directions still share one sense of timing, because badly-tuned
// motion is the main way a site reads as cheap and tuning it once is far likelier to be right than
// tuning it three times. What differs per template is WHICH of these a section reaches for, not
// what they mean.
//
// THE NUMBERS APPEAR TWICE — here and as CSS custom properties in globals.css — because a JS
// animation and a CSS hover transition cannot read each other's units, and both have to agree or
// a card eases one way on hover and another way on entrance. They ALREADY diverged once: this file
// said 0.42s while the portfolio's `--motion-base` said 660ms.
//
// So the duplication is CHECKED rather than trusted. `tests/template-motion-tokens.test.ts`
// derives both sides — these constants and every template's globals.css — and fails when they
// disagree. Change a number here and the test tells you which stylesheet to change with it.
//
// Every entry below has a caller. Adding one "for later" is how the last audit found six unused
// constants, four of which were written for a template that did not exist yet.

/** Seconds. `fast` is hover and press, `base` is a reveal, `slow` is a deliberate gallery
 *  entrance where the image IS the content. */
export const DURATION = { fast: 0.18, base: 0.42, slow: 0.66 } as const;

/** Cubic-bezier control points. One curve: it decelerates into place, which is what arrival
 *  should do, and a second curve nothing uses is a preference nobody expressed. */
export const EASE = { out: [0.16, 1, 0.3, 1] } as const;

/** How far a revealing element travels, in pixels. Small on purpose: a large offset reads as the
 *  page assembling itself, which is a 2014 effect. */
export const TRAVEL = { sm: 8, base: 16, lg: 28 } as const;

/** Delay between children in a staggered group, in seconds. Above ~0.09 a six-item grid takes
 *  long enough that the last card arrives after the eye has already moved on. */
export const STAGGER = { base: 0.07, loose: 0.09 } as const;

/** The viewport margin a reveal triggers at. Negative bottom margin means "start when the element
 *  is genuinely on screen", not when its first pixel crosses the fold. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
