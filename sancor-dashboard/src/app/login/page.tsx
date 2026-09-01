import { redirect } from "next/navigation";

import { obtenerSesion } from "@/lib/auth";
import { modoDatos } from "@/lib/config";

import { FormularioLogin } from "./formulario-login";

export const dynamic = "force-dynamic";

export default async function PaginaLogin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sesion = await obtenerSesion();
  if (sesion) redirect("/resumen");

  const params = await searchParams;
  const volverCrudo = Array.isArray(params.volver) ? params.volver[0] : params.volver;
  // Sólo se aceptan rutas internas, para no poder redirigir a un sitio externo.
  const volver = volverCrudo && volverCrudo.startsWith("/") && !volverCrudo.startsWith("//")
    ? volverCrudo
    : "/resumen";

  return (
    <main className="flex min-h-screen items-center justify-center bg-marino-950 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-naranja-600 text-lg font-bold text-white">
            GZ
          </div>
          <h1 className="text-xl font-semibold text-white">Dashboard Comercial</h1>
          <p className="mt-1 text-sm text-marino-300">Gerencia Zonal · Sancor Salud</p>
        </div>

        <div className="tarjeta p-6">
          <FormularioLogin volver={volver} />
        </div>

        {modoDatos === "demo" && (
          <div className="mt-5 rounded-xl border border-marino-800 bg-marino-900/60 p-4 text-xs leading-relaxed text-marino-100">
            <p className="mb-2 font-semibold text-white">Modo demostración</p>
            <p>
              Todavía no hay credenciales de Google configuradas, así que la app usa datos de
              ejemplo. Podés entrar con:
            </p>
            <ul className="mt-2 space-y-0.5 font-mono">
              <li>gerente / demo1234 — vista de gerente</li>
              <li>paula / demo1234 — vista de vendedor</li>
            </ul>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-marino-300">
          Si olvidaste tu contraseña, pedísela a tu gerente zonal.
        </p>
      </div>
    </main>
  );
}
