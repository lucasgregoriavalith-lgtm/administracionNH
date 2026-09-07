"use client";

import { useState } from "react";
import type { Evento } from "@/lib/tipos";
import { IconoMas, IconoMenos } from "../Iconos";
import estilos from "./Timeline.module.css";

/** Un acontecimiento de la línea de tiempo. Se despliega al pulsarlo. */
export function TimelineEvento({
  evento,
  abierto,
  alternar,
}: {
  evento: Evento;
  abierto: boolean;
  alternar: () => void;
}) {
  const idDetalle = `detalle-${evento.id}`;
  return (
    <li className={estilos.evento} data-abierto={abierto}>
      <span className={estilos.nodo} aria-hidden="true" />
      <button
        type="button"
        className={estilos.disparador}
        onClick={alternar}
        aria-expanded={abierto}
        aria-controls={idDetalle}
      >
        <span className={estilos.fecha}>{evento.fecha}</span>
        <span className={estilos.cuerpoDisparador}>
          <span className={estilos.titulo}>{evento.titulo}</span>
          <span className={estilos.resumen}>{evento.resumen}</span>
        </span>
        <span className={estilos.signo}>
          {abierto ? <IconoMenos tamano={17} /> : <IconoMas tamano={17} />}
        </span>
      </button>

      {abierto && (
        <div className={estilos.detalle} id={idDetalle}>
          {evento.fechaExacta && (
            <p className={estilos.fechaExacta}>{evento.fechaExacta}</p>
          )}
          <p className={estilos.parrafo}>{evento.explicacion}</p>
          <p className={estilos.importancia}>
            <span className={estilos.importanciaTitulo}>Por qué importa</span>
            {evento.importancia}
          </p>
        </div>
      )}
    </li>
  );
}

/** Línea de tiempo completa. Se abre un acontecimiento por vez. */
export function Timeline({ eventos }: { eventos: Evento[] }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  return (
    <ol className={estilos.linea}>
      {eventos.map((evento) => (
        <TimelineEvento
          key={evento.id}
          evento={evento}
          abierto={abierto === evento.id}
          alternar={() => setAbierto(abierto === evento.id ? null : evento.id)}
        />
      ))}
    </ol>
  );
}
