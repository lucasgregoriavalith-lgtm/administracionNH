import { Bandera, type ClaveBandera } from "../Bandera";
import estilos from "./seccion.module.css";

/** Fondo gráfico del encabezado: líneas que se inclinan y un bloque partido. */
function FondoHero({ acento }: { acento: "azul" | "rojo" }) {
  const color = acento === "rojo" ? "rgba(224,49,49,0.3)" : "rgba(45,107,255,0.32)";
  return (
    <svg
      className={estilos.heroFondo}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <g stroke="rgba(245,246,248,0.06)" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={840 + i * 46} y1="0" x2={740 + i * 46} y2="400" />
        ))}
      </g>
      <rect x="960" y="70" width="130" height="130" fill="none" stroke={color} strokeWidth="1.5" />
      <rect
        x="1000"
        y="120"
        width="130"
        height="130"
        fill="none"
        stroke="rgba(245,246,248,0.12)"
        strokeWidth="1.5"
        transform="rotate(11 1065 185)"
      />
    </svg>
  );
}

export function EncabezadoHistorico({
  fecha,
  titulo,
  subtitulo,
  entrada,
  porQueEsRevolucion,
  banderas,
  acento = "azul",
}: {
  fecha: string;
  titulo: string;
  subtitulo: string;
  entrada: string;
  porQueEsRevolucion: string;
  banderas: ClaveBandera[];
  acento?: "azul" | "rojo";
}) {
  return (
    <section className={estilos.hero}>
      <FondoHero acento={acento} />
      <div className={`contenedor ${estilos.heroFila}`}>
        <div className={estilos.heroTexto}>
          <p className={estilos.fechaGrande} data-acento={acento}>
            {fecha}
          </p>
          <h1 className={estilos.heroTitulo}>{titulo}</h1>
          <p className={estilos.heroSubtitulo}>{subtitulo}</p>
          <p className={estilos.heroEntrada}>{entrada}</p>
          <div className={estilos.porQue} data-acento={acento}>
            <p className={estilos.porQueTitulo}>¿Por qué es una revolución?</p>
            <p className={estilos.porQueTexto}>{porQueEsRevolucion}</p>
          </div>
        </div>
        <div className={estilos.banderas}>
          {banderas.map((clave) => (
            <Bandera key={clave} clave={clave} ancho={132} conNota />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BloquesContexto({
  bloques,
}: {
  bloques: { id: string; titulo: string; texto: string }[];
}) {
  return (
    <div className={estilos.contexto}>
      {bloques.map((bloque) => (
        <article key={bloque.id} className={estilos.bloqueContexto}>
          <h3 className={estilos.tituloContexto}>{bloque.titulo}</h3>
          <p className={estilos.textoContexto}>{bloque.texto}</p>
        </article>
      ))}
    </div>
  );
}
