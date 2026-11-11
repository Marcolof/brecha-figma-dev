# Spec: estados de interacción de los componentes de Mi Correo 2.0

- **Archivo:** [Mi Correo 2.0](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5416-13445) (`wN6vAlF1TgGc2AJdJJvsAU`), sección «Componentes» (`5416:13445`)
- **Librería de tokens:** [Design System](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System) (`kOuwVxF91lktyHh1DSVuAr`)
- **Fecha:** 2026-11-06
- **Estado:** ✅ aplicado el 2026-11-06 (pasos 1 a 8). Falta publicar la librería de Mi Correo 2.0, si se consume como librería

### Avance

| Paso | Resultado |
|---|---|
| 1 | Creados en `Semantic` (DS), con code syntax WEB y scopes acotados: `Background/color-background-hover` → `neutral-75` (1752:8), `Stroke/color-stroke-hover` → `neutral-200` (1752:9) y `Stroke/color-stroke-selected` → `secondary-500` (1752:10, D3) |
| 6 | La nota «Sin estados de interacción adicionales (decisión UX, 2026-11-06).» quedó en la descripción de los 10 componentes de §1.2. En «Fines comerciales switch» se agregó al final de la descripción que ya tenía |
| 2 | ✅ librería Design System publicada por UX |
| 4–5 | Variantes nuevas: **Artículo** +20 (nueva propiedad `interacción` = default / hover / focus; si está expandido, el hover va en `body container`), **Artículo / Acción** (15300:25644, 6 variantes; reemplaza a «borrar» y «Editar» en las 4 variantes expandidas), **Servicio postal** +4 (`status` = Hover / Focus; selected pasa a `color-stroke-selected`), **Opción** +6 (nueva propiedad `Interacción`), **Clasificación / Volver** (15299:31705, 3 variantes; reemplaza la instancia `volver` y conserva `showBack`), **AI ROW VUCE** +1 (`Property 1=Hover`) |
| 7 | 0 colores y 0 sombras sin variable en las variantes nuevas; ningún disabled con hover ni focus; ningún token de componente nuevo. Capturas revisadas. Se agrandó la sección «Componentes» para que entre `Artículo / Acción` |
| 8 | `tokens.json` (`semantic.background.hover`, `semantic.stroke.hover`, `semantic.stroke.selected`), `theme.ts` (`tokens.state`, `palette.action.hover` y `palette.action.focus`, borde hover de `OutlinedInput`) y la ficha nueva `components/estados-interaccion.md` |

**Notas de construcción:**

- **2026-11-06, acciones de Artículo:** se descartó el componente local `Artículo / Acción` porque metía en la librería una pieza que nadie más usa. Lo reemplazan dos versiones nuevas de **Buttons 2.0** en el DS: `borderless` y `borderless link` (15 variantes cada una, sin fondo, sin borde y sin padding). Para el ícono azul se crearon `Icon/color-icon-link` y `Icon/color-icon-link-hover`. En las 12 variantes expandidas de Artículo, «Eliminar» usa borderless S y «Editar» usa borderless link S; el set `Artículo / Acción` se borró. La descripción de Buttons 2.0 tiene ahora una regla provisoria de uso para la web. Detalle en `design-system-handoff/components/buttons.md`.
- **2026-11-06, cambio de foco:** en las 18 variantes de focus se sacó el anillo de 2 sombras y se puso la capa `color-background-focus`. El `clip content` volvió a quedar como en la variante de reposo y se sacó el fondo blanco que se había agregado en Volver y en Acción.
- El subrayado de «Eliminar» en hover es un borde inferior de 1px, vinculado al color del texto. El subrayado tipográfico no sirve: como las variantes comparten la propiedad de texto `texto`, se copiaría a todas.

**Objetivo:** agregar los estados de interacción que faltan (sobre todo hover) a los componentes que los necesitan. Los colores salen de **tokens semánticos globales**, no de tokens de componente, y se reutilizan primitivos que ya existen.

