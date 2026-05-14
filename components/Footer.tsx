import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <section className="contact-bar">
        <div className="container">
          <div className="contact-items">
            <a href="tel:+573001234567" className="contact-item">
              <Phone size={20} className="text-emerald-500" />
              <span>300 123 4567</span>
            </a>
            <a href="mailto:contacto@fumiguard.com" className="contact-item">
              <Mail size={20} className="text-emerald-500" />
              <span>contacto@fumiguard.com</span>
            </a>
            <span className="contact-item">
              <MapPin size={20} className="text-emerald-500" />
              <span>Bogotá, Colombia</span>
            </span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <Link href="/" className="footer-logo">
                🔰 FUMIGUARD
              </Link>
              <p className="text-gray-400 mt-4">
                Servicios profesionales de fumigación y control de plagas con técnicos certificados. Resultados garantizados.
              </p>
            </div>
            <div className="footer-col">
              <h4>Servicios</h4>
              <Link href="/catalog">Catálogo Completo</Link>
              <Link href="/calculator">Calculadora de Precio</Link>
              <Link href="/contact">Solicitar Asesoría</Link>
            </div>
            <div className="footer-col">
              <h4>Empresa</h4>
              <Link href="/about">Sobre Nosotros</Link>
              <Link href="/testimonios">Testimonios</Link>
              <Link href="/faq">Preguntas Frecuentes</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link href="/terminos">Términos y Condiciones</Link>
              <Link href="/privacidad">Política de Privacidad</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FUMIGUARD. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
