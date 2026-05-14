'use client';

import { useState } from 'react';
import { Calculator as CalcIcon, CheckCircle, ArrowRight } from 'lucide-react';

export default function PriceCalculator() {
  const [m2, setM2] = useState(50);
  const [propertyType, setPropertyType] = useState('Residencial');
  
  const calculatePrice = () => {
    const basePrice = 180000;
    const areaMultiplier = m2 > 100 ? 1 + (m2 - 100) * 0.005 : 1;
    const typeMultiplier = propertyType === 'Comercial' ? 1.2 : (propertyType === 'Industrial' ? 1.5 : 1);
    return Math.round(basePrice * areaMultiplier * typeMultiplier);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-gradient">Calculadora de Precio</h1>
          <p className="text-xl text-gray-500">Cotiza tu servicio de fumigación en tiempo real.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 flex justify-between">
                <span>Área Aproximada: {m2} m²</span>
              </label>
              <input 
                type="range" 
                min="20" 
                max="1000" 
                value={m2}
                onChange={(e) => setM2(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">Tipo de Inmueble</label>
              <div className="grid grid-cols-1 gap-3">
                {['Residencial', 'Comercial', 'Industrial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`px-6 py-4 rounded-2xl text-left font-semibold transition-all border-2 ${
                      propertyType === type 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 opacity-60">
                <CalcIcon size={20} />
                <span className="text-sm font-bold tracking-widest uppercase">Estimación Total</span>
              </div>
              <div className="text-5xl font-extrabold mb-4">
                ${calculatePrice().toLocaleString('es-CO')}
                <span className="text-lg font-normal text-slate-400 block mt-2">COP (IVA incluido)</span>
              </div>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400" />
                  Certificado de Sanidad incluído
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400" />
                  Garantía de 6 meses
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400" />
                  Técnicos certificados
                </li>
              </ul>
            </div>
            <button className="btn btn-primary w-full !py-4 mt-8 text-lg">
              Agendar Ahora
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
