/**
 * Iconografia vectorial propia. Trazos simples y consistentes: 2 px, sin
 * relleno, esquinas rectas. Deliberadamente NO se usan emojis.
 */
type Props = { tamano?: number; className?: string };

const base = (tamano: number) => ({
  width: tamano,
  height: tamano,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
});

export function IconoFlecha({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconoCorrecto({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M4 12.5l5.2 5.2L20 7" />
    </svg>
  );
}

export function IconoIncorrecto({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconoParcial({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function IconoReloj({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function IconoDocumento({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export function IconoEngranaje({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export function IconoBalanza({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M12 4v16M6 20h12M4 8h16M4 8l-2.5 5h5zM20 8l2.5 5h-5z" />
    </svg>
  );
}

export function IconoMapa({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14" />
    </svg>
  );
}

export function IconoMas({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconoMenos({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconoMenu({ tamano = 20, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconoCerrar({ tamano = 20, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconoReiniciar({ tamano = 18, className }: Props) {
  return (
    <svg {...base(tamano)} className={className}>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path d="M20 4v5h-5" />
    </svg>
  );
}
