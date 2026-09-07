import { NextResponse } from "next/server";
import { hayBaseDeDatos, obtenerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===========================================================================
   POST /api/resultados
   Guarda el resultado de una sesión de estudiante.
   Datos que se guardan: nombre (o apodo), curso, fecha, puntaje y respuestas.
   Datos que NO se piden ni se guardan: correo, teléfono, dirección, edad,
   documento ni ningún otro dato personal.
   =========================================================================== */

const LIMITE_NOMBRE = 60;
const LIMITE_CURSO = 40;
const LIMITE_RESPUESTAS = 200;

interface RespuestaEntrante {
  actividadId?: unknown;
  tema?: unknown;
  correcta?: unknown;
  intentos?: unknown;
  puntos?: unknown;
}

function textoLimpio(valor: unknown, limite: number): string {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, limite);
}

function enteroNoNegativo(valor: unknown): number {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < 0) return 0;
  return Math.floor(numero);
}

export async function POST(peticion: Request) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await peticion.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Cuerpo no válido" }, { status: 400 });
  }

  const nombre = textoLimpio(cuerpo.nombre, LIMITE_NOMBRE);
  if (!nombre) {
    return NextResponse.json(
      { error: "Falta el nombre del estudiante" },
      { status: 400 },
    );
  }

  const supabase = obtenerSupabase();
  if (!supabase) {
    // Modo sin base de datos: no es un error, es una configuración válida.
    return NextResponse.json({ guardado: false, motivo: "sin-base-de-datos" });
  }

  const sesion = {
    nombre,
    curso: textoLimpio(cuerpo.curso, LIMITE_CURSO) || null,
    puntaje: enteroNoNegativo(cuerpo.puntaje),
    puntaje_maximo: enteroNoNegativo(cuerpo.puntajeMaximo),
    correctas: enteroNoNegativo(cuerpo.correctas),
    incorrectas: enteroNoNegativo(cuerpo.incorrectas),
    total: enteroNoNegativo(cuerpo.total),
    porcentaje: Math.min(100, enteroNoNegativo(cuerpo.porcentaje)),
    por_tema: cuerpo.porTema ?? {},
    completado: Boolean(cuerpo.completado),
  };

  const { data, error } = await supabase
    .from("sesiones_estudiante")
    .insert(sesion)
    .select("id")
    .single();

  if (error || !data) {
    console.error("No se pudo guardar la sesión:", error?.message);
    return NextResponse.json(
      { guardado: false, motivo: "error-al-guardar" },
      { status: 502 },
    );
  }

  const entrantes = Array.isArray(cuerpo.respuestas)
    ? (cuerpo.respuestas as RespuestaEntrante[]).slice(0, LIMITE_RESPUESTAS)
    : [];

  if (entrantes.length > 0) {
    const respuestas = entrantes.map((r) => ({
      sesion_id: data.id,
      actividad_id: textoLimpio(r.actividadId, 120),
      tema: textoLimpio(r.tema, 30),
      correcta: Boolean(r.correcta),
      intentos: enteroNoNegativo(r.intentos),
      puntos: enteroNoNegativo(r.puntos),
    }));

    const { error: errorRespuestas } = await supabase
      .from("respuestas")
      .insert(respuestas);

    if (errorRespuestas) {
      // La sesión ya quedó guardada; el detalle por pregunta es secundario.
      console.error("No se pudieron guardar las respuestas:", errorRespuestas.message);
    }
  }

  return NextResponse.json({ guardado: true, id: data.id });
}
