import type { Curiosidad, Evento, Invento } from "@/lib/tipos";

/* ===========================================================================
   REVOLUCIÓN INDUSTRIAL
   Cuidado con dos errores muy frecuentes que este contenido corrige:
   1) "Watt invento la maquina de vapor" -> la mejoro; ya existia (Newcomen, 1712).
   2) "Stephenson invento la locomotora" -> Trevithick construyo la primera (1804).
   =========================================================================== */

export const INTRO_INDUSTRIAL = {
  titulo: "Revolución Industrial",
  fechaClave: "Siglos XVIII-XIX",
  subtitulo: "Una revolución sin batallas que cambió la vida diaria",
  entrada:
    "Empezó en Gran Bretaña en la segunda mitad del siglo XVIII y después se extendió a otras regiones de Europa, a Estados Unidos y más tarde al resto del mundo. No hubo un día en que estallara ni una fecha para festejar: fue un proceso largo.",
  porQueEsRevolucion:
    "Porque transformó de raíz cómo se producían las cosas, en qué trabajaba la gente, dónde vivía, cómo viajaba y hasta cómo medía el tiempo. Y no terminó: la electricidad, el automóvil, la computadora y el teléfono que usás hoy son continuaciones de ese mismo proceso.",
  aclaracion:
    "No fue simplemente 'la invención de las máquinas'. Las máquinas fueron una parte. Lo revolucionario fue la combinación de máquinas, fábricas, carbón, transporte, comercio y una nueva forma de organizar el trabajo.",
};

export const CONTEXTO_INDUSTRIAL = [
  {
    id: "agricultura",
    titulo: "Cambios en el campo",
    texto:
      "Nuevas técnicas agrícolas permitieron producir más alimentos con menos trabajadores. Eso tuvo dos efectos: más gente pudo alimentarse y mucha gente quedó sin trabajo en el campo, de modo que se mudó a las ciudades a buscarlo.",
  },
  {
    id: "poblacion",
    titulo: "Más habitantes",
    texto:
      "La población británica creció con rapidez durante el siglo XVIII. Más personas significaba más manos para trabajar y también más gente que necesitaba comprar cosas.",
  },
  {
    id: "carbon",
    titulo: "Carbón y hierro",
    texto:
      "Gran Bretaña tenía mucho carbón y mucho hierro, y además estaban relativamente cerca uno del otro. El carbón daba la energía para mover las máquinas y el hierro servía para construirlas. Sin esos dos recursos, el proceso no habría sido igual.",
  },
  {
    id: "capital",
    titulo: "Dinero para invertir",
    texto:
      "El comercio marítimo había acumulado capital en manos de comerciantes y bancos. Ese dinero pudo invertirse en construir fábricas, comprar máquinas y abrir minas.",
  },
  {
    id: "comercio",
    titulo: "Un imperio comercial",
    texto:
      "Gran Bretaña tenía colonias y rutas comerciales en varios continentes. De allí llegaban materias primas, como el algodón, y hacia allí se vendían los productos fabricados.",
  },
  {
    id: "fabrica",
    titulo: "La fábrica: una idea nueva",
    texto:
      "La novedad no fue solo la máquina, sino el lugar. Reunir a muchos trabajadores bajo un mismo techo, con máquinas movidas por una fuente central de energía y con horarios fijos, era una forma de organizar el trabajo que antes no existía.",
  },
];

export const ANTES_DESPUES = {
  antes: {
    titulo: "Antes",
    items: [
      { id: "a1", clave: "Producción", valor: "Manual, con herramientas simples." },
      { id: "a2", clave: "Lugar de trabajo", valor: "La casa o un taller pequeño." },
      { id: "a3", clave: "Quién trabajaba junto", valor: "El artesano, su familia y algún aprendiz." },
      { id: "a4", clave: "Energía", valor: "Fuerza humana, animal, agua y viento." },
      { id: "a5", clave: "Cantidad producida", valor: "Poca y lenta: cada pieza llevaba mucho tiempo." },
      { id: "a6", clave: "Horarios", valor: "Marcados por la luz del sol y las estaciones." },
      { id: "a7", clave: "Transporte", valor: "Carros tirados por caballos, barcos de vela, canales." },
      { id: "a8", clave: "Dónde vivía la gente", valor: "La mayoría en el campo." },
    ],
  },
  despues: {
    titulo: "Después",
    items: [
      { id: "d1", clave: "Producción", valor: "Con máquinas, en serie." },
      { id: "d2", clave: "Lugar de trabajo", valor: "La fábrica." },
      { id: "d3", clave: "Quién trabajaba junto", valor: "Cientos de obreros bajo un mismo techo." },
      { id: "d4", clave: "Energía", valor: "Carbón y vapor, y más tarde electricidad." },
      { id: "d5", clave: "Cantidad producida", valor: "Mucha y rápida: los productos se abarataron." },
      { id: "d6", clave: "Horarios", valor: "Marcados por el reloj y la sirena de la fábrica." },
      { id: "d7", clave: "Transporte", valor: "Ferrocarril y barcos de vapor." },
      { id: "d8", clave: "Dónde vivía la gente", valor: "Cada vez más, en ciudades industriales." },
    ],
  },
};

