# brecha-hub

Hub web con el reporte de la **brecha Figma ↔ web** del design system de Correo Argentino: auditoría, planes aplicados y propuestas, y el paquete de handoff para desarrollo (theme de MUI, tokens y fichas).

## Estructura

```text
brecha-hub/
├── apps/hub/             ← sitio (Vite + React + React Router)
├── packages/content/     ← copia DERIVADA de los informes (no editar a mano)
│   ├── src/              ← auditoria-brecha/, design-system-handoff/, propuestas/
│   └── manifest.json     ← fecha de la última sincronización y lista de archivos
├── scripts/sync-content.mjs
└── vercel.json
```

## De dónde sale el contenido

Los informes **originales** viven fuera del repo, en la carpeta de trabajo (`../auditoria-brecha`, `../design-system-handoff`, `../propuestas`). Son la única fuente editable.

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
```

## Despliegue en Vercel

El repo de GitHub tiene como raíz esta carpeta. En el proyecto de Vercel:

- **Root Directory:** la raíz del repo (`.`)
- **Install / Build / Output:** los toma de `vercel.json`: `npm install`, `npm run build` y `apps/hub/dist`
- Las rutas internas (`/m/...`, `/doc/...`) funcionan al recargar gracias al rewrite a `index.html`.

Es material interno del cliente: conviene que el repo sea **privado** y que el deploy tenga protección (Vercel Authentication o contraseña). El sitio ya incluye `noindex`.

## Agregar un documento o módulo

Editá `apps/hub/src/hub.config.ts`. El Hub sólo muestra los documentos que existen en `packages/content/src`.
