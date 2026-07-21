import express, { Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';
import servicesRoutes from './routes/servicesRoutes';
import ordersRoutes from './routes/ordersRoutes';
import { apiLimiter } from './middlewares/rateLimiter';
// Import routes here later

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middlewares
  server.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_APP_URL || 'https://tu-dominio.com']
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  }));
  server.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          // Permitir imágenes del propio sitio, data URIs y HTTPS externo (galerías).
          imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
          // Next.js sirve scripts inline para hydration; en producción se sirven como 'self'.
          // 'unsafe-eval' es necesario en desarrollo por el HMR de Next.
          scriptSrc: [
            "'self'",
            ...(process.env.NODE_ENV !== 'production' ? ["'unsafe-inline'", "'unsafe-eval'"] : ["'unsafe-inline'"]),
          ],
          // Tailwind utility classes requieren inline styles.
          styleSrc: ["'self'", "'unsafe-inline'"],
          // Permitir conexiones al propio origen y a Stripe Elements (futuro).
          connectSrc: ["'self'", 'https://api.stripe.com'],
          // Evitar que el sitio sea embebido en iframes de terceros.
          frameAncestors: ["'none'"],
        },
      },
    })
  );
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  // Apply general API Rate Limiter
  server.use('/api', apiLimiter);

  // API Routes (Express)
  server.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Express server is running alongside Next.js' });
  });

  server.use('/api/auth', authRoutes);
  server.use('/api/users', usersRoutes);
  server.use('/api/services', servicesRoutes);
  server.use('/api/orders', ordersRoutes);


  // Next.js fallback handler for pages (Express 5 wildcard syntax)
  server.all('/{*path}', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
  });
}).catch((err) => {
  console.error('FATAL: Error during server initialization:');
  console.error(err);
  process.exit(1);
});
