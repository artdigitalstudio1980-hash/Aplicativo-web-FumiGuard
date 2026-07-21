import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import nodemailer from 'nodemailer';
import { verifyToken } from '../../../../lib/verifyAdmin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const confirmOrderSchema = z.object({
  orderId: z.string().uuid('ID de orden inválido'),
});

export async function POST(req: NextRequest) {
  const token = cookies().get('token')?.value;
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = confirmOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { orderId } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }
    });

    if (!order || order.userId !== payload.userId) {
      return NextResponse.json({ error: 'Orden no encontrada o no autorizada' }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED', paymentStatus: 'PAID' }
    });

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
      console.log(`Email de confirmación enviado a ${order.user.email} para la orden ${orderId}`);
    } catch (emailErr) {
      console.error('Error al enviar email de confirmación:', emailErr);
    }

    return NextResponse.json({ message: 'Pago confirmado y ticket generado', order: updatedOrder });
  } catch (error) {
    console.error('Confirm Order Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
