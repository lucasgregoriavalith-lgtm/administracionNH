import { esBaja } from "./data";
import type { Filtros } from "./filtros";
import { claveMes, etiquetaMes, fechaUTC, mesesEntre } from "./parse";
import type { Baja, Dataset, Presupuesto, Prospecto, Venta } from "./types";

export type Rango = { desde: Date; hasta: Date; meses: string[] };

function hoyUTC(): Date {
  const ahora = new Date();
  return fechaUTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate());
}

function inicioDeMes(fecha: Date, desplazamiento = 0): Date {
  return fechaUTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + desplazamiento, 1);
}

function finDeMes(fecha: Date, desplazamiento = 0): Date {
  return fechaUTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + desplazamiento + 1, 0);
}

function extremosDeDatos(dataset: Dataset): { min: Date; max: Date } | null {
  const fechas: Date[] = [];
  dataset.ventas.forEach((v) => v.fecha && fechas.push(v.fecha));
  dataset.bajas.forEach((b) => b.fecha && fechas.push(b.fecha));
  dataset.presupuesto.forEach((p) => {
    const [anio, mes] = p.mes.split("-").map(Number);
    if (anio && mes) fechas.push(fechaUTC(anio, mes - 1, 1));
  });
  if (fechas.length === 0) return null;

  const tiempos = fechas.map((f) => f.getTime());
  return { min: new Date(Math.min(...tiempos)), max: new Date(Math.max(...tiempos)) };
}

/**
 * true si los datos cubren el arranque del rango. Sirve para no mostrar
 * variaciones absurdas cuando el período anterior está incompleto o vacío.
 */
export function hayHistorialPara(dataset: Dataset, rango: Rango): boolean {
  const extremos = extremosDeDatos(dataset);
  if (!extremos) return false;
  return extremos.min.getTime() <= rango.desde.getTime();
}

export function resolverRango(dataset: Dataset, filtros: Filtros): Rango {
  const hoy = hoyUTC();
  let desde: Date;
  let hasta: Date;

  switch (filtros.periodo) {
    case "mes-actual":
      desde = inicioDeMes(hoy);
      hasta = finDeMes(hoy);
      break;
    case "3m":
      desde = inicioDeMes(hoy, -2);
      hasta = finDeMes(hoy);
      break;
    case "anio":
      desde = fechaUTC(hoy.getUTCFullYear(), 0, 1);
      hasta = fechaUTC(hoy.getUTCFullYear(), 11, 31);
      break;
    case "todo": {
      const extremos = extremosDeDatos(dataset);
      desde = extremos ? inicioDeMes(extremos.min) : inicioDeMes(hoy, -11);
      hasta = extremos ? finDeMes(extremos.max) : finDeMes(hoy);
      break;
    }
    case "personalizado":
      desde = filtros.desde ?? inicioDeMes(hoy, -11);
      hasta = filtros.hasta ?? finDeMes(hoy);
      break;
    case "12m":
    default:
      desde = inicioDeMes(hoy, -11);
      hasta = finDeMes(hoy);
      break;
  }

  if (desde.getTime() > hasta.getTime()) [desde, hasta] = [hasta, desde];

  return { desde, hasta, meses: mesesEntre(desde, hasta) };
}

/** Mismo largo en meses, inmediatamente anterior. Sirve para las comparaciones. */
export function rangoAnterior(rango: Rango): Rango {
  const cantidadMeses = Math.max(1, rango.meses.length);
  const hasta = fechaUTC(rango.desde.getUTCFullYear(), rango.desde.getUTCMonth(), 0);
  const desde = inicioDeMes(hasta, -(cantidadMeses - 1));
  return { desde, hasta, meses: mesesEntre(desde, hasta) };
}

function coincideTexto(valor: string, filtro: string): boolean {
  if (!filtro) return true;
  return valor.trim().toLowerCase() === filtro.trim().toLowerCase();
}

function dentroDelRango(fecha: Date | null, rango: Rango): boolean {
  if (!fecha) return false;
  return fecha.getTime() >= rango.desde.getTime() && fecha.getTime() <= rango.hasta.getTime();
}

export function ventasFiltradas(dataset: Dataset, filtros: Filtros, rango: Rango): Venta[] {
  return dataset.ventas.filter(
    (v) =>
      dentroDelRango(v.fecha, rango) &&
      coincideTexto(v.asesor, filtros.asesor) &&
      coincideTexto(v.zona, filtros.zona) &&
      coincideTexto(v.producto, filtros.producto),
  );
}

