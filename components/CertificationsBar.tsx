'use client';

import { Award, ShieldCheck, FileCheck2, BadgeCheck, Stethoscope } from 'lucide-react';

interface Certification {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  // Para reemplazar luego con logos reales
  badgeColor: string;
}

const CERTS: Certification[] = [
  {
    id: 1,
    name: 'Registro INVIMA',
    description: 'Productos y procedimientos avalados por el Instituto Nacional de Vigilancia de Medicamentos y Alimentos.',
    icon: <Stethoscope size={28} />,
    badgeColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    name: 'Cámara de Comercio',
    description: 'Empresa legalmente constituida y matriculada en la Cámara de Comercio de Bogotá.',
    icon: <FileCheck2 size={28} />,
    badgeColor: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    name: 'Certificación SST',
    description: 'Cumplimiento de normas de Seguridad y Salud en el Trabajo para nuestro personal y clientes.',
    icon: <ShieldCheck size={28} />,
    badgeColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 4,
    name: 'Técnicos Certificados',
    description: 'Personal con formación técnica en control de plagas y manejo seguro de biocidas.',
    icon: <BadgeCheck size={28} />,
    badgeColor: 'from-purple-500 to-fuchsia-600',
  },
  {
    id: 5,
    name: 'Garantía Escrita',
    description: 'Todos nuestros servicios incluyen certificado de fumigación con validez legal.',
    icon: <Award size={28} />,
    badgeColor: 'from-rose-500 to-pink-600',
  },
];

export default function CertificationsBar() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50/40 border-y border-slate-200">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
            Respaldo profesional
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Certificaciones que nos avalan
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Cumplimos con todas las regulaciones colombianas para que tu hogar o
            empresa estén en manos seguras.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERTS.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center border border-slate-100 group"
            >
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${c.badgeColor} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
              >
                {c.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{c.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 italic">
          Las certificaciones mostradas son ejemplos representativos del sector.
          Reemplazar con los registros reales de la empresa.
        </p>
      </div>
    </section>
  );
}
