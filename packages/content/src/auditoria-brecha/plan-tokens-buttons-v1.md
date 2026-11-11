# Plan: tokens de componente para Buttons v1.0 (web MiCorreo)

- **Archivo Figma:** Design System (`kOuwVxF91lktyHh1DSVuAr`) · componente `Buttons v1.0` ([49:4524](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=49-4524))
- **Objetivo:** que los estados de producción (hover, pressed y borde de 2px) aplicados el 2026-11-04 pasen por **tokens de componente** (colección `Specific`). Que esos tokens apunten a primitivos o semánticos, sin valores fijos ni variables compartidas con el backoffice.
- **Estado:** ✅ **aplicado el 2026-11-05** (pasos 1 a 8). Falta publicar la librería (D3).

### Resultado de la aplicación

| Paso | Resultado |
|---|---|
| 1 | 43 vinculaciones de Buttons 2.0 pasaron de `Buttons/` a `Buttons 2/`: fondos y también textos, que estaban cruzados. Único cambio visible: Secondary Pressed S queda `#FAFAFA`, igual que L y M (antes estaba en blanco). Primary Disabled S estaba vinculado a una variable de Secondary con el mismo valor; queda igual |
| 2 | Primitivos creados: `Primary/color-primary-500-a60` (1731:1584) y `Secondary/color-secondary-500-a30` (1731:1585) |
| 3 | Re-apuntados: `…-bakcground-hover` y `…-pressed` → a60; `button-secondary-stroke-hover` y `-pressed` → `color-stroke-primary` |
| 4 | Creados: `button-primary-stroke-default` (1731:1586) y `button-border-width` = 2 (1731:1587). Convertidos a alias: `button-secondary-text-hover` → secondary-300; `button-pressed-overlay` → a30 |
| 5 | 21 variantes de v1.0 re-vinculadas, con el grosor de borde como variable |
| 6 | Borrada la provisoria `button-primary-background-hover-prod` (1723:1584) |
| 7 | 0 colores sin variable en v1.0 (Primary y Secondary) y en 2.0; 0 usos de `Buttons/` fuera de v1.0; capturas revisadas |
| 8 | Actualizados `theme.ts`, `components/buttons.md` y las capturas |

Pendiente menor: las variables de `Buttons/` que ya existían conservan scope `ALL_SCOPES`; no se cambió para no ampliar el alcance.
- **Contexto:** [estados-interactivos-micorreo.md](estados-interactivos-micorreo.md)

---

## 1. Situación actual

### 1.1 Buttons 2.0 (backoffice) usa variables de la web

La colección `Specific` tiene dos grupos: `Buttons/` (pensado para v1.0, web) y `Buttons 2/` (para 2.0, backoffice). Pero varias variantes de **Buttons 2.0 están vinculadas a variables de `Buttons/`**:

| Variable de `Buttons/` | ID | La usan en Buttons 2.0 |
|---|---|---|
| `Primary/Background/button-primary-bakcground-default` | `VariableID:45:618` | Primary Enabled L/M/S; además, la instancia de Buttons 2.0 en la sección Buttons |
| `Primary/Background/button-primary-bakcground-hover` | `VariableID:45:619` | Primary Hover L/M/S |
| `Primary/Background/button-primary-bakcground-pressed` | `VariableID:45:625` | Primary Pressed L/M/S |
| `Seconadry/Bacground/button-secondary-background-hover` | `VariableID:45:628` | Secondary Hover S |
| `Seconadry/Bacground/button-secondary-background-pressed` | `VariableID:45:629` | Secondary Pressed S |

**Consecuencia:** si se cambia el valor de esas variables al de producción (web), **el backoffice también cambia**. Por eso el 2026-11-04 se crearon variables provisorias aparte.

`Buttons 2/` ya tiene variables equivalentes con **los mismos valores** (por ejemplo, `Buttons 2/Primary/Background/button-primary-bakcground-hover` → `primary-600`). Sólo no están vinculadas en esas variantes.