---

## 1. Alcance

### 1.1 Componentes que reciben estados

| # | Componente | Nodo | Estados a agregar |
|---|---|---|---|
| C1 | Artículo | [5524:31980](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5524-31980) | **hover** en todas las interacciones, salvo `status=disabled`. Focus: ver D1 |
| C2 | Servicio postal internacional | [5793:37763](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5793-37763) | hover, focus |
| C3 | Clasificación / Opción | [14526:26931](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=14526-26931) | hover, focus |
| C4 | Clasificación: botón «volver» (‹) | instancia `volver` (14526:26934) dentro de [14534:32858](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=14534-32858) | hover, focus |
| C5 | AI ROW VUCE (filas de VUCE Drop down) | [11886:16524](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=11886-16524) | hover (también es la fila activa con teclado) |

Correcciones a la lista anterior:

- **Servicio postal internacional v2** ([7235:16266](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=7235-16266)) sale de la lista: está armado con instancias de C2 y **hereda** sus estados. No necesita cambios propios.
- **Clasificación (flechas)**: la única flecha propia es «volver» (‹), hoy oculta con `showBack`. Las flechas › son parte de C3. No hace falta disabled al inicio y al final.
- **VUCE Drop down**: no necesita «selected», porque el menú se cierra al elegir una fila.

### 1.2 Componentes sin estados nuevos (decisión UX, 2026-11-06)

Quedan con los estados que ya tienen dibujados. No se agrega hover, pressed ni otros.

