"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { PERIODOS } from "@/lib/filtros";

import { IconoRefrescar } from "./iconos";

type Props = {
  zonas: string[];
  asesores: string[];
  productos: string[];
  /** El vendedor no puede cambiar el filtro de asesor: siempre ve lo suyo. */
  puedeFiltrarAsesor: boolean;
  /** Nombre del asesor cuando el filtro está fijo (vista de vendedor). */
  asesorFijo?: string;
  actualizadoEn: string;
  /** Los prospectos no se filtran por fecha, así que ahí el período no aplica. */
  mostrarPeriodo?: boolean;
};

export function FiltrosGlobales({
  zonas,
  asesores,
  productos,
  puedeFiltrarAsesor,
  asesorFijo = "",
  actualizadoEn,
  mostrarPeriodo = true,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pendiente, iniciarTransicion] = useTransition();
  const [refrescando, setRefrescando] = useState(false);

  const periodo = searchParams.get("periodo") ?? "12m";

  function actualizar(cambios: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(cambios).forEach(([clave, valor]) => {
      if (valor) params.set(clave, valor);
      else params.delete(clave);
    });
    const consulta = params.toString();
    iniciarTransicion(() => router.push(consulta ? `${pathname}?${consulta}` : pathname));
  }

  async function refrescar() {
    setRefrescando(true);
    try {
      await fetch("/api/refrescar", { method: "POST" });
      router.refresh();
    } finally {
      setRefrescando(false);
    }
  }

  const hayFiltros = ["periodo", "zona", "asesor", "producto", "desde", "hasta"].some((clave) =>
    searchParams.get(clave),
  );

  const hora = new Date(actualizadoEn).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="tarjeta mb-5 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mostrarPeriodo && (
          <div>
            <label className="etiqueta-campo" htmlFor="filtro-periodo">
              Período
            </label>
            <select
              id="filtro-periodo"
              className="campo"
              value={periodo}
              onChange={(e) => actualizar({ periodo: e.target.value })}
            >
              {PERIODOS.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.etiqueta}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="etiqueta-campo" htmlFor="filtro-zona">
            Zona
          </label>
          <select
            id="filtro-zona"
            className="campo"
            value={searchParams.get("zona") ?? ""}
            onChange={(e) => actualizar({ zona: e.target.value })}
          >
            <option value="">Todas las zonas</option>
            {zonas.map((zona) => (
              <option key={zona} value={zona}>
                {zona}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="etiqueta-campo" htmlFor="filtro-asesor">
            Vendedor
          </label>
          <select
            id="filtro-asesor"
            className="campo disabled:bg-lienzo disabled:text-tinta-suave"
            value={puedeFiltrarAsesor ? (searchParams.get("asesor") ?? "") : asesorFijo}
            disabled={!puedeFiltrarAsesor}
            onChange={(e) => actualizar({ asesor: e.target.value })}
          >
            <option value="">Todo el equipo</option>
            {asesores.map((asesor) => (
              <option key={asesor} value={asesor}>
                {asesor}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="etiqueta-campo" htmlFor="filtro-producto">
            Producto
          </label>
          <select
            id="filtro-producto"
            className="campo"
            value={searchParams.get("producto") ?? ""}
            onChange={(e) => actualizar({ producto: e.target.value })}
          >
            <option value="">Todos los productos</option>
            {productos.map((producto) => (
              <option key={producto} value={producto}>
                {producto}
              </option>
            ))}
          </select>
        </div>

        {mostrarPeriodo && periodo === "personalizado" && (
          <>
            <div>
              <label className="etiqueta-campo" htmlFor="filtro-desde">
                Desde
              </label>
              <input
                id="filtro-desde"
                type="date"
                className="campo"
                value={searchParams.get("desde") ?? ""}
                onChange={(e) => actualizar({ desde: e.target.value })}
              />
            </div>
            <div>
              <label className="etiqueta-campo" htmlFor="filtro-hasta">
                Hasta
              </label>
              <input
                id="filtro-hasta"
                type="date"
                className="campo"
                value={searchParams.get("hasta") ?? ""}
                onChange={(e) => actualizar({ hasta: e.target.value })}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-borde pt-3 text-xs text-tinta-suave">
        <button
          type="button"
          onClick={refrescar}
          disabled={refrescando}
          className="boton-secundario !py-1.5 !text-xs"
        >
          <IconoRefrescar className="h-4 w-4" />
          {refrescando ? "Actualizando…" : "Actualizar datos"}
        </button>

        {hayFiltros && (
          <button
            type="button"
            onClick={() => iniciarTransicion(() => router.push(pathname))}
            className="text-marino-700 underline underline-offset-2 hover:text-marino-900"
          >
            Limpiar filtros
          </button>
        )}

        <span className="ml-auto">
          {pendiente ? "Aplicando filtros…" : `Datos leídos a las ${hora}`}
        </span>
      </div>
    </div>
  );
}
