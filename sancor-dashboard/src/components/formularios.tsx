"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ESTADOS_PROSPECTO } from "@/lib/config";

function hoyISO(): string {
  const ahora = new Date();
  const desplazado = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000);
  return desplazado.toISOString().slice(0, 10);
}

type EstadoEnvio = { tipo: "ok" | "error"; mensaje: string } | null;

function useEnvio(url: string, metodo: "POST" | "PATCH" = "POST") {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState<EstadoEnvio>(null);

  async function enviar(datos: Record<string, unknown>, mensajeOk: string): Promise<boolean> {
    setEnviando(true);
    setEstado(null);

    try {
      const respuesta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setEstado({ tipo: "error", mensaje: cuerpo.error ?? "No se pudo guardar." });
        return false;
      }

      setEstado({ tipo: "ok", mensaje: mensajeOk });
      router.refresh();
      return true;
    } catch {
      setEstado({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
      return false;
    } finally {
      setEnviando(false);
    }
  }

  return { enviar, enviando, estado, setEstado };
}

function Mensaje({ estado }: { estado: EstadoEnvio }) {
  if (!estado) return null;
  const estilos =
    estado.tipo === "ok"
      ? "border-ok/30 bg-ok-suave text-ok"
      : "border-riesgo/30 bg-riesgo-suave text-riesgo";
  return (
    <p role="status" className={`rounded-lg border px-3 py-2 text-sm ${estilos}`}>
      {estado.mensaje}
    </p>
  );
}

function Campo({
  etiqueta,
  children,
  ancho = "",
}: {
  etiqueta: string;
  children: React.ReactNode;
  ancho?: string;
}) {
  return (
    <div className={ancho}>
      <label className="etiqueta-campo">{etiqueta}</label>
      {children}
    </div>
  );
}

type PropsComunes = {
  esGerente: boolean;
  asesores: string[];
  asesorPropio: string;
  productos: string[];
};

function SelectorAsesor({
  esGerente,
  asesores,
  valor,
  onChange,
  asesorPropio,
}: {
  esGerente: boolean;
  asesores: string[];
  valor: string;
  onChange: (valor: string) => void;
  asesorPropio: string;
}) {
  if (!esGerente) {
    return (
      <Campo etiqueta="Vendedor">
        <input className="campo bg-lienzo text-tinta-suave" value={asesorPropio} readOnly />
      </Campo>
    );
  }

  return (
    <Campo etiqueta="Vendedor">
      <select className="campo" value={valor} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Elegí un vendedor…</option>
        {asesores.map((asesor) => (
          <option key={asesor} value={asesor}>
            {asesor}
          </option>
        ))}
      </select>
    </Campo>
  );
}

export function FormularioVenta({ esGerente, asesores, asesorPropio, productos }: PropsComunes) {
  const { enviar, enviando, estado } = useEnvio("/api/ventas");
  const [asesor, setAsesor] = useState(esGerente ? "" : asesorPropio);
  const [fecha, setFecha] = useState(hoyISO());
  const [producto, setProducto] = useState("");
  const [cliente, setCliente] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [facturacion, setFacturacion] = useState("");
  const [observaciones, setObservaciones] = useState("");

  async function guardar(evento: React.FormEvent) {
    evento.preventDefault();
    const ok = await enviar(
      { fecha, asesor, producto, cliente, cantidad, facturacion, observaciones },
      "Venta guardada en la planilla.",
    );
    if (ok) {
      setProducto("");
      setCliente("");
      setCantidad("1");
      setFacturacion("");
      setObservaciones("");
    }
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Fecha">
          <input
            type="date"
            className="campo"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </Campo>

        <SelectorAsesor
          esGerente={esGerente}
          asesores={asesores}
          valor={asesor}
          onChange={setAsesor}
          asesorPropio={asesorPropio}
        />

        <Campo etiqueta="Producto">
          <input
            className="campo"
            list="lista-productos"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Sancor Salud, Medife…"
            required
          />
          <datalist id="lista-productos">
            {productos.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </Campo>

        <Campo etiqueta="Cliente">
          <input
            className="campo"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nombre o razón social"
          />
        </Campo>

        <Campo etiqueta="Cantidad de cápitas">
          <input
            type="number"
            min={1}
            step={1}
            className="campo"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </Campo>

        <Campo etiqueta="Facturación ($)">
          <input
            type="number"
            min={0}
            step="0.01"
            className="campo"
            value={facturacion}
            onChange={(e) => setFacturacion(e.target.value)}
            placeholder="0"
            required
          />
        </Campo>
      </div>

      <Campo etiqueta="Observaciones">
        <textarea
          className="campo min-h-[72px]"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </Campo>

      <Mensaje estado={estado} />

      <button type="submit" className="boton-primario" disabled={enviando}>
        {enviando ? "Guardando…" : "Guardar venta"}
      </button>
    </form>
  );
}

export function FormularioBaja({
  esGerente,
  asesores,
  asesorPropio,
  productos,
  motivos,
}: PropsComunes & { motivos: string[] }) {
  const { enviar, enviando, estado } = useEnvio("/api/bajas");
  const [asesor, setAsesor] = useState(esGerente ? "" : asesorPropio);
  const [fecha, setFecha] = useState(hoyISO());
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [importe, setImporte] = useState("");
  const [motivo, setMotivo] = useState("");

  async function guardar(evento: React.FormEvent) {
    evento.preventDefault();
    const ok = await enviar(
      { fecha, asesor, producto, cantidad, importe, motivo },
      "Baja registrada en la planilla.",
    );
    if (ok) {
      setProducto("");
      setCantidad("1");
      setImporte("");
      setMotivo("");
    }
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Fecha">
          <input
            type="date"
            className="campo"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </Campo>

        <SelectorAsesor
          esGerente={esGerente}
          asesores={asesores}
          valor={asesor}
          onChange={setAsesor}
          asesorPropio={asesorPropio}
        />

        <Campo etiqueta="Producto">
          <input
            className="campo"
            list="lista-productos-baja"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <datalist id="lista-productos-baja">
            {productos.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </Campo>

        <Campo etiqueta="Cantidad">
          <input
            type="number"
            min={1}
            step={1}
            className="campo"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </Campo>

        <Campo etiqueta="Importe dado de baja ($)">
          <input
            type="number"
            min={0}
            step="0.01"
            className="campo"
            value={importe}
            onChange={(e) => setImporte(e.target.value)}
            placeholder="0"
          />
        </Campo>

        <Campo etiqueta="Motivo">
          <input
            className="campo"
            list="lista-motivos"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Precio, mudanza, cambio de obra social…"
            required
          />
          <datalist id="lista-motivos">
            {motivos.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </Campo>
      </div>

      <Mensaje estado={estado} />

      <button type="submit" className="boton-primario" disabled={enviando}>
        {enviando ? "Guardando…" : "Registrar baja"}
      </button>
    </form>
  );
}

export function FormularioProspecto({
  esGerente,
  asesores,
  asesorPropio,
  productos,
  onGuardado,
}: PropsComunes & { onGuardado?: () => void }) {
  const { enviar, enviando, estado } = useEnvio("/api/prospectos");
  const [asesor, setAsesor] = useState(esGerente ? "" : asesorPropio);
  const [fechaContacto, setFechaContacto] = useState(hoyISO());
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [productoInteres, setProductoInteres] = useState("");
  const [estadoProspecto, setEstadoProspecto] = useState<string>("Nuevo");
  const [observaciones, setObservaciones] = useState("");

  async function guardar(evento: React.FormEvent) {
    evento.preventDefault();
    const ok = await enviar(
      {
        fechaContacto,
        asesor,
        nombre,
        contacto,
        productoInteres,
        estado: estadoProspecto,
        observaciones,
      },
      "Prospecto agregado.",
    );
    if (ok) {
      setNombre("");
      setContacto("");
      setProductoInteres("");
      setEstadoProspecto("Nuevo");
      setObservaciones("");
      onGuardado?.();
    }
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Fecha de contacto">
          <input
            type="date"
            className="campo"
            value={fechaContacto}
            onChange={(e) => setFechaContacto(e.target.value)}
            required
          />
        </Campo>

        <SelectorAsesor
          esGerente={esGerente}
          asesores={asesores}
          valor={asesor}
          onChange={setAsesor}
          asesorPropio={asesorPropio}
        />

        <Campo etiqueta="Nombre">
          <input
            className="campo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del contacto o empresa"
            required
          />
        </Campo>

        <Campo etiqueta="Teléfono o email">
          <input
            className="campo"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />
        </Campo>

        <Campo etiqueta="Producto de interés">
          <input
            className="campo"
            list="lista-productos-prospecto"
            value={productoInteres}
            onChange={(e) => setProductoInteres(e.target.value)}
          />
          <datalist id="lista-productos-prospecto">
            {productos.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </Campo>

        <Campo etiqueta="Estado">
          <select
            className="campo"
            value={estadoProspecto}
            onChange={(e) => setEstadoProspecto(e.target.value)}
          >
            {ESTADOS_PROSPECTO.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo etiqueta="Observaciones">
        <textarea
          className="campo min-h-[72px]"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </Campo>

      <Mensaje estado={estado} />

      <button type="submit" className="boton-primario" disabled={enviando}>
        {enviando ? "Guardando…" : "Agregar prospecto"}
      </button>
    </form>
  );
}
