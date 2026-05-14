import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">Antygravity</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">Nosotros</Link>
            <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">Servicios</Link>
            <Link href="/calculator" className="text-gray-300 hover:text-white transition-colors">Calculadora</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contacto</Link>
            <Link href="/login" className="px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
              Portal Cliente
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
