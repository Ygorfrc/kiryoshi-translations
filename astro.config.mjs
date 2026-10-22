import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { parseSiteUrl } from './src/config/url.mjs';

const env = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  'PUBLIC_',
);
const site = parseSiteUrl(process.env.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL);
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
  // Keep executable scripts in local files so the HTTP CSP can forbid inline JS.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
