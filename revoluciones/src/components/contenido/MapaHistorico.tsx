"use client";

import { useState } from "react";
import { REGIONES_MAPA } from "@/data/comparador";
import { Bandera, type ClaveBandera } from "../Bandera";
import estilos from "./MapaHistorico.module.css";

/**
 * MAPA ESQUEMÁTICO DEL ATLÁNTICO NORTE.
 * Es un esquema, no un mapa cartográfico: las formas están simplificadas a
 * propósito para que se lea con claridad. Sirve para ubicar los tres
 * escenarios de las revoluciones estudiadas, no para medir distancias.
 */
const CONTORNOS: { id: string; nombre: string; d: string; region?: string }[] = [
  {
    id: "america-norte",
    nombre: "América del Norte",
    region: "colonias",
    d: "M4,13 L17,9 L28,11 L33,17 L30,23 L26,27 L24,33 L20,40 L15,44 L11,39 L7,31 L4,22 Z",
  },
  { id: "groenlandia", nombre: "Groenlandia", d: "M34,3 L43,5 L45,11 L38,15 L33,10 Z" },
  {
    id: "europa",
    nombre: "Europa continental",
    region: "francia",
    d: "M49,13 L57,9 L63,12 L67,19 L65,27 L58,32 L52,34 L48,30 L47,24 L48,18 Z",
  },
  { id: "iberia", nombre: "Península ibérica", d: "M45,33 L50,32 L51,38 L46,39 L44,36 Z" },
  {
    id: "gran-bretana-isla",
    nombre: "Gran Bretaña",
    region: "gran-bretana",
    d: "M44,18 L47,17 L48,21 L46,27 L44,25 L43,21 Z",
  },
  { id: "irlanda", nombre: "Irlanda", d: "M40.5,21 L42.8,20.5 L42.8,24.5 L40.5,24.5 Z" },
  { id: "africa", nombre: "Norte de África", d: "M46,42 L58,41 L63,48 L58,58 L48,58 L44,50 Z" },
];

export function MapaHistorico() {
  const [activa, setActiva] = useState<string | null>(null);
  const region = REGIONES_MAPA.find((r) => r.id === activa) ?? null;

  return (
    <div className={estilos.disposicion}>
      <div className={estilos.lienzo}>
        <svg
          viewBox="0 0 72 60"
          className={estilos.svg}
          role="img"
          aria-label="Mapa esquemático del Atlántico Norte con los tres escenarios estudiados: las Trece Colonias en América del Norte, Gran Bretaña y Francia."
        >
          {/* Retícula del océano: refuerza el lenguaje gráfico de líneas. */}
          <defs>
            <pattern id="oceano" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M4,0 L0,0 L0,4" fill="none" stroke="rgba(45,107,255,0.10)" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="72" height="60" fill="url(#oceano)" />

          {CONTORNOS.map((c) => (
            <path
              key={c.id}
              d={c.d}
              className={`${estilos.tierra} ${
                c.region && c.region === activa ? estilos.tierraActiva : ""
              }`}
            >
              <title>{c.nombre}</title>
            </path>
          ))}

          {REGIONES_MAPA.map((r) => (
            <g
              key={r.id}
              className={estilos.marcador}
              data-activo={activa === r.id}
              data-acento={r.acento}
              onClick={() => setActiva(activa === r.id ? null : r.id)}
              role="button"
              tabIndex={0}
              aria-pressed={activa === r.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiva(activa === r.id ? null : r.id);
                }
              }}
            >
              <title>{r.nombre}</title>
              <circle className="halo" cx={r.x} cy={r.y} r={activa === r.id ? 3.4 : 2.6} />
              <circle className="centro" cx={r.x} cy={r.y} r="1.15" />
            </g>
          ))}
        </svg>
        <p className={estilos.leyenda}>
          Mapa esquemático: las formas están simplificadas para facilitar la
          lectura y no representan contornos exactos. Tocá uno de los tres puntos
          para ver la información.
        </p>
      </div>

      <div>
        {region ? (
          <div className={estilos.ficha} data-acento={region.acento}>
            <Bandera clave={region.bandera as ClaveBandera} ancho={78} />
            <h3 className={estilos.fichaNombre}>{region.nombre}</h3>
            <p className={estilos.fichaHistorico}>{region.nombreHistorico}</p>

            <p className={estilos.fichaDato}>Período</p>
            <p className={`${estilos.fichaValor} mono`}>{region.periodo}</p>

            <p className={estilos.fichaDato}>Revolución estudiada</p>
            <p className={estilos.fichaValor}>{region.revolucion}</p>

            <p className={estilos.fichaTexto}>{region.explicacion}</p>
          </div>
        ) : (
          <div className={estilos.fichaVacia}>
            <p style={{ margin: 0 }}>
              Elegí uno de los tres territorios marcados en el mapa para ver su
              bandera histórica, el período y la revolución que estudiaste.
            </p>
          </div>
        )}

        <div className={estilos.botonera}>
          {REGIONES_MAPA.map((r) => (
            <button
              key={r.id}
              type="button"
              className={estilos.chip}
              data-activo={activa === r.id}
              onClick={() => setActiva(activa === r.id ? null : r.id)}
            >
              {r.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
