import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/verifyAdmin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const createOrderSchema = z.object({
  serviceId: z.string().min(1, 'El servicio es requerido'),
  plagueType: z.string().min(2, 'El tipo de plaga es requerido'),
  areaSize: z.number().positive('El tamaño debe ser un número positivo'),
  propertyType: z.string().min(2, 'El tipo de propiedad es requerido'),
});

export async function POST(req: NextRequest) {
  const token = cookies().get('token')?.value;
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { serviceId, plagueType, areaSize, propertyType } = parsed.data;

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
    }

    let calculatedPrice = service.basePrice;
    if (areaSize > 100) {
      calculatedPrice += (areaSize - 100) * 1000;
    }
    const totalPrice = Math.max(calculatedPrice, 180000);

    const order = await prisma.order.create({
      data: {
        userId: payload.userId,
        serviceId,
        plagueType,
        areaSize,
        propertyType,
        totalPrice,
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  const token = cookies().get('token')?.value;
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Get Orders Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}