"use client";

import Link from "next/link";
import { MarcaCompleta } from "./Marca";
import { IconoCerrar, IconoMenu } from "./Iconos";
import { useProgreso } from "@/lib/progreso";
import estilos from "./Header.module.css";

interface Props {
  menuAbierto: boolean;
  alternarMenu: () => void;
}

export function Header({ menuAbierto, alternarMenu }: Props) {
  const { estado, resumen, listo } = useProgreso();

  return (
    <header className={estilos.header}>
      <div className={`contenedor ${estilos.fila}`}>
        <Link href="/" className={estilos.marca} aria-label="Inicio — Revoluciones">
          <MarcaCompleta />
        </Link>

        <div className={estilos.derecha}>
          {listo && estado.estudiante && (
            <span className={estilos.estudiante}>
              {estado.estudiante.nombre}
              {estado.estudiante.curso ? ` · ${estado.estudiante.curso}` : ""}
            </span>
          )}

          <p className={estilos.puntaje}>
            <span className={estilos.puntajeEtiqueta}>Puntaje</span>
            <span className={estilos.puntajeValor} aria-live="polite">
              {listo ? resumen.puntaje : 0}
            </span>
          </p>

          <button
            type="button"
            className={estilos.botonMenu}
            onClick={alternarMenu}
            aria-expanded={menuAbierto}
            aria-controls="navegacion-principal"
          >
            {menuAbierto ? <IconoCerrar /> : <IconoMenu />}
            <span className="solo-lectores">
              {menuAbierto ? "Cerrar menú" : "Abrir menú"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
