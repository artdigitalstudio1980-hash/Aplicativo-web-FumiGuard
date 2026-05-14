import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Control de Plagas <span className="text-gradient">Premium</span> en Bogotá
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Protegemos tu hogar y empresa con tecnología avanzada y protocolos de bioseguridad. Soluciones definitivas, seguras y garantizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/calculator" className="px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              Cotizar Ahora
            </Link>
            <Link href="/catalog" className="px-8 py-4 rounded-full glass-panel text-white font-semibold text-lg hover:bg-white/10 transition-all">
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Tecnología Avanzada', desc: 'Equipos de última generación para llegar donde otros no pueden.' },
              { title: 'Productos Seguros', desc: 'Fórmulas eco-amigables seguras para tu familia y mascotas.' },
              { title: 'Garantía Total', desc: 'Si la plaga vuelve en el periodo de cobertura, nosotros también.' },
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
