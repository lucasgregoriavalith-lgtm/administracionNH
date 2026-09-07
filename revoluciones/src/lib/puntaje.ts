import type {
  EstadoProgreso,
  RegistroRespuesta,
  ResultadoTema,
  Tema,
} from "./tipos";

/* ===========================================================================
   SISTEMA DE PUNTUACIÓN
   Reglas:
   - Acertar en el primer intento: 10 puntos.
   - Acertar en el segundo intento: 5 puntos.
   - No acertar: 0 puntos, nunca puntaje negativo.
   El objetivo es medir el aprendizaje, no castigar el error. Equivocarse
   forma parte del recorrido: siempre se muestra la explicacion.
   =========================================================================== */

export const PUNTOS_PRIMER_INTENTO = 10;
export const PUNTOS_SEGUNDO_INTENTO = 5;
export const INTENTOS_MAXIMOS = 2;

export function calcularPuntos(intentos: number, correcta: boolean): number {
  if (!correcta) return 0;
  if (intentos <= 1) return PUNTOS_PRIMER_INTENTO;
  return PUNTOS_SEGUNDO_INTENTO;
}

/** Compara dos conjuntos de ids sin importar el orden. */
export function mismasOpciones(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const ordenA = [...a].sort();
  const ordenB = [...b].sort();
  return ordenA.every((valor, i) => valor === ordenB[i]);
}

export const TEMAS: Tema[] = ["concepto", "eeuu", "francia", "industrial"];

export function resultadosPorTema(
  respuestas: Record<string, RegistroRespuesta>,
): Record<Tema, ResultadoTema> {
  const base = {} as Record<Tema, ResultadoTema>;
  for (const tema of TEMAS) base[tema] = { correctas: 0, total: 0, puntos: 0 };

  for (const registro of Object.values(respuestas)) {
    const acumulado = base[registro.tema];
    if (!acumulado) continue;
    acumulado.total += 1;
    acumulado.puntos += registro.puntos;
    if (registro.correcta) acumulado.correctas += 1;
  }
  return base;
}

export interface Resumen {
  puntaje: number;
  puntajeMaximo: number;
  correctas: number;
  incorrectas: number;
  total: number;
  porcentaje: number;
  porTema: Record<Tema, ResultadoTema>;
}

export function resumir(estado: EstadoProgreso): Resumen {
  const registros = Object.values(estado.respuestas);
  const puntaje = registros.reduce((suma, r) => suma + r.puntos, 0);
  const correctas = registros.filter((r) => r.correcta).length;
  const total = registros.length;
  const puntajeMaximo = total * PUNTOS_PRIMER_INTENTO;

  return {
    puntaje,
    puntajeMaximo,
    correctas,
    incorrectas: total - correctas,
    total,
    porcentaje: total === 0 ? 0 : Math.round((correctas / total) * 100),
    porTema: resultadosPorTema(estado.respuestas),
  };
}

/** Porcentaje de dominio de un tema (0-100). Devuelve null si no se practicó. */
export function dominio(resultado: ResultadoTema): number | null {
  if (resultado.total === 0) return null;
  return Math.round((resultado.correctas / resultado.total) * 100);
}

/* ---------------------------------------------------------------------------
   PLAN DE REPASO PERSONALIZADO
   Se arma con los temas de menor dominio y con los errores concretos.
   --------------------------------------------------------------------------- */

export const SUGERENCIAS_REPASO: Record<Tema, string[]> = {
  concepto: [
    "La diferencia entre revolución, conflicto y guerra.",
    "Por qué un cambio de gobierno no es siempre una revolución.",
    "Los tipos de revolución: política, social, tecnológica, científica, artística, musical y deportiva.",
  ],
  eeuu: [
    "La línea de tiempo de la independencia, de 1763 a 1783.",
    "El reclamo de representación: 'ningún impuesto sin representación'.",
    "El papel de Francia en la victoria de Yorktown.",
  ],
  francia: [
    "Las causas de la Revolución Francesa: deuda, desigualdad, hambre e ideas.",
    "La sociedad dividida en tres estados.",
    "Las etapas del proceso: monarquía constitucional, república, Terror y Directorio.",
  ],
  industrial: [
    "Por qué la Revolución Industrial fue mucho más que máquinas nuevas.",
    "Las consecuencias positivas y los costos sociales.",
    "Quién inventó qué: Newcomen y Watt, Trevithick y Stephenson.",
  ],
};

export function planDeRepaso(resumen: Resumen): { tema: Tema; puntos: string[] }[] {
  const plan: { tema: Tema; puntos: string[] }[] = [];
  for (const tema of TEMAS) {
    const resultado = resumen.porTema[tema];
    const nivel = dominio(resultado);
    // Se propone repaso si no llego al 75 % o si directamente no practico el tema.
    if (nivel === null || nivel < 75) {
      plan.push({ tema, puntos: SUGERENCIAS_REPASO[tema] });
    }
  }
  return plan;
}

export function mensajeDeCierre(porcentaje: number, total: number): string {
  if (total === 0) {
    return "Todavía no registraste actividades. Empezá por la sección del concepto y volvé cuando termines el recorrido.";
  }
  if (porcentaje >= 90) {
    return "Tenés un dominio muy sólido del tema. Podés usar las preguntas abiertas del final para discutir en clase.";
  }
  if (porcentaje >= 75) {
    return "Comprendiste bien las ideas principales. Repasá los puntos de abajo para afirmar lo que quedó flojo.";
  }
  if (porcentaje >= 50) {
    return "Vas por buen camino. Hay ideas que ya dominás y otras que conviene volver a recorrer con calma.";
  }
  return "Conviene volver a recorrer las secciones antes de repetir la evaluación. Los errores marcan exactamente por dónde empezar.";
}
