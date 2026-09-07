import Link from "next/link";
import { Bandera, type ClaveBandera } from "../Bandera";
import { IconoFlecha } from "../Iconos";
import estilos from "./RevolutionCard.module.css";

export interface DatosTarjetaRevolucion {
  href: string;
  fecha: string;
  periodo: string;
  titulo: string;
  resumen: string;
  bandera: ClaveBandera;
  acento: "azul" | "rojo";
}

export function RevolutionCard({ datos }: { datos: DatosTarjetaRevolucion }) {
  return (
    <Link href={datos.href} className={estilos.tarjeta} data-acento={datos.acento}>
      <p className={estilos.fecha}>{datos.fecha}</p>
      <p className={estilos.periodo}>{datos.periodo}</p>
      <h3 className={estilos.titulo}>{datos.titulo}</h3>
      <p className={estilos.resumen}>{datos.resumen}</p>
      <div className={estilos.pie}>
        <Bandera clave={datos.bandera} ancho={54} />
        <span className={estilos.entrar}>
          Explorar
          <IconoFlecha tamano={16} />
        </span>
      </div>
    </Link>
  );
}
