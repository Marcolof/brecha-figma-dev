# Plan de normalización del Design System (propuesta)

> **Estado: propuesta, pendiente de aprobación.** Tarea Jira: PEI-166 · Fecha: 2026-11-05
> Lo confirmado está marcado como tal; el resto es hipótesis de trabajo.

## 1. Objetivo

Que el Figma del Design System sea una fuente de verdad confiable y que producción (MiCorreo y backoffices) se alinee con él, de modo que los DEVs implementen sin interpretar.

## 2. Situación actual

**Confirmado** (de `../auditoria-brecha/estados-interactivos-micorreo.md` e `INCONSISTENCIAS.md`):
- Figma no define hover, pressed ni focus en la mayoría de los componentes.
- Producción usa defaults de MUI en esos estados, y eso genera la brecha.
- Regla vigente desde 2026-11-04: para los estados que Figma no resuelve, manda producción. Ya aplicada en Buttons v1.0.
- La auditoría de producción cubre sólo la landing de MiCorreo.

**Por verificar:** la cobertura exacta de estados por componente (paso 1).

## 3. Pasos propuestos

| # | Paso | Resultado | Depende de | Riesgo |
|---|---|---|---|---|
| 1 | **Matriz de cobertura de estados** (lectura de Figma, sin modificarlo): componente × enabled / hover / pressed / focus / disabled, indicando si existe y si usa variables | Backlog real y estimación | — | Bajo |
| 2 | **Cerrar decisiones bloqueantes**: paleta invertida (amarillo `secondary` en producción vs. `primary` en Figma y `theme.ts`); si Modal, Checkbox y Menú lateral dependen de la plataforma | Decisiones registradas | — | Medio: cambia colores si se adopta `themeWeb` sin alinear |
| 3 | **Completar estados en Figma por prioridad**: (a) Tertiary web y focus del Secondary (ver `../propuestas/tareas-figma.md`, F3); (b) switch, tabs, chips; (c) Light y Light border | Matriz completa, con variables | 1 y 2 | Medio: toca variables usadas por otros nodos |
| 4 | **Normalizar hallazgos del Figma**: nombres de plataforma, typos, variables huérfanas, radio-xs, Text Styles, sombras, paleta Warning | Figma consistente | 1 | Bajo |
| 5 | **Ampliar la auditoría de producción**: formularios, tablas, modales y backoffices | Lista de diferencias completa | — (en paralelo con 3) | Bajo |
| 6 | **Regenerar este paquete** (`theme.ts`, `tokens.json`, fichas, inventario) | Paquete con fecha nueva | 3 y 4 | Bajo |
| 7 | **Lista de alineación para desarrollo**: diferencias Figma vs. producción por componente, priorizadas | Backlog para DEVs | 5 y 6 | Bajo |

Los problemas de accesibilidad pendientes (contrastes bajos) van en el paso 3 y se corrigen en ambos lados, aunque producción mande. El foco del input, el Primary disabled igual a hover y el hover de los botones de header se descartaron en la revisión de UX del 2026-11-11 (`../auditoria-brecha/revision-ux-2026-11-11.md`).

## 4. Orden sugerido

1 → 2 en paralelo → 3 y 5 en paralelo → 4 → 6 → 7.
Se propone una subtarea en Jira por familia de componentes en el paso 3, para avanzar y reportar por partes.

## 5. Criterios de aceptación

- Todo componente interactivo tiene sus 5 estados en Figma, con variables.
- Cada valor del `theme.ts` se traza a un nodo o variable de Figma.
- Contraste verificado en los pares de uso; los desvíos aceptados quedan documentados.
- Lista de diferencias entregada a desarrollo.
- Inconsistencias resueltas o registradas con responsable.

## 6. Fuera de alcance

Modificar código de producción. Diseñar componentes que MUI trae pero no tienen diseño aprobado (Alert, Snackbar, Breadcrumbs, etc.) sin pedido explícito.

## 7. Decisiones abiertas

1. ¿Quién decide la paleta invertida: UX o los DEVs de MiCorreo?
2. ¿Modal, Checkbox y Menú lateral dependen de la plataforma?
3. ¿Qué pantallas y backoffices entran en la auditoría ampliada (paso 5)?
4. ¿Se parte PEI-166 en subtareas?

## 8. Estimación

Sin estimar. Depende del resultado del paso 1.
