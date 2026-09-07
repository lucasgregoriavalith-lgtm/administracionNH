# Guía para el docente

Esta guía no requiere conocimientos de programación.

---

## 1. Cómo se usa en clase

Cada estudiante abre el enlace, escribe su **nombre** (o su apodo, o su número de
lista) y su **curso**, y empieza el recorrido. No hace falta crear cuentas ni
contraseñas.

El recorrido tiene siete tramos y está pensado para hacerse en ese orden:

1. **¿Qué es una revolución?** — el más importante. Empieza preguntando qué
   piensa el estudiante, antes de dar ninguna definición.
2. **Independencia de Estados Unidos**
3. **Revolución Francesa**
4. **Revolución Industrial**
5. **Comparar** — la sección donde se ve que las tres son muy distintas entre sí.
6. **Desafíos** — cinco juegos, se pueden repetir.
7. **Evaluación final** — 18 preguntas y tres actividades.

Se puede cortar en cualquier momento: el progreso queda guardado en el navegador
y sigue ahí al volver, siempre que se use el mismo dispositivo y no se borren los
datos de navegación.

**Tiempo estimado:** el recorrido completo son unos 60-90 minutos. Se puede
dividir en dos o tres clases; una alternativa es hacer las secciones 1 y 5 juntos
en clase y las históricas de forma individual.

---

## 2. La idea que atraviesa todo

> Una revolución es un **cambio profundo que transforma una sociedad**.

Y su consecuencia menos obvia, que es lo que más cuesta:

> **Revolución no es lo mismo que guerra.**

La aplicación insiste en esto de varias maneras: comparando revolución, conflicto
y guerra; mostrando ocho campos donde hubo revoluciones (política, social,
industrial, tecnológica, científica, artística, musical y deportiva); y con casos
para discutir, como si un cambio de gobierno por elecciones es o no una
revolución (no lo es: cambian los jugadores, no las reglas).

---

## 3. Preguntas para llevar a clase

La aplicación deja algunas preguntas abiertas a propósito, sin respuesta única:

- ¿Todos los grandes cambios son revoluciones?
- La Revolución Francesa derribó a un rey y terminó con un emperador. ¿Fracasó?
- La Revolución Industrial, ¿fue buena o mala? ¿Para quién?
- ¿Estamos viviendo una revolución ahora mismo?

Sirven bien como cierre oral o como consigna de escritura.

---

## 4. El panel del docente

Está en la dirección de la aplicación seguida de `/docente`, con contraseña.

Muestra cuántos estudiantes jugaron, el puntaje y el porcentaje promedio, los
resultados por tema, la lista individual y —lo más útil— **qué preguntas se
fallaron más**, para saber qué conviene retomar en clase.

> Para que el panel funcione hace falta conectar una base de datos. Es un paso
> técnico que se hace una sola vez y está explicado en el archivo `README.md`.
> **Sin ese paso la aplicación funciona igual para los estudiantes**: lo único
> que no hay es panel con los resultados del grupo.

---

## 5. Qué datos se guardan

Solo dos: **el nombre (o apodo) y el curso**. Nada más.

No se pide ni se guarda correo, teléfono, dirección, documento ni fecha de
nacimiento. Si preferís que los estudiantes no usen su nombre real, pueden poner
su número de lista o un apodo: la aplicación funciona igual.

---

## 6. Cómo cambiar el contenido

Todo el texto histórico está separado de la parte visual, en la carpeta
`src/data`. Se puede corregir una fecha, sumar un dato curioso o cambiar una
pregunta editando un solo archivo, sin tocar el diseño. La tabla con qué archivo
corresponde a cada sección está en el `README.md`.

---

## 7. Sobre el rigor histórico

El contenido corrige a propósito algunos errores muy repetidos en los manuales
escolares:

- **James Watt no inventó la máquina de vapor.** La de Thomas Newcomen funcionaba
  desde 1712; Watt la mejoró en 1769.
- **George Stephenson no construyó la primera locomotora.** Fue Richard
  Trevithick, en 1804. Stephenson la convirtió en un sistema de transporte.
- **La guerra de independencia estadounidense empezó en 1775**, un año antes de
  la Declaración de 1776.
- **Francia no se volvió república en 1789.** Pasó por una monarquía
  constitucional; la república llegó en septiembre de 1792.
- **En la Bastilla había siete presos**, no cientos. Su importancia fue simbólica.

Cuando los historiadores discuten algo (las causas del Terror, si la Revolución
Francesa fracasó), la aplicación lo dice en lugar de elegir una versión y
presentarla como la única.
