FROM node:24-bookworm-slim

# ripgrep: OpenCode's grep/glob tools shell out to `rg`; without it they fail in the VM and the
# agent falls back to slower bash+read passes.
RUN corepack enable && apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates ripgrep \
 && rm -rf /var/lib/apt/lists/*

# Pinned to OPENCODE_VERSION in lib/builder/config.ts. An unpinned install lets the NDJSON output
# format drift with no deploy on our side, which silently breaks token parsing and under-bills.
RUN npm i -g opencode-ai@1.18.3

ENV HOME=/home/vercel-sandbox
WORKDIR /home/vercel-sandbox/site
COPY . .
# pnpm 10/11 blocks freshly-published lockfile deps (minimumReleaseAge) and build scripts. Both are
# overridden for this trusted frozen-lockfile install; nothing is written back into the repo.
RUN pnpm install --frozen-lockfile --config.minimumReleaseAge=0 --config.dangerouslyAllowAllBuilds=true \
 && git init -q && git config user.email bake@local && git config user.name bake \
 && git add -A && git commit -qm "baked template baseline" \
 && chmod -R a+rwX /home/vercel-sandbox
