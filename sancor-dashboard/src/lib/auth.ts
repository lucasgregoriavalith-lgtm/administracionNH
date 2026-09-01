import { cookies } from "next/headers";

import { COOKIE_SESION, verificarToken } from "./sesion";
import type { Sesion } from "./types";

export { COOKIE_SESION, crearToken, opcionesCookie, verificarToken } from "./sesion";

/** Sesión actual leída de la cookie, o null si no hay una válida. */
export async function obtenerSesion(): Promise<Sesion | null> {
  const almacen = await cookies();
  return verificarToken(almacen.get(COOKIE_SESION)?.value);
}
