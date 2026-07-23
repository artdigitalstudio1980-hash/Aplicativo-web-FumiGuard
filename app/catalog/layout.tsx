import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Servicios | FUMIGUARD - Fumigación Bogotá",
  description: "Servicios profesionales de fumigación y control de plagas en Bogotá: cucarachas, roedores, termitas, hormigas, mosquitos, desinfección y lavado de tanques.",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
