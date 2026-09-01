import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { obtenerSesion } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Devuelve el hash bcrypt de una contraseña para pegarlo en la columna
 * PASSWORD_HASH de la hoja USUARIOS. La contraseña en claro no se guarda.
 */
export async function POST(request: Request) {
  const sesion = await obtenerSesion();
  if (!sesion) return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  if (sesion.rol !== "gerente") {
    return NextResponse.json({ error: "Sólo el gerente puede generar contraseñas." }, { status: 403 });
  }

  const cuerpo = (await request.json().catch(() => ({}))) as { password?: string };
  const password = String(cuerpo.password ?? "");

  if (password.length < 8) {
    return NextResponse.json(
      { error: "La contraseña tiene que tener al menos 8 caracteres." },
      { status: 400 },
    );
  }

  return NextResponse.json({ hash: await bcrypt.hash(password, 10) });
}
