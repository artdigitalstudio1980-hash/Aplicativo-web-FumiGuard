import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAdmin } from '../../../../../lib/verifyAdmin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const OrderStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']);

const updateStatusSchema = z.object({
  status: OrderStatusEnum,
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get('token')?.value;
  const payload = requireAdmin(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: parsed.data.status }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Admin Update Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
