/// <reference types="vite/client" />
// Índice del contenido sincronizado. Las claves son rutas relativas a src/
// (por ejemplo «auditoria-brecha/estados-interactivos-micorreo.md»).
import manifest from './manifest.json';

const strip = <T,>(rec: Record<string, T>) =>
  Object.fromEntries(Object.entries(rec).map(([k, v]) => [k.replace(/^\.\/src\//, ''), v]));

/** Archivos de texto: Markdown, reglas de Cursor, theme y tokens. */
export const texts: Record<string, string> = strip(
  import.meta.glob('./src/**/*.{md,mdc,ts,json}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
);

/** Imágenes: URL final que genera el build. */
export const images: Record<string, string> = strip(
  import.meta.glob('./src/**/*.{png,jpg,jpeg,gif,svg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>,
);

export const syncedAt: string = manifest.syncedAt;
