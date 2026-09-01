import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoAnillo, GraficoEvolucionFacturacion } from "@/components/graficos";
import { TablaCumplimiento } from "@/components/tabla-cumplimiento";
import { BarraProgreso, EncabezadoPagina, Semaforo, SinDatos, Tarjeta, TarjetaKpi } from "@/components/ui";
import { describirPeriodo, type ParametrosBusqueda } from "@/lib/filtros";
import { moneda, numero, porcentaje } from "@/lib/format";
import {
  altasFiltradas,
  calcularResumen,
  cumplimientoPorAsesor,
  evolucionMensual,
  hayHistorialPara,
  rangoAnterior,
  resolverRango,
  variacion,
  ventasPorProducto,
} from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";
import { etiquetaMes, claveMes } from "@/lib/parse";

export const dynamic = "force-dynamic";

export default async function PaginaResumen({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, rango, asesoresDisponibles } = await contextoPagina(searchParams);
  const esGerente = sesion.rol === "gerente";

  const resumen = calcularResumen(dataset, filtros, rango);

  // La comparación sólo tiene sentido si hay datos que cubran todo el período anterior.
  const rangoPrevio = rangoAnterior(rango);
  const comparable = hayHistorialPara(dataset, rangoPrevio);
  const anterior = calcularResumen(dataset, filtros, rangoPrevio);
  const detalleComparacion = comparable ? "vs. período anterior" : "sin período anterior completo";
  const compararCon = (actual: number, previo: number) =>
    comparable ? variacion(actual, previo) : null;

  const rangoMesActual = resolverRango(dataset, { ...filtros, periodo: "mes-actual", desde: null, hasta: null });
  const resumenMes = calcularResumen(dataset, filtros, rangoMesActual);

  const evolucion = evolucionMensual(dataset, filtros, rango);
  const altas = altasFiltradas(dataset, filtros, rango);
  const porProducto = ventasPorProducto(altas);
  const porAsesor = cumplimientoPorAsesor(dataset, filtros, rango);

  const titulo = esGerente ? "Resumen del equipo" : `Mi resumen · ${sesion.asesor}`;

  return (
    <>
      <EncabezadoPagina
        titulo={titulo}
        descripcion={`${describirPeriodo(filtros)} · ${etiquetaMes(rango.meses[0] ?? "")} a ${etiquetaMes(
          rango.meses[rango.meses.length - 1] ?? "",
        )}`}
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
        <TarjetaKpi
          etiqueta="Ventas (altas)"
          valor={numero(resumen.altas)}
          detalle={detalleComparacion}
          variacion={compararCon(resumen.altas, anterior.altas)}
        />
        <TarjetaKpi
          etiqueta="Facturación"
          valor={moneda(resumen.facturacion)}
          detalle={detalleComparacion}
          variacion={compararCon(resumen.facturacion, anterior.facturacion)}
        />
        <TarjetaKpi
          etiqueta="Bajas"
          valor={numero(resumen.bajasCantidad)}
          detalle={`${porcentaje(resumen.tasaBajas, 1)} sobre altas · ${moneda(resumen.bajasImporte)}`}
        />
        <TarjetaKpi
          etiqueta="Venta neta"
          valor={numero(resumen.ventaNeta)}
          detalle={`Facturación neta ${moneda(resumen.facturacionNeta)}`}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="tarjeta p-5 lg:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Cumplimiento del período</h2>
            <span className="text-xs text-tinta-suave">{describirPeriodo(filtros)}</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-tinta-suave">Ventas</span>
                <Semaforo valor={resumen.cumplimientoVentas} hayObjetivo={resumen.objetivoVentas > 0} />
              </div>
              <BarraProgreso valor={resumen.cumplimientoVentas} hayObjetivo={resumen.objetivoVentas > 0} />
              <p className="tabular mt-2 text-sm">
                <span className="font-semibold">{numero(resumen.altas)}</span>
                <span className="text-tinta-suave"> de {numero(resumen.objetivoVentas)} objetivo</span>
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-tinta-suave">Facturación</span>
                <Semaforo
                  valor={resumen.cumplimientoFacturacion}
                  hayObjetivo={resumen.objetivoFacturacion > 0}
                />
              </div>
              <BarraProgreso
                valor={resumen.cumplimientoFacturacion}
                hayObjetivo={resumen.objetivoFacturacion > 0}
              />
              <p className="tabular mt-2 text-sm">
                <span className="font-semibold">{moneda(resumen.facturacion)}</span>
                <span className="text-tinta-suave"> de {moneda(resumen.objetivoFacturacion)} objetivo</span>
              </p>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-borde pt-4 sm:grid-cols-4">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-tinta-suave">Ticket promedio</dt>
              <dd className="tabular mt-0.5 text-sm font-semibold">{moneda(resumen.ticketPromedio)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-tinta-suave">Operaciones</dt>
              <dd className="tabular mt-0.5 text-sm font-semibold">{numero(resumen.operaciones)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-tinta-suave">Tasa de bajas</dt>
              <dd className="tabular mt-0.5 text-sm font-semibold">{porcentaje(resumen.tasaBajas, 1)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-tinta-suave">Facturación neta</dt>
              <dd className="tabular mt-0.5 text-sm font-semibold">{moneda(resumen.facturacionNeta)}</dd>
            </div>
          </dl>
        </div>

        <div className="tarjeta p-5">
          <h2 className="text-sm font-semibold">Mes en curso</h2>
          <p className="mb-4 text-xs text-tinta-suave">{etiquetaMes(claveMes(new Date()))}</p>

          <dl className="space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-tinta-suave">Ventas</dt>
              <dd className="tabular font-semibold">
                {numero(resumenMes.altas)}
                {resumenMes.objetivoVentas > 0 && (
                  <span className="font-normal text-tinta-suave"> / {numero(resumenMes.objetivoVentas)}</span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-tinta-suave">Facturación</dt>
              <dd className="tabular font-semibold">{moneda(resumenMes.facturacion)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-tinta-suave">Bajas</dt>
              <dd className="tabular font-semibold">{numero(resumenMes.bajasCantidad)}</dd>
            </div>
            <div className="border-t border-borde pt-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-tinta-suave">Cumplimiento facturación</span>
                <Semaforo
                  valor={resumenMes.cumplimientoFacturacion}
                  hayObjetivo={resumenMes.objetivoFacturacion > 0}
                />
              </div>
              <BarraProgreso
                valor={resumenMes.cumplimientoFacturacion}
                hayObjetivo={resumenMes.objetivoFacturacion > 0}
              />
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Tarjeta
          titulo="Evolución de facturación"
          descripcion="Facturación real contra el objetivo mensual"
          className="lg:col-span-2"
        >
          {evolucion.length > 0 ? (
            <GraficoEvolucionFacturacion datos={evolucion} />
          ) : (
            <SinDatos />
          )}
        </Tarjeta>

        <Tarjeta titulo="Mix de productos" descripcion="Facturación por producto">
          {porProducto.length > 0 ? (
            <GraficoAnillo
              datos={porProducto.map((item) => ({ clave: item.clave, valor: item.importe }))}
              tipo="moneda"
            />
          ) : (
            <SinDatos />
          )}
        </Tarjeta>
      </div>

      <div className="mt-3">
        <Tarjeta
          titulo={esGerente ? "Detalle por vendedor" : "Mi detalle"}
          descripcion="Objetivo, real y cumplimiento del período seleccionado"
        >
          <TablaCumplimiento filas={porAsesor} etiquetaColumna="Vendedor" />
        </Tarjeta>
      </div>
    </>
  );
}
