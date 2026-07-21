# Deploy a Hostinger

## Requisitos previos
- Tener acceso al **hpanel** de Hostinger
- Hostname MySQL: `srv1010.hstgr.io` (ya configurado en el `.env` local)

## Pasos

### 1. Configurar variables de entorno en el hpanel
En hpanel > "Node.js" > "Variables de entorno", agrega:

```
NODE_ENV=production
DATABASE_URL=mysql://u425976741_jorpatart:pap58UGMpMN@srv1010.hstgr.io:3306/u425976741_fumiguard
JWT_SECRET="wEXUpeuekZYH+JURZbtxvwIpsDWqXn9mxGjiAcGriuDuag7w679R0CHOmuz3bX3mtRleW4o8mg7IMskKJUBpcA=="
PORT=3000
```

### 2. Subir archivos
Sube `deploy.tar.gz` vía File Manager del hpanel y extrae en la raíz del proyecto.

### 3. Instalar dependencias
En la terminal del hpanel (o SSH):
```bash
npm install --production
npx prisma generate
```

### 4. Sembrar servicios
```bash
npx prisma db seed
```

### 5. Crear usuario ADMIN
Ejecuta en la terminal del hpanel:
```bash
npx ts-node prisma/seed-admin.ts
```
Te pedirá email, contraseña y nombre. Usa datos reales.

**Alternativa desde phpMyAdmin** (hpanel > phpMyAdmin):
```sql
INSERT INTO User (id, email, password, name, role, acceptsOffers, createdAt, updatedAt)
VALUES (
  UUID(),
  'admin@fumiguard.com',
  '$2a$12$LJ3m4ys3Lk0TSw0E1KJZzOqk0Gf1E1X1Y1Z1W1V1U1T1S1R1Q1P1O1N1M1',
  'Admin',
  'ADMIN',
  0,
  NOW(),
  NOW()
);
```
**NOTA:** La contraseña hash de arriba es `Admin123456!` — cámbiala después de iniciar sesión.

### 6. Iniciar la app
En hpanel > "Node.js", configura:
- **Comando de inicio:** `npm run start`
- **Puerto:** 3000
- **Ruta raíz:** `/`

Luego haz clic en **"Iniciar"** o **"Reiniciar"**.

## URLs
| Página | URL |
|--------|-----|
| Login | `https://fumiguard.jorpat-art.com/login` |
| Registro | `https://fumiguard.jorpat-art.com/register` |
| Admin | `https://fumiguard.jorpat-art.com/admin` |
| Calculadora | `https://fumiguard.jorpat-art.com/calculator` |

## Notas importantes
- El `.env` local NO se sube al servidor. Las variables se configuran en el hpanel.
- Si el registro no funciona, verifica que la DB tenga los servicios sembrados (`npx prisma db seed`).
