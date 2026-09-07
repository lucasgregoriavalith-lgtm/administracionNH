"use client";

import { useState } from "react";
import type { Opcion, Pregunta } from "@/lib/tipos";
import { useProgreso } from "@/lib/progreso";
import { INTENTOS_MAXIMOS, calcularPuntos, mismasOpciones } from "@/lib/puntaje";
import { Boton } from "../ui";
import { IconoCorrecto, IconoIncorrecto, IconoReiniciar } from "../Iconos";
import { Devolucion, type Tono } from "./Devolucion";
import estilos from "./actividades.module.css";

const ID_NINGUNA = "__ninguna__";

interface Props {
  pregunta: Pregunta;
  /** Numeración opcional: "Pregunta 3 de 18". */
  contador?: string;
  /** Se llama después de comprobar, con el resultado. */
  alResolver?: (correcta: boolean) => void;
  /** Texto del botón cuando ya está resuelta. */
  accionFinal?: React.ReactNode;
}

export function OpcionMultiple({
  pregunta,
  contador,
  alResolver,
  accionFinal,
}: Props) {
  const { registrar, respuestaDe, listo } = useProgreso();
  const [elegidas, setElegidas] = useState<string[]>([]);
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const yaRegistrada = listo ? respuestaDe(pregunta.id) : undefined;
  const multiple = pregunta.tipo === "opcion-multiple";

  const opciones: Opcion[] = pregunta.admiteNinguna
    ? [
        ...pregunta.opciones,
        {
          id: ID_NINGUNA,
          texto: "Ninguna de estas me convence del todo.",
          devolucion:
            "Es una respuesta válida y honesta. Guardá esa duda: en las próximas pantallas vamos a construir juntos una definición más precisa.",
        },
      ]
    : pregunta.opciones;

  function alternar(id: string) {
    if (comprobado) return;
    if (!multiple) {
      setElegidas([id]);
      return;
    }
    // "Ninguna" es excluyente respecto de las demás.
    if (id === ID_NINGUNA) {
      setElegidas(elegidas.includes(ID_NINGUNA) ? [] : [ID_NINGUNA]);
      return;
    }
    const sinNinguna = elegidas.filter((e) => e !== ID_NINGUNA);
    setElegidas(
      sinNinguna.includes(id)
        ? sinNinguna.filter((e) => e !== id)
        : [...sinNinguna, id],
    );
  }

  const acertada = mismasOpciones(elegidas, pregunta.correctas);
  // "Parcial": eligió solo respuestas correctas, pero le faltó alguna.
  const parcial =
    multiple &&
    !acertada &&
    elegidas.length > 0 &&
    elegidas.every((e) => pregunta.correctas.includes(e));

  function comprobar() {
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setComprobado(true);
    registrar({
      actividadId: pregunta.id,
      tema: pregunta.tema,
      correcta: acertada,
      intentos: nuevoIntento,
    });
    alResolver?.(acertada);
  }

  function reintentar() {
    setComprobado(false);
    setElegidas([]);
  }

  const puedeReintentar = comprobado && !acertada && intentos < INTENTOS_MAXIMOS;
  const tono: Tono = acertada ? "correcta" : parcial ? "parcial" : "incorrecta";

  function resultadoDe(id: string): string | undefined {
    if (!comprobado) return undefined;
    const esCorrecta = pregunta.correctas.includes(id);
    const fueElegida = elegidas.includes(id);
    if (fueElegida && esCorrecta) return "acierto";
    if (fueElegida && !esCorrecta) return "fallo";
    if (!fueElegida && esCorrecta) return "omitida";
    return undefined;
  }

  const ETIQUETAS: Record<string, string> = {
    acierto: "Elegiste esta y es correcta",
    fallo: "Elegiste esta y no es correcta",
    omitida: "No la elegiste, pero también era correcta",
  };

  return (
    <div className={estilos.actividad}>
      <div className={estilos.cabecera}>
        {contador && <p className={estilos.contador}>{contador}</p>}
        {yaRegistrada && !comprobado && (
          <p className={estilos.resuelta}>
            {yaRegistrada.correcta ? <IconoCorrecto tamano={14} /> : <IconoIncorrecto tamano={14} />}
            Ya respondida
          </p>
        )}
      </div>

      <h3 className={estilos.enunciado}>{pregunta.enunciado}</h3>
      <p className={estilos.ayuda}>
        {pregunta.ayuda ??
          (multiple
            ? "Puede haber más de una respuesta correcta."
            : "Elegí una opción.")}
      </p>

      <ul className={estilos.opciones}>
        {opciones.map((opcion) => {
          const resultado = resultadoDe(opcion.id);
          const elegida = elegidas.includes(opcion.id);
          return (
            <li key={opcion.id}>
              <button
                type="button"
                className={estilos.opcion}
                data-elegida={elegida && !comprobado}
                data-resultado={resultado}
                onClick={() => alternar(opcion.id)}
                disabled={comprobado}
                aria-pressed={elegida}
              >
                <span
                  className={`${estilos.marca} ${multiple ? "" : estilos.marcaRedonda}`}
                  aria-hidden="true"
                >
                  {resultado === "fallo" ? (
                    <IconoIncorrecto tamano={13} />
                  ) : (
                    <IconoCorrecto tamano={13} />
                  )}
                </span>
                <span className={estilos.textoOpcion}>
                  {opcion.texto}
                  {resultado && (
                    <span className={estilos.etiquetaEstado}>
                      {ETIQUETAS[resultado]}
                    </span>
                  )}
                  {comprobado && opcion.devolucion && (
                    <span className={estilos.devolucionOpcion}>
                      {opcion.devolucion}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={estilos.acciones}>
        {!comprobado && (
          <Boton
            variante="primario"
            onClick={comprobar}
            disabled={elegidas.length === 0}
          >
            Comprobar respuesta
          </Boton>
        )}
        {puedeReintentar && (
          <Boton variante="contorno" onClick={reintentar}>
            <IconoReiniciar tamano={16} />
            Intentar otra vez
          </Boton>
        )}
        {comprobado && accionFinal}
      </div>

      {comprobado && (
        <Devolucion
          tono={tono}
          puntos={calcularPuntos(intentos, acertada)}
          titulo={parcial ? "Vas bien, pero falta algo" : undefined}
        >
          <p style={{ margin: 0 }}>{pregunta.explicacion}</p>
          {parcial && (
            <p style={{ margin: "0.6rem 0 0" }}>
              Lo que elegiste es correcto, pero había más de una respuesta válida.
              Mirá las opciones marcadas como &laquo;también era correcta&raquo;.
            </p>
          )}
          {!acertada && intentos >= INTENTOS_MAXIMOS && (
            <p style={{ margin: "0.6rem 0 0" }}>
              Las respuestas correctas quedaron señaladas arriba. Podés seguir
              adelante: lo importante es entender el porqué.
            </p>
          )}
        </Devolucion>
      )}
    </div>
  );
}
