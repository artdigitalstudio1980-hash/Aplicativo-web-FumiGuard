import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Get Services Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}