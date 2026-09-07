"use client";

import { NOMBRE_TEMA, type Tema } from "@/lib/tipos";
import { TEMAS, dominio, type Resumen } from "@/lib/puntaje";
import { Medidor } from "../BarraProgreso";
import estilos from "./progreso.module.css";

function estadoDe(nivel: number | null): string {
  if (nivel === null) return "Sin practicar";
  if (nivel >= 90) return "Dominado";
  if (nivel >= 75) return "Bien afianzado";
  if (nivel >= 50) return "En camino";
  return "Para repasar";
}

/** Barras de dominio por tema. Nunca dependen solo del color: llevan cifra y texto. */
export function ResultadosPorTema({ resumen }: { resumen: Resumen }) {
  return (
    <div className={estilos.temas}>
      {TEMAS.map((tema: Tema) => {
        const resultado = resumen.porTema[tema];
        const nivel = dominio(resultado);
        return (
          <div key={tema} className={estilos.tema}>
            <div className={estilos.temaFila}>
              <p className={estilos.temaNombre}>{NOMBRE_TEMA[tema]}</p>
              <p className={estilos.temaCifra}>
                {resultado.total === 0
                  ? "—"
                  : `${resultado.correctas}/${resultado.total} · ${nivel}%`}
              </p>
            </div>
            <Medidor
              valor={nivel ?? 0}
              acento={nivel !== null && nivel >= 75 ? "azul" : "rojo"}
              etiqueta={`${NOMBRE_TEMA[tema]}: ${nivel ?? 0} por ciento`}
            />
            <p className={estilos.temaEstado}>{estadoDe(nivel)}</p>
          </div>
        );
      })}
    </div>
  );
}
