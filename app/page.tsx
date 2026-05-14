"use client";

import Link from "next/link";
import { Calculator, Shield, Clock, Award, ArrowRight } from "lucide-react";

const services = [
  { id: "cucarachas", name: "Cucarachas", icon: "🦟", price: "Desde $180k" },
  { id: "roedores", name: "Roedores", icon: "🐀", price: "Desde $180k" },
  { id: "termitas", name: "Termitas", icon: "🏠", price: "Desde $250k" },
  { id: "hormigas", name: "Hormigas", icon: "🐜", price: "Desde $150k" },
];

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Técnicos Certificados en Control de Plagas</span>
            <h1 className="text-gradient">Control de Plagas Profesional y Garantizado</h1>
            <p className="hero-subtitle">
              Protegemos tu hogar o empresa con tecnología avanzada. Calcula el precio de tu servicio en segundos.
            </p>
            <div className="hero-actions">
              <Link href="/calculator" className="btn btn-primary">
                <Calculator size={20} />
                Calcular Precio
              </Link>
              <Link href="/catalog" className="btn btn-outline">
                Ver Servicios
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Servicios Realizados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Efectividad</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24h</span>
                <span className="stat-label">Respuesta Rápida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestros <span className="text-gradient">Servicios</span></h2>
            <p className="text-gray-500 text-lg">Soluciones especializadas para cada tipo de infestación</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <Link key={service.id} href="/calculator" className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.name}</h3>
                <span className="service-price">{service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Calidad en <span className="text-gradient">Cada Visita</span></h2>
            <p className="text-gray-500 text-lg">Mira cómo trabajan nuestros expertos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-white">
                <img 
                  src={`/img/service${num}.jpeg`} 
                  alt={`Fumigación profesional ${num}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold text-lg">Procedimiento Certificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-emerald-500"><Shield size={48} /></div>
              <h3>Garantía Total</h3>
              <p className="text-gray-500">Si la plaga vuelve en el periodo de garantía, nosotros también sin costo adicional.</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-emerald-500"><Clock size={48} /></div>
              <h3>Atención 24/7</h3>
              <p className="text-gray-500">Entendemos que las plagas no esperan. Estamos listos para atenderte en cualquier momento.</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-emerald-500"><Award size={48} /></div>
              <h3>Personal Experto</h3>
              <p className="text-gray-500">Técnicos altamente capacitados con los mejores equipos del mercado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section container">
        <div className="cta-card">
          <h2>¿Listo para un espacio libre de plagas?</h2>
          <p>Calcula tu presupuesto personalizado ahora mismo</p>
          <Link href="/calculator" className="btn btn-white">
            Calcular Ahora
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
