import type { Concepto, Curiosidad, Evento, Personaje } from "@/lib/tipos";

/* ===========================================================================
   REVOLUCIÓN FRANCESA (1789-1799)
   La secuencia no se simplifica: la revolucion tuvo etapas distintas, con
   avances y retrocesos, y no fue un unico grupo el que la condujo.
   =========================================================================== */

export const INTRO_FRANCIA = {
  titulo: "Revolución Francesa",
  fechaClave: "1789",
  subtitulo: "Cuando una sociedad decidió cambiarse a sí misma",
  entrada:
    "Francia era uno de los reinos más poderosos de Europa. En 1789, en pocos meses, sus habitantes cuestionaron el poder del rey, escribieron una declaración de derechos y empezaron a rehacer las reglas de su propia sociedad.",
  porQueEsRevolucion:
    "Porque no cambió solamente quién gobernaba. Cambió la idea de en qué se apoya el poder: se pasó de un rey que gobernaba por nacimiento a la idea de que la autoridad viene del conjunto de los ciudadanos. Fue un proceso largo, con etapas muy distintas entre sí y con episodios de gran violencia.",
};

export const CONTEXTO_FRANCIA = [
  {
    id: "monarquia",
    titulo: "Una monarquía absoluta",
    texto:
      "Francia era gobernada por un rey, Luis XVI, que reinaba desde 1774. El rey concentraba el poder: hacía las leyes, nombraba a los ministros y decidía sobre la guerra y la paz. No existía un parlamento que lo controlara de manera permanente.",
  },
  {
    id: "estamentos",
    titulo: "Una sociedad dividida en tres",
    texto:
      "La sociedad estaba organizada en tres grupos llamados estados o estamentos. No se elegían: se nacía en ellos. Y no tenían los mismos derechos ni pagaban los mismos impuestos.",
  },
  {
    id: "economia",
    titulo: "Un Estado sin dinero",
    texto:
      "La monarquía estaba muy endeudada, en parte por las guerras y por la ayuda enviada a los independentistas de América del Norte. Necesitaba cobrar más impuestos, pero los grupos privilegiados se resistían a pagar.",
  },
  {
    id: "pan",
    titulo: "Malas cosechas y pan caro",
    texto:
      "Las cosechas de 1788 fueron malas y el invierno siguiente, muy duro. El precio del pan subió muchísimo. Para las familias trabajadoras, el pan era el alimento principal, así que ese aumento se sintió como hambre inmediata.",
  },
  {
    id: "ilustracion",
    titulo: "Ideas nuevas: la Ilustración",
    texto:
      "Durante el siglo XVIII, pensadores como Montesquieu, Voltaire y Rousseau discutieron ideas que hasta entonces casi no se cuestionaban: que el poder debe estar dividido y limitado, que las leyes deben ser iguales para todos y que la autoridad viene del pueblo. Esas ideas circulaban en libros, periódicos y cafés.",
  },
];

/** Los tres estados. Las proporciones son estimaciones de los historiadores. */
export const TRES_ESTADOS = [
  {
    id: "clero",
    nombre: "Primer Estado",
    quienes: "El clero",
    proporcion: 0.5,
    proporcionTexto: "menos del 1 % de la población",
    privilegios:
      "Estaba exento de casi todos los impuestos y cobraba un aporte llamado diezmo. Dentro del clero había diferencias enormes: los obispos solían ser nobles y muy ricos, mientras que muchos curas de pueblo vivían con lo justo.",
    acento: "azul" as const,
  },
  {
    id: "nobleza",
    nombre: "Segundo Estado",
    quienes: "La nobleza",
    proporcion: 1.5,
    proporcionTexto: "alrededor del 1,5 % de la población",
    privilegios:
      "Tenía privilegios de nacimiento: exenciones de impuestos, derechos sobre las tierras y acceso preferente a los cargos importantes del ejército y del gobierno.",
    acento: "rojo" as const,
  },
  {
    id: "tercer-estado",
    nombre: "Tercer Estado",
    quienes:
      "Todos los demás: campesinos, artesanos, comerciantes, abogados, médicos, trabajadores urbanos",
    proporcion: 98,
    proporcionTexto: "cerca del 98 % de la población",
    privilegios:
      "No tenía privilegios y pagaba la mayor parte de los impuestos. Dentro del Tercer Estado convivían realidades muy distintas: comerciantes ricos y campesinos pobres estaban en el mismo grupo legal.",
    acento: "neutro" as const,
  },
];

