// Next 16 deprecated the `middleware` file convention in favour of `proxy` — the same rename the
// platform that builds this site already made. The behaviour is unchanged: refresh the Supabase
// session cookie on a page request, and nothing else.
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export default async function proxy(request: NextRequest) {
    return updateSession(request);
}

export const config = {
    matcher: [
        // Everything except static assets and images. Keeping those out matters: the session
        // refresh is a network call, and running it for every icon is latency for no benefit.
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
