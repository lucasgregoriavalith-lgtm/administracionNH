"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormularioLogin({ volver }: { volver: string }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const datos = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setError(datos.error ?? "No se pudo iniciar sesión.");
        setEnviando(false);
        return;
      }

      router.replace(volver || "/resumen");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor. Revisá tu conexión.");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label className="etiqueta-campo" htmlFor="usuario">
          Usuario
        </label>
        <input
          id="usuario"
          name="usuario"
          className="campo"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="etiqueta-campo" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="campo"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-riesgo/30 bg-riesgo-suave px-3 py-2 text-sm text-riesgo"
        >
          {error}
        </p>
      )}

      <button type="submit" className="boton-primario w-full" disabled={enviando}>
        {enviando ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
