import { REVOLUCION_CONFLICTO_GUERRA, RELACIONES_CLAVE } from "@/data/concepto";
import estilos from "./concepto.module.css";

/** Comparación visual REVOLUCIÓN vs CONFLICTO vs GUERRA. */
export function ComparacionTres() {
  return (
    <>
      <div className={estilos.tresColumnas}>
        {REVOLUCION_CONFLICTO_GUERRA.map((columna, i) => (
          <div key={columna.id} style={{ display: "contents" }}>
            <article className={estilos.columna} data-acento={columna.acento}>
              <h3 className={estilos.tituloColumna}>{columna.titulo}</h3>
              <p className={estilos.defColumna}>{columna.definicion}</p>
              <p className={estilos.senalColumna}>{columna.senal}</p>
              <p className={estilos.ejemploColumna}>
                <span className={estilos.etiquetaEjemplo}>Un ejemplo real</span>
                {columna.ejemplo}
              </p>
            </article>
            {i < REVOLUCION_CONFLICTO_GUERRA.length - 1 && (
              <p className={estilos.separadorVs} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <div className={estilos.relaciones} style={{ marginTop: "1.75rem" }}>
        {RELACIONES_CLAVE.map((relacion) => (
          <div key={relacion.id} className={estilos.relacion}>
            <p className={estilos.relacionFrase}>{relacion.frase}</p>
            <p className={estilos.relacionEjemplo}>{relacion.ejemplo}</p>
          </div>
        ))}
      </div>
    </>
  );
}
