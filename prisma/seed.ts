import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando la siembra de la base de datos...');

  // 1. Eliminar servicios existentes para evitar duplicados en desarrollo
  await prisma.service.deleteMany({});

  const services = [
    {
      name: 'Control de Cucarachas',
      description: 'Tratamiento intensivo con gel y aspersión para erradicación total de cucarachas en cocinas y áreas comunes.',
      basePrice: 180000,
    },
    {
      name: 'Control de Roedores',
      description: 'Control poblacional con cebos de última generación y trampas de captura para ratas y ratones.',
      basePrice: 180000,
    },
    {
      name: 'Control de Termitas',
      description: 'Protección estructural para muebles, vigas y propiedades propensas a infestación de termitas.',
      basePrice: 250000,
    },
    {
      name: 'Control de Hormigas',
      description: 'Inhibición de colonias enteras mediante cebos granulados y tratamientos dirigidos a hormigueros.',
      basePrice: 180000,
    },
    {
      name: 'Control de Mosquitos',
      description: 'Termonebulización y nebulización en frío para interiores y áreas exteriores propensas a zancudos.',
      basePrice: 180000,
    },
    {
      name: 'Desinfección Ambiental',
      description: 'Eliminación microbiológica de virus, bacterias y hongos mediante desinfectantes de amonio cuaternario.',
      basePrice: 180000,
    },
    {
      name: 'Lavado de Tanques',
      description: 'Limpieza, lavado a presión y desinfección profunda de tanques de reserva de agua potable con certificación.',
      basePrice: 200000,
    },
  ];

  for (const service of services) {
    const created = await prisma.service.create({
      data: service,
    });
    console.log(`Servicio creado: ${created.name} (${created.id})`);
  }

  console.log('Siembra completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error durante la siembra:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
