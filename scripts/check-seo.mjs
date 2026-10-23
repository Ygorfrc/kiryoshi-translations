import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

// A reserved .test origin is used only in this isolated QA build. Never deploy .qa/.
const origin = 'https://kiryoshi.validation.test';
await new Promise((resolve, reject) => {
  const child = spawn(
    process.execPath,
    ['scripts/astro.mjs', 'build', '--outDir', '.qa/seo'],
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        PUBLIC_SITE_URL: origin,
        PUBLIC_BASE_PATH: '/',
        PUBLIC_NOINDEX: 'false',
      },
    },
  );
  child.on('error', reject);
  child.on('exit', (code) =>
    code === 0 ? resolve() : reject(new Error(`Build SEO: ${code}`)),
  );
});
const root = path.resolve('.qa/seo');
// Check the indexed build too, including its inert JSON-LD script blocks.
await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, ['scripts/check-security.mjs', root], {
    stdio: 'inherit',
  });
  child.on('error', reject);
  child.on('exit', (code) =>
    code === 0 ? resolve() : reject(new Error(`Segurança SEO: ${code}`)),
  );
});
const pages = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await walk(file);
    else if (item.name.endsWith('.html')) pages.push(file);
  }
}
await walk(root);
const titles = new Set();
const descriptions = new Set();
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/name="description" content="(.*?)"/)?.[1];
  assert.ok(title);
  assert.ok(description);
  assert.ok(!titles.has(title), `Título duplicado: ${title}`);
  titles.add(title);
  assert.ok(
    !descriptions.has(description),
    `Descrição duplicada: ${description}`,
  );
  descriptions.add(description);
  assert.ok(html.includes(`rel="canonical" href="${origin}/`));
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('name="twitter:card"'));
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/g,
  ))
    JSON.parse(json);
}
const home = await readFile(path.join(root, 'index.html'), 'utf8');
assert.ok(home.includes('content="index, follow"'));
assert.ok(home.includes('"@type":"WebSite"'));
const demo = await readFile(
  path.join(root, 'devlog/01-boas-vindas/index.html'),
  'utf8',
);
assert.ok(demo.includes('content="noindex, nofollow"'));
assert.ok(!demo.includes('"@type":"BlogPosting"'));
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.ok(sitemap.includes(`${origin}/traducoes/`));
assert.ok(!sitemap.includes('/devlog/01-boas-vindas/'));
assert.ok(sitemap.includes(`${origin}/traducoes/soul-hackers/`));
const soulHackers = await readFile(
  path.join(root, 'traducoes/soul-hackers/index.html'),
  'utf8',
);
assert.ok(soulHackers.includes('content="index, follow"'));
assert.ok(
  soulHackers.includes('Soul Hackers: tradução PT-BR para Nintendo 3DS'),
);
assert.ok(soulHackers.includes('Baixe a prévia para Azahar ou Luma3DS'));
assert.ok(soulHackers.includes('Em desenvolvimento'));
assert.ok(!soulHackers.includes('Cadastro inicial configurável'));
for (const slug of [
  'devil-survivor-overclocked',
  'devil-survivor-2-record-breaker',
  'strange-journey-redux',
  'smt-iv-apocalypse',
]) {
  const html = await readFile(
    path.join(root, `traducoes/${slug}/index.html`),
    'utf8',
  );
  assert.ok(html.includes('content="noindex, nofollow"'));
  assert.ok(!sitemap.includes(`/traducoes/${slug}/`));
}
const devlog = await readFile(path.join(root, 'devlog/index.html'), 'utf8');
assert.ok(devlog.includes('content="noindex, nofollow"'));
assert.ok(!sitemap.includes(`${origin}/devlog/</loc>`));
assert.ok(!sitemap.includes('/devlog/categoria/'));
for (const slug of ['comunidade', 'ferramentas']) {
  const html = await readFile(
    path.join(root, `devlog/categoria/${slug}/index.html`),
    'utf8',
  );
  assert.ok(html.includes('content="noindex, nofollow"'));
}
const rss = await readFile(path.join(root, 'rss.xml'), 'utf8');
assert.ok(!rss.includes('<item>'));
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const preview = await readFile('dist/index.html', 'utf8');
if (!process.env.PUBLIC_SITE_URL) {
  assert.ok(preview.includes('content="noindex, nofollow"'));
  assert.ok(!preview.includes('rel="canonical"'));
}
console.log(
  `SEO: ${pages.length} páginas com títulos/descrições únicos; canonical, OG, Twitter, JSON-LD, sitemap e RSS validados. dist/ preservado.`,
);
