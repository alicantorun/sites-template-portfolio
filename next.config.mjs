// The editor preview runs `next dev` INSIDE a sandbox and embeds this site in an iframe on the
// portal. `frame-ancestors 'none'` + `X-Frame-Options: DENY` are right for the DEPLOYED site —
// clickjacking defence every client's site should ship with — but they also refuse the preview,
// and a refused frame renders as an empty pane with nothing on screen to say why.
//
// So the frame rules, and ONLY the frame rules, relax in development. Everything else in this
// block is identical in both modes, and a production build is byte-for-byte what it always was.
// `X-Frame-Options` is dropped rather than loosened because `ALLOW-FROM` is dead in every current
// browser — leaving `DENY` in place would silently win over the CSP that permits the portal.
const dev = process.env.NODE_ENV !== "production";
const PORTAL_ORIGIN = "https://alicantorun.com";
const frameAncestors = dev
    ? `frame-ancestors 'self' ${PORTAL_ORIGIN}`
    : "frame-ancestors 'none'";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Security headers, copied from the platform repo.
    //
    // The CSP is DELIBERATELY PARTIAL: `frame-ancestors`, `base-uri`, `object-src` and
    // `form-action` are the directives that add real hardening with zero breakage risk. There is
    // no `script-src`/`connect-src` because a strict script policy needs per-request nonces, and a
    // half-configured one either blocks the site or is theatre. Do not "complete" this without
    // adding the nonce middleware.
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    ...(dev ? [] : [{ key: "X-Frame-Options", value: "DENY" }]),
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: `${frameAncestors}; base-uri 'self'; object-src 'none'; form-action 'self'`,
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
