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
    answer: 'Sí. Te enviamos una guía completa al confirmar el servicio, pero en resumen: despejar las zonas a tratar, cubrir alimentos y utensilios de cocina, y facilitar el acceso a las áreas afectadas.',
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
  showHeader?: boolean;
  limit?: number;
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

  return (
    <section className={`py-20 ${isDark ? 'bg-[var(--text)]' : 'bg-[var(--bg-secondary)]'}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-12">
            <span className="section-label">
              <HelpCircle size={14} />
              Preguntas frecuentes
            </span>
            <h2 className={isDark ? 'text-white' : ''}>Resolvemos tus dudas</h2>
            <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-secondary)]'}`}>
              Las preguntas que más nos hacen nuestros clientes.
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-2">
          {list.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl overflow-hidden transition-all ${
                  isDark
                    ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]'
                    : 'bg-white border border-[var(--border)]'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-[var(--text)]'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    } ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-muted)]'}`}
                    style={isOpen ? { color: 'var(--accent)' } : undefined}
                  />
                </button>
                {isOpen && (
                  <div className={`px-5 pb-5 leading-relaxed text-sm ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-secondary)]'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showHeader && (
          <div className={`mt-10 max-w-3xl mx-auto p-6 sm:p-8 text-center rounded-xl ${
            isDark
              ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]'
              : 'bg-white border border-[var(--border)]'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-[var(--text)]'}`}>
              ¿Tienes otra pregunta?
            </h3>
            <p className={`text-sm mb-5 ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-muted)]'}`}>
              Estamos disponibles por WhatsApp de lunes a sábado de 7am a 8pm.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Escríbenos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
