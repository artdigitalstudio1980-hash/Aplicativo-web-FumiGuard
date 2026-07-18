'use client';

import { Calculator, ClipboardCheck, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Cotiza en línea',
    description: 'Usa nuestra calculadora para conocer el precio estimado según el tipo de plaga, los metros cuadrados de tu inmueble y el tipo de propiedad. Sin compromiso.',
    icon: <Calculator size={32} />,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: 'Inspección gratuita',
    description: 'Si la cotización te interesa, agendamos una visita técnica sin costo. Evaluamos el nivel de infestación y te damos un plan personalizado con precio cerrado.',
    icon: <ClipboardCheck size={32} />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    title: 'Servicio programado',
    description: 'Confirmamos fecha y hora según tu disponibilidad. Nuestros técnicos llegan puntuales con todo el equipo necesario. Te explicamos el procedimiento antes de empezar.',
    icon: <Calendar size={32} />,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 4,
    title: 'Garantía y seguimiento',
    description: 'Recibe tu certificado de fumigación y la garantía escrita. Hacemos seguimiento post-servicio y, si la plaga reaparece dentro del período de garantía, regresamos sin costo.',
    icon: <ShieldCheck size={32} />,
    color: 'from-rose-500 to-pink-600',
  },
];

interface HowItWorksSectionProps {
  /** Mostrar header de la sección (default true). */
  showHeader?: boolean;
  /** Variante visual. */
  variant?: 'light' | 'dark';
}

export default function HowItWorksSection({
  showHeader = true,
  variant = 'light',
}: HowItWorksSectionProps) {
  const isDark = variant === 'dark';
  const bgClass = isDark ? 'bg-slate-950' : 'bg-white';
  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const subtitleClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardClass = isDark
    ? 'bg-slate-900/60 border border-slate-800'
    : 'bg-slate-50 border border-slate-100';
  const stepTitleClass = isDark ? 'text-white' : 'text-slate-900';
  const stepTextClass = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
              Proceso transparente
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${titleClass} mb-4`}>
              ¿Cómo funciona?
            </h2>
            <p className={`text-lg ${subtitleClass} max-w-2xl mx-auto`}>
              En 4 pasos simples te deshaces de las plagas. Sin sorpresas, sin
              costos ocultos, con garantía por escrito.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Línea conectora (solo desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-emerald-200 via-blue-200 via-amber-200 to-rose-200 -z-0" />

          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`${cardClass} rounded-2xl p-7 relative z-10 hover:-translate-y-1 transition-all`}
            >
              {/* Número + Icono */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {step.icon}
                </div>
                <span className="text-4xl font-extrabold text-slate-200">
                  {String(step.id).padStart(2, '0')}
                </span>
              </div>

              <h3 className={`text-xl font-extrabold ${stepTitleClass} mb-3`}>
                {step.title}
              </h3>
              <p className={`${stepTextClass} text-sm leading-relaxed`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {showHeader && (
          <div className="text-center mt-12">
            <Link
              href="/calculator"
              className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700"
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
