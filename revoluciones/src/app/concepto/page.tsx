"use client";

import { useState } from "react";
import {
  HIPOTESIS_REVOLUCION,
  ID_HIPOTESIS_CORRECTA,
  TIPOS_DE_REVOLUCION,
} from "@/data/concepto";
import { CASOS_REVOLUCION } from "@/data/otrasRevoluciones";
import type { Pregunta } from "@/lib/tipos";
import { OpcionMultiple } from "@/components/actividades/OpcionMultiple";
import { CasoRevolucion } from "@/components/actividades/CasoRevolucion";
import { ComparacionTres } from "@/components/contenido/ComparacionTres";
import { DefinicionCentral } from "@/components/contenido/DefinicionCentral";
import { TipoRevolucionCard } from "@/components/contenido/TipoRevolucionCard";
import { Aviso, Boton, PasoSiguiente, Rejilla, Seccion } from "@/components/ui";
import { IconoFlecha } from "@/components/Iconos";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import estilos from "@/components/contenido/concepto.module.css";

/* La hipótesis inicial es una pregunta de opción múltiple con la posibilidad
   de responder "ninguna me convence". Todavía no se muestra la definición. */
const PREGUNTA_HIPOTESIS: Pregunta = {
  id: "concepto-hipotesis",
  tipo: "opcion-multiple",
  tema: "concepto",
  enunciado: "¿Qué creés que significa revolución?",
  ayuda:
    "Elegí todas las opciones que te parezcan posibles. Todavía no hay una respuesta a la vista: primero queremos saber qué pensás vos.",
  opciones: HIPOTESIS_REVOLUCION,
  correctas: ID_HIPOTESIS_CORRECTA,
  admiteNinguna: true,
  explicacion:
    "La idea central es la tercera: una revolución es un cambio profundo que transforma una sociedad. Las otras no están del todo equivocadas, pero se quedan cortas. Una revolución puede incluir una guerra o una protesta, y puede cambiar un gobierno, pero nada de eso alcanza para definirla. Lo que la define es la profundidad del cambio.",
};

const PASOS = [
  { id: 1, etiqueta: "Tu hipótesis" },
  { id: 2, etiqueta: "Revolución, conflicto y guerra" },
  { id: 3, etiqueta: "La definición" },
  { id: 4, etiqueta: "Tipos de revolución" },
  { id: 5, etiqueta: "¿Es una revolución?" },
];

