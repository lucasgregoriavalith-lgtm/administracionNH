# Revoluciones — experiencia educativa interactiva

Aplicación web para estudiar el concepto de **revolución** y tres grandes procesos
históricos, pensada para estudiantes de 5.º grado de Educación Primaria.

No es una enciclopedia con botones: es un recorrido en el que el estudiante
**primero formula una hipótesis, después se equivoca, después recibe una
explicación** y recién entonces descubre la información.

---

## Qué incluye

| Sección | Contenido |
|---|---|
| **Inicio** | Portada, identificación del estudiante y tres caminos |
| **¿Qué es una revolución?** | 5 pasos: hipótesis → revolución ≠ conflicto ≠ guerra → definición → 8 tipos de revolución → 10 casos para discutir |
| **Independencia de EE. UU.** | Contexto, línea de tiempo (1763-1783), datos curiosos y repaso |
| **Revolución Francesa** | Contexto, los tres estados, línea de tiempo (1789-1799), 7 personajes, 10 conceptos clave, datos curiosos y repaso |
| **Revolución Industrial** | Contexto, antes/después, 10 inventos, cronología, consecuencias, vida cotidiana y repaso |
| **Comparar** | Tabla de 11 variables y mapa histórico interactivo |
| **Desafíos** | 5 mini juegos: clasificar, ordenar, ubicar, verdadero/falso y conectar ideas |
| **Evaluación final** | 18 preguntas + ordenar + clasificar + relacionar |
| **Resultados** | Puntaje, dominio por tema y plan de repaso personalizado |
| **Panel del docente** | Zona protegida con resultados del grupo y diagnóstico |

---

## Puesta en marcha (desarrollo)

```bash
cd revoluciones
npm install
npm run dev
```

La aplicación queda en <http://localhost:3000>.

**No hace falta configurar nada más para que funcione.** Sin base de datos, el
progreso se guarda en el navegador de cada estudiante (`localStorage`).

---

## Publicar en Vercel

El repositorio contiene **dos sitios independientes**: la página de valores del
colegio (en la raíz) y esta aplicación (en `revoluciones/`). Por eso hay que
indicarle a Vercel dónde está el proyecto.

