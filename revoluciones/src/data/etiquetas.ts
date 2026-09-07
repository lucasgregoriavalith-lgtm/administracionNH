import { PREGUNTAS_EVALUACION } from "./evaluacion";
import {
  ITEMS_JUEGO1,
  ITEMS_JUEGO3,
  RONDAS_ORDENAR,
  VERDADERO_FALSO,
} from "./juegos";
import { REPASO_EEUU, REPASO_FRANCIA, REPASO_INDUSTRIAL } from "./repaso";
import { CASOS_REVOLUCION } from "./otrasRevoluciones";
import { CLASIFICAR_EVALUACION, ORDENAR_EVALUACION, RELACIONAR_EVALUACION } from "./evaluacion";

/* ===========================================================================
   Traduce el identificador interno de cada actividad a un texto legible.
   Lo usa el panel del docente para mostrar qué preguntas fallaron más, sin
   tener que guardar el enunciado completo en la base de datos.
   =========================================================================== */

function construir(): Record<string, string> {
  const mapa: Record<string, string> = {
    "concepto-hipotesis": "¿Qué creés que significa revolución? (hipótesis inicial)",
    [ORDENAR_EVALUACION.id]: "Evaluación · ordenar acontecimientos de las tres revoluciones",
    [RELACIONAR_EVALUACION.id]: "Evaluación · relacionar causas con consecuencias",
    "relacionar-fechas": "Juego 5 · relacionar fechas con acontecimientos",
    "cadenas-eeuu": "Juego 5 · cadenas causales de Estados Unidos",
    "cadenas-francia": "Juego 5 · cadenas causales de Francia",
    "cadenas-industrial": "Juego 5 · cadenas causales de la Revolución Industrial",
  };

  for (const pregunta of [
    ...PREGUNTAS_EVALUACION,
    ...VERDADERO_FALSO,
    ...REPASO_EEUU,
    ...REPASO_FRANCIA,
    ...REPASO_INDUSTRIAL,
  ]) {
    mapa[pregunta.id] = pregunta.enunciado;
  }

  for (const caso of CASOS_REVOLUCION) {
    mapa[`caso:${caso.id}`] = `¿Es una revolución? · ${caso.titulo}`;
  }

  for (const item of ITEMS_JUEGO1) {
    mapa[`juego1:${item.id}`] = `¿Revolución o no? · ${item.texto}`;
  }

  for (const item of ITEMS_JUEGO3) {
    mapa[`juego3:${item.id}`] = `¿A qué revolución pertenece? · ${item.texto}`;
  }

  for (const item of CLASIFICAR_EVALUACION.items) {
    mapa[`${CLASIFICAR_EVALUACION.id}:${item.id}`] =
      `Evaluación · clasificar: ${item.texto}`;
  }

  for (const ronda of RONDAS_ORDENAR) {
    mapa[ronda.id] = `Ordená la historia · ${ronda.titulo}`;
  }

  return mapa;
}

export const ETIQUETAS_ACTIVIDAD: Record<string, string> = construir();

export function etiquetaDe(actividadId: string): string {
  return ETIQUETAS_ACTIVIDAD[actividadId] ?? actividadId;
}
