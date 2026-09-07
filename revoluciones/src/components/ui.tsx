import Link from "next/link";
import { IconoFlecha } from "./Iconos";
import estilos from "./ui.module.css";

type Variante = "primario" | "acento" | "azul" | "contorno" | "discreto";

export function Boton({
  variante = "primario",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button
      {...props}
      className={`${estilos.boton} ${estilos[variante]} ${className}`}
    />
  );
}

export function BotonEnlace({
  href,
  variante = "primario",
  children,
  className = "",
}: {
  href: string;
  variante?: Variante;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${estilos.boton} ${estilos[variante]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Seccion({
  id,
  etiqueta,
  titulo,
  guia,
  acento = "azul",
  children,
}: {
  id?: string;
  etiqueta?: string;
  titulo?: string;
  guia?: React.ReactNode;
  acento?: "azul" | "rojo";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={estilos.seccion}>
      <div className="contenedor">
        {(etiqueta || titulo || guia) && (
          <div className={estilos.encabezado}>
            {etiqueta && (
              <p className="etiqueta-seccion" data-acento={acento}>
                {etiqueta}
              </p>
            )}
            {titulo && <h2>{titulo}</h2>}
            {guia && <div className="texto-guia">{guia}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Panel({
  acento,
  className = "",
  children,
}: {
  acento?: "azul" | "rojo";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${estilos.panel} ${acento ? estilos.panelAcento : ""} ${className}`}
      data-acento={acento}
    >
      {children}
    </div>
  );
}

export function Rejilla({
  ancha = false,
  children,
}: {
  ancha?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={ancha ? estilos.rejillaAncha : estilos.rejilla}>{children}</div>
  );
}

export function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <div className={estilos.aviso} role="note">
      <div>{children}</div>
    </div>
  );
}

export function Nota({ children }: { children: React.ReactNode }) {
  return <p className={estilos.nota}>{children}</p>;
}

export function PasoSiguiente({
  texto,
  href,
  etiqueta,
}: {
  texto: string;
  href: string;
  etiqueta: string;
}) {
  return (
    <div className="contenedor">
      <div className={estilos.pasoSiguiente}>
        <p className={estilos.pasoTexto}>{texto}</p>
        <BotonEnlace href={href} variante="primario">
          {etiqueta}
          <IconoFlecha />
        </BotonEnlace>
      </div>
    </div>
  );
}

export function Cifra({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div>
      <p className={estilos.cifra}>{valor}</p>
      <p className={estilos.cifraEtiqueta}>{etiqueta}</p>
    </div>
  );
}
