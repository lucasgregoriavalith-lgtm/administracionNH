import { ANTES_DESPUES, CONSECUENCIAS, VIDA_COTIDIANA } from "@/data/industrial";
import estilos from "./seccion.module.css";

/** Comparación antes / después de la industrialización. */
export function AntesDespues() {
  return (
    <div className={estilos.antesDespues}>
      <div className={estilos.ladoAntes}>
        <h3 className={estilos.cabeceraLado}>{ANTES_DESPUES.antes.titulo}</h3>
        {ANTES_DESPUES.antes.items.map((item) => (
          <div key={item.id} className={estilos.filaLado}>
            <span className={estilos.claveLado}>{item.clave}</span>
            <span className={estilos.valorLado}>{item.valor}</span>
          </div>
        ))}
      </div>

      <div className={estilos.ejeCentral} aria-hidden="true" />

      <div className={estilos.ladoDespues}>
        <h3 className={estilos.cabeceraLado}>{ANTES_DESPUES.despues.titulo}</h3>
        {ANTES_DESPUES.despues.items.map((item) => (
          <div key={item.id} className={estilos.filaLado}>
            <span className={estilos.claveLado}>{item.clave}</span>
            <span className={estilos.valorLado}>{item.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Dos columnas: transformaciones y costos sociales. */
export function Consecuencias() {
  return (
    <div className={estilos.consecuencias}>
      <div className={estilos.columnaConsecuencia} data-tipo="positivas">
        <h3 className={estilos.tituloConsecuencia}>{CONSECUENCIAS.positivas.titulo}</h3>
        <ul className={estilos.listaConsecuencia}>
          {CONSECUENCIAS.positivas.items.map((item) => (
            <li key={item} className={estilos.itemConsecuencia}>
              <span className={estilos.vineta} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={estilos.columnaConsecuencia} data-tipo="problemas">
        <h3 className={estilos.tituloConsecuencia}>{CONSECUENCIAS.problemas.titulo}</h3>
        <ul className={estilos.listaConsecuencia}>
          {CONSECUENCIAS.problemas.items.map((item) => (
            <li key={item} className={estilos.itemConsecuencia}>
              <span className={estilos.vineta} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Un día antes / un día durante la industrialización. */
export function VidaCotidiana() {
  return (
    <>
      {VIDA_COTIDIANA.map((aspecto) => (
        <article key={aspecto.id} className={estilos.aspecto}>
          <h3 className={estilos.aspectoTitulo}>{aspecto.aspecto}</h3>
          <div className={estilos.aspectoPar}>
            <span className={estilos.aspectoEtiqueta} data-lado="antes">
              Un día antes de la industrialización
            </span>
            <p className={estilos.aspectoTexto}>{aspecto.antes}</p>
          </div>
          <div className={estilos.aspectoPar}>
            <span className={estilos.aspectoEtiqueta} data-lado="despues">
              Un día durante la industrialización
            </span>
            <p className={estilos.aspectoTexto}>{aspecto.despues}</p>
          </div>
        </article>
      ))}
    </>
  );
}
