import TestimonialsSection from '../../components/TestimonialsSection';
import CertificationsBar from '../../components/CertificationsBar';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Testimonios | FUMIGUARD - Control de Plagas Bogotá',
  description: 'Opiniones reales de clientes de FUMIGUARD en Bogotá. Hogares y empresas que confiaron en nuestro servicio.',
};

export default function TestimonialsPage() {
  return (
    <main>
      <section className="pt-32 pb-8 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Testimonios
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Más de 5.000 hogares y empresas en Bogotá han confiado en nosotros.
            Conoce sus experiencias.
          </p>
        </div>
      </section>

      <TestimonialsSection showHeader={false} />
      <CertificationsBar />
      <CTASection
        title="¿Listo para ser nuestro próximo testimonio?"
        subtitle="Cotiza gratis en menos de 1 minuto"
      />
    </main>
  );
}
