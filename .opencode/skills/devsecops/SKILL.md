---
name: devsecops
description: DevSecOps fullstack engineering — arquitectura, desarrollo fullstack, seguridad OWASP, CI/CD, despliegue, monitoreo y QA profesional. Úsala para desarrollar proyectos de principio a fin con las últimas tecnologías y mejores prácticas de ciberseguridad.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  category: fullstack, devsecops, devops, security
  stack: Next.js, React, TypeScript, Node.js, Express, Django, Python, Prisma, Docker, TailwindCSS
---

# DevSecOps — Ingeniería Fullstack Profesional

## Stack Tecnológico Principal

| Capa | Tecnologías |
|------|------------|
| **Frontend** | Next.js 14+, React 19, TypeScript, TailwindCSS 4, Radix UI, shadcn/ui, Framer Motion |
| **Backend** | Node.js/Express, Python/Django/DRF, FastAPI, NestJS |
| **Base de Datos** | Prisma + MySQL/PostgreSQL, MongoDB, Redis |
| **Auth** | NextAuth/Auth.js, Better Auth, JWT con httpOnly cookies |
| **Pagos** | Stripe, PayPal, Mercado Pago |
| **Estado** | Zustand, TanStack Query, Context API |
| **Forms** | React Hook Form + Zod |
| **UI/UX** | TailwindCSS, Radix UI, shadcn/ui, Framer Motion, responsive mobile-first |
| **DevOps** | Docker, GitHub Actions, Hostinger, Nginx, PM2 |
| **Testing** | Playwright, Vitest, Jest, pytest, Cypress |
| **AI/ML** | OpenAI/Anthropic SDK, Vercel AI SDK, LangChain |

---

## 1. ARQUITECTURA DE SOFTWARE

### 1.1 Patrones de Arquitectura
- **Monorepo Fullstack**: Next.js + Express en una sola carpeta raíz (esencial para Hostinger Node.js)
- **Clean Architecture**: Separación en capas (presentación, aplicación, dominio, infraestructura)
- **Feature-based**: Organización por funcionalidades, no por tipo técnico
- **API First**: Diseñar API REST/GraphQL antes que el frontend
- **Event-Driven**: Para microservicios y sistemas desacoplados

### 1.2 Estructura de Proyecto Estándar
```
project-root/
├── app/                    # Next.js App Router pages
│   ├── api/               # API route handlers
│   ├── (auth)/            # Auth pages group
│   ├── dashboard/         # Protected dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── shared/           # Shared feature components
├── lib/                   # Utilities, prisma client, helpers
├── controllers/           # Express controllers
├── routes/               # Express routes
├── middlewares/           # Express middlewares
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── services/             # Business logic services
├── types/                # TypeScript type definitions
└── server.ts             # Express entry point
```

### 1.3 Principios SOLID Aplicados
- **S**: Una responsabilidad por módulo/clase
- **O**: Extensiones sobre modificaciones (Strategy Pattern, Adapter)
- **L**: Subtipos intercambiables (interfaces de servicios)
- **I**: Interfaces específicas (segregación)
- **D**: Inyección de dependencias, no acoplamiento directo

---

## 2. DESARROLLO FULLSTACK

### 2.1 Frontend (Next.js + React)

#### App Router Conventions
- Layouts anidados con `layout.tsx`
- Server Components por defecto, Client Components solo cuando se necesita interactividad
- `generateMetadata()` para SEO dinámico
- Server Actions para mutaciones de datos
- Route Handlers en `app/api/`

#### Component Architecture
```tsx
// Base UI pattern
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}
```

#### State Management
- **Server State**: TanStack Query (React Query) con SSR
- **Client State**: Zustand para estado global mínimo
- **Form State**: React Hook Form + Zod schemas

#### Responsive Design
```css
/* TailwindCSS breakpoints */
sm: 640px  md: 768px  lg: 1024px  xl: 1280px  2xl: 1536px
```

### 2.2 Backend (Node.js/Express)

#### Structure
```typescript
// Controller pattern
export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.findAll()
    res.json({ success: true, data: items })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener items' })
  }
}
```

#### Error Handling Global
```typescript
// Express error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  })
})
```

### 2.3 Backend (Python/Django)

```python
# Django REST Framework ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['category', 'active']
    search_fields = ['name', 'description']
```

