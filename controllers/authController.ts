import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  propertyType: z.string().optional(),
  acceptsOffers: z.boolean().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, propertyType, acceptsOffers } = registerSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El correo electrónico ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone, propertyType, acceptsOffers: acceptsOffers ?? false }
    });

    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    
    const dummyHash = '$2a$12$LJ3m4ys3Lk0TSw0E1KJZzOqk0Gf1E1X1Y1Z1W1V1U1T1S1R1Q1P1O1N1M1';
    const passwordValid = user ? await bcrypt.compare(password, user.password) : await bcrypt.compare(password, dummyHash);
    if (!user || !passwordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ message: 'Logged in successfully', user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

const forgotPasswordSchema = z.object({
  email: z.string().email('Correo inválido'),
});

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // Por seguridad, no revelamos si el usuario existe o no, pero retornamos éxito aparente
      return res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validez

    await prisma.user.update({
      where: { email },
      data: { resetPasswordToken, resetPasswordExpires }
    });

    // AQUÍ IRÍA LA LÓGICA DE ENVÍO DE CORREO (ej. con Resend o Nodemailer)
    // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    // await sendEmail(user.email, 'Recuperación de contraseña Fumiguard', `Tu enlace: ${resetUrl}`);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Token de recuperación para ${email}: ${resetToken}`);
    }

    res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
  } catch (error) {
    res.status(500).json({ error: 'Error procesando la solicitud de recuperación' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken,
        resetPasswordExpires: { gt: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'El token de recuperación es inválido o ha expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    res.status(200).json({ message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.' });
  } catch (error) {
    res.status(500).json({ error: 'Error restableciendo la contraseña' });
  }
};
