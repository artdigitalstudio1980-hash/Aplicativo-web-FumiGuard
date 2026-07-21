import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withRateLimit, apiLimiter } from '../_lib/rateLimit';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .trim()
    .email('Correo electrónico inválido')
    .max(255, 'El correo no puede exceder 255 caracteres'),
  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
});

async function contactHandler(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos. Verifica los campos e inténtalo de nuevo.' },
        { status: 400 }
      );
    }

    // En un escenario real, esto enviaría un correo o guardaría en la base de datos.
    // Como la base de datos está en Hostinger y no tenemos un servicio de correo configurado:
    console.log('Nuevo mensaje de contacto recibido:', parsed.data);

    return NextResponse.json(
      { success: true, message: 'Mensaje recibido correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(contactHandler, apiLimiter);
