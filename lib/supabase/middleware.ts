import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the auth session on every request, so a signed-in visitor is not logged out when their
// token expires mid-visit. The official Supabase + Vercel pattern.
//
// It NO-OPS when the environment is absent instead of throwing. That case is not hypothetical:
// this site's preview sandbox has no database variables by design, and a middleware that throws
// takes down every route on the site — turning "no database yet" into "the whole site is broken".
export async function updateSession(request: NextRequest) {
    const response = NextResponse.next({ request });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return response;

    const supabase = createServerClient(url, key, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options),
                );
            },
        },
    });

    // Do NOT remove: this call is what refreshes the token. Removing it, or running code between
    // the client creation and this line, is the documented way to get random logouts.
    await supabase.auth.getUser();

    return response;
}
