import { NextResponse } from "next/server";

// The response envelope, copied from the platform that builds this site — deliberately, so an
// agent (or a person) moving between the two repos meets one contract, not two.
//
// Every route answers `{ success, message, data }`. Never a bare `{ error }`: the client reads
// `message` on failure and `data` on success, so one helper on the client can unwrap both cases.
export function apiOk<T>(data?: T, message = "OK"): NextResponse {
    return NextResponse.json({ success: true, message, data });
}

export function apiError(message: string, status = 400): NextResponse {
    return NextResponse.json({ success: false, message }, { status });
}

// A rate-limited caller gets the header too — a client that retries blind is the reason the
// limiter was needed in the first place.
export function apiRateLimited(retryAfter: number, message = "Too many requests."): NextResponse {
    return NextResponse.json(
        { success: false, message },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
}
