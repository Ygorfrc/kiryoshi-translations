/** Browser privacy signals apply equally to page visits and download events. */
export function collectionAllowed(privacy: {
  doNotTrack?: string | null;
  globalPrivacyControl?: boolean;
}) {
  return privacy.doNotTrack !== '1' && !privacy.globalPrivacyControl;
}

/** Static page metadata only: never include a visitor's search, hash or referrer. */
export function visitEventUrl(
  endpoint: string,
  path: string,
  title: string,
  nonce: string,
  automated = false,
) {
  const url = new URL(endpoint);
  url.searchParams.set('p', path.split(/[?#]/, 1)[0] || '/');
  url.searchParams.set('t', title);
  url.searchParams.set('r', '');
  url.searchParams.set('rnd', nonce);
  // Match the official integration's generic WebDriver bot marker.
  if (automated) url.searchParams.set('b', '153');
  // No e/ns: normal visits use the provider's session deduplication.
  return url.href;
}
