import { redirect } from "next/navigation";

import { obtenerSesion } from "./auth";
import { obtenerDataset } from "./data";
import { aplicarRol, parseFiltros, type Filtros, type ParametrosBusqueda } from "./filtros";
import { resolverRango, type Rango } from "./metricas";
import type { Dataset, Sesion } from "./types";

export type ContextoPagina = {
  sesion: Sesion;
  dataset: Dataset;
  filtros: Filtros;
  rango: Rango;
  /** Nombres de asesores que el usuario puede elegir en los filtros. */
  asesoresDisponibles: string[];
};

/**
 * Contexto común de todas las pantallas: sesión, datos del Sheet y filtros ya
 * recortados según el rol (un vendedor sólo ve lo suyo).
 */
export async function contextoPagina(
  searchParams: Promise<ParametrosBusqueda>,
): Promise<ContextoPagina> {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  const [params, dataset] = await Promise.all([searchParams, obtenerDataset()]);
  const filtros = aplicarRol(parseFiltros(params), sesion);
  const rango = resolverRango(dataset, filtros);

  const nombres = dataset.asesores.map((a) => a.nombre);
  const asesoresDisponibles =
    sesion.rol === "gerente" ? nombres : nombres.filter((n) => n === sesion.asesor);

  return { sesion, dataset, filtros, rango, asesoresDisponibles };
}
