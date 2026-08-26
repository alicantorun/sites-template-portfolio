# Portfolio template

A work-first starter for designers, photographers, studios and freelancers. Used by the
alicantorun.com website builder.

## Stack

Next.js 16 App Router, React 19, Tailwind v4, TanStack Query, Zod. Identical to the other
starters so the editor sandbox, the baked OCI image and the publish path handle all of them the
same way.

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm verify     # lint + typecheck + build, the same three the publish path runs
```

No environment variables are required. `NEXT_PUBLIC_SITE_URL` is read when the platform sets it
on a deployment and falls back to `http://localhost:3000` (`lib/consts.ts`); the Supabase vars are
optional too — `lib/supabase/middleware.ts` no-ops without them rather than taking the site down.

## The content contract

Every fact about the site lives in **`lib/content.ts`**. Adding a project is one entry there; the
grid, the footer and the SEO metadata all read from it. Edit that file for CONTENT and the
components for STRUCTURE and DESIGN.

Its SHAPE comes from **`lib/site-schema.ts`**, which is identical in every template — only the
values differ per site. `lib/content.ts` annotates `site` with that interface, so a missing field
or a stray one is a typecheck failure, not a runtime surprise. Sections a template does not need
(`services`, `areas`, `hours`, `business.phone`, `hero.secondaryCta`) are simply absent; the
components that render optional sections return `null` when their content is missing, so nothing
renders as an empty heading.

## Sections

Hero, work grid, about, contact. Projects are text cards rather than image tiles on purpose — the
template ships with no photography, and grey placeholders read as unfinished. Swap a card for an
image once there is real work to show.

## The contact form

The contact section leads with the **email address**, and the form sits under it. That order is
deliberate: the `mailto:` needs no JavaScript, no API route and no rate limiter to be standing.

`components/contact-form.tsx` posts to **`POST /api/contact`** through the `useContact()` hook
(`lib/hooks/use-contact.ts`) — never a raw `fetch`. The route runs rate-limit → validate →
service → envelope, and drops honeypot submissions (`company`, rendered off-screen in the form)
while answering exactly as if they had worked.

**By default the route LOGS the submission and nothing else** — see `lib/services/contact.ts`,
which says so in place. That is honest rather than useful: a form that appears to send and does
not is worse than no form, so wire one of the two documented options (this site's own database
with an insert-only policy, or a mailer read through `requireEnv`) before it goes live.

The form renders three states and never conflates them: an error (`role="alert"`, message from
the route, typed input kept for a retry), a send in flight (button disabled and relabelled), and
a delivered send, which replaces the form entirely.

## Brand tokens

`app/globals.css` defines `--color-brand`, `--color-brand-dark` and `--color-brand-tint`. Editing
those three re-skins the site; each one's job is documented beside it. Keep it that way — a token
nothing reads promises a re-skin it cannot deliver.

## Layout width

This template uses `max-w-5xl` where the other starters use `max-w-6xl`. Deliberate: a portfolio
reads better in a narrower measure, and the work grid is two columns rather than three.