1. Entrar a [vercel.com](https://vercel.com) e iniciar sesión con la cuenta de GitHub.
2. **Add New → Project** y elegir este repositorio.
3. En la pantalla de configuración, abrir **Root Directory** y seleccionar la
   carpeta **`revoluciones`**. Este paso es imprescindible.
4. Vercel detecta Next.js solo. No hace falta cambiar los comandos de build.
5. **Deploy**.

Cada vez que se haga un cambio en la rama principal, Vercel vuelve a publicar solo.

---

## Conectar la base de datos (opcional)

Sirve para que el docente pueda ver los resultados del grupo desde `/docente`.

### 1. Crear el proyecto en Supabase

1. Entrar a [supabase.com](https://supabase.com) y crear un proyecto gratuito.
2. Ir a **SQL Editor → New query**, pegar todo el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql) y ejecutarlo con **Run**.

Ese script crea las dos tablas, los índices, dos vistas de consulta y activa la
seguridad a nivel de fila.

### 2. Configurar las variables de entorno en Vercel

En **Settings → Environment Variables** del proyecto:

| Variable | Dónde se obtiene | Secreta |
|---|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → Data API | no |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API Keys | **sí** |
| `TEACHER_PASSWORD` | La elige el docente | **sí** |

Después de agregarlas hay que volver a publicar (**Redeploy**) para que tomen efecto.

En local, copiar `.env.example` como `.env.local` y completar los mismos valores.
`.env.local` está en `.gitignore` y nunca debe subirse al repositorio.

---

## Seguridad y privacidad

Este punto importa especialmente porque los usuarios son menores de edad.

- **Datos mínimos.** Se piden solo dos: nombre (o apodo, o número de lista) y
  curso. No se piden ni se guardan correo, teléfono, dirección, documento ni
  fecha de nacimiento. Las tablas directamente no tienen esas columnas.
- **El navegador nunca habla con la base de datos.** Todas las escrituras y
  lecturas pasan por los *Route Handlers* de Next.js (`/api/resultados` y
  `/api/docente`), que corren en el servidor.
- **La clave secreta nunca llega al navegador.** `SUPABASE_SERVICE_ROLE_KEY` no
  lleva el prefijo `NEXT_PUBLIC_`, así que Next.js no la incluye en el código
  que se descarga el estudiante.
- **RLS activado sin políticas públicas.** Aunque alguien consiguiera la URL del
  proyecto de Supabase, las claves anónimas no pueden leer ni escribir nada.
- **Sin cuentas para los estudiantes.** No hay registro ni contraseñas: solo el
  docente tiene una zona protegida.
- **La contraseña del docente se compara en tiempo constante** en el servidor,
  para que el tiempo de respuesta no filtre información sobre ella.
- **Borrado periódico.** El esquema incluye la función
  `borrar_sesiones_antiguas()` para no conservar datos más de un año.

---

## Rigor histórico

El contenido se redactó siguiendo tres reglas:

1. **Simplificar el lenguaje, nunca los hechos.** Las fechas, los nombres y las
   secuencias son los establecidos; lo que se adapta es cómo se cuentan.
2. **Distinguir hechos de interpretaciones.** Cuando los historiadores discuten
   algo (las causas del Terror, si la Revolución Francesa "fracasó"), la
   aplicación lo dice en lugar de elegir una versión y presentarla como única.
3. **Corregir errores frecuentes en lugar de repetirlos.** Por ejemplo: Watt
   mejoró la máquina de vapor de Newcomen (1712), no la inventó; la primera
   locomotora sobre rieles fue de Trevithick (1804), no de Stephenson; y la
   guerra de independencia estadounidense empezó en 1775, antes de la
   Declaración de 1776.

Las **banderas** se dibujan como SVG propios y corresponden al período estudiado:
la de la Gran Unión (1775-1777) y la de trece estrellas (desde 1777) para las
colonias, la del Reino de Gran Bretaña anterior a 1801 (sin la cruz de San
Patricio) y el pabellón blanco borbónico junto a la tricolor francesa. Cada
bandera lleva una nota que aclara a qué período pertenece.

---

## Accesibilidad

- El estado de una respuesta **nunca se comunica solo con color**: siempre hay
  además un icono, un texto y un borde distinto.
- El juego de ordenar se puede resolver con botones de subir y bajar, no solo
  arrastrando (arrastrar no funciona con teclado ni en todas las pantallas
  táctiles).
- Foco visible en todos los elementos interactivos, enlace de salto al contenido,
  regiones con `aria-label`, y respeto por `prefers-reduced-motion`.
- Botones de al menos 48 px de alto y contraste alto sobre fondo oscuro.

---

## Estructura del proyecto

```
revoluciones/
├── src/
│   ├── app/                 rutas (una carpeta por pantalla) y API
│   ├── components/
│   │   ├── actividades/     preguntas, juegos y devoluciones
│   │   ├── contenido/       líneas de tiempo, tarjetas, tablas, mapa
│   │   └── progreso/        perfil, marcador, resultados, panel docente
│   ├── data/                TODO el contenido histórico, separado de la interfaz
│   └── lib/                 tipos, puntaje, contexto de progreso, Supabase
└── supabase/schema.sql      esquema de base de datos y políticas de seguridad
```

### Cómo cambiar el contenido sin tocar la interfaz

Todo el texto histórico está en `src/data/`. Para corregir una fecha, agregar un
dato curioso o cambiar una pregunta, alcanza con editar el archivo
correspondiente:

| Quiero cambiar… | Archivo |
|---|---|
| La definición de revolución o los tipos | `src/data/concepto.ts` |
| Contenido de Estados Unidos | `src/data/estadosUnidos.ts` |
| Contenido de la Revolución Francesa | `src/data/francia.ts` |
| Contenido de la Revolución Industrial | `src/data/industrial.ts` |
| La tabla comparativa o el mapa | `src/data/comparador.ts` |
| Los mini juegos | `src/data/juegos.ts` |
| La evaluación final | `src/data/evaluacion.ts` |
| Los repasos de cada sección | `src/data/repaso.ts` |

---

## Sistema de puntuación

| Situación | Puntos |
|---|---|
| Acierta en el primer intento | 10 |
| Acierta en el segundo intento | 5 |
| No acierta | 0 (nunca negativo) |

Una actividad ya resuelta correctamente **no pierde sus puntos** si se vuelve a
jugar. Equivocarse forma parte del recorrido: siempre se muestra la explicación.

Al final, cada tema se marca como *Dominado* (90 %+), *Bien afianzado* (75 %+),
*En camino* (50 %+) o *Para repasar*, y se arma una lista de repaso con los temas
que no llegaron al 75 %.
