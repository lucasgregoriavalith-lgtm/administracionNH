import type { ItemClasificar, ItemOrdenar, ParRelacionar, Pregunta } from "@/lib/tipos";

/* ===========================================================================
   JUEGO 1 — ¿REVOLUCIÓN O NO?
   =========================================================================== */

export const CATEGORIAS_JUEGO1 = ["Revolución", "No es una revolución"];

export const ITEMS_JUEGO1: ItemClasificar[] = [
  {
    id: "j1-vapor",
    texto:
      "Las máquinas de vapor se difunden por miles de minas y fábricas durante décadas.",
    categoria: "Revolución",
    explicacion:
      "Cambió de raíz cómo se producía y en qué trabajaba la gente, y se extendió por todas partes. Es una revolución industrial y tecnológica.",
  },
  {
    id: "j1-eleccion",
    texto: "En unas elecciones gana un partido distinto del que gobernaba.",
    categoria: "No es una revolución",
    explicacion:
      "Es el sistema funcionando como está previsto. Cambian las personas, no las reglas.",
  },
  {
    id: "j1-bastilla",
    texto:
      "Francia pasa de tener un rey con poder absoluto a proclamar una república con derechos iguales ante la ley.",
    categoria: "Revolución",
    explicacion:
      "Cambió la base misma del poder, no solo quién lo ejercía. Es el corazón de la Revolución Francesa.",
  },
  {
    id: "j1-guerra7",
    texto:
      "Dos potencias europeas libran una guerra de siete años y una gana territorios.",
    categoria: "No es una revolución",
    explicacion:
      "Hubo guerra, pero ninguna de las dos sociedades quedó organizada de otra manera. Guerra no es igual a revolución.",
  },
  {
    id: "j1-imprenta",
    texto:
      "Aparece la imprenta y los libros dejan de copiarse a mano, uno por uno.",
    categoria: "Revolución",
    explicacion:
      "Cambió quién podía acceder al conocimiento y a qué velocidad viajaban las ideas. Es una revolución tecnológica, sin ninguna guerra.",
  },
  {
    id: "j1-moda",
    texto: "Un estilo de ropa se pone de moda un verano y al siguiente ya nadie lo usa.",
    categoria: "No es una revolución",
    explicacion:
      "Cambio superficial y pasajero. Si todo vuelve al punto de partida, no fue una revolución.",
  },
  {
    id: "j1-fosbury",
    texto:
      "Un atleta salta de espaldas y en pocos años todos los saltadores del mundo cambian su técnica.",
    categoria: "Revolución",
    explicacion:
      "Es una revolución deportiva: dentro de esa disciplina, el cambio fue total y definitivo.",
  },
  {
    id: "j1-independencia",
    texto:
      "Trece colonias se separan de su imperio y fundan una república con constitución escrita.",
    categoria: "Revolución",
    explicacion:
      "Cambió quién tenía derecho a decidir las leyes y los impuestos. Nació un país nuevo.",
  },
  {
    id: "j1-maquina-sola",
    texto:
      "Una fábrica compra una máquina nueva, pero ninguna otra la adopta y al romperse vuelven a trabajar como antes.",
    categoria: "No es una revolución",
    explicacion:
      "Un invento aislado no alcanza. Para que haya revolución tecnológica, la novedad tiene que difundirse y transformar la vida de mucha gente.",
  },
  {
    id: "j1-voto",
    texto:
      "Las mujeres consiguen, país por país y a lo largo de décadas, el derecho a votar.",
    categoria: "Revolución",
    explicacion:
      "Cambió quién cuenta como ciudadano con voz para decidir. Es una revolución social, lenta y sin batallas.",
  },
];

/* ===========================================================================
   JUEGO 2 — ORDENÁ LA HISTORIA
   =========================================================================== */

export interface RondaOrdenar {
  id: string;
  titulo: string;
  consigna: string;
  items: ItemOrdenar[];
  explicacion: string;
}

