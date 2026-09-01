import Link from "next/link";

import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoAnillo } from "@/components/graficos";
import { EncabezadoPagina, SinDatos, Tarjeta, TarjetaKpi } from "@/components/ui";
import { ESTADOS_PROSPECTO, modoDatos } from "@/lib/config";
import { aQueryString, type ParametrosBusqueda } from "@/lib/filtros";
import { fechaCorta, numero } from "@/lib/format";
import { prospectosFiltrados, prospectosPorEstado } from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";

import { PanelProspectos, type ProspectoVista } from "./panel-prospectos";

export const dynamic = "force-dynamic";

export default async function PaginaProspectos({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, asesoresDisponibles } = await contextoPagina(searchParams);
  const params = await searchParams;
  const esGerente = sesion.rol === "gerente";

  const estadoCrudo = Array.isArray(params.estado) ? params.estado[0] : params.estado;
  const estadoFiltro = (estadoCrudo ?? "").trim();

  const todos = prospectosFiltrados(dataset, filtros);
  const porEstado = prospectosPorEstado(todos);

  const visibles = estadoFiltro
    ? todos.filter((p) => p.estado.toLowerCase() === estadoFiltro.toLowerCase())
    : todos;

  const ordenados = [...visibles].sort(
    (a, b) => (b.fechaContacto?.getTime() ?? 0) - (a.fechaContacto?.getTime() ?? 0),
  );

  const vista: ProspectoVista[] = ordenados.map((p) => ({
    fila: p.fila,
    id: p.id,
    fechaTexto: fechaCorta(p.fechaContacto),
    asesor: p.asesor,
    zona: p.zona,
    nombre: p.nombre,
    contacto: p.contacto,
    productoInteres: p.productoInteres,
    estado: p.estado,
    observaciones: p.observaciones,
    editable: esGerente || p.asesor.trim().toLowerCase() === sesion.asesor.trim().toLowerCase(),
  }));

  const ganados = todos.filter((p) => p.estado.toLowerCase() === "ganado").length;
  const abiertos = todos.filter((p) =>
    ["nuevo", "contactado", "cotizado"].includes(p.estado.toLowerCase()),
  ).length;
  const cerrados = todos.filter((p) =>
    ["ganado", "perdido"].includes(p.estado.toLowerCase()),
  ).length;

  const base = aQueryString(filtros);
  function enlaceEstado(estado: string): string {
    const params = new URLSearchParams(base.replace(/^\?/, ""));
    if (estado) params.set("estado", estado);
    else params.delete("estado");
    const texto = params.toString();
    return texto ? `/prospectos?${texto}` : "/prospectos";
  }

  return (
    <>
      <EncabezadoPagina
        titulo={esGerente ? "Prospectos del equipo" : "Mis prospectos"}
        descripcion="Seguimiento simple de contactos: nuevo, contactado, cotizado, ganado o perdido."
      />

      <BannersEstado dataset={dataset} esGerente={esGerente} />

      <FiltrosGlobales
        zonas={dataset.zonas}
        asesores={asesoresDisponibles}
        productos={dataset.productos}
        puedeFiltrarAsesor={esGerente}
        asesorFijo={sesion.asesor}
        actualizadoEn={dataset.actualizadoEn}
        mostrarPeriodo={false}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaKpi etiqueta="Prospectos" valor={numero(todos.length)} />
        <TarjetaKpi etiqueta="En gestión" valor={numero(abiertos)} detalle="Nuevo, contactado o cotizado" />
        <TarjetaKpi etiqueta="Ganados" valor={numero(ganados)} />
        <TarjetaKpi
          etiqueta="Tasa de conversión"
          valor={cerrados > 0 ? `${Math.round((ganados / cerrados) * 100)}%` : "—"}
          detalle="Ganados sobre cerrados"
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="tarjeta mb-3 flex flex-wrap items-center gap-2 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-tinta-suave">Estado</span>
            <Link
              href={enlaceEstado("")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                estadoFiltro ? "text-tinta-suave hover:bg-lienzo" : "bg-marino-900 text-white"
              }`}
            >
              Todos ({todos.length})
            </Link>
            {ESTADOS_PROSPECTO.map((estado) => {
              const cantidad = porEstado.find((e) => e.clave === estado)?.cantidad ?? 0;
              const activo = estadoFiltro.toLowerCase() === estado.toLowerCase();
              return (
                <Link
                  key={estado}
                  href={enlaceEstado(estado)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    activo ? "bg-marino-900 text-white" : "text-tinta-suave hover:bg-lienzo"
                  }`}
                >
                  {estado} ({cantidad})
                </Link>
              );
            })}
          </div>

          <PanelProspectos
            prospectos={vista}
            esGerente={esGerente}
            asesores={asesoresDisponibles}
            asesorPropio={sesion.asesor}
            productos={dataset.productos}
            puedeEscribir={modoDatos === "sheets"}
          />
        </div>

        <Tarjeta
          titulo="Distribución por estado"
          descripcion="Sobre el total de prospectos"
          className="self-start"
        >
          {porEstado.length > 0 ? (
            <GraficoAnillo datos={porEstado.map((e) => ({ clave: e.clave, valor: e.cantidad }))} />
          ) : (
            <SinDatos mensaje="Todavía no hay prospectos cargados." />
          )}
        </Tarjeta>
      </div>
    </>
  );
}
