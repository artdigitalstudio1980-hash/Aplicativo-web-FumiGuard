'use client';

import { useSearchParams } from 'next/navigation';
import { QrCode, CheckCircle2, MessageCircle, Copy, AlertCircle } from 'lucide-react';
import { useState, Suspense } from 'react';
import Link from 'next/link';

function PaymentContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || 'Servicio de Fumigación';
  const price = searchParams.get('price') || '80000';
  
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(parseInt(price));

  const [copied, setCopied] = useState(false);
  const breBKey = '3001234567'; // Llave Bre-B provisional (celular)
  const orderId = Math.floor(1000 + Math.random() * 9000); // ID Aleatorio para MVP

  const handleCopy = () => {
    navigator.clipboard.writeText(breBKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(`Hola FUMIGUARD, acabo de pagar el servicio de *${service}*. Mi número de orden es *#${orderId}*. Aquí adjunto mi comprobante de pago por ${formattedPrice}.`);
  const whatsappUrl = `https://wa.me/57${breBKey}?text=${whatsappMessage}`;

  return (
    <div className="max-w-3xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6 shadow-sm border border-emerald-50">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Finaliza tu Pago</h1>
        <p className="text-lg text-gray-500">
          Estás a un paso de confirmar tu <strong>{service}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary & QR Card */}
        <div className="card flex flex-col items-center text-center p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Total a Pagar</h3>
          <div className="text-4xl font-black text-emerald-600 mb-8">{formattedPrice}</div>
          
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 mb-6 relative group cursor-pointer w-48 h-48 flex items-center justify-center transition-all hover:shadow-md">
            <QrCode size={120} className="text-slate-800" strokeWidth={1} />
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-bold text-emerald-600">Escanear QR</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 max-w-[250px] leading-relaxed">
            Abre tu app de Bancolombia, Nequi o DaviPlata y escanea este código.
          </p>
        </div>

        {/* Bre-B Instructions Card */}
        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                <span className="text-indigo-600 font-black italic text-lg">B</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Transfiriendo por Bre-B</h3>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              También puedes usar el sistema inmediato Bre-B ingresando nuestra llave celular:
            </p>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-wider">Llave Bre-B (Celular)</p>
                <p className="text-2xl font-mono font-bold text-gray-800">{breBKey}</p>
              </div>
              <button 
                onClick={handleCopy}
                className="w-12 h-12 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm"
              >
                {copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
              </button>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-sm mb-6">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p>Tu orden es la <strong className="font-bold">#{orderId}</strong>. Por favor, inclúyela en el mensaje de la transferencia si es posible.</p>
            </div>
          </div>

          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
          >
            <MessageCircle size={24} />
            Ya pagué (Enviar Comprobante)
          </a>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/catalog" className="text-gray-500 hover:text-emerald-600 font-medium transition-colors">
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Blurs for Premium Feel */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <Suspense fallback={<div className="text-center mt-32 text-gray-500">Cargando pasarela...</div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
