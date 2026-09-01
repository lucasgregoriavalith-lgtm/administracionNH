import { config, ENCABEZADOS } from "./config";
import { obtenerAccessToken } from "./google-auth";

const API = "https://sheets.googleapis.com/v4/spreadsheets";

/** Una fila leída del Sheet, indexada por encabezado + el número de fila real (1-based). */
export type FilaSheet = {
  _fila: number;
  [columna: string]: string | number | boolean | null | undefined;
};

async function pedir<T>(url: string, init?: RequestInit): Promise<T> {
  const token = await obtenerAccessToken();
  const respuesta = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    if (respuesta.status === 403) {
      throw new Error(
        `Google denegó el acceso al Sheet. Verificá que compartiste la planilla con ${config.google.email} como Editor. Detalle: ${detalle}`,
      );
    }
    if (respuesta.status === 404) {
      throw new Error(
        `No se encontró la planilla (GOOGLE_SHEET_ID = "${config.google.spreadsheetId}"). Detalle: ${detalle}`,
      );
    }
    throw new Error(`Error de Google Sheets (${respuesta.status}): ${detalle}`);
  }

  return (await respuesta.json()) as T;
}

function rango(hoja: string): string {
  return encodeURIComponent(`${hoja}!A1:ZZ`);
}

/** Convierte la matriz cruda de valores en objetos indexados por encabezado. */
function aFilas(valores: unknown[][] | undefined): FilaSheet[] {
  if (!valores || valores.length === 0) return [];

  const encabezados = (valores[0] ?? []).map((c) => String(c ?? "").trim().toUpperCase());

  return valores.slice(1).flatMap((fila, indice) => {
    const vacia = fila.every((celda) => celda === "" || celda === null || celda === undefined);
    if (vacia) return [];

    const objeto: FilaSheet = { _fila: indice + 2 };
    encabezados.forEach((encabezado, columna) => {
      if (!encabezado) return;
      objeto[encabezado] = (fila[columna] ?? "") as string | number;
    });
    return [objeto];
  });
}

/**
 * Lee varias hojas de una sola vez.
 * Las hojas inexistentes se devuelven como array vacío en lugar de romper la app.
 */
export async function leerHojas(
  hojas: string[],
): Promise<{ datos: Record<string, FilaSheet[]>; faltantes: string[] }> {
  const existentes = await listarHojas();
  const aLeer = hojas.filter((h) => existentes.includes(h));
  const faltantes = hojas.filter((h) => !existentes.includes(h));

  const datos: Record<string, FilaSheet[]> = {};
  hojas.forEach((h) => (datos[h] = []));

  if (aLeer.length > 0) {
    const params = aLeer.map((h) => `ranges=${rango(h)}`).join("&");
    const url =
      `${API}/${config.google.spreadsheetId}/values:batchGet?${params}` +
      `&valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`;

    const respuesta = await pedir<{ valueRanges: { values?: unknown[][] }[] }>(url);
    respuesta.valueRanges.forEach((valueRange, indice) => {
      datos[aLeer[indice]] = aFilas(valueRange.values);
    });
  }

  return { datos, faltantes };
}

/** Nombres de todas las pestañas del Sheet. */
export async function listarHojas(): Promise<string[]> {
  const url = `${API}/${config.google.spreadsheetId}?fields=sheets.properties.title`;
  const respuesta = await pedir<{ sheets: { properties: { title: string } }[] }>(url);
  return respuesta.sheets.map((s) => s.properties.title);
}