export const RONDAS_ORDENAR: RondaOrdenar[] = [
  {
    id: "ord-eeuu",
    titulo: "Camino a la independencia",
    consigna: "Ordená estos acontecimientos del más antiguo al más reciente.",
    items: [
      { id: "o1-timbre", texto: "Ley del Timbre", fecha: "1765", orden: 1 },
      { id: "o1-te", texto: "Motín del té de Boston", fecha: "1773", orden: 2 },
      { id: "o1-guerra", texto: "Comienza la guerra de independencia", fecha: "1775", orden: 3 },
      { id: "o1-declaracion", texto: "Declaración de Independencia", fecha: "1776", orden: 4 },
      { id: "o1-paris", texto: "Tratado de París", fecha: "1783", orden: 5 },
    ],
    explicacion:
      "Fijate en la lógica: primero el conflicto por los impuestos, después la protesta, luego la guerra, más tarde la declaración y al final el reconocimiento. La declaración llega en medio de la guerra, no antes.",
  },
  {
    id: "ord-francia",
    titulo: "Diez años que cambiaron Francia",
    consigna: "Ordená estos acontecimientos del más antiguo al más reciente.",
    items: [
      { id: "o2-generales", texto: "Estados Generales", fecha: "mayo de 1789", orden: 1 },
      { id: "o2-bastilla", texto: "Toma de la Bastilla", fecha: "14 de julio de 1789", orden: 2 },
      { id: "o2-derechos", texto: "Declaración de los Derechos del Hombre y del Ciudadano", fecha: "agosto de 1789", orden: 3 },
      { id: "o2-republica", texto: "Proclamación de la República", fecha: "1792", orden: 4 },
      { id: "o2-terror", texto: "El Terror", fecha: "1793-1794", orden: 5 },
      { id: "o2-napoleon", texto: "Golpe de Napoleón Bonaparte", fecha: "1799", orden: 6 },
    ],
    explicacion:
      "Tres cosas para notar: los tres primeros pasaron en un solo año, 1789; la república llega tres años después de la Bastilla; y el proceso termina con un golpe militar, no con una fiesta.",
  },
  {
    id: "ord-industrial",
    titulo: "De la mina a la locomotora",
    consigna: "Ordená estos inventos del más antiguo al más reciente.",
    items: [
      { id: "o3-newcomen", texto: "Máquina de vapor de Newcomen", fecha: "1712", orden: 1 },
      { id: "o3-jenny", texto: "Hiladora Jenny", fecha: "hacia 1765", orden: 2 },
      { id: "o3-watt", texto: "Máquina de vapor mejorada por Watt", fecha: "1769", orden: 3 },
      { id: "o3-telar", texto: "Telar mecánico", fecha: "1785", orden: 4 },
      { id: "o3-locomotora", texto: "Primera locomotora sobre rieles", fecha: "1804", orden: 5 },
    ],
    explicacion:
      "Cada invento resuelve el problema que dejó el anterior: primero sacar agua de las minas, después hilar más rápido, después gastar menos carbón, después tejer todo ese hilo, y finalmente mover el vapor sobre rieles.",
  },
];

/* ===========================================================================
   JUEGO 3 — ¿A QUÉ REVOLUCIÓN PERTENECE?
   =========================================================================== */

export const CATEGORIAS_JUEGO3 = ["Estados Unidos", "Francia", "Industrial"];

