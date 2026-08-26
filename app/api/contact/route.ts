import { NextResponse, type NextRequest } from "next/server";
import { apiOk, apiError, apiRateLimited } from "@/lib/api/response";
import { contactSchema, validateRequest } from "@/lib/validation";
import { rateLimit, getClientIp, LIMITS } from "@/lib/rate-limit";
import { logError, logInfo } from "@/lib/logger";
import { deliverContact } from "@/lib/services/contact";

// The site's one write path.
//
// Shape, copied from the platform that builds this site: RATE-LIMIT -> VALIDATE -> SERVICE ->
// ENVELOPE, each step early-returning before the next does any work. The platform's first step is
// a tenant gate; this site has no tenants, so the limiter takes that slot — but the discipline is
// the same, and so is the order.
//
// An API route rather than a Server Action, on purpose: a route is inspectable, testable, and can
// be called with curl by whoever is debugging it at 2am.
//
// The return type is annotated. TypeScript infers a handler's return happily and reports nothing,
// so an un-annotated handler drops the envelope contract from its own signature with no signal.
export async function POST(request: NextRequest): Promise<NextResponse> {
    const gate = rateLimit(`contact:${getClientIp(request)}`, LIMITS.publicForm);
    if (!gate.ok) return apiRateLimited(gate.retryAfter);

    const parsed = await validateRequest(request, contactSchema);
    if (!parsed.ok) return apiError(parsed.error, 400);

    // The honeypot. A bot fills it; a person never sees it. Answer exactly as if it worked —
    // telling a bot it was caught only teaches whoever wrote it to stop filling the field.
    if (parsed.data.company) {
        logInfo("contact_honeypot_tripped", { ip: getClientIp(request) });
        return apiOk({ received: true }, "Thanks — we'll be in touch.");
    }

    try {
        await deliverContact(parsed.data);
        return apiOk({ received: true }, "Thanks — we'll be in touch.");
    } catch (e) {
        // The real error goes to the log with context; the visitor gets something they can act on.
        // Never hand a raw provider error to a browser.
        logError("contact_delivery_failed", { error: String(e) });
        return apiError("We could not send that just now. Please try again, or call us.", 500);
    }
}
