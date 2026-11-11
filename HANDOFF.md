# Handoff: publicar brecha-hub en GitHub y Vercel

> Para la sesión de Claude que continúa este trabajo con la cuenta que tiene acceso a GitHub (y a Vercel).
> Fecha: 2026-11-11 · Estado: **listo en local, sin git, sin remoto, sin deploy.**

---

## 1. Prompt para arrancar la nueva sesión

Copiá esto como primer mensaje en la sesión nueva, abierta en la carpeta `brecha-hub`:

```text
Leé HANDOFF.md y README.md de esta carpeta. Es un monorepo (npm workspaces) con un Hub web
que ya compila y fue verificado en local. Tu trabajo es publicarlo: inicializar git, conectar el
repo PRIVADO de GitHub que te indique, hacer push y dejar el deploy en Vercel con protección de acceso.
Seguí el orden de la sección 4 y pedime autorización antes de cada paso externo
(git init, commit, conectar el remoto, push, crear o vincular el proyecto de Vercel, deploy).
No modifiques el contenido de packages/content/src a mano.
```

---

## 2. Qué es esto

**brecha-hub** es un sitio con el reporte de la **brecha entre el Figma del design system de Correo Argentino y la web** (MiCorreo y backoffices). Lo hizo el equipo UX de Vortex. Reúne:

| Módulo (ruta) | Contenido |
|---|---|
| Auditoría de brecha (`/m/auditoria`) | Estados interactivos de producción vs. Figma, inconsistencias del Figma e inventario de componentes |
| Planes y propuestas (`/m/planes`) | Plan de tokens de Buttons v1 (aplicado), spec de estados de Mi Correo 2.0 (aplicado), plan de normalización (propuesta) |
| Handoff para desarrollo (`/m/handoff`) | README del paquete MUI, 8 fichas de componentes y descarga de `theme.ts`, `tokens.json` y la regla de Cursor |

Los documentos se ven en `/doc/<ruta-del-archivo-sin-.md>`.

Es **material interno del cliente**: el repo tiene que ser **privado** y el deploy tiene que estar **protegido**.

---

## 3. Estado actual (verificado el 2026-11-11)

| Ítem | Estado |
|---|---|
| `npm install` | ✅ 169 paquetes, con `package-lock.json` generado |
| `npm run build` | ✅ `tsc --noEmit` + `vite build`; la salida queda en `apps/hub/dist` |
| Recarga directa de rutas profundas (`/doc/...`, `/m/...`) | ✅ con `vite preview` |
| Imágenes, enlaces entre documentos y descargas | ✅ |
| Ancho de celular (375 px) | ✅ sin scroll horizontal |
| Revisión visual con capturas | ⚠ no se hizo; conviene una pasada visual antes de compartir |
| git | ❌ la carpeta **no** es un repo todavía (git 2.52 está instalado) |
| Remoto de GitHub | ❌ no existe; lo crea la persona |
| Vercel | ❌ sin proyecto (la CLI de Vercel 50.1.6 está instalada en este equipo) |
| `gh` (GitHub CLI) | ❌ no está instalado; no hace falta |

### Estructura

```text
brecha-hub/                       ← raíz del repo de GitHub
├── apps/hub/                     ← sitio: Vite 5 + React 18 + React Router 6 + react-markdown
│   ├── src/hub.config.ts         ← módulos y documentos del Hub
│   ├── src/lib/content.ts        ← rutas, títulos, estados y resolución de enlaces
│   ├── src/components/           ← Layout, Markdown, StatusTag, Icon (CSS Modules)
│   ├── src/pages/                ← Home, ModulePage, DocPage, NotFound
│   └── vite.config.ts            ← dev en 5173, preview en 4180
├── packages/content/             ← COPIA DERIVADA de los informes (no editar a mano)
│   ├── src/                      ← auditoria-brecha/, design-system-handoff/, propuestas/
│   ├── index.ts                  ← import.meta.glob: textos (?raw) e imágenes (?url)
│   └── manifest.json             ← fecha de la última sincronización y lista de archivos
├── scripts/sync-content.mjs      ← copia los originales a packages/content/src
├── vercel.json                   ← install, build, output y rewrite SPA
├── README.md
└── HANDOFF.md                    ← este archivo
```

### De dónde sale el contenido

Los informes **originales** están en la carpeta padre (`Book de componentes CORREO/`), fuera del repo. Son la única fuente editable.

- `npm run sync` los copia a `packages/content/src` y actualiza `manifest.json`. **Sólo funciona en el equipo que tiene la carpeta padre.**
- La copia **se commitea**. Vercel construye con esa copia y **no** corre `sync`.
- `PEI-166-descripcion.md` (carpeta padre) **no** se publica, por decisión de UX.
- Archivos fuera del repo que no se suben: `../.project/project.yaml` (estado del proyecto) y `../.claude/launch.json` (configuración de la vista previa).

---

## 4. Pasos para publicar

Cada paso con efecto externo necesita **autorización explícita y separada** de la persona. Autorizar uno no autoriza los siguientes.

### Paso 0 · Decisiones previas (preguntar antes de commitear)

1. **`header.png`**: `packages/content/src/design-system-handoff/img/header.png` muestra nombres y un email de ejemplo («Sofia Rios», `…@correoargentino.com.ar`, «Hola, Alejandro»). Hay que confirmar que son ficticios. Si no lo son, hay que sacarlos **del original** (`../design-system-handoff/img/header.png`), correr `npm run sync` y recién ahí commitear.
2. **Nombre del repo**: sugerido `brecha-hub`. Lo decide la persona.

