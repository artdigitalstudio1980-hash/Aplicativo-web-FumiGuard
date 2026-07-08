'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Calculator as CalcIcon, CheckCircle, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
}

const STATIC_FALLBACK_SERVICES: Service[] = [
  { id: '1', name: 'Control de Cucarachas', description: 'Tratamiento intensivo con gel y aspersión para erradicación total.', basePrice: 180000 },
  { id: '2', name: 'Control de Roedores', description: 'Control poblacional con cebos de última generación.', basePrice: 180000 },
  { id: '3', name: 'Control de Termitas', description: 'Protección estructural para muebles y propiedades.', basePrice: 250000 },
  { id: '4', name: 'Control de Hormigas', description: 'Inhibición de colonias enteras con cebos.', basePrice: 180000 },
  { id: '5', name: 'Control de Mosquitos', description: 'Termonebulización para exteriores.', basePrice: 180000 },
  { id: '6', name: 'Desinfección Ambiental', description: 'Eliminación microbiológica de virus y bacterias.', basePrice: 180000 },
  { id: '7', name: 'Lavado de Tanques', description: 'Limpieza y desinfección de tanques de agua.', basePrice: 200000 },
];

function CalculatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Cargar parámetros iniciales desde la URL
  const queryServiceId = searchParams.get('serviceId');

  const [services, setServices] = useState<Service[]>(STATIC_FALLBACK_SERVICES);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [m2, setM2] = useState(50);
  const [propertyType, setPropertyType] = useState('Residencial');
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 1. Obtener lista de servicios desde el API
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
            
            // Establecer servicio inicial si viene de query params
            if (queryServiceId) {
              const matched = data.find(s => s.id === queryServiceId);
              if (matched) setSelectedService(matched);
            } else {
              setSelectedService(data[0]);
            }
          }
        }
      } catch (err) {
        console.warn('No se pudo conectar al API, usando servicios locales de respaldo.', err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, [queryServiceId]);

  // Cargar cotización pendiente de localStorage si existe (flujo post-login)
  useEffect(() => {
    const pendingQuoteStr = localStorage.getItem('pending_quote');
    if (pendingQuoteStr) {
      try {
        const pendingQuote = JSON.parse(pendingQuoteStr);
        if (pendingQuote.areaSize) setM2(pendingQuote.areaSize);
        if (pendingQuote.propertyType) setPropertyType(pendingQuote.propertyType);
        
        // Intentar emparejar el servicio que estaba pendiente
        if (pendingQuote.serviceId && services.length > 0) {
          const matched = services.find(s => s.id === pendingQuote.serviceId);
          if (matched) setSelectedService(matched);
        }
        
        localStorage.removeItem('pending_quote');
      } catch (e) {
        console.error('Error al recuperar la cotización pendiente:', e);
      }
    }
  }, [services]);

  // Si no se cargó el servicio inicial por API, buscarlo en la lista por defecto
  useEffect(() => {
    if (!selectedService && services.length > 0) {
      if (queryServiceId) {
        const matched = services.find(s => s.id === queryServiceId);
        setSelectedService(matched || services[0]);
      } else {
        setSelectedService(services[0]);
      }
    }
  }, [services, queryServiceId, selectedService]);


  const calculatePrice = () => {
    if (!selectedService) return 180000;
    const basePrice = selectedService.basePrice;
    
    // Recargo por tamaño de área (similar a la lógica del backend)
    let calculatedPrice = basePrice;
    if (m2 > 100) {
      calculatedPrice += (m2 - 100) * 1000; 
    }
    
    // Multiplicador según tipo de inmueble
    const typeMultiplier = propertyType === 'Comercial' ? 1.2 : (propertyType === 'Industrial' ? 1.5 : 1.0);
    
    return Math.max(Math.round(calculatedPrice * typeMultiplier), 180000);
  };

  const handleBookOrder = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    setError('');

    try {
      const orderPayload = {
        serviceId: selectedService.id,
        plagueType: selectedService.name,
        areaSize: m2,
        propertyType,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (response.status === 401) {
        // Redirigir a iniciar sesión y guardar la cotización para agendar automáticamente
        localStorage.setItem('pending_quote', JSON.stringify({
          ...orderPayload,
          serviceName: selectedService.name,
          totalPrice: calculatePrice()
        }));
        router.push(`/login?redirect=/calculator`);
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Error al agendar el servicio');
      }

      const order = await response.json();
      
      // Redirigir al flujo de pago
      router.push(`/payment?service=${encodeURIComponent(selectedService.name)}&price=${order.totalPrice}&orderId=${order.id}`);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error al conectar con el servidor.');
      } else {
        setError('Error al conectar con el servidor.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles size={14} />
          Cotización Inmediata y Transparente
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Precio</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Calcula el costo del servicio sanitario en Bogotá según los metros cuadrados de tu inmueble.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl text-sm text-center font-medium mb-8 flex items-center justify-center gap-2 backdrop-blur-md">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="bg-slate-900/60 border border-slate-800 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Selección de Servicio */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-4">Servicio de Fumigación</label>
            {loadingServices ? (
              <div className="flex items-center gap-2 text-slate-400 py-3">
                <Loader2 size={16} className="animate-spin text-emerald-500" />
                <span>Cargando catálogo...</span>
              </div>
            ) : (
              <select
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const matched = services.find(s => s.id === e.target.value);
                  if (matched) setSelectedService(matched);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all cursor-pointer"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} (Base: ${service.basePrice.toLocaleString('es-CO')})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Medición de Área */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-4 flex justify-between">
              <span>Área Aproximada del Inmueble</span>
              <span className="text-emerald-400 font-bold">{m2} m²</span>
            </label>
            <input 
              type="range" 
              min="20" 
              max="1000" 
              value={m2}
              onChange={(e) => setM2(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
              <span>20 m²</span>
              <span>500 m²</span>
              <span>1000 m²</span>
            </div>
          </div>

          {/* Tipo de Inmueble */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-4">Tipo de Inmueble / Propiedad</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Residencial', 'Comercial', 'Industrial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`px-4 py-3.5 rounded-2xl text-center font-bold text-sm transition-all border-2 ${
                    propertyType === type 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen y Cotización */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 opacity-60">
              <CalcIcon size={20} className="text-emerald-400" />
              <span className="text-xs font-bold tracking-widest uppercase font-mono">Valor Total de Cotización</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">
              ${calculatePrice().toLocaleString('es-CO')}
              <span className="text-xs font-normal text-slate-400 block mt-2">COP (IVA e Insumos Incluidos)</span>
            </div>
            
            <ul className="space-y-4 mt-8 border-t border-slate-850 pt-6">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                Certificado de Sanidad Gubernamental
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                Fórmulas de uso seguro (Norma Técnica)
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                Garantía por escrito del servicio
              </li>
            </ul>
          </div>

          <button 
            onClick={handleBookOrder}
            disabled={submitting || !selectedService}
            className="flex items-center justify-center gap-2 w-full py-4 mt-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Agendando...
              </>
            ) : (
              <>
                Agendar Ahora
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PriceCalculator() {
  return (
    <div className="min-h-screen bg-slate-950 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Suspense fallback={<div className="text-center mt-32 text-slate-400">Iniciando cotizador...</div>}>
        <CalculatorContent />
      </Suspense>
    </div>
  );
}

