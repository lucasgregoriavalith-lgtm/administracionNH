import { obtenerSesion } from "./auth";
import { modoDatos } from "./config";
import { obtenerDataset } from "./data";
import type { Dataset, Sesion } from "./types";

export type Contexto = { sesion: Sesion; dataset: Dataset };

export type ErrorEscritura = { mensaje: string; estado: number };

/**
 * Valida que haya sesión y que la app pueda escribir en el Sheet.
 * Devuelve el contexto listo para usar, o el error a responder.
 */
export async function prepararEscritura(): Promise<
  { ok: true; contexto: Contexto } | { ok: false; error: ErrorEscritura }
> {
  const sesion = await obtenerSesion();
  if (!sesion) return { ok: false, error: { mensaje: "No autenticado.", estado: 401 } };

  if (modoDatos === "demo") {
    return {
      ok: false,
      error: {
        mensaje:
          "Estás en modo demostración: todavía no hay una planilla conectada, así que no se " +
          "puede guardar. Configurá las credenciales de Google para habilitar la carga.",
        estado: 400,
      },
    };
  }

  const dataset = await obtenerDataset();
  if (dataset.error) {
    return { ok: false, error: { mensaje: dataset.error, estado: 502 } };
  }

  return { ok: true, contexto: { sesion, dataset } };
}

/**
 * Un vendedor sólo puede cargar datos a su propio nombre.
 * El gerente puede elegir a cualquier asesor del equipo.
 */
export function resolverAsesor(
  sesion: Sesion,
  solicitado: string,
): { ok: true; asesor: string } | { ok: false; error: ErrorEscritura } {
  if (sesion.rol === "vendedor") return { ok: true, asesor: sesion.asesor };

  const asesor = (solicitado ?? "").trim();
  if (!asesor) {
    return { ok: false, error: { mensaje: "Elegí el vendedor al que corresponde el registro.", estado: 400 } };
  }
  return { ok: true, asesor };
}

export function zonaDeAsesor(dataset: Dataset, asesor: string): string {
  const encontrado = dataset.asesores.find(
    (a) => a.nombre.toLowerCase() === asesor.trim().toLowerCase(),
  );
  return encontrado?.zona ?? "";
}

const FECHA_ISO = /^\d{4}-\d{2}-\d{2}$/;

export function validarFecha(valor: unknown): string | null {
  const texto = String(valor ?? "").trim();
  if (!FECHA_ISO.test(texto)) return null;
  const fecha = new Date(`${texto}T00:00:00Z`);
  return Number.isNaN(fecha.getTime()) ? null : texto;
}

export function aNumeroPositivo(valor: unknown, porDefecto = 0): number {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < 0) return porDefecto;
  return numero;
}

export function recortar(valor: unknown, largo = 300): string {
  return String(valor ?? "").trim().slice(0, largo);
}
