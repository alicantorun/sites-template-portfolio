// Join class names, dropping anything falsy. Deliberately NOT clsx or tailwind-merge: this is
// eight lines, it has no dependency to keep in step across three templates, and conflict-merging
// is a crutch that hides a component styling something it should have taken as a prop.
export function cn(...parts: (string | false | null | undefined)[]): string {
    return parts.filter(Boolean).join(" ");
}
