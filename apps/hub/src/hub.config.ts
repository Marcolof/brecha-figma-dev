// Módulos del Hub. Cada documento es una ruta dentro de packages/content/src.
// Sólo se listan módulos y documentos que existen (el Hub refleja el estado real).
import { texts } from '@brecha/content';

export type IconName = 'audit' | 'plan' | 'handoff' | 'diff' | 'docs';

export interface HubModule {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: IconName;
  docs: string[];
  downloads?: { path: string; label: string }[];
}

export const project = {
  name: 'Brecha Figma ↔ Web',
  client: 'Correo Argentino · Design System',
  version: 'v1',
};

const componentDocs = Object.keys(texts)
  .filter((p) => p.startsWith('design-system-handoff/components/') && p.endsWith('.md'))
  .sort((a, b) => (a.endsWith('buttons.md') ? -1 : b.endsWith('buttons.md') ? 1 : a.localeCompare(b)));

const exists = (p: string) => p in texts;

const modules: HubModule[] = [
  {
    id: 'auditoria',
    title: 'Auditoría de brecha',
    description: 'Qué difiere entre producción MiCorreo y el Figma del design system.',
    status: 'Vigente',
    icon: 'audit',
    docs: [
      'auditoria-brecha/revision-ux-2026-11-11.md',
      'auditoria-brecha/estados-interactivos-micorreo.md',
      'design-system-handoff/INCONSISTENCIAS.md',
      'design-system-handoff/INVENTARIO.md',
    ],
  },
  {
    id: 'planes',
    title: 'Planes y propuestas',
    description: 'Cambios aplicados en Figma y propuestas pendientes de aprobación.',
    status: 'En curso',
    icon: 'plan',
    docs: [
      'propuestas/tareas-figma.md',
      'auditoria-brecha/plan-tokens-buttons-v1.md',
      'propuestas/estados-mi-correo-2/spec.md',
      'design-system-handoff/PLAN-NORMALIZACION.md',
    ],
  },
  {
    id: 'handoff',
    title: 'Handoff para desarrollo',
    description: 'Theme de MUI, tokens y ficha de cada componente.',
    status: 'Para revisar con DEVs',
    icon: 'handoff',
    docs: ['design-system-handoff/README.md', ...componentDocs],
    downloads: [
      { path: 'design-system-handoff/theme.ts', label: 'theme.ts' },
      { path: 'design-system-handoff/tokens.json', label: 'tokens.json' },
      { path: 'design-system-handoff/cursor/design-system.mdc', label: 'Regla de Cursor (design-system.mdc)' },
    ],
  },
];

export const hubModules: HubModule[] = modules
  .map((m) => ({ ...m, docs: m.docs.filter(exists), downloads: m.downloads?.filter((d) => exists(d.path)) }))
  .filter((m) => m.docs.length > 0);
