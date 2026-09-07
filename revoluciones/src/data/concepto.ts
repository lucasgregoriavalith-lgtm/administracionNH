import type { Concepto, Opcion, TipoRevolucion } from "@/lib/tipos";

/* ===========================================================================
   PANTALLA 1 — ACTIVAR EL PENSAMIENTO
   El estudiante elige antes de que la aplicacion diga nada. Puede marcar
   varias opciones o indicar que ninguna le convence.
   =========================================================================== */

export const HIPOTESIS_REVOLUCION: Opcion[] = [
  {
    id: "guerra",
    texto: "Una revolución siempre significa una guerra.",
    devolucion:
      "Incorrecta. Algunas revoluciones incluyeron guerras, como la independencia de Estados Unidos. Pero otras cambiaron una sociedad sin un enfrentamiento armado, como la Revolución Industrial. La guerra puede acompañar a una revolución; no la define.",
  },
  {
    id: "protesta",
    texto: "Una revolución es simplemente una protesta.",
    devolucion:
      "Incompleta. Muchas revoluciones empezaron con protestas, pero una protesta sola no alcanza. Para que haya revolución, la sociedad tiene que quedar transformada de manera profunda y duradera.",
  },
  {
    id: "cambio",
    texto: "Una revolución es un cambio profundo que transforma una sociedad.",
    devolucion:
      "Correcta. Esta es la idea central. Lo que define a una revolución no es la violencia ni la protesta, sino la profundidad del cambio que deja atrás.",
  },
  {
    id: "gobierno",
    texto: "Una revolución ocurre solamente cuando cambia un gobierno.",
    devolucion:
      "Incompleta. Un cambio de gobierno puede ser parte de una revolución política, pero hay revoluciones que no tocan el gobierno: la imprenta, el ferrocarril o la vacuna transformaron la vida de millones de personas sin cambiar quién gobernaba.",
  },
];

export const ID_HIPOTESIS_CORRECTA = ["cambio"];

/* ===========================================================================
   PANTALLA 2 — REVOLUCIÓN ≠ CONFLICTO ≠ GUERRA
   =========================================================================== */

export interface ColumnaComparativa {
  id: string;
  titulo: string;
  definicion: string;
  senal: string;
  ejemplo: string;
  acento: "azul" | "rojo" | "neutro";
}

export const REVOLUCION_CONFLICTO_GUERRA: ColumnaComparativa[] = [
  {
    id: "revolucion",
    titulo: "Revolución",
    definicion: "Un cambio profundo que transforma una sociedad.",
    senal: "Después, las cosas ya no vuelven a funcionar como antes.",
    ejemplo:
      "La Revolución Industrial cambió cómo se producía, dónde vivía la gente y en qué trabajaba. No hubo una guerra que la provocara.",
    acento: "azul",
  },
  {
    id: "conflicto",
    titulo: "Conflicto",
    definicion:
      "Una situación en la que hay intereses, ideas o posiciones enfrentadas.",
    senal: "Hay desacuerdo, pero no necesariamente armas ni transformación.",
    ejemplo:
      "Entre 1765 y 1775 hubo un largo conflicto entre las Trece Colonias y Gran Bretaña por los impuestos, mucho antes de que empezara la guerra.",
    acento: "neutro",
  },
  {
    id: "guerra",
    titulo: "Guerra",
    definicion:
      "Un enfrentamiento armado y organizado entre grupos o entre Estados.",
    senal: "Hay ejércitos, batallas y víctimas.",
    ejemplo:
      "La Guerra de los Siete Años (1756-1763) fue una guerra enorme entre potencias europeas, pero no fue una revolución: no transformó por dentro a esas sociedades.",
    acento: "rojo",
  },
];

/** Las cuatro relaciones que el estudiante tiene que poder explicar. */
export const RELACIONES_CLAVE = [
  {
    id: "conflicto-sin-revolucion",
    frase: "Puede haber conflicto sin revolución.",
    ejemplo:
      "Dos países pueden discutir durante años por un impuesto o una frontera sin que ninguna de las dos sociedades cambie por dentro.",
  },
  {
    id: "guerra-sin-revolucion",
    frase: "Puede haber guerra sin revolución.",
    ejemplo:
      "La Guerra de los Siete Años cambió mapas y colonias, pero no transformó la forma de vivir, trabajar o gobernar de esas sociedades.",
  },
  {
    id: "revolucion-con-guerra",
    frase: "Una revolución puede incluir una guerra.",
    ejemplo:
      "Las Trece Colonias necesitaron ocho años de guerra (1775-1783) para lograr su independencia y fundar un país nuevo.",
  },
  {
    id: "revolucion-sin-guerra",
    frase: "Una revolución también puede ocurrir sin guerra.",
    ejemplo:
      "La Revolución Industrial transformó Gran Bretaña con máquinas, fábricas y ferrocarriles, no con ejércitos.",
  },
];

