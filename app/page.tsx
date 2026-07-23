import Link from "next/link";
import { Calculator, ArrowRight, Shield, Clock, Award, Star, MapPin, Phone } from "lucide-react";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CertificationsBar from "../components/CertificationsBar";
import ServiceGallery from "../components/ServiceGallery";
import CTASection from "../components/CTASection";
import { ShieldCrosshairSymbol } from "../components/brand-symbols";

const SERVICES = [
  { id: "cucarachas", name: "Control de Cucarachas", icon: "🦟", price: "Desde $80.000" },
  { id: "hormigas", name: "Control de Hormigas", icon: "🐜", price: "Desde $70.000" },
  { id: "roedores", name: "Control de Roedores", icon: "🐀", price: "Desde $120.000" },
  { id: "termitas", name: "Control de Termitas", icon: "🏠", price: "Desde $250.000" },
];

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-gradient" />
        <div className="hero-symbol" aria-hidden="true">
          <ShieldCrosshairSymbol size={160} className="text-[var(--accent)] opacity-[0.04]" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={14} className="text-yellow-500" fill="currentColor" />
              Profesionales de confianza · 5.000+ servicios en Bogotá
            </div>
            <h1>
              Elimina las plagas de tu{" "}
              <span className="text-gradient">hogar o empresa</span>
            </h1>
            <p className="hero-subtitle">
              Servicios profesionales de fumigación con técnicos certificados.
              Cotiza en línea en menos de 1 minuto, sin compromiso.
            </p>
            <div className="hero-actions">
              <Link href="/calculator" className="btn btn-primary btn-lg flex items-center gap-2">
                <Calculator size={20} />
                Calcular Precio
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg flex items-center gap-2">
                <Phone size={18} />
                Cotizar por WhatsApp
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted mb-4">
              <MapPin size={14} />
              <span>Atendemos toda Bogotá y municipios cercanos</span>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Servicios</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">
                  <Star size={12} className="inline text-yellow-500" fill="currentColor" /> Rating
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24h</span>
                <span className="stat-label">Respuesta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[var(--bg-secondary)] reveal">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Nuestros servicios</span>
            <h2>Tratamientos profesionales para cada plaga</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Soluciones específicas para cada tipo de infestación con productos de última generación.
            </p>
          </div>
          <div className="card-grid-4 stagger-children">
            {SERVICES.map((service) => (
              <div key={service.id} className="card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="text-lg mb-1">{service.name}</h3>
                <p className="text-[var(--accent)] font-semibold text-sm">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/catalog" className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold text-sm hover:underline">
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <CertificationsBar />

      {/* Cómo funciona */}
      <HowItWorksSection />

      {/* Galería */}
      <section className="py-20 bg-[var(--bg-secondary)] reveal">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Galería</span>
            <h2>Nuestros trabajos</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Una muestra de los servicios realizados para hogares y empresas en Bogotá.
            </p>
          </div>
          <ServiceGallery />
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold text-sm hover:underline">
              Ver galería completa <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white reveal">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Por qué elegirnos</span>
            <h2>Calidad y confianza</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Respaldados por certificaciones y clientes satisfechos en toda Bogotá.
            </p>
          </div>
          <div className="card-grid-3 stagger-children">
            <div className="card text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                <Shield size={24} className="text-[var(--accent)]" />
              </div>
              <h3>Técnicos Certificados</h3>
              <p className="text-sm">Profesionales capacitados con EPP completo y formación continua</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                <Clock size={24} className="text-[var(--accent)]" />
              </div>
              <h3>Servicio Rápido</h3>
              <p className="text-sm">Atención en menos de 24 horas desde tu cotización</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                <Award size={24} className="text-[var(--accent)]" />
              </div>
              <h3>Garantía Escrita</h3>
              <p className="text-sm">Certificado de fumigación con validez legal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <TestimonialsSection limit={3} />

      {/* CTA Final */}
      <CTASection />
    </main>
  );
}