### Paso 1 · git local

```bash
git init -b main
git add -A
git status   # revisar: no tiene que aparecer node_modules/, dist/, .vercel/ ni .env
git commit -m "Hub de brecha Figma ↔ web: monorepo inicial"
```

Antes del commit:
- confirmar que no hay secretos (no debería haber ninguno: el proyecto no usa variables de entorno);
- confirmar que `packages/content/src` está incluido, porque Vercel lo necesita.

### Paso 2 · Repo en GitHub (lo crea la persona)

- La persona crea un repo **privado** y **vacío**: sin README, sin .gitignore y sin licencia, para no generar un historial que choque.
- La persona pasa la URL. **No** crear el repo desde Claude.
- Antes de conectarlo, verificar: proveedor y dueño correctos, visibilidad privada y que esté vacío.

```bash
git remote add origin <URL-que-pase-la-persona>
git push -u origin main
```

Si el remoto ya tiene commits: **detenerse** y consultar. No forzar el push ni reescribir el historial.

### Paso 3 · Vercel

**Opción A (recomendada), desde el panel de Vercel, la hace la persona:**
1. *Add New → Project → Import* el repo de GitHub.
2. **Root Directory:** `.` (la raíz del repo). **Framework Preset:** Other, o Vite.
3. Install, build y output se toman de `vercel.json`: `npm install`, `npm run build` y `apps/hub/dist`. No hace falta cargarlos a mano.
4. **Node.js:** 18 o más. El equipo local usa Node 25; en Vercel alcanza con 20 o 22.
5. *Deploy*.

**Opción B, con la CLI** (`vercel` 50.1.6 está instalada; necesita la sesión de la persona):

```bash
vercel link          # vincular con el proyecto que la persona eligió o creó
vercel               # deploy de preview
vercel --prod        # producción, sólo con autorización
```

### Paso 4 · Protección de acceso (obligatoria)

En el proyecto de Vercel: *Settings → Deployment Protection*.
- Activar **Vercel Authentication** para que sólo entren miembros del equipo, o **Password Protection** si hay que compartir con el cliente. Depende del plan.
- El sitio ya trae `<meta name="robots" content="noindex, nofollow">`, pero eso **no** reemplaza a la protección.

### Paso 5 · Verificación pública

Un comando que terminó bien **no** prueba que el sitio funcione. Hay que comprobarlo en la URL pública:

- [ ] `/` muestra las 3 tarjetas y la fecha del contenido
- [ ] `/m/auditoria`, `/m/planes` y `/m/handoff` abren
- [ ] Recargar con F5 `/doc/auditoria-brecha/estados-interactivos-micorreo` no da 404 (rewrite de `vercel.json`)
- [ ] Las imágenes del documento de auditoría cargan
- [ ] El enlace a la spec desde la ficha `estados-interaccion` abre el documento del Hub
- [ ] Los botones de descarga (`theme.ts`, `tokens.json`, la regla de Cursor) descargan el archivo
- [ ] Sin sesión, el sitio pide autenticación o contraseña
- [ ] La URL pública no enlaza a `localhost` ni a rutas `file://`

Al terminar, avisar a la persona la URL y el estado: *deployed* (desplegado) o *verified* (verificado).

---

## 5. Cómo se actualiza después

1. UX edita un informe original en la carpeta padre.
2. Dentro de `brecha-hub`, correr `npm run sync` y después `npm run build` para comprobar que compila.
3. Commit y push (con autorización): Vercel despliega solo.

Para sumar un documento o módulo, editar `apps/hub/src/hub.config.ts`. El Hub sólo muestra lo que existe en `packages/content/src`.

---

## 6. Qué no hacer

- No editar `packages/content/src` a mano: se pisa en el próximo `sync`.
- No correr `sync` en Vercel ni en CI: los originales no están en el repo.
- No publicar `PEI-166-descripcion.md`.
- No hacer el repo público ni dejar el deploy sin protección.
- No crear un segundo proyecto de Vercel ni otra URL si algo falla: corregir la configuración del proyecto existente (Root Directory, build u output).
- No hacer push forzado ni reescribir el historial.
- No subir `node_modules/`, `dist/` ni `.vercel/`; ya están en `.gitignore`.

---

## 7. Contexto de diseño (por si hay que tocar contenido)

- **Figma Design System:** `kOuwVxF91lktyHh1DSVuAr`. **Figma Mi Correo 2.0:** `wN6vAlF1TgGc2AJdJJvsAU`.
- Buttons v1.0 = web MiCorreo. Buttons 2.0 = backoffice; además, por una regla provisoria, en la web se usan las versiones de 2.0 que v1.0 no tiene (dark, light, light border, borderless, borderless link y sólo ícono).
- Si Figma no define un estado, manda producción (decisión del 2026-11-04). Para hover y focus se usan tokens semánticos globales: `color-background-hover` y `color-background-focus`.
- Temas pendientes, fuera de este handoff:
  - compilar `theme.ts` en el repo de los DEVs;
  - definir el nombre o el valor del primitivo `color-secondary-500-a10` (hoy es `#00229D`, no `#152663`);
  - auditoría de deriva con los DEVs;
  - un comparador vivo Figma ↔ MUI dentro del Hub (diferido).
