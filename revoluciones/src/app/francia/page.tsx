import type { Metadata } from "next";
import {
  CONCEPTOS_CLAVE,
  CONTEXTO_FRANCIA,
  CRONOLOGIA_FRANCIA,
  CURIOSIDADES_FRANCIA,
  INTRO_FRANCIA,
  PERSONAJES_FRANCIA,
} from "@/data/francia";
import { REPASO_FRANCIA } from "@/data/repaso";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import {
  BloquesContexto,
  EncabezadoHistorico,
} from "@/components/contenido/SeccionHistorica";
import { TresEstados } from "@/components/contenido/TresEstados";
import { Timeline } from "@/components/contenido/Timeline";
import {
  CharacterCard,
  ConceptCard,
  FactCard,
} from "@/components/contenido/Tarjetas";
import { Quiz } from "@/components/actividades/Quiz";
import { Aviso, PasoSiguiente, Rejilla, Seccion } from "@/components/ui";

export const metadata: Metadata = {
  title: "Revolución Francesa",
  description:
    "De los Estados Generales al golpe de Napoleón: diez años en los que Francia se transformó a sí misma.",
};

export default function PaginaFrancia() {
  return (
    <>
      <EncabezadoHistorico
        fecha={INTRO_FRANCIA.fechaClave}
        titulo={INTRO_FRANCIA.titulo}
        subtitulo={INTRO_FRANCIA.subtitulo}
        entrada={INTRO_FRANCIA.entrada}
        porQueEsRevolucion={INTRO_FRANCIA.porQueEsRevolucion}
        banderas={["francia-real", "francia-tricolor"]}
        acento="rojo"
      />

      <Seccion
        etiqueta="Contexto"
        titulo="Francia antes de 1789"
        guia={
          <p>
            Cinco piezas que hay que tener juntas para entender por qué estalló.
            Ninguna de ellas sola habría bastado.
          </p>
        }
      >
        <BloquesContexto bloques={CONTEXTO_FRANCIA} />
      </Seccion>

      <Seccion
        etiqueta="Sociedad"
        titulo="Una sociedad dividida en tres"
        acento="rojo"
        guia={
          <p>
            No se elegía a qué estado pertenecer: se nacía en él. Y de eso
            dependían los impuestos que se pagaban y los derechos que se tenían.
          </p>
        }
      >
        <TresEstados />
      </Seccion>

      <Seccion
        etiqueta="Línea de tiempo"
        titulo="Diez años, cinco etapas distintas"
        guia={
          <p>
            Cuidado con simplificar: la revolución no fue una línea recta de la
            monarquía a la igualdad. Hubo una monarquía constitucional, una
            república, un período de terror, un gobierno de cinco directores y,
            al final, un golpe militar.
          </p>
        }
      >
        <Timeline eventos={CRONOLOGIA_FRANCIA} />
      </Seccion>

      <Seccion
        etiqueta="Personajes"
        titulo="Quién fue quién"
        acento="rojo"
        guia={
          <p>
            No todos tuvieron el mismo peso en el proceso, y la etiqueta de cada
            tarjeta lo aclara. Algunos lo impulsaron, otros lo resistieron y
            otros llegaron cuando ya estaba terminando.
          </p>
        }
      >
        <Rejilla ancha>
          {PERSONAJES_FRANCIA.map((personaje) => (
            <CharacterCard key={personaje.id} personaje={personaje} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion
        etiqueta="Conceptos clave"
        titulo="Las palabras que hay que entender"
        guia={<p>Tocá cada palabra para ver su definición y un ejemplo concreto.</p>}
      >
        <Rejilla>
          {CONCEPTOS_CLAVE.map((concepto) => (
            <ConceptCard key={concepto.id} concepto={concepto} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Datos curiosos" titulo="¿Sabías que…?" acento="rojo">
        <Rejilla ancha>
          {CURIOSIDADES_FRANCIA.map((curiosidad) => (
            <FactCard key={curiosidad.id} curiosidad={curiosidad} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Una idea para pensar" titulo="Un final inesperado">
        <Aviso>
          <p>
            Una revolución que empezó derribando a un rey terminó, diez años
            después, con un emperador. <strong>¿Fracasó entonces?</strong> Los
            historiadores no se ponen de acuerdo: algunos señalan que las ideas
            de igualdad ante la ley y de derechos sobrevivieron y se difundieron
            por el mundo; otros subrayan que el gobierno republicano duró muy
            poco. Es una buena pregunta para discutir en clase.
          </p>
        </Aviso>
      </Seccion>

      <Seccion etiqueta="Repaso" titulo="Comprobá lo que entendiste" acento="rojo">
        <Quiz
          preguntas={REPASO_FRANCIA}
          titulo="Francia"
          etiquetaFinal="Terminar el repaso"
        />
      </Seccion>

      <PasoSiguiente
        texto="Mientras Francia discutía quién debía gobernar, en Gran Bretaña estaba ocurriendo otro cambio profundo, sin ejércitos ni banderas."
        href={SIGUIENTE_PASO["/francia"].href}
        etiqueta={SIGUIENTE_PASO["/francia"].etiqueta}
      />
    </>
  );
}
