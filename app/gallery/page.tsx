import ServiceGallery from '@/components/ServiceGallery';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Galería de Trabajos | FUMIGUARD - Control de Plagas Bogotá',
  description: 'Conoce nuestros trabajos de fumigación y control de plagas en Bogotá.',
};

export default function GalleryPage() {
  return (
    <main>
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Galería de Trabajos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Una muestra de los servicios que hemos realizado para hogares y
            empresas en Bogotá.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <ServiceGallery />
        </div>
      </section>

      <CTASection
        title="¿Listo para eliminar las plagas?"
        subtitle="Cotiza gratis en menos de 1 minuto"
      />
    </main>
  );
}
