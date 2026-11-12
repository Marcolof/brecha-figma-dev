# Revisión de UX de las diferencias (2026-11-11)

- **Qué es:** las decisiones de UX sobre las observaciones del catálogo de diferencias del Hub. Prevalecen sobre lo anotado en la auditoría del 2026-11-04 ([estados-interactivos-micorreo.md](estados-interactivos-micorreo.md)) y en la auditoría del flujo `/internacional` (06/11, reverificada el 10/11).
- **Antes de la revisión:** los valores se revalidaron contra el CSS de producción y de dev (2026-11-11).
- **Cambios que van en Figma:** [tareas-figma.md](../propuestas/tareas-figma.md). **Cambios que van en DEV:** [tareas-dev.md](../propuestas/tareas-dev.md).
- **Numeración:** cada punto lleva un número fijo `<tab>.<orden>` (1 Componentes, 2 Visuales, 3 Funcionales, 4 Ambiente), el mismo que muestra el Hub. Los números no se reutilizan.

## Revisión del 2026-11-12

Prevalece sobre la del 11/11 donde se contradicen.

| N.º | Código | Observación | Decisión | Responsable | Estado en el Hub |
|---|---|---|---|---|---|
| 1.1 | — | Focus: Figma cambia el color del borde; producción usa sombra | DEV revisa los estados de los botones (revisar Material UI). Reemplaza «Resuelta» del 11/11 | DEV | Cambio pendiente en DEV |
| 1.2 | — | Alto y padding: hay que ajustar Figma | Propuesta: altura de 40 para el botón M. Reemplaza «llevar todo a 44» (F1) | Figma | Cambio pendiente en Figma (F1, propuesta) |
| 1.16 | — | Switch de fines comerciales en la versión anterior | DEV actualiza el switch (mismo punto que 2.3) | DEV | Cambio pendiente en DEV |
| 2.1 | GEN-02 | Los campos son más bajos | El campo mide 40 de alto (hoy 38 en dev). Figma hoy mide 42: a confirmar si pasa a 40 | DEV | Cambio pendiente en DEV |
| 2.2 | DEC-06 | El título «Nuevo envío \| Paquetería» es más grande | Pasa a 28 px SemiBold, como en dev. Se corrige Figma | Figma | Cambio pendiente en Figma (F7) |
| 2.3 | DEC-03 | El interruptor de fines comerciales está en la versión anterior | DEV actualiza el switch a la versión 2 | DEV | Cambio pendiente en DEV |
| 2.4 | DEC-04 | Con fines comerciales sigue visible «Detallá la categoría…» | DEV quita el texto en los envíos con fines comerciales. Figma está bien. Reemplaza la decisión del 11/11 (F5 descartada) | DEV | Cambio pendiente en DEV |
| 2.5 | DEC-05 | La leyenda de la declaración (DESP) tiene un párrafo de más | DEV sigue la tarea: la leyenda termina en «…punto E.» | DEV | Cambio pendiente en DEV |
| 2.6 | DEC-07 | La pestaña «Masivo» está en negrita y tiene hover | Dev y Figma van a Medium 16; Figma ya está actualizado. Falta confirmar en dev el tamaño y el hover que sobra | DEV (verificar) | Resuelta en Figma |
| 2.7 | DEC-08 | Los textos de ejemplo de los selectores son más chicos | DEV revisa que use el componente de Material: texto de 16 px. Figma está bien. El campo mide 40 de alto (hoy 38) | DEV | Cambio pendiente en DEV |
| 2.8 | DEC-09 | El rango geográfico está en plural y sin negrita | Sigue pendiente: DEV pone el valor en negrita (Medium) | DEV | Cambio pendiente en DEV |
| 2.10 | DEC-11 | El modal comercial muestra enlaces y URL distintos | Pendiente de que negocio defina el destino de los enlaces | Negocio | Pendiente de definición |
| 2.11 | DEC-12 | Con fines comerciales, la categoría bloqueada muestra la flecha de lista | UX cambia el Figma (Select deshabilitado). DEV está bien | Figma | Cambio pendiente en Figma (F6) |
| 2.12 | PAQ-02 | «Guardar medida» se ve como un botón del navegador | Abierto a definición (en dev va un mock). Figma elige un botón para ese lugar y DEV cambia el estilo según ese botón | Figma y DEV | Pendiente de definición (F8) |
| 2.13 | PAQ-03 | Los rótulos de peso y la ayuda del peso máximo son distintos | En Figma los rótulos pasan a 16 px. DEV está bien | Figma | Cambio pendiente en Figma (F9) |

## Revisión del 2026-11-11

## Componentes

| Observación | Decisión | Estado en el Hub |
|---|---|---|
| Disabled del Primary igual al hover | Se elimina: no corresponde, son componentes distintos | Eliminada |
| Focus con sombra en vez de contorno | En Figma el foco es un cambio de color del borde (`#FFCE00` → `#FFF0B0`). Cumple la misma función que la sombra de producción | ~~Resuelta~~ → reemplazada el 12/11 (1.1) |
| Alto y padding distintos | Producción y dev (44 de alto) están bien. Se corrige Figma | Cambio pendiente en Figma (F1); propuesta cambiada el 12/11 (1.2) |
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
| DEC-04 | Con fines comerciales sigue visible «Detallá la categoría…» | Dev está bien: el texto se agrega en la Declaración comercial de Figma | ~~Cambio pendiente en Figma (F5)~~ → reemplazada el 12/11 (2.4) |
| DEC-07 | La pestaña «Masivo» está en negrita | Además del peso, en dev sobra el hover: Figma y producción no tienen hover en esas pestañas | Abierta; actualizada el 12/11 (2.6) |
| DEC-12 | La categoría bloqueada muestra la flecha de lista | Se corrige Figma: hay que usar el componente Select deshabilitado | Cambio pendiente en Figma (F6) |

## Documentos que quedan desactualizados en parte

Estos documentos están aprobados y no se modificaron. Donde contradicen esta revisión, manda esta revisión:

- [plan-tokens-buttons-v1.md](plan-tokens-buttons-v1.md) §6: «Alto del botón: se mantiene la escala de Figma» y la deriva del Disabled del Primary.
- [spec de estados de Mi Correo 2.0](../propuestas/estados-mi-correo-2/spec.md), observación 4: dice que el foco del input de producción usa `#E0E0E0`.
