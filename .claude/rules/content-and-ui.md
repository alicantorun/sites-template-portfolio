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

### This includes NEUTRALS, WHITE and BLACK — the rule that gets broken

`bg-teal-500` is the obvious violation and almost nobody writes it. The one that actually ships is
`text-white`, `bg-white/5`, `border-white/15`, `text-neutral-300`, `bg-black/40` — because they
look like structure rather than brand, so they feel exempt. They are not.

This site has a LIGHT palette and a DARK one, and every colour utility must resolve through a role
token so both work. A hardcoded `text-white` is correct in exactly one of the two modes and
invisible in the other. It happened here: a contact form was written with `bg-white/5` and
`text-white`, which on the light page is white text on a white card. Nothing errored, the build
passed, and the form was simply unreadable.

**Use the ROLE, always:**

| Instead of | Write | Meaning |
|---|---|---|
| `text-white`, `text-black`, `text-neutral-900` | `text-fg` | primary text |
| `text-neutral-500/600` | `text-fg-muted` | secondary text |
| `text-neutral-400` | `text-fg-subtle` | labels, captions, hints |
| `bg-white`, `bg-neutral-900` | `bg-surface` | the page |
| `bg-white/5`, `bg-neutral-50/100` | `bg-surface-2` | a raised card or field |
| `border-neutral-200`, `border-white/15` | `border-line` | any divider or outline |
| `text-white` ON a brand fill | `text-on-brand` | text that sits on `bg-brand` |

Two more that are easy to get wrong:

- **Text on a brand fill is `text-on-brand`, not `text-white`.** A light brand colour needs dark
  text, and no class can work that out — that is why the token exists.
- **Check the PAIR, not the colour.** A foreground and the surface behind it are chosen together.
  If you set one, say which surface it sits on; if you cannot name the surface, you are guessing.

`tests/template-tokens.test.ts` in the platform repo scans these components and fails on a fixed
colour utility, so the templates cannot drift back. It cannot see what an agent writes into a
client's site at runtime — which is exactly why this section exists.

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
