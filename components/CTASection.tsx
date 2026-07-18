import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = '¿Listo para eliminar las plagas?',
  subtitle = 'Calcula tu precio en menos de 1 minuto',
  buttonText = 'Calcular Ahora',
  buttonHref = '/calculator',
}: CTASectionProps) {
  return (
    <section className="container pb-24">
      <div className="bg-emerald-600 rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-emerald-700/40 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <Link
            href={buttonHref}
            className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all inline-block shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
