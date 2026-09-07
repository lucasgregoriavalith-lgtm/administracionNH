import type { Pregunta } from "@/lib/tipos";

/* ===========================================================================
   REPASOS DE SECCIÓN
   Tres preguntas al final de cada sección histórica. No son de memoria pura:
   piden relacionar lo que se acaba de leer.
   =========================================================================== */

export const REPASO_EEUU: Pregunta[] = [
  {
    id: "rep-eeuu-1",
    tipo: "opcion-unica",
    tema: "eeuu",
    enunciado:
      "¿Por qué el conflicto por los impuestos se transformó en algo mucho más grande?",
    opciones: [
      {
        id: "a",
        texto: "Porque los impuestos eran carísimos y nadie podía pagarlos.",
        devolucion:
          "El monto no era lo central. Las colonias pagaban impuestos más bajos que los habitantes de Gran Bretaña.",
      },
      {
        id: "b",
        texto:
          "Porque la discusión dejó de ser sobre cuánto pagar y pasó a ser sobre quién tiene derecho a decidir.",
        devolucion:
          "Correcto. Ese desplazamiento (de un problema de dinero a un problema de poder) es lo que vuelve revolucionario el proceso.",
      },
      {
        id: "c",
        texto: "Porque Francia convenció a los colonos de independizarse.",
        devolucion:
          "Francia se sumó en 1778, cuando el conflicto ya llevaba más de diez años. No lo inició.",
      },
      {
        id: "d",
        texto: "Porque los colonos querían tener su propio rey.",
        devolucion:
          "Al contrario: terminaron organizando una república con constitución escrita, sin rey.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Los colonos no discutían un precio: discutían un principio. Sin representación en el Parlamento, sostenían, ese Parlamento no podía cobrarles impuestos.",
  },
  {
    id: "rep-eeuu-2",
    tipo: "opcion-multiple",
    tema: "eeuu",
    enunciado:
      "¿Qué hechos ocurrieron ANTES de la Declaración de Independencia de 1776?",
    ayuda: "Puede haber más de uno. Pensá en la línea de tiempo.",
    opciones: [
      { id: "a", texto: "El motín del té de Boston.", devolucion: "Correcto: diciembre de 1773." },
      { id: "b", texto: "El comienzo de la guerra en Lexington y Concord.", devolucion: "Correcto: abril de 1775, más de un año antes." },
      { id: "c", texto: "La victoria en Yorktown.", devolucion: "Incorrecto: fue en 1781, cinco años después." },
      { id: "d", texto: "La Ley del Timbre.", devolucion: "Correcto: 1765, once años antes." },
    ],
    correctas: ["a", "b", "d"],
    explicacion:
      "La guerra empezó antes que la Declaración. Al principio los colonos peleaban por sus derechos dentro del Imperio; recién en 1776 el objetivo pasó a ser la independencia.",
  },
  {
    id: "rep-eeuu-3",
    tipo: "verdadero-falso",
    tema: "eeuu",
    enunciado:
      "La independencia de Estados Unidos y la Revolución Francesa fueron el mismo tipo de proceso.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. Compartieron ideas de la época, como los derechos y la soberanía del pueblo, pero fueron distintos: en América del Norte unas colonias se separaron de una potencia extranjera; en Francia una sociedad transformó por dentro su propia organización.",
  },
];

export const REPASO_FRANCIA: Pregunta[] = [
  {
    id: "rep-fr-1",
    tipo: "opcion-multiple",
    tema: "francia",
    enunciado: "¿Cuáles de estas fueron causas de la Revolución Francesa?",
    ayuda: "Una sola causa nunca explica una revolución. Marcá todas las correctas.",
    opciones: [
      { id: "a", texto: "El Estado estaba endeudado y en quiebra.", devolucion: "Correcta. Las guerras, incluida la ayuda a los independentistas americanos, habían vaciado las arcas." },
      { id: "b", texto: "La sociedad estaba dividida en tres estados con derechos desiguales.", devolucion: "Correcta. El Tercer Estado pagaba casi todos los impuestos sin tener privilegios." },
      { id: "c", texto: "El precio del pan subió muchísimo tras las malas cosechas de 1788.", devolucion: "Correcta. El hambre explica por qué tanta gente salió a la calle justo en ese momento." },
      { id: "d", texto: "Francia había perdido una guerra contra Estados Unidos.", devolucion: "Incorrecta. Francia fue aliada de los independentistas, no su enemiga." },
    ],
    correctas: ["a", "b", "c"],
    explicacion:
      "Las tres primeras actuaron juntas, y a eso se sumaron las ideas de la Ilustración. Ninguna de ellas sola habría bastado.",
  },
  {
    id: "rep-fr-2",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado:
      "¿Cuál de estas afirmaciones describe mejor cómo fue el proceso entre 1789 y 1799?",
    opciones: [
      {
        id: "a",
        texto: "Fue una línea recta: cayó la Bastilla y enseguida hubo república e igualdad.",
        devolucion:
          "No. Entre la Bastilla y la república pasaron más de tres años, y en el medio Francia fue una monarquía constitucional.",
      },
      {
        id: "b",
        texto:
          "Fue un proceso con etapas distintas: monarquía constitucional, república, Terror, Directorio y finalmente un golpe militar.",
        devolucion:
          "Correcto. Hubo avances, retrocesos y cambios de rumbo, y no siempre condujo el mismo grupo.",
      },
      {
        id: "c",
        texto: "Duró apenas unos meses, en 1789.",
        devolucion: "1789 fue el año más intenso, pero el proceso siguió diez años.",
      },
      {
        id: "d",
        texto: "Napoleón la dirigió desde el principio.",
        devolucion:
          "En 1789 Napoleón tenía 19 años y era un oficial desconocido. Llegó al poder recién en 1799.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Simplificar la Revolución Francesa como un solo salto de la monarquía a la igualdad falsea lo que ocurrió. Fue un proceso con etapas, y algunas de ellas se contradijeron entre sí.",
  },
  {
    id: "rep-fr-3",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado:
      "La Declaración de 1789 proclamó derechos iguales. ¿Qué muestra el caso de Olympe de Gouges?",
    opciones: [
      {
        id: "a",
        texto:
          "Que esos derechos, en la práctica, no alcanzaron a todos: las mujeres quedaron fuera de la vida política.",
        devolucion:
          "Correcto. Por eso en 1791 escribió la Declaración de los Derechos de la Mujer y de la Ciudadana.",
      },
      {
        id: "b",
        texto: "Que la Declaración no sirvió para nada.",
        devolucion:
          "Sí sirvió: sus ideas fueron citadas en constituciones de todo el mundo. Pero tuvo límites reales.",
      },
      {
        id: "c",
        texto: "Que las mujeres no participaron en la revolución.",
        devolucion:
          "Participaron mucho. En octubre de 1789, miles de mujeres marcharon a Versalles reclamando pan.",
      },
      {
        id: "d",
        texto: "Que la revolución terminó en 1791.",
        devolucion: "El proceso siguió ocho años más, hasta 1799.",
      },
    ],
    correctas: ["a"],
    explicacion:
      "Reconocer los límites de un proceso no es restarle valor: es entenderlo mejor. Las francesas votaron por primera vez recién en 1945.",
  },
];

export const REPASO_INDUSTRIAL: Pregunta[] = [
  {
    id: "rep-ind-1",
    tipo: "opcion-unica",
    tema: "industrial",
    enunciado:
      "¿Por qué decimos que la Revolución Industrial fue mucho más que la invención de máquinas?",
    opciones: [
      {
        id: "a",
        texto:
          "Porque cambió a la vez la producción, el trabajo, el transporte, las ciudades y la vida diaria.",
        devolucion:
          "Correcto. Lo revolucionario fue la combinación, no cada invento por separado.",
      },
      {
        id: "b",
        texto: "Porque en realidad no hubo máquinas nuevas.",
        devolucion: "Sí las hubo, y muchas. Pero no alcanzan por sí solas para explicar el proceso.",
      },
      {
        id: "c",
        texto: "Porque cambió el gobierno de Gran Bretaña.",
        devolucion: "Gran Bretaña siguió siendo una monarquía. Esta revolución no fue política.",
      },
      {
        id: "d",
        texto: "Porque duró solamente unos años.",
        devolucion: "Al contrario: duró más de un siglo y, en cierto sentido, continúa.",
      },
    ],
    correctas: ["a"],
    explicacion:
      "Una máquina sola no transforma una sociedad. Hicieron falta además carbón, hierro, capital, comercio, una población creciente y una forma nueva de organizar el trabajo: la fábrica.",
  },
  {
    id: "rep-ind-2",
    tipo: "opcion-multiple",
    tema: "industrial",
    enunciado: "¿Qué afirmaciones sobre los inventos de esta época son correctas?",
    ayuda: "Cuidado con las atribuciones que se repiten mal.",
    opciones: [
      {
        id: "a",
        texto: "James Watt mejoró una máquina de vapor que ya existía desde 1712.",
        devolucion: "Correcta. La de Thomas Newcomen funcionaba desde entonces.",
      },
      {
        id: "b",
        texto: "La primera locomotora sobre rieles la construyó Richard Trevithick en 1804.",
        devolucion:
          "Correcta. George Stephenson vino después y convirtió la idea en un sistema de transporte.",
      },
      {
        id: "c",
        texto: "El water frame era tan grande que empujó a construir fábricas.",
        devolucion:
          "Correcta. No cabía en una casa y necesitaba energía externa, así que hubo que levantar edificios junto a los ríos.",
      },
      {
        id: "d",
        texto: "James Watt inventó la máquina de vapor desde cero.",
        devolucion:
          "Incorrecta. Es el error más repetido sobre esta época: la mejoró, no la inventó.",
      },
    ],
    correctas: ["a", "b", "c"],
    explicacion:
      "Los grandes avances casi nunca salen de una sola cabeza: se apoyan en el trabajo de otros. Watt mejoró a Newcomen, y Stephenson perfeccionó lo de Trevithick.",
  },
  {
    id: "rep-ind-3",
    tipo: "opcion-unica",
    tema: "industrial",
    enunciado: "¿Cómo conviene juzgar las consecuencias de la Revolución Industrial?",
    opciones: [
      {
        id: "a",
        texto: "Fue completamente positiva: trajo progreso para todos.",
        devolucion:
          "Incompleto. También trajo trabajo infantil, jornadas de 12 a 16 horas y contaminación.",
      },
      {
        id: "b",
        texto: "Fue completamente negativa: solo trajo explotación.",
        devolucion:
          "También incompleto. Aumentó la producción, abarató productos y acortó las distancias.",
      },
      {
        id: "c",
        texto:
          "Produjo transformaciones enormes cuyas consecuencias fueron muy distintas según de quién se tratara.",
        devolucion:
          "Correcto. No fue lo mismo ser dueño de una fábrica que trabajar en ella a los diez años.",
      },
      {
        id: "d",
        texto: "No tuvo consecuencias importantes.",
        devolucion:
          "Cambió el trabajo, el transporte, las ciudades y hasta la hora que marcaban los relojes.",
      },
    ],
    correctas: ["c"],
    explicacion:
      "Los procesos históricos rara vez son todo bueno o todo malo. Mirar a quién benefició y a quién perjudicó es una mejor pregunta que preguntarse si fue buena o mala.",
  },
];
