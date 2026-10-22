import { normalize } from './catalog';
export const categorySlug = (category: string) =>
  normalize(category).replace(/\s+/g, '-');
