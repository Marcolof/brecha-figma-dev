# Tareas pendientes en Figma

- **Origen:** revisión de UX de las diferencias de Componentes (2026-11-11), sobre la auditoría [estados-interactivos-micorreo.md](../auditoria-brecha/estados-interactivos-micorreo.md) y el catálogo de diferencias del Hub.
- **Archivo:** Design System (`kOuwVxF91lktyHh1DSVuAr`), salvo que se indique otro.
- **Regla:** cada tarea se marca como hecha recién después de verificarla en Figma. Al cerrarla, se actualiza la diferencia del Hub que la originó.

## Tareas

| # | Tarea | Componente | Origen | Estado |
|---|---|---|---|---|
| F1 | **Propuesta (12/11):** altura de 40 para el botón M. Reemplaza la versión del 11/11 («llevar todo a 44»). Hoy Figma tiene 32 (S), 40 (M) y 48 (L); producción y dev, 44. Definir también el padding: producción usa 6/16 y dev 8/19,2 | `Buttons v1.0` (49:4524), Primary y Secondary | 1.2 · «Alto y padding: hay que ajustar Figma» | Propuesta |
| F2 | Borde de 2px en todos los estados del Secondary. Revisado el 2026-11-11: reposo, hover, focus y pressed ya tienen 2px. Sólo los Disabled (Primary y Secondary) quedan con 1px: confirmar si también pasan a 2px | `Buttons v1.0`, Secondary | Diferencia «Borde de 2px en lugar de 1px» | A confirmar |
| F3 | Focus del Secondary: hoy es igual al reposo. Aplicar el mismo criterio que el Primary (cambio de color del borde) | `Buttons v1.0`, Secondary · Focus | Revisión del focus (2026-11-11) | Pendiente |
| F4 | Agregar `radius-xs` = 4 a la colección Radius (hoy el mínimo es 8) y vincularlo al input | Variables · Radius, `Text Fields` (183:2366) | Diferencia «Radio de borde 8 en lugar de 4»; [INCONSISTENCIAS.md](../design-system-handoff/INCONSISTENCIAS.md) #8 | Pendiente |
| F5 | ~~Agregar el texto «Detallá la categoría…» en la Declaración con fines comerciales~~. Descartada el 12/11: Figma está bien y el texto lo quita DEV | **Mi Correo 2.0**, pantalla 11695:15835 | 2.4 · DEC-04 | Descartada |
| F6 | Categoría bloqueada con fines comerciales («Venta de mercadería»): reemplazar el campo de sólo lectura por el componente **Select** deshabilitado | **Mi Correo 2.0**, pantalla 11695:15835 y demás pantallas comerciales de Declaración | 2.11 · DEC-12 | Pendiente |
| F7 | Título «Nuevo envío \| Paquetería»: pasar a 28 px SemiBold (hoy 24 px Medium), como en dev | **Mi Correo 2.0**, pantallas del flujo internacional | 2.2 · DEC-06 | Pendiente |
| F8 | «Guardar medida»: elegir un botón para ese lugar (hoy es un enlace azul). Después DEV ajusta el estilo | **Mi Correo 2.0**, pantalla 11695:15272 (Paquete) | 2.12 · PAQ-02 | Pendiente de definición |
| F9 | Rótulos de peso del paso Paquete y ayuda del peso máximo: pasar a 16 px | **Mi Correo 2.0**, pantalla 11695:15272 (Paquete) | 2.13 · PAQ-03 | Pendiente |
| F10 | Alto de los campos: confirmar si pasa de 42 a 40, como se pide a DEV | **Mi Correo 2.0**, campos del flujo internacional | 2.1 · GEN-02 y 2.7 · DEC-08 | A confirmar |

## Mejoras de Figma (sin fecha)

| # | Mejora | Motivo |
|---|---|---|
| M1 | Crear un componente interactivo para el pressed de los botones (prototipo con la interacción «mientras se presiona») | Figma no puede representar el ripple de MUI con un estado fijo. Hoy se aproxima con una capa `#152663` al 30 % |

## Ya hecho (referencia)

- Hover transparente del Primary (`#FFCE00` al 60 %, `color-primary-500-a60`) en todas las variantes Hover de `Buttons v1.0`, por ejemplo 49:4488. Coincide con el código de producción y de dev.
- Texto de los botones del header: «Ver más» pasó a «Mi cuenta» (UX, 2026-11-11).
- Pestaña «Masivo»: Medium 16 (UX, 2026-11-12; 2.6 · DEC-07).
- Focus del Primary: el borde de 2px pasa a `#FFF0B0` (cambio de color, sin sombra), en todos los tamaños de `Buttons v1.0`.
- Switch de fines comerciales v2 (**Mi Correo 2.0**): variantes `version=v2` del componente «Fines comerciales switch» (10933:13731), 15293:25588 y 15293:25599. Dev sigue en la v1.
