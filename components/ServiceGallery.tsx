/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Servicio' | 'Equipo' | 'Antes/Después' | 'Certificación';
  description: string;
  // Cuando lleguen las fotos reales, se reemplaza gradient por `image: '/img/galeria/X.jpg'`
  // y el componente prioriza image sobre gradient.
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
    gradient: 'from-emerald-200 via-emerald-300 to-teal-400',
    icon: '🦟',
  },
  {
    id: 2,
    title: 'Control de roedores en bodega',
    category: 'Servicio',
    description: 'Instalación de cebos de captura segura y sellado de puntos de ingreso en zona industrial.',
    gradient: 'from-amber-200 via-orange-300 to-red-400',
    icon: '🐀',
  },
  {
    id: 3,
    title: 'Técnico FUMIGUARD con equipo de protección',
    category: 'Equipo',
    description: 'Nuestro personal cuenta con EPP completo y capacitación continua.',
    gradient: 'from-sky-200 via-blue-300 to-indigo-400',
    icon: '👷',
  },
  {
    id: 4,
    title: 'Lavado y desinfección de tanque de agua',
    category: 'Servicio',
    description: 'Limpieza profunda con certificación sanitaria para conjunto residencial en el norte.',
    gradient: 'from-cyan-200 via-sky-300 to-blue-400',
    icon: '💧',
  },
  {
    id: 5,
    title: 'Antes: vivienda afectada por termitas',
    category: 'Antes/Después',
    description: 'Daño estructural en madera de apartamento en Usaquén antes del tratamiento.',
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

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const idx = filtered.findIndex((it) => it.id === lightbox.id);
    if (idx < 0) return;
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  };

  return (
    <div className="w-full">
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de galería */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => openLightbox(item)}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
            aria-label={`Ver ${item.title}`}
          >
            {/* Background gradient o imagen real */}
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  Demo
                </div>
              </div>
            )}

            {/* Overlay con info */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
              <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                {item.category}
              </span>
              <h4 className="text-white font-bold text-sm leading-snug line-clamp-2">
                {item.title}
              </h4>
            </div>

            {/* Icono de cámara en hover */}
            <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={16} className="text-slate-700" />
            </div>
          </button>
        ))}
      </div>

      {/* Nota para el equipo */}
      <p className="text-center text-xs text-slate-400 mt-8 italic">
        Las imágenes con gradiente son placeholders de demostración. Reemplazar con
        fotos reales en <code className="bg-slate-100 px-2 py-0.5 rounded">components/ServiceGallery.tsx</code>
      </p>

      {/* Lightbox */}
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
            className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`aspect-video bg-gradient-to-br ${lightbox.gradient} flex items-center justify-center text-9xl relative`}
            >
              {lightbox.icon}
              <span className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                Demo
              </span>
            </div>
            <div className="p-8">
              <span className="inline-block text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
                {lightbox.category}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                {lightbox.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lightbox.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
