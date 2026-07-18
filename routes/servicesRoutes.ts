import { Router } from 'express';
import { getServices, createService } from '../controllers/servicesController';
import { authenticateToken, requireAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getServices);
// Solo los administradores pueden crear servicios
router.post('/', authenticateToken, requireAdmin, createService);

export default router;

