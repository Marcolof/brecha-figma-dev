// Catálogo de diferencias Figma ↔ web. La fuente editable es
// ../auditoria-brecha/diferencias/diferencias.json (se copia con npm run sync).
import { images, texts } from '@brecha/content';

const SOURCE = 'auditoria-brecha/diferencias/diferencias.json';
const BASE = 'auditoria-brecha/diferencias/';

export type Severity = 'alta' | 'media' | 'baja';
export type DiffStatus = 'abierta' | 'resuelta' | 'a-confirmar' | 'cambio-figma' | 'cambio-dev' | 'a-definir' | 'en-observacion';
export type Owner = 'Figma' | 'DEV' | 'Negocio';

export interface Highlight {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Qué se muestra de cada lado: captura, captura pendiente, no existe en Figma o un fragmento de código. */
export type Side = (
  | { kind: 'capture'; image: string; caption: string; highlights: Highlight[] }
  | { kind: 'pending'; caption: string }
  | { kind: 'missing'; caption: string }
  | { kind: 'code'; caption: string; code: string }
  | { kind: 'na'; caption: string }
) & {
  /** Reemplaza el subtítulo del panel (por ejemplo, «Mi Correo 2.0 · local»). */
  sublabel?: string;
};

export interface DiffItem {
  id: string;
  /** Número fijo del punto: <tab>.<orden> (por ejemplo, 2.3). No se reutiliza. */
  num?: string;
  /** Quién tiene que actuar. */
  owners?: Owner[];
  /** Código de la auditoría de origen (por ejemplo, DEC-01). */
  code?: string;
  /** Fuente en texto cuando no es un documento del Hub. */
  sourceNote?: string;
  category: string;
  group: string;
  title: string;
  summary: string;
  /** Sin severidad cuando la fuente no la define (por ejemplo, problemas del ambiente). */
  severity?: Severity;
  status: DiffStatus;
  figma: Side;
  web: Side;
  /** Segunda fuente web: entorno dev (otra implementación). */
  dev?: Side;
  devNote?: string;
  details: string[];
  values: { prop: string; figma: string; web: string; dev?: string }[];
  decision?: string;
  sources: string[];
}

export interface DiffCategory {
  id: string;
  title: string;
  description: string;
  status: 'relevado' | 'pendiente';
  note: string;
}

interface Catalog {
  updated: string;
  sides: Record<'figma' | 'web', { label: string; sublabel: string }> & { dev?: { label: string; sublabel: string } };
  categories: DiffCategory[];
  items: DiffItem[];
}

const empty: Catalog = {
  updated: '',
  sides: { figma: { label: 'Figma', sublabel: '' }, web: { label: 'Web', sublabel: '' } },
  categories: [],
  items: [],
};

export const catalog: Catalog = texts[SOURCE] ? (JSON.parse(texts[SOURCE]) as Catalog) : empty;

export const categories = catalog.categories;
export const sides = catalog.sides;

export const itemsOf = (categoryId: string) => catalog.items.filter((i) => i.category === categoryId);

export const categoryById = (id: string) => categories.find((c) => c.id === id);

export const itemById = (categoryId: string, id: string) =>
  catalog.items.find((i) => i.category === categoryId && i.id === id);

/** Agrupa conservando el orden de aparición. */
export function groupItems(items: DiffItem[]): { group: string; items: DiffItem[] }[] {
  const out: { group: string; items: DiffItem[] }[] = [];
  for (const it of items) {
    let g = out.find((x) => x.group === it.group);
    if (!g) out.push((g = { group: it.group, items: [] }));
    g.items.push(it);
  }
  return out;
}

export const imageUrl = (rel: string) => images[BASE + rel];

export const diffRoute = (categoryId: string, id?: string) => `/diferencias/${categoryId}${id ? '/' + id : ''}`;

export const severityLabel: Record<Severity, string> = { alta: 'Alta', media: 'Media', baja: 'Baja' };
export const statusLabel: Record<DiffStatus, string> = {
  abierta: 'Abierta',
  resuelta: 'Resuelta en Figma',
  'a-confirmar': 'A confirmar',
  'cambio-figma': 'Cambio pendiente en Figma',
  'cambio-dev': 'Cambio pendiente en DEV',
  'a-definir': 'Pendiente de definición',
  'en-observacion': 'En observación',
};
