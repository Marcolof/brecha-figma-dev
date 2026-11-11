# Inconsistencias encontradas en el Figma

Son hallazgos de la lectura del archivo, no de producción. Explican parte de la brecha entre Figma y producción. Cada uno indica qué asumió el `theme.ts` y quién debería decidir.

## Hallazgo principal: componentes duplicados sin indicar plataforma

El design system es de todo Correo, pero algunos componentes tienen dos versiones y **el nombre no dice para qué plataforma es cada una**.

### Botones — resuelto (confirmado por UX, 2026-11-04)

| | Web pública MiCorreo | Backoffices |
|---|---|---|
| Componente | `Buttons v1.0` | `Buttons 2.0` |
| Forma | pill | radio 8 |
| Secondary | borde amarillo | borde azul |
| Tertiary | link con línea amarilla | botón azul relleno |
| Extras | — | dark, light, light border |

Son **dos familias vigentes**, no una vieja y una nueva. El theme ahora exporta `themeWeb` y `themeBackoffice` (ver `components/buttons.md`).

**Por qué genera brecha:** los nombres `v1.0` / `2.0` hacen pensar que 2.0 reemplaza a v1.0. Un DEV de MiCorreo que lee "2.0" lo implementa y queda distinto a producción. Y como el modal `V2 (Buttons corrected)` usa botones 2.0, el mismo problema se propaga a otros componentes.

**Propuesta para Figma (UX):** renombrar `Buttons v1.0` → `Button / Web MiCorreo` y `Buttons 2.0` → `Button / Backoffice`, y agregar en la descripción de cada uno en qué plataforma se usa. Opcional: unificar ambos en un solo componente con la propiedad `Plataforma = Web | Backoffice`.

### Otros componentes duplicados — sin confirmar

| Componente | Versión A | Versión B | Pregunta abierta |
|---|---|---|---|
| Modal | `V1 (Prod)` | `V2 (Buttons corrected)` | ¿V1 = web y V2 = backoffice, como los botones? |
| Checkbox | `v1 (Correo 1.5)` (azul `#0078D4`, radio 2) | `v2` (navy, radio 4) | ¿"Correo 1.5" es MiCorreo? |
| Menú lateral | `1.0` (incluye `Sidebar-MiCorreo`) | `2.0` | ¿1.0 = web y 2.0 = backoffice? |
| Card envío | `v1 PROD` | `v2 (Multidepósito)` | parece evolución de la misma pantalla de MiCorreo, no plataforma |

Mientras no se confirme, el theme usa **la versión B para las dos plataformas** en estos componentes.

## Lista de hallazgos

| # | Hallazgo | Impacto | Qué asume el theme | Decide |
|---|---|---|---|---|
| 1 | Buttons v1.0 (web) y 2.0 (backoffice) con nombres que no indican plataforma (ver arriba) | Alto | dos themes: `themeWeb` / `themeBackoffice` | UX renombra en Figma |
| 2 | **No hay Text Styles.** La tipografía sólo existe como ejemplo en la sección Tipografía; en los componentes el line-height varía (auto, 150 %, 16 px) | Alto: cada DEV interpreta distinto | escala h1–h5 + body con line-height 1.5 | UX |
| 3 | `Buttons/Disabled/Text/button-text-disabled` (y su par en `Buttons 2`) apunta a `color-background-disabled` (`#D9D9D9`): texto del mismo color que el fondo, contraste 1:1. Los componentes de v1.0 no la usan (usan `color-text-disabled`), pero la variable queda disponible y es una trampa | Alto (accesibilidad) | usa `#A7A7A7` | UX corrige la variable |
| 4 | Texto disabled `#A7A7A7` sobre blanco: contraste 2,41:1 | Medio (WCAG lo permite en disabled, pero se lee mal) | se mantiene | UX |
| 5 | Tertiary disabled: blanco sobre `#BBCEF8`, contraste 1,58:1 | Medio | se mantiene | UX |
| 6 | Borde de input `#D9D9D9` sobre blanco: contraste 1,41:1 (WCAG pide 3:1 para bordes de controles) | Medio (accesibilidad) | se mantiene | UX |
| 7 | Texto error `#F03131` sobre blanco: 4,05:1 (no llega a 4,5:1 en texto de 14 px) | Medio | se mantiene; `error-600 #DA2D2D` sí cumple | UX |
| 8 | Inputs, checkbox y tooltip usan radios de 4 y 2, que no están en la colección Radius (mínimo 8) | Bajo | usa 4 y 2 tal cual | UX: agregar `radius-xs` |
| 9 | Variables huérfanas de otra librería: `G1`, `❌black 17_6%` (modal), `color-border-subtle #E5E7EC` (chip) | Medio: no se pueden rastrear | usa los valores hex | UX re-vincula |
| 10 | Colores sin variable: tooltip `#292929`, calendario `#2562EA`, checkbox v1 `#0078D4` | Bajo | hex | UX |
| 11 | No hay paleta Warning: `background-warning` y `text-warning` apuntan a neutros, `status/alert` es amarillo | Medio | `warning` = amarillo primario | UX |
| 12 | Hover y focus incompletos: Tertiary web (link) no cambia en ningún estado, ni siquiera disabled; Light y Light border tampoco; inputs y switch sin hover; sólo Primary tiene foco visible | Medio (accesibilidad de teclado) | agrega hover, disabled y foco propuestos | UX. En producción MiCorreo se usan los defaults de MUI (fondo al 60 %, ripple, borde de 2px): ver `../auditoria-brecha/estados-interactivos-micorreo.md` |
| 13 | Nombres con errores que quedan en el código si se exportan: `bakcground`, `Seconadry`, `Bacground`, `succes`, `warnign`, `acent`, `empy`, `Dekstop`, `Activ` | Bajo, pero se propaga | el theme usa nombres corregidos | UX renombra |
| 14 | Colecciones `Buttons` (usada por v1.0 / web) y `Buttons 2` (usada por 2.0 / backoffice) en Specific: tienen sentido como dos familias, pero el nombre no lo dice | Bajo | web usa `Buttons`, backoffice usa `Buttons 2` | UX renombra a `Buttons Web` / `Buttons Backoffice` |
| 15 | Tabs: el borde usa una variable llamada `input-stroke-default` (nombre de input) que apunta a amarillo | Bajo | línea gris `#D9D9D9` | UX |
| 16 | Header Tablet-Mobile usa Inter en el avatar; la documentación tipográfica usa Poppins en una nota | Bajo | Gilroy | UX |
| 17 | Sin sombras (effect styles) definidas, aunque cards y menús desplegables las necesitan | Medio | sin sombra | UX |
| 18 | Variable `Cadena` = "Label*" en Primitive (no es un token) | Bajo | ignorada | UX |

## Contraste de los pares principales (WCAG 2.1)

| Par | Ratio | AA texto normal (4,5) |
|---|---|---|
| Navy sobre amarillo (Primary) | 9,45 | ✅ |
| Blanco sobre link-500 (Tertiary) | 5,23 | ✅ |
| Blanco sobre navy (dark, chip activo) | 14,1 | ✅ |
| `#474747` sobre blanco (label, placeholder) | 9,29 | ✅ |
| Blanco sobre success (switch) | 4,32 | ⚠ (sólo ícono, no aplica a texto) |
| Error `#F03131` sobre blanco | 4,05 | ❌ |
| Disabled `#A7A7A7` sobre blanco | 2,41 | exento (disabled) |
