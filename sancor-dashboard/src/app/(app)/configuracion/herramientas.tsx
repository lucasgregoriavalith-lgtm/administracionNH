"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BotonPrepararHojas({ habilitado }: { habilitado: boolean }) {
  const router = useRouter();
  const [trabajando, setTrabajando] = useState(false);
  const [resultado, setResultado] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ejecutar() {
    setTrabajando(true);
    setError(null);
    setResultado(null);

    try {
      const respuesta = await fetch("/api/preparar-hojas", { method: "POST" });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) setError(cuerpo.error ?? "No se pudo preparar la planilla.");
      else {
        setResultado(cuerpo.acciones ?? []);
        router.refresh();
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setTrabajando(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={ejecutar}
        className="boton-primario"
        disabled={!habilitado || trabajando}
      >
        {trabajando ? "Preparando…" : "Crear hojas faltantes"}
      </button>

      {!habilitado && (
        <p className="text-xs text-tinta-suave">
          Disponible cuando la app esté conectada a un Google Sheet.
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-riesgo/30 bg-riesgo-suave px-3 py-2 text-sm text-riesgo">
          {error}
        </p>
      )}

      {resultado && (
        <ul className="space-y-1 rounded-lg border border-ok/30 bg-ok-suave px-3 py-2 text-sm text-ok">
          {resultado.map((accion) => (
            <li key={accion}>· {accion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function GeneradorDeClave() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trabajando, setTrabajando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  async function generar(evento: React.FormEvent) {
    evento.preventDefault();
    setTrabajando(true);
    setError(null);
    setHash(null);
    setCopiado(false);

    try {
      const respuesta = await fetch("/api/generar-clave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) setError(cuerpo.error ?? "No se pudo generar la contraseña.");
      else setHash(cuerpo.hash);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setTrabajando(false);
    }
  }

  async function copiar() {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <form onSubmit={generar} className="space-y-3">
      <div>
        <label className="etiqueta-campo" htmlFor="clave-nueva">
          Contraseña a convertir
        </label>
        <input
          id="clave-nueva"
          type="text"
          className="campo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          autoComplete="off"
        />
      </div>

      <button type="submit" className="boton-secundario" disabled={trabajando}>
        {trabajando ? "Generando…" : "Generar hash"}
      </button>

      {error && (
        <p className="rounded-lg border border-riesgo/30 bg-riesgo-suave px-3 py-2 text-sm text-riesgo">
          {error}
        </p>
      )}

      {hash && (
        <div className="space-y-2">
          <p className="text-xs text-tinta-suave">
            Pegá este texto en la columna <strong>PASSWORD_HASH</strong> de la hoja USUARIOS:
          </p>
          <code className="block overflow-x-auto rounded-lg bg-lienzo px-3 py-2 font-mono text-xs">
            {hash}
          </code>
          <button type="button" onClick={copiar} className="boton-secundario">
            {copiado ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      )}
    </form>
  );
}
