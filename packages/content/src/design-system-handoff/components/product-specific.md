# Componentes de producto (MiCorreo / Gestión)

Son composiciones de negocio, no primitivos. Se construyen combinando los componentes base del theme. Están documentados para que los DEVs sepan que existen; antes de implementarlos, conviene abrir el nodo en Figma.

| Componente | Nodo | Se construye con |
|---|---|---|
| Filtros: `Opciones filtros`, `Buscador filtro`, `Botones filtros`, `Horarios` | [248:1410](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=248-1410) | `Chip` (Select), `TextField` con ícono de búsqueda, `Button` |
| `Calendario` (default / select) | 219:732 | `@mui/x-date-pickers` → `DateCalendar`. Contenedor 312×312, padding 16, radio 12, borde `#2562EA` ⚠ no es variable, encabezados Gilroy SemiBold 14–16 |
| Filtros específicos: `Destino` (13 variantes), `Producto`, `Estado` | [367:2093](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=367-2093) | `Chip` Select + `Menu`/`Popover` con `Radio`/`Checkbox` y `DateCalendar` |
| `mis envios card` (individual / masivo, step 1 / 3) | [837:1117](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=837-1117) | `Card` 460 de ancho, título SemiBold 16, secciones SemiBold 14, link "Editar" Medium 12. `v1 PROD` vs `v2 (Multidepósito)` |
| `masivo origne drop down info`, `sucursal masivo` | 837:1240, 837:1270 | `Accordion` / `Collapse` |
| `Componente tabla completo` | 367:1983 | ver `layout-navigation.md` → Tabla |
| `icon for empy state` (S/M/L/XL) | 1033:1736 | ícono Lucide dentro de círculo, usado en modales y estados vacíos |
| Brand: `Logo`, `Iso` (Azul), `Imagen` | [49:151](https://www.figma.com/design/kOuwVxF91lktyHh1DSVuAr/Design-System?node-id=49-151) | exportar SVG desde Figma (no recrear) |

## Iconografía

Página `🎨 Iconografía` (43:533): **1510 íconos de Lucide** + íconos especiales de Correo (`fulfillment icon`, 1652:1463).
→ En código usar `lucide-react` con el mismo nombre (`alarm-clock-check` → `<AlarmClockCheck />`). Exportar como SVG sólo los íconos especiales de Correo.
