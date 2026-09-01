import { redirect } from "next/navigation";

import { BannersEstado } from "@/components/banners";
import { EncabezadoPagina, Tarjeta } from "@/components/ui";
import { obtenerSesion } from "@/lib/auth";
import { config, ENCABEZADOS, hayCredencialesGoogle, HOJAS, modoDatos } from "@/lib/config";
import { obtenerDataset } from "@/lib/data";
import { numero } from "@/lib/format";
import { listarHojas } from "@/lib/sheets";

import { BotonPrepararHojas, GeneradorDeClave } from "./herramientas";

export const dynamic = "force-dynamic";

function Estado({ ok, texto }: { ok: boolean | null; texto: string }) {
  const estilo =
    ok === null ? "bg-lienzo text-tinta-suave" : ok ? "bg-ok-suave text-ok" : "bg-riesgo-suave text-riesgo";
  const punto = ok === null ? "bg-tinta-suave" : ok ? "bg-ok" : "bg-riesgo";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${estilo}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${punto}`} />
      {texto}
    </span>
  );
}

export default async function PaginaConfiguracion() {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");
  if (sesion.rol !== "gerente") redirect("/resumen");

  const dataset = await obtenerDataset();

  let hojasExistentes: string[] = [];
  let errorHojas: string | null = null;
  if (hayCredencialesGoogle) {
    try {
      hojasExistentes = await listarHojas();
    } catch (error) {
      errorHojas = error instanceof Error ? error.message : String(error);
    }
  }

  const variables: { nombre: string; presente: boolean; ayuda: string }[] = [
    {
      nombre: "GOOGLE_SHEET_ID",
      presente: Boolean(config.google.spreadsheetId),
      ayuda: "El código largo que aparece en el link de tu planilla.",
    },
    {
      nombre: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      presente: Boolean(config.google.email),
      ayuda: "El mail de la cuenta de servicio, termina en .iam.gserviceaccount.com",
    },
    {
      nombre: "GOOGLE_PRIVATE_KEY",
      presente: Boolean(config.google.privateKey),
      ayuda: "La clave privada del archivo JSON que descargaste de Google Cloud.",
    },
    {
      nombre: "AUTH_SECRET",
      presente: config.auth.secret !== "dev-secret-cambiar-en-produccion",
      ayuda: "Texto largo al azar que firma las sesiones. Obligatorio en producción.",
    },
  ];

  const conteos = [
    { hoja: HOJAS.ventas, cantidad: dataset.ventas.length },
    { hoja: HOJAS.asesores, cantidad: dataset.asesores.length },
    { hoja: HOJAS.presupuesto, cantidad: dataset.presupuesto.length },
    { hoja: HOJAS.bajas, cantidad: dataset.bajas.length },
    { hoja: HOJAS.prospectos, cantidad: dataset.prospectos.length },
    { hoja: HOJAS.planes, cantidad: dataset.planes.length },
  ];

  return (
    <>
      <EncabezadoPagina
        titulo="Configuración"
        descripcion="Estado de la conexión con Google Sheets y herramientas de administración."
      />

      <BannersEstado dataset={dataset} esGerente />

      <div className="grid gap-3 lg:grid-cols-2">
        <Tarjeta titulo="Conexión con Google Sheets" descripcion="Variables de entorno detectadas">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm">Modo actual:</span>
            <Estado
              ok={modoDatos === "sheets" && !dataset.error}
              texto={
                modoDatos === "demo"
                  ? "Demostración (datos de ejemplo)"
                  : dataset.error
                    ? "Con error de lectura"
                    : "Conectado a la planilla"
              }
            />
          </div>

          <ul className="space-y-3">
            {variables.map((variable) => (
              <li key={variable.nombre} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold">{variable.nombre}</p>
                  <p className="mt-0.5 text-xs text-tinta-suave">{variable.ayuda}</p>
                </div>
                <Estado ok={variable.presente} texto={variable.presente ? "Cargada" : "Falta"} />
              </li>
            ))}
          </ul>

          {config.google.email && (
            <div className="mt-4 rounded-lg bg-lienzo p-3 text-xs">
              <p className="mb-1 font-semibold">Compartí la planilla con esta cuenta:</p>
              <code className="block overflow-x-auto font-mono">{config.google.email}</code>
              <p className="mt-1 text-tinta-suave">Con permiso de <strong>Editor</strong>.</p>
            </div>
          )}

          {errorHojas && (
            <p className="mt-4 rounded-lg border border-riesgo/30 bg-riesgo-suave px-3 py-2 text-xs text-riesgo">
              {errorHojas}
            </p>
          )}
        </Tarjeta>

        <Tarjeta titulo="Hojas de la planilla" descripcion="Qué encontró la app y cuántas filas leyó">
          <ul className="space-y-2 text-sm">
            {Object.keys(ENCABEZADOS).map((hoja) => {
              const existe = hayCredencialesGoogle ? hojasExistentes.includes(hoja) : null;
              const conteo = conteos.find((c) => c.hoja === hoja);
              return (
                <li key={hoja} className="flex items-center justify-between gap-3 border-b border-borde/70 pb-2 last:border-0">
                  <span className="font-mono text-xs">{hoja}</span>
                  <span className="flex items-center gap-2">
                    {conteo && existe !== false && (
                      <span className="tabular text-xs text-tinta-suave">{numero(conteo.cantidad)} filas</span>
                    )}
                    <Estado
                      ok={existe}
                      texto={existe === null ? "Sin conectar" : existe ? "OK" : "No existe"}
                    />
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-borde pt-4">
            <p className="mb-3 text-xs text-tinta-suave">
              Si falta alguna hoja, la app puede crearla con los encabezados correctos sin tocar lo
              que ya tenés cargado.
            </p>
            <BotonPrepararHojas habilitado={hayCredencialesGoogle} />
          </div>
        </Tarjeta>

        <Tarjeta
          titulo="Crear la contraseña de un vendedor"
          descripcion="Las contraseñas se guardan encriptadas, nunca en texto plano"
        >
          <GeneradorDeClave />

          <div className="mt-5 rounded-lg bg-lienzo p-3 text-xs leading-relaxed text-tinta-suave">
            <p className="mb-1 font-semibold text-tinta">Cómo dar de alta un usuario</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>Generá el hash de la contraseña acá arriba y copialo.</li>
              <li>
                Abrí la hoja <strong>USUARIOS</strong> del Google Sheet y agregá una fila.
              </li>
              <li>
                Completá: ID_USUARIO, USUARIO (sin espacios), PASSWORD_HASH (lo que copiaste), ROL
                (<code>gerente</code> o <code>vendedor</code>), ASESOR (el nombre exacto de la hoja
                ASESORES) y ACTIVO (<code>SI</code>).
              </li>
              <li>Listo: esa persona ya puede entrar con su usuario y contraseña.</li>
            </ol>
          </div>
        </Tarjeta>

        <Tarjeta titulo="Cómo se actualizan los datos" descripcion="Frecuencia de lectura de la planilla">
          <ul className="space-y-2 text-sm text-tinta-suave">
            <li>
              · Los datos se releen de Google Sheets cada{" "}
              <strong className="text-tinta">{config.cacheSegundos} segundos</strong> (variable
              <code className="mx-1 font-mono text-xs">CACHE_SEGUNDOS</code>).
            </li>
            <li>
              · El botón <strong className="text-tinta">Actualizar datos</strong> de cada pantalla fuerza
              una lectura inmediata.
            </li>
            <li>
              · Todo lo que se carga desde la app se escribe en la planilla real en el momento.
            </li>
            <li>
              · Última lectura:{" "}
              <strong className="text-tinta">
                {new Date(dataset.actualizadoEn).toLocaleString("es-AR")}
              </strong>
              .
            </li>
          </ul>
        </Tarjeta>
      </div>
    </>
  );
}
