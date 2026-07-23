'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, Copy, AlertCircle } from 'lucide-react';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function PaymentContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || 'Servicio de Fumigación';
  const price = searchParams.get('price') || '80000';
  const orderId = searchParams.get('orderId') || Math.floor(1000 + Math.random() * 9000).toString();

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(parseInt(price));

  const [copied, setCopied] = useState(false);
  const breBKey = '@jorge563702';
  const WHATSAPP_NUMBER = '573205540495';

  const handleCopy = () => {
    navigator.clipboard.writeText(breBKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(`Hola FUMIGUARD, acabo de pagar el servicio de *${service}*. Mi número de orden es *#${orderId}*. Aquí adjunto mi comprobante de pago por ${formattedPrice}.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleConfirmAndWhatsApp = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      window.open(whatsappUrl, '_blank');
      setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
    } catch (err) {
      console.error(err);
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--accent-light)] flex items-center justify-center" style={{ color: 'var(--accent)' }}>
          <CheckCircle2 size={28} />
        </div>
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Finaliza tu Pago</h1>
        <p className="text-[var(--text-muted)]">
          Estás a un paso de confirmar tu <strong>{service}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card text-center p-8">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Total a Pagar</h3>
          <div className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>{formattedPrice}</div>

          <div className="w-44 h-44 mx-auto mb-4 rounded-2xl border border-[var(--border)] p-3 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/img/qr-nequi.jpg" alt="QR de Pago Nequi/Bancolombia" fill style={{ objectFit: 'cover' }} onError={() => {}} />
            </div>
          </div>

          <p className="text-xs text-[var(--text-muted)]">Abre tu app de Bancolombia, Nequi o DaviPlata y escanea este código.</p>
        </div>

        <div className="card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-black italic text-base">B</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Transfiriendo por Bre-B</h3>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-5">
              También puedes usar Bre-B ingresando nuestra llave de Bancolombia:
            </p>

            <div className="flex items-center justify-between p-4 rounded-xl mb-5" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Llave Bre-B (Alias)</p>
                <p className="text-xl font-mono font-bold text-[var(--text)] mt-0.5">{breBKey}</p>
              </div>
              <button onClick={handleCopy}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: copied ? 'var(--accent)' : 'var(--text-muted)' }}>
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <div className="flex gap-3 p-4 rounded-xl text-sm mb-5" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
              <AlertCircle className="shrink-0 mt-0.5" size={16} />
              <p>Tu número de orden es <strong>#{orderId}</strong>. Inclúyelo en el mensaje de la transferencia si es posible.</p>
            </div>
          </div>

          <a href={whatsappUrl} onClick={handleConfirmAndWhatsApp}
            className="btn w-full justify-center text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
            <MessageCircle size={20} />
            Ya pagué (Enviar Comprobante)
          </a>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/catalog" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-20 px-4">
      <Suspense fallback={<div className="text-center mt-20 text-[var(--text-muted)]">Cargando pasarela...</div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
