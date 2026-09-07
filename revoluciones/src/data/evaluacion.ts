import type { ItemClasificar, ItemOrdenar, Pregunta } from "@/lib/tipos";

/* ===========================================================================
   EVALUACIÓN FINAL — 18 actividades
   Criterio: la mayoria de las preguntas se responden razonando, no
   recordando. Solo unas pocas piden un dato concreto, y siempre uno que
   la aplicacion trabajo varias veces.
   =========================================================================== */

export const PREGUNTAS_EVALUACION: Pregunta[] = [
  {
    id: "ev-01",
    tipo: "opcion-unica",
    tema: "concepto",
    enunciado: "¿Cuál de estas situaciones representa mejor una revolución?",
    opciones: [
      {
        id: "a",
        texto: "Dos países discuten durante años por una frontera.",
        devolucion:
          "Eso es un conflicto. Hay posiciones enfrentadas, pero ninguna de las dos sociedades cambió por dentro.",
      },
      {
        id: "b",
        texto:
          "Una sociedad pasa de producir a mano en talleres a producir con máquinas en fábricas, y cambian el trabajo, las ciudades y los horarios.",
        devolucion:
          "Correcto. Hay un cambio profundo que alcanza la forma de vivir de mucha gente y que no se deshace después.",
      },
      {
        id: "c",
        texto: "Un ejército gana una batalla importante.",
        devolucion:
          "Ganar una batalla puede formar parte de una revolución, pero por sí solo no transforma una sociedad.",
      },
      {
        id: "d",
        texto: "Un estilo de música se pone de moda durante un año.",
        devolucion:
          "Cambio superficial y pasajero. Una revolución deja una marca que no se borra.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "La señal de una revolución es la profundidad y la permanencia del cambio, no la violencia ni el ruido que hace.",
  },
  {
    id: "ev-02",
    tipo: "opcion-unica",
    tema: "concepto",
    enunciado: "¿Cuál es la diferencia principal entre una revolución y una guerra?",
    opciones: [
      {
        id: "a",
        texto: "Ninguna: son dos palabras para lo mismo.",
        devolucion:
          "No. Hubo guerras enormes que no fueron revoluciones y revoluciones profundas sin guerra.",
      },
      {
        id: "b",
        texto: "La guerra es un enfrentamiento armado; la revolución es una transformación profunda de una sociedad.",
        devolucion:
          "Correcto. Una revolución puede incluir una guerra, pero lo que la define es el cambio que deja atrás.",
      },
      {
        id: "c",
        texto: "La revolución dura poco y la guerra dura mucho.",
        devolucion:
          "La duración no las distingue. La Revolución Industrial duró más de un siglo y la guerra de independencia, ocho años.",
      },
      {
        id: "d",
        texto: "La guerra ocurre entre países y la revolución siempre dentro de uno solo.",
        devolucion:
          "No es un criterio válido. La independencia de Estados Unidos fue una revolución que enfrentó a colonias con una potencia extranjera.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Guerra describe un tipo de enfrentamiento. Revolución describe un tipo de cambio. Son cosas distintas que a veces se cruzan.",
  },
  {
    id: "ev-03",
    tipo: "opcion-multiple",
    tema: "concepto",
    enunciado:
      "¿Cuáles de estas afirmaciones sobre las revoluciones son correctas? Puede haber más de una.",
    ayuda: "Marcá todas las que consideres correctas.",
    opciones: [
      {
        id: "a",
        texto: "Una revolución puede incluir una guerra.",
        devolucion:
          "Correcta. La independencia de Estados Unidos necesitó ocho años de guerra.",
      },
      {
        id: "b",
        texto: "Una revolución puede ocurrir sin ninguna guerra.",
        devolucion:
          "Correcta. La Revolución Industrial transformó Gran Bretaña sin ejércitos.",
      },
      {
        id: "c",
        texto: "Una revolución siempre cambia el gobierno de un país.",
        devolucion:
          "Incorrecta. La imprenta, el ferrocarril o la vacuna transformaron la vida de millones sin cambiar quién gobernaba.",
      },
      {
        id: "d",
        texto: "Una revolución puede seguir evolucionando hasta nuestros días.",
        devolucion:
          "Correcta. La Revolución Industrial continuó con la electricidad, el motor y la informática.",
      },
    ],
    correctas: ["a", "b", "d"],
    explicacion:
      "Las tres correctas describen distintas formas que puede tomar una revolución. La única falsa es la que la reduce a un cambio de gobierno.",
  },
  {
    id: "ev-04",
    tipo: "opcion-unica",
    tema: "concepto",
    enunciado:
      "En un país democrático hay elecciones y gana un partido distinto. ¿Es una revolución?",
    opciones: [
      {
        id: "a",
        texto: "Sí, porque cambia quién gobierna.",
        devolucion:
          "Es la trampa más común. Cambiar quién ocupa el cargo no es lo mismo que cambiar las reglas.",
      },
      {
        id: "b",
        texto: "No, porque las reglas y los derechos siguen siendo los mismos: es el sistema funcionando como estaba previsto.",
        devolucion:
          "Correcto. Una revolución cambia las reglas del juego, no solamente los jugadores.",
      },
      {
        id: "c",
        texto: "Sí, siempre que haya protestas en la calle.",
        devolucion:
          "Las protestas pueden acompañar una revolución, pero no la definen.",
      },
      {
        id: "d",
        texto: "No, porque no hubo violencia.",
        devolucion:
          "El razonamiento no sirve: la Revolución Industrial no tuvo violencia armada y sí fue una revolución.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Preguntá siempre: después de esto, ¿la sociedad quedó organizada de otra manera? Si la respuesta es no, no hubo revolución.",
  },
  {
    id: "ev-05",
    tipo: "opcion-unica",
    tema: "eeuu",
    enunciado: "¿Qué ocurrió en 1776?",
    opciones: [
      {
        id: "a",
        texto: "Comenzó la guerra de independencia.",
        devolucion:
          "La guerra empezó antes, en abril de 1775, con los combates de Lexington y Concord.",
      },
      {
        id: "b",
        texto: "Las Trece Colonias aprobaron la Declaración de Independencia.",
        devolucion:
          "Correcto: el 4 de julio de 1776, en Filadelfia. Es la fecha fundacional de Estados Unidos.",
      },
      {
        id: "c",
        texto: "Gran Bretaña reconoció la independencia de Estados Unidos.",
        devolucion:
          "Eso ocurrió siete años después, con el Tratado de París de 1783.",
      },
      {
        id: "d",
        texto: "Se produjo el motín del té de Boston.",
        devolucion: "El motín del té fue en diciembre de 1773.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "1776 importa porque cambió el objetivo: se dejó de pedir derechos dentro del Imperio para pasar a reclamar existir como país nuevo.",
  },
  {
    id: "ev-06",
    tipo: "opcion-unica",
    tema: "eeuu",
    enunciado:
      "¿Cuál fue el reclamo central de los colonos frente a los impuestos británicos?",
    opciones: [
      {
        id: "a",
        texto: "Que los impuestos eran demasiado altos para pagarlos.",
        devolucion:
          "El monto no era el argumento principal. De hecho, las colonias pagaban impuestos más bajos que los británicos de la metrópoli.",
      },
      {
        id: "b",
        texto:
          "Que no tenían representantes en el Parlamento que decidía esos impuestos.",
        devolucion:
          "Correcto. De ahí la frase 'ningún impuesto sin representación'. El reclamo era sobre quién tiene derecho a decidir.",
      },
      {
        id: "c",
        texto: "Que preferían pagarle los impuestos a Francia.",
        devolucion: "Eso no ocurrió ni fue nunca un planteo de los colonos.",
      },
      {
        id: "d",
        texto: "Que no querían pagar ningún impuesto de ningún tipo.",
        devolucion:
          "Las asambleas coloniales cobraban sus propios impuestos. El problema era que los decidiera un Parlamento donde no estaban representados.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Este es el punto que convierte un conflicto por dinero en un conflicto revolucionario: la discusión pasó a ser sobre quién manda.",
  },
  {
    id: "ev-07",
    tipo: "opcion-multiple",
    tema: "eeuu",
    enunciado:
      "¿Cuáles de estos hechos formaron parte del proceso de independencia de Estados Unidos?",
    ayuda: "Marcá todas las que correspondan.",
    opciones: [
      { id: "a", texto: "El motín del té de Boston.", devolucion: "Correcta. Diciembre de 1773." },
      { id: "b", texto: "La toma de la Bastilla.", devolucion: "Incorrecta. Ese hecho pertenece a la Revolución Francesa, en julio de 1789." },
      { id: "c", texto: "La victoria en Yorktown.", devolucion: "Correcta. Octubre de 1781, con apoyo decisivo de la flota francesa." },
      { id: "d", texto: "El Tratado de París de 1783.", devolucion: "Correcta. Con él Gran Bretaña reconoció la independencia." },
    ],
    correctas: ["a", "c", "d"],
    explicacion:
      "La toma de la Bastilla es el intruso: pertenece a la Revolución Francesa. Los dos procesos son cercanos en el tiempo, pero distintos.",
  },
  {
    id: "ev-08",
    tipo: "verdadero-falso",
    tema: "eeuu",
    enunciado:
      "La ayuda de Francia fue decisiva para la victoria de los independentistas en Yorktown.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. La flota francesa del almirante De Grasse bloqueó la salida al mar e impidió que los británicos escaparan o recibieran refuerzos. Sin ese bloqueo, el cerco no habría funcionado.",
  },
  {
    id: "ev-09",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado:
      "¿Qué relación existió entre las ideas de la Ilustración y la Revolución Francesa?",
    opciones: [
      {
        id: "a",
        texto:
          "Ninguna: la revolución no tuvo nada que ver con las ideas de la época.",
        devolucion:
          "No. Los conceptos de derechos, igualdad ante la ley y soberanía de la nación vienen directamente de ese debate.",
      },
      {
        id: "b",
        texto:
          "La Ilustración aportó las ideas que dieron forma al proyecto revolucionario, aunque hicieron falta además la crisis económica y el hambre para que estallara.",
        devolucion:
          "Correcto. Las ideas explican el proyecto; la crisis y el hambre explican por qué ocurrió en ese momento.",
      },
      {
        id: "c",
        texto:
          "Los libros de la Ilustración provocaron la revolución por sí solos.",
        devolucion:
          "Es una simplificación. Esas ideas circulaban desde hacía décadas sin producir una revolución. Hizo falta que se sumaran la quiebra del Estado y el precio del pan.",
      },
      {
        id: "d",
        texto: "La Ilustración fue una consecuencia de la revolución.",
        devolucion:
          "Al revés: el debate ilustrado se desarrolló a lo largo del siglo XVIII, antes de 1789.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Una buena explicación histórica casi nunca tiene una sola causa. Las ideas, la economía y el hambre actuaron juntas.",
  },
  {
    id: "ev-10",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado:
      "¿Qué característica definía a la sociedad francesa antes de 1789?",
    opciones: [
      {
        id: "a",
        texto:
          "Estaba dividida en tres estados con derechos y obligaciones distintos, según el grupo en el que se hubiera nacido.",
        devolucion:
          "Correcto. Clero, nobleza y Tercer Estado no eran iguales ante la ley, y no se elegía a cuál pertenecer.",
      },
      {
        id: "b",
        texto: "Todos los habitantes eran iguales ante la ley.",
        devolucion:
          "No. Esa fue justamente una de las conquistas de la revolución, no su punto de partida.",
      },
      {
        id: "c",
        texto: "El rey era elegido por votación cada cierta cantidad de años.",
        devolucion:
          "No. La corona se heredaba dentro de la familia real. Luis XVI reinaba desde 1774 por herencia.",
      },
      {
        id: "d",
        texto: "No existían los impuestos.",
        devolucion:
          "Existían, y eran un problema central: el Tercer Estado pagaba la mayor parte mientras los privilegiados estaban exentos.",
      },
    ],
    correctas: ["a"],
    explicacion:
      "Esa desigualdad de nacimiento es lo que la revolución derribó cuando abolió los privilegios en agosto de 1789.",
  },
  {
    id: "ev-11",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado: "¿Por qué la toma de la Bastilla fue tan importante?",
    opciones: [
      {
        id: "a",
        texto: "Porque liberó a cientos de prisioneros políticos.",
        devolucion: "Dentro había apenas siete presos. Su importancia no fue esa.",
      },
      {
        id: "b",
        texto:
          "Porque fue un símbolo: la Bastilla representaba el poder del rey para encarcelar sin juicio, y su caída mostró que ese poder podía ser derrotado.",
        devolucion:
          "Correcto. Fue un hecho pequeño en lo militar y enorme en lo simbólico.",
      },
      {
        id: "c",
        texto: "Porque en ese momento terminó la monarquía francesa.",
        devolucion:
          "La monarquía siguió tres años más. La república se proclamó recién en septiembre de 1792.",
      },
      {
        id: "d",
        texto: "Porque allí se firmó la Declaración de los Derechos.",
        devolucion:
          "La Declaración fue aprobada por la Asamblea el 26 de agosto de 1789, no en la Bastilla.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Los símbolos importan en la historia. Por eso el 14 de julio es la fiesta nacional francesa desde 1880.",
  },
  {
    id: "ev-12",
    tipo: "opcion-unica",
    tema: "francia",
    enunciado: "¿Quién fue Olympe de Gouges y por qué se la recuerda?",
    opciones: [
      {
        id: "a",
        texto: "Una reina de Francia ejecutada durante el Terror.",
        devolucion: "No era noble ni reina. Era escritora y autora de teatro.",
      },
      {
        id: "b",
        texto:
          "Una escritora que en 1791 publicó la Declaración de los Derechos de la Mujer y de la Ciudadana, reclamando los mismos derechos para las mujeres.",
        devolucion:
          "Correcto. Su argumento fue simple y potente: si los derechos son universales, también son de las mujeres.",
      },
      {
        id: "c",
        texto: "Una general del ejército revolucionario.",
        devolucion: "No participó en el ejército.",
      },
      {
        id: "d",
        texto: "La esposa de Robespierre.",
        devolucion: "No tuvo esa relación. Fue una autora independiente.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Su figura señala un límite real de la revolución: proclamó derechos iguales pero no se los reconoció a las mujeres. Las francesas votaron por primera vez recién en 1945.",
  },
  {
    id: "ev-13",
    tipo: "verdadero-falso",
    tema: "francia",
    enunciado:
      "La Revolución Francesa fue un proceso de diez años, con etapas muy distintas entre sí.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["v"],
    explicacion:
      "Verdadero. Pasó por una monarquía constitucional (1791), una república (1792), el Terror (1793-1794), el Directorio (1795) y terminó con el golpe de Napoleón en 1799. No fue una línea recta.",
  },
  {
    id: "ev-14",
    tipo: "opcion-unica",
    tema: "industrial",
    enunciado: "¿Por qué la Revolución Industrial transformó la vida de las personas?",
    opciones: [
      {
        id: "a",
        texto: "Porque se inventaron máquinas nuevas.",
        devolucion:
          "Incompleta. Las máquinas fueron una parte, pero un invento aislado no transforma una sociedad.",
      },
      {
        id: "b",
        texto:
          "Porque cambiaron a la vez la forma de producir, el lugar de trabajo, el transporte, las ciudades y hasta los horarios de la vida diaria.",
        devolucion:
          "Correcto. Lo revolucionario fue la combinación, no un invento suelto.",
      },
      {
        id: "c",
        texto: "Porque cambió el gobierno de Gran Bretaña.",
        devolucion:
          "No. Gran Bretaña siguió siendo una monarquía. Esta revolución no fue política.",
      },
      {
        id: "d",
        texto: "Porque hubo una guerra que la impuso.",
        devolucion:
          "No hubo ninguna guerra industrial. Es el mejor ejemplo de revolución sin guerra.",
      },
    ],
    correctas: ["b"],
    explicacion:
      "Una revolución no es un invento: es lo que pasa cuando muchos cambios se combinan y transforman la vida cotidiana de mucha gente.",
  },
  {
    id: "ev-15",
    tipo: "opcion-multiple",
    tema: "industrial",
    enunciado:
      "¿Cuáles de estas fueron consecuencias reales de la Revolución Industrial?",
    ayuda: "Ojo: hubo consecuencias de los dos signos. Marcá todas las correctas.",
    opciones: [
      {
        id: "a",
        texto: "Aumentó muchísimo la cantidad de productos fabricados.",
        devolucion: "Correcta. Fue uno de sus efectos más visibles.",
      },
      {
        id: "b",
        texto: "Muchos niños y niñas trabajaban largas jornadas en fábricas y minas.",
        devolucion:
          "Correcta. Fue uno de sus costos sociales más duros, y motivó las primeras leyes de fábrica desde 1833.",
      },
      {
        id: "c",
        texto: "Las ciudades industriales crecieron muy rápido y de forma desordenada.",
        devolucion:
          "Correcta. Mánchester es el ejemplo clásico: creció más rápido que sus viviendas y sus cloacas.",
      },
      {
        id: "d",
        texto: "Todos los habitantes pasaron a tener las mismas riquezas.",
        devolucion:
          "Incorrecta. La riqueza creció, pero se repartió de manera muy despareja. La desigualdad fue uno de sus problemas centrales.",
      },
    ],
    correctas: ["a", "b", "c"],
    explicacion:
      "Ni completamente positiva ni completamente negativa: sus consecuencias fueron muy distintas según de quién se tratara.",
  },
  {
    id: "ev-16",
    tipo: "verdadero-falso",
    tema: "industrial",
    enunciado: "James Watt inventó la máquina de vapor desde cero.",
    opciones: [
      { id: "v", texto: "Verdadero", devolucion: "" },
      { id: "f", texto: "Falso", devolucion: "" },
    ],
    correctas: ["f"],
    explicacion:
      "Falso. La máquina de Thomas Newcomen funcionaba desde 1712. Watt la mejoró en 1769 con un condensador separado que redujo enormemente el consumo de carbón, y eso la sacó de las minas para llevarla a las fábricas.",
  },
  {
    id: "ev-17",
    tipo: "opcion-unica",
    tema: "concepto",
    enunciado:
      "Comparando las tres revoluciones que estudiaste, ¿qué afirmación es correcta?",
    opciones: [
      {
        id: "a",
        texto: "Las tres duraron aproximadamente lo mismo.",
        devolucion:
          "No. La francesa duró unos diez años, la independencia estadounidense unos veinte, y la industrial más de un siglo.",
      },
      {
        id: "b",
        texto: "Las tres incluyeron guerras.",
        devolucion:
          "No. La Revolución Industrial no tuvo guerra: transformó Gran Bretaña con máquinas, fábricas y ferrocarriles.",
      },
      {
        id: "c",
        texto:
          "Las tres transformaron profundamente una sociedad, pero lo hicieron de maneras, con duraciones y con protagonistas muy distintos.",
        devolucion:
          "Correcto. Comparten lo esencial (la profundidad del cambio) y se diferencian en casi todo lo demás.",
      },
      {
        id: "d",
        texto: "Las tres cambiaron el gobierno de un país.",
        devolucion:
          "No. La Revolución Industrial no cambió el gobierno británico: cambió la producción y la vida cotidiana.",
      },
    ],
    correctas: ["c"],
    explicacion:
      "Esta es la conclusión más importante del recorrido: lo que las hace revoluciones es la profundidad del cambio, no la forma que toman.",
  },
  {
    id: "ev-18",
    tipo: "opcion-multiple",
    tema: "concepto",
    enunciado:
      "Un cambio ocurrió en una sociedad. ¿Qué preguntas te sirven para decidir si fue una revolución?",
    ayuda: "Pensá en el método, no en un caso concreto.",
    opciones: [
      {
        id: "a",
        texto: "¿El cambio fue profundo o solamente de superficie?",
        devolucion:
          "Correcta. Es la primera pregunta de control: distingue una transformación de una novedad pasajera.",
      },
      {
        id: "b",
        texto: "¿Después del cambio, la sociedad quedó organizada de otra manera?",
        devolucion:
          "Correcta. Si todo volvió a funcionar como antes, no hubo revolución.",
      },
      {
        id: "c",
        texto: "¿Hubo violencia o muertos?",
        devolucion:
          "Incorrecta como criterio. La Guerra de los Siete Años tuvo cientos de miles de muertos y no fue una revolución; la Revolución Industrial no tuvo guerra y sí lo fue.",
      },
      {
        id: "d",
        texto: "¿El cambio alcanzó a mucha gente y se sostuvo en el tiempo?",
        devolucion:
          "Correcta. Un invento que nadie adopta o una moda que dura un verano no transforman nada.",
      },
    ],
    correctas: ["a", "b", "d"],
    explicacion:
      "Estas tres preguntas son la herramienta que te llevás del recorrido. Sirven para cualquier caso, incluso para los que todavía no ocurrieron.",
  },
];

/* --- Actividad de ordenar dentro de la evaluacion ------------------------- */

export const ORDENAR_EVALUACION: { id: string; consigna: string; items: ItemOrdenar[]; explicacion: string } = {
  id: "ev-ordenar",
  consigna:
    "Ordená estos acontecimientos de las tres revoluciones, del más antiguo al más reciente.",
  items: [
    { id: "eo-newcomen", texto: "Máquina de vapor de Newcomen", fecha: "1712", orden: 1 },
    { id: "eo-timbre", texto: "Ley del Timbre en las Trece Colonias", fecha: "1765", orden: 2 },
    { id: "eo-declaracion", texto: "Declaración de Independencia de Estados Unidos", fecha: "1776", orden: 3 },
    { id: "eo-bastilla", texto: "Toma de la Bastilla", fecha: "1789", orden: 4 },
    { id: "eo-republica", texto: "Proclamación de la República francesa", fecha: "1792", orden: 5 },
    { id: "eo-locomotora", texto: "Primera locomotora sobre rieles", fecha: "1804", orden: 6 },
  ],
  explicacion:
    "Mirá el orden completo: la Revolución Industrial ya había empezado antes que las otras dos y siguió después de que ambas terminaran. Las tres se superponen en el tiempo.",
};

/* --- Actividad de clasificar dentro de la evaluacion ---------------------- */

export const CLASIFICAR_EVALUACION: {
  id: string;
  consigna: string;
  categorias: string[];
  items: ItemClasificar[];
} = {
  id: "ev-clasificar",
  consigna: "Ubicá cada elemento en la revolución a la que pertenece.",
  categorias: ["Estados Unidos", "Francia", "Industrial"],
  items: [
    { id: "ec-tea", texto: "Motín del té de Boston", categoria: "Estados Unidos", explicacion: "Diciembre de 1773, en el puerto de Boston." },
    { id: "ec-terror", texto: "El Terror", categoria: "Francia", explicacion: "Período de represión y ejecuciones entre 1793 y 1794." },
    { id: "ec-telar", texto: "Telar mecánico", categoria: "Industrial", explicacion: "Inventado por Edmund Cartwright en 1785." },
    { id: "ec-yorktown", texto: "Batalla de Yorktown", categoria: "Estados Unidos", explicacion: "Octubre de 1781: rendición británica con apoyo de la flota francesa." },
    { id: "ec-estados", texto: "Los tres estados: clero, nobleza y Tercer Estado", categoria: "Francia", explicacion: "La división estamental de la sociedad francesa antes de 1789." },
    { id: "ec-carbon", texto: "El carbón como fuente de energía de las fábricas", categoria: "Industrial", explicacion: "El combustible que movió las máquinas de vapor británicas." },
  ],
};

/* --- Actividad de relacionar dentro de la evaluacion ---------------------- */

export const RELACIONAR_EVALUACION = {
  id: "ev-relacionar",
  consigna: "Relacioná cada causa con la consecuencia que produjo.",
  pares: [
    {
      id: "er-1",
      izquierda: "Gran Bretaña queda endeudada tras la Guerra de los Siete Años",
      derecha: "Cobra impuestos nuevos en las Trece Colonias y estalla el conflicto",
      explicacion: "Una deuda produce un impuesto, y ese impuesto abre la discusión sobre quién tiene derecho a decidir.",
    },
    {
      id: "er-2",
      izquierda: "Malas cosechas y suba del precio del pan en 1789",
      derecha: "Los sectores populares de París se suman a la revolución",
      explicacion: "El hambre explica por qué tanta gente salió a la calle justo en ese momento.",
    },
    {
      id: "er-3",
      izquierda: "El water frame es demasiado grande para una casa",
      derecha: "Nace la fábrica, con cientos de trabajadores bajo un mismo techo",
      explicacion: "El tamaño de una máquina terminó cambiando dónde y cómo trabajaba la gente.",
    },
    {
      id: "er-4",
      izquierda: "Los trenes circulan con horarios fijos",
      derecha: "Gran Bretaña adopta una hora única para todo el país",
      explicacion: "Una revolución en el transporte cambió algo tan cotidiano como la hora del reloj.",
    },
  ],
};
