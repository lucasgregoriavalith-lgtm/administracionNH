import { claveMes, fechaUTC } from "./parse";
import type { Asesor, Baja, Dataset, Plan, Presupuesto, Prospecto, Venta } from "./types";

/**
 * Datos de ejemplo para poder usar la app antes de conectar el Google Sheet.
 * Son deterministas (misma semilla -> mismos números) para que el dashboard no
 * cambie de valores en cada recarga.
 */

function generador(semilla: number) {
  let estado = semilla >>> 0;
  return () => {
    estado |= 0;
    estado = (estado + 0x6d2b79f5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const EQUIPO: Asesor[] = [
  { id: "A1", nombre: "Paula", zona: "Centro" },
  { id: "A2", nombre: "Nicanor", zona: "Norte" },
  { id: "A3", nombre: "Adrian", zona: "Sur" },
  { id: "A4", nombre: "Antonia", zona: "Sur" },
];

const PRODUCTOS = ["Sancor Salud", "Medife", "Prevención", "Avalian"];

const MOTIVOS = [
  "Precio / aumento de cuota",
  "Cambio de obra social por empleo",
  "Falta de prestadores en la zona",
  "Mudanza",
  "Problemas de facturación",
  "Insatisfacción con la atención",
];

const NOMBRES_CLIENTE = [
  "Familia Rossi", "Comercio El Ancla", "Martín Alvarez", "Lucía Benítez", "Estudio Contable RS",
  "Gimena Torres", "Panadería La Espiga", "Hernán Quiroga", "Sofía Ledesma", "Transporte Andes",
  "Carla Sosa", "Julián Ferreyra", "Clínica Dental Sur", "Rocío Medina", "Diego Peralta",
];

const NOMBRES_PROSPECTO = [
  "Valeria Ibáñez", "Grupo Cordillera SRL", "Matías Roldán", "Silvina Paz", "Ferretería Nahuel",
  "Andrés Cabrera", "Bruno Salvatierra", "Micaela Duarte", "Hotel Los Cipreses", "Iván Aguirre",
  "Noelia Barrios", "Consultora Patagonia", "Franco Nieva", "Yamila Ocampo", "Taller Mecánico RT",
];

const ESTADOS = ["Nuevo", "Contactado", "Cotizado", "Ganado", "Perdido"];

const MESES_DEMO = 26;

function mesesRecientes(): { anio: number; mes: number }[] {
  const hoy = new Date();
  const lista: { anio: number; mes: number }[] = [];
  for (let i = MESES_DEMO - 1; i >= 0; i--) {
    const fecha = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - i, 1));
    lista.push({ anio: fecha.getUTCFullYear(), mes: fecha.getUTCMonth() });
  }
  return lista;
}

export function datasetDemo(): Dataset {
  const azar = generador(20260901);
  const ventas: Venta[] = [];
  const bajas: Baja[] = [];
  const presupuesto: Presupuesto[] = [];
  const meses = mesesRecientes();

  let contadorVenta = 1;
  let contadorBaja = 1;

  meses.forEach(({ anio, mes }, indiceMes) => {
    const estacionalidad = 1 + 0.18 * Math.sin((indiceMes / 12) * Math.PI * 2);

    EQUIPO.forEach((asesor, indiceAsesor) => {
      const base = [11, 9, 8, 7][indiceAsesor];
      const objetivoVentas = Math.round(base * estacionalidad);
      // Cerca del ticket promedio real, para que los porcentajes den valores creíbles.
      const ticketObjetivo = 112_000 + indiceAsesor * 4_000;

      presupuesto.push({
        mes: `${anio}-${String(mes + 1).padStart(2, "0")}`,
        asesor: asesor.nombre,
        zona: asesor.zona,
        objetivoVentas,
        objetivoFacturacion: objetivoVentas * ticketObjetivo,
      });

      // Cada asesor rinde distinto: así el semáforo muestra verdes, amarillos y rojos.
      const rendimiento = [1.06, 0.93, 0.74, 1.02][indiceAsesor] + (azar() - 0.5) * 0.2;
      const capitasObjetivo = Math.max(1, Math.round(objetivoVentas * rendimiento));

      let capitasCargadas = 0;
      while (capitasCargadas < capitasObjetivo) {
        const dia = 1 + Math.floor(azar() * 27);
        const producto = PRODUCTOS[Math.floor(azar() * PRODUCTOS.length)];
        const cantidad = Math.min(azar() > 0.82 ? 2 : 1, capitasObjetivo - capitasCargadas);
        const ticket = Math.round((62_000 + azar() * 105_000) / 500) * 500;
        capitasCargadas += cantidad;

        ventas.push({
          id: `V${String(contadorVenta++).padStart(5, "0")}`,
          fecha: fechaUTC(anio, mes, dia),
          asesor: asesor.nombre,
          zona: asesor.zona,
          producto,
          tipoOperacion: "ALTA",
          cantidad,
          facturacion: ticket * cantidad,
          cliente: NOMBRES_CLIENTE[Math.floor(azar() * NOMBRES_CLIENTE.length)],
          observaciones: "",
        });
      }

      const cantidadBajas = azar() > 0.45 ? 1 + Math.floor(azar() * 2) : 0;
      for (let i = 0; i < cantidadBajas; i++) {
        const dia = 1 + Math.floor(azar() * 27);
        bajas.push({
          id: `B${String(contadorBaja++).padStart(5, "0")}`,
          fecha: fechaUTC(anio, mes, dia),
          asesor: asesor.nombre,
          zona: asesor.zona,
          producto: PRODUCTOS[Math.floor(azar() * PRODUCTOS.length)],
          cantidad: 1,
          importe: Math.round((58_000 + azar() * 70_000) / 500) * 500,
          motivo: MOTIVOS[Math.floor(azar() * MOTIVOS.length)],
        });
      }
    });
  });

  const hoy = new Date();
  const prospectos: Prospecto[] = NOMBRES_PROSPECTO.flatMap((nombre, indice) => {
    const asesor = EQUIPO[indice % EQUIPO.length];
    const diasAtras = Math.floor(azar() * 55);
    const fecha = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate() - diasAtras));
    return [
      {
        fila: indice + 2,
        id: `P${String(indice + 1).padStart(4, "0")}`,
        fechaContacto: fecha,
        asesor: asesor.nombre,
        zona: asesor.zona,
        nombre,
        contacto: `+54 9 294 4${String(100000 + Math.floor(azar() * 899999)).slice(0, 6)}`,
        productoInteres: PRODUCTOS[Math.floor(azar() * PRODUCTOS.length)],
        estado: ESTADOS[Math.floor(azar() * ESTADOS.length)],
        observaciones: "",
      },
    ];
  });

  const planes: Plan[] = PRODUCTOS.map((producto, i) => ({ id: `PL${i + 1}`, producto }));

  return {
    ventas,
    asesores: EQUIPO,
    planes,
    presupuesto,
    bajas,
    prospectos,
    zonas: ["Centro", "Norte", "Sur"],
    productos: PRODUCTOS,
    motivosBaja: MOTIVOS,
    origen: "demo",
    actualizadoEn: new Date().toISOString(),
    avisos: [],
    error: null,
  };
}

/** Mes actual en formato "AAAA-MM", útil para textos de ayuda. */
export const mesActualDemo = claveMes(new Date());
