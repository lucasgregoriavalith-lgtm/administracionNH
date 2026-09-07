/**
 * Identidad grafica de la aplicacion.
 * La marca es un bloque partido: la mitad izquierda estable, la derecha
 * desplazada y girada. Es la idea de "ruptura y transformacion" reducida a
 * su forma minima. No se usan emojis en ninguna parte de la aplicacion.
 */
export function Marca({ tamano = 28 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="6" width="12" height="20" fill="var(--blanco)" />
      <rect
        x="17"
        y="3"
        width="12"
        height="20"
        fill="var(--rojo)"
        transform="rotate(9 23 13)"
      />
      <circle cx="23" cy="24" r="4.5" stroke="var(--azul)" strokeWidth="2.5" />
    </svg>
  );
}

/** Version horizontal con el nombre, para el header. */
export function MarcaCompleta() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        fontFamily: "var(--fuente-titulo)",
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontSize: "0.95rem",
        textTransform: "uppercase",
      }}
    >
      <Marca tamano={24} />
      Revoluciones
    </span>
  );
}
