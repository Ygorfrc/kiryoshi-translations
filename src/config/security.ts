import headers from '../../public/_headers?raw';

// Pages does not read _headers. Keep the same supported CSP in the HTML.
// frame-ancestors requires an HTTP header and cannot be enforced by a meta tag.
export const metaCsp = headers
  .match(/^\s*Content-Security-Policy:\s*(.+)$/m)![1]!
  .split(';')
  .map((directive) => directive.trim())
  .filter((directive) => !directive.startsWith('frame-ancestors '))
  .join('; ');
