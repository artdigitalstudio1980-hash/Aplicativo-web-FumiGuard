"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          🔰 FUMIGUARD
        </Link>

        <nav className={`nav ${menuOpen ? "flex flex-col absolute top-full left-0 w-full bg-white p-4 shadow-lg" : ""}`}>
          <Link href="/" className={isActive("/") ? "active" : ""}>
            Inicio
          </Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""}>
            Cómo funciona
          </Link>
          <Link href="/catalog" className={isActive("/catalog") ? "active" : ""}>
            Servicios
          </Link>
          <Link href="/calculator" className={isActive("/calculator") ? "active" : ""}>
            Calculadora
          </Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""}>
            Testimonios
          </Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""}>
            FAQ
          </Link>
        </nav>

        <div className="header-actions flex gap-4 items-center">
          <Link href="/login" className="text-gray-600 hover:text-emerald-500 font-medium hidden sm:block">
            Iniciar sesión
          </Link>
          <Link href="/login?tab=register" className="btn btn-primary !py-2.5 !px-6 !bg-emerald-600 hover:!bg-emerald-700">
            Registrarse
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
