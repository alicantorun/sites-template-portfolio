"use client";

import type { FormEvent } from "react";
import { useContact } from "@/lib/hooks/use-contact";

// The form under the email address. It is the SECOND way to make contact on this page, never the
// only one — the mailto above it works with no JavaScript, no network round trip and no trust in
// this component at all.
//
// THREE STATES, never conflated: a failed send shows why and leaves the typed message on screen to
// retry; a send in flight disables the button and says so; a delivered send REPLACES the form, so
// success and failure can never be visible at the same time. Conflating them is how a visitor ends
// up staring at a spinner that already failed, or re-sending a message that already arrived.
const LABEL = "block text-xs font-medium uppercase tracking-[0.15em] text-fg-subtle";
const FIELD =
    "mt-2 w-full border-b border-line bg-transparent py-2 text-base text-fg outline-none transition-colors duration-[var(--motion-fast)] placeholder:text-fg-subtle focus:border-brand";

export function ContactForm() {
    const contact = useContact();

    if (contact.isSuccess) {
        return (
            <div
                // Announced, not just shown: the form it replaced was the thing being read, and a
                // screen reader has no other way to learn it is gone.
                role="status"
                className="border-l-2 border-brand bg-brand-tint px-5 py-4"
            >
                <p className="text-sm font-medium text-brand">Message sent.</p>
                <p className="mt-1 text-sm text-fg-muted">
                    Thank you — I reply to everything, usually within two days.
                </p>
            </div>
        );
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        // Sent exactly as typed. The route re-validates every field and is the only thing that
        // decides whether this is acceptable — a client-side check is a courtesy, never a gate.
        contact.mutate({
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            message: String(form.get("message") ?? ""),
            company: String(form.get("company") ?? ""),
        });
    }

    return (
        <form onSubmit={onSubmit} className="relative" aria-busy={contact.isPending}>
            {/* The honeypot. Positioned off-screen rather than display:none — a bot that skips
                hidden inputs still fills this one — and aria-hidden + tabIndex -1 keep it away
                from keyboard and screen-reader users. The name must stay `company`: that is the
                exact field app/api/contact/route.ts checks. */}
            <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className={LABEL}>
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        maxLength={120}
                        className={FIELD}
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className={LABEL}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        maxLength={320}
                        className={FIELD}
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="message" className={LABEL}>
                    What are you making?
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={4000}
                    className={`${FIELD} resize-y`}
                    placeholder="A sentence or two, and roughly when."
                />
            </div>

            {contact.isError && (
                // role="alert" so the failure is announced the moment it lands. The message is the
                // one the route chose to make public; nothing internal reaches here.
                <p
                    role="alert"
                    className="mt-6 border-l-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                    {contact.error.message}
                </p>
            )}

            <button
                type="submit"
                disabled={contact.isPending}
                className="mt-8 inline-flex items-center bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
                {contact.isPending ? "Sending…" : "Send message"}
            </button>
        </form>
    );
}
