import { texts, images, syncedAt } from '@brecha/content';
import { hubModules, type HubModule } from '../hub.config';

export { texts, images, syncedAt };

/** Ruta del Hub para un documento: «/doc/auditoria-brecha/estados-interactivos-micorreo». */
export const docRoute = (path: string) => '/doc/' + path.replace(/\.md$/, '');

/** Inversa de docRoute. */
export const pathFromRoute = (splat: string) => decodeURIComponent(splat) + '.md';

const cleanInline = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();

export function docTitle(path: string): string {
  const m = texts[path]?.match(/^#\s+(.+)$/m);
  return m ? cleanInline(m[1]) : path.split('/').pop()!.replace(/\.md$/, '');
}

/** Estado declarado por el propio documento («- **Estado:** …»), recortado a una frase. */
export function docStatus(path: string): string | null {
  const m = texts[path]?.match(/\*\*Estado:\*\*\s*(.+)/);
  if (!m) return null;
  const s = cleanInline(m[1]).split(/(?<=\))\.|\. /)[0];
  return s.length > 64 ? s.slice(0, 61) + '…' : s;
}

export const moduleById = (id: string) => hubModules.find((m) => m.id === id);

export const moduleOfDoc = (path: string): HubModule | undefined => hubModules.find((m) => m.docs.includes(path));

/** Resuelve un href relativo de un documento a una ruta de contenido normalizada. */
export function resolveRelative(fromPath: string, href: string): string {
  const base = fromPath.split('/').slice(0, -1);
  for (const part of href.split('#')[0].split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') base.pop();
    else base.push(decodeURIComponent(part));
  }
  return base.join('/');
}

export function downloadText(path: string) {
  const body = texts[path];
  if (body == null) return;
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = path.split('/').pop()!;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Tono del tag de estado según palabras clave. */
export function statusTone(status: string): 'ok' | 'warn' | 'neutral' {
  const s = status.toLowerCase();
  if (/aplicad|vigente|✅/.test(s)) return 'ok';
  if (/pendiente|propuesta|en curso|revisar|implementaci|📝|🔧|⏳/.test(s)) return 'warn';
  return 'neutral';
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || d.getFullYear() < 2000) return 'sin sincronizar';
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}
