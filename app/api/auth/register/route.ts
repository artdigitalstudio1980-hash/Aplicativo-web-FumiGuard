import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { withRateLimit, authLimiter } from '../../_lib/rateLimit';

const registerSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  name: z.string().min(2, { message: "El nombre es muy corto" }),
  phone: z.string().optional(),
  propertyType: z.string().optional(),
  acceptsOffers: z.boolean().optional()
});

async function registerHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const { email, password, name, phone, propertyType, acceptsOffers } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name, 
        phone: phone || null, 
        propertyType: propertyType || null, 
        acceptsOffers: acceptsOffers ?? true 
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
