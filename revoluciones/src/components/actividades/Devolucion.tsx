import { IconoCorrecto, IconoIncorrecto, IconoParcial } from "../Iconos";
import estilos from "./actividades.module.css";

export type Tono = "correcta" | "parcial" | "incorrecta";

const TITULOS: Record<Tono, string> = {
  correcta: "Correcto",
  parcial: "Casi",
  incorrecta: "No exactamente",
};

/**
 * Devolución pedagógica. Nunca dice solo "correcto": siempre explica por qué.
 * El tono es educativo y motivador, sin exclamaciones infantiles.
 */
export function Devolucion({
  tono,
  children,
  puntos,
  titulo,
}: {
  tono: Tono;
  children: React.ReactNode;
  puntos?: number;
  titulo?: string;
}) {
  const Icono =
    tono === "correcta"
      ? IconoCorrecto
      : tono === "parcial"
        ? IconoParcial
        : IconoIncorrecto;

  return (
    <div className={estilos.devolucion} data-tono={tono} role="status">
      <p className={estilos.tituloDevolucion}>
        <Icono tamano={19} />
        {titulo ?? TITULOS[tono]}
      </p>
      <div className={estilos.textoDevolucion}>{children}</div>
      {typeof puntos === "number" && puntos > 0 && (
        <p className={estilos.puntosGanados}>
          +{puntos} {puntos === 1 ? "punto" : "puntos"}
        </p>
      )}
    </div>
  );
}