export const INVENTOS: Invento[] = [
  {
    id: "newcomen",
    nombre: "Máquina de vapor atmosférica",
    fecha: "1712",
    autor: "Thomas Newcomen",
    problema:
      "Las minas de carbón se inundaban y había que sacar el agua para poder seguir trabajando.",
    cambio:
      "Fue la primera máquina de vapor que funcionó de forma útil y regular. Gastaba mucho combustible, pero en la boca de una mina de carbón eso no era un problema.",
    precision:
      "Esta máquina es anterior a la de James Watt. Cuando se dice que 'Watt inventó la máquina de vapor', se comete un error: Watt la mejoró.",
  },
  {
    id: "watt",
    nombre: "Máquina de vapor mejorada",
    fecha: "Patente de 1769; producción desde 1776",
    autor: "James Watt, junto al empresario Matthew Boulton",
    problema:
      "La máquina de Newcomen desperdiciaba casi todo el calor y consumía muchísimo carbón.",
    cambio:
      "Watt le agregó un condensador separado, que evitaba enfriar y recalentar el cilindro en cada ciclo. La máquina pasó a gastar mucho menos combustible. Hacia 1781-1782 desarrolló además el movimiento rotativo, que permitió usarla para mover máquinas de fábricas y no solo para bombear agua.",
    precision:
      "Watt no inventó la máquina de vapor: la hizo eficiente y utilizable fuera de las minas. Ese salto es el que la volvió revolucionaria.",
  },
  {
    id: "jenny",
    nombre: "Hiladora Jenny (spinning jenny)",
    fecha: "Hacia 1764-1765; patentada en 1770",
    autor: "James Hargreaves",
    problema:
      "Una persona con una rueca hilaba un solo hilo por vez, y los tejedores no tenían hilo suficiente.",
    cambio:
      "Permitía hilar varios hilos a la vez con una sola persona. Multiplicó la producción de hilo y era lo bastante pequeña como para usarse todavía en casas y talleres.",
  },
  {
    id: "waterframe",
    nombre: "Spinning frame o water frame",
    fecha: "Patentada en 1769",
    autor: "Richard Arkwright",
    problema:
      "El hilo de la jenny era rápido de producir pero poco resistente para ciertos tejidos.",
    cambio:
      "Producía un hilo más fuerte, pero era grande y necesitaba una fuente de energía externa: primero una rueda hidráulica, de ahí el nombre 'water frame'. Como no cabía en una casa, obligó a construir edificios especiales. En 1771 Arkwright abrió su fábrica de Cromford, considerada una de las primeras fábricas modernas.",
    precision:
      "Este invento es clave no solo por el hilo: es el que empuja el paso del taller doméstico a la fábrica.",
  },
  {
    id: "mule",
    nombre: "Mule jenny (mula de hilar)",
    fecha: "1779",
    autor: "Samuel Crompton",
    problema:
      "Hacía falta un hilo que fuera fino y resistente a la vez.",
    cambio:
      "Combinó las ideas de la jenny y del water frame. Con ella Gran Bretaña pudo producir telas de algodón finas, baratas y en enormes cantidades.",
  },
  {
    id: "telar",
    nombre: "Telar mecánico (power loom)",
    fecha: "1785",
    autor: "Edmund Cartwright",
    problema:
      "Ahora sobraba hilo, pero tejerlo a mano seguía siendo lento. El cuello de botella se había mudado.",
    cambio:
      "Mecanizó el tejido. Con los años se fue perfeccionando hasta reemplazar a los telares manuales en las fábricas textiles, lo que dejó sin trabajo a muchos tejedores artesanos.",
  },
  {
    id: "darby",
    nombre: "Fundición de hierro con coque",
    fecha: "1709",
    autor: "Abraham Darby",
    problema:
      "Fundir hierro con carbón vegetal consumía bosques enteros y la madera empezaba a escasear.",
    cambio:
      "Darby logró fundir hierro usando coque, un derivado del carbón mineral. Permitió producir mucho más hierro y más barato, el material con el que se hicieron máquinas, puentes y rieles.",
  },
  {
    id: "cort",
    nombre: "Pudelado y laminado",
    fecha: "1783-1784",
    autor: "Henry Cort",
    problema:
      "El hierro obtenido era quebradizo y servía para pocas cosas.",
    cambio:
      "Estos procesos permitieron producir hierro forjado de mejor calidad y en grandes cantidades. Sin este avance no habría habido rieles ni estructuras metálicas a gran escala.",
  },
  {
    id: "trevithick",
    nombre: "Primera locomotora de vapor sobre rieles",
    fecha: "1804",
    autor: "Richard Trevithick",
    problema:
      "Había máquinas de vapor potentes, pero eran fijas: no se movían del lugar.",
    cambio:
      "Trevithick usó vapor a alta presión para construir una máquina lo bastante compacta como para moverse sobre rieles. Su locomotora arrastró una carga en Penydarren, en Gales, en 1804.",
    precision:
      "Esta es la primera locomotora de ferrocarril que funcionó. George Stephenson vino después y perfeccionó la idea.",
  },
  {
    id: "stephenson",
    nombre: "Ferrocarril de pasajeros",
    fecha: "1825 y 1829-1830",
    autor: "George Stephenson y su hijo Robert",
    problema:
      "Faltaba convertir la locomotora en un servicio de transporte confiable y regular.",
    cambio:
      "En 1825 la locomotora Locomotion abrió la línea Stockton-Darlington. En 1829 la Rocket ganó las pruebas de Rainhill, y en 1830 se inauguró la línea entre Liverpool y Mánchester, la primera que unió dos grandes ciudades con trenes de vapor de horario regular. Viajar dejó de depender de los caballos.",
    precision:
      "Stephenson no inventó la locomotora: la volvió práctica y creó el ferrocarril tal como lo conocemos.",
  },
];

