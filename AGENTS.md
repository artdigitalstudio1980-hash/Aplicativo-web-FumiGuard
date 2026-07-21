# FUMIGUARD Agent Guide

High-signal context for agents working on the FUMIGUARD project.

## Architecture & Deployment
- **Single-Folder Fullstack:** Next.js + Express + Prisma live in a single root. **DO NOT** split into `/frontend` and `/backend`. This is required for Hostinger Node.js deployment to avoid HTTP 503 errors.
- **Shared Port:** Express boots first in `server.ts`, mounts its routes, and forwards all other requests to Next.js via `getRequestHandler()`. Default port is 3000.
- **Hostinger Optimization:** The build process (`npm run build`) must generate a `dist/` folder containing the compiled Express server (`dist/server.js`) and the Next.js build (`.next/`).

## API Implementation (Dual Stack)
Migration is in progress. Check both locations before adding new endpoints:
- **Express (Controllers/Routes):** Authoritative for most logic. Mounted at `/api/auth`, `/api/users`, `/api/services`, `/api/orders`.
- **Next.js (App Router):** Native route handlers in `app/api/`. Currently handles `/api/auth/{login,logout,register}`, `/api/contact`, and some admin order routes.
- **Frontend calls:** The UI generally calls the Next.js route handlers for auth and Express routers for data (orders, services).

## Core Logic & Conventions
- **Currency:** Colombian Pesos (COP). Use `new Intl.NumberFormat('es-CO')` for formatting.
- **Pricing Formula:** Authoritative version in `controllers/ordersController.ts`.
  - Minimum: 180,000 COP.
  - Base: `service.basePrice`.
  - Recargo: +1,000 COP per m² above 100 m².
  - Client-side preview in `app/calculator/page.tsx` includes property type multipliers (Residencial 1.0x, Comercial 1.2x, Industrial 1.5x).
- **Authentication:** JWT stored in an `httpOnly` cookie named `token`.
  - Express middleware: `middlewares/auth.ts` (`authenticateToken`, `requireAdmin`).
  - Next.js handlers: Set cookie directly in response.
- **Database:** Prisma with MySQL. Singleton pattern in `lib/prisma.ts`.
- **Language:** UI and error messages must be in **Spanish**.

## Developer Workflow
- **Dev Mode:** `npm run dev` (Runs `server.ts` with `ts-node` + `nodemon`).
- **Production Build:** `npm run build` (`clean` -> `prisma generate` -> `next build` -> `tsc server`).
- **Start Production:** `npm run start` (Runs `dist/server.js`).
- **Database:** `npx prisma db seed` to populate services.
- **Imports:** 
  - Frontend: Use `@/` path aliases.
  - Server: Use **relative paths** (`../lib/prisma`) to ensure compatibility with `tsc` compilation to `dist/`.

## Security (OWASP)
- **JWT Secret:** Stored in `.env` as `JWT_SECRET`. **DO NOT commit `.env` to git** — it's in `.gitignore`.
- **Shared Auth:** Use `lib/verifyAdmin.ts` (`verifyToken`, `requireAdmin`) in all admin routes — NOT inline `jwt.verify`.
- **Rate Limiting:** Express uses `middlewares/rateLimiter.ts`. Next.js handlers use `app/api/_lib/rateLimit.ts`. Apply to all auth and admin endpoints.
- **Input Validation:** All API inputs must use Zod schemas. Never trust raw `req.body`.
- **Password Hashing:** bcrypt with 12+ salt rounds. No MD5/SHA1 for passwords.
- **Cookies:** `httpOnly: true`, `secure: true` in production, `sameSite: 'strict'`.

## Critical Constraints
- **NO Separated Projects:** Do not create a separate backend or frontend folder.
- **SMTP:** Configured for Hostinger SMTP, but `forgotPassword` in `controllers/authController.ts` is half-wired (logs to console).
- **Stripe:** Initialized but frontend currently emphasizes WhatsApp/Transfer (Bre-B) flow in `app/payment/page.tsx`.
- **Hostinger DB:** The `DATABASE_URL` in `.env` uses `localhost` — **must be updated** to the correct Hostinger MySQL hostname in production.