/** Agrega una fila al final de una hoja. */
export async function agregarFila(hoja: string, valores: (string | number)[]): Promise<void> {
  const url =
    `${API}/${config.google.spreadsheetId}/values/${rango(hoja)}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  await pedir(url, { method: "POST", body: JSON.stringify({ values: [valores] }) });
}

/** Reemplaza el contenido completo de una fila existente. */
export async function actualizarFila(
  hoja: string,
  fila: number,
  valores: (string | number)[],
): Promise<void> {
  const columnaFinal = letraColumna(valores.length);
  const destino = encodeURIComponent(`${hoja}!A${fila}:${columnaFinal}${fila}`);
  const url = `${API}/${config.google.spreadsheetId}/values/${destino}?valueInputOption=USER_ENTERED`;

  await pedir(url, { method: "PUT", body: JSON.stringify({ values: [valores] }) });
}

function letraColumna(numero: number): string {
  let resultado = "";
  let n = numero;
  while (n > 0) {
    const resto = (n - 1) % 26;
    resultado = String.fromCharCode(65 + resto) + resultado;
    n = Math.floor((n - 1) / 26);
  }
  return resultado || "A";
}

/**
 * Crea las hojas que falten y escribe los encabezados en las que estén vacías.
 * Devuelve un resumen legible de lo que hizo.
 */
export async function prepararHojas(): Promise<string[]> {
  const acciones: string[] = [];
  const existentes = await listarHojas();
  const necesarias = Object.keys(ENCABEZADOS);
  const faltantes = necesarias.filter((h) => !existentes.includes(h));

  if (faltantes.length > 0) {
    const url = `${API}/${config.google.spreadsheetId}:batchUpdate`;
    await pedir(url, {
      method: "POST",
      body: JSON.stringify({
        requests: faltantes.map((title) => ({ addSheet: { properties: { title } } })),
      }),
    });
    faltantes.forEach((h) => acciones.push(`Se creó la hoja ${h}.`));
  }

  const { datos } = await leerHojas(necesarias);
  for (const hoja of necesarias) {
    const yaCreada = faltantes.includes(hoja);
    const tieneDatos = (datos[hoja] ?? []).length > 0;
    if (yaCreada || !tieneDatos) {
      const encabezados = ENCABEZADOS[hoja];
      const destino = encodeURIComponent(`${hoja}!A1:${letraColumna(encabezados.length)}1`);
      const url = `${API}/${config.google.spreadsheetId}/values/${destino}?valueInputOption=RAW`;
      await pedir(url, { method: "PUT", body: JSON.stringify({ values: [encabezados] }) });
      if (!yaCreada) acciones.push(`Se escribieron los encabezados de ${hoja}.`);
    }
  }

  if (acciones.length === 0) acciones.push("Todas las hojas ya estaban creadas correctamente.");
  return acciones;
}

/** Encabezados (fila 1) de una hoja, en mayúsculas. */
export async function leerEncabezados(hoja: string): Promise<string[]> {
  const destino = encodeURIComponent(`${hoja}!A1:ZZ1`);
  const url = `${API}/${config.google.spreadsheetId}/values/${destino}`;
  const respuesta = await pedir<{ values?: unknown[][] }>(url);
  return (respuesta.values?.[0] ?? []).map((c) => String(c ?? "").trim().toUpperCase());
}

type Registro = Record<string, string | number>;

/**
 * Agrega una fila respetando el orden real de las columnas de la hoja,
 * para que siga funcionando aunque el usuario mueva o agregue columnas.
 */
export async function agregarRegistro(hoja: string, registro: Registro): Promise<void> {
  const encabezados = await leerEncabezados(hoja);
  if (encabezados.length === 0) {
    throw new Error(
      `La hoja ${hoja} no tiene encabezados. Creála desde la pantalla de Configuración.`,
    );
  }

  const valores = encabezados.map((encabezado) => registro[encabezado] ?? "");
  await agregarFila(hoja, valores);
}

/** Modifica sólo las columnas indicadas de una fila existente. */
export async function actualizarRegistro(
  hoja: string,
  fila: number,
  cambios: Registro,
): Promise<void> {
  const encabezados = await leerEncabezados(hoja);
  const data = Object.entries(cambios).flatMap(([columna, valor]) => {
    const indice = encabezados.indexOf(columna.toUpperCase());
    if (indice < 0) return [];
    return [{ range: `${hoja}!${letraColumna(indice + 1)}${fila}`, values: [[valor]] }];
  });

  if (data.length === 0) return;

  const url = `${API}/${config.google.spreadsheetId}/values:batchUpdate`;
  await pedir(url, {
    method: "POST",
    body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
  });
}

/** Siguiente identificador correlativo del estilo V00001 / P0007. */
export function siguienteId(prefijo: string, existentes: string[], largo = 5): string {
  const numeros = existentes
    .map((id) => Number(String(id).replace(/\D/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  const proximo = (numeros.length > 0 ? Math.max(...numeros) : 0) + 1;
  return `${prefijo}${String(proximo).padStart(largo, "0")}`;
}