/* ===========================================================================
   DEFINICIÓN CENTRAL
   =========================================================================== */

export const DEFINICION_CENTRAL =
  "Una revolución es un cambio profundo que transforma una sociedad. Puede desarrollarse durante un período determinado, durar muchos años hasta completar su proceso o continuar evolucionando hasta nuestros días.";

export const DEFINICION_PARA_NINOS =
  "Revolucionar algo significa que la manera en que funcionaba cambia profundamente. A veces el cambio ocurre rápidamente y otras veces se desarrolla durante muchos años.";

/** Palabras pulsables dentro de la definicion. */
export const PALABRAS_DEFINICION: Concepto[] = [
  {
    id: "cambio",
    termino: "Cambio",
    definicion: "Algo deja de ser como era y pasa a ser de otra manera.",
    ejemplo:
      "Antes la ropa se hilaba a mano en las casas. Después se hiló con máquinas en fábricas. Eso es un cambio.",
  },
  {
    id: "profundo",
    termino: "Profundo",
    definicion:
      "No es un cambio de superficie: alcanza la base de cómo funcionan las cosas.",
    ejemplo:
      "Cambiar el nombre de una calle es superficial. Cambiar quién puede decidir las leyes es profundo.",
  },
  {
    id: "sociedad",
    termino: "Sociedad",
    definicion:
      "El conjunto de personas que viven juntas, con sus reglas, trabajos, costumbres y formas de organizarse.",
    ejemplo:
      "La sociedad francesa de 1789 estaba dividida en tres grupos con derechos muy distintos entre sí.",
  },
  {
    id: "proceso",
    termino: "Proceso",
    definicion:
      "Una serie de acontecimientos encadenados que ocurren a lo largo del tiempo, no un solo momento.",
    ejemplo:
      "La Revolución Francesa no fue solo el 14 de julio de 1789: fue un proceso de diez años, con avances, retrocesos y cambios de rumbo.",
  },
  {
    id: "evolucion",
    termino: "Evolución",
    definicion:
      "Un cambio que sigue desarrollándose y transformándose después de haber empezado.",
    ejemplo:
      "La Revolución Industrial empezó con la máquina de vapor y siguió evolucionando hasta la electricidad, el automóvil y las computadoras.",
  },
];

/* ===========================================================================
   ¿TODAS LAS REVOLUCIONES SON IGUALES?
   Ocho campos distintos, con ejemplos historicos comprobables.
   =========================================================================== */

