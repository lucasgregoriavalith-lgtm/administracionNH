"use client";

import { useState } from "react";
import {
  DEFINICION_CENTRAL,
  DEFINICION_PARA_NINOS,
  PALABRAS_DEFINICION,
} from "@/data/concepto";
import estilos from "./concepto.module.css";

/**
 * Definición central con palabras pulsables.
 * La definición se muestra recién después de que el estudiante formuló su
 * hipótesis y comparó revolución, conflicto y guerra.
 */
export function DefinicionCentral() {
  const [abierta, setAbierta] = useState<string | null>(null);
  const conceptoAbierto = PALABRAS_DEFINICION.find((p) => p.id === abierta);

  // La definición se parte en fragmentos para intercalar las palabras pulsables.
  const partes: (string | { id: string; texto: string })[] = [
    "Una revolución es un ",
    { id: "cambio", texto: "cambio" },
    " ",
    { id: "profundo", texto: "profundo" },
    " que transforma una ",
    { id: "sociedad", texto: "sociedad" },
    ". Puede desarrollarse durante un período determinado, durar muchos años hasta completar su ",
    { id: "proceso", texto: "proceso" },
    " o continuar en ",
    { id: "evolucion", texto: "evolución" },
    " hasta nuestros días.",
  ];

  return (
    <div className={estilos.marcoDefinicion}>
      <p className={estilos.definicionTexto}>
        {partes.map((parte, i) =>
          typeof parte === "string" ? (
            <span key={i}>{parte}</span>
          ) : (
            <button
              key={i}
              type="button"
              className={estilos.palabra}
              data-abierta={abierta === parte.id}
              onClick={() => setAbierta(abierta === parte.id ? null : parte.id)}
              aria-expanded={abierta === parte.id}
              aria-controls="glosario-definicion"
            >
              {parte.texto}
            </button>
          ),
        )}
      </p>

      <p className={estilos.explicacionNinos}>{DEFINICION_PARA_NINOS}</p>

      <p className={estilos.pistaPalabras}>
        Las palabras subrayadas se pueden pulsar
      </p>

      {conceptoAbierto && (
        <div className={estilos.glosario} id="glosario-definicion" role="status">
          <h3 className={estilos.glosarioTermino}>{conceptoAbierto.termino}</h3>
          <p style={{ margin: "0 0 0.7rem", color: "var(--gris-texto)" }}>
            {conceptoAbierto.definicion}
          </p>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--gris-suave)" }}>
            {conceptoAbierto.ejemplo}
          </p>
        </div>
      )}

      <p className="solo-lectores">
        Definición completa: {DEFINICION_CENTRAL}
      </p>
    </div>
  );
}
