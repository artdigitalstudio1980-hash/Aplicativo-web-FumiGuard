import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin';

if (!email || !password || password.length < 8) {
  console.error('Usage: npx ts-node prisma/create-admin.ts <email> <password> [name]');
  console.error('Password must be at least 8 characters');
  process.exit(1);
}

async function main() {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.error(`Error: El email "${email}" ya existe.`);
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

  console.log(`✓ ADMIN creado: ${admin.email} (${admin.role})`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
