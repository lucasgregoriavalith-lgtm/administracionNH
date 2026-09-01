import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoEvolucionCantidad, GraficoEvolucionFacturacion } from "@/components/graficos";
import { EncabezadoPagina, Semaforo, SinDatos, Tarjeta } from "@/components/ui";
import { describirPeriodo, type ParametrosBusqueda } from "@/lib/filtros";
import { moneda, numero } from "@/lib/format";
import { evolucionMensual } from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";

export const dynamic = "force-dynamic";

export default async function PaginaEvolucion({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, rango, asesoresDisponibles } = await contextoPagina(searchParams);
  const esGerente = sesion.rol === "gerente";
  const evolucion = evolucionMensual(dataset, filtros, rango);
  const conDatos = evolucion.some((p) => p.ventas > 0 || p.facturacion > 0 || p.objetivoVentas > 0);

  const totales = evolucion.reduce(
    (acumulado, punto) => ({
      ventas: acumulado.ventas + punto.ventas,
      facturacion: acumulado.facturacion + punto.facturacion,
      bajas: acumulado.bajas + punto.bajas,
      ventaNeta: acumulado.ventaNeta + punto.ventaNeta,
      objetivoVentas: acumulado.objetivoVentas + punto.objetivoVentas,
      objetivoFacturacion: acumulado.objetivoFacturacion + punto.objetivoFacturacion,
    }),
    { ventas: 0, facturacion: 0, bajas: 0, ventaNeta: 0, objetivoVentas: 0, objetivoFacturacion: 0 },
  );

  return (
    <>
      <EncabezadoPagina
        titulo="Evolución mensual"
        descripcion={`Cómo viene el mes a mes de ventas y facturación · ${describirPeriodo(filtros)}`}
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

      <div className="grid gap-3">
        <Tarjeta
          titulo="Facturación mes a mes"
          descripcion="Barras: facturación real. Línea punteada: objetivo del mes."
        >
          {conDatos ? <GraficoEvolucionFacturacion datos={evolucion} /> : <SinDatos />}
        </Tarjeta>

        <Tarjeta
          titulo="Altas y bajas mes a mes"
          descripcion="Cantidad de operaciones contra el objetivo de ventas"
        >
          {conDatos ? <GraficoEvolucionCantidad datos={evolucion} /> : <SinDatos />}
        </Tarjeta>

        <Tarjeta titulo="Detalle mensual" descripcion="Los mismos números, en tabla">
          {conDatos ? (
            <div className="-mx-5 overflow-x-auto px-5">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-tinta-suave">
                    <th className="py-2 pr-3 font-semibold">Mes</th>
                    <th className="py-2 pr-3 text-right font-semibold">Ventas</th>
                    <th className="py-2 pr-3 text-right font-semibold">Objetivo</th>
                    <th className="py-2 pr-3 font-semibold">Cumpl.</th>
                    <th className="py-2 pr-3 text-right font-semibold">Facturación</th>
                    <th className="py-2 pr-3 text-right font-semibold">Objetivo fact.</th>
                    <th className="py-2 pr-3 font-semibold">Cumpl.</th>
                    <th className="py-2 pr-3 text-right font-semibold">Bajas</th>
                    <th className="py-2 text-right font-semibold">Neto</th>
                  </tr>
                </thead>
                <tbody>
                  {evolucion.map((punto) => (
                    <tr key={punto.mes} className="border-b border-borde/70 last:border-0">
                      <td className="py-2.5 pr-3 font-medium">{punto.etiqueta}</td>
                      <td className="tabular py-2.5 pr-3 text-right">{numero(punto.ventas)}</td>
                      <td className="tabular py-2.5 pr-3 text-right text-tinta-suave">
                        {punto.objetivoVentas ? numero(punto.objetivoVentas) : "—"}
                      </td>
                      <td className="py-2.5 pr-3">
                        <Semaforo valor={punto.cumplimientoVentas} hayObjetivo={punto.objetivoVentas > 0} />
                      </td>
                      <td className="tabular py-2.5 pr-3 text-right">{moneda(punto.facturacion)}</td>
                      <td className="tabular py-2.5 pr-3 text-right text-tinta-suave">
                        {punto.objetivoFacturacion ? moneda(punto.objetivoFacturacion) : "—"}
                      </td>
                      <td className="py-2.5 pr-3">
                        <Semaforo
                          valor={punto.cumplimientoFacturacion}
                          hayObjetivo={punto.objetivoFacturacion > 0}
                        />
                      </td>
                      <td className="tabular py-2.5 pr-3 text-right">{numero(punto.bajas)}</td>
                      <td className="tabular py-2.5 text-right font-semibold">{numero(punto.ventaNeta)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-borde font-semibold">
                    <td className="py-2.5 pr-3">Total</td>
                    <td className="tabular py-2.5 pr-3 text-right">{numero(totales.ventas)}</td>
                    <td className="tabular py-2.5 pr-3 text-right">{numero(totales.objetivoVentas)}</td>
                    <td />
                    <td className="tabular py-2.5 pr-3 text-right">{moneda(totales.facturacion)}</td>
                    <td className="tabular py-2.5 pr-3 text-right">{moneda(totales.objetivoFacturacion)}</td>
                    <td />
                    <td className="tabular py-2.5 pr-3 text-right">{numero(totales.bajas)}</td>
                    <td className="tabular py-2.5 text-right">{numero(totales.ventaNeta)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <SinDatos />
          )}
        </Tarjeta>
      </div>
    </>
  );
}
