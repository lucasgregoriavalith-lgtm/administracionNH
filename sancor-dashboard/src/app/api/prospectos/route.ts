import { NextResponse } from "next/server";

import { ESTADOS_PROSPECTO, HOJAS } from "@/lib/config";
import { invalidarCache } from "@/lib/data";
import {
  prepararEscritura,
  recortar,
  resolverAsesor,
  validarFecha,
  zonaDeAsesor,
} from "@/lib/escritura";
import { actualizarRegistro, agregarRegistro, siguienteId } from "@/lib/sheets";

export const runtime = "nodejs";

function estadoValido(valor: unknown): string | null {
  const texto = recortar(valor, 40);
  const encontrado = ESTADOS_PROSPECTO.find((e) => e.toLowerCase() === texto.toLowerCase());
  return encontrado ?? null;
}

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

  const nombre = recortar(cuerpo.nombre, 120);
  if (!nombre) return NextResponse.json({ error: "Ingresá el nombre del prospecto." }, { status: 400 });

  const fecha = validarFecha(cuerpo.fechaContacto) ?? new Date().toISOString().slice(0, 10);
  const estado = estadoValido(cuerpo.estado) ?? "Nuevo";
  const asesor = asesorResuelto.asesor;

  try {
    await agregarRegistro(HOJAS.prospectos, {
      ID_PROSPECTO: siguienteId("P", dataset.prospectos.map((p) => p.id), 4),
      FECHA_CONTACTO: fecha,
      ASESOR: asesor,
      ZONA: recortar(cuerpo.zona, 60) || zonaDeAsesor(dataset, asesor),
      NOMBRE: nombre,
      CONTACTO: recortar(cuerpo.contacto, 120),
      PRODUCTO_INTERES: recortar(cuerpo.productoInteres, 80),
      ESTADO: estado,
      OBSERVACIONES: recortar(cuerpo.observaciones, 500),
    });

    invalidarCache();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudo guardar el prospecto.";
    return NextResponse.json({ error: mensaje }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  const preparado = await prepararEscritura();
  if (!preparado.ok) {
    return NextResponse.json({ error: preparado.error.mensaje }, { status: preparado.error.estado });
  }

  const { sesion, dataset } = preparado.contexto;
  const cuerpo = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const fila = Number(cuerpo.fila);
  if (!Number.isInteger(fila) || fila < 2) {
    return NextResponse.json({ error: "No se identificó la fila del prospecto." }, { status: 400 });
  }

  const prospecto = dataset.prospectos.find((p) => p.fila === fila);
  if (!prospecto) {
    return NextResponse.json({ error: "El prospecto ya no existe en la planilla." }, { status: 404 });
  }

  // Un vendedor sólo puede tocar sus propios prospectos.
  if (
    sesion.rol === "vendedor" &&
    prospecto.asesor.trim().toLowerCase() !== sesion.asesor.trim().toLowerCase()
  ) {
    return NextResponse.json({ error: "Sólo podés editar tus propios prospectos." }, { status: 403 });
  }

  const estado = estadoValido(cuerpo.estado);
  if (!estado) return NextResponse.json({ error: "Estado inválido." }, { status: 400 });

  const cambios: Record<string, string> = { ESTADO: estado };
  if (typeof cuerpo.observaciones === "string") {
    cambios.OBSERVACIONES = recortar(cuerpo.observaciones, 500);
  }

  try {
    await actualizarRegistro(HOJAS.prospectos, fila, cambios);
    invalidarCache();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "No se pudo actualizar el prospecto.";
    return NextResponse.json({ error: mensaje }, { status: 502 });
  }
}
