"use client";

import { COLUMNAS_COMPARADOR, FILAS_COMPARADOR } from "@/data/comparador";
import estilos from "./TablaComparativa.module.css";

/**
 * Tabla comparativa de las tres revoluciones.
 * La fila "¿Qué cambió?" queda destacada porque es la que muestra lo que las
 * tres tienen en común, y las de duración y violencia muestran en qué se
 * diferencian.
 */
export function TablaComparativa() {
  return (
    <div className={estilos.envoltorio}>
      <table className={estilos.tabla}>
        <caption className="solo-lectores">
          Comparación de la independencia de Estados Unidos, la Revolución
          Francesa y la Revolución Industrial según once variables.
        </caption>
        <thead>
          <tr>
            <th scope="col" className={estilos.cabeceraVariable}>
              <span className="solo-lectores">Variable comparada</span>
            </th>
            {COLUMNAS_COMPARADOR.map((columna) => (
              <th scope="col" key={columna.id}>
                <span className={estilos.barraColumna} data-acento={columna.acento} />
                <span className={estilos.nombreColumna}>{columna.nombre}</span>
                <span className={estilos.fechaColumna}>{columna.fecha}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FILAS_COMPARADOR.map((fila) => (
            <tr
              key={fila.id}
              className={`${estilos.fila} ${fila.id === "cambio" ? estilos.destacada : ""}`}
            >
              <th scope="row" className={estilos.variable}>
                {fila.variable}
                <span className={estilos.pista}>{fila.pista}</span>
              </th>
              <td className={estilos.celda}>{fila.eeuu}</td>
              <td className={estilos.celda}>{fila.francia}</td>
              <td className={estilos.celda}>{fila.industrial}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={estilos.aviso}>
        En pantallas chicas la tabla se desplaza hacia los costados.
      </p>
    </div>
  );
}
