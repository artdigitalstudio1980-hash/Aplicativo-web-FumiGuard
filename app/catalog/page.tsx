'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
}

const STATIC_FALLBACK_SERVICES: Service[] = [
  { id: '1', name: 'Control de Cucarachas', description: 'Tratamiento intensivo con gel y aspersión para erradicación total en cocinas y áreas comunes.', basePrice: 180000 },
  { id: '2', name: 'Control de Roedores', description: 'Control poblacional con cebos de última generación y trampas de captura.', basePrice: 180000 },
  { id: '3', name: 'Control de Termitas', description: 'Protección estructural para muebles, vigas y propiedades propensas a infestación.', basePrice: 250000 },
  { id: '4', name: 'Control de Hormigas', description: 'Inhibición de colonias enteras mediante cebos granulados y tratamientos directos.', basePrice: 180000 },
  { id: '5', name: 'Control de Mosquitos', description: 'Termonebulización y nebulización en frío para interiores y áreas exteriores.', basePrice: 180000 },
  { id: '6', name: 'Desinfección Ambiental', description: 'Eliminación microbiológica de virus, bacterias y hongos con amonio cuaternario.', basePrice: 180000 },
  { id: '7', name: 'Lavado de Tanques', description: 'Limpieza, lavado a presión y desinfección profunda de tanques de reserva de agua.', basePrice: 200000 },
];

export default function Catalog() {
  const [services, setServices] = useState<Service[]>(STATIC_FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch (error) {
        console.warn('No se pudo conectar al API de servicios, usando catálogo local de respaldo.', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles size={14} />
            Control de Plagas Certificado en Bogotá
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Nuestro Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Servicios</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Soluciones sanitarias y técnicas profesionales adaptadas a locales de comida rápida, restaurantes, empresas, oficinas y hogares.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-400">Cargando catálogo certificado de Fumiguard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="group relative border border-slate-800 bg-slate-900/50 hover:bg-slate-950/40 rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-md shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/40 flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 w-full relative overflow-hidden">
                    <Image 
                      src={index % 2 === 0 ? "/img/services_v1.png" : "/img/service_rodent_v1.png"} 
                      alt={service.name} 
                      fill
                      style={{objectFit: "cover"}}
                      className="group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                        <Shield size={12} className="inline mr-1" />
                        Certificado
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {service.description || 'Tratamiento profesional adaptado a la normatividad sanitaria de Bogotá.'}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <div className="flex justify-between items-baseline mb-6 border-t border-slate-800/80 pt-6">
                    <span className="text-sm text-slate-500">Precio base estimado</span>
                    <span className="text-2xl font-extrabold text-white">
                      ${service.basePrice.toLocaleString('es-CO')}
                      <span className="text-xs font-normal text-slate-400 block text-right mt-1">COP</span>
                    </span>
                  </div>
                  
                  <Link 
                    href={`/calculator?serviceId=${service.id}&name=${encodeURIComponent(service.name)}&price=${service.basePrice}`} 
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 group-hover:shadow-emerald-500/30"
                  >
                    Agendar Cotización
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

