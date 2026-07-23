import TestimonialsSection from '../../components/TestimonialsSection';
import CertificationsBar from '../../components/CertificationsBar';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Testimonios | FUMIGUARD - Control de Plagas Bogotá',
  description: 'Opiniones reales de clientes de FUMIGUARD en Bogotá.',
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FUMIGUARD - Servicios de Fumigación",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "5000",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "FUMIGUARD",
    },
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    <main>
      <section className="pt-28 pb-10 bg-[var(--bg-secondary)]">
        <div className="container text-center">
          <span className="section-label">Testimonios</span>
          <h1>Testimonios</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Más de 5.000 hogares y empresas en Bogotá han confiado en nosotros.
          </p>
        </div>
      </section>

      <TestimonialsSection showHeader={false} />
      <CertificationsBar />
      <CTASection title="¿Listo para ser nuestro próximo testimonio?" subtitle="Cotiza gratis en menos de 1 minuto" />
    </main>
    </>
  );
}
