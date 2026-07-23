import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingChatWidget from "../components/FloatingChatWidget";
import ScrollObserver from "../components/ScrollObserver";
import BackToTop from "../components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "FUMIGUARD | Control de Plagas Premium en Bogotá",
    template: "%s | FUMIGUARD",
  },
  description:
    "Expertos en fumigación y control de plagas en Bogotá. Servicios certificados para hogar, comercio e industria. Cucarachas, roedores, termitas y más. Cotiza online.",
  keywords: [
    "fumigación Bogotá",
    "control de plagas",
    "fumigación cucarachas",
    "fumigación termitas",
    "control roedores",
    "fumigación industrial",
    "certificado INVIMA",
    "FUMIGUARD",
  ],
  authors: [{ name: "FUMIGUARD" }],
  creator: "FUMIGUARD",
  publisher: "FUMIGUARD",
  metadataBase: new URL("https://fumiguard.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "FUMIGUARD",
    title: "FUMIGUARD | Control de Plagas Premium en Bogotá",
    description:
      "Expertos en fumigación y control de plagas. Certificación INVIMA, garantía por escrito y cotización online.",
    url: "https://fumiguard.com",
    images: [
      {
        url: "/img/logo.svg",
        width: 400,
        height: 120,
        alt: "FUMIGUARD - Guardianes de tu espacio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUMIGUARD | Control de Plagas Premium",
    description:
      "Expertos en fumigación y control de plagas en Bogotá. Certificación INVIMA y garantía por escrito.",
    images: ["/img/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  category: "pest control",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://fumiguard.jorpat-art.com",
  name: "FUMIGUARD",
  description: "Expertos en fumigación y control de plagas en Bogotá. Técnicos certificados, garantía escrita.",
  url: "https://fumiguard.jorpat-art.com",
  telephone: "+57-320-554-0495",
  email: "contacto@fumiguard.com",
  foundingDate: "2010",
  areaServed: [
    { "@type": "City", name: "Bogotá" },
    { "@type": "City", name: "Chía" },
    { "@type": "City", name: "Cota" },
    { "@type": "City", name: "Soacha" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  image: "https://fumiguard.jorpat-art.com/img/logo.svg",
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "5000",
  },
  priceRange: "$180,000+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollObserver />
        <Navbar />
        <main>
          {children}
        </main>
        <BackToTop />
        <FloatingChatWidget />
        <Footer />
      </body>
    </html>
  );
}
