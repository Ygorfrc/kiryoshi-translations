/** A missing public URL deliberately disables indexation and absolute metadata. */
export function parseSiteUrl(value) {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    /(^|\.)example\.(com|org|net)$|localhost|127\.0\.0\.1/.test(url.hostname)
  ) {
    throw new Error(
      'PUBLIC_SITE_URL deve ser a origem HTTPS de um domínio público real.',
    );
  }
  return url.origin;
}

export function parseBasePath(value) {
  const base = value?.trim() || '/';
  const normalized = base.endsWith('/') ? base : `${base}/`;
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(normalized))
    throw new Error(
      'PUBLIC_BASE_PATH deve ser / ou um caminho como /repositorio/.',
    );
  return normalized;
}

/** Prefix only site-local paths, preserving anchors and external URLs. */
export function prefixPath(value, base = '/') {
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  const normalized = parseBasePath(base);
  if (normalized === '/' || value.startsWith(normalized)) return value;
  return `${normalized.slice(0, -1)}${value}`;
}
