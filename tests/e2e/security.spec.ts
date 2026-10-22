import { test, expect } from '@playwright/test';

test('headers de segurança reais e scripts legítimos sem violações de CSP', async ({
  page,
}) => {
  const violations: string[] = [];
  page.on('console', (message) => {
    if (/violat.*content security policy/i.test(message.text()))
      violations.push(message.text());
  });
  for (const route of [
    '/',
    '/traducoes/',
    '/traducoes/soul-hackers/',
    '/devlog/01-boas-vindas/',
    '/rota-que-nao-existe/',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(route.includes('nao-existe') ? 404 : 200);
    const headers = response!.headers();
    expect(headers['content-security-policy']).toContain("script-src 'self';");
    expect(headers['content-security-policy']).toContain(
      "script-src-attr 'none'",
    );
    expect(headers['content-security-policy']).not.toMatch(
      /script-src[^;]*'unsafe-(inline|eval)'/,
    );
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    await expect(page.locator('html')).toHaveClass(/js-menu/);
  }
  expect(violations).toEqual([]);
});

test('CSP bloqueia JavaScript inline, handlers HTML e scripts de terceiros', async ({
  page,
}) => {
  // Inject only into a test response; no malicious content is saved to the site.
  await page.route('**/contato/', async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      '</body>',
      `<script>document.documentElement.dataset.cspProbe = 'executed'</script>
       <button id="csp-handler-probe" onclick="this.dataset.executed='yes'">Teste CSP</button>
       <script src="https://csp-probe.invalid/probe.js"></script></body>`,
    );
    await route.fulfill({ response, body });
  });
  const blocked: string[] = [];
  page.on('console', (message) => {
    if (/violat.*content security policy/i.test(message.text()))
      blocked.push(message.text());
  });
  await page.goto('/contato/');
  await expect(page.locator('html')).not.toHaveAttribute('data-csp-probe');
  const probe = page.locator('#csp-handler-probe');
  await probe.click();
  await expect(probe).not.toHaveAttribute('data-executed');
  expect(blocked.some((message) => /inline script/i.test(message))).toBe(true);
  expect(blocked.some((message) => /inline event handler/i.test(message))).toBe(
    true,
  );
  expect(blocked.some((message) => message.includes('csp-probe.invalid'))).toBe(
    true,
  );
});
