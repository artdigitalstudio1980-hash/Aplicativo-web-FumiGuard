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
    <section className="container py-20">
      <div className="cta-block">
        <div className="relative z-10">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <Link
            href={buttonHref}
            className="btn btn-white btn-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
