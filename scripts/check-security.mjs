import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'dist');
const headers = await readFile(path.join(root, '_headers'), 'utf8');
const policy = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1];
assert.ok(policy, 'CSP ausente no pacote de publicação.');
const directives = new Map(
  policy.split(';').map((entry) => {
    const [name, ...sources] = entry.trim().split(/\s+/);
    return [name, sources];
  }),
);
assert.deepEqual(directives.get('script-src'), ["'self'"]);
assert.deepEqual(directives.get('script-src-attr'), ["'none'"]);
assert.deepEqual(directives.get('object-src'), ["'none'"]);
assert.deepEqual(directives.get('base-uri'), ["'none'"]);
assert.deepEqual(directives.get('frame-ancestors'), ["'none'"]);

let pages = 0;
let scripts = 0;
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await walk(file);
    else if (item.name.endsWith('.html')) {
      pages++;
      const html = await readFile(file, 'utf8');
      for (const [, attributes, body] of html.matchAll(
        /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
      )) {
        if (/\btype="application\/ld\+json"/i.test(attributes)) {
          JSON.parse(body);
          continue; // Inert metadata is not executable JavaScript.
        }
        const src = attributes.match(/\bsrc="([^"]+)"/i)?.[1];
        assert.ok(src?.startsWith('/') && !src.startsWith('//'), file);
        assert.equal(body.trim(), '', `JavaScript inline em ${file}`);
        scripts++;
      }
      assert.ok(
        !/<[a-z][^>]*\son[a-z]+\s*=/i.test(html),
        `Event handler inline em ${file}`,
      );
      assert.ok(!/\b(?:href|src)="\s*javascript:/i.test(html), file);
    }
  }
}
await walk(root);
assert.ok(pages > 0);
console.log(
  `Segurança: ${pages} páginas, ${scripts} scripts externos locais; CSP sem JavaScript inline e sem event handlers HTML.`,
);
