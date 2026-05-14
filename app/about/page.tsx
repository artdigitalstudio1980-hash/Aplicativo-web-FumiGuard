export default function About() {
  return (
    <div className="min-h-screen bg-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-gradient">Sobre FUMIGUARD</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Expertos en bioseguridad y control de plagas con un enfoque profesional y tecnológico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900">Más que una empresa, tu aliado en <span className="text-emerald-500">seguridad ambiental</span></h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              En FUMIGUARD entendemos que la presencia de plagas no es solo una molestia, sino un riesgo para la salud y la integridad de tus espacios. Por eso, hemos diseñado un modelo de servicio basado en la precisión técnica y la efectividad garantizada.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 font-bold">✓</div>
                <p className="text-gray-700 font-medium">Técnicos certificados por autoridades de salud.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 font-bold">✓</div>
                <p className="text-gray-700 font-medium">Uso exclusivo de productos de baja toxicidad y alta eficiencia.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 font-bold">✓</div>
                <p className="text-gray-700 font-medium">Informes detallados y certificados de fumigación para trámites legales.</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]">
             <img src="/img/team.png" alt="Nuestro equipo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-12 rounded-[2rem] text-center">
            <div className="text-5xl font-extrabold text-emerald-500 mb-4">15+</div>
            <div className="text-gray-900 font-bold text-xl">Años de Trayectoria</div>
          </div>
          <div className="bg-slate-50 p-12 rounded-[2rem] text-center">
            <div className="text-5xl font-extrabold text-emerald-500 mb-4">100%</div>
            <div className="text-gray-900 font-bold text-xl">Satisfacción</div>
          </div>
          <div className="bg-slate-50 p-12 rounded-[2rem] text-center">
            <div className="text-5xl font-extrabold text-emerald-500 mb-4">24/7</div>
            <div className="text-gray-900 font-bold text-xl">Atención Inmediata</div>
          </div>
        </div>
      </div>
    </div>
  );
}
