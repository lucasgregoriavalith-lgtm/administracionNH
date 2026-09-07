"use client";

import { useMemo, useState } from "react";
import type { ParRelacionar, Tema } from "@/lib/tipos";
import { useProgreso } from "@/lib/progreso";
import { INTENTOS_MAXIMOS, calcularPuntos } from "@/lib/puntaje";
import { Boton } from "../ui";
import { IconoReiniciar } from "../Iconos";
import { Devolucion } from "./Devolucion";
import comunes from "./actividades.module.css";
import estilos from "./Relacionar.module.css";

function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * JUEGO DE RELACIONAR.
 * Se une tocando una ficha de la izquierda y después su pareja de la derecha.
 * No se usa arrastrar: tocar dos veces funciona con mouse, con dedo y con
 * teclado por igual.
 */
export function Relacionar({
  id,
  consigna,
  pares,
  tema,
  tituloIzquierda = "Columna A",
  tituloDerecha = "Columna B",
}: {
  id: string;
  consigna: string;
  pares: ParRelacionar[];
  tema: Tema;
  tituloIzquierda?: string;
  tituloDerecha?: string;
}) {
  const { registrar } = useProgreso();
  const derechaMezclada = useMemo(() => mezclar(pares), [pares]);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  /** uniones: id del par de la izquierda -> id del par de la derecha. */
  const [uniones, setUniones] = useState<Record<string, string>>({});
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const completo = Object.keys(uniones).length === pares.length;
  const aciertos = Object.entries(uniones).filter(([iz, de]) => iz === de).length;
  const todoCorrecto = aciertos === pares.length;

  function tocarIzquierda(idPar: string) {
    if (comprobado) return;
    if (uniones[idPar]) {
      // Deshacer una unión ya hecha.
      const copia = { ...uniones };
      delete copia[idPar];
      setUniones(copia);
      setSeleccion(null);
      return;
    }
    setSeleccion(seleccion === idPar ? null : idPar);
  }

  function tocarDerecha(idPar: string) {
    if (comprobado || seleccion === null) return;
    if (Object.values(uniones).includes(idPar)) return;
    setUniones({ ...uniones, [seleccion]: idPar });
    setSeleccion(null);
  }

  function comprobar() {
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setComprobado(true);
    registrar({
      actividadId: id,
      tema,
      correcta: todoCorrecto,
      intentos: nuevoIntento,
    });
  }

  function reintentar() {
    setComprobado(false);
    setUniones({});
    setSeleccion(null);
  }

  const numeroDe = (idPar: string) => {
    const claves = Object.keys(uniones);
    const posIzq = claves.indexOf(idPar);
    if (posIzq >= 0) return posIzq + 1;
    const entrada = Object.entries(uniones).find(([, de]) => de === idPar);
    return entrada ? claves.indexOf(entrada[0]) + 1 : null;
  };

  const puedeReintentar = comprobado && !todoCorrecto && intentos < INTENTOS_MAXIMOS;

  return (
    <div className={comunes.actividad}>
      <h3 className={comunes.enunciado}>{consigna}</h3>
      <p className={comunes.ayuda}>
        Tocá primero una tarjeta de la izquierda y después la que le corresponde
        a la derecha. Para deshacer una unión, volvé a tocar la tarjeta de la
        izquierda.
      </p>

      <div className={estilos.tablero}>
        <div className={estilos.columna}>
          <p className={estilos.tituloColumna}>{tituloIzquierda}</p>
          {pares.map((par) => {
            const unida = Boolean(uniones[par.id]);
            const resultado = comprobado
              ? uniones[par.id] === par.id
                ? "acierto"
                : "fallo"
              : undefined;
            return (
              <button
                key={par.id}
                type="button"
                className={estilos.ficha}
                data-activa={seleccion === par.id}
                data-unida={unida && !comprobado}
                data-resultado={resultado}
                onClick={() => tocarIzquierda(par.id)}
                disabled={comprobado}
              >
                {numeroDe(par.id) && (
                  <span className={estilos.numeroUnion} aria-hidden="true">
                    {numeroDe(par.id)}
                  </span>
                )}
                <span>{par.izquierda}</span>
              </button>
            );
          })}
        </div>

        <div className={estilos.columna}>
          <p className={estilos.tituloColumna}>{tituloDerecha}</p>
          {derechaMezclada.map((par) => {
            const unida = Object.values(uniones).includes(par.id);
            const entrada = Object.entries(uniones).find(([, de]) => de === par.id);
            const resultado = comprobado
              ? entrada && entrada[0] === par.id
                ? "acierto"
                : entrada
                  ? "fallo"
                  : undefined
              : undefined;
            return (
              <button
                key={par.id}
                type="button"
                className={estilos.ficha}
                data-unida={unida && !comprobado}
                data-resultado={resultado}
                onClick={() => tocarDerecha(par.id)}
                disabled={comprobado || seleccion === null || unida}
              >
                {numeroDe(par.id) && (
                  <span className={estilos.numeroUnion} aria-hidden="true">
                    {numeroDe(par.id)}
                  </span>
                )}
                <span>{par.derecha}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={comunes.acciones}>
        {!comprobado && (
          <Boton variante="primario" onClick={comprobar} disabled={!completo}>
            {completo
              ? "Comprobar las uniones"
              : `Faltan ${pares.length - Object.keys(uniones).length} por unir`}
          </Boton>
        )}
        {puedeReintentar && (
          <Boton variante="contorno" onClick={reintentar}>
            <IconoReiniciar tamano={16} />
            Intentar otra vez
          </Boton>
        )}
      </div>

      {comprobado && (
        <Devolucion
          tono={todoCorrecto ? "correcta" : aciertos > 0 ? "parcial" : "incorrecta"}
          puntos={calcularPuntos(intentos, todoCorrecto)}
          titulo={
            todoCorrecto
              ? "Todas las uniones son correctas"
              : `Uniste bien ${aciertos} de ${pares.length}`
          }
        >
          <ul className={estilos.explicaciones}>
            {pares.map((par) => (
              <li key={par.id} className={estilos.explicacion}>
                <strong>{par.izquierda}</strong> se relaciona con{" "}
                <strong>{par.derecha}</strong>. {par.explicacion}
              </li>
            ))}
          </ul>
        </Devolucion>
      )}
    </div>
  );
}
