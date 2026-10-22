import { spawn } from 'node:child_process';

// Reserved origin and ignored output: this build is only for tests, never deploy it.
const env = {
  ...process.env,
  PUBLIC_SITE_URL: 'https://kiryoshi.validation.test',
  PUBLIC_BASE_PATH: '/kiryoshi-translations/',
  PUBLIC_NOINDEX: 'true',
  PUBLIC_HOSTING: 'github-pages',
};
async function run(args) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: 'inherit', env });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`Pages QA: ${code}`)),
    );
  });
}
await run(['scripts/astro.mjs', 'build', '--outDir', '.qa/pages']);
await run(['scripts/check-links.mjs', '.qa/pages', env.PUBLIC_BASE_PATH]);
await run(['scripts/check-security.mjs', '.qa/pages']);
await run([
  'node_modules/@playwright/test/cli.js',
  'test',
  '--config',
  'playwright.pages.config.ts',
]);
