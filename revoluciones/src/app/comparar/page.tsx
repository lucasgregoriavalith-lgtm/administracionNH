import type { Metadata } from "next";
import { CONCLUSION_COMPARADOR } from "@/data/comparador";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import { TablaComparativa } from "@/components/contenido/TablaComparativa";
import { MapaHistorico } from "@/components/contenido/MapaHistorico";
import { Aviso, PasoSiguiente, Seccion } from "@/components/ui";

export const metadata: Metadata = {
  title: "Comparar las revoluciones",
  description:
    "Once variables para ver en qué se parecen y en qué se diferencian los tres procesos estudiados.",
};

const PREGUNTAS_ABIERTAS = [
  "¿Qué cambia en cada una de estas revoluciones?",
  "¿Por qué cambia? ¿Qué la puso en marcha?",
  "¿Quiénes impulsan esos cambios?",
  "¿Quiénes se oponen a ellos?",
  "¿Qué consecuencias producen, y para quién?",
  "¿Cuánto duran?",
  "¿Realmente terminan?",
];

export default function PaginaComparar() {
  return (
    <>
      <Seccion
        etiqueta="Comparador"
        titulo="¿Qué tienen en común?"
        acento="rojo"
        guia={
          <p>
            Las tres son revoluciones. Pero si las mirás de cerca, se parecen
            mucho menos de lo que uno esperaría. Recorré la tabla fila por fila.
          </p>
        }
      >
        <TablaComparativa />

        <div style={{ marginTop: "1.75rem" }}>
          <Aviso>
            <p>{CONCLUSION_COMPARADOR}</p>
          </Aviso>
        </div>
      </Seccion>

      <Seccion
        etiqueta="Mapa"
        titulo="Dónde ocurrió cada una"
        guia={
          <p>
            Tocá uno de los tres puntos del mapa. Vas a ver la bandera que
            correspondía a ese territorio en el período estudiado, que no
            siempre es la que usa hoy.
          </p>
        }
      >
        <MapaHistorico />
      </Seccion>

      <Seccion
        etiqueta="Para pensar"
        titulo="Siete preguntas que sirven para cualquier revolución"
        acento="rojo"
        guia={
          <p>
            Estas preguntas son la herramienta que te llevás. Probá aplicarlas a
            las tres revoluciones que estudiaste, y después a cualquier otro
            cambio del que oigas hablar.
          </p>
        }
      >
        <ol
          style={{
            display: "grid",
            gap: "0.75rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxWidth: "68ch",
            counterReset: "pregunta",
          }}
        >
          {PREGUNTAS_ABIERTAS.map((pregunta, i) => (
            <li
              key={pregunta}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "baseline",
                padding: "1rem 1.25rem",
                background: "var(--negro-2)",
                border: "1px solid var(--borde)",
                borderRadius: "var(--radio)",
              }}
            >
              <span
                className="mono"
                style={{
                  color: i % 2 === 0 ? "var(--azul-claro)" : "var(--rojo-claro)",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--fuente-titulo)",
                  fontWeight: 600,
                  fontSize: "1.02rem",
                  color: "var(--blanco)",
                }}
              >
                {pregunta}
              </span>
            </li>
          ))}
        </ol>

        <p
          style={{
            marginTop: "1.75rem",
            fontFamily: "var(--fuente-titulo)",
            fontSize: "clamp(1.3rem, 4vw, 2rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "var(--blanco)",
            maxWidth: "24ch",
          }}
        >
          Y una más, que queda abierta: ¿todos los grandes cambios son
          revoluciones?
        </p>
        <p className="texto-guia" style={{ marginTop: "0.75rem" }}>
          Esta pregunta no tiene una única respuesta correcta. Los historiadores
          la discuten. Vos ya tenés herramientas para dar la tuya y defenderla
          con ejemplos.
        </p>
      </Seccion>

      <PasoSiguiente
        texto="Ahora poné a prueba todo lo que recorriste con cinco desafíos."
        href={SIGUIENTE_PASO["/comparar"].href}
        etiqueta={SIGUIENTE_PASO["/comparar"].etiqueta}
      />
    </>
  );
}
