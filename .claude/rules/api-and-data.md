---
paths:
  - "app/api/**"
  - "lib/**"
---

# API and data

How this site reads and writes anything. Mirrors the platform that builds it, so the same shape
works in both repositories.

## Routes, never Server Actions

Every write goes through a route handler under `app/api/`. Not a Server Action — a route is
inspectable, testable, and can be called with `curl` by whoever is debugging it at 2am. A codebase
with both is worse than one with either, so do not add the second kind.

The shape, in order, each step returning early before the next does any work:

1. **Rate-limit.** `rateLimit(\`name:\${getClientIp(request)}\`, LIMITS.publicForm)`. The platform's
   equivalent step is a tenant gate; this site has no tenants, so the limiter takes that slot. A
   public endpoint without one is a free way to bill you for email or fill your database.
2. **Validate.** `validateRequest(request, schema)` with a Zod schema from `lib/validation.ts`.
3. **Call a service.** The route stays thin; the work lives in `lib/services/`.
4. **Return the envelope.** `apiOk(data, message)` or `apiError(message, status)`.

Annotate the handler `Promise<NextResponse>`. TypeScript infers a return type happily and reports
nothing, so an un-annotated handler drops the contract from its own signature with no signal at all.

## The envelope

Every response is `{ success, message, data }`, from `lib/api/response.ts`. **Never a bare
`{ error }`** — the client reads `message` on failure and `data` on success, and one helper
unwraps both. Never put a raw provider or database error in `message`: log the real one with
`logError` and return something the visitor can act on.

## Validation

Schemas live at module level in `lib/validation.ts` and export their inferred type. Two rules that
are not obvious:

- **Cap every public string, and justify the cap where you write it.** A public form is this
  site's entire attack surface; an uncapped field is a free denial of service.
- **Error messages are copy a visitor will read**, not developer strings. `validateRequest` hands
  the first issue straight back to them.

## Client-side data

React Query, always. Hooks live in `lib/hooks/`, call `fetchApi` from `lib/api/fetch-api.ts`, and
never `fetch` directly from a component. Never `useState` + `useEffect` to load something.

Query keys live in `lib/hooks/keys.ts`, never inline at a call site. React Query invalidates by
PREFIX, so the shape of a key decides what a mutation re-fetches — two sibling lists get sibling
prefixes rather than one nested under the other.

## Secrets and config

- Secrets: `requireEnv` from `lib/env.ts`. It throws. Never `?? ""`.
- A module holding one imports `"server-only"`.
- **A non-secret that varies per site is CODE, not env** — it belongs in `lib/consts.ts`, in the
  repository, reviewable. `process.env.X ?? "default"` can be set once, forgotten, and quietly
  disagree with what the repo says is true.

## If this site has a database

It gets one only when it needs to store something. When it does:

- Connection details arrive as environment variables. Use `@supabase/ssr` with the App Router
  pattern — browser client for client components, cookie-reading server client for server
  components and routes, `proxy.ts` for the session refresh. Do not hand-roll session handling.
- **Schema changes are SQL files in `supabase/migrations/`.** They run at PUBLISH, not in the
  preview — so a new table does not exist while you are working. Say that to the client rather
  than making the preview look finished.
- **Every new table enables row-level security in the same migration, plus a policy.** This is
  enforced at publish and a migration without it is refused. The site's public key ships in the
  browser, so a table without RLS is readable by anyone who views source.
- A contact form's table takes an INSERT-only policy for `anon`
  (`for insert to anon with check (true)`) and **no** select policy for `anon`, so a visitor can
  submit and cannot read anyone else's submission.
