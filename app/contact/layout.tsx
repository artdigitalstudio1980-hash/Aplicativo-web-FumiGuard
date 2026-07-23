import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | FUMIGUARD - Fumigación Bogotá",
  description: "Contáctanos para cotizar tu servicio de fumigación en Bogotá. WhatsApp, email y formulario online.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
