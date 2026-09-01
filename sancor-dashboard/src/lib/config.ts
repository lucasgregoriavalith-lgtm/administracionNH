/**
 * Configuración central leída de variables de entorno.
 *
 * La app funciona en dos modos:
 *  - "sheets": hay credenciales de Google -> los datos salen del Google Sheet real.
 *  - "demo":   faltan credenciales -> se usan datos de ejemplo para poder navegar la app.
 */

function limpiar(valor: string | undefined): string {
  return (valor ?? "").trim();
}

/** Las private keys de Google traen "\n" escapados cuando viajan en una variable de entorno. */
function normalizarClave(valor: string): string {
  const sinComillas = valor.replace(/^"(.*)"$/s, "$1");
  return sinComillas.replace(/\\n/g, "\n");
}

export const config = {
  google: {
    email: limpiar(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
    privateKey: normalizarClave(limpiar(process.env.GOOGLE_PRIVATE_KEY)),
    spreadsheetId: limpiar(process.env.GOOGLE_SHEET_ID),
  },
  auth: {
    secret: limpiar(process.env.AUTH_SECRET) || "dev-secret-cambiar-en-produccion",
    /** Usuario gerente de arranque, para poder entrar antes de cargar la hoja USUARIOS. */
    adminUsuario: limpiar(process.env.ADMIN_USUARIO).toLowerCase(),
    adminPasswordHash: limpiar(process.env.ADMIN_PASSWORD_HASH),
    adminNombre: limpiar(process.env.ADMIN_NOMBRE) || "Gerencia Zonal",
  },
  /** Segundos que se cachean los datos del Sheet antes de volver a pedirlos. */
  cacheSegundos: Number(limpiar(process.env.CACHE_SEGUNDOS) || "60"),
} as const;

export const hayCredencialesGoogle: boolean = Boolean(
  config.google.email && config.google.privateKey && config.google.spreadsheetId,
);

export const modoDatos: "sheets" | "demo" = hayCredencialesGoogle ? "sheets" : "demo";

/** Nombres de las hojas dentro del Google Sheet. */
export const HOJAS = {
  ventas: "BASE_VENTAS",
  asesores: "ASESORES",
  planes: "PLANES",
  presupuesto: "PRESUPUESTO",
  bajas: "BAJAS",
  auxiliares: "TABLAS_AUXILIARES",
  prospectos: "PROSPECTOS",
  usuarios: "USUARIOS",
} as const;

/** Encabezados esperados por hoja (se usan para crearlas y para validar). */
export const ENCABEZADOS: Record<string, string[]> = {
  [HOJAS.ventas]: [
    "ID_VENTA", "FECHA", "ASESOR", "ZONA", "PRODUCTO", "TIPO_OPERACION",
    "CANTIDAD", "FACTURACION", "CLIENTE", "OBSERVACIONES",
  ],
  [HOJAS.asesores]: ["ID_ASESOR", "ASESOR", "ZONA"],
  [HOJAS.planes]: ["ID_PLAN", "PRODUCTO"],
  [HOJAS.presupuesto]: ["MES", "ASESOR", "ZONA", "OBJETIVO_VENTAS", "OBJETIVO_FACTURACION"],
  [HOJAS.bajas]: ["ID_BAJA", "FECHA", "ASESOR", "ZONA", "PRODUCTO", "CANTIDAD", "IMPORTE", "MOTIVO"],
  [HOJAS.auxiliares]: ["ASESORES", "ZONAS", "PRODUCTOS", "TIPOS_OPERACION", "MESES", "ESTADOS_PROSPECTO", "MOTIVOS_BAJA"],
  [HOJAS.prospectos]: [
    "ID_PROSPECTO", "FECHA_CONTACTO", "ASESOR", "ZONA", "NOMBRE", "CONTACTO",
    "PRODUCTO_INTERES", "ESTADO", "OBSERVACIONES",
  ],
  [HOJAS.usuarios]: ["ID_USUARIO", "USUARIO", "PASSWORD_HASH", "ROL", "ASESOR", "ACTIVO"],
};

export const ESTADOS_PROSPECTO = ["Nuevo", "Contactado", "Cotizado", "Ganado", "Perdido"] as const;
export type EstadoProspecto = (typeof ESTADOS_PROSPECTO)[number];
