# Repository Guidelines

Use this guide to onboard quickly and keep contributions consistent with the existing Bun/React setup.

## Project Structure & Module Organization

- Entry: `src/index.tsx` mounts the app; `router.tsx` defines routes; `frontend.tsx` and `App.tsx` host top-level layout/state.
- UI: `src/components/ui` contains shadcn-style primitives; `src/components/layouts` handles dashboard shells; feature components live in `src/components`.
- State & data: `src/stores` (Zustand), `src/hooks`, and `src/data` for mock series/config.
- Styling: `src/index.css` initializes Tailwind; `styles/globals.css` carries global tokens.
- Tests: `src/test` holds setup/mocks; component tests can be colocated as `*.test.tsx`.
- Build output goes to `dist`; custom bundler lives in `build.ts`.

## Build, Test, and Development Commands

- Install: `bun install`.
- Dev server with hot reload: `bun run dev`.
- Production run (uses NODE_ENV=production): `bun run start`.
- Build static assets (Tailwind via plugin): `bun run build` or `bun run build -- --outdir=dist --minify`.
- Lint/format: `bun run lint`, `bun run lint:fix`, `bun run format`, `bun run format:check`.
- Tests: `bun run test` (CI-friendly), `bun run test:watch`, `bun run test:ui`.

## Coding Style & Naming Conventions

- TypeScript + React function components; prefer hooks and composition over classes.
- Prettier enforced: 2-space indent, double quotes (`singleQuote: false`), trailing commas, 100-char line width, semicolons on.
- ESLint (`eslint.config.js`) with React, Hooks, a11y, and TypeScript rules; unused vars allowed when prefixed with `_`.
- File naming: components in `PascalCase.tsx`; hooks as `useThing.ts`; utilities in `camelCase.ts`; avoid default exports except for pages/entry files.
- Path alias `@` maps to `src` (see `vitest.config.ts`); prefer absolute imports via this alias.

## Testing Guidelines

- Stack: Vitest + React Testing Library + JSDOM (`src/test/setup.ts` mocks `ResizeObserver`, `matchMedia`, `scrollIntoView`).
- Write `*.test.tsx` near the component or in `src/test`; favor behavior-focused assertions over implementation details.
- Cover layout modes, synchronized hover behavior, and date-range interactions when modifying dashboard logic.
- Keep tests deterministic; mock timers/data where needed to avoid flaky layout/resizing expectations.

## Commit & Pull Request Guidelines

- Commit history favors short, imperative messages (e.g., `Refactor TimeSeriesChart`, `skeleton and height adjustments`); follow that style.
- For PRs, include: brief summary of changes, key screenshots/GIFs for UI tweaks, test commands/results run locally, and linked issue/ticket if applicable.
- If touching build or lint configs, call out any developer workflow impacts in the PR description.
