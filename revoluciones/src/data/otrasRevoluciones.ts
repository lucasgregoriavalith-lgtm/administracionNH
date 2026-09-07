/* ===========================================================================
   REVOLUCIONES QUE NO SON LAS QUE ESTUDIAMOS
   Cada caso se presenta como un desafio con tres respuestas posibles:
   SÍ / NO / DEPENDE. Varios casos son deliberadamente discutibles: el
   objetivo es que el estudiante argumente, no que adivine.
   =========================================================================== */

export type Veredicto = "si" | "no" | "depende";

export interface CasoRevolucion {
  id: string;
  campo: string;
  titulo: string;
  situacion: string;
  /** Respuesta que la aplicacion considera mejor fundada. */
  veredicto: Veredicto;
  explicacion: string;
  /** Que hay que mirar para decidir. */
  criterio: string;
  acento: "azul" | "rojo";
}

export const CASOS_REVOLUCION: CasoRevolucion[] = [
  {
    id: "caso-imprenta",
    campo: "Revolución tecnológica",
    titulo: "La imprenta de Gutenberg",
    situacion:
      "Hacia 1450, en la ciudad alemana de Maguncia, Johannes Gutenberg desarrolló un sistema de impresión con tipos móviles de metal. Antes, cada libro se copiaba a mano, letra por letra, y podía llevar meses o años.",
    veredicto: "si",
    explicacion:
      "Sí, es una revolución. En pocas décadas los libros pasaron de ser objetos rarísimos y carísimos a multiplicarse por Europa. Cambió quién podía acceder al conocimiento y a qué velocidad viajaban las ideas. Sin imprenta, los panfletos y periódicos que alimentaron la Revolución Francesa habrían sido imposibles.",
    criterio:
      "¿Cambió de manera profunda y duradera la vida de mucha gente? Sí. ¿Hizo falta una guerra? No. Eso confirma que una revolución no necesita violencia.",
    acento: "azul",
  },
  {
    id: "caso-copernico",
    campo: "Revolución científica",
    titulo: "La Tierra deja de ser el centro",
    situacion:
      "En 1543 Nicolás Copérnico publicó un libro donde sostenía que la Tierra gira alrededor del Sol. Durante siglos se había enseñado exactamente lo contrario.",
    veredicto: "si",
    explicacion:
      "Sí. No cambió un dato: cambió el lugar de la humanidad en el universo y, sobre todo, la forma de buscar respuestas. Galileo, Kepler y Newton continuaron ese camino durante los 150 años siguientes. Es un buen ejemplo de revolución lenta: la idea tardó mucho en ser aceptada.",
    criterio:
      "Una revolución de ideas puede tardar generaciones en completarse y aun así ser profundísima.",
    acento: "azul",
  },
  {
    id: "caso-fosbury",
    campo: "Revolución deportiva",
    titulo: "Saltar de espaldas",
    situacion:
      "En los Juegos Olímpicos de México 1968, Dick Fosbury ganó el salto en alto pasando el listón de espaldas, con una técnica que casi nadie usaba. En pocos años, prácticamente todos los saltadores del mundo la adoptaron.",
    veredicto: "si",
    explicacion:
      "Sí, dentro de su campo. Transformó por completo cómo se practica una disciplina deportiva: hoy es imposible ver un salto en alto de alto nivel con la técnica anterior. Es una revolución acotada a un deporte, pero dentro de ese mundo el cambio fue total y definitivo.",
    criterio:
      "Ojo con el alcance: una revolución puede transformar por completo un campo sin cambiar la sociedad entera. Por eso decimos 'revolución deportiva' y no simplemente 'revolución'.",
    acento: "rojo",
  },
  {
    id: "caso-impresionismo",
    campo: "Revolución artística",
    titulo: "Pintar la luz, no el detalle",
    situacion:
      "En 1874 un grupo de pintores de París, entre ellos Claude Monet, organizó su propia exposición porque los salones oficiales rechazaban sus obras por parecer 'sin terminar'. Pintaban con pinceladas sueltas y rápidas, buscando capturar la luz de un instante.",
    veredicto: "si",
    explicacion:
      "Sí. Cambió qué se consideraba una obra de arte terminada y quién decidía eso. Abrió la puerta a casi todo el arte moderno posterior. Además muestra algo típico de las revoluciones: al principio fueron rechazados y ridiculizados; el propio nombre 'impresionistas' salió de una crítica burlona.",
    criterio:
      "Muchas revoluciones empiezan siendo minoría y siendo criticadas. Eso no dice nada sobre si van a transformar o no su campo.",
    acento: "rojo",
  },
  {
    id: "caso-internet",
    campo: "Revolución digital",
    titulo: "Internet y el teléfono en el bolsillo",
    situacion:
      "En apenas tres décadas, internet y los teléfonos inteligentes cambiaron cómo la gente se comunica, estudia, trabaja, compra, se informa y se entretiene.",
    veredicto: "si",
    explicacion:
      "Sí, y además es una revolución que estás viviendo por dentro. Cumple todas las señales: cambio profundo, afecta a miles de millones de personas y sigue evolucionando. La diferencia con las otras es que todavía no se puede saber cómo terminará, porque no terminó.",
    criterio:
      "Es más difícil juzgar una revolución mientras ocurre que cien años después. Los historiadores del futuro tendrán más información que nosotros.",
    acento: "azul",
  },
  {
    id: "caso-moda",
    campo: "Un caso para discutir",
    titulo: "Una moda que dura un verano",
    situacion:
      "Un estilo de ropa se pone de moda, todo el mundo lo usa durante unos meses y al verano siguiente ya nadie lo lleva.",
    veredicto: "no",
    explicacion:
      "No es una revolución. Es un cambio real, pero superficial y pasajero: al poco tiempo, todo vuelve a funcionar como antes. Una revolución deja una marca que no se borra. Este ejemplo sirve para probar la definición: si con el tiempo todo vuelve al punto de partida, no fue una revolución.",
    criterio:
      "Dos preguntas de control: ¿el cambio fue profundo o de superficie? ¿Duró o se deshizo solo?",
    acento: "rojo",
  },
  {
    id: "caso-partido",
    campo: "Un caso para discutir",
    titulo: "Gana las elecciones otro partido",
    situacion:
      "En un país democrático hay elecciones y gana un partido distinto del que gobernaba. El presidente y los ministros cambian.",
    veredicto: "no",
    explicacion:
      "No, no es una revolución. Es exactamente lo contrario: es el sistema funcionando como está previsto. Las reglas, la constitución y los derechos siguen siendo los mismos; solo cambian las personas que ocupan los cargos. Una revolución cambia las reglas, no solamente los jugadores.",
    criterio:
      "Esta es la trampa más común. Cambio de gobierno no es igual a revolución.",
    acento: "azul",
  },
  {
    id: "caso-vapor-mina",
    campo: "Un caso para discutir",
    titulo: "Una máquina nueva en una sola fábrica",
    situacion:
      "El dueño de una fábrica compra una máquina nueva que produce el doble. Ninguna otra fábrica la adopta y, cuando se rompe, vuelven a trabajar como antes.",
    veredicto: "no",
    explicacion:
      "No. Un invento, por bueno que sea, no alcanza. Para que haya revolución tecnológica, la novedad tiene que difundirse y cambiar la manera de hacer las cosas de mucha gente. La máquina de vapor fue revolucionaria porque se extendió por miles de minas y fábricas durante décadas, no porque funcionara bien en un solo lugar.",
    criterio:
      "Un invento aislado es un invento. Un invento que se difunde y transforma cómo vive la gente puede ser una revolución.",
    acento: "rojo",
  },
  {
    id: "caso-derechos-mujeres",
    campo: "Revolución social",
    titulo: "Las mujeres conquistan el derecho al voto",
    situacion:
      "Nueva Zelanda reconoció el voto femenino en elecciones nacionales en 1893. Otros países fueron sumándose a lo largo del siglo XX: en Argentina las mujeres votaron por primera vez en 1951 y en Francia en 1945.",
    veredicto: "si",
    explicacion:
      "Sí. Cambió quién cuenta como ciudadano con voz para decidir. Es una revolución social conseguida a lo largo de décadas, país por país, con organización y reclamo. Recordá a Olympe de Gouges: ya lo pedía en 1791, más de cien años antes.",
    criterio:
      "Que un cambio sea lento y sin batallas no lo hace menos revolucionario. Lo que importa es la profundidad de la transformación.",
    acento: "rojo",
  },
  {
    id: "caso-siete-anos",
    campo: "Un caso para discutir",
    titulo: "Una guerra enorme entre potencias",
    situacion:
      "Entre 1756 y 1763, Gran Bretaña, Francia y otras potencias libraron la Guerra de los Siete Años en varios continentes. Murieron cientos de miles de personas y algunos territorios cambiaron de dueño.",
    veredicto: "no",
    explicacion:
      "No fue una revolución, aunque fue una guerra gigantesca. Cambió mapas y colonias, pero no transformó por dentro a esas sociedades: Francia y Gran Bretaña siguieron siendo monarquías organizadas igual que antes. Es el mejor ejemplo de que guerra y revolución no son lo mismo. Eso sí: la deuda que dejó fue una de las causas de las dos revoluciones que estudiaste.",
    criterio:
      "Preguntá siempre: después de esto, ¿la sociedad quedó organizada de otra manera? Si la respuesta es no, hubo guerra pero no revolución.",
    acento: "azul",
  },
];
