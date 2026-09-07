import type { DatosTarjetaRevolucion } from "@/components/contenido/RevolutionCard";

export const PORTADA = {
  titulo: "Revoluciones",
  subtitulo: "Cuando una sociedad cambia profundamente",
  introduccion:
    "Las revoluciones han cambiado la manera en que las personas viven, trabajan, gobiernan, producen, piensan y se relacionan.",
  invitacion:
    "En este recorrido no vas a empezar leyendo una definición. Vas a empezar pensando: primero decís qué creés que significa la palabra, después comparás tus ideas y recién entonces construimos juntos una definición.",
};

export const TARJETAS_PORTADA: DatosTarjetaRevolucion[] = [
  {
    href: "/estados-unidos",
    fecha: "1776",
    periodo: "1765 — 1783",
    titulo: "Independencia de Estados Unidos",
    resumen:
      "Trece colonias británicas discuten unos impuestos, terminan declarándose independientes y fundan un país nuevo.",
    bandera: "eeuu-13-estrellas",
    acento: "azul",
  },
  {
    href: "/francia",
    fecha: "1789",
    periodo: "1789 — 1799",
    titulo: "Revolución Francesa",
    resumen:
      "Una sociedad dividida en tres grupos desiguales derriba a su rey y proclama derechos iguales ante la ley.",
    bandera: "francia-tricolor",
    acento: "rojo",
  },
  {
    href: "/industrial",
    fecha: "S. XVIII-XIX",
    periodo: "Desde 1760, y continúa",
    titulo: "Revolución Industrial",
    resumen:
      "Sin ejércitos ni batallas, las máquinas y las fábricas cambian el trabajo, las ciudades y la vida diaria.",
    bandera: "gran-bretana",
    acento: "azul",
  },
];
