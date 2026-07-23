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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    async function fetchServices() {
      try {
        const response = await fetch('/api/services', { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch {
        console.warn('Usando catálogo local de respaldo.');
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="section-label">
            <Sparkles size={14} />
            Servicios Certificados
          </span>
          <h1>
            Nuestro Catálogo de <span className="text-gradient">Servicios</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Soluciones sanitarias y técnicas profesionales adaptadas a restaurantes, empresas, oficinas y hogares.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-[var(--accent)] animate-spin mb-4" />
            <p className="text-[var(--text-muted)]">Cargando catálogo...</p>
          </div>
        ) : (
          <div className="card-grid-3 stagger-children">
            {services.map((service, index) => (
              <div key={service.id} className="card flex flex-col p-0 overflow-hidden">
                <div className="h-48 relative overflow-hidden bg-[var(--bg-tertiary)]">
                  <Image
                    src={index % 2 === 0 ? "/img/services_v1.png" : "/img/service_rodent_v1.png"}
                    alt={service.name}
                    fill
                    style={{objectFit: "cover"}}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="badge badge-accent">
                      <Shield size={10} className="inline mr-1" />
                      Certificado
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                    {service.description || 'Tratamiento profesional adaptado a la normatividad sanitaria de Bogotá.'}
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--text-muted)]">Precio base estimado</span>
                    <span className="text-xl font-bold text-[var(--accent)]">
                      ${service.basePrice.toLocaleString('es-CO')}
                    </span>
                  </div>
                  <Link
                    href={`/calculator?serviceId=${service.id}&name=${encodeURIComponent(service.name)}&price=${service.basePrice}`}
                    className="btn btn-primary w-full mt-4 justify-center"
                  >
                    Agendar Cotización
                    <ArrowRight size={16} />
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
