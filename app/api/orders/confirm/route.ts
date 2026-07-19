import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let userId;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string; userId: string };
    userId = payload.userId;
  } catch {
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

    // Envío de correo usando Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(updatedOrder.totalPrice);
      
      const mailOptions = {
        from: `"FUMIGUARD" <${process.env.SMTP_USER}>`,
        to: order.user.email,
        subject: `Confirmación de Pago - Orden #${updatedOrder.id.split('-')[0]}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h1 style="color: #059669; text-align: center; margin-bottom: 24px;">FUMIGUARD</h1>
            <h2 style="color: #0f172a;">¡Pago Confirmado!</h2>
            <p style="color: #334155; line-height: 1.6;">Hola <strong>${order.user.name}</strong>, hemos registrado tu notificación de pago. Tu orden está en proceso de verificación final y ha sido agendada.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #f1f5f9;">
              <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Detalles de la Orden</h3>
              <table style="width: 100%; color: #334155; border-collapse: collapse;">
                <tr><td style="padding: 8px 0;"><strong>Orden:</strong></td><td style="text-align: right;">#${updatedOrder.id.split('-')[0]}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Servicio:</strong></td><td style="text-align: right;">${updatedOrder.plagueType}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Inmueble:</strong></td><td style="text-align: right;">${updatedOrder.propertyType} (${updatedOrder.areaSize} m²)</td></tr>
                <tr><td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #059669; border-top: 1px solid #e2e8f0; margin-top: 8px;">Total:</td><td style="text-align: right; font-size: 18px; font-weight: bold; color: #059669; border-top: 1px solid #e2e8f0; margin-top: 8px;">${formattedPrice}</td></tr>
              </table>
            </div>
            
            <p style="color: #334155; line-height: 1.6;">Nuestro equipo verificará el comprobante enviado por WhatsApp. Si todo está correcto, el técnico se comunicará contigo pronto para coordinar la visita.</p>
            
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="font-size: 12px; color: #64748b;">FUMIGUARD - Bogotá, Colombia</p>
              <p style="font-size: 11px; color: #94a3b8;">Este es un mensaje automático, por favor no respondas a este correo.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Email Success] Factura enviada a ${order.user.email} para la orden ${orderId}`);
    } catch (emailErr) {
      console.error('[Email Error] Error al enviar la factura:', emailErr);
    }

    return NextResponse.json({ message: 'Pago confirmado y ticket generado', order: updatedOrder });
  } catch (error) {
    console.error('Confirm Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
