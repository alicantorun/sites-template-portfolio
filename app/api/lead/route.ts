import { NextResponse } from "next/server";

// Forwards an enquiry from this site's contact form to the portal, where it appears in the
// client's inbox and rings a notification.
//
// This handler exists because the capture token is a SECRET. The form cannot post to the portal
// directly — that would put the token in the page source of every visitor's browser — so it posts
// here, and this server route adds the credential.
//
// Both variables are injected by the platform when the site is published. They are absent in the
// preview sandbox by design (its egress allowlist excludes the portal), which is why the missing
// case answers plainly instead of throwing: someone testing their own site must not see a 500 and
// conclude the feature is broken.

export async function POST(request: Request) {
    const endpoint = process.env.SITE_LEADS_ENDPOINT;
    const token = process.env.SITE_LEADS_TOKEN;

    if (!endpoint || !token) {
        return NextResponse.json(
            {
                ok: false,
                message: "Enquiries start working once this site is published.",
            },
            { status: 503 },
        );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
        return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }

    let res: Response;
    try {
        res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                phone: body.phone,
                message: body.message,
                source: body.source ?? "contact",
                // The honeypot is forwarded untouched — the portal decides what to do with it, so
                // the rule lives in one place rather than being re-implemented per site.
                website: body.website,
            }),
        });
    } catch {
        return NextResponse.json(
            { ok: false, message: "Could not send your message. Please try again." },
            { status: 502 },
        );
    }

    // Pass the portal's answer through rather than inventing one: it distinguishes a missing reply
    // path (400) from a rate limit (429) from a real failure (500), and the visitor can act on the
    // difference.
    const out = await res.json().catch(() => ({}) as { message?: string });
    return NextResponse.json({ ok: res.ok, message: out.message }, { status: res.status });
}
