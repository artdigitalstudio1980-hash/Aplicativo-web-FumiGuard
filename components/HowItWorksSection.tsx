'use client';

import { Calculator, ClipboardCheck, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Cotiza en línea',
    description: 'Usa nuestra calculadora para conocer el precio estimado según el tipo de plaga, los metros cuadrados y el tipo de propiedad.',
    icon: <Calculator size={28} />,
  },
  {
    id: 2,
    title: 'Inspección gratuita',
    description: 'Agendamos una visita técnica sin costo. Evaluamos el nivel de infestación y te damos un plan personalizado con precio cerrado.',
    icon: <ClipboardCheck size={28} />,
  },
  {
    id: 3,
    title: 'Servicio programado',
    description: 'Confirmamos fecha y hora. Nuestros técnicos llegan puntuales con todo el equipo necesario y te explican el procedimiento.',
    icon: <Calendar size={28} />,
  },
  {
    id: 4,
    title: 'Garantía y seguimiento',
    description: 'Recibe tu certificado de fumigación y la garantía escrita. Hacemos seguimiento post-servicio sin costo adicional.',
    icon: <ShieldCheck size={28} />,
  },
];

interface HowItWorksSectionProps {
  showHeader?: boolean;
  variant?: 'light' | 'dark';
}

export default function HowItWorksSection({
  showHeader = true,
  variant = 'light',
}: HowItWorksSectionProps) {
  const isDark = variant === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-[var(--text)]' : 'bg-white'}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-12">
            <span className="section-label">Proceso transparente</span>
            <h2 className={isDark ? 'text-white' : ''}>¿Cómo funciona?</h2>
            <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-secondary)]'}`}>
              En 4 pasos simples te deshaces de las plagas. Sin sorpresas, sin costos ocultos.
            </p>
          </div>
        )}

        <div className="steps-grid">
          {STEPS.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{String(step.id).padStart(2, '0')}</div>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] mb-4">
                {step.icon}
              </div>
              <h3 className={isDark ? 'text-white' : ''}>{step.title}</h3>
              <p className="text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {showHeader && (
          <div className="text-center mt-10">
            <Link
              href="/calculator"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Empezar mi cotización
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
