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