| Componente | Nodo |
|---|---|
| resumen stepper intenacional (y lo que tiene adentro) | [5578:5876](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5578-5876) |
| Header row checkout | [7480:57259](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=7480-57259) |
| step container | [5578:12019](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5578-12019) |
| menu dots envios | [5793:38120](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5793-38120) |
| Ayuda código armonización | [6993:15113](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=6993-15113) |
| Detalle declaración | [11115:96948](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=11115-96948) |
| Fines comerciales switch | [10933:13731](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=10933-13731) |
| recumen checkout internacional | [11213:26912](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=11213-26912) |
| Filas tablas factura e | [11921:17069](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=11921-17069) |
| modal detalle cotización | [11786:87001](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=11786-87001) |
| DEPRECADO - Slot artículo | [5524:32067](https://www.figma.com/design/wN6vAlF1TgGc2AJdJJvsAU/Mi-Correo-2.0?node-id=5524-32067) (se omite) |

**Cambio propuesto:** escribir en la descripción de cada uno: «Sin estados de interacción adicionales (decisión UX, 2026-11-06)». Así los DEVs no los toman como un faltante.

---

## 2. Tokens: ¿hacen falta semánticos nuevos?

### 2.1 Qué usan hoy estos componentes

| Parte | Token actual | Valor |
|---|---|---|
| Fondo de tarjeta (C1, C2, C5) | `Semantic/Background/color-background-surface` | `#FFFFFF` |
| Fondo de opción (C3) | `Semantic/Background/color-background-default` | `#FAFAFA` |
| Borde | `Semantic/Stroke/color-stroke-default` (C1 usa `Specific/Inputs/Stroke/input-stroke-default`, mismo valor) | `#D9D9D9` |
| Borde seleccionado (C2) | `Semantic/Stroke/color-stroke-focus` | `#152663` |
| Fondo resaltado de fila (C5, capa «Light BG») | `Semantic/Background/light-surface v2` | `#F2F2F2` |
| Link «Editar» (C1) | `Semantic/Text/Link/link text acent` | `#2562EA` |

### 2.2 Qué falta en la librería

En `Semantic` no hay ningún token de **hover** para superficies ni para bordes. Los únicos tokens de hover están en `Specific/Buttons` y `Specific/Buttons 2`, y son de botones. El texto sí tiene hover: `Semantic/Text/Link/link text hover` y `color-text-link-Hover`.

### 2.3 Propuesta: 2 tokens semánticos nuevos, 0 primitivos nuevos

| Token nuevo | Apunta a (primitivo existente) | Valor | Uso | Equivalente en MUI |
|---|---|---|---|---|
| `Semantic/Background/color-background-hover` | `Neutral/color-neutral-75` | `#F2F2F2` | Fondo de cualquier superficie clickeable en hover: tarjetas, filas, opciones, botones de ícono | `palette.action.hover` |
| `Semantic/Stroke/color-stroke-hover` | `Neutral/color-neutral-200` | `#A7A7A7` | Borde de tarjetas y campos en hover | borde de `OutlinedInput` en `:hover` |

Por qué así:

- **Son globales.** Sirven para C1, C2, C3, C4 y C5, y después para inputs, tablas o menús. No hace falta un token por componente.
- **No suman colores.** Los dos son alias de primitivos que ya están en la paleta. `#F2F2F2` es el mismo valor que ya usa la capa «Light BG» de C5.
- **Funcionan sobre las dos bases.** `#F2F2F2` se distingue del blanco (C1, C2) y también de `#FAFAFA` (C3).
- **No se confunden con selected.** Selected usa borde navy (`#152663`). Hover usa gris (`#A7A7A7`).
- **Pasan directo al código.** Los DEVs los cargan una vez en `palette.action.hover` y los usan todos los componentes de MUI con hover (`ListItemButton`, `MenuItem`, `TableRow`, `IconButton`).

Alternativa descartada: una capa con transparencia (`#191919` al 4 %), igual al valor por defecto de MUI. Funciona sobre cualquier fondo, pero exige un primitivo nuevo con alfa. Ninguno de estos componentes va sobre un fondo de color, así que no hace falta.

### 2.4 Focus: superficie azulada (decisión UX, 2026-11-06)

En la primera versión el foco era un anillo de 2 sombras. **UX lo descartó:** el foco tiene que ser una superficie un poco más oscura que el hover, con tono azul.

| Token | Apunta a | Valor | Equivalente en MUI |
|---|---|---|---|
| `Semantic/Background/color-background-focus` (nuevo) | `Primitive/Secondary/color-secondary-500-a10` (lo creó UX) | `#00229D` al 10 % → sobre blanco, `#E6E9F5` | `palette.action.focus` |

- **Cómo se dibuja:** es una capa sobre el fondo del componente, que se mantiene debajo. Va en el mismo lugar que el hover. El borde queda como en reposo: gris, navy si está seleccionado y rojo si el producto no es apto.
- **Por qué es una capa con transparencia:** funciona igual sobre blanco (C1, C2) y sobre `#FAFAFA` (C3).
- ⚠ **Nombre del primitivo:** el valor base es `#00229D`, no `secondary-500` (`#152663`). Hay que corregir el valor o el nombre (hallazgo 6).

### 2.5 Token opcional (D3)

| Token | Apunta a | Motivo |
|---|---|---|
| `Semantic/Stroke/color-stroke-selected` | `Secondary/color-secondary-500` | Hoy C2 usa `color-stroke-focus` para marcar **seleccionado**. Con un token propio, el nombre dice lo que hace y foco y selección se pueden cambiar por separado. Mismo valor, sin cambio visual |

---

## 3. Cambios por componente

Regla común: **disabled no lleva hover ni focus.** Si un estado de error o selección ya cambia el borde, ese borde se mantiene y el hover cambia sólo el fondo.

### C1 · Artículo

Variantes interactivas: las 10 que no son `status=disabled` (Artículo y Documento).

| Variante | Elemento interactivo | Hover |
|---|---|---|
| `status=empty` («Agregar artículo / documento») | toda la tarjeta | fondo `color-background-hover`, borde `color-stroke-hover` |
| `status=product`, `expan=false` | toda la tarjeta (abre el detalle) | fondo `color-background-hover`, borde `color-stroke-hover` |
| `Producto no apto=true` | toda la tarjeta | fondo `color-background-hover`. El borde rojo de error se mantiene |
| `status=product`, `expan=true` | fila de encabezado (cierra el detalle) | fondo `color-background-hover` sólo en esa fila |
| ↳ «Eliminar artículo» | acción | texto subrayado; color sin cambios |
| ↳ «Editar» | link | color `Semantic/Text/Link/link text hover` (`#143681`, ya existe) |

**Estructura propuesta:**

- Nueva propiedad de variante `interacción` = `default` | `hover` (+ `focus` si se aprueba D1). Se agrega sólo a las 10 variantes que no son disabled: **+10 variantes** (+10 más con focus).
- «Eliminar» y «Editar» pasan a ser instancias de un componente chico, `Artículo / Acción` (`tipo` = Eliminar | Editar, `estado` = default | hover; 4 variantes). Así su hover no multiplica las variantes de la tarjeta.

### C2 · Servicio postal internacional

| Variante nueva | Fondo | Borde |
|---|---|---|
| `status=Hover`, `selected=false` | `color-background-hover` | `color-stroke-hover` |
| `status=Hover`, `selected=true` | `color-background-hover` | se mantiene navy (selected manda) |
| `status=Focus`, `selected=false/true` | fondo de Enabled + capa `color-background-focus` | igual a Enabled |

**+4 variantes.** C2 v2 las hereda sin cambios.

### C3 · Clasificación / Opción

| Variante nueva | Fondo | Borde |
|---|---|---|
| `Estado=Hover` × (Navegar, Seleccionar, Seleccionada) | `color-background-hover` (`#FAFAFA` → `#F2F2F2`) | `color-stroke-hover` |
| `Estado=Focus` × los mismos 3 | `#FAFAFA` + capa `color-background-focus` | igual a Default |

**+6 variantes.**

### C4 · Clasificación: botón «volver»

Hoy es una instancia suelta del ícono `chevron-left` (24 px). Se propone el componente `Clasificación / Volver` (`estado` = default | hover | focus):

- **hover:** fondo `color-background-hover` con radio 4, en un área de 32 × 32 que no corre el título;
- **focus:** fondo `color-background-focus` con radio 4.

Después, la instancia `volver` de las variantes de Clasificación se cambia por este componente. **+3 variantes** en un componente nuevo.

### C5 · AI ROW VUCE

Ya tiene la capa «Light BG», del mismo color que el hover, que se prende con `Show Light BG`.

- Agregar `Property 1=Hover`, con la capa visible y vinculada a `color-background-hover`. **+1 variante.**
- La fila activa con teclado (flechas ↑ ↓) se ve igual que hover, como en el `Autocomplete` de MUI. No necesita un focus aparte.
- Pregunta abierta D4: ¿para qué se usa hoy `Show Light BG`?

### Resumen de variantes

| Componente | Sólo hover | Hover + focus |
|---|---|---|
| C1 Artículo | +10 (+4 de `Artículo / Acción`) | +20 (+4) |
| C2 Servicio postal | +2 | +4 |
| C3 Opción | +3 | +6 |
| C4 Volver | +2 (componente nuevo) | +3 |
| C5 AI ROW VUCE | +1 | +1 |

---

## 4. Pasos de implementación

| # | Paso | Dónde | Quién |
|---|---|---|---|
| 1 | Crear `color-background-hover` y `color-stroke-hover` como alias, con scopes acotados (`FRAME_FILL`/`SHAPE_FILL` y `STROKE_COLOR`) y code syntax WEB. Si se aprueba D3, crear también `color-stroke-selected` | Design System | Claude |
| 2 | **Publicar la librería** | Design System | UX |
| 3 | Aceptar la actualización de la librería | Mi Correo 2.0 | UX |
| 4 | Agregar las variantes de hover de C1 a C5 vinculadas a los tokens, y crear `Artículo / Acción` y `Clasificación / Volver` | Mi Correo 2.0 | Claude |
| 5 | Si se aprueba D1, agregar las variantes de focus con el anillo vinculado a variables | Mi Correo 2.0 | Claude |
| 6 | Escribir la descripción «Sin estados de interacción adicionales…» en los 10 componentes de §1.2 | Mi Correo 2.0 | Claude |
| 7 | Validar: 0 colores sin variable en las variantes nuevas; ningún token de componente nuevo; disabled sin hover; capturas antes y después | Mi Correo 2.0 | Claude |
| 8 | Actualizar el paquete: `tokens.json` (`semantic.background.hover`, `semantic.stroke.hover`), `theme.ts` (`palette.action.hover`, borde hover de `MuiOutlinedInput` y `:focus-visible`) y una ficha nueva en `components/` | handoff | Claude |

Los pasos 4 a 7 dependen del paso 2: sin publicar, Mi Correo 2.0 no ve los tokens nuevos.

---

## 5. Decisiones abiertas

| # | Pregunta | Recomendación |
|---|---|---|
| D1 | ¿Se agrega **focus** en esta ronda o sólo hover? | ✅ **Resuelta (UX, 2026-11-06): hover y focus** |
| D2 | ¿**Pressed**? | No dibujarlo. En código lo resuelve el ripple de MUI, igual que en los botones v1 (decisión D2 del plan de botones) |
| D3 | ¿Crear `color-stroke-selected`? | ✅ Creado como alias, sin cambio visual. C2 se vuelve a vincular en el paso 4. Si no se aprueba, se borra la variable 1752:10 |
| D2 / D5 | Pressed y disabled de Opción | Se aplica la recomendación: no se dibujan |
| D4 | ¿Para qué se usa hoy `Show Light BG` en AI ROW VUCE? | Confirmar antes de usar esa capa para hover |
| D5 | ¿C3 Opción necesita disabled (una opción que no se puede elegir)? | Sólo si hay un caso de negocio. Por ahora, no |

---

## 6. Hallazgos fuera de alcance

Se registran, pero no se tocan en este trabajo:

1. **Artículo** usa la variable `❌C1` de la librería «Ecosistema Digital» en las variantes con producto. Está marcada con ❌ y viene de otra librería.
2. **Artículo** tiene una opción de variante llamada `Producto no apto=New value`: es el nombre por defecto que pone Figma.
3. **Artículo** toma el borde de `Specific/Inputs/Stroke/input-stroke-default`, un token de input, aunque no es un input. El valor es el mismo que `Semantic/Stroke/color-stroke-default`.
4. **Inputs del DS:** `input-stroke-focus` usa `#2196F3`, y producción usa `#E0E0E0`, que casi no se ve. Con `color-stroke-focus` como estándar de foco, conviene unificarlo en una tarea aparte.
5. **Header row checkout:** la propiedad se llama `Property 2`; conviene renombrarla.
6. **DS · `Primitive/Secondary/color-secondary-500-a10`:** el nombre dice `secondary-500` (`#152663`), pero el valor es `#00229D` al 10 %. Hay que corregir el valor o renombrar el primitivo; el semántico `color-background-focus` sigue igual en los dos casos.

---

## 7. Criterios de aceptación

- [ ] Los 5 componentes de §1.1 tienen hover en todos sus elementos interactivos, salvo disabled.
- [ ] Todo color nuevo está vinculado a un token **semántico**; no se crearon tokens de componente ni primitivos nuevos.
- [ ] Hover y selected se distinguen: borde gris en hover, navy en selected.
- [x] El foco es una superficie azulada (`color-background-focus`), más oscura que el hover.
- [ ] Los componentes de §1.2 tienen la descripción que dice que no llevan estados nuevos.
- [ ] `tokens.json` y `theme.ts` incluyen los tokens nuevos.