### 1.2 Variables provisorias creadas el 2026-11-04 (con valor fijo)

| Variable | ID | Valor fijo |
|---|---|---|
| `Buttons/Primary/Background/button-primary-background-hover-prod` | `VariableID:1723:1584` | `#FFCE00` al 60 % |
| `Buttons/Pressed/button-pressed-overlay` | `VariableID:1723:1585` | `#152663` al 30 % |
| `Buttons/Seconadry/Text/button-secondary-text-hover` | `VariableID:1723:1586` | `#6A78A8` |

El borde de 2px hoy está vinculado directo a la semántica `Stroke/color-stroke-primary`, sin pasar por un token de componente. El grosor (2) está fijo.

---

## 2. Qué se reutiliza y qué se agrega

| Necesidad (producción) | Variable existente | Decisión |
|---|---|---|
| Fondo Primary `#FFCE00` | `button-primary-bakcground-default` (45:618) | ✅ reutilizar |
| Color del borde `#FFCE00` | `Semantic/Stroke/color-stroke-primary` | ✅ reutilizar como destino del alias |
| Texto Secondary `#152663` | `button-secondary-text` (45:630) | ✅ reutilizar |
| Hover Primary `#FFCE00` al 60 % | ninguna (los únicos colores con transparencia son overlay `#191919` al 50 % y dos transparentes al 0 %) | ➕ primitivo nuevo |
| Capa de pressed `#152663` al 30 % | `color-background-overlay` es `#191919` al 50 %: no coincide | ➕ primitivo nuevo |
| Texto hover Secondary `#6A78A8` | `Primitive/Secondary/color-secondary-300` `#626E96` | ✅ reutilizar (decisión D1) |
| Grosor de borde 2px | no hay variables de grosor en el archivo | ➕ variable numérica nueva |

---

## 3. Estructura objetivo

```
Primitive (oculto, scopes = [])
├─ Primary/color-primary-500-a60        #FFCE00 @60%   ➕
├─ Secondary/color-secondary-500-a30    #152663 @30%   ➕
└─ Secondary/color-secondary-300        #626E96        ✅ existente (reemplaza #6A78A8)

Semantic
└─ Stroke/color-stroke-primary          → Primary/color-primary-500   ✅ existente

Specific / Buttons/   (sólo web MiCorreo)
├─ Primary/Background/button-primary-bakcground-default   → color-background-primaryBrand   ✅ sin cambios
├─ Primary/Background/button-primary-bakcground-hover     → color-primary-500-a60           ✏️ cambia de alias
├─ Primary/Background/button-primary-bakcground-pressed   → color-primary-500-a60           ✏️ cambia de alias
├─ Primary/Stroke/button-primary-stroke-default           → color-stroke-primary            ➕
├─ Seconadry/Stroke/button-secondary-stroke-default       → color-stroke-primary            ✅ sin cambios (ya es #FFCE00)
├─ Seconadry/Stroke/button-secondary-stroke-hover         → color-stroke-primary            ✏️ hoy → primary-600
├─ Seconadry/Stroke/button-secondary-stroke-pressed       → color-stroke-primary            ✏️ hoy → primary-700
├─ Seconadry/Text/button-secondary-text-hover             → color-secondary-300             ✏️ hoy valor fijo → alias
├─ Pressed/button-pressed-overlay                         → color-secondary-500-a30         ✏️ hoy valor fijo → alias
└─ Stroke/button-border-width                             = 2 (FLOAT, scope STROKE_FLOAT)   ➕
```

Todas las variables nuevas llevan scopes acotados y code syntax WEB (`var(--…)`).

---

## 4. Pasos

