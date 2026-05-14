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
// Import routes here later

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middlewares
  server.use(cors());
  server.use(helmet({ contentSecurityPolicy: false })); // Disable CSP in dev or configure properly
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  // API Routes (Express)
  server.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Express server is running alongside Next.js' });
  });

  server.use('/api/auth', authRoutes);
  server.use('/api/users', usersRoutes);
  server.use('/api/services', servicesRoutes);
  server.use('/api/orders', ordersRoutes);

  // Next.js fallback handler for pages
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
