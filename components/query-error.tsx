// Loading and error are DIFFERENT states. A failed request shows a message and a way to retry,
// never an endless spinner that a visitor reads as "still working".
export function QueryError({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <div role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p>{message}</p>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-2 text-xs font-medium underline underline-offset-2"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
