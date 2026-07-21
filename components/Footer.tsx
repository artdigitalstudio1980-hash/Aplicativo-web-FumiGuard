import Link from "next/link";
import Image from "next/image";

const SERVICE_LINKS = [
  { label: "Todos los servicios", href: "/catalog" },
  { label: "Calcular precio", href: "/calculator" },
  { label: "Galería", href: "/gallery" },
  { label: "Contacto", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Testimonios", href: "/testimonials" },
  { label: "Preguntas frecuentes", href: "/faq" },
];

const LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/legal/terms" },
  { label: "Política de privacidad", href: "/legal/privacy" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Contact bar superior */}
      <div className="contact-bar" style={{ background: "#1e293b" }}>
        <div className="container">
          <div className="contact-items">
            <a href="tel:+573001234567" className="contact-item" style={{ color: "#cbd5e1" }}>
              <span>📞</span>
              {/* TODO: reemplazar con número real de la empresa cliente */}
              300 123 4567
            </a>
            <a href="mailto:contacto@fumigacionesapp.com" className="contact-item" style={{ color: "#cbd5e1" }}>
              <span>✉️</span>
              {/* TODO: reemplazar con email real de la empresa cliente */}
              contacto@fumigacionesapp.com
            </a>
            <span className="contact-item" style={{ color: "#cbd5e1" }}>
              <span>📍</span>
              Bogotá, Colombia
            </span>
          </div>
        </div>
      </div>

      {/* Footer principal */}
      <div className="container" style={{ paddingTop: "4rem" }}>
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-logo flex items-center gap-2">
              <Image src="/img/logo.svg" alt="FUMIGUARD" width={40} height={40} className="w-10 h-10" />
              FUMIGUARD
            </Link>
            <p style={{ color: "#94a3b8", maxWidth: "320px", lineHeight: 1.6 }}>
              Servicios profesionales de fumigación y control de plagas para tu
              hogar y empresa en Bogotá y municipios cercanos.
            </p>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            {SERVICE_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            {COMPANY_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} FUMIGUARD. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
