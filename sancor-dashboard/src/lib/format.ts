const monedaAR = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numeroAR = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const numeroAR1 = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function moneda(valor: number): string {
  return monedaAR.format(Math.round(valor || 0));
}

/** Versión compacta para ejes y etiquetas de gráficos: $1,2 M */
export function monedaCorta(valor: number): string {
  const n = valor || 0;
  const signo = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${signo}$${numeroAR1.format(abs / 1_000_000)} M`;
  if (abs >= 1_000) return `${signo}$${numeroAR.format(Math.round(abs / 1_000))} k`;
  return `${signo}$${numeroAR.format(abs)}`;
}

export function numero(valor: number): string {
  return numeroAR.format(valor || 0);
}

export function porcentaje(valor: number, decimales = 0): string {
  const n = Number.isFinite(valor) ? valor : 0;
  return `${n.toLocaleString("es-AR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })}%`;
}

export function fechaCorta(fecha: Date | null): string {
  if (!fecha) return "—";
  const dia = String(fecha.getUTCDate()).padStart(2, "0");
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${fecha.getUTCFullYear()}`;
}

export function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Semáforo de cumplimiento: verde >= 100%, amarillo >= 80%, rojo por debajo. */
export type NivelSemaforo = "verde" | "amarillo" | "rojo" | "gris";

export function semaforo(porcentajeCumplimiento: number, hayObjetivo = true): NivelSemaforo {
  if (!hayObjetivo) return "gris";
  if (porcentajeCumplimiento >= 100) return "verde";
  if (porcentajeCumplimiento >= 80) return "amarillo";
  return "rojo";
}

export const COLORES_SEMAFORO: Record<NivelSemaforo, string> = {
  verde: "#15803d",
  amarillo: "#b45309",
  rojo: "#b91c1c",
  gris: "#64748b",
};

/** Paleta de la app, usada también por los gráficos. */
export const PALETA = {
  primario: "#0f2f4a",
  primarioClaro: "#1d5e8c",
  acento: "#e8730c",
  acentoSuave: "#f2a65a",
  verde: "#2f8f5b",
  rojo: "#c2453d",
  gris: "#94a3b8",
  serie: ["#1d5e8c", "#e8730c", "#2f8f5b", "#7c5cbf", "#c2453d", "#0d9488"],
};
