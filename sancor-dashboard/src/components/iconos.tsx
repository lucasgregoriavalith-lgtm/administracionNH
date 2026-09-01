type Props = { className?: string };

const base = "h-[18px] w-[18px] shrink-0";

function Svg({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? base}
    >
      {children}
    </svg>
  );
}

export function IconoResumen(props: Props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="10" width="7" height="11" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function IconoObjetivo(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Svg>
  );
}

export function IconoEvolucion(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 20h18" />
      <path d="M4 15.5l4.5-5 3.5 3 6-7.5" />
      <path d="M18 6h2.5v2.5" />
    </Svg>
  );
}

export function IconoRanking(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 20h4V11H4z" />
      <path d="M10 20h4V4h-4z" />
      <path d="M16 20h4v-6h-4z" />
    </Svg>
  );
}

export function IconoBajas(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 5l4.5 5-3.5 4" />
      <path d="M20 18.5l-4.5-5 3.5-4" />
      <path d="M4 14h6.5l3-4H20" />
    </Svg>
  );
}

export function IconoProspectos(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 11.5h4.5" />
      <path d="M18.75 9.25v4.5" />
    </Svg>
  );
}

export function IconoCargar(props: Props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M12 8.5v7" />
      <path d="M8.5 12h7" />
    </Svg>
  );
}

export function IconoConfiguracion(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .32 1.77l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.6 1.6 0 0 0 15 19.4a1.6 1.6 0 0 0-1 1.47V21a2 2 0 1 1-4 0v-.09A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.77.32l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.6 1.6 0 0 0 4.6 15a1.6 1.6 0 0 0-1.47-1H3a2 2 0 1 1 0-4h.09A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.32-1.77l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.6 1.6 0 0 0 9 4.6h.09A1.6 1.6 0 0 0 10 3.13V3a2 2 0 1 1 4 0v.09A1.6 1.6 0 0 0 15 4.6a1.6 1.6 0 0 0 1.77-.32l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.6 1.6 0 0 0 19.4 9v.09a1.6 1.6 0 0 0 1.47 1H21a2 2 0 1 1 0 4h-.09a1.6 1.6 0 0 0-1.51 1z" />
    </Svg>
  );
}

export function IconoSalir(props: Props) {
  return (
    <Svg {...props}>
      <path d="M15 5V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1" />
      <path d="M19 12H9" />
      <path d="M16 8.5 19.5 12 16 15.5" />
    </Svg>
  );
}

export function IconoMenu(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Svg>
  );
}

export function IconoCerrar(props: Props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Svg>
  );
}

export function IconoRefrescar(props: Props) {
  return (
    <Svg {...props}>
      <path d="M20 11a8 8 0 1 0-.6 4" />
      <path d="M20 4.5V11h-6.5" />
    </Svg>
  );
}
