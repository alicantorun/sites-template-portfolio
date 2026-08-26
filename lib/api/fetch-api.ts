// The one client-side entry point to this site's API. Never call `fetch` directly from a
// component or a hook: the envelope is unwrapped HERE, once, so a caller gets `data` or an Error
// with a message worth showing — and nothing has to remember the shape.
export async function fetchApi<T>(input: string, init?: RequestInit): Promise<T> {
    const isForm = init?.body instanceof FormData;
    const res = await fetch(input, {
        ...init,
        headers: {
            // FormData sets its own multipart boundary; forcing JSON here would corrupt it.
            ...(isForm ? {} : { "Content-Type": "application/json" }),
            ...init?.headers,
        },
    });
    const body = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string; data?: T }
        | null;
    if (!res.ok || !body?.success) {
        throw new Error(body?.message ?? "Something went wrong. Please try again.");
    }
    return body.data as T;
}
