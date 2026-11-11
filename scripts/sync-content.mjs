// Copia los informes originales (fuera del repo) a packages/content/src.
// Los originales son la fuente: no editar packages/content/src a mano.
// Uso: npm run sync  (sólo en el equipo de trabajo; Vercel usa la copia commiteada)
import { cp, rm, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workRoot = resolve(repoRoot, '..'); // «Book de componentes CORREO»
const dest = join(repoRoot, 'packages', 'content', 'src');

// Carpetas de origen que forman el reporte. PEI-166 no se publica.
const SOURCES = ['auditoria-brecha', 'design-system-handoff', 'propuestas'];

const missing = SOURCES.filter((s) => !existsSync(join(workRoot, s)));
if (missing.length) {
  console.error(`✖ No encuentro: ${missing.join(', ')} en ${workRoot}`);
  console.error('  Este script corre sólo en el equipo de trabajo, no en Vercel.');
  process.exit(1);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

for (const s of SOURCES) {
  await cp(join(workRoot, s), join(dest, s), { recursive: true });
}

async function list(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await list(p)));
    else out.push(relative(dest, p).split('\\').join('/'));
  }
  return out;
}

const files = (await list(dest)).sort();
const manifest = { syncedAt: new Date().toISOString(), sources: SOURCES, files };
await writeFile(join(repoRoot, 'packages', 'content', 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

console.log(`✔ ${files.length} archivos copiados a packages/content/src (${manifest.syncedAt})`);
