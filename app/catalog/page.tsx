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
    <div className="min-h-screen bg-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-gradient">Nuestro Catálogo de Servicios</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Soluciones integrales diseñadas para cada tipo de plaga y entorno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="group border border-gray-100 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-56 w-full relative">
                <img 
                  src={index % 2 === 0 ? "/img/service_spray.png" : "/img/service_rodent.png"} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">{service.desc}</p>
                <Link 
                  href="/calculator" 
                  className="btn btn-primary w-full"
                >
                  Cotizar Ahora
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
