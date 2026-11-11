# brecha-hub

Hub web con el reporte de la **brecha Figma ↔ web** del design system de Correo Argentino. La home tiene dos secciones:

- **Diferencias** (`/diferencias/:tab`): catálogo de diferencias entre Figma y la web (producción y dev `/internacional`) en cuatro tabs, Componentes, Visuales, Funcionales y Ambiente, con detalle Figma | Web y rectángulos rojos.
- **Documentación** (`/documentacion`): informes completos de la auditoría, planes y propuestas (incluidas las tareas pendientes en Figma) y el paquete de handoff para desarrollo (theme de MUI, tokens y fichas).

## Estructura

```text
brecha-hub/
├── apps/hub/             ← sitio (Vite + React + React Router)
│   └── src/
│       ├── pages/Hub.tsx         ← home con las dos tarjetas
│       ├── pages/DiffList.tsx    ← listado de diferencias por tab
│       ├── pages/DiffDetail.tsx  ← detalle Figma | Web
│       ├── pages/Home.tsx        ← Documentación (módulos)
│       └── hub.config.ts         ← módulos y documentos de Documentación
├── packages/content/     ← copia DERIVADA de los informes (no editar a mano)
│   ├── src/              ← auditoria-brecha/, design-system-handoff/, propuestas/
│   └── manifest.json     ← fecha de la última sincronización y lista de archivos
├── scripts/sync-content.mjs
└── vercel.json
```

## De dónde sale el contenido

Los informes **originales** viven fuera del repo, en la carpeta de trabajo (`../auditoria-brecha`, `../design-system-handoff`, `../propuestas`). Son la única fuente editable. El catálogo de diferencias es `../auditoria-brecha/diferencias/diferencias.json`.

1. Editá el original.
2. Corré `npm run sync`. Copia los originales a `packages/content/src` y actualiza `manifest.json`.
3. Commiteá la copia junto con el cambio.

Vercel construye con la copia commiteada: **no** corre `sync`, porque los originales no están en el repo.

`PEI-166-descripcion.md` no se publica.

## Comandos

```bash
npm install
npm run sync      # sólo en el equipo de trabajo
npm run dev       # http://localhost:5173
npm run build     # salida en apps/hub/dist
npm run preview   # sirve el build en http://localhost:4180
```

## Despliegue en Vercel

- **Repo:** `Marcolof/brecha-figma-dev` (GitHub, público). **URL:** https://brecha-figma-dev.vercel.app
- Vercel está vinculado al repo: cada push a `main` despliega solo.
- **Root Directory:** la raíz del repo (`.`). **Install / Build / Output:** salen de `vercel.json`: `npm install`, `npm run build` y `apps/hub/dist`.
- Las rutas internas (`/diferencias/...`, `/documentacion`, `/m/...`, `/doc/...`) funcionan al recargar gracias al rewrite a `index.html`.
- Por decisión de UX (2026-11-11), el repo y el deploy quedan **públicos, sin protección de acceso**, por ahora. El sitio incluye `noindex`.

## Agregar un documento o una diferencia

- **Documento:** agregalo en la carpeta original, corré `npm run sync` y sumalo a `apps/hub/src/hub.config.ts`. El Hub sólo muestra los documentos que existen en `packages/content/src`.
- **Diferencia:** editá `diferencias.json` (formato en `../auditoria-brecha/diferencias/README.md`) y corré `npm run sync`. Estados válidos: `abierta`, `resuelta`, `a-confirmar`, `cambio-figma` y `en-observacion`.