export const CONSECUENCIAS = {
  positivas: {
    titulo: "Cambios transformadores",
    items: [
      "Se produjo muchísimo más en mucho menos tiempo.",
      "Muchos productos, como la ropa de algodón, se volvieron accesibles para más gente.",
      "El ferrocarril y el barco de vapor acortaron enormemente las distancias.",
      "El comercio se expandió entre regiones y continentes.",
      "Aparecieron oficios y tecnologías que antes no existían.",
      "A largo plazo, en varios países mejoraron los ingresos y la esperanza de vida.",
    ],
  },
  problemas: {
    titulo: "Problemas y costos sociales",
    items: [
      "Jornadas larguísimas: era común trabajar entre 12 y 16 horas por día.",
      "Trabajo infantil: chicos y chicas de muy corta edad trabajaban en fábricas y minas.",
      "Condiciones peligrosas, con máquinas sin protección y accidentes frecuentes.",
      "Ciudades que crecieron demasiado rápido, con viviendas hacinadas y sin agua potable.",
      "Contaminación del aire y de los ríos por el humo del carbón y los desechos.",
      "Desigualdad: la riqueza creció, pero se repartió de forma muy despareja.",
    ],
  },
  equilibrio:
    "La Revolución Industrial no fue ni completamente buena ni completamente mala. Produjo enormes transformaciones, y esas transformaciones tuvieron consecuencias muy distintas según de quién se tratara: no fue lo mismo ser dueño de una fábrica que trabajar en ella a los diez años. Con el tiempo, las protestas de los trabajadores y nuevas leyes fueron cambiando esas condiciones: en Gran Bretaña, por ejemplo, una ley de 1833 empezó a limitar el trabajo infantil en las fábricas textiles.",
};

