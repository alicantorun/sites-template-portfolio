import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Loaded DIRECTLY, not through FlatCompat.
//
// eslint-config-next 16 ships flat config arrays. Running them through `FlatCompat.extends()` hands
// a flat config to the legacy eslintrc validator, which rejects it — and then crashes formatting
// its own error ("Converting circular structure to JSON"), so the real cause is invisible. There is
// nothing to convert here: these exports are already the shape ESLint 9 wants.
const config = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
    {
        // SCOPE EVERY OBJECT BY `files:`. An unscoped rules object applies to every file the
        // config can see, including .mjs and .cjs, and takes the whole lint down the moment one
        // lands. This is copied from the platform repo, where exactly that happened.
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            // The bans are enforced by the LINTER, not by discipline. `any` erases the type system
            // exactly where someone was already unsure, which is where the bug is.
            "@typescript-eslint/no-explicit-any": "error",
            // Including ts-expect-error WITH a description — tighter than the default. A silenced
            // type error is a type error nobody will revisit.
            "@typescript-eslint/ban-ts-comment": [
                "error",
                { "ts-expect-error": true, "ts-ignore": true, "ts-nocheck": true, "ts-check": false },
            ],
        },
    },
];

export default config;
