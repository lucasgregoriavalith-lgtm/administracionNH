import { moneda, numero } from "@/lib/format";
import type { FilaCumplimiento } from "@/lib/metricas";

import { BarraProgreso, Semaforo, SinDatos } from "./ui";

export function TablaCumplimiento({
  filas,
  etiquetaColumna,
  mostrarZona = true,
}: {
  filas: FilaCumplimiento[];
  etiquetaColumna: string;
  mostrarZona?: boolean;
}) {
  if (filas.length === 0) return <SinDatos />;

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-tinta-suave">
            <th className="py-2 pr-3 font-semibold">{etiquetaColumna}</th>
            {mostrarZona && <th className="py-2 pr-3 font-semibold">Zona</th>}
            <th className="py-2 pr-3 text-right font-semibold">Obj. ventas</th>
            <th className="py-2 pr-3 text-right font-semibold">Ventas</th>
            <th className="py-2 pr-3 font-semibold">Cumpl. ventas</th>
            <th className="py-2 pr-3 text-right font-semibold">Obj. facturación</th>
            <th className="py-2 pr-3 text-right font-semibold">Facturación</th>
            <th className="py-2 pr-3 font-semibold">Cumpl. facturación</th>
            <th className="py-2 pr-3 text-right font-semibold">Bajas</th>
            <th className="py-2 text-right font-semibold">Neto</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.clave} className="border-b border-borde/70 last:border-0">
              <td className="py-3 pr-3 font-medium">{fila.clave}</td>
              {mostrarZona && <td className="py-3 pr-3 text-tinta-suave">{fila.zona || "—"}</td>}
              <td className="tabular py-3 pr-3 text-right text-tinta-suave">
                {fila.objetivoVentas ? numero(fila.objetivoVentas) : "—"}
              </td>
              <td className="tabular py-3 pr-3 text-right font-semibold">{numero(fila.realVentas)}</td>
              <td className="w-32 py-3 pr-3">
                <Semaforo valor={fila.cumplimientoVentas} hayObjetivo={fila.objetivoVentas > 0} />
                <div className="mt-1.5">
                  <BarraProgreso valor={fila.cumplimientoVentas} hayObjetivo={fila.objetivoVentas > 0} />
                </div>
              </td>
              <td className="tabular py-3 pr-3 text-right text-tinta-suave">
                {fila.objetivoFacturacion ? moneda(fila.objetivoFacturacion) : "—"}
              </td>
              <td className="tabular py-3 pr-3 text-right font-semibold">{moneda(fila.realFacturacion)}</td>
              <td className="w-32 py-3 pr-3">
                <Semaforo
                  valor={fila.cumplimientoFacturacion}
                  hayObjetivo={fila.objetivoFacturacion > 0}
                />
                <div className="mt-1.5">
                  <BarraProgreso
                    valor={fila.cumplimientoFacturacion}
                    hayObjetivo={fila.objetivoFacturacion > 0}
                  />
                </div>
              </td>
              <td className="tabular py-3 pr-3 text-right">{numero(fila.bajas)}</td>
              <td className="tabular py-3 text-right font-semibold">{numero(fila.ventaNeta)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
