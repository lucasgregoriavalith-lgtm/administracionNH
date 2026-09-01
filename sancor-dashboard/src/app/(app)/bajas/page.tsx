import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoBarrasHorizontal } from "@/components/graficos";
import { EncabezadoPagina, SinDatos, Tarjeta, TarjetaKpi } from "@/components/ui";
import { describirPeriodo, type ParametrosBusqueda } from "@/lib/filtros";
import { fechaCorta, moneda, numero, PALETA, porcentaje } from "@/lib/format";
import { bajasFiltradas, bajasPorAsesor, bajasPorMotivo, calcularResumen } from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";

export const dynamic = "force-dynamic";

export default async function PaginaBajas({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, rango, asesoresDisponibles } = await contextoPagina(searchParams);
  const esGerente = sesion.rol === "gerente";

  const bajas = bajasFiltradas(dataset, filtros, rango);
  const resumen = calcularResumen(dataset, filtros, rango);
  const porMotivo = bajasPorMotivo(bajas);
  const porAsesor = bajasPorAsesor(bajas);

  const ordenadas = [...bajas].sort(
    (a, b) => (b.fecha?.getTime() ?? 0) - (a.fecha?.getTime() ?? 0),
  );
  const motivoPrincipal = porMotivo[0];

  return (
    <>
      <EncabezadoPagina
        titulo="Bajas"
        descripcion={`Cancelaciones del período y sus motivos · ${describirPeriodo(filtros)}`}
      />

      <BannersEstado dataset={dataset} esGerente={esGerente} />

      <FiltrosGlobales
        zonas={dataset.zonas}
        asesores={asesoresDisponibles}
        productos={dataset.productos}
        puedeFiltrarAsesor={esGerente}
        asesorFijo={sesion.asesor}
        actualizadoEn={dataset.actualizadoEn}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaKpi etiqueta="Bajas del período" valor={numero(resumen.bajasCantidad)} />
        <TarjetaKpi etiqueta="Importe dado de baja" valor={moneda(resumen.bajasImporte)} />
        <TarjetaKpi
          etiqueta="Tasa de bajas"
          valor={porcentaje(resumen.tasaBajas, 1)}
          detalle={`sobre ${numero(resumen.altas)} altas`}
        />
        <TarjetaKpi
          etiqueta="Motivo principal"
          valor={motivoPrincipal ? numero(motivoPrincipal.cantidad) : "—"}
          detalle={motivoPrincipal?.clave ?? "Sin bajas registradas"}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Tarjeta titulo="Motivos de baja" descripcion="Cantidad de bajas por motivo declarado">
          {porMotivo.length > 0 ? (
            <GraficoBarrasHorizontal
              datos={porMotivo.map((item) => ({ clave: item.clave, valor: item.cantidad }))}
              color={PALETA.rojo}
            />
          ) : (
            <SinDatos mensaje="No hay bajas en el período seleccionado." />
          )}
        </Tarjeta>

        <Tarjeta titulo="Bajas por vendedor" descripcion="Distribución dentro del equipo">
          {porAsesor.length > 0 ? (
            <GraficoBarrasHorizontal
              datos={porAsesor.map((item) => ({ clave: item.clave, valor: item.cantidad }))}
              color={PALETA.acento}
            />
          ) : (
            <SinDatos mensaje="No hay bajas en el período seleccionado." />
          )}
        </Tarjeta>
      </div>

      <div className="mt-3">
        <Tarjeta titulo="Detalle de bajas" descripcion="Las más recientes primero">
          {ordenadas.length > 0 ? (
            <div className="-mx-5 overflow-x-auto px-5">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-tinta-suave">
                    <th className="py-2 pr-3 font-semibold">Fecha</th>
                    <th className="py-2 pr-3 font-semibold">Vendedor</th>
                    <th className="py-2 pr-3 font-semibold">Zona</th>
                    <th className="py-2 pr-3 font-semibold">Producto</th>
                    <th className="py-2 pr-3 text-right font-semibold">Cantidad</th>
                    <th className="py-2 pr-3 text-right font-semibold">Importe</th>
                    <th className="py-2 font-semibold">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenadas.slice(0, 200).map((baja, indice) => (
                    <tr key={`${baja.id}-${indice}`} className="border-b border-borde/70 last:border-0">
                      <td className="tabular py-2.5 pr-3">{fechaCorta(baja.fecha)}</td>
                      <td className="py-2.5 pr-3 font-medium">{baja.asesor}</td>
                      <td className="py-2.5 pr-3 text-tinta-suave">{baja.zona || "—"}</td>
                      <td className="py-2.5 pr-3">{baja.producto || "—"}</td>
                      <td className="tabular py-2.5 pr-3 text-right">{numero(baja.cantidad)}</td>
                      <td className="tabular py-2.5 pr-3 text-right">{moneda(baja.importe)}</td>
                      <td className="py-2.5 text-tinta-suave">{baja.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {ordenadas.length > 200 && (
                <p className="mt-3 text-xs text-tinta-suave">
                  Se muestran las 200 bajas más recientes de {numero(ordenadas.length)}.
                </p>
              )}
            </div>
          ) : (
            <SinDatos mensaje="No hay bajas en el período seleccionado." />
          )}
        </Tarjeta>
      </div>
    </>
  );
}
