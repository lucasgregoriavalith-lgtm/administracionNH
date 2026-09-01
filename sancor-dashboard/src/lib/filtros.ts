import { fechaUTC } from "./parse";
import type { Sesion } from "./types";

export type Periodo = "mes-actual" | "3m" | "12m" | "anio" | "todo" | "personalizado";

export const PERIODOS: { valor: Periodo; etiqueta: string }[] = [
  { valor: "mes-actual", etiqueta: "Mes actual" },
  { valor: "3m", etiqueta: "Últimos 3 meses" },
  { valor: "12m", etiqueta: "Últimos 12 meses" },
  { valor: "anio", etiqueta: "Año en curso" },
  { valor: "todo", etiqueta: "Todo el historial" },
  { valor: "personalizado", etiqueta: "Fechas personalizadas" },
];

export type Filtros = {
  periodo: Periodo;
  desde: Date | null;
  hasta: Date | null;
  zona: string;
  asesor: string;
  producto: string;
};

export const FILTROS_POR_DEFECTO: Filtros = {
  periodo: "12m",
  desde: null,
  hasta: null,
  zona: "",
  asesor: "",
  producto: "",
};

export type ParametrosBusqueda = Record<string, string | string[] | undefined>;

function unico(valor: string | string[] | undefined): string {
  if (Array.isArray(valor)) return (valor[0] ?? "").trim();
  return (valor ?? "").trim();
}

function fechaDeTexto(valor: string): Date | null {
  const partes = valor.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!partes) return null;
  return fechaUTC(Number(partes[1]), Number(partes[2]) - 1, Number(partes[3]));
}

export function parseFiltros(params: ParametrosBusqueda): Filtros {
  const periodoCrudo = unico(params.periodo) as Periodo;
  const periodo = PERIODOS.some((p) => p.valor === periodoCrudo)
    ? periodoCrudo
    : FILTROS_POR_DEFECTO.periodo;

  return {
    periodo,
    desde: fechaDeTexto(unico(params.desde)),
    hasta: fechaDeTexto(unico(params.hasta)),
    zona: unico(params.zona),
    asesor: unico(params.asesor),
    producto: unico(params.producto),
  };
}

/** Un vendedor sólo puede ver sus propios datos: se le fuerza el filtro de asesor. */
export function aplicarRol(filtros: Filtros, sesion: Sesion): Filtros {
  if (sesion.rol === "gerente") return filtros;
  return { ...filtros, asesor: sesion.asesor };
}

export function aQueryString(filtros: Partial<Filtros>): string {
  const params = new URLSearchParams();
  if (filtros.periodo && filtros.periodo !== FILTROS_POR_DEFECTO.periodo) {
    params.set("periodo", filtros.periodo);
  }
  if (filtros.desde) params.set("desde", filtros.desde.toISOString().slice(0, 10));
  if (filtros.hasta) params.set("hasta", filtros.hasta.toISOString().slice(0, 10));
  if (filtros.zona) params.set("zona", filtros.zona);
  if (filtros.asesor) params.set("asesor", filtros.asesor);
  if (filtros.producto) params.set("producto", filtros.producto);
  const texto = params.toString();
  return texto ? `?${texto}` : "";
}

/** Descripción corta del filtro activo, para mostrar arriba del dashboard. */
export function describirPeriodo(filtros: Filtros): string {
  const etiqueta = PERIODOS.find((p) => p.valor === filtros.periodo)?.etiqueta ?? "";
  if (filtros.periodo !== "personalizado") return etiqueta;
  const formato = (f: Date | null) =>
    f ? `${String(f.getUTCDate()).padStart(2, "0")}/${String(f.getUTCMonth() + 1).padStart(2, "0")}/${f.getUTCFullYear()}` : "…";
  return `${formato(filtros.desde)} al ${formato(filtros.hasta)}`;
}
