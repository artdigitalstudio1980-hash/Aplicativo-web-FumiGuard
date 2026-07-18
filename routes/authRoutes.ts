import { Router } from 'express';
import { register, login, logout, forgotPassword, resetPassword } from '../controllers/authController';
import { authLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Aplicar rate limiter de autenticación para mitigar fuerza bruta en todas las peticiones
router.use(authLimiter);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;

