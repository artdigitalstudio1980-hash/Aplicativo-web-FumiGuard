import Link from "next/link";
import Image from "next/image";
import { Calculator, ArrowRight, Shield, Clock, Award, Star, MapPin, Phone } from "lucide-react";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CertificationsBar from "@/components/CertificationsBar";
import ServiceGallery from "@/components/ServiceGallery";
import CTASection from "@/components/CTASection";

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
      <section className="hero min-h-[90vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/img/hero_v1.png" alt="Fumigación Profesional" fill style={{ objectFit: "cover" }} className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-white text-emerald-600 px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-sm border border-emerald-50">
              Profesionales de confianza · 5.000+ servicios en Bogotá
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Elimina las plagas de tu <span className="text-gradient">hogar o empresa</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Servicios profesionales de fumigación con técnicos certificados.
              Cotiza en línea en menos de 1 minuto, sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/calculator" className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700 flex items-center gap-2">
                <Calculator size={20} />
                Calcular Precio
              </Link>
              <Link href="/contact" className="btn btn-outline flex items-center gap-2">
                <Phone size={18} />
                Cotizar por WhatsApp
              </Link>
            </div>

            {/* Indicador de confianza local */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-12">
              <MapPin size={14} className="text-emerald-600" />
              <span>Atendemos toda Bogotá y municipios cercanos</span>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-slate-100">
              <div className="stat-item">
                <span className="text-3xl font-bold text-emerald-600 block">5000+</span>
                <span className="text-sm text-slate-500">Servicios</span>
              </div>
              <div className="stat-item">
                <span className="text-3xl font-bold text-emerald-600 block">4.9</span>
                <span className="text-sm text-slate-500 flex items-center justify-center gap-1">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  Rating
                </span>
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
            <p className="text-slate-500 text-lg mb-8">Tratamientos profesionales para cada tipo de plaga</p>
            <div className="relative w-full h-[400px] mb-16 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <Image src="/img/services_v1.png" alt="Nuestros Servicios" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
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

      {/* Certificaciones */}
      <CertificationsBar />

      {/* Cómo funciona */}
      <HowItWorksSection />

      {/* Galería */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
              Galería
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Nuestros trabajos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Una muestra de los servicios que hemos realizado para hogares y
              empresas en Bogotá.
            </p>
          </div>
          <ServiceGallery />
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="text-emerald-600 font-bold inline-flex items-center gap-2 hover:underline"
            >
              Ver galería completa
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-100 p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Shield size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Técnicos Certificados</h3>
              <p className="text-slate-500">Profesionales capacitados con EPP completo y formación continua</p>
            </div>
            <div className="bg-white border border-slate-100 p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Clock size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Servicio Rápido</h3>
              <p className="text-slate-500">Atención en menos de 24 horas desde tu cotización</p>
            </div>
            <div className="bg-white border border-slate-100 p-10 rounded-2xl shadow-sm text-center">
              <div className="flex justify-center mb-6 text-emerald-600"><Award size={40} /></div>
              <h3 className="text-xl font-bold mb-2">Garantía Escrita</h3>
              <p className="text-slate-500">Certificado de fumigación válido legalmente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios (limitado a 3 en home) */}
      <TestimonialsSection limit={3} />

      {/* CTA Final */}
      <CTASection />
    </main>
  );
}
