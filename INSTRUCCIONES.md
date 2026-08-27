# Instrucciones — Página de valores y servicios

Esta guía está pensada para alguien **sin conocimientos de programación**. No hace falta instalar nada raro ni entender el código.

---

## 0. Antes de nada: poné el logo real

Todavía no me pasaste el archivo de logo, así que la página tiene un logo provisorio (`assets/logo.svg`, un cuadrado rojo con un tilde).

Para poner el logo real:

1. Conseguí el archivo del logo del colegio (idealmente `.png` o `.svg`, con fondo transparente).
2. Renombralo como `logo.png` (o `logo.svg` si ya es svg).
3. Reemplazá el archivo `assets/logo.svg` por el tuyo (misma carpeta `assets`).
4. Si tu archivo se llama `logo.png` en vez de `logo.svg`, abrí `index.html` y cambiá las 3 líneas que dicen `assets/logo.svg` por `assets/logo.png` (son 3: el ícono de la pestaña, el header y el footer).

Si me pasás el logo en otro momento, decímelo y te lo integro yo mismo, incluyendo los colores exactos del diseño.

---

## 1. Cómo modificar los valores (lo más importante)

Todos los precios y textos editables están en **un solo archivo**: `valores.js`.

### Pasos

1. Abrí el archivo `valores.js` con cualquier editor de texto (o directamente desde GitHub, ver más abajo).
2. Buscá el dato que querés cambiar. Cada bloque tiene un comentario que dice `// MODIFICAR AQUÍ...`.
3. Reemplazá el valor que está entre comillas `"..."` por el nuevo, **sin borrar las comillas ni la coma final**.
4. Guardá el archivo.
5. Subí el cambio (ver sección "Cómo actualizar los valores" más abajo).

### Ejemplo concreto

Si la cuota mensual pasa de $355.800 a $380.000, buscás esto:

```javascript
cuotas: {
  cantidad: 12,
  valor: "$355.800",   // <- ESTE es el que cambiás
  detalle: "cuota mensual"
},
```

Y lo dejás así:

```javascript
cuotas: {
  cantidad: 12,
  valor: "$380.000",   // <- cambiado
  detalle: "cuota mensual"
},
```

Nada más. No hace falta tocar `index.html`, `style.css` ni `script.js` — esos archivos leen automáticamente lo que hay en `valores.js`.

### Otro ejemplo: agregar o sacar un servicio incluido

Dentro de `incluye: [ ... ]` hay un bloque por cada tarjeta. Para agregar uno nuevo, copiás un bloque entero y lo pegás antes del `]`, cambiando el texto:

```javascript
{
  icono: "natacion",
  titulo: "Nombre del servicio",
  detalle: "Descripción breve del servicio."
},
```

Los íconos disponibles son: `natacion`, `expresividad`, `granja`. Si agregás un servicio nuevo con otro nombre de ícono, no va a romper la página, simplemente no va a mostrar ícono.

---

## 2. Cómo publicar la página por primera vez (GitHub + Vercel, gratis)

### Paso 1 — Crear cuenta en GitHub
1. Entrá a [github.com](https://github.com) y creá una cuenta gratuita.

### Paso 2 — Crear un repositorio
1. Hacé clic en **New repository**.
2. Ponele un nombre, por ejemplo `valores-colegio`.
3. Dejalo en **Public** o **Private** (cualquiera de las dos funciona con Vercel).
4. Hacé clic en **Create repository**.

### Paso 3 — Subir los archivos del proyecto
1. Dentro del repositorio recién creado, hacé clic en **Add file → Upload files**.
2. Arrastrá todos los archivos y la carpeta `assets` de este proyecto:
   - `index.html`
   - `style.css`
   - `script.js`
   - `valores.js`
   - carpeta `assets` (con el logo)
3. Hacé clic en **Commit changes**.

### Paso 4 — Crear cuenta en Vercel
1. Entrá a [vercel.com](https://vercel.com).
2. Registrate usando **tu misma cuenta de GitHub** (botón "Continue with GitHub").

### Paso 5 — Conectar Vercel con GitHub y publicar
1. En Vercel, hacé clic en **Add New → Project**.
2. Seleccioná el repositorio `valores-colegio` que creaste antes.
3. Vercel va a detectar que es un sitio estático — no hace falta cambiar ninguna configuración.
4. Hacé clic en **Deploy**.
5. Esperá unos segundos. Vercel te va a dar un enlace público, algo como:
   `https://valores-colegio.vercel.app`

### Paso 6 — Probar y compartir
1. Abrí el enlace en el celular para verificar que se vea bien.
2. Compartí ese mismo enlace por WhatsApp con las familias.

**Este enlace no va a cambiar nunca**, aunque después actualices los precios (ver el punto siguiente).

---

## 3. Cómo actualizar los valores más adelante

Una vez publicada, **no hace falta volver a mandar un enlace nuevo**. Alcanza con editar el archivo `valores.js` directamente en GitHub:

1. Entrá a tu repositorio en GitHub.
2. Abrí el archivo `valores.js` (hacé clic sobre su nombre).
3. Hacé clic en el ícono del lápiz (**Edit this file**), arriba a la derecha.
4. Cambiá únicamente los valores que necesites (siguiendo los ejemplos del punto 1).
5. Bajá hasta el final de la página y hacé clic en **Commit changes**.
6. Vercel va a detectar el cambio automáticamente y va a actualizar la página sola, en menos de un minuto.
7. El enlace que ya compartiste por WhatsApp **sigue funcionando igual**, mostrando los valores nuevos.

---

## 4. Vista previa al compartir por WhatsApp (imagen de portada)

Cuando alguien recibe el enlace por WhatsApp, se muestra automáticamente una tarjeta con título, descripción e imagen. Eso se controla desde `index.html`, en estas líneas (cerca del principio del archivo):

```html
<meta property="og:title" content="Valores y servicios">
<meta property="og:description" content="Información administrativa y valores actualizados.">
<meta property="og:image" content="assets/portada-whatsapp.jpg">
```

- Para cambiar el título o la descripción de la vista previa, editá el texto entre comillas de esas dos primeras líneas.
- Para poner una imagen de portada: subí una imagen (idealmente 1200x630 px) a la carpeta `assets` con el nombre `portada-whatsapp.jpg`, o cambiá el nombre en la línea `og:image` por el nombre real de tu archivo.
- Si no subís ninguna imagen, WhatsApp va a mostrar la vista previa sin foto (solo título y descripción), la página va a funcionar igual.

> Nota: WhatsApp guarda en caché la vista previa de cada enlace. Si cambiás la imagen después de haber compartido el link, es posible que algunos chats sigan mostrando la vista previa vieja por un tiempo.

---

## Resumen rápido

| Quiero... | Dónde lo hago |
|---|---|
| Cambiar un precio o texto | `valores.js` |
| Cambiar el logo | carpeta `assets` (+ `index.html` si cambia el nombre del archivo) |
| Cambiar el título/imagen que se ve al compartir por WhatsApp | las 3 líneas `og:` en `index.html` |
| Publicar la página | GitHub + Vercel (una sola vez) |
| Actualizar la página ya publicada | Editar `valores.js` directo en GitHub — Vercel actualiza solo |
