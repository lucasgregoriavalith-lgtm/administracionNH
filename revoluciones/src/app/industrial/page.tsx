import type { Metadata } from "next";
import {
  CONSECUENCIAS,
  CONTEXTO_INDUSTRIAL,
  CRONOLOGIA_INDUSTRIAL,
  CURIOSIDADES_INDUSTRIAL,
  INTRO_INDUSTRIAL,
  INVENTOS,
} from "@/data/industrial";
import { REPASO_INDUSTRIAL } from "@/data/repaso";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import {
  BloquesContexto,
  EncabezadoHistorico,
} from "@/components/contenido/SeccionHistorica";
import {
  AntesDespues,
  Consecuencias,
  VidaCotidiana,
} from "@/components/contenido/AntesDespues";
import { Timeline } from "@/components/contenido/Timeline";
import { FactCard, InventoCard } from "@/components/contenido/Tarjetas";
import { Quiz } from "@/components/actividades/Quiz";
import { Aviso, PasoSiguiente, Rejilla, Seccion } from "@/components/ui";

export const metadata: Metadata = {
  title: "Revolución Industrial",
  description:
    "Máquinas, fábricas, ferrocarriles y ciudades: la revolución que cambió la vida cotidiana sin una sola batalla.",
};

export default function PaginaIndustrial() {
  return (
    <>
      <EncabezadoHistorico
        fecha={INTRO_INDUSTRIAL.fechaClave}
        titulo={INTRO_INDUSTRIAL.titulo}
        subtitulo={INTRO_INDUSTRIAL.subtitulo}
        entrada={INTRO_INDUSTRIAL.entrada}
        porQueEsRevolucion={INTRO_INDUSTRIAL.porQueEsRevolucion}
        banderas={["gran-bretana"]}
        acento="azul"
      />

      <Seccion etiqueta="Advertencia" titulo="No fue solo la invención de las máquinas" acento="rojo">
        <Aviso>
          <p>{INTRO_INDUSTRIAL.aclaracion}</p>
        </Aviso>
      </Seccion>

      <Seccion
        etiqueta="Contexto"
        titulo="¿Por qué empezó en Gran Bretaña?"
        guia={
          <p>
            No fue casualidad ni suerte. Se juntaron seis condiciones, y la
            última es la menos obvia y la más importante.
          </p>
        }
      >
        <BloquesContexto bloques={CONTEXTO_INDUSTRIAL} />
      </Seccion>

      <Seccion
        etiqueta="Comparación"
        titulo="Antes y después"
        acento="rojo"
        guia={
          <p>
            Leé fila por fila. Cada línea es un cambio concreto en la vida de
            personas reales.
          </p>
        }
      >
        <AntesDespues />
      </Seccion>

      <Seccion
        etiqueta="Inventos"
        titulo="Quién inventó qué (y quién no)"
        guia={
          <p>
            Tocá cada tarjeta para darla vuelta. Las tarjetas con borde rojo
            corrigen una atribución que suele repetirse mal.
          </p>
        }
      >
        <Rejilla ancha>
          {INVENTOS.map((invento) => (
            <InventoCard key={invento.id} invento={invento} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Línea de tiempo" titulo="Un proceso de más de un siglo" acento="rojo">
        <Timeline eventos={CRONOLOGIA_INDUSTRIAL} />
      </Seccion>

      <Seccion
        etiqueta="Consecuencias"
        titulo="Dos caras del mismo proceso"
        guia={
          <p>
            La misma revolución produjo las dos columnas a la vez. No hay que
            elegir una: hay que entender que ocurrieron juntas.
          </p>
        }
      >
        <Consecuencias />
        <div style={{ marginTop: "1.5rem" }}>
          <Aviso>
            <p>{CONSECUENCIAS.equilibrio}</p>
          </Aviso>
        </div>
      </Seccion>

      <Seccion
        etiqueta="Vida cotidiana"
        titulo="Un día antes y un día durante"
        acento="rojo"
        guia={
          <p>
            Así se sintió el cambio para una persona común: en su trabajo, su
            reloj, su calle y sus objetos de todos los días.
          </p>
        }
      >
        <Rejilla ancha>
          <VidaCotidiana />
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Datos curiosos" titulo="¿Sabías que…?">
        <Rejilla ancha>
          {CURIOSIDADES_INDUSTRIAL.map((curiosidad) => (
            <FactCard key={curiosidad.id} curiosidad={curiosidad} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Repaso" titulo="Comprobá lo que entendiste" acento="rojo">
        <Quiz
          preguntas={REPASO_INDUSTRIAL}
          titulo="Industrial"
          etiquetaFinal="Terminar el repaso"
        />
      </Seccion>

      <PasoSiguiente
        texto="Ya recorriste los tres procesos. Ahora ponelos uno al lado del otro."
        href={SIGUIENTE_PASO["/industrial"].href}
        etiqueta={SIGUIENTE_PASO["/industrial"].etiqueta}
      />
    </>
  );
}
