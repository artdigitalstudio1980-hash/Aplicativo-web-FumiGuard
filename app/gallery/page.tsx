import ServiceGallery from '../../components/ServiceGallery';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Galería de Trabajos | FUMIGUARD - Control de Plagas Bogotá',
  description: 'Conoce nuestros trabajos de fumigación y control de plagas en Bogotá.',
};

export default function GalleryPage() {
  return (
    <main>
      <section className="pt-28 pb-10 bg-[var(--bg-secondary)]">
        <div className="container text-center">
          <span className="section-label">Galería</span>
          <h1>Galería de Trabajos</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Una muestra de los servicios que hemos realizado para hogares y empresas en Bogotá.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <ServiceGallery />
        </div>
      </section>

      <CTASection title="¿Listo para eliminar las plagas?" subtitle="Cotiza gratis en menos de 1 minuto" />
    </main>
  );
}
