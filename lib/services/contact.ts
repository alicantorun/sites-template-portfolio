import "server-only";
import type { ContactInput } from "@/lib/validation";
import { logInfo } from "@/lib/logger";

// Where a contact submission actually goes.
//
// `server-only` makes an accidental client import a BUILD error rather than a leaked key — this is
// the module that will hold a mailer credential the day one is added.
//
// The default is deliberately honest: with no database and no mailer configured, this LOGS and
// says so, rather than pretending. A form that appears to send and does not is worse than no form.
// Two ways to make it real, in order of preference:
//
//   1. This site's own database. Add a migration under supabase/migrations/ creating a table with
//      row-level security ON and an INSERT-only policy for `anon`, then insert here. The site owns
//      its data; nothing passes through the platform.
//   2. A mailer. Read the key with requireEnv() so a missing one fails closed at startup.
export async function deliverContact(input: ContactInput): Promise<void> {
    logInfo("contact_received", {
        name: input.name,
        email: input.email,
        hasPhone: Boolean(input.phone),
        length: input.message.length,
    });
}
