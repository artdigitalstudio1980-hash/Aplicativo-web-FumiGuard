import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, basePrice } = req.body;
    const service = await prisma.service.create({
      data: { name, description, basePrice }
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
