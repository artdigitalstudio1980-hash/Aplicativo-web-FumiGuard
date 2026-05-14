"use client";

import Link from "next/link";
import { Calculator, ArrowRight, Shield, Clock, Award, Star } from "lucide-react";

const services = [
  { id: "cucarachas", name: "Control de Cucarachas", icon: "🦟", price: "Desde $80.000" },
  { id: "hormigas", name: "Control de Hormigas", icon: "🐜", price: "Desde $70.000" },
  { id: "roedores", name: "Control de Roedores", icon: "🐀", price: "Desde $120.000" },
  { id: "termitas", name: "Control de Termitas", icon: "🏠", price: "Desde $250.000" },
];

const testimonials = [
  { name: "María G.", text: "Excelente servicio, muy profesionales." },
  { name: "Carlos M.", text: "El técnico llegó a tiempo, muy recomendado." },
  { name: "Laura R.", text: "Problema resuelto desde la primera visita." },
];

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero min-h-[90vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/img/hero.png" alt="Fumigación Profesional" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-white text-emerald-600 px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-sm border border-emerald-50">
              Profesionales de confianza
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Elimina las plagas de tu hogar o empresa
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Servicios profesionales de fumigación con técnicos certificados. Precios justos y garantizados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/calculator" className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700 flex items-center gap-2">
                <Calculator size={20} />
                Calcular Precio
              </Link>
              <Link href="/about" className="btn btn-outline flex items-center gap-2">
                Cómo funciona
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-slate-100">
              <div className="stat-item">
                <span className="text-3xl font-bold text-emerald-600 block">5000+</span>
                <span className="text-sm text-slate-500">Servicios</span>
              </div>
              <div className="stat-item">
                <span className="text-3xl font-bold text-emerald-600 block">4.9</span>
                <span className="text-sm text-slate-500">Rating</span>
              </div>
              <div className="stat-item">
                <span className="text-3xl font-bold text-emerald-600 block">24h</span>
                <span className="text-sm text-slate-500">Respuesta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
            <p className="text-slate-500 text-lg">Tratamientos profesionales para cada tipo de plaga</p>
            <img src="/img/services.png" alt="Nuestros Servicios" className="w-full rounded-3xl shadow-xl mb-16 border border-slate-100" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-emerald-600 font-bold">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/catalog" className="text-emerald-600 font-bold flex items-center justify-center gap-2 hover:underline">
              Ver todos los servicios
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Shield size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Técnicos Certificados</h3>
              <p className="text-slate-500">Profesionales capacitados</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Clock size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Servicio Rápido</h3>
              <p className="text-slate-500">En menos de 24 horas</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Award size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Garantía Escrita</h3>
              <p className="text-slate-500">En todos los servicios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl shadow-sm">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-4">&quot;{t.text}&quot;</p>
                <p className="text-slate-500 text-sm">- {t.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/about" className="text-emerald-600 font-bold flex items-center justify-center gap-2 hover:underline">
              Ver más testimonios
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-24">
        <div className="bg-emerald-600 rounded-3xl p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Listo para eliminar las plagas?</h2>
          <p className="text-xl opacity-90 mb-10">Calcula tu precio en menos de 1 minuto</p>
          <Link href="/calculator" className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors inline-block">
            Calcular Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
