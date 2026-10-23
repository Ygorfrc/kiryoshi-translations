import { test, expect } from '@playwright/test';

test('Pages: caminhos, recursos e interações funcionam no subdiretório', async ({
  page,
  isMobile,
}) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400)
      failures.push(`${response.status()} ${response.url()}`);
  });
  page.on('console', (message) => {
    if (/violat.*content security policy/i.test(message.text()))
      failures.push(message.text());
  });
  await page.goto('./');
  await expect(page.locator('[data-visit-counter]')).toHaveAttribute(
    'data-visit-endpoint',
    '',
  );
  await expect(page.locator('html')).toHaveClass(/js-menu/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://kiryoshi.validation.test/kiryoshi-translations/',
  );
  await expect(
    page.locator('meta[http-equiv="Content-Security-Policy"]'),
  ).toHaveAttribute('content', /script-src 'self';/);
  await page
    .getByRole('button', { name: 'Próximo projeto', exact: true })
    .click();
  await expect(page.locator('.showcase-slide:visible')).toContainText(
    'Devil Survivor Overclocked',
  );
  if (isMobile) await page.locator('.menu-toggle').click();
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Traduções', exact: true })
    .click();
  await expect(page).toHaveURL(/\/kiryoshi-translations\/traducoes\/$/);
  await expect(page.locator('a[aria-current="page"]').first()).toHaveText(
    'Traduções',
  );
  await page.getByLabel('Buscar tradução').fill('soul');
  await expect(page.locator('#result-count')).toHaveText(
    '1 tradução encontrada',
  );
  await page
    .locator('#catalog-grid')
    .getByRole('link', { name: 'Soul Hackers', exact: true })
    .click();
  await expect(page).toHaveURL(
    /\/kiryoshi-translations\/traducoes\/soul-hackers\/$/,
  );
  await expect(page.locator('.game-cover-image')).toHaveJSProperty(
    'complete',
    true,
  );
  expect(
    await page
      .locator('.game-cover-image')
      .evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);
  await expect(page.locator('#downloads .release-card')).toHaveCount(2);
  await expect(page.locator('#downloads a[data-download-project]')).toHaveCount(
    4,
  );
  for (const target of ['azahar', 'luma3ds']) {
    await expect(
      page.locator(`#downloads a[href$="#instalar-no-${target}"]`),
    ).toHaveAttribute(
      'href',
      `/kiryoshi-translations/traducoes/soul-hackers/#instalar-no-${target}`,
    );
  }
  await page.goto('devlog/01-boas-vindas/');
  await page
    .getByRole('link', { name: 'princípios do projeto', exact: true })
    .click();
  await expect(page).toHaveURL(/\/kiryoshi-translations\/sobre\/$/);
  await page.goto('privacidade/');
  await expect(page.locator('main')).toContainText('GitHub Pages');
  const robots = await page.request.get('robots.txt');
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await page.request.get('sitemap.xml');
  expect(await sitemap.text()).not.toContain('<url>');
  const feed = await page.request.get('rss.xml');
  expect(await feed.text()).not.toContain('<item>');
  expect(failures).toEqual([]);
});

test('Pages: CSP via meta bloqueia scripts inline mesmo sem _headers', async ({
  page,
}) => {
  const blocked: string[] = [];
  page.on('console', (message) => {
    if (/violat.*content security policy/i.test(message.text()))
      blocked.push(message.text());
  });
  await page.route('**/kiryoshi-translations/contato/', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        '</body>',
        '<script>document.documentElement.dataset.cspProbe="executed"</script></body>',
      ),
    });
  });
  const response = await page.goto('contato/');
  expect(response?.headers()['content-security-policy']).toBeUndefined();
  await expect(page.locator('html')).not.toHaveAttribute('data-csp-probe');
  expect(blocked.some((message) => /inline script/i.test(message))).toBe(true);
});
