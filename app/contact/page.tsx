'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

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
        setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-gradient">Contáctanos</h1>
          <p className="text-xl text-gray-500">Estamos aquí para resolver tus dudas y proteger tus espacios.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><Phone size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Llámanos</h4>
                  <p className="text-gray-500">+57 320 554 0495</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Escríbenos</h4>
                  <p className="text-gray-500">contacto@fumiguard.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Ubicación</h4>
                  <p className="text-gray-500">Bogotá, Colombia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-10 sm:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
              {status === 'success' && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-medium border border-emerald-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100">
                  Hubo un error al enviar el mensaje. Por favor intenta más tarde.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  required 
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none text-gray-900"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary w-full !py-5 text-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
