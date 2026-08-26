"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Created inside useState so each browser session gets ONE client and a server render never shares
// cache across requests.
export function Providers({ children }: { children: ReactNode }) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    // 60s: long enough that navigating back to a page does not re-fetch, short
                    // enough that a real change shows up without a reload.
                    queries: { staleTime: 60_000, refetchOnWindowFocus: false },
                },
            }),
    );
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
