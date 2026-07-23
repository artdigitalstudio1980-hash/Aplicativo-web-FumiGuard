'use client';

import { Award, ShieldCheck, FileCheck2, BadgeCheck, Stethoscope } from 'lucide-react';

interface Certification {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const CERTS: Certification[] = [
  {
    id: 1,
    name: 'Registro INVIMA',
    description: 'Productos y procedimientos avalados por el Instituto Nacional de Vigilancia de Medicamentos y Alimentos.',
    icon: <Stethoscope size={24} />,
  },
  {
    id: 2,
    name: 'Cámara de Comercio',
    description: 'Empresa legalmente constituida y matriculada en la Cámara de Comercio de Bogotá.',
    icon: <FileCheck2 size={24} />,
  },
  {
    id: 3,
    name: 'Certificación SST',
    description: 'Cumplimiento de normas de Seguridad y Salud en el Trabajo para nuestro personal y clientes.',
    icon: <ShieldCheck size={24} />,
  },
  {
    id: 4,
    name: 'Técnicos Certificados',
    description: 'Personal con formación técnica en control de plagas y manejo seguro de biocidas.',
    icon: <BadgeCheck size={24} />,
  },
  {
    id: 5,
    name: 'Garantía Escrita',
    description: 'Todos nuestros servicios incluyen certificado de fumigación con validez legal.',
    icon: <Award size={24} />,
  },
];

export default function CertificationsBar() {
  return (
    <section className="py-20 bg-white border-y border-[var(--border-light)]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">Respaldo profesional</span>
          <h2>Certificaciones que nos avalan</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Cumplimos con todas las regulaciones colombianas para que tu hogar o
            empresa estén en manos seguras.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERTS.map((c) => (
            <div key={c.id} className="cert-card group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                {c.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{c.name}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--text-light)] mt-6 italic">
          Reemplazar con los registros reales de la empresa.
        </p>
      </div>
    </section>
  );
}
