export interface CatalogItem {
  id: string;
  title: string;
  platform: string;
  status: string;
  updated?: string;
  order?: number;
}
export interface Filters {
  query: string;
  platform: string;
  status: string;
  sort: string;
}
export const defaultFilters: Filters = {
  query: '',
  platform: '',
  status: '',
  sort: 'order',
};
export function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}
export function filterTranslations(
  items: CatalogItem[],
  filters: Filters,
): CatalogItem[] {
  const words = normalize(filters.query).split(/\s+/).filter(Boolean);
  return items
    .filter(
      (item) =>
        words.every((word) => normalize(item.title).includes(word)) &&
        (!filters.platform || item.platform === filters.platform) &&
        (!filters.status || item.status === filters.status),
    )
    .sort((a, b) => {
      if (filters.sort === 'order') {
        const difference = (a.order ?? 100) - (b.order ?? 100);
        if (difference) return difference;
      }
      if (filters.sort === 'updated') {
        const delta =
          (b.updated ? Date.parse(b.updated) : -Infinity) -
          (a.updated ? Date.parse(a.updated) : -Infinity);
        if (delta && !Number.isNaN(delta)) return delta;
      }
      return a.title.localeCompare(b.title, 'pt-BR');
    });
}