export const CRONOLOGIA_FRANCIA: Evento[] = [
  {
    id: "fr-estados-generales",
    fecha: "1789",
    fechaExacta: "5 de mayo de 1789",
    titulo: "Estados Generales",
    resumen: "El rey convoca a los tres estados para resolver la crisis.",
    explicacion:
      "Sin dinero y sin acuerdo, Luis XVI convocó a los Estados Generales, una asamblea de los tres estados que no se reunía desde 1614. Enseguida apareció el problema: si se votaba por estado, clero y nobleza siempre ganaban dos a uno, aunque el Tercer Estado representara a casi toda la población.",
    importancia:
      "La discusión sobre cómo votar transformó una reunión para conseguir impuestos en una discusión sobre quién representa a la nación.",
    tema: "francia",
  },
  {
    id: "fr-juego-pelota",
    fecha: "1789",
    fechaExacta: "20 de junio de 1789",
    titulo: "Juramento del Juego de Pelota",
    resumen:
      "Los diputados juran no separarse hasta dar a Francia una constitución.",
    explicacion:
      "El 17 de junio, los diputados del Tercer Estado se proclamaron Asamblea Nacional. Días después encontraron cerrada su sala de reunión y se trasladaron a una cancha de juego de pelota cercana, donde juraron no disolverse hasta haber redactado una constitución para Francia.",
    importancia:
      "Es un acto de desobediencia decisivo: una asamblea afirma que su autoridad no viene del rey, sino de a quiénes representa.",
    tema: "francia",
  },
  {
    id: "fr-bastilla",
    fecha: "1789",
    fechaExacta: "14 de julio de 1789",
    titulo: "Toma de la Bastilla",
    resumen: "El pueblo de París asalta la fortaleza-prisión real.",
    explicacion:
      "Ante el temor de que el rey usara tropas contra la Asamblea, multitudes de París buscaron armas y pólvora y atacaron la Bastilla, una vieja fortaleza usada como prisión. Tras varias horas de combate y decenas de muertos, la guarnición se rindió.",
    importancia:
      "En términos militares fue un episodio pequeño: dentro había apenas siete presos. Su fuerza fue simbólica. La Bastilla representaba el poder del rey para encarcelar sin juicio, y su caída mostró que ese poder podía ser derrotado. Desde 1880 el 14 de julio es la fiesta nacional de Francia.",
    tema: "francia",
  },
  {
    id: "fr-declaracion",
    fecha: "1789",
    fechaExacta: "26 de agosto de 1789",
    titulo: "Declaración de los Derechos del Hombre y del Ciudadano",
    resumen: "Un texto breve que proclama derechos iguales para los ciudadanos.",
    explicacion:
      "La Asamblea aprobó un texto de 17 artículos que declaraba que los hombres nacen libres e iguales en derechos, que la soberanía reside en la nación y que la ley debe ser la misma para todos. Poco antes, en la noche del 4 de agosto, la Asamblea había votado la abolición de los privilegios feudales.",
    importancia:
      "Es el documento que mejor resume la idea nueva. También conviene saber que en la práctica no todos quedaron incluidos: las mujeres no obtuvieron derechos políticos, y por eso surgieron voces como la de Olympe de Gouges reclamándolos.",
    tema: "francia",
  },
  {
    id: "fr-constitucion",
    fecha: "1791",
    fechaExacta: "3 de septiembre de 1791",
    titulo: "Primera Constitución",
    resumen: "Francia se convierte en una monarquía constitucional.",
    explicacion:
      "La Constitución de 1791 mantuvo al rey, pero con el poder limitado por una asamblea elegida y por la ley. Ya no gobernaba solo: compartía el poder.",
    importancia:
      "Muestra que la revolución no fue una línea recta hacia la república. Durante casi dos años el proyecto fue una monarquía con límites.",
    tema: "francia",
  },
  {
    id: "fr-republica",
    fecha: "1792",
    fechaExacta: "21 de septiembre de 1792",
    titulo: "Proclamación de la República",
    resumen: "Se abole la monarquía y nace la Primera República francesa.",
    explicacion:
      "El intento de fuga del rey en 1791 y la guerra contra otras monarquías europeas destruyeron la confianza en Luis XVI. Tras el asalto al palacio de las Tullerías en agosto de 1792, la nueva Convención Nacional abolió la monarquía y proclamó la República.",
    importancia:
      "Aquí se produce el cambio político más profundo: Francia deja de tener rey. Es el corazón de la revolución política.",
    tema: "francia",
  },
  {
    id: "fr-ejecucion",
    fecha: "1793",
    fechaExacta: "21 de enero de 1793",
    titulo: "Ejecución de Luis XVI",
    resumen: "El rey es juzgado, condenado y guillotinado en París.",
    explicacion:
      "La Convención juzgó a Luis XVI acusándolo de conspirar contra la nación. Fue declarado culpable y la votación sobre la pena fue muy ajustada. Fue ejecutado en la actual plaza de la Concordia.",
    importancia:
      "Impactó a toda Europa y endureció la guerra contra Francia. Marca el punto sin retorno del proceso.",
    tema: "francia",
  },
  {
    id: "fr-terror",
    fecha: "1793-1794",
    titulo: "El Terror",
    resumen: "Un período de represión y ejecuciones masivas.",
    explicacion:
      "Con Francia en guerra contra varias potencias y con revueltas internas, el Comité de Salvación Pública gobernó con medidas de excepción. Miles de personas fueron detenidas y ejecutadas acusadas de traicionar a la revolución, muchas veces con juicios muy breves.",
    importancia:
      "Es una parte difícil pero imprescindible del relato. Un proceso que había proclamado derechos iguales terminó suspendiendo esos mismos derechos en nombre de la salvación de la república. Los historiadores todavía discuten sus causas: para algunos fue producto de la guerra y el miedo, para otros de las decisiones de quienes gobernaban.",
    tema: "francia",
  },
  {
    id: "fr-termidor",
    fecha: "1794",
    fechaExacta: "28 de julio de 1794",
    titulo: "Caída de Robespierre",
    resumen: "Los propios diputados derriban al líder del Terror.",
    explicacion:
      "El 9 de termidor del año II (27 de julio de 1794), la Convención se volvió contra Maximilien Robespierre. Fue arrestado y guillotinado al día siguiente junto a varios de sus aliados.",
    importancia:
      "Termina la etapa más violenta. Muestra algo importante: las revoluciones también se vuelven contra quienes las conducen.",
    tema: "francia",
  },
  {
    id: "fr-directorio",
    fecha: "1795",
    titulo: "El Directorio",
    resumen: "Un gobierno de cinco directores intenta estabilizar la república.",
    explicacion:
      "Una nueva constitución creó el Directorio, un gobierno de cinco personas. Duró cuatro años entre crisis económicas, guerras y conspiraciones tanto de monárquicos como de revolucionarios radicales.",
    importancia:
      "Fue una etapa de inestabilidad. Esa debilidad explica que un general con prestigio militar pudiera tomar el poder poco después.",
    tema: "francia",
  },
  {
    id: "fr-brumario",
    fecha: "1799",
    fechaExacta: "9 de noviembre de 1799",
    titulo: "Golpe de Estado de Napoleón Bonaparte",
    resumen: "Un general derriba al Directorio y concentra el poder.",
    explicacion:
      "En el golpe del 18 de brumario, Napoleón Bonaparte, un general famoso por sus campañas militares, disolvió el Directorio y estableció un nuevo gobierno, el Consulado, en el que él tenía el poder principal. En 1804 se coronó emperador.",
    importancia:
      "La mayoría de los historiadores considera este golpe el final de la Revolución Francesa como proceso. Napoleón conservó algunas conquistas revolucionarias, como la igualdad ante la ley y el código civil, pero terminó con el gobierno republicano.",
    tema: "francia",
  },
];

