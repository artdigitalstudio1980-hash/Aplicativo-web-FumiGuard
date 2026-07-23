'use client';

import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Contacto</span>
          <h1>Contáctanos</h1>
          <p className="text-lg text-[var(--text-secondary)]">Estamos aquí para resolver tus dudas y proteger tus espacios.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="card p-6">
              {[
                { icon: <Mail size={22} />, title: "Escríbenos", detail: "contacto@fumiguard.com" },
                { icon: <MapPin size={22} />, title: "Ubicación", detail: "Bogotá, Colombia" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 mb-6 last:mb-0">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-light)] flex items-center justify-center" style={{ color: 'var(--accent)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text)]">{item.title}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8 sm:p-10 space-y-5">
              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium border border-green-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                  Hubo un error al enviar el mensaje. Por favor intenta más tarde.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input" placeholder="Ej. Juan Pérez" />
                </div>
                <div>
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input" placeholder="juan@ejemplo.com" />
                </div>
              </div>
              <div>
                <label className="form-label">Mensaje</label>
                <textarea required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input resize-none" placeholder="Cuéntanos en qué podemos ayudarte..." />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="btn btn-primary w-full !py-3.5 flex items-center justify-center gap-2">
                <Send size={18} />
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
