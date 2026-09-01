import { NextResponse } from "next/server";

import { obtenerSesion } from "@/lib/auth";
import { invalidarCache } from "@/lib/data";

export const runtime = "nodejs";

/** Fuerza la próxima lectura del Google Sheet, sin esperar a que venza el cache. */
export async function POST() {
  const sesion = await obtenerSesion();
  if (!sesion) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  invalidarCache();
  return NextResponse.json({ ok: true });
}
