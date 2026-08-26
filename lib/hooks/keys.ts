// Query keys live here, never inline at a call site.
//
// React Query invalidates by PREFIX, so the shape of a key decides what a mutation re-fetches.
// Two lists that are siblings get sibling prefixes rather than one nested under the other —
// nesting means every mutation on the parent needlessly re-fetches the child.
export const keys = {
    contact: ["contact"] as const,
} as const;
