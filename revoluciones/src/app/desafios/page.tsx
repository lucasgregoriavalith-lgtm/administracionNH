"use client";

import { useState } from "react";
import {
  CADENAS_CAUSALES,
  CATEGORIAS_JUEGO1,
  CATEGORIAS_JUEGO3,
  ITEMS_JUEGO1,
  ITEMS_JUEGO3,
  PARES_RELACIONAR,
  RONDAS_ORDENAR,
  VERDADERO_FALSO,
} from "@/data/juegos";
import type { ParRelacionar } from "@/lib/tipos";
import { SIGUIENTE_PASO } from "@/data/navegacion";
import { Clasificar } from "@/components/actividades/Clasificar";
import { Ordenar } from "@/components/actividades/Ordenar";
import { Relacionar } from "@/components/actividades/Relacionar";
import { Quiz } from "@/components/actividades/Quiz";
import { PasoSiguiente, Seccion } from "@/components/ui";
import { ScoreBoard } from "@/components/progreso/ScoreBoard";
import estilos from "./desafios.module.css";

const JUEGOS = [
  {
    id: 1,
    nombre: "¿Revolución o no?",
    descripcion: "Clasificá diez situaciones usando la definición.",
  },
  {
    id: 2,
    nombre: "Ordená la historia",
    descripcion: "Acomodá los acontecimientos en su orden correcto.",
  },
  {
    id: 3,
    nombre: "¿A qué revolución pertenece?",
    descripcion: "Ubicá fechas, personajes y objetos donde corresponde.",
  },
  {
    id: 4,
    nombre: "Verdadero o falso",
    descripcion: "Diez afirmaciones, algunas con trampa.",
  },
  {
    id: 5,
    nombre: "Conectá las ideas",
    descripcion: "Uní cada causa con la consecuencia que produjo.",
  },
];

/* Las cadenas causales se juegan como uniones causa → consecuencia. En la
   devolución se muestra la cadena completa, con el acontecimiento del medio. */
const CADENAS_POR_TEMA = {
  eeuu: CADENAS_CAUSALES.filter((c) => c.tema === "eeuu"),
  francia: CADENAS_CAUSALES.filter((c) => c.tema === "francia"),
  industrial: CADENAS_CAUSALES.filter((c) => c.tema === "industrial"),
};

function paresDeCadenas(tema: keyof typeof CADENAS_POR_TEMA): ParRelacionar[] {
  return CADENAS_POR_TEMA[tema].map((cadena) => ({
    id: cadena.id,
    izquierda: cadena.causa,
    derecha: cadena.consecuencia,
    explicacion: `En el medio ocurrió esto: ${cadena.acontecimiento} ${cadena.explicacion}`,
  }));
}

export default function PaginaDesafios() {
  const [juego, setJuego] = useState(1);
  const [rondaOrden, setRondaOrden] = useState(0);
  const [rondaCadena, setRondaCadena] =
    useState<keyof typeof CADENAS_POR_TEMA>("eeuu");

  const NOMBRE_RONDA_CADENA: Record<keyof typeof CADENAS_POR_TEMA, string> = {
    eeuu: "Estados Unidos",
    francia: "Francia",
    industrial: "Industrial",
  };

  return (
    <>
      <Seccion
        etiqueta="Desafíos"
        titulo="Poné a prueba lo que aprendiste"
        acento="rojo"
        guia={
          <p>
            Cinco juegos distintos. Podés repetirlos: si ya resolviste bien una
            actividad, volver a jugarla no te quita puntos.
          </p>
        }
      >
        <div style={{ marginBottom: "2rem" }}>
          <ScoreBoard />
        </div>

        <ul className={estilos.selector}>
          {JUEGOS.map((j) => (
            <li key={j.id}>
              <button
                type="button"
                className={estilos.juegoBoton}
                data-activo={juego === j.id}
                onClick={() => setJuego(j.id)}
                aria-pressed={juego === j.id}
              >
                <span className={estilos.numeroJuego}>Juego {j.id}</span>
                <span className={estilos.nombreJuego}>{j.nombre}</span>
                <span className={estilos.descripcionJuego}>{j.descripcion}</span>
              </button>
            </li>
          ))}
        </ul>

        {juego === 1 && (
          <Clasificar
            id="juego1"
            consigna="Decidí si cada situación es o no una revolución."
            categorias={CATEGORIAS_JUEGO1}
            items={ITEMS_JUEGO1}
            tema="concepto"
          />
        )}

        {juego === 2 && (
          <div>
            <div className={estilos.rondas}>
              {RONDAS_ORDENAR.map((ronda, i) => (
                <button
                  key={ronda.id}
                  type="button"
                  className={estilos.ronda}
                  data-activa={rondaOrden === i}
                  onClick={() => setRondaOrden(i)}
                >
                  {ronda.titulo}
                </button>
              ))}
            </div>
            <Ordenar
              key={RONDAS_ORDENAR[rondaOrden].id}
              id={RONDAS_ORDENAR[rondaOrden].id}
              consigna={RONDAS_ORDENAR[rondaOrden].consigna}
              items={RONDAS_ORDENAR[rondaOrden].items}
              explicacion={RONDAS_ORDENAR[rondaOrden].explicacion}
              tema={
                rondaOrden === 0 ? "eeuu" : rondaOrden === 1 ? "francia" : "industrial"
              }
            />
          </div>
        )}

        {juego === 3 && (
          <Clasificar
            id="juego3"
            consigna="¿A cuál de las tres revoluciones pertenece este elemento?"
            categorias={CATEGORIAS_JUEGO3}
            items={ITEMS_JUEGO3}
            tema="concepto"
          />
        )}

        {juego === 4 && (
          <Quiz
            preguntas={VERDADERO_FALSO}
            titulo="Verdadero o falso"
            etiquetaFinal="Terminar el juego"
          />
        )}

        {juego === 5 && (
          <div style={{ display: "grid", gap: "2rem" }}>
            <div>
              <div className={estilos.rondas}>
                {(
                  Object.keys(CADENAS_POR_TEMA) as (keyof typeof CADENAS_POR_TEMA)[]
                ).map((tema) => (
                  <button
                    key={tema}
                    type="button"
                    className={estilos.ronda}
                    data-activa={rondaCadena === tema}
                    onClick={() => setRondaCadena(tema)}
                  >
                    {NOMBRE_RONDA_CADENA[tema]}
                  </button>
                ))}
              </div>
              <Relacionar
                key={rondaCadena}
                id={`cadenas-${rondaCadena}`}
                consigna="Uní cada causa con la consecuencia que terminó produciendo."
                pares={paresDeCadenas(rondaCadena)}
                tema={rondaCadena}
                tituloIzquierda="Causa"
                tituloDerecha="Consecuencia"
              />
            </div>

            <Relacionar
              id="relacionar-fechas"
              consigna="Relacioná cada fecha con el acontecimiento que le corresponde."
              pares={PARES_RELACIONAR}
              tema="concepto"
              tituloIzquierda="Fecha"
              tituloDerecha="Acontecimiento"
            />
          </div>
        )}
      </Seccion>

      <PasoSiguiente
        texto="Cuando te sientas preparado, pasá a la evaluación final."
        href={SIGUIENTE_PASO["/desafios"].href}
        etiqueta={SIGUIENTE_PASO["/desafios"].etiqueta}
      />
    </>
  );
}
