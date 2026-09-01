import { NextResponse } from "next/server";

import { COOKIE_SESION, crearToken, opcionesCookie } from "@/lib/auth";
import { verificarCredenciales } from "@/lib/usuarios";

export const runtime = "nodejs";

/** Freno simple contra intentos repetidos de adivinar contraseñas. */
const intentos = new Map<string, { cantidad: number; hasta: number }>();
const MAX_INTENTOS = 8;
const BLOQUEO_MS = 5 * 60 * 1000;

/** Descarta los bloqueos ya vencidos para que el Map no crezca indefinidamente. */
function limpiarIntentos(ahora: number): void {
  if (intentos.size < 500) return;
  for (const [clave, registro] of intentos) {
    if (registro.hasta <= ahora) intentos.delete(clave);
  }
}

function identificar(request: Request): string {
  const cabecera = request.headers.get("x-forwarded-for") ?? "";
  return cabecera.split(",")[0]?.trim() || "desconocido";
}

export async function POST(request: Request) {
  const origen = identificar(request);
  const ahora = Date.now();
  limpiarIntentos(ahora);
  const registro = intentos.get(origen);

  if (registro && registro.cantidad >= MAX_INTENTOS && registro.hasta > ahora) {
    const minutos = Math.ceil((registro.hasta - ahora) / 60000);
    return NextResponse.json(
      { error: `Demasiados intentos fallidos. Probá de nuevo en ${minutos} minuto(s).` },
      { status: 429 },
    );
  }

  let cuerpo: { usuario?: string; password?: string };
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const resultado = await verificarCredenciales(cuerpo.usuario ?? "", cuerpo.password ?? "");

  if (!resultado.ok) {
    const previo = registro && registro.hasta > ahora ? registro.cantidad : 0;
    intentos.set(origen, { cantidad: previo + 1, hasta: ahora + BLOQUEO_MS });
    return NextResponse.json({ error: resultado.motivo }, { status: 401 });
  }

  intentos.delete(origen);

  const respuesta = NextResponse.json({ ok: true, rol: resultado.sesion.rol });
  respuesta.cookies.set(COOKIE_SESION, await crearToken(resultado.sesion), opcionesCookie);
  return respuesta;
}
