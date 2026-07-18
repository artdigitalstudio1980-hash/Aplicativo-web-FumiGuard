'use client';

import { Star, MapPin, Quote } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  // Iniciales que se muestran en el avatar circular
  initials: string;
  // Color de fondo del avatar (placeholder hasta tener foto real)
  avatarColor: string;
  // Barrio/localidad de Bogotá (para dar contexto local)
  location: string;
  rating: number;
  text: string;
  // Tipo de servicio contratado (para dar credibilidad)
  service: string;
  // Fecha relativa, p. ej. "hace 2 semanas"
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
  /** Mostrar header de la sección (default true). Poner false cuando se usa en página propia. */
  showHeader?: boolean;
  /** Limitar cantidad de testimonios (default: todos). */
  limit?: number;
  /** Variante visual: 'light' (default) o 'dark' para fondos oscuros. */
  variant?: 'light' | 'dark';
}

export default function TestimonialsSection({
  showHeader = true,
  limit,
  variant = 'light',
}: TestimonialsSectionProps) {
  const list = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;

  const isDark = variant === 'dark';
  const bgClass = isDark ? 'bg-slate-950' : 'bg-white';
  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const subtitleClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardClass = isDark
    ? 'bg-slate-900/60 border border-slate-800 backdrop-blur-md'
    : 'bg-slate-50 border border-slate-100';
  const textClass = isDark ? 'text-slate-300' : 'text-slate-700';
  const mutedClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const linkClass = isDark ? 'text-emerald-400' : 'text-emerald-600';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container">
        {showHeader && (
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
              <Star size={14} fill="currentColor" />
              Testimonios reales
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${titleClass} mb-4`}>
              Lo que dicen nuestros clientes
            </h2>
            <p className={`text-lg ${subtitleClass} max-w-2xl mx-auto`}>
              Más de 5.000 hogares y empresas en Bogotá han confiado en FUMIGUARD.
              Estas son algunas de sus historias.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {list.map((t) => (
            <article
              key={t.id}
              className={`${cardClass} p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative`}
            >
              <Quote
                size={32}
                className={`absolute top-4 right-4 ${isDark ? 'text-emerald-500/20' : 'text-emerald-500/15'}`}
              />

              {/* Estrellas */}
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < t.rating ? 'currentColor' : 'none'}
                    strokeWidth={i < t.rating ? 0 : 1.5}
                  />
                ))}
              </div>

              {/* Texto */}
              <p className={`${textClass} leading-relaxed mb-6 italic`}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Servicio */}
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5 ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {t.service}
              </span>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-200/30">
                <div
                  className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${titleClass}`}>{t.name}</p>
                  <div className={`flex items-center gap-2 text-xs ${mutedClass} mt-0.5`}>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
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
            <Link
              href="/testimonials"
              className={`${linkClass} font-bold inline-flex items-center gap-2 hover:underline`}
            >
              Ver todos los testimonios
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
