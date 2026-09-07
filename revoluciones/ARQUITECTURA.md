# Arquitectura y decisiones de diseño

Documento de planificación pedido antes de programar. Registra qué se decidió y
por qué, para que cualquiera pueda retomar el proyecto más adelante.

---

## A. Arquitectura general

**Next.js 16 (App Router) + React 19 + TypeScript**, con **CSS Modules** sobre un
sistema de tokens. Base de datos **Supabase (PostgreSQL)**, opcional. Despliegue
en **Vercel**.

Tres capas estrictamente separadas:

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Datos | `src/data/` | Todo el contenido histórico, tipado. Ningún componente contiene texto histórico. |
| Lógica | `src/lib/` | Tipos, puntaje, contexto de progreso, cliente de base de datos. |
| Presentación | `src/components/` | Componentes que solo saben pintar las estructuras de datos. |

**Decisiones de fondo:**

- **Sin dependencias de interfaz.** Ni Tailwind ni una librería de componentes ni
  una de animaciones. La paleta es obligatoria y muy específica, así que un
  sistema de tokens propio da más control y elimina riesgo de versiones. Las
  animaciones son transiciones CSS.
- **Funciona sin base de datos.** Si faltan las variables de entorno, la
  aplicación no falla: guarda el progreso en `localStorage`. Supabase es una
  mejora, no un requisito.
- **El navegador nunca habla con Supabase.** Todo pasa por Route Handlers. Ver
  la sección J.
- **Banderas dibujadas como SVG**, no como imágenes externas: permite usar la
  bandera correcta de cada período y evita depender de archivos de licencia
  desconocida.

## B. Mapa de navegación

```
/                    Portada + identificación
/concepto            5 pasos secuenciales
/estados-unidos      \
/francia              >  secciones históricas
/industrial          /
/comparar            Tabla comparativa + mapa
/desafios            5 mini juegos
/evaluacion          4 etapas
/resultados          Cierre del recorrido
/docente             Zona protegida
```

Barra de recorrido persistente con siete pasos. Marca cuáles ya se visitaron y
en cuál está el estudiante ahora.

## C. Estructura de cada pantalla

`Header` (marca, nombre, puntaje vivo) → `Navegación` → `Barra de recorrido` →
contenido en bloques → `PasoSiguiente` (invitación explícita al siguiente tramo).

Las secciones históricas siguen siempre el mismo orden: encabezado con la fecha
grande y las banderas → contexto → línea de tiempo → material propio de la
sección → datos curiosos → repaso.

## D. Sistema visual

- **Paleta:** negro estructural (`#0A0B0D` y cuatro grados de profundidad),
  blanco para texto y superficies, azul `#2D6BFF` y rojo `#E03131` para
  categorías, acentos y estados. El rojo nunca cubre grandes superficies.
- **Tipografía:** Space Grotesk (títulos), Inter (texto), IBM Plex Mono (fechas y
  cifras). Se descargan en tiempo de compilación y se sirven desde el propio
  dominio: el navegador del estudiante no hace peticiones a servidores externos.
- **Identidad:** bloques desplazados, retículas de líneas, círculos y flechas.
  La marca es un bloque partido en dos mitades, una estable y otra girada.
- **Sin emojis.** Los iconos son SVG vectoriales propios, de trazo consistente.

## E. Componentes reutilizables

`Header` · `Navegacion` · `BarraProgreso` / `Medidor` · `RevolutionCard` ·
`Timeline` / `TimelineEvento` · `Quiz` · `OpcionMultiple` · `VerdaderoFalso` ·
`Clasificar` · `Ordenar` · `Relacionar` · `CasoRevolucion` · `Devolucion` ·
`FlashCard` · `ConceptCard` · `CharacterCard` · `FactCard` · `InventoCard` ·
`TablaComparativa` · `MapaHistorico` · `Bandera` · `TresEstados` ·
`AntesDespues` · `ScoreBoard` · `StudentProfile` · `ResultadosPorTema` ·
`PlanDeRepaso` · `FinalResults` · `TeacherDashboard`

## F. Modelo de datos

Definido en `src/lib/tipos.ts`: `Evento`, `Personaje`, `Concepto`, `Invento`,
`Curiosidad`, `TipoRevolucion`, `Pregunta`, `Opcion`, `ItemClasificar`,
`ItemOrdenar`, `ParRelacionar`, `RegistroRespuesta`, `EstadoProgreso`.

Dos campos merecen explicación porque existen por razones pedagógicas:

- `Personaje.relevancia` (`central` / `destacada` / `posterior`): evita presentar
  a todos los personajes como protagonistas equivalentes.
- `Invento.precision`: alberga la aclaración cuando existe una atribución popular
  equivocada (Watt, Stephenson).

## G. Sistema de puntuación

10 puntos al acertar de primera, 5 en el segundo intento, 0 si no acierta. Nunca
puntaje negativo. Una actividad ya resuelta bien no pierde puntos al repetirla.

El registro guarda tema, intentos y resultado de cada actividad, lo que permite
calcular el dominio por tema y armar un plan de repaso con los temas por debajo
del 75 %.

## H. Base de datos

Dos tablas: `sesiones_estudiante` y `respuestas`. Solo nombre (o apodo) y curso.
Índices por fecha, curso, sesión y actividad. Dos vistas de consulta y una
función de borrado periódico. Ver `supabase/schema.sql`.

## I. Despliegue

GitHub → Vercel con **Root Directory = `revoluciones`**, para que el sitio de
valores que vive en la raíz del repositorio siga funcionando sin cambios.
Variables de entorno cargadas en el panel de Vercel.

## J. Seguridad y privacidad

1. Datos mínimos: nombre/apodo y curso. Las tablas no tienen columnas para otros
   datos personales, así que no se pueden guardar por error.
2. `SUPABASE_SERVICE_ROLE_KEY` sin prefijo `NEXT_PUBLIC_`: nunca llega al
   navegador.
3. RLS activado y sin políticas públicas: las claves anónimas no pueden leer ni
   escribir nada.
4. Contraseña del docente por variable de entorno, comparada en tiempo constante
   en el servidor.
5. Sin cuentas ni contraseñas para los estudiantes.
6. `/docente` marcada como `noindex`.
7. Función de borrado de sesiones de más de un año.

---

## Lo que quedó fuera, y por qué

- **Autenticación de estudiantes.** Innecesaria y contraria al principio de datos
  mínimos. Un nombre alcanza para lo que el docente necesita.
- **Imágenes históricas fotográficas.** El pedido original las contemplaba, pero
  solo si se conoce su procedencia y licencia. En lugar de incorporar archivos de
  origen incierto, la aplicación usa gráficos vectoriales propios (banderas,
  mapa, retículas). Si más adelante se quieren agregar reproducciones de dominio
  público, el lugar es `public/` y cada una debería llevar su atribución visible.
- **Arrastrar y soltar como única mecánica.** Está implementado en el juego de
  ordenar, pero siempre acompañado de botones: arrastrar no funciona con teclado
  ni en todas las pantallas táctiles.
