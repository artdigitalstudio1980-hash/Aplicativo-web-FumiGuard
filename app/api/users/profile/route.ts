import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/verifyAdmin';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('token')?.value;
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, phone: true, role: true, address: true, createdAt: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}