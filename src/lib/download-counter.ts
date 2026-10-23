/** Public collection endpoint only; credentials never belong in this setting. */
export function parseDownloadCounter(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.goatcounter\.com$/.test(url.hostname) ||
    !['/', '/count'].includes(url.pathname) ||
    url.search ||
    url.hash
  )
    throw new Error(
      'PUBLIC_DOWNLOAD_COUNTER_URL deve ser o endereço HTTPS da sua conta GoatCounter, sem credenciais ou parâmetros.',
    );
  return `${url.origin}/count`;
}

/** Keep the Pages meta policy and the Cloudflare HTTP policy aligned. */
export function assertDownloadCounterCsp(
  endpoint: string | undefined,
  headers: string,
) {
  if (!endpoint) return;
  const connect = headers
    .match(/(?:^|;)\s*connect-src\s+([^;\r\n]+)/m)?.[1]
    ?.split(/\s+/);
  const origin = new URL(endpoint).origin;
  if (!connect?.includes(origin))
    throw new Error(
      `Adicione somente ${origin} à diretiva connect-src de public/_headers antes de ativar o contador.`,
    );
}

/** No destination URL, query strings, referrer or visitor identifier in the event. */
export function downloadEventUrl(
  endpoint: string,
  project: string,
  version: string,
  nonce: string,
) {
  const url = new URL(endpoint);
  url.searchParams.set('p', `download:${project}:${version}`);
  url.searchParams.set('t', `Baixar patch · ${project} · ${version}`);
  url.searchParams.set('e', 'true');
  // Count clicks independently instead of grouping repeated clicks in a session.
  url.searchParams.set('ns', 'true');
  url.searchParams.set('r', '');
  url.searchParams.set('rnd', nonce);
  return url.href;
}
