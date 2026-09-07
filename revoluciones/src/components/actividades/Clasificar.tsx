"use client";

import { useState } from "react";
import type { ItemClasificar, Tema } from "@/lib/tipos";
import { useProgreso } from "@/lib/progreso";
import { calcularPuntos } from "@/lib/puntaje";
import { Boton } from "../ui";
import { IconoFlecha } from "../Iconos";
import { Devolucion } from "./Devolucion";
import comunes from "./actividades.module.css";
import estilos from "./Clasificar.module.css";

/**
 * JUEGO DE CLASIFICACIÓN.
 * Se muestra un elemento por vez y el estudiante elige a qué categoría
 * pertenece. Después de cada elección aparece la explicación.
 */
export function Clasificar({
  id,
  consigna,
  categorias,
  items,
  tema,
  alTerminar,
}: {
  id: string;
  consigna: string;
  categorias: string[];
  items: ItemClasificar[];
  tema: Tema;
  alTerminar?: () => void;
}) {
  const { registrar } = useProgreso();
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<string | null>(null);
  const [historial, setHistorial] = useState<boolean[]>([]);

  const item = items[indice];
  const terminado = indice >= items.length;

  function responder(categoria: string) {
    if (elegida !== null) return;
    const correcta = categoria === item.categoria;
    setElegida(categoria);
    setHistorial((h) => [...h, correcta]);
    registrar({
      actividadId: `${id}:${item.id}`,
      tema,
      correcta,
      intentos: 1,
    });
  }

  function avanzar() {
    setElegida(null);
    setIndice((i) => i + 1);
    if (indice + 1 >= items.length) alTerminar?.();
  }

  if (terminado) {
    const aciertos = historial.filter(Boolean).length;
    return (
      <div className={comunes.actividad}>
        <h3 className={comunes.enunciado}>Actividad terminada</h3>
        <p className={comunes.textoDevolucion}>
          Clasificaste correctamente {aciertos} de {items.length} elementos.
        </p>
        <div className={comunes.acciones} style={{ marginTop: "1rem" }}>
          <Boton
            variante="contorno"
            onClick={() => {
              setIndice(0);
              setElegida(null);
              setHistorial([]);
            }}
          >
            Volver a jugar
          </Boton>
        </div>
      </div>
    );
  }

  const acerto = elegida === item.categoria;

  return (
    <div className={comunes.actividad}>
      <div className={comunes.cabecera}>
        <p className={comunes.contador}>
          Elemento {indice + 1} de {items.length}
        </p>
      </div>

      <div className={estilos.marcador} aria-hidden="true">
        {items.map((_, i) => (
          <span
            key={i}
            className={estilos.pastilla}
            data-estado={
              i < historial.length
                ? historial[i]
                  ? "acierto"
                  : "fallo"
                : i === indice
                  ? "actual"
                  : undefined
            }
          />
        ))}
      </div>

      <p className={comunes.ayuda} style={{ marginBottom: "0.9rem" }}>
        {consigna}
      </p>

      <p className={estilos.tarjetaItem} key={item.id}>
        {item.texto}
      </p>

      <div className={estilos.categorias}>
        {categorias.map((categoria) => {
          let resultado: string | undefined;
          if (elegida !== null) {
            if (elegida === categoria) resultado = acerto ? "acierto" : "fallo";
            else if (categoria === item.categoria) resultado = "era-esta";
          }
          return (
            <button
              key={categoria}
              type="button"
              className={estilos.categoria}
              data-resultado={resultado}
              onClick={() => responder(categoria)}
              disabled={elegida !== null}
            >
              {categoria}
              {resultado === "acierto" && (
                <span className={estilos.pieCategoria}>Tu elección · correcta</span>
              )}
              {resultado === "fallo" && (
                <span className={estilos.pieCategoria}>Tu elección · incorrecta</span>
              )}
              {resultado === "era-esta" && (
                <span className={estilos.pieCategoria}>Era esta</span>
              )}
            </button>
          );
        })}
      </div>

      {elegida !== null && (
        <>
          <Devolucion
            tono={acerto ? "correcta" : "incorrecta"}
            puntos={calcularPuntos(1, acerto)}
          >
            <p style={{ margin: 0 }}>{item.explicacion}</p>
          </Devolucion>
          <div className={comunes.acciones} style={{ marginTop: "1rem" }}>
            <Boton variante="azul" onClick={avanzar}>
              {indice + 1 >= items.length ? "Ver resultado" : "Siguiente"}
              <IconoFlecha />
            </Boton>
          </div>
        </>
      )}
    </div>
  );
}
