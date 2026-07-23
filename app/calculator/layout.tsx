import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Precio | FUMIGUARD - Fumigación Bogotá",
  description: "Calcula el precio de tu fumigación en Bogotá. Cotiza en menos de 1 minuto según el tipo de plaga, metros cuadrados y tipo de propiedad.",
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
