"use client";

import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api/fetch-api";
import type { ContactInput } from "@/lib/validation";

// Mutations go through React Query, and every call goes through `fetchApi` — never a raw `fetch`
// in a component. Same pattern as the platform that builds this site, so a hook written in either
// repo reads the same way.
export function useContact() {
    return useMutation({
        mutationFn: (input: ContactInput) =>
            fetchApi<{ received: true }>("/api/contact", {
                method: "POST",
                body: JSON.stringify(input),
            }),
    });
}
