import { createBrowserClient } from "@supabase/ssr";

// The browser client. Uses the PUBLISHABLE key, which is public by design — row-level security is
// what protects the data behind it, not the secrecy of this key.
//
// The official Supabase + Vercel App Router pattern. Do not hand-roll session handling: the cookie
// choreography between this, the server client and the middleware is easy to get subtly wrong, and
// a subtly wrong auth session is a security bug rather than a glitch.
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
}
