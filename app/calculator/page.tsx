'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Calculator() {
  const router = useRouter();
  const [plagueType, setPlagueType] = useState('cucarachas');
  const [areaSize, setAreaSize] = useState(50);
  const [propertyType, setPropertyType] = useState('apartamento');

  // Base price: Minimum 180,000 COP
  // Assuming base price of standard service is 180,000. For > 100m2, add 1,000 COP per extra m2.
  let calculatedPrice = 180000;
  if (areaSize > 100) {
    calculatedPrice += (areaSize - 100) * 1000;
  }
  
  if (propertyType === 'comercial') {
    calculatedPrice *= 1.2; // 20% extra for commercial
  }
  if (propertyType === 'industrial') {
    calculatedPrice *= 1.5; // 50% extra for industrial
  }

  const handleCheckout = () => {
    // In a real app, we'd save to context or redirect to login then checkout
    router.push('/login?redirect=checkout');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Calculadora de Precio</h1>
        <p className="text-gray-400 text-center mb-10">Obtén un presupuesto inmediato para tu servicio de control de plagas.</p>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Tipo de Plaga</label>
            <select 
              value={plagueType}
              onChange={(e) => setPlagueType(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="cucarachas">Cucarachas</option>
              <option value="roedores">Roedores</option>
              <option value="termitas">Termitas</option>
              <option value="hormigas">Hormigas</option>
              <option value="mosquitos">Mosquitos</option>
              <option value="desinfeccion">Desinfección General</option>
              <option value="lavado_tanques">Lavado de Tanques</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Tipo de Inmueble</label>
            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="apartamento">Apartamento / Casa</option>
              <option value="comercial">Local Comercial / Oficina</option>
              <option value="industrial">Industrial / Bodega</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Tamaño del Área ({areaSize} m²)
            </label>
            <input 
              type="range" 
              min="20" 
              max="500" 
              step="10"
              value={areaSize}
              onChange={(e) => setAreaSize(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>20 m²</span>
              <span>500+ m²</span>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10 text-center">
            <h3 className="text-xl text-gray-400 mb-2">Precio Estimado</h3>
            <div className="text-5xl font-bold text-gradient mb-8">
              ${new Intl.NumberFormat('es-CO').format(calculatedPrice)} COP
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Agendar Servicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
