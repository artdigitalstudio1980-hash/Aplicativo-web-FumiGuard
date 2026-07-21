import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/verifyAdmin';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('token')?.value;
  const payload = requireAdmin(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Admin Fetch Orders Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
