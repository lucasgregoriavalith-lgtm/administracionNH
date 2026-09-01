import { redirect } from "next/navigation";

import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoAnillo } from "@/components/graficos";
import { BarraProgreso, EncabezadoPagina, Semaforo, SinDatos, Tarjeta } from "@/components/ui";
import { describirPeriodo, type ParametrosBusqueda } from "@/lib/filtros";
import { moneda, numero, porcentaje } from "@/lib/format";
import { ranking } from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";

export const dynamic = "force-dynamic";

const MEDALLAS = ["🥇", "🥈", "🥉"];

export default async function PaginaRanking({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, rango, asesoresDisponibles } = await contextoPagina(searchParams);
  if (sesion.rol !== "gerente") redirect("/resumen");

  const tabla = ranking(dataset, filtros, rango);
  const podio = tabla.slice(0, 3);

  return (
    <>
      <EncabezadoPagina
        titulo="Ranking de vendedores"
        descripcion={`Comparativa de desempeño del equipo · ${describirPeriodo(filtros)}`}
      />

      <BannersEstado dataset={dataset} esGerente />

      <FiltrosGlobales
        zonas={dataset.zonas}
        asesores={asesoresDisponibles}
        productos={dataset.productos}
        puedeFiltrarAsesor
        actualizadoEn={dataset.actualizadoEn}
      />

      {tabla.length === 0 ? (
        <Tarjeta>
          <SinDatos />
        </Tarjeta>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {podio.map((item, indice) => (
              <div
                key={item.clave}
                className={`tarjeta p-5 ${indice === 0 ? "border-naranja-500/40 bg-naranja-100/50" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">
                    {MEDALLAS[indice]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.clave}</p>
                    <p className="text-xs text-tinta-suave">{item.zona || "Sin zona"}</p>
                  </div>
                </div>
                <p className="tabular mt-3 text-xl font-semibold">{moneda(item.realFacturacion)}</p>
                <p className="mt-0.5 text-xs text-tinta-suave">
                  {numero(item.realVentas)} altas · {porcentaje(item.participacion, 1)} del total
                </p>
                <div className="mt-3">
                  <Semaforo
                    valor={item.cumplimientoFacturacion}
                    hayObjetivo={item.objetivoFacturacion > 0}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <Tarjeta titulo="Tabla de posiciones" descripcion="Ordenada por facturación" className="lg:col-span-2">
              <div className="-mx-5 overflow-x-auto px-5">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-tinta-suave">
                      <th className="py-2 pr-3 font-semibold">#</th>
                      <th className="py-2 pr-3 font-semibold">Vendedor</th>
                      <th className="py-2 pr-3 font-semibold">Zona</th>
                      <th className="py-2 pr-3 text-right font-semibold">Altas</th>
                      <th className="py-2 pr-3 text-right font-semibold">Facturación</th>
                      <th className="py-2 pr-3 text-right font-semibold">Ticket prom.</th>
                      <th className="py-2 pr-3 text-right font-semibold">Bajas</th>
                      <th className="py-2 pr-3 font-semibold">Cumplimiento</th>
                      <th className="py-2 text-right font-semibold">Part.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.map((item) => (
                      <tr key={item.clave} className="border-b border-borde/70 last:border-0">
                        <td className="tabular py-3 pr-3 font-semibold text-tinta-suave">{item.posicion}</td>
                        <td className="py-3 pr-3 font-medium">{item.clave}</td>
                        <td className="py-3 pr-3 text-tinta-suave">{item.zona || "—"}</td>
                        <td className="tabular py-3 pr-3 text-right">{numero(item.realVentas)}</td>
                        <td className="tabular py-3 pr-3 text-right font-semibold">
                          {moneda(item.realFacturacion)}
                        </td>
                        <td className="tabular py-3 pr-3 text-right text-tinta-suave">
                          {moneda(item.ticketPromedio)}
                        </td>
                        <td className="tabular py-3 pr-3 text-right">{numero(item.bajas)}</td>
                        <td className="w-32 py-3 pr-3">
                          <Semaforo
                            valor={item.cumplimientoFacturacion}
                            hayObjetivo={item.objetivoFacturacion > 0}
                          />
                          <div className="mt-1.5">
                            <BarraProgreso
                              valor={item.cumplimientoFacturacion}
                              hayObjetivo={item.objetivoFacturacion > 0}
                            />
                          </div>
                        </td>
                        <td className="tabular py-3 text-right">{porcentaje(item.participacion, 1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tarjeta>

            <Tarjeta
              titulo="Participación"
              descripcion="Peso de cada vendedor en la facturación"
              className="self-start"
            >
              <GraficoAnillo
                datos={tabla.map((item) => ({ clave: item.clave, valor: item.realFacturacion }))}
                tipo="moneda"
              />
            </Tarjeta>
          </div>
        </>
      )}
    </>
  );
}
