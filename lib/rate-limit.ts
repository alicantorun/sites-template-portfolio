// In-memory sliding window. Per-instance by construction: on a multi-instance deploy the limit is
// per instance, which blunts abuse rather than guaranteeing a global cap. Said plainly because the
// alternative is someone assuming otherwise.
const hits = new Map<string, number[]>();

export const LIMITS = {
    // A public form that sends an email or writes a row. Deliberately tight.
    publicForm: { max: 5, windowMs: 60_000 },
} as const;

export function rateLimit(
    key: string,
    limit: { max: number; windowMs: number },
): { ok: true } | { ok: false; retryAfter: number } {
    const now = Date.now();
    const window = (hits.get(key) ?? []).filter((t) => now - t < limit.windowMs);
    if (window.length >= limit.max) {
        return { ok: false, retryAfter: Math.ceil((limit.windowMs - (now - window[0])) / 1000) };
    }
    window.push(now);
    hits.set(key, window);
    return { ok: true };
}

// The first hop of x-forwarded-for. The "anon" fallback matters: without it a missing header
// collapses every caller into one bucket, and one visitor can lock out the whole site.
export function getClientIp(request: Request): string {
    return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
}
