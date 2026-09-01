import type { Dataset } from "@/lib/types";

import { Aviso } from "./ui";

/** Mensajes de estado sobre la conexión con el Google Sheet. */
export function BannersEstado({ dataset, esGerente }: { dataset: Dataset; esGerente: boolean }) {
  return (
    <>
      {dataset.error && (
        <Aviso tono="error" titulo="No se pudieron leer los datos del Google Sheet">
          <p>{dataset.error}</p>
          {esGerente && (
            <p className="mt-1">
              Revisá las variables de entorno en la pantalla de <a href="/configuracion">Configuración</a>.
            </p>
          )}
        </Aviso>
      )}

      {dataset.origen === "demo" && (
        <Aviso tono="alerta" titulo="Modo demostración">
          Los números que ves son datos de ejemplo. Para conectar tu planilla real, cargá las
          credenciales de Google (ver <code className="font-mono">GUIA-DE-CONFIGURACION.md</code>).
        </Aviso>
      )}

      {esGerente &&
        dataset.avisos.map((aviso) => (
          <Aviso key={aviso} tono="info">
            {aviso}
          </Aviso>
        ))}
    </>
  );
}
