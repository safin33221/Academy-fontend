# Academy Frontend

Next.js App Router project for Academy Management.

## Requirements

- Node.js `>=20.17.0` recommended
- npm `>=10`

## Scripts

- `npm run dev`: run local development server
- `npm run lint`: run ESLint
- `npm run typecheck`: run TypeScript checks (`tsc --noEmit`)
- `npm run build`: create production build
- `npm run verify`: run `lint + typecheck + build` (main quality gate)

## Architecture Baseline

- `src/app`: route-level entry points (server components/pages)
- `src/components`: UI layer and feature modules
- `src/services`: API/data access layer
- `src/types`: shared domain and API contracts
- `src/lib`: utility and cross-cutting helpers

Keep domain types in `src/types`, pass typed props into components, and keep fetch/mutation logic in `src/services` instead of UI files.

## Type Safety Rules

- Type all service responses with interfaces from `src/types`.
- Avoid `any`; prefer `unknown` with narrowing when needed.
- Keep `strict` TypeScript mode enabled.
- Run `npm run verify` before every PR/merge.
