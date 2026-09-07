"use client";

import { useState } from "react";
import type { Concepto, Curiosidad, Invento, Personaje } from "@/lib/tipos";
import { IconoMas, IconoMenos } from "../Iconos";
import estilos from "./Tarjetas.module.css";

/* --- FlashCard: tarjeta que se da vuelta ---------------------------------- */

export function FlashCard({
  campo,
  titulo,
  frente,
  dorso,
  acento = "azul",
}: {
  campo: string;
  titulo: string;
  frente: React.ReactNode;
  dorso: React.ReactNode;
  acento?: "azul" | "rojo";
}) {
  const [vuelta, setVuelta] = useState(false);
  return (
    <button
      type="button"
      className={estilos.escena}
      data-vuelta={vuelta}
      onClick={() => setVuelta((v) => !v)}
      aria-pressed={vuelta}
      aria-label={`${titulo}. ${vuelta ? "Ver el frente" : "Dar vuelta la tarjeta"}`}
    >
      <div className={estilos.giro}>
        <div className={estilos.cara + " " + estilos.caraFrente} data-acento={acento}>
          <p className={estilos.campo}>{campo}</p>
          <h3 className={estilos.nombreTarjeta}>{titulo}</h3>
          <div className={estilos.textoTarjeta}>{frente}</div>
          <p className={estilos.pieVuelta}>Tocá para dar vuelta</p>
        </div>
        <div className={estilos.cara + " " + estilos.caraDorso}>
          <p className={estilos.campo}>{titulo}</p>
          <div className={estilos.textoTarjeta}>{dorso}</div>
          <p className={estilos.pieVuelta}>Tocá para volver</p>
        </div>
      </div>
    </button>
  );
}

/* --- ConceptCard ---------------------------------------------------------- */

export function ConceptCard({ concepto }: { concepto: Concepto }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <button
      type="button"
      className={estilos.concepto}
      data-abierta={abierta}
      onClick={() => setAbierta((v) => !v)}
      aria-expanded={abierta}
    >
      <span className={estilos.terminoFila}>
        <span className={estilos.termino}>{concepto.termino}</span>
        <span style={{ color: "var(--gris-suave)", flexShrink: 0 }}>
          {abierta ? <IconoMenos tamano={16} /> : <IconoMas tamano={16} />}
        </span>
      </span>
      {abierta && (
        <span className={estilos.cuerpoConcepto}>
          <span className={estilos.definicion} style={{ display: "block" }}>
            {concepto.definicion}
          </span>
          <span className={estilos.ejemplo} style={{ display: "block" }}>
            <span className={estilos.ejemploTitulo}>Por ejemplo</span>
            {concepto.ejemplo}
          </span>
        </span>
      )}
    </button>
  );
}

/* --- CharacterCard -------------------------------------------------------- */

const TEXTO_RELEVANCIA: Record<Personaje["relevancia"], string> = {
  central: "Figura central del proceso",
  destacada: "Papel destacado",
  posterior: "Protagonismo posterior",
};

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function CharacterCard({ personaje }: { personaje: Personaje }) {
  return (
    <article className={estilos.personaje} data-acento={personaje.acento}>
      <p className={estilos.retrato} aria-hidden="true">
        {iniciales(personaje.nombre)}
      </p>
      <p className={estilos.campo}>
        {personaje.rol} · <span className="mono">{personaje.años}</span>
      </p>
      <h3 className={estilos.nombreTarjeta}>{personaje.nombre}</h3>
      <p className={estilos.relevancia}>{TEXTO_RELEVANCIA[personaje.relevancia]}</p>

      <div className={estilos.bloque}>
        <span className={estilos.bloqueTitulo}>Quién era</span>
        <p className={estilos.textoTarjeta}>{personaje.quienEra}</p>
      </div>
      <div className={estilos.bloque}>
        <span className={estilos.bloqueTitulo}>Qué papel tuvo</span>
        <p className={estilos.textoTarjeta}>{personaje.papel}</p>
      </div>
      <div className={estilos.bloque}>
        <span className={estilos.bloqueTitulo}>Qué ideas defendía</span>
        <p className={estilos.textoTarjeta}>{personaje.ideas}</p>
      </div>
      <div className={estilos.bloque}>
        <span className={estilos.bloqueTitulo}>Su relación con el proceso</span>
        <p className={estilos.textoTarjeta}>{personaje.relacion}</p>
      </div>
    </article>
  );
}

/* --- FactCard: ¿Sabías que...? -------------------------------------------- */

export function FactCard({ curiosidad }: { curiosidad: Curiosidad }) {
  return (
    <article className={estilos.dato}>
      <p className={estilos.datoEtiqueta}>¿Sabías que...?</p>
      <h3 className={estilos.datoTitulo}>{curiosidad.titulo}</h3>
      <p className={estilos.datoTexto}>{curiosidad.texto}</p>
    </article>
  );
}

/* --- Tarjeta de invento --------------------------------------------------- */

export function InventoCard({ invento }: { invento: Invento }) {
  return (
    <FlashCard
      campo={invento.fecha}
      titulo={invento.nombre}
      acento={invento.precision ? "rojo" : "azul"}
      frente={
        <>
          <span className={estilos.bloqueTitulo}>Quién</span>
          <p style={{ margin: "0 0 0.7rem" }}>{invento.autor}</p>
          <span className={estilos.bloqueTitulo}>Qué problema resolvía</span>
          <p style={{ margin: 0 }}>{invento.problema}</p>
        </>
      }
      dorso={
        <>
          <span className={estilos.bloqueTitulo}>Qué cambió</span>
          <p style={{ margin: "0 0 0.7rem" }}>{invento.cambio}</p>
          {invento.precision && (
            <>
              <span className={estilos.bloqueTitulo}>Atención</span>
              <p style={{ margin: 0, color: "var(--rojo-claro)" }}>
                {invento.precision}
              </p>
            </>
          )}
        </>
      }
    />
  );
}
