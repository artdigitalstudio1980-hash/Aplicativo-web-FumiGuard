import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('=== CREAR USUARIO ADMINISTRADOR ===\n');

  const email = await prompt('Email del admin: ');
  const password = await prompt('Contraseña (mín. 8 caracteres): ');
  const name = await prompt('Nombre completo: ');

  if (!email || !password || password.length < 8 || !name) {
    console.error('Error: Todos los campos son obligatorios. La contraseña debe tener al menos 8 caracteres.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.error(`Error: El email "${email}" ya está registrado.`);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      acceptsOffers: false,
    },
  });

  console.log(`\n✓ Usuario ADMIN creado exitosamente:`);
  console.log(`  ID:    ${admin.id}`);
  console.log(`  Email: ${admin.email}`);
  console.log(`  Name:  ${admin.name}`);
  console.log(`  Role:  ${admin.role}`);

  await prisma.$disconnect();
  rl.close();
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
