import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { withRateLimit, authLimiter } from '../../_lib/rateLimit';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(100),
});

async function loginHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    const dummyHash = '$2a$12$LJ3m4ys3Lk0TSw0E1KJZzOqk0Gf1E1X1Y1Z1W1V1U1T1S1R1Q1P1O1N1M1';
    const passwordValid = user ? await bcrypt.compare(password, user.password) : await bcrypt.compare(password, dummyHash);
    if (!user || !passwordValid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({ 
      message: 'Inicio de sesión exitoso', 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 1 día en segundos
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export const POST = withRateLimit(loginHandler, authLimiter);