/** Sólo las altas (las bajas se analizan aparte). */
export function altasFiltradas(dataset: Dataset, filtros: Filtros, rango: Rango): Venta[] {
  return ventasFiltradas(dataset, filtros, rango).filter((v) => !esBaja(v.tipoOperacion));
}

export function bajasFiltradas(dataset: Dataset, filtros: Filtros, rango: Rango): Baja[] {
  return dataset.bajas.filter(
    (b) =>
      dentroDelRango(b.fecha, rango) &&
      coincideTexto(b.asesor, filtros.asesor) &&
      coincideTexto(b.zona, filtros.zona) &&
      coincideTexto(b.producto, filtros.producto),
  );
}

export function presupuestoFiltrado(dataset: Dataset, filtros: Filtros, rango: Rango): Presupuesto[] {
  const meses = new Set(rango.meses);
  return dataset.presupuesto.filter(
    (p) =>
      meses.has(p.mes) &&
      coincideTexto(p.asesor, filtros.asesor) &&
      coincideTexto(p.zona, filtros.zona),
  );
}

export function prospectosFiltrados(dataset: Dataset, filtros: Filtros): Prospecto[] {
  return dataset.prospectos.filter(
    (p) =>
      coincideTexto(p.asesor, filtros.asesor) &&
      coincideTexto(p.zona, filtros.zona) &&
      coincideTexto(p.productoInteres, filtros.producto),
  );
}

function sumar<T>(lista: T[], obtener: (item: T) => number): number {
  return lista.reduce((total, item) => total + (obtener(item) || 0), 0);
}

export function porcentajeCumplimiento(real: number, objetivo: number): number {
  if (!objetivo) return 0;
  return (real / objetivo) * 100;
}

export type Resumen = {
  altas: number;
  operaciones: number;
  facturacion: number;
  bajasCantidad: number;
  bajasImporte: number;
  ventaNeta: number;
  facturacionNeta: number;
  ticketPromedio: number;
  tasaBajas: number;
  objetivoVentas: number;
  objetivoFacturacion: number;
  cumplimientoVentas: number;
  cumplimientoFacturacion: number;
};

export function calcularResumen(dataset: Dataset, filtros: Filtros, rango: Rango): Resumen {
  const altas = altasFiltradas(dataset, filtros, rango);
  const bajas = bajasFiltradas(dataset, filtros, rango);
  const presupuesto = presupuestoFiltrado(dataset, filtros, rango);

  const cantidadAltas = sumar(altas, (v) => v.cantidad);
  const facturacion = sumar(altas, (v) => v.facturacion);
  const bajasCantidad = sumar(bajas, (b) => b.cantidad);
  const bajasImporte = sumar(bajas, (b) => b.importe);
  const objetivoVentas = sumar(presupuesto, (p) => p.objetivoVentas);
  const objetivoFacturacion = sumar(presupuesto, (p) => p.objetivoFacturacion);

  return {
    altas: cantidadAltas,
    operaciones: altas.length,
    facturacion,
    bajasCantidad,
    bajasImporte,
    ventaNeta: cantidadAltas - bajasCantidad,
    facturacionNeta: facturacion - bajasImporte,
    ticketPromedio: cantidadAltas > 0 ? facturacion / cantidadAltas : 0,
    tasaBajas: cantidadAltas > 0 ? (bajasCantidad / cantidadAltas) * 100 : 0,
    objetivoVentas,
    objetivoFacturacion,
    cumplimientoVentas: porcentajeCumplimiento(cantidadAltas, objetivoVentas),
    cumplimientoFacturacion: porcentajeCumplimiento(facturacion, objetivoFacturacion),
  };
}

/** Variación porcentual contra el período inmediatamente anterior. */
export function variacion(actual: number, anterior: number): number | null {
  if (!anterior) return null;
  return ((actual - anterior) / Math.abs(anterior)) * 100;
}

export type FilaCumplimiento = {
  clave: string;
  zona: string;
  objetivoVentas: number;
  realVentas: number;
  cumplimientoVentas: number;
  objetivoFacturacion: number;
  realFacturacion: number;
  cumplimientoFacturacion: number;
  bajas: number;
  ventaNeta: number;
  ticketPromedio: number;
};

