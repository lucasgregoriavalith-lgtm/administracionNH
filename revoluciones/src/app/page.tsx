import { PORTADA, TARJETAS_PORTADA } from "@/data/portada";
import { RevolutionCard } from "@/components/contenido/RevolutionCard";
import { StudentProfile } from "@/components/progreso/StudentProfile";
import { BotonEnlace, Rejilla, Seccion } from "@/components/ui";
import { IconoFlecha } from "@/components/Iconos";
import estilos from "./inicio.module.css";

/** Motivo gráfico de la portada: bloques desplazados, líneas y un círculo. */
function FondoPortada() {
  return (
    <svg
      className={estilos.fondo}
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="rgba(245,246,248,0.07)" strokeWidth="1" fill="none">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={760 + i * 42} y1="0" x2={620 + i * 42} y2="520" />
        ))}
      </g>
      <rect
        x="880"
        y="90"
        width="180"
        height="180"
        fill="none"
        stroke="rgba(45,107,255,0.35)"
        strokeWidth="1.5"
      />
      <rect
        x="930"
        y="150"
        width="180"
        height="180"
        fill="none"
        stroke="rgba(224,49,49,0.32)"
        strokeWidth="1.5"
        transform="rotate(9 1020 240)"
      />
      <circle
        cx="1010"
        cy="330"
        r="66"
        fill="none"
        stroke="rgba(245,246,248,0.12)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function PaginaInicio() {
  return (
    <>
      <section className={estilos.portada}>
        <FondoPortada />
        <div className="contenedor">
          <h1 className={estilos.titulo}>
            Revolu<span className={estilos.tituloAcento}>ciones</span>
          </h1>
          <p className={estilos.subtitulo}>{PORTADA.subtitulo}</p>
          <div className={estilos.reglaHorizontal} />
          <p className={estilos.introduccion}>{PORTADA.introduccion}</p>
          <p className={estilos.introduccion}>{PORTADA.invitacion}</p>

          <div className={estilos.acciones}>
            <BotonEnlace href="/concepto" variante="acento">
              Empezar el recorrido
              <IconoFlecha />
            </BotonEnlace>
            <BotonEnlace href="/comparar" variante="contorno">
              Ver el comparador
            </BotonEnlace>
          </div>

          <div className={estilos.identificacion}>
            <h2 className={estilos.tituloIdentificacion}>¿Quién va a jugar?</h2>
            <p className={estilos.guiaIdentificacion}>
              Escribí tu nombre para que la aplicación pueda guardar tu puntaje y
              mostrarte al final qué temas dominás y cuáles conviene repasar.
            </p>
            <StudentProfile />
          </div>
        </div>
      </section>

      <Seccion
        etiqueta="Tres caminos"
        titulo="Tres procesos, tres formas de cambiar"
        acento="rojo"
        guia={
          <p>
            Cada uno transformó profundamente una sociedad, pero ninguno se
            parece del todo a los otros. Uno duró ocho años de guerra, otro diez
            años de conflicto interno y el tercero más de un siglo sin ejércitos.
          </p>
        }
      >
        <Rejilla ancha>
          {TARJETAS_PORTADA.map((tarjeta) => (
            <RevolutionCard key={tarjeta.href} datos={tarjeta} />
          ))}
        </Rejilla>
      </Seccion>

      <Seccion etiqueta="Antes de empezar" titulo="Una advertencia útil">
        <div style={{ display: "grid", gap: "1.25rem", maxWidth: "70ch" }}>
          <p className="texto-guia">
            Esta aplicación no te va a dar las respuestas de entrada. Primero te
            va a preguntar qué pensás, después vas a poder equivocarte y recién
            entonces vas a recibir una explicación.
          </p>
          <p className="texto-guia">
            Equivocarse acá no resta puntos ni está mal: es la forma más rápida
            de entender por qué una idea funciona y otra no.
          </p>
          <p className={estilos.preguntaFinal}>
            ¿Todos los grandes cambios son revoluciones?
          </p>
          <p className="texto-guia">
            Guardá esa pregunta. Vas a poder responderla mucho mejor cuando
            termines el recorrido, y probablemente sigan discutiéndola en clase.
          </p>
        </div>
      </Seccion>
    </>
  );
}
