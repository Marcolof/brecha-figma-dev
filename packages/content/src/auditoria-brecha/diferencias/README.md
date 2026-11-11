# Catálogo de diferencias Figma ↔ web

`diferencias.json` es la fuente que consume el Hub (`brecha-hub`, sección **Diferencias**). Después de editarlo, correr `npm run sync` dentro de `brecha-hub`.

- **categories:** los tabs del listado (`componentes`, `visuales`, `funcionales`). `status: "pendiente"` muestra el tab vacío con la nota.
- **status** de cada item: `abierta`, `resuelta` (resuelta en Figma), `a-confirmar`, `cambio-figma` (el cambio va en Figma; ver `../../propuestas/tareas-figma.md`) o `en-observacion`. Las decisiones de UX del 2026-11-11 están en `../revision-ux-2026-11-11.md`.
- **items:** una diferencia por elemento. `figma` y `web` son los dos lados de la comparación:
  - `capture`: imagen de `img/` y `highlights` (rectángulos rojos en % del ancho y alto de la imagen: `x`, `y`, `w`, `h`);
  - `pending`: falta la captura (se muestra «Captura pendiente»);
  - `missing`: el elemento no existe de ese lado;
  - `code`: fragmento de texto o código.
- **dev** (opcional): segundo lado web, del entorno dev (/internacional). Mismo formato que `web`; `devNote` y la columna `dev` de `values` muestran lo observado ahí.
- **sublabel** (opcional, en cada lado): de qué archivo de Figma sale la captura. Hoy: «Design System» (por defecto), «Mi Correo 2.0 · local» (nodo 5416:13445) y «Mi Correo 2.0 · global» (nodo 2321:32898). Ver `figmaSources`.
- **img/:** los recortes `mc2-*` salen de Mi Correo 2.0 (archivo wN6vAlF1TgGc2AJdJJvsAU) y los `dev-*`, del entorno dev; los recortes `figma-*` salen de `../../design-system-handoff/img/` (Figma ya actualizado el 2026-11-04); los `web-*`, de las capturas de producción de `../img/`.

## Diferencias del flujo /internacional (Visuales, Funcionales y Ambiente)

Salen de la auditoría `Envios internacionales/Envio internacional CLAUDE/documentation/auditoria-dev-internacional/DIFERENCIAS-DEV-VS-FIGMA.md` (06/11/2026, reverificada el 10/11/2026). Cada una conserva su código (GEN, DEC, ART, PAQ, ORI, DES, RES, AMB). Esa auditoría es la fuente: si cambia, hay que volver a importar.

`importar-auditoria-flujo.py` recorta cada par Figma / dev alrededor de la diferencia y guarda los recortes en `img/flujo/`. Las posiciones de los rectángulos están en el script, en % de la pantalla completa. Para correrlo hacen falta las pantallas de Figma (se bajan con el conector de Figma) y la carpeta `capturas/` de la auditoría.

No inventar capturas: si no hay evidencia de un lado, va `pending`.
