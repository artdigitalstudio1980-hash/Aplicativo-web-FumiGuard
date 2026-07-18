"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Servicios", href: "/catalog" },
  { label: "Calculadora", href: "/calculator" },
  { label: "Galería", href: "/gallery" },
  { label: "Testimonios", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          <Image src="/img/logo_v1.png" alt="FUMIGUARD" width={40} height={40} className="w-10 h-10 object-contain" />
          <span>FUMIGUARD</span>
        </Link>

        <nav className={`nav ${menuOpen ? "flex flex-col absolute top-full left-0 w-full bg-white p-4 shadow-lg z-50" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions flex gap-4 items-center">
          <Link href="/login" className="text-gray-600 hover:text-emerald-500 font-medium hidden sm:block">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn btn-primary !py-2.5 !px-6 !bg-emerald-600 hover:!bg-emerald-700">
            Registrarse
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
