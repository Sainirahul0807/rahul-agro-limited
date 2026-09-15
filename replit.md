# Rahul Agro Limited

Rahul Agro Limited is a multilingual agricultural marketplace and cold-storage rental experience for farmers, traders, and government procurement teams around Sainipura, Tauru.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/rahul-agro` — the React/Vite customer-facing site and all local marketplace flows
- `artifacts/api-server/src/routes/chat.ts` — server-side Gramini assistant endpoint
- `lib/api-spec/openapi.yaml` — source of truth for the health and assistant API contracts
- `artifacts/rahul-agro/src/index.css` — Rahul Agro visual tokens and motion styles

## Architecture decisions

- The storefront uses local mock catalog and chamber data for the first release so browsing, calculator, booking, monitoring, and logistics flows remain usable without a database.
- Gemini calls happen only from the API server; `GEMINI_API_KEY` is a Replit Secret and is never sent to the client.
- The visual identity is original and inspired by agricultural operations, not copied from BigHaat or dependent on scraped assets.
- The React app is Vercel-friendly as a static Vite build, while the assistant is isolated behind the existing Node API service.

## Product

The app provides crop and chamber discovery, multilingual navigation in English/Hindi/Haryanvi, cold-storage cost estimation, a multi-step reservation flow with downloadable slips, simulated live chamber telemetry, reefer and mandi-connect enquiries, and the Gramini assistant for storage and logistics questions.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing the OpenAPI contract.
- Keep `GEMINI_API_KEY` in Secrets; do not paste it into source, client code, or repository files.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
