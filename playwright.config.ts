import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: '**/pages.spec.ts',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:8787',
    headless: true,
    trace: 'retain-on-failure',
    launchOptions: { channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' },
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: 'mobile',
      use: {
        viewport: { width: 320, height: 740 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    // Exercise the real _headers rules; Astro preview doesn't apply them.
    command:
      'node node_modules/wrangler/bin/wrangler.js dev --local --ip 127.0.0.1 --port 8787 --log-level warn',
    env: { WRANGLER_SEND_METRICS: 'false' },
    url: 'http://127.0.0.1:8787',
    reuseExistingServer: false,
    timeout: 60000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
