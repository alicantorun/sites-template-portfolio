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
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