| # | Paso | Afecta | Riesgo |
|---|---|---|---|
| 1 | **Desvincular el backoffice:** en Buttons 2.0, cambiar las vinculaciones de la tabla 1.1 a su equivalente en `Buttons 2/` | 11 nodos de Buttons 2.0 + 1 instancia | Bajo: mismos valores, sin cambio visual. Se valida con una captura antes y después |
| 2 | Crear los 2 primitivos con transparencia en `Primitive` (no existe ningún equivalente para reutilizar) | variables | Nulo |
| 3 | Re-apuntar los tokens existentes de `Buttons/` (hover, pressed, stroke hover, stroke pressed) a sus alias nuevos | variables `Buttons/` | Bajo, porque después del paso 1 sólo los usa v1.0 |
| 4 | Crear `button-primary-stroke-default` y `button-border-width`; convertir `button-secondary-text-hover` y `button-pressed-overlay` de valor fijo a alias | variables | Nulo |
| 5 | Volver a vincular las 21 variantes de v1.0: fondos a `…-hover` / `…-pressed` existentes, bordes a los tokens de stroke, grosor a `button-border-width` | Buttons v1.0 | Bajo |
| 6 | Borrar la provisoria `button-primary-background-hover-prod` (1723:1584), que reemplaza `…-hover` | 1 variable | Nulo, después del paso 5 |
| 7 | Validar: ningún nodo de v1.0 con color fijo; ningún nodo fuera de v1.0 usando `Buttons/`; captura de v1.0 y de 2.0 sin cambios visuales | — | — |
| 8 | Actualizar `design-system-handoff/tokens.json`, `theme.ts` (comentarios `// FIGMA:`) y `components/buttons.md` con los nombres finales | paquete | Nulo |

**Fuera de alcance:** corregir los errores de tipeo de los nombres (`bakcground`, `Seconadry`, `Bacground`). Renombrarlos rompe la trazabilidad con el código; conviene hacerlo en una tarea aparte coordinada con los DEVs (`INCONSISTENCIAS.md` #13).

---

## 5. Decisiones

**Criterio general (UX, 2026-11-05):** reutilizar lo que ya existe en el design system. Sólo se crea lo que no tiene equivalente. La deriva con producción se revisa después en una auditoría con los DEVs.

| # | Pregunta | Resolución |
|---|---|---|
| D1 | Texto hover de Secondary: `#6A78A8` (producción) o `secondary-300` | ✅ **`secondary-300 #626E96`**. Ver brecha abajo |
| D2 | ¿Pressed tiene su propio token de fondo o reutiliza el de hover? | ✅ se reutiliza el token existente `…-pressed`, que apunta al mismo primitivo que hover; la diferencia la da la capa |
| D3 | Publicación de la librería | pendiente: la publica UX después del paso 7 |

### Brecha D1: `#6A78A8` (producción) vs. `secondary-300` `#626E96` (design system)

| | `#6A78A8` | `#626E96` |
|---|---|---|
| Diferencia RGB | — | −8 / −10 / −18 (algo más oscuro y menos saturado) |
| Luminosidad (L*) | 51,1 | 46,9 |
| Diferencia perceptual (ΔE76) | 6,0: se nota sólo si se ponen uno al lado del otro; en un hover pasa inadvertida |
| Contraste sobre blanco | **4,32 : 1** ❌ no llega a AA (4,5) | **5,01 : 1** ✅ cumple AA |

Reutilizar `secondary-300` no sólo evita un color nuevo: además **corrige un problema de accesibilidad** de producción. Este cambio queda registrado como deriva intencional para la auditoría con los DEVs.

## 6. Deriva intencional respecto de producción (para la auditoría con los DEVs)

| Elemento | Producción | Design system | Motivo |
|---|---|---|---|
| Texto hover Secondary | `#6A78A8` | `secondary-300 #626E96` | reutilizar un token existente; contraste AA |
| Disabled Primary | `#FFCE00` al 60 % (igual al hover) | `#D9D9D9` / `#A7A7A7` | en producción no se distingue del hover |
| Alto del botón | 44 | 40 (M) / 48 (L) | se mantiene la escala de Figma |
