import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10' as any,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { serviceId, plagueType, areaSize, propertyType } = req.body;
    const userId = (req as any).user.userId;

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Base price logic: Minimum 180,000 COP
    let calculatedPrice = service.basePrice;
    if (areaSize > 100) {
      calculatedPrice += (areaSize - 100) * 1000; // Extra charge per m2
    }
    const totalPrice = Math.max(calculatedPrice, 180000); // Enforce minimum

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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { service: true }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100, // Stripe expects minimum currency unit (cents/centavos, but COP is treated specially, though Stripe usually expects amount in smallest currency unit)
      currency: 'cop',
      metadata: { orderId: order.id }
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentIntent.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
