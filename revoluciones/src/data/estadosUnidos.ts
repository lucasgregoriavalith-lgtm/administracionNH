import type { Curiosidad, Evento } from "@/lib/tipos";

/* ===========================================================================
   INDEPENDENCIA DE ESTADOS UNIDOS
   Fuentes de referencia: cronologia estandar del periodo 1763-1783.
   Nota de rigor: este proceso y la Revolucion Francesa comparten ideas de
   epoca, pero NO son el mismo tipo de proceso. Ver `ADVERTENCIA_COMPARACION`.
   =========================================================================== */

export const INTRO_EEUU = {
  titulo: "Independencia de Estados Unidos",
  fechaClave: "1776",
  subtitulo: "Trece colonias que se convirtieron en un país nuevo",
  entrada:
    "En la costa este de América del Norte había trece colonias que pertenecían a Gran Bretaña. Entre 1765 y 1783, sus habitantes pasaron de protestar por unos impuestos a declararse independientes, ganar una guerra y fundar un Estado nuevo.",
  porQueEsRevolucion:
    "No fue solamente un cambio de bandera. Cambió quién tenía derecho a decidir las leyes y los impuestos: se pasó de obedecer a un rey y a un Parlamento lejano a construir una república con una constitución escrita. Ese cambio en la idea del poder es lo que lo convierte en un proceso revolucionario.",
};

export const ADVERTENCIA_COMPARACION =
  "Atención: la independencia de Estados Unidos y la Revolución Francesa ocurrieron en años cercanos y compartieron ideas de la época, como los derechos y la soberanía del pueblo. Pero no fueron lo mismo. En América del Norte, unas colonias se separaron de una potencia extranjera. En Francia, una sociedad transformó por dentro su propia organización. Son procesos relacionados, pero diferentes.";

export const CONTEXTO_EEUU = [
  {
    id: "colonias",
    titulo: "Las Trece Colonias",
    texto:
      "Eran trece territorios británicos en la costa atlántica de América del Norte. Cada uno tenía su propia asamblea local y sus propias costumbres, pero todos dependían del rey y del Parlamento de Gran Bretaña.",
  },
  {
    id: "dominio",
    titulo: "El dominio británico",
    texto:
      "Gran Bretaña decidía con quién podían comerciar las colonias y qué impuestos debían pagar. Durante mucho tiempo ese control fue bastante flojo, y los colonos se acostumbraron a resolver por su cuenta buena parte de sus asuntos.",
  },
  {
    id: "deuda",
    titulo: "Una guerra cara",
    texto:
      "La Guerra de los Siete Años terminó en 1763 con victoria británica, pero dejó al gobierno de Londres con una deuda enorme. Para pagarla decidió cobrar nuevos impuestos en las colonias, que hasta entonces habían aportado poco.",
  },
  {
    id: "representacion",
    titulo: "El problema de la representación",
    texto:
      "Los colonos no tenían representantes en el Parlamento británico, que estaba en Londres. Por eso sostenían que ese Parlamento no tenía derecho a cobrarles impuestos nuevos. De ahí viene la frase que repetían: 'ningún impuesto sin representación'.",
  },
  {
    id: "tension",
    titulo: "La tensión crece",
    texto:
      "Cada impuesto nuevo provocaba protestas, boicots y a veces enfrentamientos. Gran Bretaña respondía con leyes más duras, y esas leyes generaban más protestas. Así, un conflicto por dinero se fue transformando en un conflicto por quién manda.",
  },
];

