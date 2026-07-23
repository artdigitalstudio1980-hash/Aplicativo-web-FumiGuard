import Image from "next/image";
import HowItWorksSection from "../../components/HowItWorksSection";
import CertificationsBar from "../../components/CertificationsBar";
import TestimonialsSection from "../../components/TestimonialsSection";
import CTASection from "../../components/CTASection";

export const metadata = {
  title: "Sobre FUMIGUARD | Empresa de Fumigación en Bogotá",
  description: "Conoce FUMIGUARD: empresa de fumigación y control de plagas en Bogotá con técnicos certificados y garantía escrita.",
};

export default function About() {
  return (
    <main>
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="section-label">Sobre nosotros</span>
            <h1>Sobre <span className="text-gradient">FUMIGUARD</span></h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Expertos en bioseguridad y control de plagas con un enfoque profesional y tecnológico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[var(--text)]">
                Más que una empresa, tu aliado en seguridad ambiental
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                En FUMIGUARD entendemos que la presencia de plagas no es solo una molestia,
                sino un riesgo para la salud y la integridad de tus espacios. Por eso,
                hemos diseñado un modelo de servicio basado en la precisión técnica y la
                efectividad garantizada.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Técnicos certificados por autoridades de salud.",
                  "Uso exclusivo de productos de baja toxicidad y alta eficiencia.",
                  "Informes detallados y certificados de fumigación para trámites legales.",
                  "Cobertura en toda Bogotá y municipios cercanos (Chía, Cota, Soacha, etc.)."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-lg aspect-square lg:aspect-auto lg:h-[500px]">
              <Image src="/img/team_v1.png" alt="Nuestro equipo FUMIGUARD" fill style={{ objectFit: "cover" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "15+", label: "Años de Trayectoria" },
              { number: "100%", label: "Satisfacción" },
              { number: "24/7", label: "Atención Inmediata" },
            ].map((stat, i) => (
              <div key={i} className="card text-center py-10">
                <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{stat.number}</div>
                <div className="font-semibold text-[var(--text)] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <CertificationsBar />
      <TestimonialsSection limit={3} />
      <CTASection title="¿Listo para trabajar con nosotros?" subtitle="Cotiza gratis en menos de 1 minuto" />
    </main>
  );
}
