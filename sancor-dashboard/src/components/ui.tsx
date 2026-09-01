import { COLORES_SEMAFORO, moneda, numero, porcentaje, semaforo, type NivelSemaforo } from "@/lib/format";

export function EncabezadoPagina({
  titulo,
  descripcion,
  acciones,
}: {
  titulo: string;
  descripcion?: string;
  acciones?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">{titulo}</h1>
        {descripcion && <p className="mt-1 max-w-2xl text-sm text-tinta-suave">{descripcion}</p>}
      </div>
      {acciones}
    </div>
  );
}

export function Tarjeta({
  titulo,
  descripcion,
  children,
  className = "",
}: {
  titulo?: string;
  descripcion?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`tarjeta ${className}`}>
      {(titulo || descripcion) && (
        <header className="border-b border-borde px-5 py-4">
          {titulo && <h2 className="text-sm font-semibold">{titulo}</h2>}
          {descripcion && <p className="mt-0.5 text-xs text-tinta-suave">{descripcion}</p>}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function TarjetaKpi({
  etiqueta,
  valor,
  detalle,
  variacion,
  destacada = false,
}: {
  etiqueta: string;
  valor: string;
  detalle?: string;
  variacion?: number | null;
  destacada?: boolean;
}) {
  const sube = typeof variacion === "number" && variacion >= 0;

  return (
    <div
      className={`tarjeta p-4 sm:p-5 ${destacada ? "border-marino-700/25 bg-marino-50" : ""}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-tinta-suave">{etiqueta}</p>
      <p className="tabular mt-2 text-2xl font-semibold leading-tight sm:text-[1.7rem]">{valor}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {typeof variacion === "number" && (
          <span
            className={`tabular inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold ${
              sube ? "bg-ok-suave text-ok" : "bg-riesgo-suave text-riesgo"
            }`}
          >
            {sube ? "▲" : "▼"} {porcentaje(Math.abs(variacion), 1)}
          </span>
        )}
        {detalle && <span className="text-tinta-suave">{detalle}</span>}
      </div>
    </div>
  );
}

export function Semaforo({ valor, hayObjetivo = true }: { valor: number; hayObjetivo?: boolean }) {
  const nivel: NivelSemaforo = semaforo(valor, hayObjetivo);
  const fondos: Record<NivelSemaforo, string> = {
    verde: "bg-ok-suave text-ok",
    amarillo: "bg-alerta-suave text-alerta",
    rojo: "bg-riesgo-suave text-riesgo",
    gris: "bg-lienzo text-tinta-suave",
  };

  return (
    <span
      className={`tabular inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${fondos[nivel]}`}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: COLORES_SEMAFORO[nivel] }}
      />
      {hayObjetivo ? porcentaje(valor, 0) : "sin objetivo"}
    </span>
  );
}

export function BarraProgreso({ valor, hayObjetivo = true }: { valor: number; hayObjetivo?: boolean }) {
  const nivel = semaforo(valor, hayObjetivo);
  const ancho = Math.max(0, Math.min(valor, 130)) / 1.3;

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-lienzo" aria-hidden="true">
      <div
        className="h-full rounded-full transition-[width]"
        style={{ width: `${ancho}%`, backgroundColor: COLORES_SEMAFORO[nivel] }}
      />
    </div>
  );
}

export function Aviso({
  tono = "info",
  titulo,
  children,
}: {
  tono?: "info" | "alerta" | "error";
  titulo?: string;
  children: React.ReactNode;
}) {
  const estilos = {
    info: "border-marino-700/25 bg-marino-50 text-marino-800",
    alerta: "border-alerta/25 bg-alerta-suave text-alerta",
    error: "border-riesgo/30 bg-riesgo-suave text-riesgo",
  }[tono];

  return (
    <div className={`mb-5 rounded-xl border px-4 py-3 text-sm ${estilos}`} role="status">
      {titulo && <p className="mb-0.5 font-semibold">{titulo}</p>}
      <div className="[&_a]:underline">{children}</div>
    </div>
  );
}

export function SinDatos({ mensaje = "No hay datos para el filtro seleccionado." }: { mensaje?: string }) {
  return (
    <p className="py-10 text-center text-sm text-tinta-suave">{mensaje}</p>
  );
}

/** Celda numérica reutilizable en las tablas. */
export function CeldaNumero({ valor, tipo = "numero" }: { valor: number; tipo?: "numero" | "moneda" }) {
  return <span className="tabular">{tipo === "moneda" ? moneda(valor) : numero(valor)}</span>;
}
