export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Sobre <span className="text-gradient">Nosotros</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            En FUMIGUARD somos expertos en la protección de espacios contra plagas, combinando tecnología de vanguardia con un compromiso inquebrantable por la salud y el bienestar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="glass-panel p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">Nuestra Misión</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Brindar soluciones de control de plagas definitivas y seguras para hogares y empresas, utilizando productos de baja toxicidad y protocolos de bioseguridad certificados.
            </p>
            <p className="text-gray-300 leading-relaxed">
              No solo eliminamos la plaga actual, sino que implementamos barreras protectoras para prevenir futuras infestaciones, garantizando la tranquilidad de nuestros clientes.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-video">
             <img src="/img/service4.jpeg" alt="Nuestro equipo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="glass-panel p-8 rounded-2xl">
            <div className="text-4xl font-bold text-emerald-400 mb-2">15+</div>
            <div className="text-white font-semibold">Años de Experiencia</div>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
            <div className="text-white font-semibold">Garantía de Satisfacción</div>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <div className="text-4xl font-bold text-emerald-400 mb-2">5000+</div>
            <div className="text-white font-semibold">Clientes Protegidos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