export default function PaginaConcepto() {
  const [paso, setPaso] = useState(1);
  const [maxAlcanzado, setMaxAlcanzado] = useState(1);

  function avanzar() {
    const siguiente = Math.min(paso + 1, PASOS.length);
    setPaso(siguiente);
    setMaxAlcanzado((m) => Math.max(m, siguiente));
    window.scrollTo({ top: 220, behavior: "smooth" });
  }

  return (
    <>
      <Seccion
        etiqueta="Concepto"
        titulo="¿Qué es una revolución?"
        acento="rojo"
        guia={
          <p>
            Esta sección tiene cinco pasos. No empieza con una definición para
            memorizar: empieza con lo que vos pensás.
          </p>
        }
      >
        <ol className={estilos.pasos}>
          {PASOS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={estilos.pasoBoton}
                data-actual={paso === p.id}
                data-hecho={p.id < maxAlcanzado}
                onClick={() => p.id <= maxAlcanzado && setPaso(p.id)}
                disabled={p.id > maxAlcanzado}
                aria-current={paso === p.id ? "step" : undefined}
              >
                <span className={estilos.numeroPaso}>{p.id}</span>
                {p.etiqueta}
              </button>
            </li>
          ))}
        </ol>

        {/* ---------------- PASO 1 ---------------- */}
        {paso === 1 && (
          <div>
            <OpcionMultiple
              pregunta={PREGUNTA_HIPOTESIS}
              contador="Paso 1 de 5 · Activar el pensamiento"
              accionFinal={
                <Boton variante="azul" onClick={avanzar}>
                  Seguir: revolución, conflicto y guerra
                  <IconoFlecha />
                </Boton>
              }
            />
            <p
              style={{
                marginTop: "1.25rem",
                color: "var(--gris-suave)",
                fontSize: "0.88rem",
                maxWidth: "68ch",
              }}
            >
              No te preocupes si dudás. Casi todo el mundo asocia la palabra
              &laquo;revolución&raquo; con guerras y banderas. En los próximos
              pasos vamos a ver por qué esa asociación es incompleta.
            </p>
          </div>
        )}

        {/* ---------------- PASO 2 ---------------- */}
        {paso === 2 && (
          <div>
            <div style={{ marginBottom: "1.75rem", maxWidth: "70ch" }}>
              <h3 style={{ marginBottom: "0.6rem" }}>
                Revolución no significa solamente guerra
              </h3>
              <p className="texto-guia">
                Estas tres palabras se usan muchas veces como si fueran
                sinónimos, pero nombran cosas distintas. Comparalas antes de
                seguir.
              </p>
            </div>

            <ComparacionTres />

            <div style={{ marginTop: "2rem" }}>
              <Aviso>
                <p>
                  <strong>
                    Esta distinción es la clave de todo el recorrido.
                  </strong>{" "}
                  Guerra describe un tipo de enfrentamiento. Revolución describe
                  un tipo de cambio. A veces se cruzan, pero no son lo mismo.
                </p>
              </Aviso>
            </div>

            <div style={{ marginTop: "1.75rem" }}>
              <Boton variante="azul" onClick={avanzar}>
                Ahora sí: ¿qué es una revolución?
                <IconoFlecha />
              </Boton>
            </div>
          </div>
        )}

        {/* ---------------- PASO 3 ---------------- */}
        {paso === 3 && (
          <div>
            <div style={{ marginBottom: "1.75rem", maxWidth: "70ch" }}>
              <h3 style={{ marginBottom: "0.6rem" }}>
                Entonces… ¿qué es una revolución?
              </h3>
              <p className="texto-guia">
                Ya diste tu hipótesis y comparaste tres palabras que se parecen.
                Con eso podemos construir la definición.
              </p>
            </div>

            <DefinicionCentral />

            <div style={{ marginTop: "1.75rem" }}>
              <Boton variante="azul" onClick={avanzar}>
                ¿Todas las revoluciones son iguales?
                <IconoFlecha />
              </Boton>
            </div>
          </div>
        )}

        {/* ---------------- PASO 4 ---------------- */}
        {paso === 4 && (
          <div>
            <div style={{ marginBottom: "1.75rem", maxWidth: "70ch" }}>
              <h3 style={{ marginBottom: "0.6rem" }}>
                ¿Todas las revoluciones son iguales?
              </h3>
              <p className="texto-guia">
                No. Hubo revoluciones en campos muy distintos, y no todas
                tuvieron las mismas causas, consecuencias ni formas de
                desarrollarse. Tocá cada tarjeta para ver un ejemplo real.
              </p>
            </div>

            <Rejilla>
              {TIPOS_DE_REVOLUCION.map((tipo) => (
                <TipoRevolucionCard key={tipo.id} tipo={tipo} />
              ))}
            </Rejilla>

            <div style={{ marginTop: "1.75rem" }}>
              <Boton variante="azul" onClick={avanzar}>
                Poner la definición a prueba
                <IconoFlecha />
              </Boton>
            </div>
          </div>
        )}

        {/* ---------------- PASO 5 ---------------- */}
        {paso === 5 && (
          <div>
            <div style={{ marginBottom: "1.75rem", maxWidth: "70ch" }}>
              <h3 style={{ marginBottom: "0.6rem" }}>
                Revoluciones que no son las que vas a estudiar
              </h3>
              <p className="texto-guia">
                Ahora usá la definición como herramienta. En cada caso decidí si
                se trata de una revolución. Algunos son discutibles a propósito:
                lo importante no es adivinar, sino poder explicar por qué.
              </p>
            </div>

            <div style={{ display: "grid", gap: "1.25rem" }}>
              {CASOS_REVOLUCION.map((caso) => (
                <CasoRevolucion key={caso.id} caso={caso} />
              ))}
            </div>
          </div>
        )}
      </Seccion>

      {paso === 5 && (
        <PasoSiguiente
          texto="Ya tenés la herramienta. Ahora vamos a usarla con tres procesos históricos concretos."
          href={SIGUIENTE_PASO["/concepto"].href}
          etiqueta={SIGUIENTE_PASO["/concepto"].etiqueta}
        />
      )}
    </>
  );
}
