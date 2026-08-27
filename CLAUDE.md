# CLAUDE.md

Standing instructions for whoever edits this site — usually a coding agent, working in a sandbox
with the dev server already running and a client watching the preview.

This file holds only what you **cannot work out by reading the code**. Everything else is in the
code, or in the two rules files under `.claude/rules/`, which load when you touch the area they
govern. If something here is not true any more, it is a defect: fix it in the same change.

## Colour comes from a token. Always. Including white.

Every colour on this site resolves through a ROLE token in `app/globals.css`, because the site has
a light palette and a dark one and a fixed utility is correct in exactly one of them.

`bg-teal-500` is the obvious violation and nobody writes it. The one that ships is **`text-white`,
`bg-white/5`, `border-white/15`, `text-neutral-300`** — they look like structure rather than brand,
so they feel exempt. They are not. A contact form written that way rendered white text on a white
card: the build passed, nothing errored, and the form was unreadable.

Use `text-fg` / `text-fg-muted` / `text-fg-subtle` for text, `bg-surface` / `bg-surface-2` for
surfaces, `border-line` for anything drawn, `bg-brand` with `text-on-brand` for a brand fill.

Two that are easy to get wrong:

- **Text on a brand fill is `text-on-brand`, never `text-white`.** A light brand needs dark text
  and no class can work that out — that is the whole reason the token exists.
- **A foreground and its surface are ONE decision.** If you change one, name the other. Translating
  each utility on its own is how `text-white` becomes `text-on-brand` on a plain card and stays
  just as unreadable.

Full table and the reasoning: `.claude/rules/content-and-ui.md`.

## What this is

A Next.js (App Router) marketing site, generated from a template by **alicantorun.com**. It is one
client's site: no tenants, no accounts, no admin. It is deployed and hosted for them.

It mirrors the conventions of the platform that builds it, on purpose. That is not taste — the same
agent works in both repositories, and a pattern that reads the same in both is a pattern that
transfers. Do not introduce a second way of doing something that already has one here.

## The rules that cost something if broken

- **Never build a form that appears to send and does not.** No `mailto:` submit, no in-memory
  array, no "we'll wire it up later" that looks finished to the client. If storage is needed and
  there is no database, say so plainly and build the contact details instead — a phone number and
  an email link both work. This is the single most damaging thing you can do here, because it
  looks like success.
- **Secrets are read with `requireEnv` from `lib/env.ts`**, which throws when one is missing. Never
  `process.env.X ?? "something"` — that fails OPEN and silently. A module that holds a secret
  imports `"server-only"`, so importing it from a client component is a build error rather than a
  leaked key.
- **Never commit a credential**, not even an example one. The platform scans this tree before every
  publish and a match blocks it — including in a `.env.example`.
- **The app stays at the repository ROOT.** No `src/`, no workspace, no moving `app/`. The sandbox
  runs `node_modules/.bin/next` and `.bin/tsc` from here and the host sets no root directory; move
  it and the preview, the typecheck and the deploy all break at once, with nothing to tell you why.
- **Migrations live in `supabase/migrations/*.sql`** and nowhere else. That path is a literal in
  the platform's migration runner. They run at PUBLISH, not in the preview.

## What is deliberately not obvious

- **`lib/content.ts` is the site's copy**, typed against `Site` in `lib/site-schema.ts`. A wording
  change goes there, not into a component. If you need a field that does not exist, add it to the
  interface first — that file is the contract and TypeScript enforces it.
- **`lib/site-schema.ts` is shared with the other templates and is byte-identical across all of them.**
  Changing it here alone breaks that. If a field genuinely belongs in the contract, it has to land
  in all three, which is a change to make in the platform repo, not this one.
- **The preview has no `NEXT_PUBLIC_SITE_ID` or `NEXT_PUBLIC_SITE_URL`** — those exist only on the
  deployed site. Read them with a fallback, never with `!`. Same for the Supabase variables, which
  are present only once the site has been given a database.
- **`proxy.ts` refreshes the Supabase session and NO-OPS when the environment is absent.** That is
  deliberate: a proxy that throws takes down every route on the site, turning "no database yet"
  into "the whole site is broken". Do not make it strict.

## Commands

```
pnpm dev        # the preview is already running in the sandbox; you rarely need this
pnpm verify     # lint + typecheck + build — the one gate. Run it before you say you are done.
```

## The deeper rules

- `.claude/rules/api-and-data.md` — anything under `app/api/`, `lib/`. Route shape, the response
  envelope, validation, React Query, secrets.
- `.claude/rules/content-and-ui.md` — anything under `components/`, `app/`, and `lib/content.ts`.
  The content contract, brand tokens, the three render states.

## The loop

This file and the rules files are only worth reading while they are true.

- A non-obvious decision gets a dated entry in `DECISIONS.md`, in the same change as the code.
- When something breaks twice, add the check — do not add a paragraph.
- When a check replaces a rule, delete the rule in the same change.
- These files should shrink as often as they grow. If they only grow, this is not being run.
