import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { ContactInput } from "@/lib/validation";
import { logError, logInfo } from "@/lib/logger";

// Where a contact submission actually goes.
//
// `server-only` makes an accidental client import a BUILD error rather than a leaked key.
//
// THIS FUNCTION MUST NEVER SUCCEED SILENTLY. Until 2026-08-26 it logged and returned, so every
// site built from this template rendered a real form, told the visitor "Thanks — that's with me",
// and dropped the enquiry into a log line in a sandbox that was later destroyed. The comment sitting
// directly above that code said "a form that appears to send and does not is worse than no form" —
// it was guidance for whoever wired it up, and nobody did. So the guidance is now the behaviour:
// with nowhere to deliver, this THROWS, the route answers 500, and the visitor is told to call
// instead. A lost enquiry is a lost customer, and for the businesses this template serves the
// enquiry IS the business.
//
// The destination is the site's OWN database. The platform injects these two variables when the
// site has one; nothing here passes through the platform.
const TABLE = "contact_submissions";

function client() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key, { auth: { persistSession: false } });
}

/** Whether an enquiry has anywhere to go. Read by the contact section so it renders a form only
 *  when one would actually work — the honest alternative to a button that fails on submit. */
export function contactDeliveryConfigured(): boolean {
    return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function deliverContact(input: ContactInput): Promise<void> {
    const supabase = client();
    if (!supabase) {
        // Loud on purpose. The site owner needs to see this in their logs, and the visitor needs
        // to be told to call rather than to believe a message was sent.
        logError("contact_no_destination", {
            reason: "this site has no database, so there is nowhere to store an enquiry",
        });
        throw new Error("No contact destination is configured for this site.");
    }

    // supabase-js RESOLVES { error } — it does not throw on a constraint or a missing table. An
    // unread result here is the same silent failure this whole change exists to remove.
    const { error } = await supabase.from(TABLE).insert({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message,
    });
    if (error) {
        logError("contact_insert_failed", { error: error.message });
        throw new Error(`Could not store the enquiry: ${error.message}`);
    }
    logInfo("contact_received", { hasPhone: Boolean(input.phone), length: input.message.length });
}
