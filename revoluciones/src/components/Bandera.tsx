/* ===========================================================================
   BANDERAS HISTÓRICAS
   Se dibujan como SVG propios, no como imágenes externas, por dos razones:
   1) permite usar la bandera que corresponde a cada período y evitar
      anacronismos;
   2) evita depender de archivos de origen o licencia desconocidos.
   Cada bandera lleva una nota que aclara a qué período pertenece.
   =========================================================================== */

export type ClaveBandera =
  | "eeuu-13-estrellas"
  | "eeuu-gran-union"
  | "eeuu-actual"
  | "francia-tricolor"
  | "francia-real"
  | "gran-bretana"
  | "reino-unido";

interface DatosBandera {
  nombre: string;
  periodo: string;
  nota: string;
  dibujo: React.ReactNode;
  /** Relación ancho/alto del viewBox. */
  viewBox: string;
}

/** Trece estrellas dispuestas en círculo, como en la bandera de 1777. */
function CirculoDeEstrellas() {
  const estrellas = Array.from({ length: 13 }, (_, i) => {
    const angulo = (i / 13) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 12 + Math.cos(angulo) * 6.6,
      cy: 8.1 + Math.sin(angulo) * 6.6,
      key: i,
    };
  });
  return (
    <g fill="#ffffff">
      {estrellas.map((e) => (
        <circle key={e.key} cx={e.cx} cy={e.cy} r="0.95" />
      ))}
    </g>
  );
}

/** Trece barras alternadas, empezando y terminando en rojo. */
function TreceBarras({ ancho = 38 }: { ancho?: number }) {
  return (
    <g>
      <rect width={ancho} height="20" fill="#ffffff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect
          key={i}
          y={(i * 20) / 13}
          width={ancho}
          height={20 / 13}
          fill="#b22234"
        />
      ))}
    </g>
  );
}

/** Bandera de la Unión de 1707: sin la cruz de San Patricio. */
function UnionDe1707({ x = 0, y = 0, ancho = 38, alto = 19 }) {
  const id = `union1707-${x}-${y}-${ancho}`;
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={ancho} height={alto} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={ancho} height={alto} fill="#00247d" />
        <path
          d={`M${x},${y} L${x + ancho},${y + alto} M${x + ancho},${y} L${x},${y + alto}`}
          stroke="#ffffff"
          strokeWidth={alto * 0.2}
        />
        <path
          d={`M${x + ancho / 2},${y} V${y + alto} M${x},${y + alto / 2} H${x + ancho}`}
          stroke="#ffffff"
          strokeWidth={alto * 0.33}
        />
        <path
          d={`M${x + ancho / 2},${y} V${y + alto} M${x},${y + alto / 2} H${x + ancho}`}
          stroke="#cf142b"
          strokeWidth={alto * 0.2}
        />
      </g>
    </g>
  );
}

