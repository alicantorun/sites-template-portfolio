"use client";

import { useState } from "react";

// The enquiry form, posting to this site's own /api/lead route, which forwards to the portal.
//
// The form cannot post to the portal directly: the capture token is a secret and would end up in
// the page source. The server route holds it.
//
// One rule carries this component — the success state appears ONLY when the request succeeded. A
// form that thanks you and delivers nothing is worse than no form, which is why this section
// previously shipped as a phone and email link instead.
export function LeadForm({
    source = "contact",
    inputClassName,
    buttonClassName,
    submitLabel = "Send enquiry",
}: {
    source?: string;
    inputClassName: string;
    buttonClassName: string;
    submitLabel?: string;
}) {
    const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");

    if (state === "sent") {
        return (
            <p className="text-base font-medium">
                Thanks — we have your message and will be in touch.
            </p>
        );
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (state === "sending") return;
                const form = new FormData(e.currentTarget);
                setState("sending");
                const res = await fetch("/api/lead", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        name: form.get("name"),
                        email: form.get("email"),
                        phone: form.get("phone"),
                        message: form.get("message"),
                        website: form.get("website"),
                        source,
                    }),
                }).catch(() => null);
                if (res?.ok) return setState("sent");
                const body = await res?.json().catch(() => ({}));
                setError(body?.message ?? "Something went wrong. Please try again.");
                setState("error");
            }}
            className="space-y-3"
        >
            <input required name="name" placeholder="Your name" className={inputClassName} />
            {/* Email OR phone — the portal requires one, not both. A trades customer types a
                number and a designer's client types an address; demanding the wrong one loses the
                enquiry. */}
            <input type="email" name="email" placeholder="Email" className={inputClassName} />
            <input type="tel" name="phone" placeholder="Phone" className={inputClassName} />
            <textarea
                required
                name="message"
                rows={4}
                placeholder="How can we help?"
                className={inputClassName}
            />
            {/* Honeypot: off-screen rather than type="hidden", because bots read the DOM. */}
            <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
            />
            <button type="submit" disabled={state === "sending"} className={buttonClassName}>
                {state === "sending" ? "Sending…" : submitLabel}
            </button>
            {state === "error" && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </form>
    );
}
