import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { withRateLimit, authLimiter } from '../../_lib/rateLimit';

const registerSchema = z.object({
  email: z.string().trim().email({ message: "Correo inválido" }).max(255),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
  name: z.string().trim().min(2, { message: "El nombre es muy corto" }).max(100),
  phone: z.string().trim().max(20).optional(),
  propertyType: z.string().trim().max(50).optional(),
  acceptsOffers: z.boolean().optional()
});

async function registerHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos. Verifica los campos e inténtalo de nuevo.' }, { status: 400 });
    }

    const { email, password, name, phone, propertyType, acceptsOffers } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'No se pudo completar el registro. Intenta con otros datos.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name, 
        phone: phone || null, 
        propertyType: propertyType || null, 
        acceptsOffers: acceptsOffers ?? false 
      }
    });

    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({ 
      message: 'Usuario creado y autenticado exitosamente', 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    }, { status: 201 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 1 día en segundos
    });

    return response;
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export const POST = withRateLimit(registerHandler, authLimiter);
