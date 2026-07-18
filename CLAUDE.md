# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: FUMIGUARD

Single-folder fullstack web app for a fumigation / pest-control company in Bogotá, Colombia. Everything (Next.js frontend + Express backend + Prisma) lives in **one repo on purpose** because it deploys as a Node.js app to Hostinger; splitting into `/frontend` and `/backend` previously caused HTTP 503s on deploy.

## Common Commands

```bash
npm run dev      # Express + Next.js together (nodemon, ts-node, tsconfig.server.json)
npm run build    # rm -rf .next dist && prisma generate && next build && tsc (server)
npm run start    # NODE_ENV=production node dist/server.js
npm run lint     # next lint
npx prisma generate
npx prisma db seed          # runs prisma/seed.ts via ts-node
```

There is no test runner configured. The build log lives at `build_output.log` if you need a previous successful build's stdout.

## Architecture (the big picture)

**One repo, two servers, shared port.** `server.ts` boots Express, hands `/api/*` to Express routers, and forwards everything else to Next.js via `next({ dev, hostname, port }).getRequestHandler()`. They share the same `PORT` (default 3000). `npm run start` runs the compiled `dist/server.js`; `npm run dev` runs `server.ts` directly with `ts-node` + nodemon.

**Two parallel API implementations coexist (migration in progress).** Most auth-related endpoints exist in both:
- **Express routes** under `routes/*.ts` → `controllers/*.ts` mounted in `server.ts` at `/api/auth`, `/api/users`, `/api/services`, `/api/orders`. The Express routers use `express.Router` + Zod validation + the shared `authenticateToken` / `requireAdmin` middleware.
- **Next.js App Router routes** under `app/api/auth/{login,logout,register}/route.ts` and `app/api/contact/route.ts`. These were migrated to native Next route handlers (see commit `81a3625`). Frontend pages currently call the Next.js ones (e.g. `app/login/page.tsx` → `/api/auth/login`, `app/dashboard/page.tsx` → `/api/users/profile`, `app/calculator/page.tsx` → `/api/orders` + `/api/services`).

`/api/services` (GET) and `/api/orders` (POST/GET) and `/api/contact` (POST) are only in **one** place — figure out which before adding a new endpoint so you don't duplicate it. `/api/health` is Express-only.

**Pricing rule lives in two places and must stay in sync.** The minimum 180,000 COP / +1,000 COP per m² above 100 m² formula appears in:
- `controllers/ordersController.ts` `createOrder` (server-side, authoritative)
- `app/calculator/page.tsx` `calculatePrice` (client-side preview, with extra `propertyType` multiplier for Comercial 1.2× / Industrial 1.5× / Residencial 1.0×)

**Auth = JWT in httpOnly cookie named `token`.** Signed with `JWT_SECRET`, 1-day expiry, `sameSite: 'strict'`, `secure` in production. Set by both Express (`controllers/authController.ts` `login`) and Next route handler (`app/api/auth/login/route.ts`). Read by `middlewares/auth.ts` `authenticateToken` via `req.cookies.token` (Express) or the `authorization` header. Decoded payload is `{ userId, role: 'CLIENT' | 'ADMIN' }`.

**Rate limiting is in-memory.** `middlewares/rateLimiter.ts` uses a `Map<ip, {count, resetTime}>` — fine for a single-process Hostinger deploy, but **do not scale horizontally without replacing it**. `apiLimiter` (100 req/15min) is applied globally to `/api` in `server.ts`; `authLimiter` (15 req/15min) is applied to the Express auth router. Next.js auth route handlers do **not** have rate limiting yet.

**Password reset is half-wired.** `forgotPassword` generates a SHA-256-hashed token + 1-hour expiry and stores it on the user, but the email-sending call is commented out and only logs the token to console. SMTP creds are in `.env` (`SMTP_HOST=smtp.hostinger.com`, etc.) but no mailer is actually wired up.

**Stripe is initialized but payment flow is MVP-pivoted.** `controllers/ordersController.ts` constructs a Stripe client and `createPaymentIntent` returns a `clientSecret`, but the actual user-facing checkout (`app/payment/page.tsx`) shows a **Bre-B transfer + WhatsApp** flow, not Stripe Elements. `STRIPE_SECRET_KEY` in `.env` is a placeholder.

**Prisma singleton pattern.** `lib/prisma.ts` stores the client on `globalThis` in non-production to avoid HMR connection storms. The schema (`prisma/schema.prisma`) uses MySQL — connect URL is in `DATABASE_URL` and points at a Hostinger MySQL DB. Models: `User`, `Service`, `Order`, `Review` with enums `Role` / `OrderStatus` / `PaymentStatus`. Default role is `CLIENT`; promote to `ADMIN` directly in the DB.

## Key Conventions

- **Spanish copy throughout** UI, error messages, Zod messages. Keep it consistent.
- **Currency: COP**, formatted via `new Intl.NumberFormat('es-CO')`. Prices stored as `Float` in Prisma (COP whole numbers); Stripe expects centavos (`amount: Math.round(order.totalPrice * 100)`).
- **Path alias:** `@/*` maps to repo root via `tsconfig.json` `paths`. Use `@/components/...`, `@/lib/prisma`, etc. in the frontend. Server-side code uses **relative imports** (`../lib/prisma`, `../middlewares/auth`) — see commit `dd20751`.
- **Two tsconfigs.** `tsconfig.json` is for Next.js (ESM, `moduleResolution: bundler`, JSX preserve). `tsconfig.server.json` extends it but flips to CommonJS + `node` resolution + `outDir: dist` for the Express server build. Don't merge them.
- **No test framework, no CI config, no `.github/` directory, no Cursor rules, no `.cursorrules`.** README.md is the boilerplate `create-next-app` README — ignore it for project info.
- **`ejemplo_paguina/`** contains reference screenshots only, not part of the app.
- **Image assets:** under `public/img/` (`hero_v1.png`, `logo_v1.png`, `services_v1.png`, etc.). The build log warns about `<img>` usage in `app/about/page.tsx`, `app/catalog/page.tsx`, `app/login/page.tsx` — Next.js prefers `next/image`.

## File Map (when you need to find something fast)

- Frontend pages: `app/<route>/page.tsx` (home, about, catalog, calculator, payment, contact, login, register, forgot-password, reset-password, dashboard, faq, gallery, how-it-works, testimonials)
- Shared components: `components/*.tsx` (Navbar, Footer, FloatingChatWidget, FAQSection, ServiceGallery, TestimonialsSection, HowItWorksSection, CertificationsBar, CTASection)
- Next API routes: `app/api/auth/{login,logout,register}/route.ts`, `app/api/contact/route.ts`
- Express API: `routes/*.ts` + `controllers/*.ts` + `middlewares/{auth,rateLimiter}.ts` + `lib/prisma.ts` + `server.ts`
- Schema & seed: `prisma/schema.prisma`, `prisma/seed.ts`
- Compiled server: `dist/` (gitignored by being in `.gitignore`-adjacent — actually it IS tracked, see the `M` files in git status; `clean` removes it on build)
- Deployment spec / original requirements: `instruccion/instruccion_para_crear_sitio.txt` (Spanish, authoritative on the Hostinger single-folder constraint)
