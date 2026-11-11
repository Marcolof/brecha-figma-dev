# Revisión de UX de las diferencias (2026-11-11)

- **Qué es:** las decisiones de UX sobre las observaciones del catálogo de diferencias del Hub. Prevalecen sobre lo anotado en la auditoría del 2026-11-04 ([estados-interactivos-micorreo.md](estados-interactivos-micorreo.md)) y en la auditoría del flujo `/internacional` (06/11, reverificada el 10/11).
- **Antes de la revisión:** los valores se revalidaron contra el CSS de producción y de dev (2026-11-11).
- **Cambios que van en Figma:** [tareas-figma.md](../propuestas/tareas-figma.md).

## Componentes

| Observación | Decisión | Estado en el Hub |
|---|---|---|
| Disabled del Primary igual al hover | Se elimina: no corresponde, son componentes distintos | Eliminada |
| Focus con sombra en vez de contorno | En Figma el foco es un cambio de color del borde (`#FFCE00` → `#FFF0B0`). Cumple la misma función que la sombra de producción | Resuelta |
| Alto y padding distintos | Producción y dev (44 de alto) están bien. Se corrige Figma | Cambio pendiente en Figma (F1) |
| Hover con fondo transparente | Figma ya tiene el 60 % en todas las variantes Hover (por ejemplo 49:4488). Coincide con el código de producción y de dev | Resuelta |
| Pressed con ripple de MUI | Se omite: es una limitación de Figma. Queda como mejora (componente interactivo) | Eliminada; mejora M1 |
| Botón Secondary | Se aplica el mismo criterio que al Primary. El borde de 2px ya está en Figma salvo en Disabled; el Focus del Secondary es igual al reposo | Resuelta; tareas F2 y F3 |
| Botones del header sin hover | No es válida: ni producción ni Figma llevan hover. En Figma, «Ver más» pasó a «Mi cuenta» | Eliminada |
| El foco del input no se ve | No es válida: según UX, en producción, dev y Figma el foco se pone azul | Eliminada |
| Hover del input casi invisible | No es relevante por ahora | En observación |
| Radio del input 8 en lugar de 4 | El valor correcto es 4 (Figma). Corrigen producción (8) y dev (5) | Abierta; tarea F4 (token `radius-xs`) |

## Visuales

| Código | Observación | Decisión | Estado en el Hub |
|---|---|---|---|
| GEN-01 | El menú de usuario dice «Mi cuenta» | Resuelto en Figma («Ver más» pasó a «Mi cuenta») | Eliminada |
| DEC-04 | Con fines comerciales sigue visible «Detallá la categoría…» | Dev está bien: el texto se agrega en la Declaración comercial de Figma | Cambio pendiente en Figma (F5) |
| DEC-07 | La pestaña «Masivo» está en negrita | Además del peso, en dev sobra el hover: Figma y producción no tienen hover en esas pestañas | Abierta |
| DEC-12 | La categoría bloqueada muestra la flecha de lista | Se corrige Figma: hay que usar el componente Select deshabilitado | Cambio pendiente en Figma (F6) |

## Documentos que quedan desactualizados en parte

Estos documentos están aprobados y no se modificaron. Donde contradicen esta revisión, manda esta revisión:

- [plan-tokens-buttons-v1.md](plan-tokens-buttons-v1.md) §6: «Alto del botón: se mantiene la escala de Figma» y la deriva del Disabled del Primary.
- [spec de estados de Mi Correo 2.0](../propuestas/estados-mi-correo-2/spec.md), observación 4: dice que el foco del input de producción usa `#E0E0E0`.
