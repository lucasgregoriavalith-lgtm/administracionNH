"use client";

import { useState } from "react";
import type { Pregunta } from "@/lib/tipos";
import { OpcionMultiple } from "./OpcionMultiple";
import { VerdaderoFalso } from "./VerdaderoFalso";
import { Boton } from "../ui";
import { IconoFlecha } from "../Iconos";
import { Medidor } from "../BarraProgreso";

/**
 * Contenedor de una serie de preguntas. Muestra una por vez para que el
 * estudiante lea la devolución antes de pasar a la siguiente.
 */
export function Quiz({
  preguntas,
  titulo,
  alTerminar,
  etiquetaFinal = "Terminar",
}: {
  preguntas: Pregunta[];
  titulo?: string;
  alTerminar?: () => void;
  etiquetaFinal?: string;
}) {
  const [indice, setIndice] = useState(0);
  const [resueltas, setResueltas] = useState<Record<number, boolean>>({});

  const pregunta = preguntas[indice];
  const esUltima = indice === preguntas.length - 1;
  const yaResuelta = resueltas[indice] !== undefined;

  function avanzar() {
    if (esUltima) {
      alTerminar?.();
      return;
    }
    setIndice((i) => i + 1);
  }

  const accionFinal = (
    <Boton variante={esUltima ? "acento" : "azul"} onClick={avanzar}>
      {esUltima ? etiquetaFinal : "Siguiente pregunta"}
      <IconoFlecha />
    </Boton>
  );

  const contador = `${titulo ? `${titulo} · ` : ""}Pregunta ${indice + 1} de ${preguntas.length}`;
  const Componente =
    pregunta.tipo === "verdadero-falso" ? VerdaderoFalso : OpcionMultiple;

  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <Medidor
          valor={Object.keys(resueltas).length}
          maximo={preguntas.length}
          acento="mixto"
          etiqueta={`Progreso: ${Object.keys(resueltas).length} de ${preguntas.length} preguntas`}
        />
      </div>

      <Componente
        key={pregunta.id}
        pregunta={pregunta}
        contador={contador}
        alResolver={(correcta) =>
          setResueltas((previo) => ({ ...previo, [indice]: correcta }))
        }
        accionFinal={accionFinal}
      />

      {!yaResuelta && indice > 0 && (
        <p style={{ marginTop: "1rem" }}>
          <Boton variante="discreto" onClick={() => setIndice((i) => i - 1)}>
            Volver a la pregunta anterior
          </Boton>
        </p>
      )}
    </div>
  );
}
