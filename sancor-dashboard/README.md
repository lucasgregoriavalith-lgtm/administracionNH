# Dashboard Comercial — Gerencia Zonal

Aplicación web que reemplaza el uso diario de la planilla de gestión comercial: centraliza
ventas, objetivos, bajas y prospectos del equipo de asesores, con analítica en vivo y acceso
por usuario y contraseña desde cualquier lugar.

**Google Sheets sigue siendo la base de datos**: la app lee y escribe sobre la planilla real,
así que se puede seguir cargando desde Sheets cuando haga falta.

> **¿Recién empezás?** Andá directo a **[GUIA-DE-CONFIGURACION.md](./GUIA-DE-CONFIGURACION.md)**:
> está escrita paso a paso para alguien sin experiencia técnica.

---

## Arrancar en 2 minutos (modo demostración)

```bash
npm install
npm run dev
```

Abrí <http://localhost:3000>. Sin credenciales de Google, la app arranca con datos de ejemplo
de los 14 meses anteriores para el equipo (Paula/Centro, Nicanor/Norte, Adrian/Sur,
Antonia/Sur).

| Usuario   | Contraseña | Rol      |
| --------- | ---------- | -------- |
| `gerente` | `demo1234` | Gerente  |
| `paula`   | `demo1234` | Vendedor |
| `nicanor` | `demo1234` | Vendedor |
| `adrian`  | `demo1234` | Vendedor |
| `antonia` | `demo1234` | Vendedor |

En modo demostración los formularios de carga están deshabilitados (no hay planilla donde
escribir). Al configurar las credenciales de Google, estos usuarios de ejemplo desaparecen y
pasan a valer los de la hoja `USUARIOS`.

---

## Qué incluye

### Vista de gerente

| Pantalla | Qué muestra |
| --- | --- |
| **Resumen** | KPIs del período (ventas, facturación, bajas, venta neta) con variación contra el período anterior, cumplimiento global, mes en curso, evolución de facturación, mix de productos y detalle por vendedor. |
| **Cumplimiento** | Objetivo vs. real de ventas y facturación, por vendedor y por zona, con % y semáforo (verde ≥ 100%, amarillo 80–99%, rojo < 80%). |
| **Evolución** | Facturación y altas/bajas mes a mes contra el objetivo, más el detalle mensual en tabla. |
| **Ranking** | Podio y tabla de posiciones del equipo, con ticket promedio y participación sobre la facturación total. |
| **Bajas** | Tasa de bajas sobre altas, motivos, distribución por vendedor y listado detallado. |
| **Prospectos** | Todos los prospectos del equipo, filtrables por estado, con conversión y cambio de estado en línea. |
| **Cargar datos** | Alta de ventas, bajas y prospectos, a nombre de cualquier vendedor. |
| **Configuración** | Estado de la conexión, hojas detectadas, creación de hojas faltantes y generador de contraseñas. |

### Vista de vendedor

Las mismas pantallas, **filtradas automáticamente a sus propios datos**. No puede cambiar el
filtro de vendedor ni acceder a Ranking ni a Configuración. Puede cargar sus ventas, bajas y
prospectos, siempre a su nombre.

### Filtros globales

Período (mes actual / 3 meses / 12 meses / año en curso / todo el historial / fechas
personalizadas), zona, vendedor y producto. Viajan en la URL, así que un filtro se puede
compartir por link y se mantiene al navegar entre pantallas.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** para los estilos
- **Recharts** para los gráficos
- **Google Sheets API v4** como base de datos, vía cuenta de servicio
- Autenticación propia con **JWT firmado** (`jose`) en cookie `httpOnly` y contraseñas
  hasheadas con **bcrypt**
- Pensado para desplegar en **Vercel** (también funciona en cualquier hosting con Node.js)

No usa base de datos propia ni servicios pagos: la planilla es la única fuente de verdad.

---

## Cómo está organizado

