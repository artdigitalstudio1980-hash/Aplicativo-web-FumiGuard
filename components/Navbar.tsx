"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/catalog" },
  { label: "Calculadora", href: "/calculator" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link href="/" className="logo">
          <Image src="/img/logo.svg" alt="FUMIGUARD" width={40} height={40} className="w-10 h-10" />
          <span className="logo-text">FUMIGUARD</span>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="nav-link nav-link-login sm:hidden" onClick={() => setMenuOpen(false)}>
            Iniciar sesión
          </Link>
          <Link href="/register" className="nav-link nav-link-register sm:hidden" onClick={() => setMenuOpen(false)}>
            Registrarse
          </Link>
        </nav>

        <div className="header-actions">
          <Link href="/login" className="header-btn-iniciar">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Registrarse
          </Link>
        </div>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
