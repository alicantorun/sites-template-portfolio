# Decision log

Append-only, newest first. One entry per non-obvious choice: what was decided, what was rejected,
and why. Never edit or delete an entry — when one is overturned, add a new entry and mark the old
one in place. The rules say what to do; this says why it was chosen, so the argument is not had
again from a worse position.

## 2026-08-26 — This site mirrors the platform's conventions

The site is generated from a template maintained inside **alicantorun.com**, and deliberately uses
that repository's shapes: the `{ success, message, data }` response envelope, API routes rather
than Server Actions, module-level Zod validation, React Query hooks over `fetchApi`, `requireEnv`
for secrets, and the two-layer brand-token split.

Why, when a five-page site does not need most of it: the same coding agent works in both
repositories. A pattern that reads the same in both is a pattern it can carry across without
inferring anything, and the conventions here are checked from the platform side
(`tests/template-toolchain.test.ts`) rather than trusted.

What was rejected: letting each template find its own shape. That is what existed before, and it
meant no instruction more specific than "edit `lib/content.ts`" was true in all three.

## 2026-08-26 — React Query ships even though one form does not need it

A brochure site's only client mutation is a contact form, and a `useState` state machine would do.
React Query is here anyway, because pattern parity with the platform is the point of the template —
a hook that reads the same in both repositories is worth more than the dependency costs.

Recorded because the cheaper choice is the obvious one and someone will propose it again.

## 2026-08-26 — Build scripts are approved in two dialects at once

`pnpm-workspace.yaml` carries `allowBuilds` and `package.json` carries
`pnpm.onlyBuiltDependencies`, for the same package. Not redundancy: pnpm 11 removed the second and
reads only the first, pnpm 10 reads only the second, and the host picks a major from the lockfile
version and the project's age. A site must install cleanly on both.

What was rejected: `dangerouslyAllowAllBuilds`, which approves every current and future transitive
install script — the exact execution surface the npm supply-chain worms used.
