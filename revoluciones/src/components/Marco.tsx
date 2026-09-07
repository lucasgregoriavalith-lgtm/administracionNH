"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Header } from "./Header";
import { Navegacion } from "./Navegacion";
import { BarraProgreso } from "./BarraProgreso";
import { RECORRIDO } from "@/data/navegacion";
import { useProgreso } from "@/lib/progreso";

/**
 * Marco de la aplicación: header, navegación, barra de recorrido y pie.
 * También registra qué secciones visitó el estudiante.
 */
export function Marco({ children }: { children: React.ReactNode }) {
  const ruta = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { marcarVisitada, listo } = useProgreso();

  useEffect(() => {
    if (!listo) return;
    if (RECORRIDO.some((paso) => paso.href === ruta)) marcarVisitada(ruta);
  }, [ruta, listo, marcarVisitada]);

  // Al cambiar de página se cierra el menú y se vuelve al principio.
  useEffect(() => {
    setMenuAbierto(false);
  }, [ruta]);

  const enPanelDocente = ruta.startsWith("/docente");

  return (
    <>
      <a className="saltar-al-contenido" href="#contenido">
        Saltar al contenido
      </a>
      <Header
        menuAbierto={menuAbierto}
        alternarMenu={() => setMenuAbierto((v) => !v)}
      />
      <Navegacion abierto={menuAbierto} cerrar={() => setMenuAbierto(false)} />
      {!enPanelDocente && <BarraProgreso />}
      <main id="contenido">{children}</main>
      <footer
        style={{
          borderTop: "1px solid var(--borde)",
          padding: "2.5rem 0",
          marginTop: "3rem",
          color: "var(--gris-suave)",
          fontSize: "0.82rem",
        }}
      >
        <div
          className="contenedor"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, maxWidth: "60ch" }}>
            Recurso educativo para 5.º grado. Los contenidos históricos fueron
            redactados a partir de la cronología establecida de cada proceso;
            cuando existe discusión entre historiadores, la aplicación lo indica
            en lugar de presentar una única versión.
          </p>
          <Link
            href="/docente"
            style={{ color: "var(--gris-suave)", textDecoration: "underline" }}
          >
            Panel del docente
          </Link>
        </div>
      </footer>
    </>
  );
}
