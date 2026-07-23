/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Servicio' | 'Equipo' | 'Antes/Después' | 'Certificación';
  description: string;
  image?: string;
  gradient: string;
  icon: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Fumigación de cucarachas en cocina industrial',
    category: 'Servicio',
    description: 'Tratamiento con gel y aspersión en restaurante de Chapinero. Resultado verificado en 72h.',
    image: '/img/gallery/fumigation-industrial.jpg',
    gradient: 'from-emerald-200 via-emerald-300 to-teal-400',
    icon: '🦟',
  },
  {
    id: 2,
    title: 'Control de roedores en bodega',
    category: 'Servicio',
    description: 'Instalación de cebos de captura segura y sellado de puntos de ingreso en zona industrial.',
    image: '/img/gallery/rodent-control.jpg',
    gradient: 'from-amber-200 via-orange-300 to-red-400',
    icon: '🐀',
  },
  {
    id: 3,
    title: 'Técnico FUMIGUARD con equipo de protección',
    category: 'Equipo',
    description: 'Nuestro personal cuenta con EPP completo y capacitación continua.',
    image: '/img/gallery/technician.jpg',
    gradient: 'from-sky-200 via-blue-300 to-indigo-400',
    icon: '👷',
  },
  {
    id: 4,
    title: 'Lavado y desinfección de tanque de agua',
    category: 'Servicio',
    description: 'Limpieza profunda con certificación sanitaria para conjunto residencial en el norte.',
    image: '/img/gallery/fumigation-residential.jpg',
    gradient: 'from-cyan-200 via-sky-300 to-blue-400',
    icon: '💧',
  },
  {
    id: 5,
    title: 'Antes: vivienda afectada por termitas',
    category: 'Antes/Después',
    description: 'Daño estructural en madera de apartamento en Usaquén antes del tratamiento.',
    image: '/img/gallery/termite-damage.jpg',
    gradient: 'from-rose-200 via-pink-300 to-fuchsia-400',
    icon: '🪵',
  },
  {
    id: 6,
    title: 'Después: estructura tratada y protegida',
    category: 'Antes/Después',
    description: 'Misma zona 30 días después del tratamiento FUMIGUARD con barrera química.',
    gradient: 'from-emerald-300 via-green-400 to-emerald-500',
    icon: '🛡️',
  },
  {
    id: 7,
    title: 'Termonebulización en exteriores',
    category: 'Servicio',
    description: 'Control de mosquitos en zonas comunes de condominio campestre.',
    image: '/img/gallery/fogging.jpg',
    gradient: 'from-yellow-200 via-amber-300 to-orange-400',
    icon: '🌫️',
  },
  {
    id: 8,
    title: 'Certificado sanitario de fumigación',
    category: 'Certificación',
    description: 'Documento válido para autoridades de salud y trámites legales de tu empresa.',
    gradient: 'from-slate-200 via-slate-300 to-slate-400',
    icon: '📄',
  },
];

const CATEGORIES = ['Todos', 'Servicio', 'Equipo', 'Antes/Después', 'Certificación'] as const;
type Category = (typeof CATEGORIES)[number];

export default function ServiceGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === 'Todos'
    ? ITEMS
    : ITEMS.filter((it) => it.category === activeCategory);

  const openLightbox = (item: GalleryItem) => setLightbox(item);
  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const idx = filtered.findIndex((it) => it.id === lightbox.id);
    if (idx < 0) return;
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  }, [lightbox, filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, navigate]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all border"
            style={{
              background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-tertiary)',
              color: activeCategory === cat ? 'white' : 'var(--text-muted)',
              borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => openLightbox(item)}
            className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 text-left"
            aria-label={`Ver ${item.title}`}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-80">
                  {item.icon}
                </div>
                <div className="absolute top-2 right-2 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Demo
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-semibold mb-0.5" style={{ color: 'var(--accent)' }}>
                {item.category}
              </span>
              <h4 className="text-white font-semibold text-sm leading-snug line-clamp-2">
                {item.title}
              </h4>
            </div>
            <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={14} className="text-slate-700" />
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs mt-6 italic" style={{ color: 'var(--text-light)' }}>
        Las imágenes con gradiente son placeholders de demostración.
      </p>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>

          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`aspect-video relative ${lightbox.image ? '' : `bg-gradient-to-br ${lightbox.gradient} flex items-center justify-center text-8xl`}`}>
              {lightbox.image ? (
                <img src={lightbox.image} alt={lightbox.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  {lightbox.icon}
                  <span className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                    Demo
                  </span>
                </>
              )}
            </div>
            <div className="p-6">
              <span className="inline-block text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                {lightbox.category}
              </span>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">{lightbox.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
