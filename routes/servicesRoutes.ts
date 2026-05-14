import { Router } from 'express';
import { getServices, createService } from '../controllers/servicesController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', getServices);
// Assume only admin can create, we add auth middleware for now
router.post('/', authenticateToken, createService);

export default router;
