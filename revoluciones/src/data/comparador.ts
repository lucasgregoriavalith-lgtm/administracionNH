/* ===========================================================================
   COMPARADOR DE REVOLUCIONES
   El objetivo pedagogico es que se vea que NO son iguales. Por eso la tabla
   incluye variables donde las tres se parecen y variables donde se separan
   claramente.
   =========================================================================== */

export type ClaveRevolucion = "eeuu" | "francia" | "industrial";

export interface FilaComparacion {
  id: string;
  variable: string;
  /** Pista de lectura: ¿qué hay que mirar en esta fila? */
  pista: string;
  eeuu: string;
  francia: string;
  industrial: string;
}

export const COLUMNAS_COMPARADOR: {
  id: ClaveRevolucion;
  nombre: string;
  fecha: string;
  acento: "azul" | "rojo" | "neutro";
}[] = [
  { id: "eeuu", nombre: "Independencia de EE. UU.", fecha: "1765-1783", acento: "azul" },
  { id: "francia", nombre: "Revolución Francesa", fecha: "1789-1799", acento: "rojo" },
  { id: "industrial", nombre: "Revolución Industrial", fecha: "Siglos XVIII-XIX", acento: "neutro" },
];

export const FILAS_COMPARADOR: FilaComparacion[] = [
  {
    id: "periodo",
    variable: "Período",
    pista: "Fijate en la duración: no todas duran lo mismo.",
    eeuu: "Unos 20 años de conflicto, con 8 años de guerra (1775-1783).",
    francia: "Unos 10 años intensos, de 1789 a 1799.",
    industrial:
      "Más de un siglo, y en cierto sentido continúa. No tiene fecha de inicio ni de final exactas.",
  },
  {
    id: "lugar",
    variable: "Lugar",
    pista: "¿Dónde ocurrió y hasta dónde llegó?",
    eeuu: "Las Trece Colonias, en la costa este de América del Norte.",
    francia: "Francia, con enorme repercusión en toda Europa.",
    industrial:
      "Comenzó en Gran Bretaña y se extendió a Europa, Estados Unidos y luego al mundo.",
  },
  {
    id: "causas",
    variable: "Causas principales",
    pista: "¿Qué la puso en marcha?",
    eeuu:
      "Impuestos decididos en Londres sin representación de los colonos, y leyes de castigo cada vez más duras.",
    francia:
      "Crisis económica y deuda del Estado, desigualdad entre los tres estados, hambre por el precio del pan e ideas de la Ilustración.",
    industrial:
      "Cambios en la agricultura, crecimiento de la población, carbón y hierro disponibles, capital acumulado por el comercio y nuevas máquinas.",
  },
  {
    id: "protagonistas",
    variable: "Protagonistas",
    pista: "¿Quiénes la impulsaron?",
    eeuu:
      "Colonos, comerciantes, asambleas locales, el Congreso Continental y el ejército de Washington.",
    francia:
      "Diputados del Tercer Estado, sectores populares de París y del campo, y clubes políticos como los jacobinos.",
    industrial:
      "Inventores, empresarios, y también millones de trabajadores anónimos, incluidos mujeres y niños.",
  },
  {
    id: "cambio",
    variable: "¿Qué cambió?",
    pista: "Esta es la fila más importante: ¿qué quedó transformado?",
    eeuu:
      "Nació un país nuevo, con una constitución escrita y un gobierno republicano en lugar de un rey lejano.",
    francia:
      "Cayó la monarquía absoluta, se abolieron los privilegios de nacimiento y se proclamaron derechos iguales ante la ley.",
    industrial:
      "Cambiaron la producción, el trabajo, el transporte, las ciudades y la vida cotidiana de la gente común.",
  },
  {
    id: "consecuencias",
    variable: "Consecuencias",
    pista: "¿Qué vino después?",
    eeuu:
      "Un Estado nuevo que sirvió de modelo a otros movimientos independentistas. Pero la esclavitud continuó allí durante casi noventa años más.",
    francia:
      "Las ideas de igualdad y derechos se difundieron por Europa y América. También hubo violencia extrema durante el Terror y, al final, el ascenso de Napoleón.",
    industrial:
      "Crecimiento económico y tecnológico enormes, junto con desigualdad, trabajo infantil y contaminación.",
  },
  {
    id: "ideas",
    variable: "Relación con ideas nuevas",
    pista: "¿Qué pensamiento la acompañó?",
    eeuu:
      "Ideas ilustradas sobre derechos, representación y límites al poder.",
    francia:
      "La Ilustración de manera muy directa: soberanía popular, igualdad ante la ley y división de poderes.",
    industrial:
      "No la impulsó una idea política, sino el conocimiento técnico y la búsqueda de producir más y más barato.",
  },
  {
    id: "conflicto",
    variable: "¿Hubo conflicto?",
    pista: "Ojo: conflicto no es lo mismo que guerra.",
    eeuu: "Sí, un conflicto político largo antes de la guerra.",
    francia: "Sí, un conflicto interno muy profundo entre grupos sociales.",
    industrial:
      "Sí, pero de otro tipo: conflictos laborales, huelgas y protestas de trabajadores desplazados por las máquinas.",
  },
  {
    id: "violencia",
    variable: "¿Hubo violencia?",
    pista: "Aquí se ve que la violencia no define a una revolución.",
    eeuu: "Sí: ocho años de guerra.",
    francia:
      "Sí, y en el Terror alcanzó una escala extrema, con miles de ejecuciones.",
    industrial:
      "No como guerra. Sí hubo represión de protestas obreras y, sobre todo, condiciones de trabajo que costaron muchas vidas.",
  },
  {
    id: "duracion",
    variable: "¿Terminó?",
    pista: "¿Se puede marcar un final?",
    eeuu: "Sí. El Tratado de París de 1783 cierra el proceso de independencia.",
    francia:
      "Sí. La mayoría de los historiadores marca el final en el golpe de Napoleón, en 1799.",
    industrial:
      "No exactamente. Siguió evolucionando con la electricidad, el motor y la informática hasta hoy.",
  },
  {
    id: "impacto",
    variable: "Impacto posterior",
    pista: "¿Qué queda de esto hoy?",
    eeuu:
      "Sirvió de modelo para otras independencias americanas y para la idea de constitución escrita.",
    francia:
      "Sus ideas de derechos e igualdad están presentes en constituciones y declaraciones de todo el mundo.",
    industrial:
      "Casi todo lo que usás hoy (el transporte, la electricidad, la ropa fabricada en serie) desciende de ese proceso.",
  },
];

