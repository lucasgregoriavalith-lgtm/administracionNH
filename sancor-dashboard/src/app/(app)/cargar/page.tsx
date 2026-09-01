import { BannersEstado } from "@/components/banners";
import { EncabezadoPagina, Aviso } from "@/components/ui";
import { modoDatos } from "@/lib/config";
import type { ParametrosBusqueda } from "@/lib/filtros";
import { contextoPagina } from "@/lib/pagina";

import { PanelCarga } from "./panel-carga";

export const dynamic = "force-dynamic";

export default async function PaginaCargar({
  searchParams,
}: {
  searchParams: Promise<ParametrosBusqueda>;
}) {
  const { sesion, dataset, asesoresDisponibles } = await contextoPagina(searchParams);
  const esGerente = sesion.rol === "gerente";

  return (
    <>
      <EncabezadoPagina
        titulo="Cargar datos"
        descripcion="Lo que cargues acá se escribe directamente en el Google Sheet."
      />

      <BannersEstado dataset={dataset} esGerente={esGerente} />

      {modoDatos === "demo" && (
        <Aviso tono="alerta" titulo="No se puede guardar todavía">
          En modo demostración los formularios no escriben en ninguna planilla. Configurá las
          credenciales de Google para habilitar la carga.
        </Aviso>
      )}

      <div className="max-w-3xl">
        <PanelCarga
          esGerente={esGerente}
          asesores={asesoresDisponibles}
          asesorPropio={sesion.asesor}
          productos={dataset.productos}
          motivos={dataset.motivosBaja}
        />
      </div>
    </>
  );
}
