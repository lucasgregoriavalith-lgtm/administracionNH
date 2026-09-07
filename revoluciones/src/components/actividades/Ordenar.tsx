"use client";

import { useMemo, useState } from "react";
import type { ItemOrdenar, Tema } from "@/lib/tipos";
import { useProgreso } from "@/lib/progreso";
import { INTENTOS_MAXIMOS, calcularPuntos } from "@/lib/puntaje";
import { Boton } from "../ui";
import { IconoReiniciar } from "../Iconos";
import { Devolucion } from "./Devolucion";
import comunes from "./actividades.module.css";
import estilos from "./Ordenar.module.css";

function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  // Evita que el azar devuelva el orden ya correcto.
  return copia;
}

/**
 * JUEGO DE ORDENAR.
 * Se puede arrastrar con el mouse, pero también mover con botones de subir y
 * bajar: arrastrar no funciona bien con teclado ni en todas las pantallas
 * táctiles, así que nunca es la única forma de resolver la actividad.
 */
export function Ordenar({
  id,
  consigna,
  items,
  explicacion,
  tema,
}: {
  id: string;
  consigna: string;
  items: ItemOrdenar[];
  explicacion: string;
  tema: Tema;
}) {
  const { registrar } = useProgreso();
  const inicial = useMemo(() => mezclar(items), [items]);
  const [orden, setOrden] = useState<ItemOrdenar[]>(inicial);
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [arrastrado, setArrastrado] = useState<number | null>(null);
  const [destino, setDestino] = useState<number | null>(null);

  const correcto = orden.every((item, i) => item.orden === i + 1);

  function mover(desde: number, hasta: number) {
    if (hasta < 0 || hasta >= orden.length) return;
    const copia = [...orden];
    const [elemento] = copia.splice(desde, 1);
    copia.splice(hasta, 0, elemento);
    setOrden(copia);
  }

  function comprobar() {
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setComprobado(true);
    registrar({ actividadId: id, tema, correcta: correcto, intentos: nuevoIntento });
  }

  function reintentar() {
    setComprobado(false);
    setOrden(mezclar(items));
  }

  function mostrarSolucion() {
    setOrden([...items].sort((a, b) => a.orden - b.orden));
    setComprobado(true);
  }

  const puedeReintentar = comprobado && !correcto && intentos < INTENTOS_MAXIMOS;

  return (
    <div className={comunes.actividad}>
      <h3 className={comunes.enunciado}>{consigna}</h3>
      <p className={comunes.ayuda}>
        Podés arrastrar las tarjetas o usar las flechas para subirlas y bajarlas.
      </p>

      <ol className={estilos.lista}>
        {orden.map((item, i) => {
          const enSuLugar = item.orden === i + 1;
          return (
            <li
              key={item.id}
              className={estilos.fila}
              draggable={!comprobado}
              data-arrastrando={arrastrado === i}
              data-destino={destino === i && arrastrado !== i}
              data-resultado={comprobado ? (enSuLugar ? "acierto" : "fallo") : undefined}
              onDragStart={() => setArrastrado(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setDestino(i);
              }}
              onDragEnd={() => {
                setArrastrado(null);
                setDestino(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (arrastrado !== null) mover(arrastrado, i);
                setArrastrado(null);
                setDestino(null);
              }}
            >
              <span className={estilos.posicion} aria-hidden="true" />
              <span className={estilos.texto}>
                {item.texto}
                {comprobado && <span className={estilos.fecha}>{item.fecha}</span>}
              </span>

              {comprobado ? (
                <span className={estilos.marcaResultado}>
                  {enSuLugar ? "En su lugar" : "Fuera de lugar"}
                </span>
              ) : (
                <span className={estilos.controles}>
                  <button
                    type="button"
                    className={estilos.flecha}
                    onClick={() => mover(i, i - 1)}
                    disabled={i === 0}
                    aria-label={`Subir: ${item.texto}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 2.5L10.5 8h-9z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={estilos.flecha}
                    onClick={() => mover(i, i + 1)}
                    disabled={i === orden.length - 1}
                    aria-label={`Bajar: ${item.texto}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 9.5L1.5 4h9z" fill="currentColor" />
                    </svg>
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className={comunes.acciones}>
        {!comprobado && (
          <Boton variante="primario" onClick={comprobar}>
            Comprobar el orden
          </Boton>
        )}
        {puedeReintentar && (
          <>
            <Boton variante="contorno" onClick={reintentar}>
              <IconoReiniciar tamano={16} />
              Intentar otra vez
            </Boton>
            <Boton variante="discreto" onClick={mostrarSolucion}>
              Ver el orden correcto
            </Boton>
          </>
        )}
      </div>

      {comprobado && (
        <Devolucion
          tono={correcto ? "correcta" : "incorrecta"}
          puntos={calcularPuntos(intentos, correcto)}
          titulo={correcto ? "Orden correcto" : "El orden no es el correcto"}
        >
          <p style={{ margin: 0 }}>{explicacion}</p>
          {!correcto && (
            <p style={{ margin: "0.6rem 0 0" }}>
              Las tarjetas marcadas como &laquo;fuera de lugar&raquo; son las que
              hay que mover. Fijate en las fechas que ahora aparecen debajo de
              cada una.
            </p>
          )}
        </Devolucion>
      )}
    </div>
  );
}
