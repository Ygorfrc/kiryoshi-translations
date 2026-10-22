export const previewOnly = import.meta.env.PUBLIC_NOINDEX === 'true';
export const hosting =
  import.meta.env.PUBLIC_HOSTING === 'github-pages'
    ? 'github-pages'
    : 'cloudflare';