export const ITEMS_JUEGO3: ItemClasificar[] = [
  { id: "j3-1776", texto: "1776", categoria: "Estados Unidos", explicacion: "Año de la Declaración de Independencia, aprobada el 4 de julio." },
  { id: "j3-bastilla", texto: "Toma de la Bastilla", categoria: "Francia", explicacion: "14 de julio de 1789, en París. Hoy es la fiesta nacional francesa." },
  { id: "j3-jenny", texto: "Hiladora Jenny", categoria: "Industrial", explicacion: "Máquina de hilar de James Hargreaves, hacia 1765, en Gran Bretaña." },
  { id: "j3-washington", texto: "George Washington", categoria: "Estados Unidos", explicacion: "Comandante del ejército continental durante la guerra de independencia." },
  { id: "j3-robespierre", texto: "Maximilien Robespierre", categoria: "Francia", explicacion: "Abogado y diputado jacobino, figura central del período del Terror." },
  { id: "j3-watt", texto: "James Watt", categoria: "Industrial", explicacion: "Mejoró la máquina de vapor con el condensador separado, patentado en 1769." },
  { id: "j3-te", texto: "Motín del té de Boston", categoria: "Estados Unidos", explicacion: "Diciembre de 1773: colonos arrojaron al mar cargamentos de té." },
  { id: "j3-guillotina", texto: "Ejecución de Luis XVI", categoria: "Francia", explicacion: "21 de enero de 1793, tras el juicio de la Convención Nacional." },
  { id: "j3-manchester", texto: "Mánchester y sus fábricas de algodón", categoria: "Industrial", explicacion: "Ciudad británica que creció enormemente por la industria textil." },
  { id: "j3-timbre", texto: "Ley del Timbre", categoria: "Estados Unidos", explicacion: "Impuesto británico de 1765 sobre documentos y papeles impresos." },
  { id: "j3-tercer-estado", texto: "El Tercer Estado", categoria: "Francia", explicacion: "Cerca del 98 % de la población francesa, sin privilegios y pagando la mayor parte de los impuestos." },
  { id: "j3-locomotora", texto: "La locomotora Rocket", categoria: "Industrial", explicacion: "Locomotora de Stephenson que ganó las pruebas de Rainhill en 1829." },
  { id: "j3-jefferson", texto: "Thomas Jefferson", categoria: "Estados Unidos", explicacion: "Redactor principal del borrador de la Declaración de Independencia." },
  { id: "j3-olympe", texto: "Olympe de Gouges", categoria: "Francia", explicacion: "Escritora que en 1791 publicó la Declaración de los Derechos de la Mujer y de la Ciudadana." },
  { id: "j3-carbon", texto: "El carbón como fuente de energía", categoria: "Industrial", explicacion: "Combustible que movió las máquinas de vapor y las fábricas británicas." },
];

/* ===========================================================================
   JUEGO 4 — VERDADERO O FALSO
   =========================================================================== */

export const VERDADERO_FALSO: Pregunta[] = [
  {
    id: "vf-guerra",
    tipo: "verdadero-falso",
    tema: "concepto",
    enunciado: "Toda revolución incluye necesariamente una guerra.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. La Revolución Industrial transformó por completo Gran Bretaña sin ninguna guerra. Una revolución puede incluir una guerra, pero no la necesita.",
  },
  {
    id: "vf-watt",
    tipo: "verdadero-falso",
    tema: "industrial",
    enunciado: "James Watt inventó la máquina de vapor.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso, y es un error muy repetido. La máquina de vapor ya existía: Thomas Newcomen construyó una que funcionaba desde 1712. Watt la mejoró en 1769 con un condensador separado que reducía muchísimo el consumo de carbón.",
  },
  {
    id: "vf-bastilla",
    tipo: "verdadero-falso",
    tema: "francia",
    enunciado:
      "El día de la toma de la Bastilla, la fortaleza estaba llena de cientos de prisioneros.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. El 14 de julio de 1789 había apenas siete prisioneros. Su importancia fue simbólica: la Bastilla representaba el poder del rey para encarcelar sin juicio.",
  },
  {
    id: "vf-1776",
    tipo: "verdadero-falso",
    tema: "eeuu",
    enunciado:
      "La guerra de independencia de Estados Unidos empezó antes de la Declaración de Independencia.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. Los combates empezaron en abril de 1775, más de un año antes del 4 de julio de 1776. Al principio los colonos no peleaban por la independencia, sino por que se respetaran sus derechos dentro del Imperio.",
  },
  {
    id: "vf-francia-ayuda",
    tipo: "verdadero-falso",
    tema: "eeuu",
    enunciado:
      "Francia ayudó a los independentistas de las Trece Colonias contra Gran Bretaña.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. Francia era rival de Gran Bretaña y desde 1778 envió dinero, armas, soldados y barcos. En Yorktown, en 1781, la flota francesa fue decisiva. Ese gasto agravó la deuda francesa pocos años antes de su propia revolución.",
  },
  {
    id: "vf-republica",
    tipo: "verdadero-falso",
    tema: "francia",
    enunciado:
      "Francia se convirtió en república inmediatamente después de la toma de la Bastilla.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. Pasaron más de tres años. Después de 1789 Francia fue una monarquía constitucional: el rey seguía en su cargo, pero con el poder limitado. La república se proclamó en septiembre de 1792.",
  },
  {
    id: "vf-industrial-inicio",
    tipo: "verdadero-falso",
    tema: "industrial",
    enunciado: "La Revolución Industrial comenzó en Gran Bretaña.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. Empezó allí en la segunda mitad del siglo XVIII, gracias a la combinación de carbón, hierro, capital del comercio, crecimiento de la población y nuevas máquinas textiles. Después se extendió a otras regiones.",
  },
  {
    id: "vf-industrial-buena",
    tipo: "verdadero-falso",
    tema: "industrial",
    enunciado:
      "La Revolución Industrial trajo únicamente beneficios para todas las personas.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. Trajo más producción, transportes nuevos y productos más baratos, pero también jornadas de 12 a 16 horas, trabajo infantil, contaminación y ciudades hacinadas. Sus consecuencias fueron muy distintas según de quién se tratara.",
  },
  {
    id: "vf-tercer-estado",
    tipo: "verdadero-falso",
    tema: "francia",
    enunciado:
      "El Tercer Estado francés era el grupo más numeroso y el que pagaba la mayor parte de los impuestos.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. Reunía a cerca del 98 % de la población y cargaba con la mayor parte de los impuestos, mientras el clero y la nobleza tenían exenciones. Esa desigualdad fue una de las causas de la revolución.",
  },
  {
    id: "vf-napoleon",
    tipo: "verdadero-falso",
    tema: "francia",
    enunciado:
      "Napoleón Bonaparte fue uno de los líderes que inició la Revolución Francesa en 1789.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. En 1789 Napoleón tenía 19 años y era un oficial de artillería desconocido. Se hizo famoso durante las guerras posteriores y llegó al poder recién en 1799, con un golpe de Estado que la mayoría de los historiadores considera el final de la revolución.",
  },
];

