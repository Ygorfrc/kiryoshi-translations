import { test, expect, type Page } from '@playwright/test';

// Only in-memory test responses. No account or patch is created or contacted.
const origin = 'https://counter-fixture.goatcounter.com';
async function fixture(page: Page, enabled: boolean) {
  await page.route('**/traducoes/soul-hackers/', async (route) => {
    const response = await route.fetch();
    let body = await response.text();
    const headers = { ...response.headers() };
    body = body.replace(
      /data-endpoint(?:="[^"]*")?(?=[\s>])/,
      `data-endpoint="${enabled ? `${origin}/count` : ''}"`,
    );
    if (enabled) {
      body = body.replace(
        /(<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content=")([^"]*)(")/,
        (_all, start, content, end) =>
          start + content.replace(/connect-src[^;]*/, `$& ${origin}`) + end,
      );
      headers['content-security-policy'] = headers[
        'content-security-policy'
      ]!.replace(/connect-src[^;]*/, `$& ${origin}`);
    }
    body = body.replace(
      '</main>',
      `<a id="download-fixture" href="#fixture-target" data-download-project="soul-hackers" data-download-version="fixture">Baixar arquivo de teste</a><div id="fixture-target">Destino de teste</div></main>`,
    );
    await route.fulfill({ response, headers, body });
  });
}

test('contador desativado não faz requisições e o link funciona', async ({
  page,
}) => {
  const requests: string[] = [];
  await page.route(`${origin}/count**`, (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  await fixture(page, false);
  await page.goto('/traducoes/soul-hackers/');
  await page.locator('#download-fixture').click();
  await expect(page).toHaveURL(/#fixture-target$/);
  expect(requests).toEqual([]);
});

test('registra apenas o clique, sem referrer ou cookies, e mantém navegação', async ({
  page,
}) => {
  const requests: { url: string; headers: Record<string, string> }[] = [];
  await page.route(`${origin}/count**`, async (route) => {
    requests.push({
      url: route.request().url(),
      headers: await route.request().allHeaders(),
    });
    await route.fulfill({ status: 200, body: '' });
  });
  await fixture(page, true);
  await page.goto('/traducoes/soul-hackers/');
  expect(requests).toEqual([]);
  await page.locator('#download-fixture').click();
  await expect.poll(() => requests.length).toBe(1);
  await expect(page).toHaveURL(/#fixture-target$/);
  const event = new URL(requests[0]!.url);
  expect(event.searchParams.get('p')).toBe('download:soul-hackers:fixture');
  expect(event.searchParams.get('e')).toBe('true');
  expect(event.searchParams.get('ns')).toBe('true');
  expect(requests[0]!.headers.referer).toBeUndefined();
  expect(requests[0]!.headers.cookie).toBeUndefined();
  await page.locator('#download-fixture').click();
  await expect.poll(() => requests.length).toBe(2);
  expect(new URL(requests[1]!.url).searchParams.get('rnd')).not.toBe(
    event.searchParams.get('rnd'),
  );
});

test('falha de rede na contagem não cancela o link de download', async ({
  page,
}) => {
  let attempts = 0;
  await page.route(`${origin}/count**`, (route) => {
    attempts++;
    return route.abort();
  });
  await fixture(page, true);
  await page.goto('/traducoes/soul-hackers/');
  await page.locator('#download-fixture').click();
  await expect.poll(() => attempts).toBe(1);
  await expect(page).toHaveURL(/#fixture-target$/);
});

test('Global Privacy Control desativa a contagem', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }),
  );
  const requests: string[] = [];
  await page.route(`${origin}/count**`, (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  await fixture(page, true);
  await page.goto('/traducoes/soul-hackers/');
  await page.locator('#download-fixture').click();
  await expect(page).toHaveURL(/#fixture-target$/);
  expect(requests).toEqual([]);
});

test('Azahar e Luma3DS oferecem Drive principal e MediaFire alternativo com contagem em todos os links', async ({
  page,
  context,
}) => {
  const events: string[] = [];
  await page.route(`${origin}/count**`, async (route) => {
    events.push(new URL(route.request().url()).searchParams.get('p') ?? '');
    await route.fulfill({ status: 200, body: '' });
  });
  // Navigation is fulfilled locally: no downloads or real counter hits.
  for (const provider of [
    'https://drive.google.com/**',
    'https://www.mediafire.com/**',
  ]) {
    await context.route(provider, (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<p>Destino de teste</p>',
      }),
    );
  }
  await fixture(page, true);
  await page.goto('/traducoes/soul-hackers/#downloads');
  expect(events).toEqual([]);
  await expect(
    page
      .locator('#instalacao')
      .getByRole('heading', { name: 'Aplicação do patch', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator('#sobre-traducao')
      .getByRole('heading', { name: 'Aplicação do patch', exact: true }),
  ).toHaveCount(0);
  await expect(page.locator('#instalacao h2, #instalacao h3')).toHaveText([
    'Antes de instalar.',
    'Aplicação do patch',
    'Instalar no Azahar',
    'Instalar no Luma3DS',
    'Remover ou voltar à versão anterior',
  ]);
  const variants = [
    {
      target: 'Azahar',
      driveId: '1Kwr_oMOdBHJzDBjq04mT-bZX65nLTHs_',
      mirrorId: 'zs9nkh6849yg60m',
    },
    {
      target: 'Luma3DS',
      driveId: '1W2GwnCe6gkL_XqiLPqGP0QHTiH-woa52',
      mirrorId: 'be75q4myr9mh2af',
    },
  ];
  for (const variant of variants) {
    const card = page.getByRole('article', {
      name: `Patch v38 · ${variant.target}`,
      exact: true,
    });
    await expect(card).toContainText('PRÉVIA PARCIAL');
    const links = card.locator('a[data-download-project]');
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute(
      'href',
      `https://drive.google.com/file/d/${variant.driveId}/view?usp=sharing`,
    );
    await expect(links.nth(0)).toHaveClass(/button-primary/);
    await expect(links.nth(1)).toHaveAttribute(
      'href',
      new RegExp(`^https://www\\.mediafire\\.com/file/${variant.mirrorId}/`),
    );
    await expect(links.nth(1)).toHaveClass(/button-outline/);
    for (const link of await links.all()) {
      const popup = page.waitForEvent('popup');
      await link.click();
      const destination = await popup;
      await expect(destination).toHaveURL((await link.getAttribute('href'))!);
      await destination.close();
    }
    const tutorial = card.getByRole('link', { name: /^Como instalar/ });
    await tutorial.click();
    await expect(page).toHaveURL(
      new RegExp(`#instalar-no-${variant.target.toLowerCase()}$`),
    );
  }
  await expect.poll(() => events.length).toBe(4);
  expect(events).toEqual([
    'download:soul-hackers:v38 · Azahar',
    'download:soul-hackers:v38 · Azahar',
    'download:soul-hackers:v38 · Luma3DS',
    'download:soul-hackers:v38 · Luma3DS',
  ]);
});
