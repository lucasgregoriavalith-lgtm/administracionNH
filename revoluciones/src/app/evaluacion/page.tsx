"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CLASIFICAR_EVALUACION,
  ORDENAR_EVALUACION,
  PREGUNTAS_EVALUACION,
  RELACIONAR_EVALUACION,
} from "@/data/evaluacion";
import { useProgreso } from "@/lib/progreso";
import { Quiz } from "@/components/actividades/Quiz";
import { Ordenar } from "@/components/actividades/Ordenar";
import { Clasificar } from "@/components/actividades/Clasificar";
import { Relacionar } from "@/components/actividades/Relacionar";
import { StudentProfile } from "@/components/progreso/StudentProfile";
import { Boton, Panel, Seccion } from "@/components/ui";
import { IconoFlecha } from "@/components/Iconos";
import { Medidor } from "@/components/BarraProgreso";

const ETAPAS = [
  "Preguntas",
  "Ordenar",
  "Clasificar",
  "Relacionar",
] as const;

export default function PaginaEvaluacion() {
  const router = useRouter();
  const { estado, listo, completarEvaluacion } = useProgreso();
  const [etapa, setEtapa] = useState(0);

  function siguienteEtapa() {
    if (etapa < ETAPAS.length - 1) {
      setEtapa((e) => e + 1);
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  }

  function terminar() {
    completarEvaluacion();
    router.push("/resultados");
  }

  // Sin nombre no se puede guardar el resultado, así que se pide primero.
  if (listo && !estado.estudiante) {
    return (
      <Seccion
        etiqueta="Evaluación final"
        titulo="Antes de empezar, decinos quién sos"
        acento="rojo"
        guia={
          <p>
            La evaluación registra tu puntaje y te arma al final una lista
            personalizada de temas para repasar. Para eso necesita un nombre.
          </p>
        }
      >
        <Panel acento="rojo">
          <StudentProfile />
        </Panel>
      </Seccion>
    );
  }

  return (
    <Seccion
      etiqueta="Evaluación final"
      titulo="Cuánto entendiste sobre las revoluciones"
      acento="rojo"
      guia={
        <p>
          Cuatro etapas: dieciocho preguntas y tres actividades. Casi ninguna
          pregunta es de memoria pura: la mayoría te pide relacionar y comparar.
          Como en todo el recorrido, equivocarse no resta puntos.
        </p>
      }
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          className="mono"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--gris-suave)",
            marginBottom: "0.5rem",
          }}
        >
          Etapa {etapa + 1} de {ETAPAS.length} · {ETAPAS[etapa]}
        </p>
        <Medidor
          valor={etapa}
          maximo={ETAPAS.length}
          acento="mixto"
          etiqueta={`Etapa ${etapa + 1} de ${ETAPAS.length}`}
        />
      </div>

      {etapa === 0 && (
        <Quiz
          preguntas={PREGUNTAS_EVALUACION}
          titulo="Evaluación"
          etiquetaFinal="Pasar a la etapa de ordenar"
          alTerminar={siguienteEtapa}
        />
      )}

      {etapa === 1 && (
        <div>
          <Ordenar
            id={ORDENAR_EVALUACION.id}
            consigna={ORDENAR_EVALUACION.consigna}
            items={ORDENAR_EVALUACION.items}
            explicacion={ORDENAR_EVALUACION.explicacion}
            tema="concepto"
          />
          <div style={{ marginTop: "1.5rem" }}>
            <Boton variante="azul" onClick={siguienteEtapa}>
              Pasar a la etapa de clasificar
              <IconoFlecha />
            </Boton>
          </div>
        </div>
      )}

      {etapa === 2 && (
        <div>
          <Clasificar
            id={CLASIFICAR_EVALUACION.id}
            consigna={CLASIFICAR_EVALUACION.consigna}
            categorias={CLASIFICAR_EVALUACION.categorias}
            items={CLASIFICAR_EVALUACION.items}
            tema="concepto"
          />
          <div style={{ marginTop: "1.5rem" }}>
            <Boton variante="azul" onClick={siguienteEtapa}>
              Pasar a la última etapa
              <IconoFlecha />
            </Boton>
          </div>
        </div>
      )}

      {etapa === 3 && (
        <div>
          <Relacionar
            id={RELACIONAR_EVALUACION.id}
            consigna={RELACIONAR_EVALUACION.consigna}
            pares={RELACIONAR_EVALUACION.pares}
            tema="concepto"
            tituloIzquierda="Causa"
            tituloDerecha="Consecuencia"
          />
          <div style={{ marginTop: "1.5rem" }}>
            <Boton variante="acento" onClick={terminar}>
              Terminar y ver mis resultados
              <IconoFlecha />
            </Boton>
          </div>
        </div>
      )}
    </Seccion>
  );
}
