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
      <div className="footer-top">
        <div className="container">
          <div className="footer-contact-items">
            <a href="mailto:contacto@fumiguard.com" className="footer-contact-item">
              <span>✉️</span>
              contacto@fumiguard.com
            </a>
            <span className="footer-contact-item">
              <span>📍</span>
              Bogotá, Colombia
            </span>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo" style={{ color: "white" }}>
                <Image src="/img/logo.svg" alt="FUMIGUARD" width={36} height={36} />
                <span className="logo-text" style={{ color: "white" }}>FUMIGUARD</span>
              </Link>
              <p>
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
            <p>© {new Date().getFullYear()} FUMIGUARD. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
