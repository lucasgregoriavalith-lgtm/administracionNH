"use client";

import { NOMBRE_TEMA } from "@/lib/tipos";
import { planDeRepaso, type Resumen } from "@/lib/puntaje";
import estilos from "./progreso.module.css";

/** Lista personalizada de conceptos a repasar, según los resultados. */
export function PlanDeRepaso({ resumen }: { resumen: Resumen }) {
  const plan = planDeRepaso(resumen);

  if (plan.length === 0) {
    return (
      <p style={{ color: "var(--gris-texto)", maxWidth: "68ch" }}>
        Alcanzaste al menos un 75 % en los cuatro temas, así que no hay ningún
        contenido que necesites repasar de manera urgente. Si querés seguir,
        volvé a la sección de comparación y probá responder las preguntas
        abiertas del final con tus propias palabras.
      </p>
    );
  }

  return (
    <div className={estilos.repaso}>
      {plan.map((bloque) => (
        <div key={bloque.tema} className={estilos.bloqueRepaso}>
          <h3 className={estilos.tituloRepaso}>{NOMBRE_TEMA[bloque.tema]}</h3>
          <ul className={estilos.listaRepaso}>
            {bloque.puntos.map((punto) => (
              <li key={punto}>{punto}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
