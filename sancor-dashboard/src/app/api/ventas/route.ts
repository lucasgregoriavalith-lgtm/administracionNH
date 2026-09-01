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

  const producto = recortar(cuerpo.producto, 80);
  if (!producto) return NextResponse.json({ error: "Elegí un producto." }, { status: 400 });

  const cantidad = Math.max(1, Math.round(aNumeroPositivo(cuerpo.cantidad, 1)));
  const facturacion = aNumeroPositivo(cuerpo.facturacion, 0);

  const asesor = asesorResuelto.asesor;
  const zona = recortar(cuerpo.zona, 60) || zonaDeAsesor(dataset, asesor);

  try {
    await agregarRegistro(HOJAS.ventas, {
      ID_VENTA: siguienteId("V", dataset.ventas.map((v) => v.id)),
      FECHA: fecha,
      ASESOR: asesor,
      ZONA: zona,
      PRODUCTO: producto,
      TIPO_OPERACION: "ALTA",
      CANTIDAD: cantidad,
      FACTURACION: facturacion,
      CLIENTE: recortar(cuerpo.cliente, 120),
      OBSERVACIONES: recortar(cuerpo.observaciones, 500),
    });

    invalidarCache();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudo guardar la venta.";
    return NextResponse.json({ error: mensaje }, { status: 502 });
  }
}
