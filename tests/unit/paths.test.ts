import { describe, expect, it } from 'vitest';
import { parseBasePath, prefixPath } from '../../src/config/url.mjs';
import basePaths from '../../scripts/markdown-base.mjs';

describe('caminhos de publicação', () => {
  it('normaliza a raiz e o caminho do Pages e rejeita origens e traversal', () => {
    expect(parseBasePath(undefined)).toBe('/');
    expect(parseBasePath('/kiryoshi-translations')).toBe(
      '/kiryoshi-translations/',
    );
    for (const value of [
      'https://example.org',
      '//host/',
      '/../secret/',
      '/a?b/',
    ])
      expect(() => parseBasePath(value)).toThrow();
  });
  it('prefixa caminhos locais sem duplicar a base ou alterar URLs externas', () => {
    const base = '/kiryoshi-translations/';
    expect(prefixPath('/traducoes/', base)).toBe(`${base}traducoes/`);
    expect(prefixPath(`${base}traducoes/`, base)).toBe(`${base}traducoes/`);
    expect(prefixPath('/traducoes/', '/')).toBe('/traducoes/');
    for (const value of [
      '#downloads',
      'https://example.org/a',
      '//cdn.test/a',
      'mailto:a@example.org',
      'relative.png',
    ])
      expect(prefixPath(value, base)).toBe(value);
  });
  it('corrige links e imagens de conteúdo Markdown e mantém os externos', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'element', properties: { href: '/sobre/' } },
        { type: 'element', properties: { src: '/images/example.png' } },
        { type: 'element', properties: { href: 'https://example.org' } },
      ],
    };
    const plugin = basePaths({ base: '/preview/' });
    for (const node of tree.children)
      plugin.element.visit(node, {
        setProperty: (
          node: { properties: Record<string, string> },
          key: string,
          value: string,
        ) => {
          node.properties[key] = value;
        },
      });
    expect(tree.children.map((node) => node.properties)).toEqual([
      { href: '/preview/sobre/' },
      { src: '/preview/images/example.png' },
      { href: 'https://example.org' },
    ]);
  });
});
