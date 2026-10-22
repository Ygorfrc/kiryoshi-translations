import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  testMatch: '**/pages.spec.ts',
  testIgnore: [],
  use: {
    ...baseConfig.use,
    baseURL: 'http://127.0.0.1:4322/kiryoshi-translations/',
  },
  webServer: {
    command:
      'node scripts/astro.mjs preview --outDir .qa/pages --host 127.0.0.1 --port 4322 --ignore-lock',
    url: 'http://127.0.0.1:4322/kiryoshi-translations/',
    reuseExistingServer: false,
    timeout: 60000,
  },
  outputDir: 'test-results/pages',
  reporter: [['list']],
});
