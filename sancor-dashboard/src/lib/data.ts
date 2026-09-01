import { config, HOJAS, modoDatos } from "./config";
import { datasetDemo } from "./demo-data";
import { claveMes, normalizarMes, parseFecha, parseNumero, texto } from "./parse";
import { leerHojas, type FilaSheet } from "./sheets";
import type { Asesor, Baja, Dataset, Plan, Presupuesto, Prospecto, Venta } from "./types";

/** Devuelve el primer valor no vacío entre varios nombres posibles de columna. */
function col(fila: FilaSheet, ...nombres: string[]): unknown {
  for (const nombre of nombres) {
    const valor = fila[nombre];
    if (valor !== undefined && valor !== null && valor !== "") return valor;
  }
  return "";
}

/** true si el tipo de operación representa una baja. */
export function esBaja(tipoOperacion: string): boolean {
  return texto(tipoOperacion).toUpperCase().startsWith("BAJA");
}

function unicos(valores: string[]): string[] {
  return Array.from(new Set(valores.filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
}

function mapearAsesores(filas: FilaSheet[]): Asesor[] {
  return filas
    .map((fila) => ({
      id: texto(col(fila, "ID_ASESOR", "ID")),
      nombre: texto(col(fila, "ASESOR", "NOMBRE", "VENDEDOR")),
      zona: texto(col(fila, "ZONA")),
    }))
    .filter((a) => a.nombre);
}

function mapearVentas(filas: FilaSheet[], zonaDe: Map<string, string>): Venta[] {
  return filas
    .map((fila) => {
      const asesor = texto(col(fila, "ASESOR", "VENDEDOR"));
      return {
        id: texto(col(fila, "ID_VENTA", "ID")),
        fecha: parseFecha(col(fila, "FECHA")),
        asesor,
        zona: texto(col(fila, "ZONA")) || zonaDe.get(asesor.toLowerCase()) || "",
        producto: texto(col(fila, "PRODUCTO", "PLAN")),
        tipoOperacion: texto(col(fila, "TIPO_OPERACION", "TIPO")) || "ALTA",
        cantidad: parseNumero(col(fila, "CANTIDAD")) || 1,
        facturacion: parseNumero(col(fila, "FACTURACION", "IMPORTE", "MONTO")),
        cliente: texto(col(fila, "CLIENTE")),
        observaciones: texto(col(fila, "OBSERVACIONES")),
      };
    })
    .filter((v) => v.asesor || v.fecha);
}

function mapearBajas(filas: FilaSheet[], zonaDe: Map<string, string>): Baja[] {
  return filas
    .map((fila) => {
      const asesor = texto(col(fila, "ASESOR", "VENDEDOR"));
      return {
        id: texto(col(fila, "ID_BAJA", "ID")),
        fecha: parseFecha(col(fila, "FECHA")),
        asesor,
        zona: texto(col(fila, "ZONA")) || zonaDe.get(asesor.toLowerCase()) || "",
        producto: texto(col(fila, "PRODUCTO", "PLAN")),
        cantidad: parseNumero(col(fila, "CANTIDAD")) || 1,
        importe: parseNumero(col(fila, "IMPORTE", "FACTURACION", "MONTO")),
        motivo: texto(col(fila, "MOTIVO")) || "Sin especificar",
      };
    })
    .filter((b) => b.asesor || b.fecha);
}

function mapearPresupuesto(filas: FilaSheet[], zonaDe: Map<string, string>): Presupuesto[] {
  return filas
    .map((fila) => {
      const asesor = texto(col(fila, "ASESOR", "VENDEDOR"));
      return {
        mes: normalizarMes(col(fila, "MES", "PERIODO")) ?? "",
        asesor,
        zona: texto(col(fila, "ZONA")) || zonaDe.get(asesor.toLowerCase()) || "",
        objetivoVentas: parseNumero(col(fila, "OBJETIVO_VENTAS", "OBJETIVO_CANTIDAD")),
        objetivoFacturacion: parseNumero(col(fila, "OBJETIVO_FACTURACION", "OBJETIVO_IMPORTE")),
      };
    })
    .filter((p) => p.mes && p.asesor);
}

function mapearProspectos(filas: FilaSheet[], zonaDe: Map<string, string>): Prospecto[] {
  return filas
    .map((fila) => {
      const asesor = texto(col(fila, "ASESOR", "VENDEDOR"));
      return {
        fila: fila._fila,
        id: texto(col(fila, "ID_PROSPECTO", "ID")),
        fechaContacto: parseFecha(col(fila, "FECHA_CONTACTO", "FECHA")),
        asesor,
        zona: texto(col(fila, "ZONA")) || zonaDe.get(asesor.toLowerCase()) || "",
        nombre: texto(col(fila, "NOMBRE", "CLIENTE")),
        contacto: texto(col(fila, "CONTACTO", "TELEFONO", "EMAIL")),
        productoInteres: texto(col(fila, "PRODUCTO_INTERES", "PRODUCTO")),
        estado: texto(col(fila, "ESTADO")) || "Nuevo",
        observaciones: texto(col(fila, "OBSERVACIONES")),
      };
    })
    .filter((p) => p.nombre);
}

function columnaAuxiliar(filas: FilaSheet[], nombre: string): string[] {
  return unicos(filas.map((fila) => texto(fila[nombre])));
}

async function construirDataset(): Promise<Dataset> {
  const nombres = [
    HOJAS.ventas, HOJAS.asesores, HOJAS.planes, HOJAS.presupuesto,
    HOJAS.bajas, HOJAS.auxiliares, HOJAS.prospectos,
  ];

  const { datos, faltantes } = await leerHojas(nombres);
  const avisos: string[] = [];

  if (faltantes.length > 0) {
    avisos.push(
      `Estas hojas todavía no existen en la planilla: ${faltantes.join(", ")}. ` +
        "Podés crearlas automáticamente desde Configuración.",
    );
  }

  const asesores = mapearAsesores(datos[HOJAS.asesores] ?? []);
  const zonaDe = new Map(asesores.map((a) => [a.nombre.toLowerCase(), a.zona]));

  const ventas = mapearVentas(datos[HOJAS.ventas] ?? [], zonaDe);
  const bajasHoja = mapearBajas(datos[HOJAS.bajas] ?? [], zonaDe);

  // Si la hoja BAJAS está vacía, se usan las filas marcadas como BAJA en BASE_VENTAS.
  const bajas =
    bajasHoja.length > 0
      ? bajasHoja
      : ventas.filter((v) => esBaja(v.tipoOperacion)).map<Baja>((v) => ({
          id: v.id,
          fecha: v.fecha,
          asesor: v.asesor,
          zona: v.zona,
          producto: v.producto,
          cantidad: v.cantidad,
          importe: v.facturacion,
          motivo: texto(v.observaciones) || "Sin especificar",
        }));

  if (bajasHoja.length > 0 && ventas.some((v) => esBaja(v.tipoOperacion))) {
    avisos.push(
      "Hay bajas cargadas en la hoja BAJAS y también filas con TIPO_OPERACION = BAJA en " +
        "BASE_VENTAS. Para no contarlas dos veces, se usan únicamente las de la hoja BAJAS.",
    );
  }

  const planes: Plan[] = (datos[HOJAS.planes] ?? [])
    .map((fila) => ({
      id: texto(col(fila, "ID_PLAN", "ID")),
      producto: texto(col(fila, "PRODUCTO", "PLAN", "NOMBRE")),
    }))
    .filter((p) => p.producto);

  const auxiliares = datos[HOJAS.auxiliares] ?? [];
  const prospectos = mapearProspectos(datos[HOJAS.prospectos] ?? [], zonaDe);

  const zonas = unicos([
    ...columnaAuxiliar(auxiliares, "ZONAS"),
    ...asesores.map((a) => a.zona),
    ...ventas.map((v) => v.zona),
  ]);

  const productos = unicos([
    ...planes.map((p) => p.producto),
    ...columnaAuxiliar(auxiliares, "PRODUCTOS"),
    ...ventas.map((v) => v.producto),
  ]);

  const motivosBaja = unicos([
    ...columnaAuxiliar(auxiliares, "MOTIVOS_BAJA"),
    ...bajas.map((b) => b.motivo),
  ]);

  if (ventas.length === 0 && !faltantes.includes(HOJAS.ventas)) {
    avisos.push("La hoja BASE_VENTAS no tiene filas cargadas todavía.");
  }

  return {
    ventas,
    asesores,
    planes,
    presupuesto: mapearPresupuesto(datos[HOJAS.presupuesto] ?? [], zonaDe),
    bajas,
    prospectos,
    zonas,
    productos,
    motivosBaja,
    origen: "sheets",
    actualizadoEn: new Date().toISOString(),
    avisos,
    error: null,
  };
}

function datasetVacio(mensajeError: string): Dataset {
  return {
    ventas: [],
    asesores: [],
    planes: [],
    presupuesto: [],
    bajas: [],
    prospectos: [],
    zonas: [],
    productos: [],
    motivosBaja: [],
    origen: "sheets",
    actualizadoEn: new Date().toISOString(),
    avisos: [],
    error: mensajeError,
  };
}

type Cache = { dataset: Dataset; vence: number };

// El cache vive en memoria del servidor: evita pegarle a Google en cada click,
// pero se renueva solo cada CACHE_SEGUNDOS para reflejar cambios hechos en la planilla.
let cache: Cache | null = null;
let enVuelo: Promise<Dataset> | null = null;

export function invalidarCache(): void {
  cache = null;
  enVuelo = null;
}

export async function obtenerDataset(): Promise<Dataset> {
  if (modoDatos === "demo") return datasetDemo();

  const ahora = Date.now();
  if (cache && cache.vence > ahora) return cache.dataset;
  if (enVuelo) return enVuelo;

  enVuelo = construirDataset()
    .catch((error: unknown) => {
      const mensaje = error instanceof Error ? error.message : String(error);
      return datasetVacio(mensaje);
    })
    .then((dataset) => {
      // Un dataset con error se cachea poco tiempo para poder reintentar pronto.
      const segundos = dataset.error ? 15 : Math.max(5, config.cacheSegundos);
      cache = { dataset, vence: Date.now() + segundos * 1000 };
      enVuelo = null;
      return dataset;
    });

  return enVuelo;
}

/** Mes actual en formato "AAAA-MM". */
export function mesActual(): string {
  return claveMes(new Date());
}
