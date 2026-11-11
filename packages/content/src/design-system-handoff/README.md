# Design system Correo Argentino: paquete para desarrollo (MUI)

Este paquete traduce el Figma del design system a archivos que se pueden usar directamente en el repo de React + Material UI, **sin consultar Figma** (y sin gastar cuota del MCP).

- **Fuente:** [Figma · Design System](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=13-37) (`kOuwVxF91lktyHh1DSVuAr`)
- **Extracción:** 2026-11-04, leído de forma automática desde las variables y los componentes del archivo
- **Responsable de diseño:** equipo UX/UI

## Qué contiene

| Archivo | Para qué sirve |
|---|---|
| `theme.ts` | Theme de MUI listo para `<ThemeProvider>`: paleta, tipografía, radios y estilos de cada componente. Exporta **`themeWeb`** (MiCorreo) y **`themeBackoffice`** |
| `tokens.json` | Todos los tokens en formato W3C Design Tokens, por si se usan fuera de MUI (CSS, Style Dictionary) |
| `INVENTARIO.md` | Cada componente de Figma con su equivalente en MUI y su estado |
| `components/*.md` | Ficha por componente: variantes, tamaños, estados, medidas y props, con captura y link al nodo |
| `INCONSISTENCIAS.md` | Problemas del propio Figma que explican parte de la brecha con producción |
| `PLAN-NORMALIZACION.md` | Propuesta de pasos para normalizar Figma y alinear producción (PEI-166). Pendiente de aprobación |
| `cursor/design-system.mdc` | Regla para Cursor, para que la IA use estos archivos en vez del MCP |
| `img/` | Capturas de referencia exportadas de Figma |

## Una base, dos plataformas

El design system es de todo Correo. Colores, tipografía, inputs y demás son compartidos, pero **los botones cambian según la plataforma**:

| Plataforma | Botones Figma | Theme |
|---|---|---|
| Web pública MiCorreo | `Buttons v1.0`: pill, Secondary amarillo, Tertiary link | `themeWeb` |
| Backoffices | `Buttons 2.0`: radio 8, Secondary azul, Tertiary azul, + dark, light y light border | `themeBackoffice` |

Cada app importa su theme. El código de los componentes (`<Button variant="outlined">`) es el mismo, y el theme resuelve el estilo. Detalle en `components/buttons.md`.

## Cómo adoptarlo

1. **Copiar** la carpeta `design-system-handoff/` a la raíz del repo, o a `docs/`.
2. **Regla de Cursor:** copiar `cursor/design-system.mdc` a `.cursor/rules/design-system.mdc` en el repo.
3. **Fuente:** Gilroy es comercial. Agregar los `@font-face` con los archivos `.woff2` con licencia (300, 400, 500, 600 y 700).
4. **Íconos:** instalar `lucide-react`. Los nombres coinciden con los de Figma.
5. **Theme:** si ya tienen un theme, **no reemplazarlo de golpe**. Compararlo sección por sección (`palette`, `typography`, `components.MuiButton`, etc.) y migrar por componente. Cada valor de `theme.ts` tiene un comentario `// FIGMA:` que dice de dónde sale.
6. **Paleta invertida:** en el theme actual de MiCorreo, el amarillo es `secondary` (el botón amarillo usa `containedSecondary`). En este paquete el amarillo es `primary`, como en Figma. Hay que alinearlo antes de cambiar de theme, porque si no, los `color="secondary"` existentes cambian de color.
7. Revisar los puntos marcados con `⚠ PENDIENTE` en `theme.ts`: son lugares donde Figma no define algo o se contradice.

### Compatibilidad

Escrito para MUI v5.14+, v6 y v7. **No se compiló contra el repo de producción.** Confirmar la versión de MUI y correr `tsc` después de integrarlo.

### Decisiones a validar con el equipo

- **Espaciado:** Figma usa base 4 px y MUI usa base 8 px. Se mantuvo 8 para no romper el código existente. Equivalencia: `spacing-N` de Figma = `theme.spacing(N / 2)`.
- **Botones:** confirmado. v1.0 = web MiCorreo y 2.0 = backoffices.
- **Otros componentes con dos versiones** (Modal, Checkbox, Menú lateral): no se confirmó si también dependen de la plataforma. Por ahora ambos themes usan la versión más nueva. Ver `INCONSISTENCIAS.md`.

## Cómo se actualiza

Cuando cambie el Figma, UX regenera este paquete y lo entrega con la fecha nueva. No editar los valores a mano en el repo: si algo no coincide, avisar a UX para corregirlo en Figma y regenerar.