export const CRONOLOGIA_EEUU: Evento[] = [
  {
    id: "eeuu-1763",
    fecha: "1763",
    titulo: "Fin de la Guerra de los Siete Años",
    resumen: "Gran Bretaña gana la guerra, pero queda endeudada.",
    explicacion:
      "El Tratado de París de 1763 cerró una guerra que enfrentó a Gran Bretaña y Francia en varios continentes. Gran Bretaña ganó y se quedó con enormes territorios en América del Norte, pero también con una deuda muy grande.",
    importancia:
      "Es el punto de partida del conflicto: para pagar esa deuda, Londres decidió cobrar más impuestos en las colonias.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1765",
    fecha: "1765",
    titulo: "Ley del Timbre",
    resumen: "Un impuesto sobre casi todo lo que se imprimía.",
    explicacion:
      "El Parlamento británico aprobó la Ley del Timbre (Stamp Act), que obligaba a comprar papel sellado para documentos, contratos, periódicos y hasta naipes. Las protestas fueron tan fuertes que la ley fue derogada al año siguiente, en 1766.",
    importancia:
      "Fue la primera vez que las trece colonias protestaron juntas y coordinadas. Ahí nació el reclamo 'ningún impuesto sin representación'.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1770",
    fecha: "1770",
    fechaExacta: "5 de marzo de 1770",
    titulo: "Masacre de Boston",
    resumen: "Soldados británicos disparan contra una multitud: cinco muertos.",
    explicacion:
      "En una calle de Boston, un grupo de vecinos se enfrentó a gritos y empujones con soldados británicos. Los soldados dispararon y murieron cinco personas. Los colonos difundieron el hecho con grabados e impresos que lo mostraban como una matanza.",
    importancia:
      "Muestra cómo un episodio concreto puede convertirse en símbolo. Más que por el número de víctimas, importó por cómo se contó y por la indignación que despertó.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1773",
    fecha: "1773",
    fechaExacta: "16 de diciembre de 1773",
    titulo: "Motín del té de Boston",
    resumen: "Colonos arrojan al mar cargamentos enteros de té.",
    explicacion:
      "Un grupo de colonos, algunos disfrazados de indígenas mohawk, subió a tres barcos en el puerto de Boston y tiró al agua todo el té que transportaban, en protesta contra una ley que favorecía a la Compañía Británica de las Indias Orientales.",
    importancia:
      "Gran Bretaña respondió con leyes de castigo muy duras que cerraron el puerto de Boston. Esas leyes unieron a las colonias en contra de Londres como nunca antes.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1774",
    fecha: "1774",
    titulo: "Primer Congreso Continental",
    resumen: "Doce colonias se reúnen en Filadelfia para responder juntas.",
    explicacion:
      "Delegados de doce de las trece colonias (faltó Georgia) se reunieron en Filadelfia entre septiembre y octubre de 1774. Acordaron un boicot comercial contra Gran Bretaña y reclamaron que se retiraran las leyes de castigo. Todavía no pedían la independencia.",
    importancia:
      "Por primera vez las colonias actuaron como un cuerpo político común. Es el paso de trece protestas separadas a una sola voz.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1775",
    fecha: "1775",
    fechaExacta: "19 de abril de 1775",
    titulo: "Comienza la guerra de independencia",
    resumen: "Los combates de Lexington y Concord abren ocho años de guerra.",
    explicacion:
      "Tropas británicas salieron de Boston para incautar armas guardadas por los colonos. En los pueblos de Lexington y Concord se produjeron los primeros combates. Poco después, el Segundo Congreso Continental organizó un ejército y puso al frente a George Washington.",
    importancia:
      "El conflicto político se convirtió en guerra. Pero atención: en 1775 la mayoría todavía no pedía la independencia, sino que se respetaran sus derechos.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1776",
    fecha: "1776",
    fechaExacta: "4 de julio de 1776",
    titulo: "Declaración de Independencia",
    resumen: "Las Trece Colonias se declaran Estados libres e independientes.",
    explicacion:
      "El Segundo Congreso Continental, reunido en Filadelfia, aprobó la Declaración de Independencia. El texto fue redactado principalmente por Thomas Jefferson, dentro de una comisión que integraban además John Adams, Benjamin Franklin, Roger Sherman y Robert Livingston.",
    importancia:
      "Cambió el objetivo de la guerra: ya no se peleaba por mejores condiciones dentro del Imperio británico, sino por existir como país nuevo. Por eso 1776 es la fecha fundacional de Estados Unidos.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1781",
    fecha: "1781",
    fechaExacta: "19 de octubre de 1781",
    titulo: "Victoria en Yorktown",
    resumen: "El ejército británico se rinde en Virginia.",
    explicacion:
      "En Yorktown, un ejército británico al mando de Charles Cornwallis quedó rodeado por tierra por las tropas de Washington y de Rochambeau, y por mar por la flota francesa del almirante De Grasse, que le impidió escapar o recibir ayuda. Tuvo que rendirse.",
    importancia:
      "Fue la última gran batalla de la guerra. Muestra hasta qué punto la ayuda francesa fue decisiva: sin esa flota, el cerco no habría funcionado.",
    tema: "eeuu",
  },
  {
    id: "eeuu-1783",
    fecha: "1783",
    fechaExacta: "3 de septiembre de 1783",
    titulo: "Tratado de París",
    resumen: "Gran Bretaña reconoce la independencia de Estados Unidos.",
    explicacion:
      "Con la firma del Tratado de París, Gran Bretaña reconoció oficialmente a Estados Unidos como nación independiente y fijó sus fronteras. La guerra había durado ocho años.",
    importancia:
      "Cierra el proceso de independencia. Unos años después, en 1787, se redactó la Constitución que organizó el nuevo Estado.",
    tema: "eeuu",
  },
];

