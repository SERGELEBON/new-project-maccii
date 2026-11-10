import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "MAC.CI - Organisation d'Aide et de Développement en Côte d'Ivoire",
  description:
    "Œuvrant pour un développement durable et inclusif en Côte d'Ivoire depuis 2015. Éducation, santé communautaire, agriculture durable, autonomisation des femmes, logement social et insertion professionnelle.",
  icons: {
    icon: "/images/logo-maccii.png",
  },
  openGraph: {
    title: "MAC.CI - Organisation d'Aide et de Développement en Côte d'Ivoire",
    description:
      "Œuvrant pour un développement durable et inclusif en Côte d'Ivoire depuis 2015.",
    images: ["/images/hero-education.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