### 2.4 Base de Datos (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
  @@map("users")
}
```

#### Patrones Prisma
- Singleton client en `lib/prisma.ts`
- Transacciones para operaciones atómicas
- Middleware para soft deletes y logs
- Raw queries cuando se necesita rendimiento

---

## 3. SEGURIDAD (OWASP + MEJORES PRÁCTICAS)

### 3.1 OWASP Top 10 (2021) - Mitigaciones

| Vulnerabilidad | Mitigación |
|---------------|------------|
| **A01 Broken Access Control** | `middlewares/auth.ts`, RBAC, validación por roles |
| **A02 Cryptographic Failures** | bcrypt (12+ rounds), JWT con httpOnly, HTTPS |
| **A03 Injection** | Zod validation, Prisma parameterized queries, ORM |
| **A04 Insecure Design** | Rate limiting, security by design |
| **A05 Security Misconfiguration** | Headers CSP, CORS configurado, no defaults inseguros |
| **A06 Vulnerable Components** | npm audit, Dependabot, SBOM, actualizaciones |
| **A07 Auth Failures** | 2FA, sesiones seguras, rate limit en login |
| **A08 Data Integrity** | CSRF tokens, firma de webhooks |
| **A09 Logging Failures** | Logs estructurados, alertas, no datos sensibles |
| **A10 SSRF** | Validación de URLs, whitelist de destinos |

### 3.2 Autenticación y Autorización

```typescript
// JWT con httpOnly cookie
const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
  expiresIn: '24h'
})
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
})
```

#### Patrón de Middleware
```typescript
// Express middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No autorizado' })
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' })
    req.user = user
    next()
  })
}
```

### 3.3 Rate Limiting
```typescript
// Express
import rateLimit from 'express-rate-limit'
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Demasiadas solicitudes. Intenta en 15 minutos.' }
})

// Next.js Route Handler
import { rateLimit } from '@/app/api/_lib/rateLimit'
const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 100 })
```

### 3.4 Headers de Seguridad
```typescript
// next.config.mjs
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

async headers() {
  return [{ source: '/(.*)', headers: securityHeaders }]
}
```

### 3.5 Validación de Inputs (Zod)
```typescript
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener mayúscula')
    .regex(/[0-9]/, 'Debe contener número'),
  name: z.string().min(2, 'Nombre muy corto').max(100),
})
```

### 3.6 Protección CSRF
```typescript
// Next.js Server Action
export async function createOrder(formData: FormData) {
  'use server'
  // Next.js protege automáticamente Server Actions contra CSRF
  // Validar la solicitud con el token CSRF implícito
}
```

### 3.7 Seguridad en Base de Datos
- Prepared statements siempre (Prisma)
- Sanitización de inputs
- Principio de mínimo privilegio en conexiones DB
- Encriptación en reposo para datos sensibles
- Backups automáticos con verificación

### 3.8 Secrets Management
```bash
# .gitignore
.env
.env.local
.env.production
*.pem
**/service-account.json
```

---

## 4. DEVOPS & CI/CD

### 4.1 GitHub Actions Workflow
```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit
      - run: npx snyk test

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test

  deploy:
    needs: [security, test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: SamKirkland/FTP-Deploy-Action@v4
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
```

### 4.2 Docker
```dockerfile
# Dockerfile multistage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 4.3 Hostinger Deployment (Optimizado)

#### Archivos Críticos
- `server.ts` - Entry point Express + Next.js handler
- `ecosystem.config.js` - PM2 config
- `.htaccess` - Redirects y seguridad (si aplica)

#### Build para Hostinger
```json
{
  "scripts": {
    "build": "npm run clean && prisma generate && next build && tsc --project tsconfig.server.json",
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node server.ts"
  }
}
```

#### PM2 Config
```javascript
module.exports = {
  apps: [{
    name: 'fumiguard',
    script: 'dist/server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 4.4 Estrategia de Base de Datos
- Prisma Migrate en desarrollo
- Prisma db push para cambios rápidos
- Migraciones versionadas en PRs
- Seed data para desarrollo
- Backup diario automatizado

---

## 5. TESTING Y QA

### 5.1 Pirámide de Testing
```
    /\
   /E2E\       Playwright, Cypress (10%)
  /Integ\      Supertest, pytest (20%)
 / Unit  \    Vitest, Jest, pytest (70%)
 ---------
```

### 5.2 Frontend Testing
```typescript
// Vitest + Testing Library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('shows error on invalid email', async () => {
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid')
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
  })
})
```

### 5.3 API Testing
```typescript
// Supertest
import request from 'supertest'
import app from '../server'

describe('POST /api/auth/login', () => {
  it('returns 400 with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'wrong' })
    expect(res.status).toBe(400)
  })
})
```

### 5.4 E2E Testing
```typescript
// Playwright
test('user can complete purchase flow', async ({ page }) => {
  await page.goto('/services')
  await page.click('[data-testid="service-card-1"]')
  await page.click('[data-testid="checkout-button"]')
  await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible()
})
```

### 5.5 Security Testing
```bash
# SAST (Static Analysis)
npm audit                # Dependencies vulnerabilities
npx snyk test            # Snyk SAST
npx eslint .             # ESLint security rules

