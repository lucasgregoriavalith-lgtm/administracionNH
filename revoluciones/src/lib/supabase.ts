import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ===========================================================================
   CLIENTE DE SUPABASE — SOLO DEL LADO DEL SERVIDOR
   El navegador nunca habla directamente con la base de datos: todo pasa por
   los Route Handlers de /api. Por eso la clave usada acá es la service role
   key, que NO lleva el prefijo NEXT_PUBLIC_ y por lo tanto Next.js nunca la
   envía al navegador.
   Gracias a esto, las políticas RLS pueden negar todo acceso anónimo.
   =========================================================================== */

let cliente: SupabaseClient | null = null;

/** Devuelve el cliente, o null si la base de datos no está configurada. */
export function obtenerSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Sin variables de entorno la aplicación funciona igual, guardando el
  // progreso solo en el navegador del estudiante.
  if (!url || !clave) return null;

  if (!cliente) {
    cliente = createClient(url, clave, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cliente;
}

export function hayBaseDeDatos(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Compara dos cadenas en tiempo constante para que el tiempo de respuesta no
 * filtre información sobre la contraseña del docente.
 */
export function comparacionSegura(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferencia = 0;
  for (let i = 0; i < a.length; i++) {
    diferencia |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diferencia === 0;
}
