import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  const token = cookies().get('token')?.value;
  if (!token) return false;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return payload.role === 'ADMIN';
  } catch {
    return false;
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status } = body;

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Admin Update Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