# DAST (Dynamic Analysis)
npx zap-cli quick-scan   # OWASP ZAP
npx lighthouse-ci        # Security + Performance audit

# Secret Detection
npx trufflehog file://.  # Secrets in codebase
```

---

## 6. MONITOREO Y OBSERVABILIDAD

### 6.1 Logging Estructurado
```typescript
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty' }
    : undefined,
  redact: ['req.headers.cookie', 'req.headers.authorization']
})
```

### 6.2 Error Tracking
```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV
})
```

### 6.3 Performance Monitoring
```typescript
// Web Vitals
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
  // Send to analytics
}
```

---

## 7. GESTIÓN DE PROYECTOS

### 7.1 Flujo de Trabajo
1. **Análisis**: Requerimientos, investigación, definición de alcance
2. **Arquitectura**: Diseño, estructura, API design, DB schema
3. **Implementación**: Desarrollo iterativo con PRs
4. **Testing**: Unit, integration, E2E, security
5. **Deploy**: CI/CD, staging, producción
6. **Monitoreo**: Logs, métricas, alertas
7. **Iteración**: Feedback, mejoras, nuevas features

### 7.2 Convenciones de Git
```bash
feat: Nueva funcionalidad
fix: Corrección de bug
security: Parche de seguridad
refactor: Refactorización
test: Tests
docs: Documentación
chore: Tareas de mantenimiento
```

### 7.3 Code Review Checklist
- [ ] Seguridad (Zod validation, auth, rate limiting)
- [ ] TypeScript strict mode
- [ ] No secrets hardcodeados
- [ ] Tests incluidos
- [ ] Manejo de errores
- [ ] Logs apropiados (sin datos sensibles)
- [ ] Responsive design
- [ ] Accesibilidad (aria labels, roles)
- [ ] Performance (memoization, lazy loading)

---

## 8. PRE-CHECKLIST DE PRODUCCIÓN

- [ ] Variables de entorno configuradas (.env.production)
- [ ] HTTPS habilitado
- [ ] Headers de seguridad implementados
- [ ] Rate limiting activo en endpoints críticos
- [ ] CORS configurado (whitelist de orígenes)
- [ ] Logs sin datos sensibles
- [ ] Prisma migrations aplicadas
- [ ] Build exitoso (npm run build)
- [ ] Tests pasando
- [ ] npm audit sin vulnerabilidades críticas
- [ ] Backup de base de datos configurado
- [ ] Monitoreo/configuración de alertas
- [ ] PM2/process manager configurado
- [ ] Dominio y DNS configurados
- [ ] SSL certificate válido

---

## 9. MCP TOOLS INTEGRATION

### Hostinger MCP
- `hostinger-hosting`: Crear/manage websites, databases, Node.js deployments, PHP config
- `hostinger-domains`: Domain management, WHOIS, forwarding
- `hostinger-dns`: DNS zone management, records, snapshots
- `hostinger-billing`: Subscriptions, orders, payment methods
- `hostinger-reach`: Email marketing, contacts, segments

### GitHub MCP
- Create/manage repos, issues, PRs, branches
- Code search, file management
- Actions workflows

### Context7 MCP
- Documentación actualizada de librerías y frameworks
- API references, code examples

### TestSprite MCP
- Testing automatizado de frontend y backend
- Test plans, execution, dashboards

---

## 10. CUÁNDO USARME

### Activar este skill cuando el usuario:
- Quiera desarrollar un proyecto web completo de principio a fin
- Necesite crear una arquitectura fullstack profesional
- Mencione "DevSecOps", "fullstack", "desarrollo profesional"
- Quiera implementar seguridad OWASP en su aplicación
- Necesite configurar CI/CD y despliegue
- Solicite mejores prácticas de desarrollo y ciberseguridad
- Quiera auditar la seguridad de un proyecto existente
- Necesite configurar testing automatizado
- Mencione despliegue en Hostinger o similares
- Quiera crear un proyecto con Next.js + Express + Prisma + Django

### Preguntas de clarificación iniciales:
1. ¿Qué tipo de proyecto necesitas desarrollar? (web app, e-commerce, SaaS, landing page, API, dashboard)
2. ¿Cuál es tu stack tecnológico preferido? (Next.js, Django, Express, etc.)
3. ¿Necesitas integración con Hostinger u otro hosting específico?
4. ¿Qué nivel de seguridad requiere el proyecto? (básico, estándar, alta seguridad)
5. ¿Necesitas autenticación, pagos, panel de administración?
6. ¿Tienes diseños UI/UX definidos o necesitas crearlos?
7. ¿Cuál es el timeline del proyecto?
