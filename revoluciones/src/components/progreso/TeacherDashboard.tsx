"use client";

import { useState } from "react";
import { NOMBRE_TEMA, type Tema } from "@/lib/tipos";
import { etiquetaDe } from "@/data/etiquetas";
import { Boton, Cifra, Nota, Panel, Rejilla, Seccion } from "@/components/ui";
import estilos from "@/app/docente/docente.module.css";

interface Resultados {
  cantidadEstudiantes: number;
  puntajePromedio: number;
  porcentajePromedio: number;
  completaron: number;
  porTema: Record<string, { correctas: number; total: number }>;
  actividadesConMasErrores: {
    actividadId: string;
    total: number;
    correctas: number;
    porcentajeAcierto: number;
  }[];
  actividadesMejorResueltas: {
    actividadId: string;
    total: number;
    correctas: number;
    porcentajeAcierto: number;
  }[];
  sesiones: {
    id: string;
    nombre: string;
    curso: string | null;
    puntaje: number;
    correctas: number;
    total: number;
    porcentaje: number;
    completado: boolean;
    fecha: string;
  }[];
}

const MENSAJES_ERROR: Record<string, string> = {
  "clave-incorrecta": "La contraseña no es correcta. Volvé a intentarlo.",
  "sin-contrasena":
    "El panel todavía no está configurado: falta definir la variable de entorno TEACHER_PASSWORD en Vercel.",
  "sin-base-de-datos":
    "El panel necesita una base de datos conectada. Faltan las variables SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY. Mientras tanto, la aplicación funciona igual para los estudiantes: el progreso se guarda en cada navegador.",
  "error-al-leer":
    "La base de datos respondió con un error. Revisá la configuración del proyecto en Supabase.",
  red: "No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.",
};

