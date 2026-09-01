import { NextResponse } from "next/server";

import { HOJAS } from "@/lib/config";
import { invalidarCache } from "@/lib/data";
import {
  aNumeroPositivo,
  prepararEscritura,
  recortar,
  resolverAsesor,
  validarFecha,
  zonaDeAsesor,
} from "@/lib/escritura";
import { agregarRegistro, siguienteId } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const preparado = await prepararEscritura();
  if (!preparado.ok) {
    return NextResponse.json({ error: preparado.error.mensaje }, { status: preparado.error.estado });
  }

  const { sesion, dataset } = preparado.contexto;
  const cuerpo = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const asesorResuelto = resolverAsesor(sesion, recortar(cuerpo.asesor, 80));
  if (!asesorResuelto.ok) {
    return NextResponse.json({ error: asesorResuelto.error.mensaje }, { status: asesorResuelto.error.estado });
  }

  const fecha = validarFecha(cuerpo.fecha);
  if (!fecha) return NextResponse.json({ error: "La fecha no es válida." }, { status: 400 });

  const motivo = recortar(cuerpo.motivo, 200);
  if (!motivo) return NextResponse.json({ error: "Indicá el motivo de la baja." }, { status: 400 });

  const asesor = asesorResuelto.asesor;

  try {
    await agregarRegistro(HOJAS.bajas, {
      ID_BAJA: siguienteId("B", dataset.bajas.map((b) => b.id)),
      FECHA: fecha,
      ASESOR: asesor,
      ZONA: recortar(cuerpo.zona, 60) || zonaDeAsesor(dataset, asesor),
      PRODUCTO: recortar(cuerpo.producto, 80),
      CANTIDAD: Math.max(1, Math.round(aNumeroPositivo(cuerpo.cantidad, 1))),
      IMPORTE: aNumeroPositivo(cuerpo.importe, 0),
      MOTIVO: motivo,
    });

    invalidarCache();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudo guardar la baja.";
    return NextResponse.json({ error: mensaje }, { status: 502 });
  }
}
