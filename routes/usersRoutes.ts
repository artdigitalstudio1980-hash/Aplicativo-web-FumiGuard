import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/usersController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
