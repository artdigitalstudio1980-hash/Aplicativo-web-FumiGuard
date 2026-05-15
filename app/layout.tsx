import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingChatWidget from "../components/FloatingChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fumiguard | Control de Plagas Premium",
  description: "Servicio especializado de fumigación y control de plagas. Expertos en cucarachas, roedores, termitas y más con tecnología avanzada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
        <FloatingChatWidget />
        <Footer />
      </body>
    </html>
  );
}
