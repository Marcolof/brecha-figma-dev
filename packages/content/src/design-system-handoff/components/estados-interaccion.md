# Estados de interacción (hover y focus)

Tokens **semánticos globales**: se usan en cualquier tarjeta, fila u opción clickeable, no en un componente puntual. Se agregaron el 2026-11-06. Detalle y motivos en [../../propuestas/estados-mi-correo-2/spec.md](../../propuestas/estados-mi-correo-2/spec.md).

| Token Figma | Valor | En `theme.ts` | Uso |
|---|---|---|---|
| `Background/color-background-hover` | `#F2F2F2` | `palette.action.hover` · `tokens.state.hoverBackground` | Fondo en hover |
| `Stroke/color-stroke-hover` | `#A7A7A7` | `tokens.state.hoverStroke` | Borde en hover (también en `OutlinedInput`) |
| `Stroke/color-stroke-selected` | `#152663` | `tokens.state.selectedStroke` | Borde de tarjeta u opción seleccionada |
| `Background/color-background-focus` | `#00229D` al 10 % (sobre blanco, `#E6E9F5`) | `palette.action.focus` · `tokens.state.focusBackground` | Foco de teclado: capa azulada sobre el fondo, un poco más oscura que el hover |

## Reglas

- **Disabled** no tiene hover ni focus.
- Si selected o error ya cambian el borde, ese borde se mantiene. En hover cambia sólo el fondo.
- **Pressed** no se dibuja: lo da el ripple de MUI.
- El foco es sólo para teclado: usar `:focus-visible` o `.Mui-focusVisible`. Es una superficie, no un contorno; el borde queda como en el estado de reposo.
- El foco es una capa con transparencia: va **sobre** el fondo del componente y no lo reemplaza.

```tsx
import { tokens } from '@/design-system/theme';

<CardActionArea
  sx={{
    border: 1,
    borderColor: 'divider',
    borderRadius: 1,
    '&:hover': { bgcolor: 'action.hover', borderColor: tokens.state.hoverStroke },
    // capa de foco sobre el fondo (bgcolor no se pisa)
    '&.Mui-focusVisible': { backgroundImage: `linear-gradient(${tokens.state.focusBackground}, ${tokens.state.focusBackground})` },
  }}
/>
```

## Componentes de Mi Correo 2.0 con estos estados

| Componente Figma | Estados | MUI sugerido |
|---|---|---|
| Artículo (`interacción` = default / hover / focus) | toda la tarjeta; si está expandida, sólo el área de arriba | `Accordion` / `CardActionArea` |
| Acciones de Artículo (Eliminar, Editar) | instancias de Buttons 2.0 `borderless` y `borderless link` (DS); los estados vienen del botón | `Button variant="borderless"` (ver `buttons.md`) |
| Servicio postal internacional (`status` = Hover / Focus) | hover, focus; con selected, el borde navy se mantiene | `Radio` dentro de `CardActionArea` |
| Clasificación / Opción (`Interacción` = Default / Hover / Focus) | hover, focus | `ListItemButton` |
| Clasificación / Volver | hover, focus | `IconButton size="small"` |
| AI ROW VUCE (`Property 1` = Hover) | hover, que también es la fila activa con teclado | opción de `Autocomplete` |
