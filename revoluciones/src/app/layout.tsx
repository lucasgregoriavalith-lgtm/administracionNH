import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { ProveedorProgreso } from "@/lib/progreso";
import { Marco } from "@/components/Marco";
import "./globals.css";

/* Las tipografías se descargan en el momento de compilar y se sirven desde el
   mismo dominio de la aplicación. Así el navegador del estudiante no hace
   ninguna petición a un servidor externo mientras usa la aplicación. */
const tituloFuente = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--fuente-titulo-cargada",
});

const textoFuente = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--fuente-texto-cargada",
});

const monoFuente = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--fuente-mono-cargada",
});

export const metadata: Metadata = {
  title: {
    default: "Revoluciones — Centro de exploración",
    template: "%s · Revoluciones",
  },
  description:
    "Experiencia educativa interactiva sobre las revoluciones para 5.º grado: qué es una revolución, la independencia de Estados Unidos, la Revolución Francesa y la Revolución Industrial.",
  applicationName: "Revoluciones",
  openGraph: {
    title: "Revoluciones — Cuando una sociedad cambia profundamente",
    description:
      "Recorrido interactivo sobre el concepto de revolución y tres grandes procesos históricos.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${tituloFuente.variable} ${textoFuente.variable} ${monoFuente.variable}`}
    >
      <body>
        <ProveedorProgreso>
          <Marco>{children}</Marco>
        </ProveedorProgreso>
      </body>
    </html>
  );
}