export const CURIOSIDADES_EEUU: Curiosidad[] = [
  {
    id: "cur-eeuu-trece",
    titulo: "¿Por qué se dice 'Trece Colonias'?",
    texto:
      "Porque eran exactamente trece los territorios británicos de la costa atlántica que se declararon independientes en 1776. Gran Bretaña tenía otras colonias en América, como Canadá o varias islas del Caribe, pero esas no se sumaron. Las trece barras de la bandera estadounidense recuerdan a esas colonias fundadoras.",
    tema: "eeuu",
  },
  {
    id: "cur-eeuu-francia",
    titulo: "¿Qué importancia tuvo Francia?",
    texto:
      "Fue enorme. Francia era rival de Gran Bretaña y vio la oportunidad de debilitarla. Tras la victoria estadounidense en Saratoga (1777), Francia firmó una alianza formal en 1778 y envió dinero, armas, soldados y barcos. En Yorktown, en 1781, la flota francesa fue clave para atrapar al ejército británico. Detalle importante: esa ayuda salió muy cara y agravó la crisis económica que Francia arrastraba pocos años antes de su propia revolución.",
    tema: "eeuu",
  },
  {
    id: "cur-eeuu-jefferson",
    titulo: "¿Quién escribió la Declaración de Independencia?",
    texto:
      "El borrador principal lo escribió Thomas Jefferson, que en ese momento tenía 33 años. Pero no trabajó solo: formaba parte de una comisión de cinco personas, y el Congreso discutió y modificó el texto antes de aprobarlo el 4 de julio de 1776.",
    tema: "eeuu",
  },
  {
    id: "cur-eeuu-vida",
    titulo: "¿Cómo era la vida en las colonias?",
    texto:
      "La mayoría de la población vivía en el campo y trabajaba la tierra. Había ciudades portuarias importantes como Boston, Nueva York, Filadelfia y Charleston, donde se concentraban el comercio y los periódicos. Hay algo que no se puede omitir: en varias colonias, sobre todo en el sur, la economía dependía del trabajo de personas esclavizadas. La Declaración proclamaba que todos los hombres son creados iguales, pero la esclavitud siguió existiendo en Estados Unidos durante casi noventa años más.",
    tema: "eeuu",
  },
  {
    id: "cur-eeuu-yorktown",
    titulo: "¿Qué pasó en Yorktown?",
    texto:
      "El ejército británico de Cornwallis se refugió en la península de Yorktown esperando que la marina británica lo evacuara o le llevara refuerzos. Pero la flota francesa llegó primero y bloqueó la salida al mar. Rodeado por tierra y por agua, Cornwallis se rindió el 19 de octubre de 1781 con unos 7.000 soldados.",
    tema: "eeuu",
  },
  {
    id: "cur-eeuu-1776",
    titulo: "¿Por qué 1776 es una fecha fundamental?",
    texto:
      "Porque es el momento en que el objetivo cambia. Antes de 1776 los colonos reclamaban derechos dentro del Imperio británico. Desde el 4 de julio de 1776 reclaman existir como país propio. Un dato curioso: el Congreso votó la independencia el 2 de julio y aprobó el texto de la Declaración el 4. La fecha que quedó como fiesta nacional fue la del texto.",
    tema: "eeuu",
  },
];
