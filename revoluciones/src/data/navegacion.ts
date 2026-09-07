import type { Tema } from "@/lib/tipos";

export interface EntradaNav {
  href: string;
  etiqueta: string;
  /** Etiqueta corta para la barra de recorrido. */
  corta: string;
  /** Si forma parte del recorrido con progreso. */
  enRecorrido: boolean;
  tema?: Tema;
}

export const NAVEGACION: EntradaNav[] = [
  { href: "/", etiqueta: "Inicio", corta: "Inicio", enRecorrido: false },
  { href: "/concepto", etiqueta: "¿Qué es una revolución?", corta: "Concepto", enRecorrido: true, tema: "concepto" },
  { href: "/estados-unidos", etiqueta: "Independencia de Estados Unidos", corta: "Estados Unidos", enRecorrido: true, tema: "eeuu" },
  { href: "/francia", etiqueta: "Revolución Francesa", corta: "Francia", enRecorrido: true, tema: "francia" },
  { href: "/industrial", etiqueta: "Revolución Industrial", corta: "Industria", enRecorrido: true, tema: "industrial" },
  { href: "/comparar", etiqueta: "Comparar", corta: "Comparación", enRecorrido: true },
  { href: "/desafios", etiqueta: "Desafíos", corta: "Desafíos", enRecorrido: true },
  { href: "/evaluacion", etiqueta: "Evaluación final", corta: "Evaluación", enRecorrido: true },
];

export const RECORRIDO = NAVEGACION.filter((n) => n.enRecorrido);

/** Siguiente paso sugerido al terminar cada seccion. */
export const SIGUIENTE_PASO: Record<string, { href: string; etiqueta: string }> = {
  "/": { href: "/concepto", etiqueta: "Empezar por el concepto" },
  "/concepto": { href: "/estados-unidos", etiqueta: "Ir a la Independencia de Estados Unidos" },
  "/estados-unidos": { href: "/francia", etiqueta: "Ir a la Revolución Francesa" },
  "/francia": { href: "/industrial", etiqueta: "Ir a la Revolución Industrial" },
  "/industrial": { href: "/comparar", etiqueta: "Comparar las tres revoluciones" },
  "/comparar": { href: "/desafios", etiqueta: "Ir a los desafíos" },
  "/desafios": { href: "/evaluacion", etiqueta: "Ir a la evaluación final" },
  "/evaluacion": { href: "/resultados", etiqueta: "Ver mis resultados" },
};
