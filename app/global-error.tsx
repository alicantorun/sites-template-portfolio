"use client";

// The ROOT LAYOUT failed, so this file must ship its own <html> and <body> — and it can rely on
// NOTHING. No fonts, no Tailwind, no design tokens, no <Link>. Every style here is inline on
// purpose: anything imported is another thing that could be the reason this screen is showing.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    return (
        <html lang="en">
            <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1.5rem" }}>
                <div style={{ maxWidth: "34rem", margin: "0 auto" }}>
                    <h1 style={{ fontSize: "1.5rem", margin: 0 }}>This site is temporarily unavailable</h1>
                    <p style={{ color: "#525252", lineHeight: 1.6 }}>
                        Please try again in a moment.
                    </p>
                    {error.digest && (
                        <p style={{ color: "#a3a3a3", fontFamily: "monospace", fontSize: "0.75rem" }}>
                            reference {error.digest}
                        </p>
                    )}
                </div>
            </body>
        </html>
    );
}
