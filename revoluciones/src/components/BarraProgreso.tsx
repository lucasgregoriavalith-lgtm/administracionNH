"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { RECORRIDO } from "@/data/navegacion";
import { useProgreso } from "@/lib/progreso";
import estilos from "./BarraProgreso.module.css";

/** Barra de recorrido general: el estudiante siempre sabe dónde está. */
export function BarraProgreso() {
  const ruta = usePathname();
  const { estado, listo } = useProgreso();

  const completadas = listo
    ? RECORRIDO.filter((p) => estado.seccionesVisitadas.includes(p.href)).length
    : 0;

  return (
    <section className={estilos.envoltorio} aria-label="Tu recorrido">
      <div className="contenedor">
        <p className={estilos.titulo}>
          Tu recorrido · {completadas} de {RECORRIDO.length}
        </p>
        <ol className={estilos.pista}>
          {RECORRIDO.map((paso, i) => {
            const actual = ruta === paso.href;
            const visitada = listo && estado.seccionesVisitadas.includes(paso.href);
            const situacion = actual ? "actual" : visitada ? "visitada" : "pendiente";
            return (
              <Fragment key={paso.href}>
                {i > 0 && <li className={estilos.union} aria-hidden="true" />}
                <li className={estilos.paso} data-estado={situacion}>
                  <span className={estilos.punto} aria-hidden="true" />
                  <Link
                    href={paso.href}
                    className={estilos.etiqueta}
                    aria-current={actual ? "step" : undefined}
                  >
                    {paso.corta}
                    <span className="solo-lectores">
                      {actual
                        ? " — estás acá"
                        : visitada
                          ? " — ya visitada"
                          : " — pendiente"}
                    </span>
                  </Link>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Barra lineal reutilizable, para resultados por tema. */
export function Medidor({
  valor,
  maximo = 100,
  acento = "azul",
  etiqueta,
}: {
  valor: number;
  maximo?: number;
  acento?: "azul" | "rojo" | "mixto";
  etiqueta?: string;
}) {
  const porcentaje = maximo === 0 ? 0 : Math.min(100, Math.round((valor / maximo) * 100));
  return (
    <div
      className={estilos.medidor}
      role="meter"
      aria-valuenow={porcentaje}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={etiqueta}
    >
      <div
        className={estilos.relleno}
        data-acento={acento}
        style={{ width: `${porcentaje}%` }}
      />
    </div>
  );
}
