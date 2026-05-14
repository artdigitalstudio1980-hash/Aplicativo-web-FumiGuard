import { Router } from 'express';
import { createOrder, getOrders, createPaymentIntent } from '../controllers/ordersController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken); // All order routes require auth

router.post('/', createOrder);
router.get('/', getOrders);
router.post('/payment-intent', createPaymentIntent);

export default router;
