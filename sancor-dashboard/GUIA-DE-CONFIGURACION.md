# Guía de configuración — paso a paso

Esta guía está escrita para alguien **sin experiencia técnica**. Seguila en orden y en
alrededor de 40 minutos vas a tener el dashboard funcionando con tus datos reales.

> Mientras no completes esta guía, la app igual funciona: arranca en **modo demostración**
> con datos de ejemplo, para que puedas ver cómo se ve todo antes de conectar tu planilla.

---

## Índice

1. [Qué vas a necesitar](#1-qué-vas-a-necesitar)
2. [Preparar la planilla de Google](#2-preparar-la-planilla-de-google)
3. [Crear la cuenta de servicio de Google](#3-crear-la-cuenta-de-servicio-de-google)
4. [Compartir la planilla con la cuenta de servicio](#4-compartir-la-planilla-con-la-cuenta-de-servicio)
5. [Cargar las credenciales en la app](#5-cargar-las-credenciales-en-la-app)
6. [Probar la app en tu computadora](#6-probar-la-app-en-tu-computadora)
7. [Crear los usuarios del equipo](#7-crear-los-usuarios-del-equipo)
8. [Qué cargar en cada hoja](#8-qué-cargar-en-cada-hoja)
9. [Publicar la app en internet (Vercel)](#9-publicar-la-app-en-internet-vercel)
10. [Problemas frecuentes](#10-problemas-frecuentes)

---

## 1. Qué vas a necesitar

- Una cuenta de Google (la misma con la que usás la planilla).
- La planilla de Google Sheets con tus datos comerciales.
- **Node.js** instalado en tu computadora, sólo si querés probarla localmente.
  Se descarga gratis de [nodejs.org](https://nodejs.org) — elegí la versión "LTS".
- Una cuenta gratuita en [vercel.com](https://vercel.com) para publicarla en internet.

---

## 2. Preparar la planilla de Google

Podés usar **la planilla que ya tenés**. La app espera estas hojas (pestañas) y estas
columnas. Los nombres de las columnas van en la **fila 1**, escritos tal cual:

| Hoja | Columnas (fila 1) |
| --- | --- |
| `BASE_VENTAS` | `ID_VENTA`, `FECHA`, `ASESOR`, `ZONA`, `PRODUCTO`, `TIPO_OPERACION`, `CANTIDAD`, `FACTURACION`, `CLIENTE`, `OBSERVACIONES` |
| `ASESORES` | `ID_ASESOR`, `ASESOR`, `ZONA` |
| `PLANES` | `ID_PLAN`, `PRODUCTO` |
| `PRESUPUESTO` | `MES`, `ASESOR`, `ZONA`, `OBJETIVO_VENTAS`, `OBJETIVO_FACTURACION` |
| `BAJAS` | `ID_BAJA`, `FECHA`, `ASESOR`, `ZONA`, `PRODUCTO`, `CANTIDAD`, `IMPORTE`, `MOTIVO` |
| `TABLAS_AUXILIARES` | `ASESORES`, `ZONAS`, `PRODUCTOS`, `TIPOS_OPERACION`, `MESES`, `ESTADOS_PROSPECTO`, `MOTIVOS_BAJA` |
| `PROSPECTOS` | `ID_PROSPECTO`, `FECHA_CONTACTO`, `ASESOR`, `ZONA`, `NOMBRE`, `CONTACTO`, `PRODUCTO_INTERES`, `ESTADO`, `OBSERVACIONES` |
| `USUARIOS` | `ID_USUARIO`, `USUARIO`, `PASSWORD_HASH`, `ROL`, `ASESOR`, `ACTIVO` |

**No hace falta que las crees a mano.** Una vez conectada la app, entrás como gerente a la
pantalla **Configuración** y apretás *"Crear hojas faltantes"*: la app crea las que falten
(`PROSPECTOS` y `USUARIOS`, típicamente) con los encabezados correctos, **sin tocar** los
datos que ya tenés.

### Cosas para tener en cuenta al cargar datos

- **Fechas**: cargalas como fecha de verdad en Google Sheets (no como texto). La app también
  entiende `31/12/2026` y `2026-12-31`.
- **Importes**: números limpios, sin el símbolo `$`. Si Sheets te lo muestra con formato de
  moneda, perfecto: por dentro sigue siendo un número.
- **Nombres de asesores**: tienen que estar escritos **igual** en todas las hojas.
  `Paula` y `paula` funcionan, pero `Paula G.` y `Paula` son dos personas distintas.
- **Columna `MES` de PRESUPUESTO**: lo más seguro es `2026-01`, `2026-02`, etc.
  También acepta `01/2026`, `Enero 2026` o una fecha del día 1 de cada mes.
- **Bajas**: cargalas en la hoja `BAJAS`. Si ahí hay filas, la app **ignora** las filas con
  `TIPO_OPERACION = BAJA` de `BASE_VENTAS`, para no contarlas dos veces. Si la hoja `BAJAS`
  está vacía, entonces sí usa las filas `BAJA` de `BASE_VENTAS`.

### Anotá el ID de tu planilla

Abrí la planilla y mirá el link del navegador:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890/edit#gid=0
                                       └──────────── esto es el ID ────────────┘
```

Copiá esa parte del medio: la vas a necesitar en el paso 5.

---

## 3. Crear la cuenta de servicio de Google

Una "cuenta de servicio" es un usuario robot de Google. La app entra a tu planilla con ese
usuario, en vez de pedirte la contraseña de tu cuenta personal.

### 3.1 Crear el proyecto

1. Entrá a [console.cloud.google.com](https://console.cloud.google.com) con tu cuenta de Google.
2. Si es la primera vez, aceptá los términos.
3. Arriba a la izquierda, al lado del logo, hay un selector de proyecto. Hacé clic ahí.
4. Botón **"Proyecto nuevo"** (arriba a la derecha del cuadro que se abre).
5. Ponele un nombre, por ejemplo `dashboard-comercial`, y apretá **"Crear"**.
6. Esperá unos segundos y asegurate de que arriba figure seleccionado ese proyecto nuevo.

### 3.2 Habilitar la API de Google Sheets

1. En el buscador de arriba escribí **"Google Sheets API"** y entrá al resultado.
2. Apretá el botón azul **"Habilitar"**.
3. Esperá a que diga que está habilitada.

### 3.3 Crear la cuenta de servicio

1. En el buscador escribí **"Cuentas de servicio"** (o *Service Accounts*) y entrá.
2. Botón **"Crear cuenta de servicio"**.
3. **Nombre**: `dashboard-comercial`. El ID se completa solo. Apretá **"Crear y continuar"**.
4. En "Otorgar acceso a este proyecto" **no elijas nada**: apretá **"Continuar"**.
5. En el último paso apretá **"Listo"**.

### 3.4 Descargar la clave (archivo JSON)

1. En la lista de cuentas de servicio, hacé clic sobre la que acabás de crear.
2. Andá a la pestaña **"Claves"** (*Keys*).
3. **"Agregar clave"** → **"Crear clave nueva"**.
4. Elegí el formato **JSON** y apretá **"Crear"**.
5. Se descarga un archivo `.json`. **Guardalo bien: es como una contraseña.**
   No lo subas a GitHub, no lo mandes por mail, no lo dejes en el escritorio compartido.

### 3.5 Abrir el archivo JSON

Abrilo con el Bloc de notas (Windows) o TextEdit (Mac). Vas a ver algo así:

```json
{
  "type": "service_account",
  "project_id": "dashboard-comercial",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "dashboard-comercial@dashboard-comercial.iam.gserviceaccount.com",
  ...
}
```

De todo eso te importan **dos datos**:

- `client_email` → es el mail del robot (termina en `.iam.gserviceaccount.com`).
- `private_key` → es la clave privada, larguísima, que empieza con `-----BEGIN PRIVATE KEY-----`.

---

## 4. Compartir la planilla con la cuenta de servicio

Este paso se olvida siempre y es el que hace que después "no ande nada".

1. Abrí tu planilla de Google Sheets.
2. Botón **"Compartir"** (arriba a la derecha).
3. Pegá el `client_email` del paso anterior.
4. Elegí el permiso **Editor** (no "Lector": la app también necesita escribir).
5. Destildá "Notificar a las personas" y apretá **"Compartir"**.

---

## 5. Cargar las credenciales en la app

Las credenciales se guardan en **variables de entorno**: valores sueltos que la app lee al
arrancar y que nunca quedan escritos dentro del código.

### En tu computadora

Dentro de la carpeta `sancor-dashboard` hay un archivo `.env.example`.
Hacé una copia y llamala **`.env.local`**, y completala así:

```bash
GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
GOOGLE_SERVICE_ACCOUNT_EMAIL=dashboard-comercial@dashboard-comercial.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
AUTH_SECRET=pega-aca-un-texto-largo-al-azar
ADMIN_USUARIO=gerente
ADMIN_PASSWORD_HASH=
ADMIN_NOMBRE=Gerencia Zonal
```

Detalles importantes:

- **`GOOGLE_PRIVATE_KEY`**: copiala del JSON **entre comillas dobles** y tal como está,
  con los `\n` incluidos. No la partas en varias líneas.
- **`AUTH_SECRET`**: cualquier texto largo e impredecible (30 caracteres o más). Es lo que
  firma las sesiones. Si tenés una terminal a mano: `openssl rand -base64 32`.
- **`ADMIN_USUARIO` / `ADMIN_PASSWORD_HASH`**: tu usuario de arranque, para poder entrar la
  primera vez (todavía no existe la hoja `USUARIOS`). El hash se genera con:

  ```bash
  npm run clave -- "TuContraseñaSegura"
  ```

  Eso imprime un texto que empieza con `$2b$10$...`: **ese** es el valor de
  `ADMIN_PASSWORD_HASH`. La contraseña en claro no se guarda en ningún lado.

> El archivo `.env.local` nunca se sube a GitHub: ya está excluido en `.gitignore`.

---

## 6. Probar la app en tu computadora

Abrí una terminal dentro de la carpeta `sancor-dashboard` y ejecutá, una vez:

```bash
npm install
```

Y después, cada vez que quieras levantarla:

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) y entrá con el usuario y la contraseña
que definiste en `ADMIN_USUARIO` / `ADMIN_PASSWORD_HASH`.

Si todo está bien, en **Configuración** vas a ver "Conectado a la planilla" en verde.
Si algo falta, esa misma pantalla te dice exactamente qué.

---

## 7. Crear los usuarios del equipo

1. Entrá como gerente a **Configuración**.
2. Si la hoja `USUARIOS` no existe, apretá **"Crear hojas faltantes"**.
3. En **"Crear la contraseña de un vendedor"** escribí la contraseña que le vas a dar a esa
   persona y apretá **"Generar hash"**. Copiá el resultado.
4. Abrí la hoja `USUARIOS` en Google Sheets y agregá una fila:

| ID_USUARIO | USUARIO | PASSWORD_HASH | ROL | ASESOR | ACTIVO |
| --- | --- | --- | --- | --- | --- |
| U1 | gerente | `$2b$10$...` | gerente | | SI |
| U2 | paula | `$2b$10$...` | vendedor | Paula | SI |
| U3 | nicanor | `$2b$10$...` | vendedor | Nicanor | SI |
| U4 | adrian | `$2b$10$...` | vendedor | Adrian | SI |
| U5 | antonia | `$2b$10$...` | vendedor | Antonia | SI |

Reglas:

- `USUARIO`: sin espacios ni mayúsculas (`paula`, no `Paula G`).
- `ROL`: `gerente` o `vendedor`.
- `ASESOR`: el nombre **exacto** que figura en la hoja `ASESORES`. Es lo que hace que cada
  vendedor vea sólo sus datos. El gerente lo deja vacío.
- `ACTIVO`: `SI` para habilitarlo. Poné `NO` cuando alguien deja el equipo (no borres la fila,
  así conservás el historial).
- Las contraseñas quedan guardadas **encriptadas**. Ni vos ni nadie puede leerlas desde la
  planilla; si alguien se la olvida, generás una nueva y reemplazás el hash.

---

## 8. Qué cargar en cada hoja

Para que el dashboard tenga sentido, el orden de prioridad es:

1. **`ASESORES`** — el equipo y su zona. Sin esto, no hay nombres ni zonas.
2. **`PRESUPUESTO`** — una fila **por mes y por vendedor** con el objetivo de ventas y de
   facturación. **Es lo que hace funcionar todo el análisis de cumplimiento**: si está vacía,
   los semáforos aparecen en gris con la leyenda "sin objetivo".
3. **`BASE_VENTAS`** — las altas. Es el corazón del tablero.
4. **`BAJAS`** — las cancelaciones con su motivo.
5. **`PROSPECTOS`** — el seguimiento de contactos. La cargan los vendedores desde la app.
6. **`PLANES`** y **`TABLAS_AUXILIARES`** — listas para los selectores. Opcionales: si están
   vacías, la app arma las listas con lo que encuentra en los datos.

Ejemplo de una fila de `PRESUPUESTO`:

| MES | ASESOR | ZONA | OBJETIVO_VENTAS | OBJETIVO_FACTURACION |
| --- | --- | --- | --- | --- |
| 2026-09 | Paula | Centro | 11 | 902000 |

---

## 9. Publicar la app en internet (Vercel)

Así conseguís el link para entrar desde cualquier lado, incluido el celular.

1. Subí este proyecto a un repositorio de GitHub (si estás leyendo esto desde GitHub, ya está).
2. Entrá a [vercel.com](https://vercel.com) y creá una cuenta con tu usuario de GitHub.
3. **"Add New…" → "Project"** y elegí el repositorio.
4. **Importante**: en *Root Directory* apretá "Edit" y elegí la carpeta **`sancor-dashboard`**
   (el repositorio también contiene otro sitio en la raíz).
5. Abrí **"Environment Variables"** y cargá una por una las mismas variables del paso 5:
   `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `AUTH_SECRET`,
   `ADMIN_USUARIO`, `ADMIN_PASSWORD_HASH`, `ADMIN_NOMBRE`.
   - Para `GOOGLE_PRIVATE_KEY`, pegá el valor **sin** las comillas dobles del principio y del
     final, pero **con** los `\n`.
6. Apretá **"Deploy"** y esperá un par de minutos.
7. Vercel te da un link tipo `https://tu-proyecto.vercel.app`. Ese es el link para compartirle
   al equipo.

Cada vez que cambies algo en el repositorio, Vercel publica la versión nueva sola.

---

## 10. Problemas frecuentes

**"Google denegó el acceso al Sheet" (error 403)**
No compartiste la planilla con el mail de la cuenta de servicio, o la compartiste como Lector.
Volvé al [paso 4](#4-compartir-la-planilla-con-la-cuenta-de-servicio) y ponelo como **Editor**.

**"No se encontró la planilla" (error 404)**
El `GOOGLE_SHEET_ID` está mal copiado. Fijate de copiar sólo la parte del medio del link,
sin `/edit` ni nada después.

**"GOOGLE_PRIVATE_KEY tiene un formato inválido"**
Se copió incompleta o se perdieron los `\n`. Copiala de nuevo del JSON, entera, desde
`-----BEGIN PRIVATE KEY-----` hasta `-----END PRIVATE KEY-----\n`.

**Entro pero está todo en cero**
- Fijate el filtro de **Período** arriba: por defecto muestra los últimos 12 meses. Si tus
  datos son más viejos, elegí "Todo el historial".
- Revisá en **Configuración** cuántas filas leyó de cada hoja.

**Los semáforos están todos grises / "sin objetivo"**
Falta cargar la hoja `PRESUPUESTO` para esos meses y esos vendedores.

**Un vendedor no ve nada**
El valor de la columna `ASESOR` en la hoja `USUARIOS` tiene que coincidir exactamente con
cómo está escrito su nombre en `ASESORES` y en `BASE_VENTAS`.

**Cambié algo en la planilla y la app no lo muestra**
Los datos se releen cada 60 segundos. Para verlo ya, apretá **"Actualizar datos"** en la barra
de filtros.

**Un vendedor se olvidó la contraseña**
Configuración → generás un hash nuevo → lo reemplazás en su fila de `USUARIOS`.