/** Barra horizontal simple, con la cifra siempre escrita al lado. */
function Barra({
  nombre,
  porcentaje,
  detalle,
  acento = "azul",
}: {
  nombre: string;
  porcentaje: number;
  detalle: string;
  acento?: "azul" | "rojo";
}) {
  return (
    <div className={estilos.barraFila}>
      <div className={estilos.barraCabecera}>
        <p className={estilos.barraNombre}>{nombre}</p>
        <p className={estilos.barraCifra}>
          {porcentaje}% · {detalle}
        </p>
      </div>
      <div
        className={estilos.barraCanal}
        role="meter"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${nombre}: ${porcentaje} por ciento`}
      >
        <div
          className={estilos.barraRelleno}
          style={{
            width: `${porcentaje}%`,
            background: acento === "rojo" ? "var(--rojo)" : "var(--azul)",
          }}
        />
      </div>
    </div>
  );
}

export function TeacherDashboard() {
  const [clave, setClave] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState<Resultados | null>(null);

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault();
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch("/api/docente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave }),
      });
      const cuerpo = await respuesta.json();
      if (!respuesta.ok) {
        setError(MENSAJES_ERROR[cuerpo?.error] ?? "No se pudo abrir el panel.");
        return;
      }
      setDatos(cuerpo as Resultados);
      setClave("");
    } catch {
      setError(MENSAJES_ERROR.red);
    } finally {
      setCargando(false);
    }
  }

  if (!datos) {
    return (
      <Seccion
        etiqueta="Zona protegida"
        titulo="Panel del docente"
        acento="rojo"
        guia={
          <p>
            Esta sección muestra los resultados del grupo. Los estudiantes no
            necesitan contraseña para usar la aplicación; esta zona sí.
          </p>
        }
      >
        <Panel acento="rojo">
          <form className={estilos.acceso} onSubmit={entrar}>
            <div>
              <label className={estilos.etiqueta} htmlFor="clave-docente">
                Contraseña del docente
              </label>
              <input
                id="clave-docente"
                className={estilos.entrada}
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className={estilos.error}>{error}</p>}
            <div>
              <Boton type="submit" variante="primario" disabled={cargando || !clave}>
                {cargando ? "Comprobando…" : "Entrar al panel"}
              </Boton>
            </div>
            <Nota>
              La contraseña se define con la variable de entorno
              TEACHER_PASSWORD y se comprueba en el servidor. Nunca viaja al
              navegador de los estudiantes.
            </Nota>
          </form>
        </Panel>
      </Seccion>
    );
  }

  const temas: Tema[] = ["concepto", "eeuu", "francia", "industrial"];
  const conceptoGuerra = datos.actividadesConMasErrores.find((a) =>
    a.actividadId.includes("ev-02"),
  );

  return (
    <>
      <Seccion
        etiqueta="Panel del docente"
        titulo="Resultados del grupo"
        acento="rojo"
        guia={
          <p>
            Datos de las últimas {datos.sesiones.length} sesiones registradas.
            Cada sesión corresponde a un recorrido completado por un estudiante.
          </p>
        }
      >
        <Rejilla>
          <Panel>
            <Cifra
              valor={String(datos.cantidadEstudiantes)}
              etiqueta="Sesiones registradas"
            />
          </Panel>
          <Panel>
            <Cifra valor={String(datos.puntajePromedio)} etiqueta="Puntaje promedio" />
          </Panel>
          <Panel>
            <Cifra
              valor={`${datos.porcentajePromedio}%`}
              etiqueta="Porcentaje promedio"
            />
          </Panel>
          <Panel>
            <Cifra
              valor={String(datos.completaron)}
              etiqueta="Terminaron la evaluación"
            />
          </Panel>
        </Rejilla>

        {conceptoGuerra && (
          <p className={estilos.frase} style={{ marginTop: "1.5rem" }}>
            El {conceptoGuerra.porcentajeAcierto} % de los estudiantes respondió
            correctamente la diferencia entre revolución y guerra.
          </p>
        )}
      </Seccion>

      <Seccion etiqueta="Por tema" titulo="Dónde está el grupo más flojo">
        <div className={estilos.grafico}>
          {temas.map((tema) => {
            const datosTema = datos.porTema[tema];
            const porcentaje =
              !datosTema || datosTema.total === 0
                ? 0
                : Math.round((datosTema.correctas / datosTema.total) * 100);
            return (
              <Barra
                key={tema}
                nombre={NOMBRE_TEMA[tema]}
                porcentaje={porcentaje}
                detalle={
                  datosTema
                    ? `${datosTema.correctas} de ${datosTema.total} respuestas`
                    : "sin datos"
                }
                acento={porcentaje < 60 ? "rojo" : "azul"}
              />
            );
          })}
        </div>
      </Seccion>

      <Seccion
        etiqueta="Diagnóstico"
        titulo="Preguntas con más errores"
        acento="rojo"
        guia={
          <p>
            Estas son las actividades con menor porcentaje de acierto. Sirven
            para decidir qué contenidos conviene retomar en clase.
          </p>
        }
      >
        {datos.actividadesConMasErrores.length === 0 ? (
          <p className="texto-guia">
            Todavía no hay suficientes respuestas registradas para calcular esto.
          </p>
        ) : (
          <div className={estilos.grafico}>
            {datos.actividadesConMasErrores.map((actividad) => (
              <Barra
                key={actividad.actividadId}
                nombre={etiquetaDe(actividad.actividadId)}
                porcentaje={actividad.porcentajeAcierto}
                detalle={`${actividad.correctas} de ${actividad.total}`}
                acento={actividad.porcentajeAcierto < 60 ? "rojo" : "azul"}
              />
            ))}
          </div>
        )}
      </Seccion>

      <Seccion etiqueta="Detalle" titulo="Resultados individuales">
        <div className={estilos.envoltorioTabla}>
          <table className={estilos.tabla}>
            <caption className="solo-lectores">
              Resultados individuales de cada estudiante.
            </caption>
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Curso</th>
                <th scope="col">Puntaje</th>
                <th scope="col">Correctas</th>
                <th scope="col">Porcentaje</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {datos.sesiones.map((sesion) => (
                <tr key={sesion.id}>
                  <td>{sesion.nombre}</td>
                  <td>{sesion.curso ?? "—"}</td>
                  <td className={estilos.numerico}>{sesion.puntaje}</td>
                  <td className={estilos.numerico}>
                    {sesion.correctas}/{sesion.total}
                  </td>
                  <td className={estilos.numerico}>{sesion.porcentaje}%</td>
                  <td>
                    <span
                      className={estilos.insignia}
                      data-completo={sesion.completado}
                    >
                      {sesion.completado ? "Completó" : "Parcial"}
                    </span>
                  </td>
                  <td className={estilos.numerico}>
                    {new Date(sesion.fecha).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <Boton variante="discreto" onClick={() => setDatos(null)}>
            Cerrar el panel
          </Boton>
        </div>
      </Seccion>
    </>
  );
}
