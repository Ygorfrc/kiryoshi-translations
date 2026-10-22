import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.push(file);
  }
}
await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
const htmlByPath = new Map(
  await Promise.all(
    pages.map(async (file) => [file, await readFile(file, 'utf8')]),
  ),
);
const errors = [];
let links = 0;
for (const [file, html] of htmlByPath) {
  for (const [, raw] of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    if (/^(?:[a-z]+:|\/\/)/i.test(raw)) continue;
    const decoded = raw.replaceAll('&amp;', '&');
    const current = path
      .relative(root, file)
      .replaceAll('\\', '/')
      .replace(/index\.html$/, '');
    const url = new URL(decoded, `https://internal.invalid/${current}`);
    const target = path.join(root, decodeURIComponent(url.pathname));
    const candidates = [
      target,
      path.join(target, 'index.html'),
      `${target}.html`,
    ];
    let found;
    for (const candidate of candidates) {
      try {
        await access(candidate);
        if (files.includes(candidate)) {
          found = candidate;
          break;
        }
      } catch {}
    }
    links++;
    if (!found) {
      errors.push(`${path.relative(root, file)} → ${raw}`);
      continue;
    }
    if (url.hash && htmlByPath.has(found)) {
      const id = decodeURIComponent(url.hash.slice(1));
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`id=["']${escaped}["']`).test(htmlByPath.get(found)))
        errors.push(`${path.relative(root, file)} → âncora ausente ${raw}`);
    }
  }
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) errors.push(`${path.relative(root, file)}: ${h1} títulos h1`);
  if (!html.includes('lang="pt-BR"')) errors.push(`${file}: idioma ausente`);
}
for (const route of [
  'index.html',
  'traducoes/index.html',
  'traducoes/soul-hackers/index.html',
  'devlog/index.html',
  'sobre/index.html',
  'apoie/index.html',
  'contato/index.html',
  'privacidade/index.html',
  'aviso-legal/index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'rss.xml',
]) {
  try {
    await access(path.join(root, route));
  } catch {
    errors.push(`Rota obrigatória ausente: ${route}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `${pages.length} páginas HTML verificadas; ${links} links/assets/âncoras internos válidos; rotas obrigatórias presentes.`,
);
