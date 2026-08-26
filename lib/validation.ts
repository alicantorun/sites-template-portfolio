import { z } from "zod";

// Schemas live at module level and export their inferred input type, so the type and the runtime
// check can never disagree.
//
// EVERY public string input is capped, and the cap is justified where it is written. A public form
// is this site's entire attack surface; an uncapped text field is a free denial-of-service and a
// free way to fill a database.
//
// Error messages are USER-FACING COPY, not developer strings — `validateRequest` hands the first
// issue straight back to the visitor.
export const nameField = z.string().trim().min(1, "Please tell us your name").max(120);
export const emailField = z.email("That does not look like an email address").max(320); // RFC 5321
export const phoneField = z.string().trim().max(40).optional();
export const messageField = z.string().trim().min(1, "Please tell us what you need").max(4_000);

export const contactSchema = z.object({
    name: nameField,
    email: emailField,
    phone: phoneField,
    message: messageField,
    // Honeypot: a real visitor never fills this. Bots do.
    company: z.string().max(200).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

// The runner. Returns a discriminated union rather than throwing, so a route reads as a
// straight line: parse, early-return the 400, continue.
export async function validateRequest<T>(
    request: Request,
    schema: z.ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return { ok: false, error: "Expected a JSON body." };
    }
    const parsed = schema.safeParse(body);
    if (parsed.success) return { ok: true, data: parsed.data };
    const first = parsed.error.issues[0];
    return { ok: false, error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." };
}
