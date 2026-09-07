import type { Metadata } from "next";
import {
  ADVERTENCIA_COMPARACION,
  CONTEXTO_EEUU,
  CRONOLOGIA_EEUU,
  CURIOSIDADES_EEUU,
  INTRO_EEUU,
} from "@/data/estadosUnidos";
import { REPASO_EEUU } from "@/data/repaso";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import {
  BloquesContexto,
  EncabezadoHistorico,
} from "@/components/contenido/SeccionHistorica";
import { Timeline } from "@/components/contenido/Timeline";
import { FactCard } from "@/components/contenido/Tarjetas";
import { Quiz } from "@/components/actividades/Quiz";
import { Aviso, PasoSiguiente, Rejilla, Seccion } from "@/components/ui";

export const metadata: Metadata = {
  title: "Independencia de Estados Unidos",
  description:
    "De la Ley del Timbre al Tratado de París: cómo trece colonias británicas se convirtieron en un país nuevo.",
};

export default function PaginaEstadosUnidos() {
  return (
    <>
      <EncabezadoHistorico
        fecha={INTRO_EEUU.fechaClave}
        titulo={INTRO_EEUU.titulo}
        subtitulo={INTRO_EEUU.subtitulo}
        entrada={INTRO_EEUU.entrada}
        porQueEsRevolucion={INTRO_EEUU.porQueEsRevolucion}
        banderas={["eeuu-gran-union", "eeuu-13-estrellas"]}
        acento="azul"
      />

      <Seccion etiqueta="Rigor histórico" titulo="Antes de empezar" acento="rojo">
        <Aviso>
          <p>{ADVERTENCIA_COMPARACION}</p>
        </Aviso>
      </Seccion>

      <Seccion
        etiqueta="Contexto"
        titulo="¿Qué estaba pasando?"
        guia={
          <p>
            Ninguna revolución empieza de la nada. Estas cinco piezas explican
            cómo un problema de impuestos terminó en la fundación de un país.
          </p>
        }
      >
        <BloquesContexto bloques={CONTEXTO_EEUU} />
      </Seccion>

      <Seccion
        etiqueta="Línea de tiempo"
        titulo="De 1763 a 1783: veinte años"
        acento="rojo"
        guia={
          <p>
            Tocá cada fecha para ver qué pasó, por qué pasó y por qué importa.
            Prestá atención al orden: la guerra empezó antes que la Declaración
            de Independencia.
          </p>
        }
      >
        <Timeline eventos={CRONOLOGIA_EEUU} />
      </Seccion>

      <Seccion etiqueta="Datos curiosos" titulo="¿Sabías que…?">
        <Rejilla ancha>
          {CURIOSIDADES_EEUU.map((curiosidad) => (
            <FactCard key={curiosidad.id} curiosidad={curiosidad} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion
        etiqueta="Repaso"
        titulo="Comprobá lo que entendiste"
        acento="rojo"
        guia={<p>Tres preguntas. No son de memoria: piden relacionar ideas.</p>}
      >
        <Quiz
          preguntas={REPASO_EEUU}
          titulo="Estados Unidos"
          etiquetaFinal="Terminar el repaso"
        />
      </Seccion>

      <PasoSiguiente
        texto="Trece años después de la Declaración estadounidense, en Francia empezaba un proceso distinto."
        href={SIGUIENTE_PASO["/estados-unidos"].href}
        etiqueta={SIGUIENTE_PASO["/estados-unidos"].etiqueta}
      />
    </>
  );
}
