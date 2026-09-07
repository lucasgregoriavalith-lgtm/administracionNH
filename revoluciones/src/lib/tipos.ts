/* ===========================================================================
   MODELO DE DATOS
   Todo el contenido historico vive en `src/data/` con estas formas. Los
   componentes visuales no contienen texto historico: solo saben pintar
   estas estructuras. Asi se puede corregir o ampliar el contenido sin
   tocar la interfaz.
   =========================================================================== */

/** Las cuatro areas tematicas sobre las que se mide el dominio. */
export type Tema = "concepto" | "eeuu" | "francia" | "industrial";

export const NOMBRE_TEMA: Record<Tema, string> = {
  concepto: "Concepto de revolución",
  eeuu: "Independencia de Estados Unidos",
  francia: "Revolución Francesa",
  industrial: "Revolución Industrial",
};

/* --- Contenido historico ------------------------------------------------- */

export interface Evento {
  id: string;
  /** Año o rango tal como se muestra en la linea de tiempo. */
  fecha: string;
  /** Fecha precisa cuando se conoce (dia y mes). Opcional a proposito. */
  fechaExacta?: string;
  titulo: string;
  resumen: string;
  explicacion: string;
  importancia: string;
  tema: Tema;
}

export interface Personaje {
  id: string;
  nombre: string;
  años: string;
  /** Etiqueta breve del papel: "Rey de Francia", "Periodista"... */
  rol: string;
  quienEra: string;
  papel: string;
  ideas: string;
  relacion: string;
  /**
   * No todos los personajes tuvieron el mismo peso en el proceso. Este campo
   * evita presentarlos como protagonistas equivalentes.
   */
  relevancia: "central" | "destacada" | "posterior";
  acento: "azul" | "rojo" | "neutro";
}

export interface Concepto {
  id: string;
  termino: string;
  definicion: string;
  ejemplo: string;
}

export interface Invento {
  id: string;
  nombre: string;
  fecha: string;
  autor: string;
  problema: string;
  cambio: string;
  /** Aclaracion cuando existe una atribucion popular equivocada. */
  precision?: string;
}

export interface Curiosidad {
  id: string;
  titulo: string;
  texto: string;
  tema: Tema;
}

export interface TipoRevolucion {
  id: string;
  nombre: string;
  campo: string;
  queEs: string;
  ejemplo: string;
  queCambio: string;
  porQueEsRevolucionaria: string;
  acento: "azul" | "rojo";
}

/* --- Preguntas y actividades --------------------------------------------- */

export type TipoPregunta =
  | "opcion-unica"
  | "opcion-multiple"
  | "verdadero-falso"
  | "clasificar"
  | "ordenar"
  | "relacionar";

export interface Opcion {
  id: string;
  texto: string;
  /** Por que esta opcion concreta es correcta, incompleta o incorrecta. */
  devolucion: string;
}

export interface Pregunta {
  id: string;
  tipo: "opcion-unica" | "opcion-multiple" | "verdadero-falso";
  tema: Tema;
  enunciado: string;
  ayuda?: string;
  opciones: Opcion[];
  /** Ids de las opciones correctas. */
  correctas: string[];
  /** Permite responder "ninguna de las anteriores". */
  admiteNinguna?: boolean;
  explicacion: string;
}

export interface ItemClasificar {
  id: string;
  texto: string;
  categoria: string;
  explicacion: string;
}

export interface ItemOrdenar {
  id: string;
  texto: string;
  fecha: string;
  /** Posicion correcta, empezando en 1. */
  orden: number;
}

export interface ParRelacionar {
  id: string;
  izquierda: string;
  derecha: string;
  explicacion: string;
}

/* --- Progreso y puntaje --------------------------------------------------- */

export interface RegistroRespuesta {
  actividadId: string;
  tema: Tema;
  correcta: boolean;
  intentos: number;
  puntos: number;
  momento: string;
}

export interface ResultadoTema {
  correctas: number;
  total: number;
  puntos: number;
}

export interface Estudiante {
  nombre: string;
  curso: string;
}

export interface EstadoProgreso {
  estudiante: Estudiante | null;
  respuestas: Record<string, RegistroRespuesta>;
  seccionesVisitadas: string[];
  evaluacionCompletada: boolean;
  iniciadoEn: string | null;
}
