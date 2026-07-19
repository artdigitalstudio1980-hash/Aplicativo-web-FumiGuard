import HowItWorksSection from '../../components/HowItWorksSection';
import CertificationsBar from '../../components/CertificationsBar';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Cómo Funciona | FUMIGUARD - Fumigación Bogotá',
  description: 'Conoce el proceso paso a paso de FUMIGUARD. Desde la cotización hasta la garantía escrita.',
};

export default function HowItWorksPage() {
  return (
    <main>
      <section className="pt-32 pb-8 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Cómo funciona
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            En 4 pasos simples te deshaces de las plagas. Sin sorpresas, sin
            costos ocultos, con garantía por escrito.
          </p>
        </div>
      </section>

      <HowItWorksSection showHeader={false} />
      <CertificationsBar />
      <CTASection
        title="Empieza tu cotización ahora"
        subtitle="Sin compromiso, en menos de 1 minuto"
      />
    </main>
  );
}