export const PERSONAJES_FRANCIA: Personaje[] = [
  {
    id: "luis-xvi",
    nombre: "Luis XVI",
    años: "1754-1793",
    rol: "Rey de Francia (1774-1792)",
    quienEra:
      "Rey de Francia desde 1774. Heredó un reino poderoso pero con una deuda enorme.",
    papel:
      "Convocó los Estados Generales en 1789 porque necesitaba dinero. Aceptó con dudas las reformas, intentó huir del país en 1791 y fue detenido. Juzgado por la Convención, fue ejecutado en enero de 1793.",
    ideas:
      "No fue un impulsor de la revolución. Aceptó algunos cambios cuando ya no podía evitarlos y buscó apoyo en otras monarquías europeas para frenarlos.",
    relacion:
      "Es la figura central del poder que la revolución cuestiona y finalmente derriba.",
    relevancia: "central",
    acento: "azul",
  },
  {
    id: "maria-antonieta",
    nombre: "María Antonieta",
    años: "1755-1793",
    rol: "Reina de Francia",
    quienEra:
      "Archiduquesa de Austria, casada con Luis XVI. Llegó a Francia siendo muy joven.",
    papel:
      "No gobernaba, pero se convirtió en blanco de panfletos y rumores que la acusaban de gastos excesivos y de favorecer a Austria. Fue juzgada y ejecutada en octubre de 1793.",
    ideas:
      "Defendía la monarquía y buscó ayuda de su familia austríaca para sostenerla.",
    relacion:
      "Su caso muestra el peso de la propaganda: muchas de las historias que circulaban sobre ella, como la famosa frase sobre el pan y las tortas, no están respaldadas por documentos de la época.",
    relevancia: "destacada",
    acento: "neutro",
  },
  {
    id: "robespierre",
    nombre: "Maximilien Robespierre",
    años: "1758-1794",
    rol: "Abogado y diputado jacobino",
    quienEra:
      "Abogado de la ciudad de Arrás, diputado y figura principal del club de los jacobinos.",
    papel:
      "Desde julio de 1793 fue miembro del Comité de Salvación Pública, el organismo que gobernó Francia durante el Terror. Fue derribado y ejecutado en julio de 1794.",
    ideas:
      "Defendía la república, la igualdad y la virtud cívica. Sostenía que, con Francia en guerra y amenazada, era necesario aplicar medidas de excepción.",
    relacion:
      "Es una figura muy discutida por los historiadores: para algunos representa los ideales de igualdad de la revolución; para otros, la deriva autoritaria del Terror. Las dos lecturas se apoyan en hechos reales.",
    relevancia: "central",
    acento: "rojo",
  },
  {
    id: "danton",
    nombre: "Georges Danton",
    años: "1759-1794",
    rol: "Abogado y dirigente revolucionario",
    quienEra:
      "Abogado, gran orador y una de las figuras más populares de París en los primeros años.",
    papel:
      "Ministro de Justicia en 1792 y luego miembro del primer Comité de Salvación Pública. Más tarde pidió moderar la represión, se enfrentó a Robespierre y fue ejecutado en abril de 1794.",
    ideas:
      "Defendió la república y la defensa nacional. Hacia el final reclamó frenar las ejecuciones.",
    relacion:
      "Su caída muestra que el Terror alcanzó también a dirigentes revolucionarios de primera línea.",
    relevancia: "destacada",
    acento: "azul",
  },
  {
    id: "marat",
    nombre: "Jean-Paul Marat",
    años: "1743-1793",
    rol: "Médico y periodista",
    quienEra:
      "Médico y científico convertido en periodista. Publicaba el periódico 'El amigo del pueblo'.",
    papel:
      "Su periódico denunciaba con dureza a quienes consideraba enemigos de la revolución y tuvo mucha influencia en los sectores populares de París. Fue asesinado en su bañera por Charlotte Corday en julio de 1793.",
    ideas:
      "Defendía a los sectores más pobres y desconfiaba de los moderados.",
    relacion:
      "Su caso muestra el papel de la prensa: en esta revolución, los periódicos y panfletos fueron un arma política de primer orden.",
    relevancia: "destacada",
    acento: "rojo",
  },
  {
    id: "olympe",
    nombre: "Olympe de Gouges",
    años: "1748-1793",
    rol: "Escritora y activista",
    quienEra:
      "Escritora y autora de teatro. Su nombre real era Marie Gouze. Publicó textos contra la esclavitud y a favor de los derechos de las mujeres.",
    papel:
      "En 1791 publicó la 'Declaración de los Derechos de la Mujer y de la Ciudadana', escrita como respuesta directa a la declaración de 1789. Su argumento era simple y potente: si los derechos son universales, también son de las mujeres. Fue guillotinada en noviembre de 1793.",
    ideas:
      "Sostenía que las mujeres debían tener los mismos derechos civiles y políticos que los hombres, incluido el derecho a participar en la vida pública.",
    relacion:
      "Su figura señala un límite real de la revolución: proclamó derechos iguales, pero no se los reconoció a las mujeres. Ese reclamo tardaría más de un siglo y medio en cumplirse: las francesas votaron por primera vez en 1945.",
    relevancia: "destacada",
    acento: "rojo",
  },
  {
    id: "napoleon",
    nombre: "Napoleón Bonaparte",
    años: "1769-1821",
    rol: "General y luego emperador",
    quienEra:
      "Militar nacido en Córcega. Se hizo famoso por sus victorias en las guerras de la república.",
    papel:
      "En noviembre de 1799 encabezó el golpe de Estado que terminó con el Directorio. Gobernó como cónsul y en 1804 se coronó emperador.",
    ideas:
      "Conservó algunos principios revolucionarios, como la igualdad ante la ley, y los organizó en el Código Civil de 1804. Pero eliminó el gobierno republicano y concentró el poder en sus manos.",
    relacion:
      "No fue un protagonista del inicio de la revolución: era un oficial joven en 1789. Su importancia es posterior, y su llegada al poder marca el cierre del proceso revolucionario.",
    relevancia: "posterior",
    acento: "azul",
  },
];

