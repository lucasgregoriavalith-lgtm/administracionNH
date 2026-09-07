# Instrucciones para Claude en este repositorio

## Un repositorio por proyecto

**Cada proyecto nuevo va en su propio repositorio, nunca dentro de este.**

Este repositorio es únicamente el sitio de valores y servicios de
"Mis Manitos Nahuel Huapi" (`index.html`, `style.css`, `script.js`,
`valores.js` y `assets/`).

Si aparece un pedido de construir algo distinto —otra aplicación, otra
herramienta, otro sitio—, no crear una subcarpeta acá. Hay que crear un
repositorio nuevo para ese proyecto y trabajarlo ahí.

Ya pasó una vez: la aplicación educativa sobre las revoluciones se construyó
dentro de este repositorio y hubo que mudarla a
<https://github.com/lucasgregoriavalith-lgtm/revolucione5->.

Motivos: mantener historiales separados, poder dar acceso a un proyecto sin
darlo al resto, y que cada uno se despliegue por su cuenta sin tener que
configurar un "Root Directory" en Vercel.

## Sobre este sitio

- Todos los precios y textos editables están en `valores.js`. El resto de los
  archivos los leen de ahí, así que no hace falta tocarlos para actualizar un
  valor.
- `INSTRUCCIONES.md` explica cómo modificar y publicar el sitio, escrito para
  alguien sin conocimientos de programación. Si cambia el funcionamiento,
  actualizar también ese archivo.
- Es un sitio estático, sin proceso de compilación.
