import { NextResponse } from "next/server";
import { comparacionSegura, obtenerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===========================================================================
   POST /api/docente
   Devuelve los resultados agregados para el panel del docente.
   Se usa POST (y no GET) para que la contraseña no quede escrita en la URL
   ni en los registros del servidor.
   =========================================================================== */

const LIMITE_SESIONES = 500;

interface FilaSesion {
  id: string;
  nombre: string;
  curso: string | null;
  puntaje: number;
  correctas: number;
  incorrectas: number;
  total: number;
  porcentaje: number;
  por_tema: Record<string, { correctas: number; total: number }> | null;
  completado: boolean;
  creado_en: string;
}

interface FilaRespuesta {
  actividad_id: string;
  tema: string;
  correcta: boolean;
}

export async function POST(peticion: Request) {
  let cuerpo: { clave?: unknown };
  try {
    cuerpo = (await peticion.json()) as { clave?: unknown };
  } catch {
    return NextResponse.json({ error: "Cuerpo no válido" }, { status: 400 });
  }

  const esperada = process.env.TEACHER_PASSWORD;
  if (!esperada) {
    return NextResponse.json(
      { error: "sin-contrasena", mensaje: "Falta configurar TEACHER_PASSWORD." },
      { status: 503 },
    );
  }

  const recibida = typeof cuerpo.clave === "string" ? cuerpo.clave : "";
  if (!comparacionSegura(recibida, esperada)) {
    return NextResponse.json({ error: "clave-incorrecta" }, { status: 401 });
  }

  const supabase = obtenerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        error: "sin-base-de-datos",
        mensaje:
          "La base de datos no está configurada. Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 },
    );
  }

  const { data: sesiones, error } = await supabase
    .from("sesiones_estudiante")
    .select(
      "id, nombre, curso, puntaje, correctas, incorrectas, total, porcentaje, por_tema, completado, creado_en",
    )
    .order("creado_en", { ascending: false })
    .limit(LIMITE_SESIONES);

  if (error) {
    console.error("No se pudieron leer las sesiones:", error.message);
    return NextResponse.json({ error: "error-al-leer" }, { status: 502 });
  }

  const filas = (sesiones ?? []) as FilaSesion[];

  const { data: respuestas } = await supabase
    .from("respuestas")
    .select("actividad_id, tema, correcta")
    .limit(20000);

  const filasRespuesta = (respuestas ?? []) as FilaRespuesta[];

  /* --- Promedios ---------------------------------------------------------- */
  const cantidad = filas.length;
  const puntajePromedio =
    cantidad === 0
      ? 0
      : Math.round(filas.reduce((s, f) => s + (f.puntaje ?? 0), 0) / cantidad);
  const porcentajePromedio =
    cantidad === 0
      ? 0
      : Math.round(filas.reduce((s, f) => s + (f.porcentaje ?? 0), 0) / cantidad);

  /* --- Resultados por tema ------------------------------------------------ */
  const porTema: Record<string, { correctas: number; total: number }> = {};
  for (const respuesta of filasRespuesta) {
    const tema = respuesta.tema || "sin-tema";
    porTema[tema] ??= { correctas: 0, total: 0 };
    porTema[tema].total += 1;
    if (respuesta.correcta) porTema[tema].correctas += 1;
  }

  /* --- Actividades con más errores ---------------------------------------- */
  const porActividad: Record<string, { correctas: number; total: number }> = {};
  for (const respuesta of filasRespuesta) {
    const id = respuesta.actividad_id;
    porActividad[id] ??= { correctas: 0, total: 0 };
    porActividad[id].total += 1;
    if (respuesta.correcta) porActividad[id].correctas += 1;
  }

  const actividades = Object.entries(porActividad)
    .filter(([, v]) => v.total >= 2)
    .map(([actividadId, v]) => ({
      actividadId,
      total: v.total,
      correctas: v.correctas,
      porcentajeAcierto: Math.round((v.correctas / v.total) * 100),
    }))
    .sort((a, b) => a.porcentajeAcierto - b.porcentajeAcierto);

  return NextResponse.json({
    cantidadEstudiantes: cantidad,
    puntajePromedio,
    porcentajePromedio,
    completaron: filas.filter((f) => f.completado).length,
    porTema,
    actividadesConMasErrores: actividades.slice(0, 12),
    actividadesMejorResueltas: [...actividades].reverse().slice(0, 5),
    sesiones: filas.map((f) => ({
      id: f.id,
      nombre: f.nombre,
      curso: f.curso,
      puntaje: f.puntaje,
      correctas: f.correctas,
      total: f.total,
      porcentaje: f.porcentaje,
      completado: f.completado,
      fecha: f.creado_en,
      porTema: f.por_tema ?? {},
    })),
  });
}
