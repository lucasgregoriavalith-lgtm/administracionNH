/** Utilidades para interpretar lo que devuelve Google Sheets (números, fechas, meses). */

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const MESES_CORTOS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/** Epoch de las fechas de Google Sheets: 30/12/1899. */
const EPOCH_SHEETS = Date.UTC(1899, 11, 30);

export function fechaDesdeSerial(serial: number): Date {
  return new Date(EPOCH_SHEETS + Math.round(serial) * 86_400_000);
}

/** Fecha en UTC a medianoche, para que no se corra un día según la zona horaria. */
export function fechaUTC(anio: number, mes: number, dia: number): Date {
  return new Date(Date.UTC(anio, mes, dia));
}

export function parseFecha(valor: unknown): Date | null {
  if (valor === null || valor === undefined || valor === "") return null;
  if (valor instanceof Date) return Number.isNaN(valor.getTime()) ? null : valor;

  if (typeof valor === "number") {
    if (valor < 1 || valor > 2_958_465) return null; // fuera del rango razonable de Sheets
    return fechaDesdeSerial(valor);
  }

  const crudo = String(valor).trim();
  if (!crudo) return null;

  // Un número guardado como texto sigue siendo un serial de Sheets.
  if (/^\d+(\.\d+)?$/.test(crudo)) return parseFecha(Number(crudo));

  // DD/MM/AAAA o DD-MM-AAAA
  const dmy = crudo.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/);
  if (dmy) {
    const dia = Number(dmy[1]);
    const mes = Number(dmy[2]);
    let anio = Number(dmy[3]);
    if (anio < 100) anio += anio < 70 ? 2000 : 1900;
    if (mes >= 1 && mes <= 12 && dia >= 1 && dia <= 31) return fechaUTC(anio, mes - 1, dia);
    return null;
  }

  // AAAA-MM-DD (con o sin hora)
  const ymd = crudo.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (ymd) return fechaUTC(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));

  const fallback = new Date(crudo);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

export function parseNumero(valor: unknown): number {
  if (typeof valor === "number") return Number.isFinite(valor) ? valor : 0;
  if (valor === null || valor === undefined) return 0;

  const original = String(valor).trim();
  if (!original) return 0;

  const negativo = /^\(.*\)$/.test(original) || original.startsWith("-");
  // Saca símbolos de moneda, espacios (incluido el no separable), letras y porcentajes.
  let crudo = original.replace(/[()\s $A-Za-z%]/g, "").replace(/^-/, "");
  if (!crudo) return 0;

  const tienePunto = crudo.includes(".");
  const tieneComa = crudo.includes(",");

  if (tienePunto && tieneComa) {
    // El separador decimal es el que aparece más a la derecha.
    const decimal = crudo.lastIndexOf(",") > crudo.lastIndexOf(".") ? "," : ".";
    const miles = decimal === "," ? "." : ",";
    crudo = crudo.split(miles).join("").replace(decimal, ".");
  } else if (tieneComa) {
    crudo = crudo.replace(/,/g, ".");
  } else if (tienePunto) {
    // "1.234" en formato argentino son mil doscientos treinta y cuatro.
    const partes = crudo.split(".");
    const soloMiles = partes.length > 2 || (partes.length === 2 && partes[1].length === 3);
    if (soloMiles) crudo = partes.join("");
  }

  const numero = Number(crudo);
  if (!Number.isFinite(numero)) return 0;
  return negativo ? -numero : numero;
}

export function texto(valor: unknown): string {
  if (valor === null || valor === undefined) return "";
  return String(valor).trim();
}

/** Clave de mes "AAAA-MM" a partir de una fecha. */
export function claveMes(fecha: Date): string {
  return `${fecha.getUTCFullYear()}-${String(fecha.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Interpreta la columna MES de PRESUPUESTO en cualquiera de sus formas habituales. */
export function normalizarMes(valor: unknown, anioPorDefecto?: number): string | null {
  if (valor === null || valor === undefined || valor === "") return null;

  if (typeof valor === "number") {
    const fecha = parseFecha(valor);
    return fecha ? claveMes(fecha) : null;
  }

  const crudo = String(valor).trim();
  if (!crudo) return null;

  const yyyymm = crudo.match(/^(\d{4})[-/](\d{1,2})$/);
  if (yyyymm) return `${yyyymm[1]}-${String(Number(yyyymm[2])).padStart(2, "0")}`;

  const mmyyyy = crudo.match(/^(\d{1,2})[-/](\d{4})$/);
  if (mmyyyy) return `${mmyyyy[2]}-${String(Number(mmyyyy[1])).padStart(2, "0")}`;

  // "Enero 2026", "enero-2026", "Ene/26", o solo "Enero"
  const sinAcentos = crudo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const nombre = sinAcentos.match(/^([a-z]{3,})[\s\-/_]*(\d{2,4})?$/);
  if (nombre) {
    const prefijo = nombre[1].slice(0, 3);
    const indice = MESES_ES.findIndex((m) => m.startsWith(prefijo));
    if (indice >= 0) {
      let anio = nombre[2] ? Number(nombre[2]) : (anioPorDefecto ?? new Date().getUTCFullYear());
      if (anio < 100) anio += 2000;
      return `${anio}-${String(indice + 1).padStart(2, "0")}`;
    }
  }

  const fecha = parseFecha(crudo);
  return fecha ? claveMes(fecha) : null;
}

/** "2026-01" -> "Ene 2026" */
export function etiquetaMes(clave: string): string {
  const [anio, mes] = clave.split("-");
  const indice = Number(mes) - 1;
  if (indice < 0 || indice > 11) return clave;
  return `${MESES_CORTOS[indice]} ${anio}`;
}

/** Lista de meses "AAAA-MM" entre dos fechas, ambos extremos incluidos. */
export function mesesEntre(desde: Date, hasta: Date): string[] {
  const resultado: string[] = [];
  let anio = desde.getUTCFullYear();
  let mes = desde.getUTCMonth();
  const anioFin = hasta.getUTCFullYear();
  const mesFin = hasta.getUTCMonth();

  while (anio < anioFin || (anio === anioFin && mes <= mesFin)) {
    resultado.push(`${anio}-${String(mes + 1).padStart(2, "0")}`);
    mes += 1;
    if (mes > 11) {
      mes = 0;
      anio += 1;
    }
    if (resultado.length > 240) break; // red de seguridad
  }
  return resultado;
}
