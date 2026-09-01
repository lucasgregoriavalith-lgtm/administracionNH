import { BannersEstado } from "@/components/banners";
import { FiltrosGlobales } from "@/components/filtros-globales";
import { GraficoObjetivoVsReal } from "@/components/graficos";
import { TablaCumplimiento } from "@/components/tabla-cumplimiento";
import { EncabezadoPagina, SinDatos, Tarjeta, TarjetaKpi } from "@/components/ui";
import { describirPeriodo, type ParametrosBusqueda } from "@/lib/filtros";
import { moneda, numero, porcentaje } from "@/lib/format";
import { calcularResumen, cumplimientoPorAsesor, cumplimientoPorZona } from "@/lib/metricas";
import { contextoPagina } from "@/lib/pagina";

export const dynamic = "force-dynamic";

export default async function PaginaObjetivos({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, filtros, rango, asesoresDisponibles } = await contextoPagina(searchParams);
  const esGerente = sesion.rol === "gerente";

  const resumen = calcularResumen(dataset, filtros, rango);
  const porAsesor = cumplimientoPorAsesor(dataset, filtros, rango);
  const porZona = cumplimientoPorZona(dataset, filtros, rango);

  const sinObjetivos = resumen.objetivoVentas === 0 && resumen.objetivoFacturacion === 0;

  const enVerde = porAsesor.filter((f) => f.objetivoFacturacion > 0 && f.cumplimientoFacturacion >= 100);
  const enRojo = porAsesor.filter((f) => f.objetivoFacturacion > 0 && f.cumplimientoFacturacion < 80);

  return (
    <>
      <EncabezadoPagina
        titulo="Cumplimiento de objetivos"
        descripcion={`Real contra la meta asignada en la hoja PRESUPUESTO · ${describirPeriodo(filtros)}`}
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

      {sinObjetivos && !dataset.error && (
        <div className="mb-5 rounded-xl border border-alerta/25 bg-alerta-suave px-4 py-3 text-sm text-alerta">
          No hay objetivos cargados para este período en la hoja <strong>PRESUPUESTO</strong>. Cargá una
          fila por mes y por vendedor con OBJETIVO_VENTAS y OBJETIVO_FACTURACION.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaKpi
          etiqueta="Cumplimiento ventas"
          valor={porcentaje(resumen.cumplimientoVentas, 1)}
          detalle={`${numero(resumen.altas)} de ${numero(resumen.objetivoVentas)}`}
          destacada
        />
        <TarjetaKpi
          etiqueta="Cumplimiento facturación"
          valor={porcentaje(resumen.cumplimientoFacturacion, 1)}
          detalle={`${moneda(resumen.facturacion)} de ${moneda(resumen.objetivoFacturacion)}`}
          destacada
        />
        <TarjetaKpi
          etiqueta="Vendedores en objetivo"
          valor={`${enVerde.length} de ${porAsesor.filter((f) => f.objetivoFacturacion > 0).length}`}
          detalle={enVerde.length > 0 ? enVerde.map((f) => f.clave).join(", ") : "Ninguno alcanzó el 100%"}
        />
        <TarjetaKpi
          etiqueta="Por debajo del 80%"
          valor={numero(enRojo.length)}
          detalle={enRojo.length > 0 ? enRojo.map((f) => f.clave).join(", ") : "Sin alertas"}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Tarjeta titulo="Facturación: objetivo vs. real" descripcion="Por vendedor">
          {porAsesor.length > 0 ? (
            <GraficoObjetivoVsReal
              tipo="moneda"
              datos={porAsesor.map((f) => ({
                clave: f.clave,
                objetivo: f.objetivoFacturacion,
                real: f.realFacturacion,
              }))}
            />
          ) : (
            <SinDatos />
          )}
        </Tarjeta>

        <Tarjeta titulo="Ventas: objetivo vs. real" descripcion="Cantidad de altas por vendedor">
          {porAsesor.length > 0 ? (
            <GraficoObjetivoVsReal
              tipo="numero"
              datos={porAsesor.map((f) => ({
                clave: f.clave,
                objetivo: f.objetivoVentas,
                real: f.realVentas,
              }))}
            />
          ) : (
            <SinDatos />
          )}
        </Tarjeta>
      </div>

      <div className="mt-3">
        <Tarjeta
          titulo="Detalle por vendedor"
          descripcion="Verde ≥ 100% · Amarillo entre 80% y 99% · Rojo por debajo del 80%"
        >
          <TablaCumplimiento filas={porAsesor} etiquetaColumna="Vendedor" />
        </Tarjeta>
      </div>

      {esGerente && (
        <div className="mt-3">
          <Tarjeta titulo="Detalle por zona" descripcion="Consolidado de cada zona comercial">
            <TablaCumplimiento filas={porZona} etiquetaColumna="Zona" mostrarZona={false} />
          </Tarjeta>
        </div>
      )}
    </>
  );
}
