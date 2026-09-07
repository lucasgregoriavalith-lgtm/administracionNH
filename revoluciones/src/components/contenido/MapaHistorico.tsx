"use client";

import { useState } from "react";
import { REGIONES_MAPA } from "@/data/comparador";
import { Bandera, type ClaveBandera } from "../Bandera";
import estilos from "./MapaHistorico.module.css";

/* ===========================================================================
   ESQUEMA DEL ATLÁNTICO NORTE
   No es un mapa cartográfico y no pretende serlo: es un esquema de
   territorios y relaciones. Se eligió así por dos razones.
   1) Un mapa dibujado a mano y muy simplificado enseña peor que un esquema
      claro, y además puede dejar ideas equivocadas sobre tamaños y formas.
   2) Un esquema puede mostrar algo que un mapa no muestra: la relación entre
      los tres territorios (quién dependía de quién, quién se alió con quién),
      que es justamente lo que el estudiante acaba de estudiar.
   =========================================================================== */

interface Territorio {
  id: string;
  nombre: string;
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

const TERRITORIOS: Territorio[] = [
  { id: "colonias", nombre: "América del Norte", x: 5, y: 9, ancho: 26, alto: 38 },
  { id: "gran-bretana", nombre: "Gran Bretaña", x: 60, y: 8, ancho: 17, alto: 16 },
  { id: "francia", nombre: "Europa", x: 57, y: 28, ancho: 36, alto: 20 },
];

/** Relaciones históricas entre los tres territorios. */
const VINCULOS = [
  {
    id: "dominio",
    desde: { x: 27, y: 22 },
    hasta: { x: 60, y: 15 },
    etiqueta: "Dominio británico",
    acento: "rojo" as const,
  },
  {
    id: "alianza",
    desde: { x: 27, y: 33 },
    hasta: { x: 57, y: 37 },
    etiqueta: "Alianza de 1778",
    acento: "azul" as const,
  },
];

export function MapaHistorico() {
  const [activa, setActiva] = useState<string | null>(null);
  const region = REGIONES_MAPA.find((r) => r.id === activa) ?? null;

  const alternar = (id: string) => setActiva(activa === id ? null : id);

  return (
    <div className={estilos.disposicion}>
      <div className={estilos.lienzo}>
        <svg
          viewBox="0 0 100 56"
          className={estilos.svg}
          role="img"
          aria-label="Esquema del Atlántico Norte con los tres territorios estudiados: las Trece Colonias en América del Norte, Gran Bretaña y Francia dentro de Europa, y las relaciones entre ellos."
        >
          <defs>
            <pattern id="agua" width="3" height="3" patternUnits="userSpaceOnUse">
              <path
                d="M0,3 L3,0"
                fill="none"
                stroke="rgba(45,107,255,0.16)"
                strokeWidth="0.25"
              />
            </pattern>
          </defs>

          {/* El océano que separa los dos lados de la historia. */}
          <rect x="33" y="4" width="22" height="48" fill="url(#agua)" />
          <text
            className={estilos.etiquetaOceano}
            x="44"
            y="51"
            textAnchor="middle"
          >
            OCÉANO ATLÁNTICO
          </text>

          {/* Vínculos históricos entre territorios. */}
          {VINCULOS.map((v) => (
            <g key={v.id} className={estilos.vinculo} data-acento={v.acento}>
              <path
                d={`M${v.desde.x},${v.desde.y} C${v.desde.x + 12},${v.desde.y} ${v.hasta.x - 12},${v.hasta.y} ${v.hasta.x},${v.hasta.y}`}
                fill="none"
              />
              <text
                className={estilos.etiquetaVinculo}
                x={44}
                y={(v.desde.y + v.hasta.y) / 2 - 1.6}
                textAnchor="middle"
              >
                {v.etiqueta}
              </text>
            </g>
          ))}

          {/* Territorios. */}
          {TERRITORIOS.map((t) => (
            <g
              key={t.id}
              className={estilos.territorio}
              data-activo={activa === t.id}
              onClick={() => alternar(t.id)}
              role="button"
              tabIndex={0}
              aria-pressed={activa === t.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  alternar(t.id);
                }
              }}
            >
              <title>{t.nombre}</title>
              <rect x={t.x} y={t.y} width={t.ancho} height={t.alto} rx="1" />
              <text
                className={estilos.etiquetaTerritorio}
                x={t.x + 2}
                y={t.y + 4.2}
              >
                {t.nombre.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Marcadores de las tres revoluciones estudiadas. */}
          {REGIONES_MAPA.map((r) => (
            <g
              key={r.id}
              className={estilos.marcador}
              data-activo={activa === r.id}
              data-acento={r.acento}
              onClick={() => alternar(r.id)}
              role="button"
              tabIndex={0}
              aria-pressed={activa === r.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  alternar(r.id);
                }
              }}
            >
              <title>{r.nombre}</title>
              <circle
                className={estilos.halo}
                cx={r.x}
                cy={r.y}
                r={activa === r.id ? 4.2 : 3.2}
              />
              <circle className={estilos.centro} cx={r.x} cy={r.y} r="1.4" />
              <text
                className={estilos.etiquetaMarcador}
                x={r.x}
                y={r.y + 7.4}
                textAnchor="middle"
              >
                {r.id === "colonias"
                  ? "Trece Colonias"
                  : r.id === "francia"
                    ? "Francia"
                    : "Gran Bretaña"}
              </text>
            </g>
          ))}
        </svg>

        <p className={estilos.leyenda}>
          Esquema, no mapa: los territorios se representan como bloques para que
          se vean con claridad las relaciones entre ellos. Tocá un bloque o un
          punto para ver la información.
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
              Elegí uno de los tres territorios para ver su bandera histórica, el
              período y la revolución que estudiaste.
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
              onClick={() => alternar(r.id)}
            >
              {r.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