export const VIDA_COTIDIANA = [
  {
    id: "vc-trabajo",
    aspecto: "El trabajo",
    antes:
      "Se trabajaba en casa o en un taller pequeño, muchas veces con la familia, y el propio artesano decidía el ritmo.",
    despues:
      "Se trabajaba en una fábrica, junto a cientos de personas, con un capataz vigilando y una máquina que marcaba el ritmo.",
  },
  {
    id: "vc-horarios",
    aspecto: "Los horarios",
    antes:
      "El día lo organizaban la luz del sol y las estaciones del año. En invierno se trabajaba menos horas.",
    despues:
      "El día lo organizaba el reloj. La sirena de la fábrica marcaba la entrada y la salida, iguales todo el año. Llegar tarde se castigaba con multas.",
  },
  {
    id: "vc-iluminacion",
    aspecto: "La iluminación",
    antes: "Velas de sebo y lámparas de aceite, de luz débil y humeante.",
    despues:
      "Alumbrado de gas en calles y fábricas desde comienzos del siglo XIX. Con luz artificial se pudo trabajar de noche, algo que antes era casi imposible.",
  },
  {
    id: "vc-transporte",
    aspecto: "El transporte",
    antes:
      "Un viaje largo se medía en días o semanas, en carro o a caballo. Mucha gente no salía nunca de su región.",
    despues:
      "El tren recorría en horas lo que antes llevaba días. Aparecieron los horarios impresos y, con ellos, la necesidad de que todos los relojes marcaran la misma hora.",
  },
  {
    id: "vc-ciudad",
    aspecto: "La ciudad",
    antes:
      "La mayoría vivía en pueblos rurales de pocos habitantes, rodeada de campo.",
    despues:
      "Ciudades como Mánchester crecieron a enorme velocidad. Se levantaron barrios obreros apretados, con poca ventilación y sin agua corriente, junto a las chimeneas de las fábricas.",
  },
  {
    id: "vc-objetos",
    aspecto: "Los objetos de todos los días",
    antes:
      "La ropa, los platos o los muebles se compraban pocas veces, duraban años y muchas veces eran hechos a mano por alguien del pueblo.",
    despues:
      "Aparecieron productos fabricados en serie, iguales entre sí y mucho más baratos. Comprar ropa nueva dejó de ser algo excepcional.",
  },
];

export const CRONOLOGIA_INDUSTRIAL: Evento[] = [
  {
    id: "ind-1709",
    fecha: "1709",
    titulo: "Hierro fundido con coque",
    resumen: "Abraham Darby funde hierro usando carbón mineral.",
    explicacion:
      "En Coalbrookdale, Abraham Darby logró fundir hierro con coque en lugar de carbón vegetal. Eso liberó a la industria del hierro de su dependencia de la madera.",
    importancia:
      "Es un antecedente clave: sin hierro barato y abundante no hay máquinas, ni rieles, ni puentes metálicos.",
    tema: "industrial",
  },
  {
    id: "ind-1712",
    fecha: "1712",
    titulo: "Máquina de vapor de Newcomen",
    resumen: "La primera máquina de vapor realmente útil.",
    explicacion:
      "Thomas Newcomen construyó una máquina capaz de bombear agua fuera de las minas de manera continua.",
    importancia:
      "Demostró que el vapor podía reemplazar la fuerza humana y animal en un trabajo real.",
    tema: "industrial",
  },
  {
    id: "ind-1765",
    fecha: "Hacia 1764-1765",
    titulo: "Hiladora Jenny",
    resumen: "Una persona pasa a hilar varios hilos a la vez.",
    explicacion:
      "James Hargreaves construyó una máquina que multiplicaba la cantidad de hilo que podía producir un solo trabajador.",
    importancia:
      "Rompe el cuello de botella del hilado y desata la transformación de la industria textil.",
    tema: "industrial",
  },
  {
    id: "ind-1769",
    fecha: "1769",
    titulo: "Water frame y patente de Watt",
    resumen: "Dos patentes clave en el mismo año.",
    explicacion:
      "Richard Arkwright patentó el water frame, que obligaba a producir en edificios grandes junto a un río. El mismo año, James Watt patentó el condensador separado que hizo eficiente la máquina de vapor.",
    importancia:
      "Juntos explican el nacimiento de la fábrica: una máquina que no cabe en una casa y una fuente de energía que puede alimentarla en cualquier lugar.",
    tema: "industrial",
  },
  {
    id: "ind-1785",
    fecha: "1785",
    titulo: "Telar mecánico",
    resumen: "Edmund Cartwright mecaniza el tejido.",
    explicacion:
      "Con el telar mecánico, también el tejido pasó a hacerse con máquinas dentro de la fábrica.",
    importancia:
      "Completa la mecanización textil y desplaza a los tejedores artesanos, que pierden su medio de vida.",
    tema: "industrial",
  },
  {
    id: "ind-1804",
    fecha: "1804",
    titulo: "Primera locomotora sobre rieles",
    resumen: "Richard Trevithick pone el vapor a rodar.",
    explicacion:
      "Trevithick construyó una locomotora de vapor de alta presión que arrastró hierro y pasajeros sobre rieles en Penydarren, Gales.",
    importancia:
      "El vapor deja de estar fijo en un edificio y empieza a mover cargas y personas.",
    tema: "industrial",
  },
  {
    id: "ind-1830",
    fecha: "1830",
    titulo: "Ferrocarril Liverpool-Mánchester",
    resumen: "La primera gran línea de pasajeros entre dos ciudades.",
    explicacion:
      "Tras el triunfo de la locomotora Rocket en las pruebas de Rainhill de 1829, se inauguró la línea que unía Liverpool con Mánchester con servicios regulares.",
    importancia:
      "Marca el comienzo de la era del ferrocarril, que reorganizó el comercio, los viajes y hasta la medición del tiempo.",
    tema: "industrial",
  },
  {
    id: "ind-1833",
    fecha: "1833",
    titulo: "Primeras leyes de fábrica",
    resumen: "Gran Bretaña empieza a limitar el trabajo infantil.",
    explicacion:
      "La Ley de Fábricas de 1833 prohibió el trabajo de menores de nueve años en las fábricas textiles, limitó las horas de los más jóvenes y creó inspectores para controlarlo.",
    importancia:
      "Muestra que las consecuencias sociales de la industrialización empezaron a discutirse y a corregirse, aunque muy lentamente.",
    tema: "industrial",
  },
];

