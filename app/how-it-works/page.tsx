import HowItWorksSection from '../../components/HowItWorksSection';
import CertificationsBar from '../../components/CertificationsBar';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Cómo Funciona | FUMIGUARD - Fumigación Bogotá',
  description: 'Conoce el proceso paso a paso de FUMIGUARD. Desde la cotización hasta la garantía escrita.',
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Servicio de fumigación FUMIGUARD en 4 pasos",
  description: "Proceso para obtener un servicio profesional de fumigación y control de plagas en Bogotá.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Cotiza en línea",
      text: "Usa la calculadora online para conocer el precio estimado según el tipo de plaga, los metros cuadrados y el tipo de propiedad.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Inspección gratuita",
      text: "Agenda una visita técnica sin costo para evaluar el nivel de infestación y recibir un plan personalizado con precio cerrado.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Servicio programado",
      text: "Confirma fecha y hora. Los técnicos llegan puntuales con equipo completo y explican el procedimiento.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Garantía y seguimiento",
      text: "Recibe el certificado de fumigación y la garantía escrita. Se realiza seguimiento post-servicio sin costo adicional.",
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    <main>
      <section className="pt-28 pb-10 bg-[var(--bg-secondary)]">
        <div className="container text-center">
          <span className="section-label">Proceso</span>
          <h1>Cómo funciona</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            En 4 pasos simples te deshaces de las plagas. Sin sorpresas, sin costos ocultos.
          </p>
        </div>
      </section>

      <HowItWorksSection showHeader={false} />
      <CertificationsBar />
      <CTASection title="Empieza tu cotización ahora" subtitle="Sin compromiso, en menos de 1 minuto" />
    </main>
    </>
  );
}
