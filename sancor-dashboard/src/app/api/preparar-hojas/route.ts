import { NextResponse } from "next/server";

import { obtenerSesion } from "@/lib/auth";
import { modoDatos } from "@/lib/config";
import { invalidarCache } from "@/lib/data";
import { prepararHojas } from "@/lib/sheets";

export const runtime = "nodejs";

/** Crea en el Sheet las hojas que falten, con sus encabezados. Sólo el gerente. */
export async function POST() {
  const sesion = await obtenerSesion();
  if (!sesion) return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  if (sesion.rol !== "gerente") {
    return NextResponse.json({ error: "Sólo el gerente puede hacer esto." }, { status: 403 });
  }
  if (modoDatos === "demo") {
    return NextResponse.json(
      { error: "No hay ninguna planilla conectada todavía." },
      { status: 400 },
    );
  }

  try {
    const acciones = await prepararHojas();
    invalidarCache();
    return NextResponse.json({ ok: true, acciones });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudieron preparar las hojas.";
    return NextResponse.json({ error: mensaje }, { status: 502 });
  }
}