export const CONCEPTOS_CLAVE: Concepto[] = [
  {
    id: "monarquia",
    termino: "Monarquía",
    definicion:
      "Forma de gobierno en la que manda un rey o una reina, cargo que casi siempre se hereda dentro de una familia.",
    ejemplo:
      "Luis XVI fue rey de Francia porque era el heredero de su abuelo, no porque alguien lo hubiera elegido.",
  },
  {
    id: "republica",
    termino: "República",
    definicion:
      "Forma de gobierno sin rey, en la que quienes gobiernan son elegidos y ocupan el cargo por un tiempo limitado.",
    ejemplo:
      "En septiembre de 1792 Francia abolió la monarquía y se declaró república.",
  },
  {
    id: "revolucion",
    termino: "Revolución",
    definicion:
      "Un cambio profundo que transforma una sociedad y deja atrás la forma en que funcionaba antes.",
    ejemplo:
      "Entre 1789 y 1799 Francia cambió su gobierno, sus leyes, sus impuestos y hasta su calendario.",
  },
  {
    id: "ciudadano",
    termino: "Ciudadano",
    definicion:
      "Persona que forma parte de una comunidad política y tiene derechos y deberes reconocidos por la ley.",
    ejemplo:
      "La revolución reemplazó la palabra 'súbdito', que era quien obedecía al rey, por 'ciudadano', que es quien tiene derechos.",
  },
  {
    id: "privilegio",
    termino: "Privilegio",
    definicion:
      "Una ventaja que la ley concede a unos pocos y niega a los demás.",
    ejemplo:
      "El clero y la nobleza estaban exentos de impuestos que el Tercer Estado sí tenía que pagar. La Asamblea abolió esos privilegios en agosto de 1789.",
  },
  {
    id: "igualdad",
    termino: "Igualdad",
    definicion:
      "Principio según el cual la ley debe tratar de la misma manera a todas las personas.",
    ejemplo:
      "'Los hombres nacen y permanecen libres e iguales en derechos', dice el primer artículo de la Declaración de 1789.",
  },
  {
    id: "libertad",
    termino: "Libertad",
    definicion:
      "Poder pensar, expresarse y actuar sin que otros lo impidan, mientras no se dañe el derecho de los demás.",
    ejemplo:
      "La Declaración de 1789 reconoció la libertad de opinión y de expresión, incluso en materia religiosa.",
  },
  {
    id: "soberania",
    termino: "Soberanía popular",
    definicion:
      "La idea de que el poder no pertenece a una persona por nacimiento, sino al conjunto de los ciudadanos.",
    ejemplo:
      "El artículo 3 de la Declaración dice que el origen de toda soberanía reside esencialmente en la nación.",
  },
  {
    id: "ilustracion",
    termino: "Ilustración",
    definicion:
      "Movimiento de ideas del siglo XVIII que confiaba en la razón para mejorar la sociedad y discutía las bases del poder.",
    ejemplo:
      "Montesquieu propuso dividir el poder en tres para que ninguno se volviera absoluto.",
  },
  {
    id: "derechos",
    termino: "Derechos",
    definicion:
      "Aquello que a una persona le corresponde por el solo hecho de serlo, y que la ley debe proteger.",
    ejemplo:
      "La Declaración de 1789 enumeró derechos como la libertad, la propiedad, la seguridad y la resistencia a la opresión.",
  },
];

