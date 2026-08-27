"use client";

import { useEffect } from "react";

// Renders the DIGEST, never the message. A server error can carry internals — a connection string,
// a stack, a query — and the rule that applies to an API response applies to a page too: log the
// real error, show the visitor something safe. The digest is the string they can quote to us to
// find the exact log line.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(
            JSON.stringify({
                level: "error",
                message: "page_error",
                timestamp: new Date().toISOString(),
                digest: error.digest ?? null,
            }),
        );
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-fg-muted">
                This page could not be loaded. Please try again — and if it keeps happening, send us
                the reference below.
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-6 self-start border border-line px-4 py-2 text-sm font-medium"
            >
                Try again
            </button>
            {error.digest && (
                <p className="mt-6 font-mono text-xs text-fg-subtle">reference {error.digest}</p>
            )}
        </main>
    );
}
