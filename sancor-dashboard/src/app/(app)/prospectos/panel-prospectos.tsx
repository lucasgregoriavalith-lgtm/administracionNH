"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormularioProspecto } from "@/components/formularios";
import { SinDatos } from "@/components/ui";
import { ESTADOS_PROSPECTO } from "@/lib/config";

export type ProspectoVista = {
  fila: number;
  id: string;
  fechaTexto: string;
  asesor: string;
  zona: string;
  nombre: string;
  contacto: string;
  productoInteres: string;
  estado: string;
  observaciones: string;
  editable: boolean;
};

const COLORES_ESTADO: Record<string, string> = {
  Nuevo: "bg-marino-100 text-marino-800",
  Contactado: "bg-alerta-suave text-alerta",
  Cotizado: "bg-naranja-100 text-naranja-700",
  Ganado: "bg-ok-suave text-ok",
  Perdido: "bg-riesgo-suave text-riesgo",
};

export function PanelProspectos({
  prospectos,
  esGerente,
  asesores,
  asesorPropio,
  productos,
  puedeEscribir,
}: {
  prospectos: ProspectoVista[];
  esGerente: boolean;
  asesores: string[];
  asesorPropio: string;
  productos: string[];
  puedeEscribir: boolean;
}) {
  const router = useRouter();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [guardando, setGuardando] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function cambiarEstado(fila: number, estado: string) {
    setGuardando(fila);
    setError(null);

    try {
      const respuesta = await fetch("/api/prospectos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fila, estado }),
      });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) setError(cuerpo.error ?? "No se pudo actualizar el estado.");
      else router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setGuardando(null);
    }
  }

  return (
    <div className="space-y-3">
      {puedeEscribir && (
        <div className="tarjeta">
          <button
            type="button"
            onClick={() => setMostrarFormulario((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
            aria-expanded={mostrarFormulario}
          >
            <span className="text-sm font-semibold">Agregar un prospecto</span>
            <span className="text-lg leading-none text-tinta-suave">{mostrarFormulario ? "−" : "+"}</span>
          </button>

          {mostrarFormulario && (
            <div className="border-t border-borde p-5">
              <FormularioProspecto
                esGerente={esGerente}
                asesores={asesores}
                asesorPropio={asesorPropio}
                productos={productos}
                onGuardado={() => setMostrarFormulario(false)}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg border border-riesgo/30 bg-riesgo-suave px-3 py-2 text-sm text-riesgo">
          {error}
        </p>
      )}

      <div className="tarjeta">
        <header className="border-b border-borde px-5 py-4">
          <h2 className="text-sm font-semibold">Listado de prospectos</h2>
          <p className="mt-0.5 text-xs text-tinta-suave">
            Cambiá el estado desde el selector: se guarda en la planilla al instante.
          </p>
        </header>

        <div className="p-5">
          {prospectos.length === 0 ? (
            <SinDatos mensaje="No hay prospectos cargados con estos filtros." />
          ) : (
            <div className="-mx-5 overflow-x-auto px-5">
              <table className="w-full min-w-[700px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-tinta-suave">
                    <th className="py-2 pr-3 font-semibold">Fecha</th>
                    <th className="py-2 pr-3 font-semibold">Nombre</th>
                    <th className="py-2 pr-3 font-semibold">Contacto</th>
                    <th className="py-2 pr-3 font-semibold">Producto</th>
                    {esGerente && <th className="py-2 pr-3 font-semibold">Vendedor</th>}
                    <th className="py-2 pr-3 font-semibold">Estado</th>
                    <th className="py-2 font-semibold">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {prospectos.map((prospecto) => (
                    <tr key={`${prospecto.fila}-${prospecto.id}`} className="border-b border-borde/70 last:border-0">
                      <td className="tabular py-2.5 pr-3 whitespace-nowrap">{prospecto.fechaTexto}</td>
                      <td className="py-2.5 pr-3 font-medium">{prospecto.nombre}</td>
                      <td className="py-2.5 pr-3 text-tinta-suave">{prospecto.contacto || "—"}</td>
                      <td className="py-2.5 pr-3">{prospecto.productoInteres || "—"}</td>
                      {esGerente && <td className="py-2.5 pr-3 text-tinta-suave">{prospecto.asesor}</td>}
                      <td className="py-2.5 pr-3">
                        {prospecto.editable && puedeEscribir ? (
                          <select
                            className="campo !py-1 !text-xs"
                            value={prospecto.estado}
                            disabled={guardando === prospecto.fila}
                            onChange={(e) => cambiarEstado(prospecto.fila, e.target.value)}
                            aria-label={`Estado de ${prospecto.nombre}`}
                          >
                            {ESTADOS_PROSPECTO.map((estado) => (
                              <option key={estado} value={estado}>
                                {estado}
                              </option>
                            ))}
                            {!ESTADOS_PROSPECTO.some((e) => e === prospecto.estado) && (
                              <option value={prospecto.estado}>{prospecto.estado}</option>
                            )}
                          </select>
                        ) : (
                          <span
                            className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                              COLORES_ESTADO[prospecto.estado] ?? "bg-lienzo text-tinta-suave"
                            }`}
                          >
                            {prospecto.estado}
                          </span>
                        )}
                      </td>
                      <td className="max-w-[240px] truncate py-2.5 text-tinta-suave" title={prospecto.observaciones}>
                        {prospecto.observaciones || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