export const TIPOS_DE_REVOLUCION: TipoRevolucion[] = [
  {
    id: "politica",
    nombre: "Política",
    campo: "Poder y gobierno",
    queEs:
      "Un cambio profundo en la forma de organizar el poder: quién gobierna, con qué reglas y con qué derechos.",
    ejemplo:
      "La Revolución Francesa. En 1789 Francia era una monarquía donde el rey concentraba el poder. En 1792 se proclamó la República.",
    queCambio:
      "El poder dejó de justificarse en el nacimiento y en la tradición, y pasó a discutirse en términos de leyes, derechos y ciudadanía.",
    porQueEsRevolucionaria:
      "No cambió solamente el gobernante: cambió la idea misma de quién tiene derecho a gobernar.",
    acento: "rojo",
  },
  {
    id: "social",
    nombre: "Social",
    campo: "Formas de vivir y de relacionarse",
    queEs:
      "Una transformación profunda en cómo viven las personas, qué derechos tienen y cómo se relacionan entre sí.",
    ejemplo:
      "El reconocimiento del voto femenino. Nueva Zelanda fue el primer país en reconocer el derecho de las mujeres a votar en elecciones nacionales, en 1893.",
    queCambio:
      "La mitad de la población pasó de no poder elegir a sus gobernantes a poder hacerlo.",
    porQueEsRevolucionaria:
      "Cambió quién cuenta como ciudadano con voz. Fue un cambio lento, conseguido a lo largo de décadas y en cada país en un momento distinto.",
    acento: "azul",
  },
  {
    id: "industrial",
    nombre: "Industrial",
    campo: "Producción y trabajo",
    queEs:
      "Un cambio profundo en la manera de producir las cosas y de organizar el trabajo.",
    ejemplo:
      "La Revolución Industrial, iniciada en Gran Bretaña en la segunda mitad del siglo XVIII.",
    queCambio:
      "Se pasó del taller artesanal y el trabajo manual a la fábrica, la máquina y la producción a gran escala.",
    porQueEsRevolucionaria:
      "Transformó el trabajo, el transporte, las ciudades y hasta el horario de la vida cotidiana. Y siguió evolucionando durante más de dos siglos.",
    acento: "azul",
  },
  {
    id: "tecnologica",
    nombre: "Tecnológica",
    campo: "Herramientas e inventos",
    queEs:
      "Un cambio provocado por una tecnología nueva que se difunde y modifica la vida de mucha gente.",
    ejemplo:
      "La imprenta de tipos móviles de Johannes Gutenberg, en Maguncia, hacia 1450.",
    queCambio:
      "Copiar un libro dejó de llevar meses de trabajo a mano. Los libros se volvieron mucho más baratos y las ideas empezaron a viajar mucho más rápido y más lejos.",
    porQueEsRevolucionaria:
      "Sin la imprenta habría sido mucho más difícil que se difundieran las ideas que después alimentaron otras revoluciones.",
    acento: "azul",
  },
  {
    id: "cientifica",
    nombre: "Científica",
    campo: "Formas de entender el mundo",
    queEs:
      "Ideas nuevas que cambian la manera en que comprendemos la naturaleza y el universo.",
    ejemplo:
      "En 1543 Nicolás Copérnico publicó un libro donde sostenía que la Tierra gira alrededor del Sol, y no al revés.",
    queCambio:
      "La Tierra dejó de ser considerada el centro inmóvil del universo. Científicos posteriores como Galileo, Kepler y Newton siguieron ese camino.",
    porQueEsRevolucionaria:
      "Cambió no solo una respuesta, sino la forma de buscar respuestas: observar, medir y comprobar.",
    acento: "azul",
  },
  {
    id: "artistica",
    nombre: "Artística",
    campo: "Formas de crear y representar",
    queEs:
      "Nuevas maneras de crear y de representar la realidad que rompen con lo que se consideraba correcto.",
    ejemplo:
      "El impresionismo. En 1874 un grupo de pintores de París, entre ellos Claude Monet, hizo su propia exposición porque los salones oficiales rechazaban su forma de pintar.",
    queCambio:
      "En lugar de buscar un acabado perfecto y detallado, pintaban con pinceladas sueltas la luz y el instante.",
    porQueEsRevolucionaria:
      "Cambió qué se consideraba una obra de arte terminada, y abrió la puerta a casi todo el arte moderno posterior.",
    acento: "rojo",
  },
  {
    id: "musical",
    nombre: "Musical",
    campo: "Cómo se hace y se escucha la música",
    queEs:
      "Transformaciones en los estilos musicales o en la manera de producir, guardar y escuchar música.",
    ejemplo:
      "La grabación del sonido. En 1877 Thomas Edison presentó el fonógrafo, el primer aparato capaz de grabar y reproducir sonido.",
    queCambio:
      "Hasta entonces, para escuchar música había que estar presente mientras alguien la tocaba. Después se pudo guardar y volver a escuchar cuando uno quisiera.",
    porQueEsRevolucionaria:
      "Cambió la relación de las personas con la música. Ese proceso siguió evolucionando: radio, disco, casete, CD y hoy la música en internet.",
    acento: "azul",
  },
  {
    id: "deportiva",
    nombre: "Deportiva",
    campo: "Técnicas y formas de competir",
    queEs:
      "Un cambio profundo en las técnicas, las estrategias o el entrenamiento de un deporte.",
    ejemplo:
      "En los Juegos Olímpicos de México 1968, el estadounidense Dick Fosbury ganó el salto en alto pasando el listón de espaldas, con una técnica que casi nadie usaba.",
    queCambio:
      "La técnica, hoy llamada 'estilo Fosbury', permitió saltar más alto que las formas anteriores.",
    porQueEsRevolucionaria:
      "En pocos años prácticamente todos los saltadores del mundo la adoptaron. Una sola idea cambió por completo cómo se practica una disciplina.",
    acento: "rojo",
  },
];
