"use client";

import { useState } from "react";
import type { CasoRevolucion as Caso, Veredicto } from "@/data/otrasRevoluciones";
import { useProgreso } from "@/lib/progreso";
import { calcularPuntos } from "@/lib/puntaje";
import { Devolucion } from "./Devolucion";
import estilos from "./CasoRevolucion.module.css";

const OPCIONES: { id: Veredicto; texto: string }[] = [
  { id: "si", texto: "Sí" },
  { id: "no", texto: "No" },
  { id: "depende", texto: "Depende" },
];

/**
 * "¿Esto podría considerarse una revolución?"
 * Varios casos son deliberadamente discutibles. Por eso, cuando el estudiante
 * elige "Depende" y la respuesta esperada era otra, la devolución reconoce que
 * la duda es razonable en lugar de descalificarla.
 */
export function CasoRevolucion({ caso }: { caso: Caso }) {
  const { registrar } = useProgreso();
  const [elegida, setElegida] = useState<Veredicto | null>(null);

  function responder(id: Veredicto) {
    if (elegida !== null) return;
    setElegida(id);
    registrar({
      actividadId: `caso:${caso.id}`,
      tema: "concepto",
      correcta: id === caso.veredicto,
      intentos: 1,
    });
  }

  const acerto = elegida === caso.veredicto;
  const dudoRazonablemente = elegida === "depende" && !acerto;

  return (
    <article className={estilos.caso} data-acento={caso.acento}>
      <p className={estilos.campo}>{caso.campo}</p>
      <h3 className={estilos.titulo}>{caso.titulo}</h3>
      <p className={estilos.situacion}>{caso.situacion}</p>

      <p className={estilos.pregunta}>¿Esto podría considerarse una revolución?</p>

      <div className={estilos.opciones}>
        {OPCIONES.map((opcion) => {
          let resultado: string | undefined;
          if (elegida !== null) {
            if (elegida === opcion.id) resultado = acerto ? "acierto" : "fallo";
            else if (opcion.id === caso.veredicto) resultado = "era-esta";
          }
          return (
            <button
              key={opcion.id}
              type="button"
              className={estilos.opcion}
              data-elegida={elegida === opcion.id}
              data-resultado={resultado}
              onClick={() => responder(opcion.id)}
              disabled={elegida !== null}
            >
              {opcion.texto}
              {resultado === "acierto" && (
                <span className={estilos.marcaOpcion}>Tu respuesta</span>
              )}
              {resultado === "fallo" && (
                <span className={estilos.marcaOpcion}>Tu respuesta</span>
              )}
              {resultado === "era-esta" && (
                <span className={estilos.marcaOpcion}>Mejor fundada</span>
              )}
            </button>
          );
        })}
      </div>

      {elegida !== null && (
        <>
          <Devolucion
            tono={acerto ? "correcta" : dudoRazonablemente ? "parcial" : "incorrecta"}
            puntos={calcularPuntos(1, acerto)}
            titulo={
              acerto
                ? "Bien razonado"
                : dudoRazonablemente
                  ? "Es razonable dudar"
                  : "Mirémoslo de nuevo"
            }
          >
            {dudoRazonablemente && (
              <p style={{ margin: "0 0 0.6rem" }}>
                Dudar en este caso tiene sentido. Aun así, mirando el criterio de
                abajo, la respuesta mejor fundada es otra.
              </p>
            )}
            <p style={{ margin: 0 }}>{caso.explicacion}</p>
          </Devolucion>
          <p className={estilos.criterio}>
            <span className={estilos.criterioTitulo}>Cómo decidirlo</span>
            {caso.criterio}
          </p>
        </>
      )}
    </article>
  );
}
