'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-gradient">Contáctanos</h1>
          <p className="text-xl text-gray-500">Estamos aquí para resolver tus dudas y proteger tus espacios.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><Phone size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Llámanos</h4>
                  <p className="text-gray-500">+57 300 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Escríbenos</h4>
                  <p className="text-gray-500">contacto@fumiguard.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Ubicación</h4>
                  <p className="text-gray-500">Bogotá, Colombia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              <button 
                type="submit"
                className="btn btn-primary w-full !py-5 text-lg"
              >
                <Send size={20} />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
