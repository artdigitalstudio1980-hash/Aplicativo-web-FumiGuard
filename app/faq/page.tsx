import FAQSection from '../../components/FAQSection';
import CTASection from '../../components/CTASection';

export const metadata = {
  title: 'Preguntas Frecuentes | FUMIGUARD - Fumigación Bogotá',
  description: 'Resolvemos las preguntas más comunes sobre nuestros servicios de fumigación en Bogotá.',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta una fumigación en Bogotá?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El precio mínimo es de 180,000 COP. El costo final depende del tipo de plaga, los metros cuadrados y el tipo de propiedad. Usa nuestra calculadora online para obtener un precio estimado en menos de 1 minuto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto dura el efecto de la fumigación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del tratamiento. El control de cucarachas tiene una duración de 3 a 6 meses, mientras que las barreras químicas para termitas pueden durar hasta 5 años. Todos nuestros servicios incluyen garantía escrita.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué productos utilizan para fumigar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usamos productos de baja toxicidad aprobados por el INVIMA y la EPA. Todos nuestros químicos son de grado profesional y están aplicados por técnicos certificados con EPP completo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es seguro para niños y mascotas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Aplicamos productos de baja toxicidad y te damos recomendaciones post-servicio. Generalmente se recomienda mantener el área ventilada por 2 a 4 horas antes de reingresar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tengo que esperar después de la fumigación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para la mayoría de los tratamientos, recomendamos esperar de 2 a 4 horas antes de reingresar al área tratada. Nuestro técnico te dará instrucciones específicas según el tipo de fumigación realizada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden en toda Bogotá?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, atendemos toda Bogotá y municipios cercanos como Chía, Cota, Soacha, La Calera y Cajicá. El servicio de inspección es completamente gratuito.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <main>
      <section className="pt-28 pb-10 bg-[var(--bg-secondary)]">
        <div className="container text-center">
          <span className="section-label">Ayuda</span>
          <h1>Preguntas Frecuentes</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestros servicios de fumigación y control de plagas.
          </p>
        </div>
      </section>

      <FAQSection showHeader={false} />
      <CTASection title="¿Listo para eliminar las plagas?" subtitle="Cotiza gratis en menos de 1 minuto" />
    </main>
      </>
  );
}
