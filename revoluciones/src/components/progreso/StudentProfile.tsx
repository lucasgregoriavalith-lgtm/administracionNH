"use client";

import { useState } from "react";
import { useProgreso } from "@/lib/progreso";
import { Boton } from "../ui";
import { IconoFlecha, IconoReiniciar } from "../Iconos";
import estilos from "./progreso.module.css";

/**
 * Identificación del estudiante.
 * Se piden solo dos datos: nombre (o apodo) y curso. Ningún dato personal
 * adicional: ni correo, ni teléfono, ni dirección, ni fecha de nacimiento.
 */
export function StudentProfile({ compacto = false }: { compacto?: boolean }) {
  const { estado, identificar, reiniciar, listo } = useProgreso();
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  if (!listo) {
    return (
      <p style={{ color: "var(--gris-suave)", margin: 0 }}>Cargando tu progreso…</p>
    );
  }

  if (estado.estudiante) {
    return (
      <div className={estilos.identificado}>
        <div>
          <p className={estilos.etiqueta}>Estás jugando como</p>
          <p className={estilos.nombreGrande}>{estado.estudiante.nombre}</p>
          {estado.estudiante.curso && (
            <p className={estilos.cursoTexto}>{estado.estudiante.curso}</p>
          )}
        </div>
        {!compacto && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {confirmando ? (
              <>
                <Boton variante="acento" onClick={reiniciar}>
                  Sí, empezar de cero
                </Boton>
                <Boton variante="discreto" onClick={() => setConfirmando(false)}>
                  Cancelar
                </Boton>
              </>
            ) : (
              <Boton variante="discreto" onClick={() => setConfirmando(true)}>
                <IconoReiniciar tamano={16} />
                Cambiar de estudiante
              </Boton>
            )}
          </div>
        )}
        {confirmando && (
          <p className={estilos.privacidad} style={{ flexBasis: "100%" }}>
            Al empezar de cero se borran el nombre, el puntaje y todas las
            respuestas guardadas en este dispositivo. No se puede deshacer.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className={estilos.formulario}
      onSubmit={(e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        identificar({ nombre: nombre.trim(), curso: curso.trim() });
      }}
    >
      <div className={estilos.campo}>
        <label className={estilos.etiqueta} htmlFor="nombre-estudiante">
          Nombre o apodo
        </label>
        <input
          id="nombre-estudiante"
          className={estilos.entrada}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Cómo querés que te llamemos"
          maxLength={40}
          autoComplete="off"
          required
        />
      </div>

      <div className={estilos.campo}>
        <label className={estilos.etiqueta} htmlFor="curso-estudiante">
          Curso <span style={{ textTransform: "none" }}>(opcional)</span>
        </label>
        <input
          id="curso-estudiante"
          className={estilos.entrada}
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          placeholder="Por ejemplo: 5.º B"
          maxLength={30}
          autoComplete="off"
        />
      </div>

      <p className={estilos.privacidad}>
        Solo pedimos estos dos datos. No hace falta ningún dato personal más:
        ni correo, ni teléfono, ni dirección. Si tu docente lo prefiere, podés
        usar un apodo o el número de lista en lugar de tu nombre.
      </p>

      <div>
        <Boton type="submit" variante="acento" disabled={!nombre.trim()}>
          Empezar el recorrido
          <IconoFlecha />
        </Boton>
      </div>
    </form>
  );
}