export const CONCLUSION_COMPARADOR =
  "Las tres son revoluciones porque las tres transformaron profundamente una sociedad. Pero mirá las diferencias: una duró ocho años de guerra, otra diez años de conflicto interno, y la tercera más de un siglo sin ejércitos. Dos cambiaron quién gobernaba; la otra cambió cómo se producía y cómo se vivía. Eso es lo importante: no todas las revoluciones son iguales.";

/* ===========================================================================
   MAPA HISTÓRICO
   =========================================================================== */

export interface RegionMapa {
  id: string;
  nombre: string;
  nombreHistorico: string;
  bandera: string;
  periodo: string;
  revolucion: string;
  explicacion: string;
  /** Posicion aproximada sobre el mapa esquematico (porcentaje). */
  x: number;
  y: number;
  acento: "azul" | "rojo" | "neutro";
}

export const REGIONES_MAPA: RegionMapa[] = [
  {
    id: "colonias",
    nombre: "Trece Colonias / Estados Unidos",
    nombreHistorico: "Trece Colonias británicas de América del Norte",
    bandera: "eeuu-13-estrellas",
    periodo: "1765-1783",
    revolucion: "Independencia de Estados Unidos",
    explicacion:
      "Trece colonias británicas de la costa atlántica que se declararon independientes en 1776 y fundaron un país nuevo. La bandera de trece estrellas y trece barras representa a esas colonias fundadoras; la bandera actual tiene 50 estrellas, una por cada estado.",
    x: 26,
    y: 26,
    acento: "azul",
  },
  {
    id: "francia",
    nombre: "Francia",
    nombreHistorico: "Reino de Francia y luego Primera República francesa",
    bandera: "francia-tricolor",
    periodo: "1789-1799",
    revolucion: "Revolución Francesa",
    explicacion:
      "Uno de los reinos más poderosos de Europa. Entre 1789 y 1799 derribó la monarquía absoluta y proclamó derechos iguales ante la ley. La bandera tricolor nació de la escarapela revolucionaria de 1789 y fue adoptada como bandera nacional en 1794; antes de la revolución, el pabellón del rey era blanco con flores de lis.",
    x: 50.5,
    y: 30,
    acento: "rojo",
  },
  {
    id: "gran-bretana",
    nombre: "Gran Bretaña",
    nombreHistorico: "Reino de Gran Bretaña (1707-1800)",
    bandera: "gran-bretana",
    periodo: "Siglos XVIII-XIX",
    revolucion: "Revolución Industrial",
    explicacion:
      "Aquí empezó la Revolución Industrial, gracias al carbón, el hierro, el capital del comercio y una serie de inventos textiles. Y es también el país del que se independizaron las Trece Colonias: aparece en dos de las tres historias que estudiaste. La bandera que se muestra es la del Reino de Gran Bretaña anterior a 1801, sin la cruz de San Patricio que se agregó al unirse con Irlanda.",
    x: 45.5,
    y: 21.5,
    acento: "azul",
  },
];
