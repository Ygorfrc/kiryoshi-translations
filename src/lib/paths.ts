import { prefixPath } from '../config/url.mjs';

export function withBase(path: string): string {
  return prefixPath(path, import.meta.env.BASE_URL);
}
