// Config is CODE. Env is for secrets only.
//
// Anything non-secret that varies per site lives here, git-versioned and reviewable — never
// `process.env.X ?? "default"`, which can be set once, forgotten, and quietly disagree with what
// the repo says is true.
//
// The platform writes NEXT_PUBLIC_SITE_URL onto the deployment, so that is read when present; the
// fallback keeps local development and the preview sandbox working, where it is not set.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// One label and one destination for the site's primary action, used by every button that performs
// it. Four hand-written copies of the same CTA is how they drift apart.
export const PRIMARY_CTA_HREF = "#contact";
