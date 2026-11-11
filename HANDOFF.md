# Handoff: publicar la actualización de brecha-hub

> Para la sesión de Claude que publica desde la cuenta con acceso a GitHub y Vercel.
> Fecha: 2026-11-11 · Estado: **cambios listos y verificados en local, sin commit, sin push.**

---

## 1. Prompt para arrancar la sesión

Copiá esto como primer mensaje en la sesión nueva, abierta en la carpeta `brecha-hub`:

```text
Leé HANDOFF.md y README.md de esta carpeta. El repo ya existe y está publicado
(GitHub Marcolof/brecha-figma-dev, Vercel brecha-figma-dev.vercel.app). Hay cambios
locales listos y verificados sin commitear. Tu trabajo: revisar el diff, compilar,
commitear, hacer push a main y verificar la URL pública con la lista de la sección 4.
Pedime autorización antes del commit y antes del push. No modifiques
packages/content/src a mano ni corras npm run sync.
```

---

## 2. Estado actual

| Ítem | Estado |
|---|---|
| Repo | `https://github.com/Marcolof/brecha-figma-dev` · rama `main` · **público** |
| Último commit publicado | `20b2fa3` «Capturas de producción: inputs, foco del Primary y hover de link» |
| URL pública | https://brecha-figma-dev.vercel.app (Vercel despliega solo con cada push a `main`) |
| Protección de acceso | ninguna, por decisión de UX (2026-11-11) |
| Cambios locales | sin commitear (ver sección 3) |
| `npm run build` | ✅ en local, 2026-11-11 |
| Verificación local (`npm run preview`, puerto 4180) | ✅ home con dos tarjetas, flecha de volver, detalle de diferencias, documentos nuevos, recarga de rutas profundas, 375 px sin scroll horizontal, sin errores de consola |

`gh` no está instalado; no hace falta. Para el push alcanza con `git` y las credenciales de la cuenta que publica.

---

## 3. Qué cambió desde `20b2fa3`

**Front del Hub (`apps/hub/src`)**
- Home nueva en `/` (`pages/Hub.tsx`) con dos tarjetas: **Diferencias** y **Documentación**.
- Los títulos «Diferencias Figma ↔ Web» y «Documentación» tienen una flecha para volver al Hub (`components/BackTitle.tsx`).
- El logo del header lleva al Hub; en la home no queda marcada ninguna sección.
- Dos estados nuevos de diferencia: «Cambio pendiente en Figma» (`cambio-figma`) y «En observación» (`en-observacion`), con su color y su conteo.
- Íconos nuevos `diff` y `docs`.
- `hub.config.ts`: suma `revision-ux-2026-11-11.md` (Auditoría) y `tareas-figma.md` (Planes y propuestas).

**Contenido (`packages/content`, copia sincronizada)**
- `diferencias.json`: 66 diferencias (16 componentes · 29 visuales · 14 funcionales · 7 ambiente).
  - Revalidación de los valores contra el CSS de producción y de dev.
  - Nuevo: «Switch de fines comerciales en la versión anterior» (2 imágenes nuevas).
  - Revisión de UX: se eliminaron 5 diferencias (disabled del Primary, pressed con ripple, hover del header, foco del input y GEN-01) y otras cambiaron de estado.
- Documentos nuevos: `auditoria-brecha/revision-ux-2026-11-11.md` y `propuestas/tareas-figma.md` (tareas F1–F6 y mejora M1).
- Documentos alineados con la revisión: `estados-interactivos-micorreo.md`, `INCONSISTENCIAS.md`, `PLAN-NORMALIZACION.md`, `components/buttons.md` y `components/inputs.md`.

**Raíz:** `README.md` y este `HANDOFF.md`, actualizados.

---

## 4. Pasos para publicar

Cada paso con efecto externo necesita **autorización explícita** de la persona.

1. **Revisar el diff:** `git status` y `git diff --stat`. No tienen que aparecer `node_modules/`, `dist/`, `.vercel/` ni archivos `.env`. Tienen que aparecer los archivos nuevos de `apps/hub/src` y de `packages/content/src`.
2. **Compilar:** `npm install` (si hace falta) y `npm run build`. Tiene que terminar sin errores.
3. **Commit** (con autorización): `git add -A` y un mensaje como «Hub con home, revisión de UX de diferencias y tareas de Figma».
4. **Push** (con autorización): `git push origin main`. Si el remoto tiene commits que no están en local, **detenerse y consultar**. No forzar el push ni reescribir el historial.
5. **Verificar la URL pública** cuando Vercel termine el deploy:
   - [ ] `/` muestra el Hub con las tarjetas Diferencias y Documentación.
   - [ ] La tarjeta Diferencias abre `/diferencias/componentes` y la flecha del título vuelve a `/`.
   - [ ] La tarjeta Documentación abre `/documentacion` y la flecha del título vuelve a `/`.
   - [ ] Recargar con F5 `/diferencias/visuales/dec-07` y `/doc/propuestas/tareas-figma` no da 404.
   - [ ] `/diferencias/componentes/mc2-switch-fines` muestra las dos imágenes con sus rectángulos rojos.
   - [ ] En Componentes aparecen los estados «Cambio pendiente en Figma» y «En observación».
   - [ ] Los botones de descarga del módulo Handoff (`theme.ts`, `tokens.json`, regla de Cursor) descargan el archivo.
   - [ ] La URL pública no enlaza a `localhost` ni a rutas `file://`.
6. Avisar a la persona la URL y el estado alcanzado: *deployed* (desplegado) o *verified* (verificado en la URL pública).

---

## 5. Qué no hacer

- No editar `packages/content/src` a mano ni correr `npm run sync` desde otra máquina: los originales viven en la carpeta padre de este equipo.
- No crear otro repo ni otro proyecto de Vercel. Si el deploy falla, corregir la configuración del proyecto existente.
- No hacer push forzado ni reescribir el historial.
- No publicar `PEI-166-descripcion.md` (carpeta padre; no está en el repo).

---

## 6. Pendientes que no bloquean la publicación

- Tareas en Figma F1–F6 y mejora M1 (`propuestas/tareas-figma.md`).
- Captura de producción del hover de «Mis envíos» (requiere sesión).
- `theme.ts` en el repo de los DEVs, auditoría de deriva con los DEVs y comparador vivo Figma ↔ MUI (diferido).
