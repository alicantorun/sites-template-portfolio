// One-line JSON to stdout, ready for a log drain. Routes and services log through these, never
// raw console.* — an event NAME is a grep key, so it is snake_case and stable, and the context
// object carries the identifying fields.
type Ctx = Record<string, unknown>;

export function logInfo(message: string, context: Ctx = {}): void {
    console.log(JSON.stringify({ level: "info", message, timestamp: new Date().toISOString(), ...context }));
}

export function logError(message: string, context: Ctx = {}): void {
    console.error(JSON.stringify({ level: "error", message, timestamp: new Date().toISOString(), ...context }));
}