/* ===========================================================================
   JUEGO 5 — CONECTÁ LAS IDEAS (causa → acontecimiento → consecuencia)
   =========================================================================== */

export interface CadenaCausal {
  id: string;
  tema: "eeuu" | "francia" | "industrial";
  causa: string;
  acontecimiento: string;
  consecuencia: string;
  explicacion: string;
}

export const CADENAS_CAUSALES: CadenaCausal[] = [
  {
    id: "cad-timbre",
    tema: "eeuu",
    causa:
      "Gran Bretaña queda muy endeudada después de la Guerra de los Siete Años.",
    acontecimiento: "El Parlamento aprueba la Ley del Timbre en 1765.",
    consecuencia:
      "Las trece colonias protestan juntas por primera vez con el reclamo 'ningún impuesto sin representación'.",
    explicacion:
      "Una decisión tomada para conseguir dinero termina creando un conflicto político sobre quién tiene derecho a decidir.",
  },
  {
    id: "cad-te",
    tema: "eeuu",
    causa:
      "Una ley beneficia a la Compañía Británica de las Indias Orientales en el comercio del té.",
    acontecimiento: "Motín del té de Boston, en diciembre de 1773.",
    consecuencia:
      "Gran Bretaña castiga a Boston cerrando su puerto, y eso une a las colonias en el Primer Congreso Continental.",
    explicacion:
      "El castigo produjo el efecto contrario al buscado: en vez de aislar a Boston, unió a las trece colonias.",
  },
  {
    id: "cad-saratoga",
    tema: "eeuu",
    causa: "Los estadounidenses vencen en Saratoga en 1777.",
    acontecimiento: "Francia firma una alianza formal con ellos en 1778.",
    consecuencia:
      "Con barcos y soldados franceses, el ejército británico queda atrapado en Yorktown en 1781.",
    explicacion:
      "Una victoria convence a Francia de que valía la pena apostar por los colonos. Sin esa alianza, el final habría sido muy distinto.",
  },
  {
    id: "cad-pan",
    tema: "francia",
    causa: "Malas cosechas en 1788 y un invierno muy duro.",
    acontecimiento: "El precio del pan sube muchísimo en 1789.",
    consecuencia:
      "El hambre lleva a las clases populares de París a sumarse a la revolución.",
    explicacion:
      "Las ideas de la Ilustración explican el proyecto político, pero el hambre explica por qué tanta gente salió a la calle en ese momento.",
  },
  {
    id: "cad-estados",
    tema: "francia",
    causa:
      "El Estado francés está en quiebra y los privilegiados se niegan a pagar impuestos.",
    acontecimiento: "El rey convoca los Estados Generales en mayo de 1789.",
    consecuencia:
      "El Tercer Estado se proclama Asamblea Nacional y jura no separarse hasta dar una constitución a Francia.",
    explicacion:
      "El rey buscaba una solución financiera y abrió, sin quererlo, una discusión sobre quién representa a la nación.",
  },
  {
    id: "cad-fuga",
    tema: "francia",
    causa: "El rey intenta huir de Francia en 1791 y es detenido.",
    acontecimiento:
      "Se pierde la confianza en él y estalla la guerra contra otras monarquías.",
    consecuencia:
      "En septiembre de 1792 se abole la monarquía y se proclama la República.",
    explicacion:
      "Un rey que huye deja de parecer el jefe de la nación y pasa a parecer su enemigo. Ese cambio de percepción sella el destino de la monarquía.",
  },
  {
    id: "cad-jenny",
    tema: "industrial",
    causa: "Los tejedores no consiguen suficiente hilo para trabajar.",
    acontecimiento: "Aparecen la hiladora Jenny y el water frame.",
    consecuencia:
      "Ahora sobra hilo y el problema se traslada al tejido, lo que empuja a inventar el telar mecánico.",
    explicacion:
      "Así avanza la tecnología: cada solución crea un cuello de botella nuevo, y ese problema empuja el invento siguiente.",
  },
  {
    id: "cad-waterframe",
    tema: "industrial",
    causa:
      "El water frame es demasiado grande para una casa y necesita energía externa.",
    acontecimiento:
      "Se construyen edificios especiales junto a los ríos para alojarlo.",
    consecuencia:
      "Nace la fábrica: cientos de trabajadores reunidos bajo un mismo techo y con horarios fijos.",
    explicacion:
      "El tamaño de una máquina terminó cambiando dónde y cómo trabajaba la gente. La fábrica es tan revolucionaria como la máquina.",
  },
  {
    id: "cad-tren",
    tema: "industrial",
    causa: "Los trenes empiezan a circular con horarios fijos.",
    acontecimiento:
      "Las diferencias de hora entre ciudades se vuelven un problema práctico.",
    consecuencia:
      "Gran Bretaña adopta una hora única para todo el país, la de Greenwich.",
    explicacion:
      "Una revolución en el transporte terminó cambiando algo tan cotidiano como la hora que marca el reloj.",
  },
];

