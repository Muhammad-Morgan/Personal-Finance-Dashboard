# Finance Dashboard

A full-stack personal finance dashboard built with Next.js 16 (App Router) and Prisma. Users can register/login, manage transactions, filter by type and date range, and review charts/stats that hydrate via React Query. Recent changes add resilient loading states, accessibility polish, and automated quality gates.

## Features

- **Authentication & Sessions** – Email/password auth backed by Prisma + bcrypt with HTTP-only JWT sessions and optional “remember me.”
- **Transactions module** – Create, edit, delete, and paginate transactions with category lookups, recurring flags, and day-level filtering (`from`/`to`).
- **Charts & stats** – React Query fetches chart data + grouped stats with skeleton fallbacks so dashboard sections never flash.
- **Accessibility-first UI** – Keyboard-friendly forms, descriptive aria labels for icon buttons, and screen-reader friendly status messaging on controls and skeletons.
- **Testing & CI** – Vitest + Testing Library cover utilities, filters, and pagination flows. GitHub Actions runs linting and tests on every push/PR.

## Tech Stack

- **Framework**: Next.js 16 / React 19 / TypeScript
- **Styling/UI**: Tailwind CSS, Shadcn UI, Lucide icons
- **Data**: Prisma ORM (PostgreSQL), React Query for client queries
- **Auth**: `next/headers` cookies + `jose` JWT helpers
- **Testing**: Vitest, Testing Library, jsdom

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Environment variables** – copy `.env.example` (if present) or create `.env` with at least:
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/db_name"
   SESSION_SECRET="a-long-random-string"
   ```
   The Prisma config (`prisma.config.ts`) reads `DATABASE_URL`, so no datasource URL is needed in `schema.prisma`.
3. **Prisma** – generate the client and, optionally, seed mock data:
   ```bash
   npx prisma generate
   # optional mock data refresh
   node prisma/scripts/mock-data.js
   ```
4. **Run the dev server**
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 and register a user.

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start Next.js in development mode                |
| `npm run build`    | Create the production build                      |
| `npm run start`    | Run the production server                        |
| `npm run lint`     | Lint the project with ESLint                     |
| `npm run test`     | Run Vitest (unit + integration tests via jsdom)  |
| `npm run test:watch` | Watch mode for tests                           |

## Testing

- **Unit tests** cover utility helpers (formatting, class merging) to guard against regression.
- **Integration tests** exercise the Filters form and Pagination controls, ensuring query strings and router pushes stay in sync with UI state.
- Tests run via `npm run test` and are executed automatically in CI (see `.github/workflows/ci.yml`). The workflow installs deps, lints, and runs tests on every push and pull request.

## Accessibility & Loading states

- Icon-only buttons expose `aria-label`s and hidden text, badges communicate status via SR-only spans, and recurring checkboxes now toggle with Enter/Space.
- Each dashboard section (filters, list, stats, charts, create/edit forms) has a dedicated skeleton loader so layout shifts are minimized.

## Deployment (Vercel)

1. Set the same **environment variables** (`DATABASE_URL`, `SESSION_SECRET`) in the Vercel project.
2. Ensure your database is reachable from Vercel (use Vercel Postgres or allowlisted external DB).
3. Set the build command to `npm run build` (default). Vercel runs `npm install` → `npm run build`, which triggers `prisma generate` because `@prisma/client` is installed.
4. Because every Prisma call is inside server components/actions, no additional build steps are required. Just be sure migrations are applied to your database before deploying.
5. The new CI workflow mirrors Vercel’s build expectations, so passing CI means the project is ready for deployment.

## Troubleshooting

- **Prisma datasource URL** – If you see `Argument "url" is missing in data source block "db"`, double-check that `DATABASE_URL` is defined before running any Prisma command (local or CI).
- **JWT session issues** – Missing `SESSION_SECRET` will crash auth routes. Generate a long random string per environment.
- **Filters returning no results** – Remember that date filters are inclusive day ranges; leaving them blank clears the filter entirely (and pagination preserves the active filters).

Enjoy building!
