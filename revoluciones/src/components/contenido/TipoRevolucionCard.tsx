"use client";

import { useState } from "react";
import type { TipoRevolucion } from "@/lib/tipos";
import { IconoMas, IconoMenos } from "../Iconos";
import estilos from "./concepto.module.css";

export function TipoRevolucionCard({ tipo }: { tipo: TipoRevolucion }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <button
      type="button"
      className={estilos.tipo}
      data-abierto={abierto}
      onClick={() => setAbierto((v) => !v)}
      aria-expanded={abierto}
    >
      <span className={estilos.tipoBarra} data-acento={tipo.acento} />
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <span>
          <span className={estilos.tipoNombre} style={{ display: "block" }}>
            {tipo.nombre}
          </span>
          <span className={estilos.tipoCampo} style={{ display: "block" }}>
            {tipo.campo}
          </span>
        </span>
        <span style={{ color: "var(--gris-suave)", flexShrink: 0 }}>
          {abierto ? <IconoMenos tamano={16} /> : <IconoMas tamano={16} />}
        </span>
      </span>

      {abierto && (
        <span className={estilos.tipoCuerpo}>
          <span className={estilos.tipoBloque}>
            <span className={estilos.tipoEtiqueta}>Qué significa</span>
            <span className={estilos.tipoTexto}>{tipo.queEs}</span>
          </span>
          <span className={estilos.tipoBloque}>
            <span className={estilos.tipoEtiqueta}>Un ejemplo</span>
            <span className={estilos.tipoTexto}>{tipo.ejemplo}</span>
          </span>
          <span className={estilos.tipoBloque}>
            <span className={estilos.tipoEtiqueta}>Qué cambió</span>
            <span className={estilos.tipoTexto}>{tipo.queCambio}</span>
          </span>
          <span className={estilos.tipoBloque}>
            <span className={estilos.tipoEtiqueta}>Por qué es revolucionaria</span>
            <span className={estilos.tipoTexto}>{tipo.porQueEsRevolucionaria}</span>
          </span>
        </span>
      )}
    </button>
  );
}
