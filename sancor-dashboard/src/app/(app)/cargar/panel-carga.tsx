"use client";

import { useState } from "react";

import { FormularioBaja, FormularioProspecto, FormularioVenta } from "@/components/formularios";

type Pestana = "venta" | "baja" | "prospecto";

const PESTANAS: { valor: Pestana; etiqueta: string; descripcion: string }[] = [
  { valor: "venta", etiqueta: "Nueva venta", descripcion: "Se guarda en la hoja BASE_VENTAS como ALTA." },
  { valor: "baja", etiqueta: "Nueva baja", descripcion: "Se guarda en la hoja BAJAS con su motivo." },
  { valor: "prospecto", etiqueta: "Nuevo prospecto", descripcion: "Se guarda en la hoja PROSPECTOS." },
];

export function PanelCarga({
  esGerente,
  asesores,
  asesorPropio,
  productos,
  motivos,
}: {
  esGerente: boolean;
  asesores: string[];
  asesorPropio: string;
  productos: string[];
  motivos: string[];
}) {
  const [activa, setActiva] = useState<Pestana>("venta");
  const comunes = { esGerente, asesores, asesorPropio, productos };
  const actual = PESTANAS.find((p) => p.valor === activa)!;

  return (
    <div className="tarjeta">
      <div className="flex gap-1 overflow-x-auto border-b border-borde px-2 pt-2">
        {PESTANAS.map((pestana) => (
          <button
            key={pestana.valor}
            type="button"
            onClick={() => setActiva(pestana.valor)}
            className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activa === pestana.valor
                ? "border-b-2 border-naranja-600 text-marino-900"
                : "text-tinta-suave hover:text-tinta"
            }`}
          >
            {pestana.etiqueta}
          </button>
        ))}
      </div>

      <div className="p-5">
        <p className="mb-4 text-xs text-tinta-suave">{actual.descripcion}</p>

        {activa === "venta" && <FormularioVenta {...comunes} />}
        {activa === "baja" && <FormularioBaja {...comunes} motivos={motivos} />}
        {activa === "prospecto" && <FormularioProspecto {...comunes} />}
      </div>
    </div>
  );
}
