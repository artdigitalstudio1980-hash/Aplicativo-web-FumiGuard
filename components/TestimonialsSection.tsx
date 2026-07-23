'use client';

import { Star, MapPin, Quote } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  when: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'María Camila Ortega',
    initials: 'MC',
    avatarColor: 'bg-rose-400',
    location: 'Chapinero, Bogotá',
    rating: 5,
    text: 'Llevábamos meses con hormigas en la cocina del apartamento. El técnico llegó súper puntual, explicó todo el procedimiento y nos dejó recomendaciones para prevenir. Volvió a los 15 días para verificar y no hemos vuelto a ver una sola hormiga. Vale cada peso.',
    service: 'Control de Hormigas',
    when: 'hace 2 semanas',
  },
  {
    id: 2,
    name: 'Carlos Andrés Mendoza',
    initials: 'CM',
    avatarColor: 'bg-blue-400',
    location: 'Usaquén, Bogotá',
    rating: 5,
    text: 'Contraté el control de termitas porque noté unos daños en la madera de la puerta del balcón. Me hicieron una inspección gratis primero, me mandaron el certificado por correo y el trabajo quedó impecable. Muy profesionales y serios.',
    service: 'Control de Termitas',
    when: 'hace 1 mes',
  },
  {
    id: 3,
    name: 'Laura Beatriz Restrepo',
    initials: 'LR',
    avatarColor: 'bg-emerald-400',
    location: 'Cedritos, Bogotá',
    rating: 5,
    text: 'Restaurante familiar en Cedritos, teníamos un problema serio de cucarachas en la zona de la cocina. Llegaron un domingo (cosa que no esperaba), hicieron el tratamiento completo y al día siguiente el lugar estaba impecable. El certificado nos sirvió para la visita de sanidad.',
    service: 'Control de Cucarachas',
    when: 'hace 3 semanas',
  },
  {
    id: 4,
    name: 'Andrés Felipe Quintero',
    initials: 'AQ',
    avatarColor: 'bg-purple-400',
    location: 'Zona Rosa, Bogotá',
    rating: 5,
    text: 'Mi oficina en la 85 tenía roedores y la verdad me daba miedo que fuera un tema de salud para el equipo. FUMIGUARD hizo un plan trimestral, sellaron todos los puntos de ingreso y nos dejaron un informe detallado. Cero roedores desde hace 4 meses.',
    service: 'Control de Roedores',
    when: 'hace 2 meses',
  },
  {
    id: 5,
    name: 'Diana Patricia Salazar',
    initials: 'DS',
    avatarColor: 'bg-amber-400',
    location: 'Norte, Bogotá',
    rating: 5,
    text: 'Pedí el lavado de tanques para el conjunto residencial. Me gustó mucho que avisaron al día siguiente con el certificado de potabilidad. Los recomiendo cerrados, soniedad de principio a fin.',
    service: 'Lavado de Tanques',
    when: 'hace 5 días',
  },
];

interface TestimonialsSectionProps {
  showHeader?: boolean;
  limit?: number;
  variant?: 'light' | 'dark';
}

export default function TestimonialsSection({
  showHeader = true,
  limit,
  variant = 'light',
}: TestimonialsSectionProps) {
  const list = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;

  const isDark = variant === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-[var(--text)]' : 'bg-[var(--bg-secondary)]'}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-12">
            <span className="section-label">
              <Star size={14} />
              Testimonios reales
            </span>
            <h2 className={isDark ? 'text-white' : ''}>Lo que dicen nuestros clientes</h2>
            <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-secondary)]'}`}>
              Más de 5.000 hogares y empresas en Bogotá han confiado en FUMIGUARD.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {list.map((t) => (
            <article
              key={t.id}
              className={`testimonial-card ${
                isDark
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)]'
                  : ''
              }`}
            >
              <Quote size={24} className={`absolute top-4 right-4 ${isDark ? 'text-white/5' : 'text-[var(--text-light)]'}`} />

              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < t.rating ? 'currentColor' : 'none'} strokeWidth={i < t.rating ? 0 : 1.5} />
                ))}
              </div>

              <p className={`text-sm leading-relaxed mb-4 italic ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-secondary)]'}`}>
                &ldquo;{t.text}&rdquo;
              </p>

              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                {t.service}
              </span>

              <div className="flex items-center gap-3 pt-3" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border-light)' }}>
                <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[var(--text)]'}`}>{t.name}</p>
                  <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-[var(--text-light)]' : 'text-[var(--text-muted)]'}`}>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {t.location}
                    </span>
                    <span>·</span>
                    <span>{t.when}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showHeader && (
          <div className="text-center">
            <Link href="/testimonials" className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              Ver todos los testimonios
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
