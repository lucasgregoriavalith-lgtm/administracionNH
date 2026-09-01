"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { moneda, monedaCorta, numero, PALETA, porcentaje } from "@/lib/format";

const ejeComun = {
  tick: { fontSize: 11, fill: "#5b6b7a" },
  tickLine: false,
  axisLine: { stroke: "#e2e7ee" },
};

const estiloTooltip = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid #e2e7ee",
    fontSize: 12,
    boxShadow: "0 6px 20px rgb(15 47 74 / 0.10)",
  },
  labelStyle: { fontWeight: 600, marginBottom: 4, color: "#16232e" },
};

const estiloLeyenda = { fontSize: 12, paddingTop: 8 };

/** Recharts entrega los valores sin tipar; los normalizamos antes de formatear. */
function aNumero(valor: unknown): number {
  const n = typeof valor === "number" ? valor : Number(valor);
  return Number.isFinite(n) ? n : 0;
}

function aTexto(valor: unknown): string {
  return valor === null || valor === undefined ? "" : String(valor);
}

export type PuntoGrafico = {
  etiqueta: string;
  ventas: number;
  facturacion: number;
  objetivoVentas: number;
  objetivoFacturacion: number;
  bajas: number;
};

/** Evolución mensual: barras de cantidad + línea de objetivo. */
export function GraficoEvolucionCantidad({ datos }: { datos: PuntoGrafico[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={datos} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#eef2f6" vertical={false} />
          <XAxis dataKey="etiqueta" {...ejeComun} interval="preserveStartEnd" />
          <YAxis {...ejeComun} width={44} />
          <Tooltip
            {...estiloTooltip}
            formatter={(valor: unknown, nombre: unknown): [string, string] => [
              numero(aNumero(valor)),
              aTexto(nombre),
            ]}
          />
          <Legend wrapperStyle={estiloLeyenda} />
          <Bar dataKey="ventas" name="Ventas (altas)" fill={PALETA.primarioClaro} radius={[4, 4, 0, 0]} maxBarSize={44} />
          <Bar dataKey="bajas" name="Bajas" fill={PALETA.rojo} radius={[4, 4, 0, 0]} maxBarSize={44} />
          <Line
            type="monotone"
            dataKey="objetivoVentas"
            name="Objetivo"
            stroke={PALETA.acento}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Evolución mensual de facturación contra el objetivo. */
export function GraficoEvolucionFacturacion({ datos }: { datos: PuntoGrafico[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={datos} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="#eef2f6" vertical={false} />
          <XAxis dataKey="etiqueta" {...ejeComun} interval="preserveStartEnd" />
          <YAxis {...ejeComun} width={62} tickFormatter={(valor: number) => monedaCorta(valor)} />
          <Tooltip
            {...estiloTooltip}
            formatter={(valor: unknown, nombre: unknown): [string, string] => [
              moneda(aNumero(valor)),
              aTexto(nombre),
            ]}
          />
          <Legend wrapperStyle={estiloLeyenda} />
          <Bar
            dataKey="facturacion"
            name="Facturación"
            fill={PALETA.primarioClaro}
            radius={[4, 4, 0, 0]}
            maxBarSize={44}
          />
          <Line
            type="monotone"
            dataKey="objetivoFacturacion"
            name="Objetivo"
            stroke={PALETA.acento}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export type FilaComparativa = {
  clave: string;
  objetivo: number;
  real: number;
};

/** Objetivo vs. real por vendedor o por zona (barras horizontales). */
export function GraficoObjetivoVsReal({
  datos,
  tipo,
}: {
  datos: FilaComparativa[];
  tipo: "moneda" | "numero";
}) {
  const alto = Math.max(200, datos.length * 56 + 60);
  const formato = (valor: number) => (tipo === "moneda" ? moneda(valor) : numero(valor));

  return (
    <div style={{ height: alto }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={datos}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 4, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid stroke="#eef2f6" horizontal={false} />
          <XAxis
            type="number"
            {...ejeComun}
            tickFormatter={(valor: number) => (tipo === "moneda" ? monedaCorta(valor) : numero(valor))}
          />
          <YAxis type="category" dataKey="clave" {...ejeComun} width={84} />
          <Tooltip
            {...estiloTooltip}
            formatter={(valor: unknown, nombre: unknown): [string, string] => [
              formato(aNumero(valor)),
              aTexto(nombre),
            ]}
          />
          <Legend wrapperStyle={estiloLeyenda} />
          <Bar dataKey="objetivo" name="Objetivo" fill="#c9d6e2" radius={[0, 4, 4, 0]} maxBarSize={16} />
          <Bar dataKey="real" name="Real" fill={PALETA.primarioClaro} radius={[0, 4, 4, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export type ItemBarra = { clave: string; valor: number };

/** Barras horizontales simples (motivos de baja, productos, etc.). */
export function GraficoBarrasHorizontal({
  datos,
  tipo = "numero",
  color = PALETA.primarioClaro,
}: {
  datos: ItemBarra[];
  tipo?: "moneda" | "numero";
  color?: string;
}) {
  const alto = Math.max(180, datos.length * 40 + 30);

  return (
    <div style={{ height: alto }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datos} layout="vertical" margin={{ top: 4, right: 20, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="#eef2f6" horizontal={false} />
          <XAxis
            type="number"
            {...ejeComun}
            tickFormatter={(valor: number) => (tipo === "moneda" ? monedaCorta(valor) : numero(valor))}
          />
          <YAxis type="category" dataKey="clave" {...ejeComun} width={150} />
          <Tooltip
            {...estiloTooltip}
            formatter={(valor: unknown): [string, string] => [
              tipo === "moneda" ? moneda(aNumero(valor)) : numero(aNumero(valor)),
              "Cantidad",
            ]}
          />
          <Bar dataKey="valor" fill={color} radius={[0, 4, 4, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Distribución en anillo (productos, estados de prospectos). */
export function GraficoAnillo({ datos, tipo = "numero" }: { datos: ItemBarra[]; tipo?: "moneda" | "numero" }) {
  const total = datos.reduce((suma, item) => suma + item.valor, 0);

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={datos}
            dataKey="valor"
            nameKey="clave"
            innerRadius="52%"
            outerRadius="80%"
            paddingAngle={2}
            stroke="#fff"
            strokeWidth={2}
          >
            {datos.map((item, indice) => (
              <Cell key={item.clave} fill={PALETA.serie[indice % PALETA.serie.length]} />
            ))}
          </Pie>
          <Tooltip
            {...estiloTooltip}
            formatter={(valor: unknown, nombre: unknown): [string, string] => {
              const n = aNumero(valor);
              return [
                `${tipo === "moneda" ? moneda(n) : numero(n)} · ${porcentaje(total ? (n / total) * 100 : 0, 1)}`,
                aTexto(nombre),
              ];
            }}
          />
          <Legend wrapperStyle={estiloLeyenda} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