function construirFilas(
  claves: string[],
  zonaDe: (clave: string) => string,
  altas: Venta[],
  bajas: Baja[],
  presupuesto: Presupuesto[],
  claveDeVenta: (v: Venta) => string,
  claveDeBaja: (b: Baja) => string,
  claveDePresupuesto: (p: Presupuesto) => string,
): FilaCumplimiento[] {
  return claves
    .map((clave) => {
      const normal = clave.toLowerCase();
      const misAltas = altas.filter((v) => claveDeVenta(v).toLowerCase() === normal);
      const misBajas = bajas.filter((b) => claveDeBaja(b).toLowerCase() === normal);
      const miPresupuesto = presupuesto.filter((p) => claveDePresupuesto(p).toLowerCase() === normal);

      const realVentas = sumar(misAltas, (v) => v.cantidad);
      const realFacturacion = sumar(misAltas, (v) => v.facturacion);
      const objetivoVentas = sumar(miPresupuesto, (p) => p.objetivoVentas);
      const objetivoFacturacion = sumar(miPresupuesto, (p) => p.objetivoFacturacion);
      const cantidadBajas = sumar(misBajas, (b) => b.cantidad);

      return {
        clave,
        zona: zonaDe(clave),
        objetivoVentas,
        realVentas,
        cumplimientoVentas: porcentajeCumplimiento(realVentas, objetivoVentas),
        objetivoFacturacion,
        realFacturacion,
        cumplimientoFacturacion: porcentajeCumplimiento(realFacturacion, objetivoFacturacion),
        bajas: cantidadBajas,
        ventaNeta: realVentas - cantidadBajas,
        ticketPromedio: realVentas > 0 ? realFacturacion / realVentas : 0,
      };
    })
    .filter(
      (fila) =>
        fila.realVentas > 0 || fila.objetivoVentas > 0 || fila.objetivoFacturacion > 0 || fila.bajas > 0,
    );
}

export function cumplimientoPorAsesor(
  dataset: Dataset,
  filtros: Filtros,
  rango: Rango,
): FilaCumplimiento[] {
  const altas = altasFiltradas(dataset, filtros, rango);
  const bajas = bajasFiltradas(dataset, filtros, rango);
  const presupuesto = presupuestoFiltrado(dataset, filtros, rango);

  const nombres = Array.from(
    new Set([
      ...dataset.asesores.map((a) => a.nombre),
      ...altas.map((v) => v.asesor),
      ...presupuesto.map((p) => p.asesor),
    ].filter(Boolean)),
  ).filter((nombre) => coincideTexto(nombre, filtros.asesor));

  const zonaDe = new Map(dataset.asesores.map((a) => [a.nombre.toLowerCase(), a.zona]));

  return construirFilas(
    nombres,
    (nombre) => zonaDe.get(nombre.toLowerCase()) ?? "",
    altas,
    bajas,
    presupuesto,
    (v) => v.asesor,
    (b) => b.asesor,
    (p) => p.asesor,
  ).sort((a, b) => b.cumplimientoFacturacion - a.cumplimientoFacturacion);
}

export function cumplimientoPorZona(
  dataset: Dataset,
  filtros: Filtros,
  rango: Rango,
): FilaCumplimiento[] {
  const altas = altasFiltradas(dataset, filtros, rango);
  const bajas = bajasFiltradas(dataset, filtros, rango);
  const presupuesto = presupuestoFiltrado(dataset, filtros, rango);

  const zonas = Array.from(
    new Set([...dataset.zonas, ...altas.map((v) => v.zona), ...presupuesto.map((p) => p.zona)].filter(Boolean)),
  ).filter((zona) => coincideTexto(zona, filtros.zona));

  return construirFilas(
    zonas,
    (zona) => zona,
    altas,
    bajas,
    presupuesto,
    (v) => v.zona,
    (b) => b.zona,
    (p) => p.zona,
  ).sort((a, b) => b.realFacturacion - a.realFacturacion);
}

export type PuntoMensual = {
  mes: string;
  etiqueta: string;
  ventas: number;
  facturacion: number;
  bajas: number;
  importeBajas: number;
  ventaNeta: number;
  objetivoVentas: number;
  objetivoFacturacion: number;
  cumplimientoVentas: number;
  cumplimientoFacturacion: number;
};

