"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVEGACION } from "@/data/navegacion";
import { useProgreso } from "@/lib/progreso";
import estilos from "./Navegacion.module.css";

export function Navegacion({
  abierto,
  cerrar,
}: {
  abierto: boolean;
  cerrar: () => void;
}) {
  const ruta = usePathname();
  const { estado, listo } = useProgreso();

  return (
    <nav
      id="navegacion-principal"
      className={estilos.nav}
      data-abierto={abierto}
      aria-label="Secciones de la aplicación"
    >
      <div className={estilos.envoltura}>
        <ul className={estilos.lista}>
          {NAVEGACION.map((entrada) => {
            const activa = ruta === entrada.href;
            const visitada =
              listo && estado.seccionesVisitadas.includes(entrada.href) && !activa;
            return (
              <li key={entrada.href}>
                <Link
                  href={entrada.href}
                  onClick={cerrar}
                  className={`${estilos.enlace} ${visitada ? estilos.completada : ""}`}
                  aria-current={activa ? "page" : undefined}
                >
                  {entrada.etiqueta}
                  {visitada && <span className="solo-lectores"> (ya visitada)</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
