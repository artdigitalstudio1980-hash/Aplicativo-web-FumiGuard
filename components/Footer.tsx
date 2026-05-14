import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Contact Bar */}
      <section className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-slate-300 text-sm">
            <a href="tel:+573001234567" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
              <Phone size={18} className="text-slate-500" />
              <span>300 123 4567</span>
            </a>
            <a href="mailto:contacto@fumigacionesapp.com" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
              <Mail size={18} className="text-slate-500" />
              <span>contacto@fumigacionesapp.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-slate-500" />
              <span>Bogotá, Colombia</span>
            </span>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                <img src="/img/logo.png" alt="FUMIGUARD" className="w-8 h-8 object-contain" />
                FUMIGUARD
              </Link>
              <p className="mt-6 text-sm text-slate-400 leading-relaxed">
                Servicios profesionales de fumigación para tu hogar y empresa.
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/catalog" className="hover:text-emerald-500">Todos los servicios</Link></li>
                <li><Link href="/calculator" className="hover:text-emerald-500">Calcular precio</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-500">Contacto</Link></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-emerald-500">Cómo funciona</Link></li>
                <li><Link href="/about" className="hover:text-emerald-500">Testimonios</Link></li>
                <li><Link href="/about" className="hover:text-emerald-500">Preguntas frecuentes</Link></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-emerald-500">Términos y condiciones</Link></li>
                <li><Link href="/about" className="hover:text-emerald-500">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-20 pt-8 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} FUMIGUARD. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
