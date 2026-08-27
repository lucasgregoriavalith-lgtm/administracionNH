// ============================================================
// VALORES.JS — ARCHIVO ÚNICO DE VALORES DEL COLEGIO
// ============================================================
// Este es el ÚNICO archivo que hay que tocar para actualizar
// precios o textos. El resto de la página (index.html) lee
// todo desde acá, así que un cambio acá se refleja en todos
// lados automáticamente.
//
// Para editar: buscá el valor entre comillas "..." y reemplazalo.
// No borres las comillas ni las comas.
// Guía completa con ejemplos: ver INSTRUCCIONES.md
// ============================================================

const datosColegio = {

  // ---------------------------------------------------------
  // ACTUALIZACIÓN — se muestra en el pie de página
  // ---------------------------------------------------------
  ultimaActualizacion: "2026", // MODIFICAR AQUÍ EL AÑO

  // ---------------------------------------------------------
  // VALORES GENERALES
  // ---------------------------------------------------------
  matricula: {
    valor: "$350.000",                 // MODIFICAR AQUÍ EL VALOR
    detalle: "Pago único anual"
  },

  cuotas: {
    cantidad: 12,                      // MODIFICAR AQUÍ LA CANTIDAD DE CUOTAS
    valor: "$355.800",                 // MODIFICAR AQUÍ EL VALOR DE CADA CUOTA
    detalle: "cuota mensual"
  },

  seguroMedico: {
    cantidad: 10,                      // MODIFICAR AQUÍ LA CANTIDAD DE CUOTAS
    valor: "$15.000",                  // MODIFICAR AQUÍ EL VALOR DE CADA CUOTA
    detalle: "cuota"
  },

  // ---------------------------------------------------------
  // CUOTA EXTRAORDINARIA DE MANTENIMIENTO EDUCATIVO
  // Este valor cambia todos los años — es el más importante
  // de mantener actualizado.
  // ---------------------------------------------------------
  cuotaExtraordinaria: {
    valor: "$100.000",                 // MODIFICAR AQUÍ EL VALOR VIGENTE
    meses: "marzo y julio",            // MODIFICAR AQUÍ SI CAMBIAN LOS MESES
    vigencia: "2026",                  // MODIFICAR AQUÍ EL AÑO DE VIGENCIA
  },

  // ---------------------------------------------------------
  // ¿QUÉ INCLUYEN LOS VALORES?
  // Cada objeto de esta lista genera una tarjeta.
  // Se puede agregar, quitar o editar sin tocar el HTML.
  // ---------------------------------------------------------
  incluye: [
    {
      icono: "natacion",
      titulo: "Natación",
      detalle: "Incluye el transporte desde el colegio hasta el natatorio."
    },
    {
      icono: "expresividad",
      titulo: "Expresividad",
      detalle: "Natación y Expresividad se desarrollan dentro de la extensión horaria obligatoria."
    },
    {
      icono: "granja",
      titulo: "Salida de los miércoles",
      detalle: "Salida a la Granja La Piedra. Incluye la actividad y el transporte de ida y de vuelta."
    }
  ],

  // ---------------------------------------------------------
  // ¿QUÉ NO INCLUYEN LOS VALORES?
  // ---------------------------------------------------------
  noIncluye: [
    { titulo: "Comedor" },
    { titulo: "Viaje anual" },
    { titulo: "Extensión horaria optativa" }
  ],

  // ---------------------------------------------------------
  // EXTENSIÓN HORARIA OPTATIVA — HASTA LAS 14:00 HS
  // ---------------------------------------------------------
  extension14: {
    subtitulo: "Hasta las 14:00 hs",
    opciones: [
      { etiqueta: "1 día",  valor: "$16.500", frecuencia: "por mes" }, // MODIFICAR AQUÍ
      { etiqueta: "2 días", valor: "$23.500", frecuencia: "por mes" }, // MODIFICAR AQUÍ
      { etiqueta: "3 días", valor: "$28.000", frecuencia: "por mes" }  // MODIFICAR AQUÍ
    ]
  },

  // ---------------------------------------------------------
  // EXTENSIÓN HORARIA HASTA LAS 15:30 HS — TALLERES
  // ---------------------------------------------------------
  talleres1530: {
    subtitulo: "Talleres",
    valorPorTaller: "$36.000",         // MODIFICAR AQUÍ EL VALOR DE CADA TALLER
    opciones: [
      { etiqueta: "1 taller",  valor: "$36.000" },  // MODIFICAR AQUÍ
      { etiqueta: "2 talleres", valor: "$72.000" }, // MODIFICAR AQUÍ
      { etiqueta: "3 talleres", valor: "$108.000" } // MODIFICAR AQUÍ
    ]
  },

  // ---------------------------------------------------------
  // TALLER DE TAREAS
  // ---------------------------------------------------------
  tallerDeTareas: {
    texto: "Consultar los valores vigentes y sus beneficios."
  }
};
