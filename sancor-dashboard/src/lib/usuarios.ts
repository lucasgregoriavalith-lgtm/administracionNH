import bcrypt from "bcryptjs";

import { config, HOJAS, modoDatos } from "./config";
import { texto } from "./parse";
import { leerHojas } from "./sheets";
import type { Rol, Sesion, Usuario } from "./types";

/**
 * Usuarios de ejemplo del modo demo. La contraseña de todos es "demo1234".
 * En modo real los usuarios salen de la hoja USUARIOS del Google Sheet.
 */
const HASH_DEMO = "$2b$10$Dq7BZBwIOOaHc.9JnXVLBOrQc7uz7nD6zwjs0bj7zq4bxEHSK4zCu";

export const USUARIOS_DEMO: Usuario[] = [
  { id: "U1", usuario: "gerente", passwordHash: HASH_DEMO, rol: "gerente", asesor: "", activo: true },
  { id: "U2", usuario: "paula", passwordHash: HASH_DEMO, rol: "vendedor", asesor: "Paula", activo: true },
  { id: "U3", usuario: "nicanor", passwordHash: HASH_DEMO, rol: "vendedor", asesor: "Nicanor", activo: true },
  { id: "U4", usuario: "adrian", passwordHash: HASH_DEMO, rol: "vendedor", asesor: "Adrian", activo: true },
  { id: "U5", usuario: "antonia", passwordHash: HASH_DEMO, rol: "vendedor", asesor: "Antonia", activo: true },
];

function normalizarRol(valor: string): Rol {
  return texto(valor).toLowerCase().startsWith("ger") ? "gerente" : "vendedor";
}

function esActivo(valor: unknown): boolean {
  const t = texto(valor).toUpperCase();
  if (!t) return true; // por defecto, un usuario cargado está activo
  return !["NO", "FALSE", "0", "INACTIVO", "BAJA"].includes(t);
}

/** Usuario configurado por variables de entorno, para poder entrar la primera vez. */
function usuarioAdminDeEntorno(): Usuario | null {
  if (!config.auth.adminUsuario || !config.auth.adminPasswordHash) return null;
  return {
    id: "ENV",
    usuario: config.auth.adminUsuario,
    passwordHash: config.auth.adminPasswordHash,
    rol: "gerente",
    asesor: "",
    activo: true,
  };
}

export async function listarUsuarios(): Promise<Usuario[]> {
  if (modoDatos === "demo") return USUARIOS_DEMO;

  const admin = usuarioAdminDeEntorno();
  let deLaHoja: Usuario[] = [];

  try {
    const { datos } = await leerHojas([HOJAS.usuarios]);
    deLaHoja = (datos[HOJAS.usuarios] ?? [])
      .map((fila) => ({
        id: texto(fila.ID_USUARIO),
        usuario: texto(fila.USUARIO).toLowerCase(),
        passwordHash: texto(fila.PASSWORD_HASH),
        rol: normalizarRol(texto(fila.ROL)),
        asesor: texto(fila.ASESOR),
        activo: esActivo(fila.ACTIVO),
      }))
      .filter((u) => u.usuario && u.passwordHash);
  } catch {
    // Si la planilla no se puede leer, al menos queda el admin de entorno para entrar.
    deLaHoja = [];
  }

  const combinados = [...deLaHoja];
  if (admin && !combinados.some((u) => u.usuario === admin.usuario)) combinados.push(admin);
  return combinados;
}

export type ResultadoLogin =
  | { ok: true; sesion: Sesion }
  | { ok: false; motivo: string };

export async function verificarCredenciales(
  usuarioIngresado: string,
  password: string,
): Promise<ResultadoLogin> {
  const clave = texto(usuarioIngresado).toLowerCase();
  if (!clave || !password) return { ok: false, motivo: "Ingresá tu usuario y contraseña." };

  const usuarios = await listarUsuarios();

  if (usuarios.length === 0) {
    return {
      ok: false,
      motivo:
        "No hay usuarios cargados. Completá la hoja USUARIOS del Google Sheet o definí " +
        "ADMIN_USUARIO y ADMIN_PASSWORD_HASH en las variables de entorno.",
    };
  }

  const encontrado = usuarios.find((u) => u.usuario === clave);

  if (!encontrado) {
    // Comparación falsa para que responder tarde lo mismo con usuario válido o inválido.
    await bcrypt.compare(password, HASH_DEMO);
    return { ok: false, motivo: "Usuario o contraseña incorrectos." };
  }

  if (!encontrado.activo) return { ok: false, motivo: "El usuario está dado de baja." };

  let coincide = false;
  try {
    coincide = await bcrypt.compare(password, encontrado.passwordHash);
  } catch {
    return {
      ok: false,
      motivo: "La contraseña guardada para este usuario no es un hash válido. Regenerala con: npm run clave.",
    };
  }

  if (!coincide) return { ok: false, motivo: "Usuario o contraseña incorrectos." };

  if (encontrado.rol === "vendedor" && !encontrado.asesor) {
    return {
      ok: false,
      motivo: "El usuario no tiene asignado un asesor en la columna ASESOR de la hoja USUARIOS.",
    };
  }

  return {
    ok: true,
    sesion: {
      usuario: encontrado.usuario,
      nombre: encontrado.asesor || config.auth.adminNombre,
      rol: encontrado.rol,
      asesor: encontrado.asesor,
    },
  };
}
