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
  const queryServiceId = searchParams.get('serviceId');

  const [services, setServices] = useState<Service[]>(STATIC_FALLBACK_SERVICES);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [m2, setM2] = useState(50);
  const [propertyType, setPropertyType] = useState('Residencial');
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
            if (queryServiceId) {
              const matched = data.find(s => s.id === queryServiceId);
              if (matched) setSelectedService(matched);
            } else {
              setSelectedService(data[0]);
            }
          }
        }
      } catch {
        console.warn('Usando servicios locales de respaldo.');
      } finally {
        clearTimeout(timeout);
        setLoadingServices(false);
      }
    }
    fetchServices();

    return () => { clearTimeout(timeout); controller.abort(); };
  }, [queryServiceId]);

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

  useEffect(() => {
    const pendingQuoteStr = localStorage.getItem('pending_quote');
    if (pendingQuoteStr) {
      try {
        const pendingQuote = JSON.parse(pendingQuoteStr);
        if (pendingQuote.areaSize) setM2(pendingQuote.areaSize);
        if (pendingQuote.propertyType) setPropertyType(pendingQuote.propertyType);
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

  const calculatePrice = () => {
    if (!selectedService) return 180000;
    const basePrice = selectedService.basePrice;
    let calculatedPrice = basePrice;
    if (m2 > 100) {
      calculatedPrice += (m2 - 100) * 1000;
    }
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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 reveal">
        <span className="section-label">
          <Sparkles size={14} />
          Cotización Inmediata
        </span>
        <h1>
          Calculadora de <span className="text-gradient">Precio</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Calcula el costo del servicio sanitario en Bogotá según los metros cuadrados de tu inmueble.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="form-label">Servicio de Fumigación</label>
            {loadingServices ? (
              <div className="flex items-center gap-2 text-[var(--text-muted)] py-3">
                <Loader2 size={16} className="animate-spin" />
                <span>Cargando catálogo...</span>
              </div>
            ) : (
              <select
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const matched = services.find(s => s.id === e.target.value);
                  if (matched) setSelectedService(matched);
                }}
                className="form-input"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} (Base: ${service.basePrice.toLocaleString('es-CO')})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="form-label flex justify-between">
              <span>Área Aproximada del Inmueble</span>
              <span className="font-bold text-[var(--accent)]">{m2} m²</span>
            </label>
            <input
              type="range"
              min="20"
              max="1000"
              value={m2}
              onChange={(e) => setM2(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'var(--bg-tertiary)', accentColor: 'var(--accent)' }}
            />
            <div className="flex justify-between text-xs mt-1 text-[var(--text-light)]">
              <span>20 m²</span>
              <span>500 m²</span>
              <span>1000 m²</span>
            </div>
          </div>

          <div>
            <label className="form-label">Tipo de Inmueble</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {['Residencial', 'Comercial', 'Industrial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`px-4 py-3 rounded-xl text-center font-semibold text-sm transition-all border ${
                    propertyType === type
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 flex flex-col justify-between bg-[var(--bg-secondary)] border border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalcIcon size={18} className="text-[var(--accent)]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Valor Total de Cotización</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
              ${calculatePrice().toLocaleString('es-CO')}
              <span className="text-xs font-normal block mt-1 text-[var(--text-muted)]">COP (IVA e Insumos Incluidos)</span>
            </div>

            <ul className="space-y-3 mt-6 pt-5 border-t border-[var(--border)]">
              <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle size={16} className="text-[var(--accent)]" />
                Certificado de Sanidad Gubernamental
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle size={16} className="text-[var(--accent)]" />
                Fórmulas de uso seguro (Norma Técnica)
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle size={16} className="text-[var(--accent)]" />
                Garantía por escrito del servicio
              </li>
            </ul>
          </div>

          <button
            onClick={handleBookOrder}
            disabled={submitting || !selectedService}
            className="btn btn-primary w-full mt-6 justify-center text-base"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Agendando...
              </>
            ) : (
              <>
                Agendar Ahora
                <ArrowRight size={18} />
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
    <div className="min-h-screen bg-[var(--bg-secondary)] py-20 px-4">
      <Suspense fallback={<div className="text-center mt-20 text-[var(--text-muted)]">Iniciando cotizador...</div>}>
        <CalculatorContent />
      </Suspense>
    </div>
  );
}
