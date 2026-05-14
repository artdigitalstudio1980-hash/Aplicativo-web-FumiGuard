import Link from 'next/link';

export default function Catalog() {
  const services = [
    { id: 'cucarachas', name: 'Cucarachas', desc: 'Tratamiento intensivo con gel y aspersión para erradicación total.' },
    { id: 'roedores', name: 'Roedores', desc: 'Control poblacional con cebos de última generación y trampas de captura.' },
    { id: 'termitas', name: 'Termitas', desc: 'Protección estructural para muebles y propiedades.' },
    { id: 'hormigas', name: 'Hormigas', desc: 'Inhibición de colonias enteras con cebos granulados.' },
    { id: 'mosquitos', name: 'Mosquitos', desc: 'Termonebulización para exteriores e interiores.' },
    { id: 'desinfeccion', name: 'Desinfección', desc: 'Eliminación de virus, bacterias y hongos.' },
    { id: 'lavado_tanques', name: 'Lavado de Tanques', desc: 'Limpieza y desinfección profunda de tanques de reserva.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Catálogo de <span className="text-gradient">Servicios</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre nuestro catálogo completo de servicios diseñados para resolver definitivamente cualquier problema de plagas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="glass-panel rounded-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300 overflow-hidden">
              <div className="h-48 w-full bg-slate-800 relative">
                <img 
                  src={`/img/service${(index % 5) + 1}.jpeg`} 
                  alt={service.name} 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                <p className="text-gray-400 flex-grow mb-8">{service.desc}</p>
                <Link 
                  href="/calculator" 
                  className="text-center w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all text-emerald-400 font-semibold"
                >
                  Cotizar este servicio
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