/* ===========================================================================
   JUEGO 5b — RELACIONAR CONCEPTOS
   =========================================================================== */

export const PARES_RELACIONAR: ParRelacionar[] = [
  {
    id: "rel-1776",
    izquierda: "1776",
    derecha: "Declaración de Independencia de Estados Unidos",
    explicacion: "Aprobada el 4 de julio de 1776 en Filadelfia.",
  },
  {
    id: "rel-1789",
    izquierda: "14 de julio de 1789",
    derecha: "Toma de la Bastilla",
    explicacion: "El episodio más simbólico del inicio de la Revolución Francesa.",
  },
  {
    id: "rel-1783",
    izquierda: "1783",
    derecha: "Tratado de París",
    explicacion: "Gran Bretaña reconoce la independencia de Estados Unidos.",
  },
  {
    id: "rel-1799",
    izquierda: "1799",
    derecha: "Golpe de Napoleón Bonaparte",
    explicacion: "El golpe del 18 de brumario cierra la Revolución Francesa.",
  },
  {
    id: "rel-1769",
    izquierda: "1769",
    derecha: "James Watt patenta el condensador separado",
    explicacion: "La mejora que volvió eficiente la máquina de vapor.",
  },
  {
    id: "rel-1804",
    izquierda: "1804",
    derecha: "Primera locomotora de vapor sobre rieles",
    explicacion: "Construida por Richard Trevithick en Gales.",
  },
];