const BANDERAS: Record<ClaveBandera, DatosBandera> = {
  "eeuu-13-estrellas": {
    nombre: "Bandera de trece estrellas",
    periodo: "desde 1777",
    nota:
      "Trece barras y trece estrellas, una por cada colonia fundadora. La bandera actual de Estados Unidos conserva las trece barras pero tiene cincuenta estrellas, una por estado.",
    viewBox: "0 0 38 20",
    dibujo: (
      <>
        <TreceBarras />
        <rect width="15.2" height="10.77" fill="#3c3b6e" />
        <g transform="translate(0.5, 0.5) scale(0.6)">
          <CirculoDeEstrellas />
        </g>
      </>
    ),
  },
  "eeuu-gran-union": {
    nombre: "Bandera de la Gran Unión",
    periodo: "1775-1777",
    nota:
      "La primera bandera de las Trece Colonias unidas. Todavía conservaba en el ángulo la bandera británica: en 1775 los colonos peleaban por sus derechos dentro del Imperio, no aún por la independencia.",
    viewBox: "0 0 38 20",
    dibujo: (
      <>
        <TreceBarras />
        <UnionDe1707 x={0} y={0} ancho={15.2} alto={10.77} />
      </>
    ),
  },
  "eeuu-actual": {
    nombre: "Bandera actual de Estados Unidos",
    periodo: "desde 1960",
    nota:
      "Cincuenta estrellas, una por cada estado. Se muestra solo como comparación: en el período estudiado esta bandera todavía no existía.",
    viewBox: "0 0 38 20",
    dibujo: (
      <>
        <TreceBarras />
        <rect width="15.2" height="10.77" fill="#3c3b6e" />
        <g fill="#ffffff">
          {Array.from({ length: 9 }, (_, fila) =>
            Array.from({ length: fila % 2 === 0 ? 6 : 5 }, (_, col) => (
              <circle
                key={`${fila}-${col}`}
                cx={1.3 + col * 2.53 + (fila % 2 === 0 ? 0 : 1.27)}
                cy={0.9 + fila * 1.15}
                r="0.42"
              />
            )),
          )}
        </g>
      </>
    ),
  },
  "francia-tricolor": {
    nombre: "Bandera tricolor francesa",
    periodo: "bandera nacional desde 1794",
    nota:
      "Sus colores vienen de la escarapela revolucionaria de 1789, que unió el blanco del rey con el azul y el rojo de la ciudad de París. Fue adoptada como bandera nacional el 15 de febrero de 1794, con el azul del lado del mástil.",
    viewBox: "0 0 30 20",
    dibujo: (
      <>
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#ffffff" />
        <rect x="20" width="10" height="20" fill="#ed2939" />
      </>
    ),
  },
  "francia-real": {
    nombre: "Pabellón blanco de la monarquía francesa",
    periodo: "antes de 1789",
    nota:
      "El blanco con flores de lis doradas era el símbolo de la monarquía borbónica. Representación histórica simplificada: la revolución lo reemplazó por la tricolor.",
    viewBox: "0 0 30 20",
    dibujo: (
      <>
        <rect width="30" height="20" fill="#f4f1e4" />
        {[
          [10, 6.5],
          [20, 6.5],
          [15, 13.5],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) scale(0.85)`} fill="#d4af37">
            <path d="M0,-4 C1.6,-2 1.6,0 0,1.4 C-1.6,0 -1.6,-2 0,-4 Z" />
            <path d="M-3.4,-0.6 C-2.4,1.4 -1,1.9 0,1.9 C-0.7,0.6 -2,-0.2 -3.4,-0.6 Z" />
            <path d="M3.4,-0.6 C2.4,1.4 1,1.9 0,1.9 C0.7,0.6 2,-0.2 3.4,-0.6 Z" />
            <rect x="-2.6" y="2.1" width="5.2" height="0.9" />
            <path d="M-0.55,3 h1.1 v2.2 h-1.1 Z" />
          </g>
        ))}
      </>
    ),
  },
  "gran-bretana": {
    nombre: "Bandera del Reino de Gran Bretaña",
    periodo: "1707-1800",
    nota:
      "Combina la cruz de San Jorge (Inglaterra) con la de San Andrés (Escocia). Esta es la bandera correcta para el período estudiado: la cruz roja diagonal de San Patricio se agregó recién en 1801, al unirse con Irlanda.",
    viewBox: "0 0 30 20",
    dibujo: <UnionDe1707 x={0} y={0} ancho={30} alto={20} />,
  },
  "reino-unido": {
    nombre: "Bandera del Reino Unido",
    periodo: "desde 1801",
    nota:
      "Es la que se conoce hoy. Se muestra solo como comparación: durante la independencia de Estados Unidos todavía no existía.",
    viewBox: "0 0 30 20",
    dibujo: (
      <>
        <rect width="30" height="20" fill="#00247d" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#ffffff" strokeWidth="4.4" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#cf142b" strokeWidth="2" />
        <path d="M15,0 V20 M0,10 H30" stroke="#ffffff" strokeWidth="6.6" />
        <path d="M15,0 V20 M0,10 H30" stroke="#cf142b" strokeWidth="4" />
      </>
    ),
  },
};

interface Props {
  clave: ClaveBandera;
  ancho?: number;
  /** Muestra el nombre y la nota histórica debajo de la bandera. */
  conNota?: boolean;
}

export function Bandera({ clave, ancho = 66, conNota = false }: Props) {
  const datos = BANDERAS[clave];
  const [, , w, h] = datos.viewBox.split(" ").map(Number);
  const alto = Math.round((ancho * h) / w);

  return (
    <figure
      style={{ margin: 0, display: "inline-block", maxWidth: conNota ? "34ch" : undefined }}
    >
      <svg
        viewBox={datos.viewBox}
        width={ancho}
        height={alto}
        role="img"
        aria-label={`${datos.nombre} (${datos.periodo})`}
        style={{
          display: "block",
          border: "1px solid var(--borde-fuerte)",
          borderRadius: "2px",
        }}
      >
        {datos.dibujo}
      </svg>
      {conNota && (
        <figcaption
          style={{
            marginTop: "0.55rem",
            fontSize: "0.78rem",
            lineHeight: 1.5,
            color: "var(--gris-suave)",
          }}
        >
          <strong style={{ color: "var(--gris-texto)", fontWeight: 600 }}>
            {datos.nombre}
          </strong>
          <span className="mono" style={{ display: "block", fontSize: "0.72rem" }}>
            {datos.periodo}
          </span>
          <span style={{ display: "block", marginTop: "0.3rem" }}>{datos.nota}</span>
        </figcaption>
      )}
    </figure>
  );
}

export function datosBandera(clave: ClaveBandera) {
  const { nombre, periodo, nota } = BANDERAS[clave];
  return { nombre, periodo, nota };
}
