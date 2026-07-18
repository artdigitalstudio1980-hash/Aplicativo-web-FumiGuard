import { Response } from 'express';
import { prisma } from '../lib/prisma';
import Stripe from 'stripe';
import { AuthRequest } from '../middlewares/auth';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10' as any,
});

const createOrderSchema = z.object({
  serviceId: z.string().uuid('ID de servicio inválido'),
  plagueType: z.string().min(2, 'El tipo de plaga es requerido'),
  areaSize: z.number().positive('El tamaño del área debe ser un número positivo'),
  propertyType: z.string().min(2, 'El tipo de propiedad es requerido'),
});

const createPaymentIntentSchema = z.object({
  orderId: z.string().uuid('ID de orden inválido'),
});

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const validatedData = createOrderSchema.parse(req.body);
    const { serviceId, plagueType, areaSize, propertyType } = validatedData;

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    // Lógica de precio base: Mínimo 180,000 COP
    let calculatedPrice = service.basePrice;
    if (areaSize > 100) {
      calculatedPrice += (areaSize - 100) * 1000; // Recargo por metro cuadrado extra
    }
    const totalPrice = Math.max(calculatedPrice, 180000); // Forzar mínimo

    const order = await prisma.order.create({
      data: {
        userId,
        serviceId,
        plagueType,
        areaSize,
        propertyType,
        totalPrice,
      }
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { service: true }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { orderId } = createPaymentIntentSchema.parse(req.body);
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

    // Evitar IDOR: Validar propiedad de la orden.
    // Solo el dueño de la orden o un admin pueden procesar el pago.
    if (order.userId !== userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta orden' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Stripe espera centavos, redondeado
      currency: 'cop',
      metadata: { orderId: order.id }
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentIntent.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