export function evolucionMensual(dataset: Dataset, filtros: Filtros, rango: Rango): PuntoMensual[] {
  const altas = altasFiltradas(dataset, filtros, rango);
  const bajas = bajasFiltradas(dataset, filtros, rango);
  const presupuesto = presupuestoFiltrado(dataset, filtros, rango);

  const porMes = new Map<string, PuntoMensual>();
  rango.meses.forEach((mes) => {
    porMes.set(mes, {
      mes,
      etiqueta: etiquetaMes(mes),
      ventas: 0,
      facturacion: 0,
      bajas: 0,
      importeBajas: 0,
      ventaNeta: 0,
      objetivoVentas: 0,
      objetivoFacturacion: 0,
      cumplimientoVentas: 0,
      cumplimientoFacturacion: 0,
    });
  });

  altas.forEach((venta) => {
    if (!venta.fecha) return;
    const punto = porMes.get(claveMes(venta.fecha));
    if (!punto) return;
    punto.ventas += venta.cantidad;
    punto.facturacion += venta.facturacion;
  });

  bajas.forEach((baja) => {
    if (!baja.fecha) return;
    const punto = porMes.get(claveMes(baja.fecha));
    if (!punto) return;
    punto.bajas += baja.cantidad;
    punto.importeBajas += baja.importe;
  });

  presupuesto.forEach((fila) => {
    const punto = porMes.get(fila.mes);
    if (!punto) return;
    punto.objetivoVentas += fila.objetivoVentas;
    punto.objetivoFacturacion += fila.objetivoFacturacion;
  });

  return rango.meses.map((mes) => {
    const punto = porMes.get(mes)!;
    punto.ventaNeta = punto.ventas - punto.bajas;
    punto.cumplimientoVentas = porcentajeCumplimiento(punto.ventas, punto.objetivoVentas);
    punto.cumplimientoFacturacion = porcentajeCumplimiento(punto.facturacion, punto.objetivoFacturacion);
    return punto;
  });
}

export type ItemRanking = FilaCumplimiento & { posicion: number; participacion: number };

export function ranking(dataset: Dataset, filtros: Filtros, rango: Rango): ItemRanking[] {
  const filas = cumplimientoPorAsesor(dataset, filtros, rango).sort(
    (a, b) => b.realFacturacion - a.realFacturacion,
  );
  const total = sumar(filas, (f) => f.realFacturacion);

  return filas.map((fila, indice) => ({
    ...fila,
    posicion: indice + 1,
    participacion: total > 0 ? (fila.realFacturacion / total) * 100 : 0,
  }));
}

export type Agrupado = { clave: string; cantidad: number; importe: number };

function agrupar<T>(
  items: T[],
  clave: (item: T) => string,
  cantidad: (item: T) => number,
  importe: (item: T) => number,
): Agrupado[] {
  const mapa = new Map<string, Agrupado>();
  items.forEach((item) => {
    const k = clave(item) || "Sin especificar";
    const actual = mapa.get(k) ?? { clave: k, cantidad: 0, importe: 0 };
    actual.cantidad += cantidad(item) || 0;
    actual.importe += importe(item) || 0;
    mapa.set(k, actual);
  });
  return Array.from(mapa.values()).sort((a, b) => b.cantidad - a.cantidad);
}

export function bajasPorMotivo(bajas: Baja[]): Agrupado[] {
  return agrupar(bajas, (b) => b.motivo, (b) => b.cantidad, (b) => b.importe);
}

export function bajasPorAsesor(bajas: Baja[]): Agrupado[] {
  return agrupar(bajas, (b) => b.asesor, (b) => b.cantidad, (b) => b.importe);
}

export function ventasPorProducto(altas: Venta[]): Agrupado[] {
  return agrupar(altas, (v) => v.producto, (v) => v.cantidad, (v) => v.facturacion);
}

export function ventasPorZona(altas: Venta[]): Agrupado[] {
  return agrupar(altas, (v) => v.zona, (v) => v.cantidad, (v) => v.facturacion);
}

export function prospectosPorEstado(prospectos: Prospecto[]): Agrupado[] {
  return agrupar(prospectos, (p) => p.estado, () => 1, () => 0);
}

export function prospectosPorAsesor(prospectos: Prospecto[]): Agrupado[] {
  return agrupar(prospectos, (p) => p.asesor, () => 1, () => 0);
}
