"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { Sesion } from "@/lib/types";

import {
  IconoBajas,
  IconoCargar,
  IconoCerrar,
  IconoConfiguracion,
  IconoEvolucion,
  IconoMenu,
  IconoObjetivo,
  IconoProspectos,
  IconoRanking,
  IconoResumen,
  IconoSalir,
} from "./iconos";

type ItemNav = {
  href: string;
  etiqueta: string;
  icono: (props: { className?: string }) => React.ReactElement;
  soloGerente?: boolean;
};

const NAVEGACION: ItemNav[] = [
  { href: "/resumen", etiqueta: "Resumen", icono: IconoResumen },
  { href: "/objetivos", etiqueta: "Cumplimiento", icono: IconoObjetivo },
  { href: "/evolucion", etiqueta: "Evolución", icono: IconoEvolucion },
  { href: "/ranking", etiqueta: "Ranking", icono: IconoRanking, soloGerente: true },
  { href: "/bajas", etiqueta: "Bajas", icono: IconoBajas },
  { href: "/prospectos", etiqueta: "Prospectos", icono: IconoProspectos },
  { href: "/cargar", etiqueta: "Cargar datos", icono: IconoCargar },
  { href: "/configuracion", etiqueta: "Configuración", icono: IconoConfiguracion, soloGerente: true },
];

export function Shell({ sesion, children }: { sesion: Sesion; children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [saliendo, setSaliendo] = useState(false);

  // Al navegar, el menú lateral del celular se cierra solo.
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  const consulta = searchParams.toString();
  const items = NAVEGACION.filter((item) => !item.soloGerente || sesion.rol === "gerente");

  async function salir() {
    setSaliendo(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  const iniciales = (sesion.nombre || sesion.usuario)
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");

  const lateral = (
    <div className="flex h-full flex-col bg-marino-900 text-marino-100">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-naranja-600 text-sm font-bold text-white">
          GZ
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Dashboard Comercial</p>
          <p className="text-[11px] text-marino-300">Gerencia Zonal</p>
        </div>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="ml-auto rounded-md p-1 text-marino-300 hover:bg-marino-800 hover:text-white lg:hidden"
          aria-label="Cerrar menú"
        >
          <IconoCerrar />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {items.map((item) => {
          const activo = pathname === item.href;
          const Icono = item.icono;
          return (
            <Link
              key={item.href}
              href={consulta ? `${item.href}?${consulta}` : item.href}
              aria-current={activo ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                activo
                  ? "bg-marino-700 font-semibold text-white"
                  : "text-marino-100 hover:bg-marino-800 hover:text-white"
              }`}
            >
              <Icono />
              {item.etiqueta}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-marino-800 px-4 py-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-marino-700 text-xs font-semibold text-white">
            {iniciales || "US"}
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium text-white">{sesion.nombre}</p>
            <p className="text-[11px] capitalize text-marino-300">
              {sesion.rol === "gerente" ? "Gerente zonal" : `Asesor · ${sesion.asesor}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={salir}
          disabled={saliendo}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-marino-100 transition-colors hover:bg-marino-800 hover:text-white disabled:opacity-60"
        >
          <IconoSalir />
          {saliendo ? "Saliendo…" : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-60">{lateral}</div>
      </aside>

      {abierto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-marino-950/60"
            onClick={() => setAbierto(false)}
          />
          <div className="relative h-full w-64 max-w-[80vw] shadow-xl">{lateral}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-borde bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="rounded-md p-1.5 text-tinta hover:bg-lienzo"
            aria-label="Abrir menú"
          >
            <IconoMenu />
          </button>
          <span className="text-sm font-semibold">Dashboard Comercial</span>
          <span className="ml-auto text-xs text-tinta-suave">{sesion.nombre}</span>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