export const CURIOSIDADES_FRANCIA: Curiosidad[] = [
  {
    id: "cur-fr-bastilla",
    titulo: "Siete presos y un símbolo enorme",
    texto:
      "El 14 de julio de 1789, cuando la multitud tomó la Bastilla, dentro había apenas siete prisioneros. Entonces, ¿por qué fue tan importante? Porque la Bastilla representaba el poder del rey para encarcelar a alguien sin juicio, por una simple orden firmada. Derribarla significaba que ese poder se podía derrotar. La fortaleza fue demolida en los meses siguientes.",
    tema: "francia",
  },
  {
    id: "cur-fr-pan",
    titulo: "El precio del pan",
    texto:
      "El pan era el alimento básico de las familias trabajadoras francesas. Tras las malas cosechas de 1788 y un invierno muy duro, su precio subió a niveles altísimos, y los historiadores calculan que muchas familias llegaron a gastar más de la mitad de su jornal solo en pan. En octubre de 1789, miles de mujeres marcharon desde París hasta Versalles reclamando pan y obligaron al rey a trasladarse a París.",
    tema: "francia",
  },
  {
    id: "cur-fr-declaracion",
    titulo: "Diecisiete artículos que dieron la vuelta al mundo",
    texto:
      "La Declaración de los Derechos del Hombre y del Ciudadano, de agosto de 1789, tiene solo 17 artículos y cabe en una hoja. Sin embargo, sus ideas (libertad, igualdad ante la ley, soberanía de la nación) fueron citadas después en constituciones de todo el mundo. Es un buen ejemplo de que una revolución también se hace con textos, no solo con hechos.",
    tema: "francia",
  },
  {
    id: "cur-fr-calendario",
    titulo: "Una revolución que cambió hasta el calendario",
    texto:
      "En 1793 Francia adoptó un calendario nuevo. El año I empezaba el 22 de septiembre de 1792, el día siguiente a la abolición de la monarquía. Los meses recibieron nombres tomados de la naturaleza, como termidor (calor) o brumario (bruma), y la semana pasó a tener diez días. Duró poco: Napoleón lo eliminó y el 1 de enero de 1806 Francia volvió al calendario habitual.",
    tema: "francia",
  },
  {
    id: "cur-fr-ilustracion",
    titulo: "Ideas que venían de antes",
    texto:
      "La revolución no inventó de cero sus ideas. Durante décadas, los pensadores de la Ilustración habían discutido que el poder debía estar limitado y que las leyes debían ser iguales para todos. Cuidado con una simplificación frecuente: esos libros no 'causaron' la revolución por sí solos. Hicieron falta además la crisis económica, el hambre y el bloqueo político para que todo estallara.",
    tema: "francia",
  },
  {
    id: "cur-fr-napoleon",
    titulo: "De oficial desconocido a emperador",
    texto:
      "El 14 de julio de 1789, cuando cayó la Bastilla, Napoleón Bonaparte tenía 19 años y era un oficial de artillería sin fama. Cumplió 20 un mes después. Fueron las guerras de la república las que lo convirtieron en un general célebre. Diez años después dio el golpe que terminó con el Directorio, y en 1804 se coronó emperador. Una revolución que había derribado a un rey terminó con un emperador.",
    tema: "francia",
  },
];
