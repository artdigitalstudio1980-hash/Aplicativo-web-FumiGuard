'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: '¿Cuánto tiempo tarda una fumigación completa?',
    answer: 'Una fumigación residencial típica tarda entre 45 minutos y 2 horas, dependiendo de los metros cuadrados y el tipo de plaga. Para servicios comerciales o industriales, el tiempo se determina tras la inspección inicial gratuita.',
  },
  {
    id: 2,
    question: '¿Es seguro para mascotas y niños?',
    answer: 'Sí. Usamos productos de baja toxicidad aprobados por el INVIMA. Sin embargo, recomendamos mantener mascotas y niños fuera del área tratada durante al menos 4 horas después del servicio, y ventilar bien los espacios antes de reingresar.',
  },
  {
    id: 3,
    question: '¿Cuánto dura el efecto del tratamiento?',
    answer: 'Depende de la plaga. Para cucarachas y hormigas, el efecto dura entre 3 y 6 meses. Para termitas, hasta 5 años con barrera química. Para roedores, nuestros planes trimestrales mantienen el control de forma continua.',
  },
  {
    id: 4,
    question: '¿Necesito prepararme antes de la visita?',
    answer: 'Sí. Te enviamos una guía completa al confirmar el servicio, pero en resumen: despejar las zonas a tratar, cubrir alimentos y utensilios de cocina, y facilitar el acceso a las áreas afectadas. Para casos especiales (termitas) se requiere preparación adicional.',
  },
  {
    id: 5,
    question: '¿Qué incluye la garantía escrita?',
    answer: 'Si la plaga reaparece dentro del período de garantía (varía según el servicio), regresamos a hacer un refuerzo sin costo adicional. La garantía va de 30 días a 12 meses dependiendo del tipo de tratamiento.',
  },
  {
    id: 6,
    question: '¿Atienden en qué zonas de Bogotá?',
    answer: 'Cubrimos toda la ciudad de Bogotá y municipios cercanos como Chía, Cota, Cajicá, Zipaquirá, Soacha, Mosquera y Madrid. Para zonas más alejadas, consulta disponibilidad.',
  },
  {
    id: 7,
    question: '¿Emiten certificado de fumigación?',
    answer: 'Sí. Después de cada servicio emitimos un certificado de fumigación con validez legal, ideal para trámites ante autoridades de salud, visitas de sanidad o requisitos de tu empresa.',
  },
  {
    id: 8,
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencias bancarias, Nequi, Daviplata, Bre-B, tarjeta de crédito y débito a través de Stripe. Para empresas también facturamos electrónicamente.',
  },
];

interface FAQSectionProps {
  /** Mostrar el header de la sección (default true). */
  showHeader?: boolean;
  /** Limitar cantidad de preguntas (default: todas). */
  limit?: number;
  /** Variante visual: light (default) o dark. */
  variant?: 'light' | 'dark';
}

export default function FAQSection({
  showHeader = true,
  limit,
  variant = 'light',
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(1);

  const list = limit ? FAQS.slice(0, limit) : FAQS;
  const isDark = variant === 'dark';
  const bgClass = isDark ? 'bg-slate-900' : 'bg-slate-50';
  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const subtitleClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardClass = isDark
    ? 'bg-slate-800/60 border border-slate-700'
    : 'bg-white border border-slate-200';
  const questionClass = isDark ? 'text-white' : 'text-slate-900';
  const answerClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const contactClass = isDark
    ? 'bg-slate-800/40 border border-slate-700'
    : 'bg-emerald-50/60 border border-emerald-100';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle size={14} />
              Preguntas frecuentes
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${titleClass} mb-4`}>
              Resolvemos tus dudas
            </h2>
            <p className={`text-lg ${subtitleClass} max-w-2xl mx-auto`}>
              Las preguntas que más nos hacen nuestros clientes. Si tienes otra
              pregunta, escríbenos por WhatsApp.
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-3">
          {list.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`${cardClass} rounded-2xl overflow-hidden transition-all`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-base sm:text-lg ${questionClass}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-500' : 'text-slate-400'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className={`px-5 sm:px-6 pb-5 sm:pb-6 ${answerClass} leading-relaxed`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showHeader && (
          <div className={`mt-12 max-w-3xl mx-auto ${contactClass} rounded-2xl p-6 sm:p-8 text-center`}>
            <h3 className={`text-xl font-bold ${titleClass} mb-2`}>
              ¿Tienes otra pregunta?
            </h3>
            <p className={`${subtitleClass} mb-5`}>
              Estamos disponibles por WhatsApp de lunes a sábado de 7am a 8pm.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700"
            >
              Escríbenos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
