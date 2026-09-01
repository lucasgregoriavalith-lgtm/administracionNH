export type Rol = "gerente" | "vendedor";

export type Usuario = {
  id: string;
  usuario: string;
  passwordHash: string;
  rol: Rol;
  /** Nombre del asesor en la hoja ASESORES. Vacío para el gerente. */
  asesor: string;
  activo: boolean;
};

export type Sesion = {
  usuario: string;
  nombre: string;
  rol: Rol;
  asesor: string;
};

export type Venta = {
  id: string;
  fecha: Date | null;
  asesor: string;
  zona: string;
  producto: string;
  tipoOperacion: string;
  cantidad: number;
  facturacion: number;
  cliente: string;
  observaciones: string;
};

export type Asesor = {
  id: string;
  nombre: string;
  zona: string;
};

export type Plan = {
  id: string;
  producto: string;
};

export type Presupuesto = {
  /** Mes normalizado como "YYYY-MM". */
  mes: string;
  asesor: string;
  zona: string;
  objetivoVentas: number;
  objetivoFacturacion: number;
};

export type Baja = {
  id: string;
  fecha: Date | null;
  asesor: string;
  zona: string;
  producto: string;
  cantidad: number;
  importe: number;
  motivo: string;
};

export type Prospecto = {
  /** Número de fila en el Sheet, necesario para poder editarla. */
  fila: number;
  id: string;
  fechaContacto: Date | null;
  asesor: string;
  zona: string;
  nombre: string;
  contacto: string;
  productoInteres: string;
  estado: string;
  observaciones: string;
};

export type Dataset = {
  ventas: Venta[];
  asesores: Asesor[];
  planes: Plan[];
  presupuesto: Presupuesto[];
  bajas: Baja[];
  prospectos: Prospecto[];
  /** Listas para los selectores, derivadas de los datos + TABLAS_AUXILIARES. */
  zonas: string[];
  productos: string[];
  motivosBaja: string[];
  origen: "sheets" | "demo";
  actualizadoEn: string;
  /** Mensajes informativos (hojas faltantes, columnas vacías, etc.). */
  avisos: string[];
  /** Mensaje de error si no se pudo leer el Google Sheet. */
  error: string | null;
};