```
src/
├── app/
│   ├── (app)/                 Pantallas con sesión iniciada
│   │   ├── resumen/           Dashboard general
│   │   ├── objetivos/         Cumplimiento de objetivos
│   │   ├── evolucion/         Evolución mensual
│   │   ├── ranking/           Ranking de vendedores (sólo gerente)
│   │   ├── bajas/             Análisis de bajas
│   │   ├── prospectos/        Gestión de prospectos
│   │   ├── cargar/            Formularios de carga
│   │   └── configuracion/     Diagnóstico y administración (sólo gerente)
│   ├── api/                   Endpoints de login, carga y mantenimiento
│   └── login/                 Pantalla de acceso
├── components/                Shell, filtros, gráficos, tablas y formularios
├── lib/
│   ├── config.ts              Variables de entorno y nombres de hojas/columnas
│   ├── google-auth.ts         Token de la cuenta de servicio (JWT -> access token)
│   ├── sheets.ts              Lectura y escritura sobre Google Sheets
│   ├── data.ts                Arma el dataset del dominio y lo cachea
│   ├── demo-data.ts           Datos de ejemplo del modo demostración
│   ├── metricas.ts            Todos los cálculos del tablero
│   ├── filtros.ts             Filtros globales y recorte por rol
│   ├── sesion.ts / auth.ts    Firma y verificación de la sesión
│   └── usuarios.ts            Usuarios y validación de contraseñas
└── middleware.ts              Corta el paso a las rutas privadas sin sesión
```

### Cómo viajan los datos

1. `sheets.ts` lee todas las hojas de una sola llamada (`values:batchGet`) con los valores
   sin formatear, para que los números lleguen como números y las fechas como seriales.
2. `data.ts` los convierte al modelo del dominio (ventas, bajas, presupuesto, prospectos) y
   guarda el resultado en memoria durante `CACHE_SEGUNDOS` (60 por defecto).
3. Cada pantalla es un componente de servidor: pide el dataset, aplica los filtros —ya
   recortados por rol— y calcula las métricas con `metricas.ts`.
4. Los gráficos son los únicos componentes de cliente que reciben datos, ya agregados.
   **Las credenciales de Google nunca salen del servidor.**

### Actualización de los datos

- Se releen solos cada `CACHE_SEGUNDOS` (configurable).
- El botón **"Actualizar datos"** de la barra de filtros fuerza una lectura inmediata.
- Todo lo que se carga desde la app se escribe en la planilla en el momento y limpia el caché.

---

## Seguridad

- Contraseñas guardadas siempre como hash **bcrypt** (nunca en texto plano, tampoco en la planilla).
- Sesión en una cookie `httpOnly`, `sameSite=lax` y `secure` en producción, con un JWT firmado
  con `AUTH_SECRET` y vencimiento a las 12 horas.
- El recorte por rol se aplica **en el servidor**: un vendedor que edite la URL para pedir
  `?asesor=Otro` sigue viendo únicamente sus datos, y la API rechaza cargar o editar registros
  a nombre de otra persona.
- Freno de intentos de login: 8 fallidos por IP bloquean 5 minutos.
- Las credenciales de Google viven sólo en variables de entorno.

---

## Comandos

| Comando | Para qué sirve |
| --- | --- |
| `npm run dev` | Levanta la app en modo desarrollo (<http://localhost:3000>). |
| `npm run build` | Compila la versión de producción. |
| `npm start` | Sirve la versión compilada. |
| `npm run clave -- "MiClave"` | Genera el hash bcrypt para la hoja `USUARIOS`. |

---

## Variables de entorno

Ver `.env.example`. Las obligatorias para conectar la planilla real son
`GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` y `AUTH_SECRET`.
`ADMIN_USUARIO` y `ADMIN_PASSWORD_HASH` son opcionales pero muy recomendables: permiten entrar
la primera vez, antes de que exista la hoja `USUARIOS`.

---

## Ideas para las próximas iteraciones

La arquitectura ya las contempla; ninguna requiere rehacer lo existente.

- Metas por zona además de por vendedor (`PRESUPUESTO` ya tiene la columna `ZONA`).
- Exportar a Excel/PDF lo que se ve en pantalla.
- Historial de estados de un prospecto y recordatorios de seguimiento.
- Alertas automáticas cuando un vendedor cae por debajo del 80% a mitad de mes.
- Edición y anulación de ventas ya cargadas desde la app.
