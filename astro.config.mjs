import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { parseBasePath, parseSiteUrl } from './src/config/url.mjs';
import basePaths from './scripts/markdown-base.mjs';

const env = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  'PUBLIC_',
);
const site = parseSiteUrl(process.env.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL);
const base = parseBasePath(
  process.env.PUBLIC_BASE_PATH ?? env.PUBLIC_BASE_PATH,
);
export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: { processor: satteri({ hastPlugins: [basePaths({ base })] }) },
  // Keep executable scripts in local files so the HTTP CSP can forbid inline JS.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
