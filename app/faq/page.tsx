import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Preguntas Frecuentes | FUMIGUARD - Fumigación Bogotá',
  description: 'Resolvemos las preguntas más comunes sobre nuestros servicios de fumigación en Bogotá.',
};

export default function FAQPage() {
  return (
    <main>
      <section className="pt-32 pb-8 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestros servicios de fumigación
            y control de plagas.
          </p>
        </div>
      </section>

      <FAQSection showHeader={false} />
      <CTASection
        title="¿Listo para eliminar las plagas?"
        subtitle="Cotiza gratis en menos de 1 minuto"
      />
    </main>
  );
}
