# Tareas pendientes en Figma

- **Origen:** revisión de UX de las diferencias de Componentes (2026-11-11), sobre la auditoría [estados-interactivos-micorreo.md](../auditoria-brecha/estados-interactivos-micorreo.md) y el catálogo de diferencias del Hub.
- **Archivo:** Design System (`kOuwVxF91lktyHh1DSVuAr`), salvo que se indique otro.
- **Regla:** cada tarea se marca como hecha recién después de verificarla en Figma. Al cerrarla, se actualiza la diferencia del Hub que la originó.

## Tareas

| # | Tarea | Componente | Origen | Estado |
|---|---|---|---|---|
| F1 | Ajustar el alto de los botones a 44, como producción y dev. Hoy Figma tiene 32 (S), 40 (M) y 48 (L). Definir también el padding: producción usa 6/16 y dev 8/19,2 | `Buttons v1.0` (49:4524), Primary y Secondary | Diferencia «Alto y padding: hay que ajustar Figma» | Pendiente |
| F2 | Borde de 2px en todos los estados del Secondary. Revisado el 2026-11-11: reposo, hover, focus y pressed ya tienen 2px. Sólo los Disabled (Primary y Secondary) quedan con 1px: confirmar si también pasan a 2px | `Buttons v1.0`, Secondary | Diferencia «Borde de 2px en lugar de 1px» | A confirmar |
| F3 | Focus del Secondary: hoy es igual al reposo. Aplicar el mismo criterio que el Primary (cambio de color del borde) | `Buttons v1.0`, Secondary · Focus | Revisión del focus (2026-11-11) | Pendiente |
| F4 | Agregar `radius-xs` = 4 a la colección Radius (hoy el mínimo es 8) y vincularlo al input | Variables · Radius, `Text Fields` (183:2366) | Diferencia «Radio de borde 8 en lugar de 4»; [INCONSISTENCIAS.md](../design-system-handoff/INCONSISTENCIAS.md) #8 | Pendiente |
| F5 | Agregar el texto «Detallá la categoría del envío y el contenido del paquete.» en la Declaración con fines comerciales, como en dev | **Mi Correo 2.0** (`wN6vAlF1TgGc2AJdJJvsAU`), pantalla 11695:15835 y demás pantallas comerciales de Declaración | DEC-04 (Visuales) | Pendiente |
| F6 | Categoría bloqueada con fines comerciales («Venta de mercadería»): reemplazar el campo de sólo lectura por el componente **Select** deshabilitado | **Mi Correo 2.0**, pantalla 11695:15835 y demás pantallas comerciales de Declaración | DEC-12 (Visuales) | Pendiente |

## Mejoras de Figma (sin fecha)

| # | Mejora | Motivo |
|---|---|---|
| M1 | Crear un componente interactivo para el pressed de los botones (prototipo con la interacción «mientras se presiona») | Figma no puede representar el ripple de MUI con un estado fijo. Hoy se aproxima con una capa `#152663` al 30 % |

## Ya hecho (referencia)

- Hover transparente del Primary (`#FFCE00` al 60 %, `color-primary-500-a60`) en todas las variantes Hover de `Buttons v1.0`, por ejemplo 49:4488. Coincide con el código de producción y de dev.
- Texto de los botones del header: «Ver más» pasó a «Mi cuenta» (UX, 2026-11-11).
- Focus del Primary: el borde de 2px pasa a `#FFF0B0` (cambio de color, sin sombra), en todos los tamaños de `Buttons v1.0`.
- Switch de fines comerciales v2 (**Mi Correo 2.0**): variantes `version=v2` del componente «Fines comerciales switch» (10933:13731), 15293:25588 y 15293:25599. Dev sigue en la v1.
