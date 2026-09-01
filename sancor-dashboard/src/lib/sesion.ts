import { jwtVerify, SignJWT } from "jose";

import { config } from "./config";
import type { Rol, Sesion } from "./types";

/**
 * Firma y verificación del token de sesión.
 * Este módulo no usa APIs de Node, así que también funciona en el middleware.
 */

export const COOKIE_SESION = "sancor_sesion";
const DURACION_HORAS = 12;

function claveSecreta(): Uint8Array {
  return new TextEncoder().encode(config.auth.secret);
}

export async function crearToken(sesion: Sesion): Promise<string> {
  return new SignJWT({ ...sesion })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DURACION_HORAS}h`)
    .sign(claveSecreta());
}

export async function verificarToken(token: string | undefined): Promise<Sesion | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, claveSecreta());
    if (typeof payload.usuario !== "string") return null;
    const rol: Rol = payload.rol === "gerente" ? "gerente" : "vendedor";
    return {
      usuario: payload.usuario,
      nombre: typeof payload.nombre === "string" ? payload.nombre : payload.usuario,
      rol,
      asesor: typeof payload.asesor === "string" ? payload.asesor : "",
    };
  } catch {
    return null;
  }
}

export const opcionesCookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: DURACION_HORAS * 60 * 60,
};
