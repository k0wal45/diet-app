# Copilot Instructions for diet-app

## Project Overview
- **diet-app** is a Next.js (App Router) monorepo for a dietician web application.
- Uses TypeScript, React 19, Prisma ORM (PostgreSQL), and Tailwind CSS.
- Main business logic is in the `app/` and `components/` directories.
- API routes are under `app/api/` and use Next.js Route Handlers.
- Data models are defined in `prisma/schema.prisma` and TypeScript interfaces in `lib/Types.ts`.

## Key Patterns & Conventions
- **Prisma**: All DB access via `@/lib/prisma`. Models: `User`, `Client`, `Product`, etc. Schema changes require `npx prisma migrate dev`.
- **Types**: Use shared types from `lib/Types.ts` for API and UI consistency.
- **API**: Route handlers (e.g. `app/api/clients/addClient/route.ts`) expect/return JSON. Use `NextRequest`/`NextResponse`.
- **Authentication**: JWT-based, see `app/api/auth/` for token logic.
- **User roles**: `ADMIN`, `DIETICIAN`, `USER` (see `UserRole` in `lib/Types.ts`).
- **Client creation**: See `components/app/Home/AddNewClient.tsx` for form and API usage.
- **Error handling**: Return JSON with status codes in API routes.
- **SSR/ISR**: Use `export const revalidate` for ISR, or fetch data in server components for SSR.

## Developer Workflows
- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Prisma migration**: `npx prisma migrate dev --name <desc>`
- **Add dependency**: `npm install <package>`

## Examples
- Add a client: POST to `/api/clients/addClient` with `{ name, email, age, weight, height, sex }`.
- Add a user: POST to `/api/user/addUser` with `{ email, name, password, role }` (password is hashed).
- Use types: `import { Client } from "@/lib/Types"`.

## External Integrations
- **Prisma**: PostgreSQL via `DATABASE_URL` in env.
- **bcryptjs**: For password hashing.
- **jsonwebtoken/jose**: For JWT auth.

## File Structure Highlights
- `app/` - Next.js app router, pages, layouts, API routes
- `components/` - React UI components
- `lib/Types.ts` - Shared types
- `prisma/schema.prisma` - DB schema

---
For questions, check the README or ask for specific file patterns. Update this file if conventions change.