export const CURIOSIDADES_INDUSTRIAL: Curiosidad[] = [
  {
    id: "cur-ind-watt",
    titulo: "Watt no inventó la máquina de vapor",
    texto:
      "Es uno de los errores más repetidos. Cuando James Watt empezó a trabajar en el tema, ya existían máquinas de vapor desde hacía más de cincuenta años: la de Thomas Newcomen funcionaba desde 1712. Lo que hizo Watt fue mejorarla muchísimo, con un condensador separado que reducía enormemente el consumo de carbón. Ese salto es lo que la sacó de las minas y la llevó a las fábricas.",
    tema: "industrial",
  },
  {
    id: "cur-ind-locomotora",
    titulo: "¿Quién construyó la primera locomotora?",
    texto:
      "Suele decirse que George Stephenson, pero la primera locomotora de vapor que funcionó sobre rieles la construyó Richard Trevithick en 1804, veintiún años antes. Lo de Stephenson fue igual de importante, aunque distinto: convirtió la locomotora en un sistema de transporte confiable, con la línea Stockton-Darlington en 1825 y la Liverpool-Mánchester en 1830.",
    tema: "industrial",
  },
  {
    id: "cur-ind-hora",
    titulo: "El tren obligó a poner los relojes en hora",
    texto:
      "Antes del ferrocarril, cada ciudad británica tenía su propia hora local, según la posición del sol. Con trenes que salían a horarios fijos, esa diferencia se volvió un problema serio. Por eso las compañías ferroviarias adoptaron una hora única, la de Greenwich, y poco a poco todo el país se ajustó a ella. Una revolución en el transporte terminó cambiando algo tan cotidiano como la hora del reloj.",
    tema: "industrial",
  },
  {
    id: "cur-ind-manchester",
    titulo: "Mánchester, la ciudad que creció de golpe",
    texto:
      "Mánchester pasó de ser un pueblo a convertirse en una gran ciudad industrial en pocas décadas. Le decían 'Cottonopolis' por sus fábricas de algodón. El crecimiento fue tan veloz que la ciudad no llegó a construir viviendas dignas, cloacas ni agua potable para tanta gente, y las epidemias eran frecuentes.",
    tema: "industrial",
  },
  {
    id: "cur-ind-ninos",
    titulo: "Chicos trabajando en fábricas y minas",
    texto:
      "En las primeras décadas industriales era normal que chicos y chicas de siete u ocho años trabajaran. En las fábricas textiles se los usaba para meterse debajo de las máquinas en movimiento y atar hilos rotos, porque eran pequeños. Las investigaciones parlamentarias británicas de la década de 1830 recogieron estos testimonios, y de ahí salieron las primeras leyes que limitaron el trabajo infantil.",
    tema: "industrial",
  },
  {
    id: "cur-ind-continua",
    titulo: "Una revolución que todavía no terminó",
    texto:
      "A la primera etapa, la del carbón y el vapor, la siguieron otras: la electricidad y el motor de combustión hacia fines del siglo XIX, la electrónica y la informática en el siglo XX. Muchos historiadores hablan de una segunda y una tercera revolución industrial. Es el mejor ejemplo de una revolución que 'continúa evolucionando hasta nuestros días'.",
    tema: "industrial",
  },
];
