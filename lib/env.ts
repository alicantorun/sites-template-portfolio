// Secrets fail CLOSED. Never `process.env.X ?? ""` — an empty string fails OPEN on anything that
// compares it, and the failure is silent.
export function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

// Config is code; env is for secrets only. A non-secret that varies per site (a booking URL, a
// contact address) belongs in lib/consts.ts, git-versioned and reviewable — not in an env var
// that can be set once, forgotten, and quietly disagree with what the repo says is true.
