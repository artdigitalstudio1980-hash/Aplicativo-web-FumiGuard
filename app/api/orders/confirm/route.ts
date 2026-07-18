import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let userId;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    userId = payload.userId;
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'ID de orden requerido' }, { status: 400 });
    }

    // Verificar que la orden pertenece al usuario
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }
    });

    if (!order || order.userId !== userId) {
      return NextResponse.json({ error: 'Orden no encontrada o no autorizada' }, { status: 404 });
    }

    // Actualizar estado de la orden a CONFIRMED (Pagado)
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED', paymentStatus: 'PAID' }
    });

    // TODO: Aquí se integraría Nodemailer o Resend para enviar la factura/ticket al correo del cliente
    // sendInvoiceEmail(order.user.email, updatedOrder);
    console.log(`[Email Mock] Enviando factura a ${order.user.email} para la orden ${orderId}`);

    return NextResponse.json({ message: 'Pago confirmado y ticket generado', order: updatedOrder });
  } catch (error) {
    console.error('Confirm Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
