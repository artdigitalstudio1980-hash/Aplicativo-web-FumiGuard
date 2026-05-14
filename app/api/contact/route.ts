import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // In a real scenario, this would send an email or save to the database.
    // Since the database is on Hostinger and we don't have a mail service configured:
    console.log('Nuevo mensaje de contacto recibido:', data);

    return NextResponse.json({ success: true, message: 'Mensaje recibido correctamente' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
