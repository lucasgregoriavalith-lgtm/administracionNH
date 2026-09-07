"use client";

import { useState } from "react";
import type { Pregunta } from "@/lib/tipos";
import { useProgreso } from "@/lib/progreso";
import { INTENTOS_MAXIMOS, calcularPuntos } from "@/lib/puntaje";
import { Boton } from "../ui";
import { IconoCorrecto, IconoIncorrecto, IconoReiniciar } from "../Iconos";
import { Devolucion } from "./Devolucion";
import comunes from "./actividades.module.css";
import estilos from "./VerdaderoFalso.module.css";

interface Props {
  pregunta: Pregunta;
  contador?: string;
  alResolver?: (correcta: boolean) => void;
  accionFinal?: React.ReactNode;
}

export function VerdaderoFalso({
  pregunta,
  contador,
  alResolver,
  accionFinal,
}: Props) {
  const { registrar } = useProgreso();
  const [elegida, setElegida] = useState<string | null>(null);
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const correcta = elegida !== null && pregunta.correctas.includes(elegida);

  function comprobar() {
    if (elegida === null) return;
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setComprobado(true);
    registrar({
      actividadId: pregunta.id,
      tema: pregunta.tema,
      correcta,
      intentos: nuevoIntento,
    });
    alResolver?.(correcta);
  }

  function resultadoDe(id: string) {
    if (!comprobado) return undefined;
    const esLaCorrecta = pregunta.correctas.includes(id);
    if (elegida === id) return esLaCorrecta ? "acierto" : "fallo";
    if (esLaCorrecta) return "correcta-no-elegida";
    return undefined;
  }

  const ETIQUETAS: Record<string, string> = {
    acierto: "Tu respuesta · correcta",
    fallo: "Tu respuesta · incorrecta",
    "correcta-no-elegida": "Esta era la correcta",
  };

  const puedeReintentar = comprobado && !correcta && intentos < INTENTOS_MAXIMOS;

  return (
    <div className={comunes.actividad}>
      <div className={comunes.cabecera}>
        {contador && <p className={comunes.contador}>{contador}</p>}
      </div>
      <h3 className={comunes.enunciado}>{pregunta.enunciado}</h3>
      <p className={comunes.ayuda}>¿Es verdadero o falso?</p>

      <div className={estilos.botonera}>
        {pregunta.opciones.map((opcion) => {
          const resultado = resultadoDe(opcion.id);
          return (
            <button
              key={opcion.id}
              type="button"
              className={estilos.opcion}
              data-resultado={resultado}
              onClick={() => !comprobado && setElegida(opcion.id)}
              disabled={comprobado}
              aria-pressed={elegida === opcion.id}
              style={
                elegida === opcion.id && !comprobado
                  ? { borderColor: "var(--azul)", background: "var(--azul-velo)" }
                  : undefined
              }
            >
              {opcion.texto}
              {resultado && (
                <span className={estilos.marcaEstado}>{ETIQUETAS[resultado]}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className={comunes.acciones}>
        {!comprobado && (
          <Boton variante="primario" onClick={comprobar} disabled={elegida === null}>
            Comprobar respuesta
          </Boton>
        )}
        {puedeReintentar && (
          <Boton
            variante="contorno"
            onClick={() => {
              setComprobado(false);
              setElegida(null);
            }}
          >
            <IconoReiniciar tamano={16} />
            Intentar otra vez
          </Boton>
        )}
        {comprobado && accionFinal}
      </div>

      {comprobado && (
        <Devolucion
          tono={correcta ? "correcta" : "incorrecta"}
          puntos={calcularPuntos(intentos, correcta)}
        >
          <p style={{ margin: 0 }}>{pregunta.explicacion}</p>
        </Devolucion>
      )}
    </div>
  );
}
