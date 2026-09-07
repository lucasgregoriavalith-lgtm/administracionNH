"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProgreso } from "@/lib/progreso";
import { mensajeDeCierre } from "@/lib/puntaje";
import { ScoreBoard } from "./ScoreBoard";
import { ResultadosPorTema } from "./ResultadosPorTema";
import { PlanDeRepaso } from "./PlanDeRepaso";
import { BotonEnlace, Nota, Panel, Seccion } from "@/components/ui";
import { IconoFlecha } from "@/components/Iconos";

type EstadoEnvio = "inactivo" | "enviando" | "guardado" | "sin-base" | "error";

/**
 * Pantalla final del recorrido.
 * Al abrirse, intenta enviar el resultado al servidor una sola vez. Si no hay
 * base de datos configurada, no pasa nada: el progreso vive en el navegador.
 */
export function FinalResults() {
  const { estado, resumen, listo } = useProgreso();
  const [envio, setEnvio] = useState<EstadoEnvio>("inactivo");
  const yaEnviado = useRef(false);

  useEffect(() => {
    if (!listo || yaEnviado.current) return;
    if (!estado.estudiante || resumen.total === 0) return;

    yaEnviado.current = true;
    setEnvio("enviando");

    fetch("/api/resultados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: estado.estudiante.nombre,
        curso: estado.estudiante.curso,
        puntaje: resumen.puntaje,
        puntajeMaximo: resumen.puntajeMaximo,
        correctas: resumen.correctas,
        incorrectas: resumen.incorrectas,
        total: resumen.total,
        porcentaje: resumen.porcentaje,
        porTema: resumen.porTema,
        completado: estado.evaluacionCompletada,
        respuestas: Object.values(estado.respuestas).map((r) => ({
          actividadId: r.actividadId,
          tema: r.tema,
          correcta: r.correcta,
          intentos: r.intentos,
          puntos: r.puntos,
        })),
      }),
    })
      .then(async (respuesta) => {
        const datos = await respuesta.json().catch(() => ({}));
        if (datos?.guardado) setEnvio("guardado");
        else if (datos?.motivo === "sin-base-de-datos") setEnvio("sin-base");
        else setEnvio("error");
      })
      .catch(() => setEnvio("error"));
  }, [listo, estado, resumen]);

  if (!listo) {
    return (
      <Seccion etiqueta="Resultados" titulo="Cargando tus resultados…">
        <p className="texto-guia">Un momento.</p>
      </Seccion>
    );
  }

  if (!estado.estudiante || resumen.total === 0) {
    return (
      <Seccion
        etiqueta="Resultados"
        titulo="Todavía no hay nada que mostrar"
        acento="rojo"
        guia={
          <p>
            Para ver resultados necesitás haber respondido al menos una
            actividad. Empezá por la sección del concepto.
          </p>
        }
      >
        <BotonEnlace href="/concepto" variante="acento">
          Empezar el recorrido
          <IconoFlecha />
        </BotonEnlace>
      </Seccion>
    );
  }

  const MENSAJE_ENVIO: Record<EstadoEnvio, string> = {
    inactivo: "",
    enviando: "Guardando tu resultado…",
    guardado:
      "Tu resultado quedó guardado. Tu docente va a poder verlo en el panel.",
    "sin-base":
      "Tu progreso está guardado en este dispositivo. Esta copia de la aplicación no tiene base de datos conectada, así que el resultado no se envía a ningún servidor.",
    error:
      "No se pudo enviar el resultado al servidor, pero tu progreso sigue guardado en este dispositivo. Podés mostrarle esta pantalla a tu docente.",
  };

  return (
    <>
      <Seccion
        etiqueta="Fin del recorrido"
        titulo="Terminaste el recorrido"
        acento="rojo"
        guia={
          <p>
            {estado.estudiante.nombre}
            {estado.estudiante.curso ? ` · ${estado.estudiante.curso}` : ""}
          </p>
        }
      >
        <ScoreBoard />

        <p className="texto-guia" style={{ marginTop: "1.5rem" }}>
          {mensajeDeCierre(resumen.porcentaje, resumen.total)}
        </p>

        {envio !== "inactivo" && (
          <div style={{ marginTop: "1.25rem" }}>
            <Nota>{MENSAJE_ENVIO[envio]}</Nota>
          </div>
        )}
      </Seccion>

      <Seccion
        etiqueta="Por tema"
        titulo="Cómo te fue en cada parte"
        guia={
          <p>
            Cada barra muestra el porcentaje de respuestas correctas en ese
            tema. El texto de abajo dice lo mismo con palabras, para que no
            dependa solo del color.
          </p>
        }
      >
        <ResultadosPorTema resumen={resumen} />
      </Seccion>

      <Seccion
        etiqueta="Para seguir estudiando"
        titulo="Lo que conviene repasar"
        acento="rojo"
        guia={
          <p>
            Esta lista se armó con tus propias respuestas: aparecen los temas en
            los que no llegaste al 75 %.
          </p>
        }
      >
        <PlanDeRepaso resumen={resumen} />
      </Seccion>

      <Seccion etiqueta="Una última pregunta" titulo="Para discutir en clase">
        <Panel acento="rojo">
          <p
            style={{
              fontFamily: "var(--fuente-titulo)",
              fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              margin: "0 0 1rem",
              maxWidth: "26ch",
            }}
          >
            ¿Todos los grandes cambios son revoluciones?
          </p>
          <p className="texto-guia" style={{ marginBottom: "1rem" }}>
            Ahora tenés con qué responder: la definición, la diferencia entre
            revolución, conflicto y guerra, tres procesos históricos concretos y
            varios casos discutibles.
          </p>
          <p className="texto-guia" style={{ margin: 0 }}>
            Esta pregunta no tiene una única respuesta correcta. Llevala a clase
            y defendé tu posición con ejemplos.
          </p>
        </Panel>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "1.75rem",
          }}
        >
          <BotonEnlace href="/desafios" variante="contorno">
            Volver a los desafíos
          </BotonEnlace>
          <BotonEnlace href="/comparar" variante="contorno">
            Repasar el comparador
          </BotonEnlace>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/" style={{ fontSize: "0.88rem" }}>
            Volver al inicio
          </Link>
        </p>
      </Seccion>
    </>
  );
}
