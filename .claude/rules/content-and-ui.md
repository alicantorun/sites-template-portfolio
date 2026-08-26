---
paths:
  - "components/**"
  - "app/**"
  - "lib/content.ts"
---

# Content and UI

## The content contract

`lib/content.ts` exports `site`, typed as `Site` from `lib/site-schema.ts`. **All copy lives
there.** A wording change is a content change, not a component change — a string hardcoded in a
component is one the client cannot have changed without an engineer.

`lib/site-schema.ts` is byte-identical across every template by design, which is what lets an
instruction name a field. Do not edit it here alone.

Sections are optional in the contract. A template that has no `work` section simply omits it, and
the component **returns `null`** rather than rendering an empty heading. Absence renders as
absence.

## Brand tokens

`app/globals.css` holds the palette as CSS variables, mapped to utility names in `@theme inline`.
Re-skinning the site for a client is meant to be an edit to that one block — which is only true
while no component hardcodes a palette colour. **Do not write `bg-teal-500` or `border-amber-200`
in a component.** Use `bg-brand`, `text-brand`, `border-brand/20`.

A trap worth knowing: **Tailwind v4 scans comments**. Writing `from-teal-50` inside an explanatory
comment ships that dead CSS rule. Describe the change without naming the class.

## The three render states

Loading, error and empty are three different things and are rendered as three different things,
never conflated:

- **Error** — a message and a way to retry (`QueryError`), never an endless spinner.
- **Loading** — a pending state that says so.
- **Empty** — a sentence naming the next action ("No reviews yet. Add the first one."), not
  "No data".

A form adds a fourth: **success replaces the form**, so success and error can never be on screen at
once.

## Forms

- The honeypot field is present in the DOM and off-screen — not `display: none`, which some bots
  skip, and not `sr-only`, which leaves it in the accessibility tree so a screen-reader user would
  be asked to fill the trap. Off-screen, `aria-hidden`, `tabIndex={-1}`.
- Do not copy the input bounds into `maxLength` attributes. The bounds live in `lib/validation.ts`;
  a duplicated number drifts.
- The visitor's typed text survives an error. Losing it is how a person gives up.

## Metadata

Use `buildMetadata` from `lib/seo.ts` on every page. The trap it exists for: **Next.js replaces the
parent `openGraph` object wholesale** — there is no deep merge — so a page that sets only a title
silently loses the share image. `buildMetadata` builds the complete block every time.
