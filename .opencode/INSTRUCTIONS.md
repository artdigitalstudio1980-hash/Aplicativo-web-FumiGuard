# DevSecOps — Instrucciones del Proyecto

Este proyecto utiliza el **Agente DevSecOps CEO** como agente principal por defecto.

## Agentes Disponibles

| Agente | Comando | Descripción |
|--------|---------|-------------|
| **devsecops** (default) | `/devsecops` | CEO Fullstack: arquitectura, desarrollo, seguridad, devops |
| **security-auditor** | `/security-audit` | Auditoría OWASP completa |
| **deployment-engineer** | `/deploy` | CI/CD y despliegue a producción |
| **qa-tester** | `/qa` | Testing automatizado y reportes |
| **code-reviewer** | `/review` | Code review profesional |

## Comandos Rápidos

```
/devsecops [consulta]      → Invoca al CEO DevSecOps
/security-audit            → Auditoría de seguridad
/deploy                    → Despliegue a producción
/qa                        → Suite completa de tests
/review                    → Code review
```

## Skills Instalados (Proyecto)
- `devsecops` — Guía completa de desarrollo fullstack seguro

## Skills Globales Disponibles
- `ciberseguridad` — Auditoría OWASP y hardening
- `nextjs-fullstack` — Desarrollo Next.js fullstack
- `django-mysql-backend` — Desarrollo Django backend
- `diseno-web-uiux` — Diseño UI/UX
- `full-stack-security-guard` — Vigilancia de seguridad extrema
- `devops-ci-cd-master` — Automatización de despliegues
- `premium-ui-designer` — Diseño premium de interfaces

## MCP Servers Conectados
- **Context7**: Documentación actualizada de librerías
- **GitHub**: Gestión de repositorios y código
- **Hostinger**: Hosting, DNS, dominios, billing
- **TestSprite**: Testing automatizado E2E

## Flujo de Trabajo Estándar
1. `/devsecops` para iniciar cualquier proyecto
2. El CEO planifica, diseña y delega a subagentes
3. Los subagentes ejecutan tareas especializadas
4. El CEO revisa calidad y coordina el despliegue

## Notas Importantes
- La UI y mensajes deben estar en **español**
- Moneda: **COP** (pesos colombianos) para proyectos colombianos
- No hardcodear secrets — usar variables de entorno
- TypeScript strict mode siempre
- Zod validation en todos los inputs
- Testing obligatorio antes de marcar completada una tarea
