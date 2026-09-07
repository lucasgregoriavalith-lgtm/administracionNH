"use client";

import { useProgreso } from "@/lib/progreso";
import { Cifra } from "../ui";
import estilos from "./progreso.module.css";

/** Marcador con los números del recorrido. */
export function ScoreBoard() {
  const { resumen, listo } = useProgreso();
  if (!listo) return null;

  return (
    <div className={estilos.marcador}>
      <div className={estilos.celdaMarcador}>
        <Cifra valor={String(resumen.puntaje)} etiqueta="Puntaje" />
      </div>
      <div className={estilos.celdaMarcador}>
        <Cifra
          valor={`${resumen.correctas}/${resumen.total}`}
          etiqueta="Respuestas correctas"
        />
      </div>
      <div className={estilos.celdaMarcador}>
        <Cifra valor={`${resumen.porcentaje}%`} etiqueta="Porcentaje" />
      </div>
      <div className={estilos.celdaMarcador}>
        <Cifra valor={String(resumen.incorrectas)} etiqueta="Para repasar" />
      </div>
    </div>
  );
}
