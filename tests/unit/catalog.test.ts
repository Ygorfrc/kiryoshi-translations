import { describe, expect, it } from 'vitest';
import {
  defaultFilters,
  filterTranslations,
  normalize,
  type CatalogItem,
} from '../../src/lib/catalog';
const items: CatalogItem[] = [
  {
    id: 'soul',
    title: 'Soul Hackers',
    platform: 'Nintendo 3DS',
    status: 'Em desenvolvimento',
  },
  {
    id: 'beta',
    title: 'Tradução Beta',
    platform: 'PSP',
    status: 'Disponível',
    updated: '2026-02-02',
  },
  {
    id: 'alpha',
    title: 'Álpha Journey',
    platform: 'Nintendo 3DS',
    status: 'Planejado',
    updated: '2026-01-01',
  },
];
describe('catálogo', () => {
  it('usa a ordem editorial por padrão e permite mudar para nome', () => {
    const ordered = items.map((item, index) => ({ ...item, order: index + 1 }));
    expect(
      filterTranslations(ordered, defaultFilters).map((item) => item.id),
    ).toEqual(['soul', 'beta', 'alpha']);
    expect(
      filterTranslations(ordered, { ...defaultFilters, sort: 'name' }).map(
        (item) => item.id,
      ),
    ).toEqual(['alpha', 'soul', 'beta']);
  });
  it('normaliza acentos, maiúsculas e espaços', () => {
    expect(normalize('  TRADUÇÃO  ')).toBe('traducao');
  });
  it('busca todos os termos sem diferenciar acentos', () => {
    expect(
      filterTranslations(items, {
        ...defaultFilters,
        query: 'BETA traducao',
      }).map((i) => i.id),
    ).toEqual(['beta']);
  });
  it('combina busca, plataforma e status', () => {
    expect(
      filterTranslations(items, {
        ...defaultFilters,
        query: 'soul',
        platform: 'Nintendo 3DS',
        status: 'Planejado',
      }),
    ).toEqual([]);
    expect(
      filterTranslations(items, {
        ...defaultFilters,
        platform: 'Nintendo 3DS',
        status: 'Planejado',
      }).map((i) => i.id),
    ).toEqual(['alpha']);
  });
  it('ordena alfabeticamente sem alterar o array original', () => {
    expect(filterTranslations(items, defaultFilters).map((i) => i.id)).toEqual([
      'alpha',
      'soul',
      'beta',
    ]);
    expect(items[0]?.id).toBe('soul');
  });
  it('ordena por atualização e coloca datas ausentes ao final', () => {
    expect(
      filterTranslations(items, { ...defaultFilters, sort: 'updated' }).map(
        (i) => i.id,
      ),
    ).toEqual(['beta', 'alpha', 'soul']);
  });
  it('trata lista vazia e busca sem resultados', () => {
    expect(filterTranslations([], defaultFilters)).toEqual([]);
    expect(
      filterTranslations(items, { ...defaultFilters, query: '<script>' }),
    ).toEqual([]);
  });
});
