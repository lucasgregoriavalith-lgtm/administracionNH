import { TRES_ESTADOS } from "@/data/francia";
import estilos from "./seccion.module.css";

/**
 * Representación visual de la sociedad estamental francesa.
 * La barra superior muestra el peso demográfico real de cada estado: es el
 * dato que hace evidente la desigualdad, mucho más que cualquier explicación.
 */
export function TresEstados() {
  const COLORES: Record<string, string> = {
    clero: "var(--azul)",
    nobleza: "var(--rojo)",
    "tercer-estado": "var(--negro-5)",
  };

  return (
    <div>
      <p
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--gris-suave)",
          marginBottom: "0.5rem",
        }}
      >
        Peso de cada estado sobre el total de la población
      </p>

      <div
        className={estilos.barraPoblacion}
        role="img"
        aria-label="El clero representaba menos del 1 por ciento de la población, la nobleza alrededor del 1,5 por ciento y el Tercer Estado cerca del 98 por ciento."
      >
        {TRES_ESTADOS.map((estado) => (
          <div
            key={estado.id}
            className={estilos.trozo}
            style={{
              width: `${estado.proporcion}%`,
              background: COLORES[estado.id],
              minWidth: estado.proporcion < 3 ? "4px" : undefined,
            }}
            title={`${estado.quienes}: ${estado.proporcionTexto}`}
          >
            {estado.proporcion > 20 ? "Tercer Estado · 98 %" : ""}
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--gris-suave)",
          margin: "0 0 1.5rem",
          lineHeight: 1.5,
        }}
      >
        Las dos franjas de la izquierda son el clero (azul) y la nobleza (rojo).
        Son tan finas que casi no se ven: esa es exactamente la idea. Las
        proporciones son estimaciones que manejan los historiadores para una
        población de unos 28 millones de habitantes.
      </p>

      <div className={estilos.estados}>
        {TRES_ESTADOS.map((estado) => (
          <article key={estado.id} className={estilos.estado} data-acento={estado.acento}>
            <div className={estilos.estadoCabecera}>
              <h3 className={estilos.estadoNombre}>{estado.nombre}</h3>
              <p className={estilos.estadoProporcion}>{estado.proporcionTexto}</p>
            </div>
            <p className={estilos.estadoQuienes}>{estado.quienes}</p>
            <p className={estilos.estadoPrivilegios}>{estado.privilegios}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
