import { test, expect, type Page } from '@playwright/test';

const origin = 'https://counter-fixture.goatcounter.com';
// Rewrite only the rendered configuration; every collector request is intercepted.
async function fixture(page: Page, enabled = true, correctOrigin = true) {
  await page.route('**/traducoes/soul-hackers/**', async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    let body = await response.text();
    body = body
      .replace(
        /data-visit-endpoint(?:="[^"]*")?(?=[\s>])/,
        `data-visit-endpoint="${enabled ? `${origin}/count` : ''}"`,
      )
      .replace(
        /data-visit-origin(?:="[^"]*")?(?=[\s>])/,
        `data-visit-origin="${correctOrigin ? 'http://127.0.0.1:8787' : 'https://other.test'}"`,
      )
      .replace(/data-endpoint="[^"]*"/, `data-endpoint="${origin}/count"`)
      .replace(
        '</main>',
        '<a id="visit-download-fixture" href="#instalacao" data-download-project="soul-hackers" data-download-version="fixture">Baixar teste</a></main>',
      )
      .replace(
        /(<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content=")([^"]*)(")/,
        (_all, start, content, end) =>
          start + content.replace(/connect-src[^;]*/, `$& ${origin}`) + end,
      );
    headers['content-security-policy'] = headers[
      'content-security-policy'
    ]!.replace(/connect-src[^;]*/, `$& ${origin}`);
    await route.fulfill({ response, headers, body });
  });
}

test('visita sem busca, fragmento, cookies ou referrer; downloads continuam eventos separados', async ({
  page,
  context,
}) => {
  const requests: { url: URL; headers: Record<string, string> }[] = [];
  await context.addCookies([
    { name: 'fixture', value: 'private', url: origin },
  ]);
  await page.route('https://*.goatcounter.com/**', async (route) => {
    requests.push({
      url: new URL(route.request().url()),
      headers: await route.request().allHeaders(),
    });
    await route.fulfill({ status: 200, body: '' });
  });
  await fixture(page);
  await page.goto('/traducoes/soul-hackers/?q=private#downloads');
  await expect.poll(() => requests.length).toBe(1);
  const visit = requests[0]!;
  expect(visit.url.origin).toBe(origin);
  expect(visit.url.searchParams.get('p')).toBe('/traducoes/soul-hackers/');
  expect(visit.url.searchParams.has('e')).toBe(false);
  expect(visit.url.searchParams.has('ns')).toBe(false);
  expect(visit.url.searchParams.get('r')).toBe('');
  expect(visit.url.href).not.toContain('private');
  expect(visit.headers.referer).toBeUndefined();
  expect(visit.headers.cookie).toBeUndefined();
  await page.locator('#visit-download-fixture').click();
  await expect(page).toHaveURL(/#instalacao$/);
  await expect.poll(() => requests.length).toBe(2);
  expect(requests[1]!.url.searchParams.get('e')).toBe('true');
  expect(requests[1]!.url.searchParams.get('p')).toBe(
    'download:soul-hackers:fixture',
  );
  expect(requests[1]!.url.searchParams.get('ns')).toBe('true');
  // An in-page anchor doesn't create another page visit.
  await page.locator('#visit-download-fixture').click();
  await expect.poll(() => requests.length).toBe(3);
  expect(requests.filter(({ url }) => !url.searchParams.has('e'))).toHaveLength(
    1,
  );
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookies: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookies: '' });
});

for (const signal of ['doNotTrack', 'globalPrivacyControl'] as const) {
  test(`${signal} impede visitas e cliques`, async ({ page }) => {
    await page.addInitScript(
      ({ signal }) =>
        Object.defineProperty(navigator, signal, {
          value: signal === 'doNotTrack' ? '1' : true,
        }),
      { signal },
    );
    const requests: string[] = [];
    await page.route('https://*.goatcounter.com/**', (route) => {
      requests.push(route.request().url());
      return route.abort();
    });
    await fixture(page);
    await page.goto('/traducoes/soul-hackers/');
    await page.locator('#visit-download-fixture').click();
    await expect(page).toHaveURL(/#instalacao$/);
    await page.waitForLoadState('networkidle');
    expect(requests).toEqual([]);
  });
}

for (const state of ['disabled', 'other-origin'] as const) {
  test(`${state} não envia visitas`, async ({ page }) => {
    const requests: string[] = [];
    await page.route('https://*.goatcounter.com/**', (route) => {
      requests.push(route.request().url());
      return route.abort();
    });
    await fixture(page, state !== 'disabled', state !== 'other-origin');
    await page.goto('/traducoes/soul-hackers/');
    await page.waitForLoadState('networkidle');
    expect(requests).toEqual([]);
  });
}

test('falha de coleta não prejudica conteúdo e navegação', async ({ page }) => {
  let attempts = 0;
  await page.route('https://*.goatcounter.com/**', (route) => {
    attempts++;
    return route.abort();
  });
  await fixture(page);
  await page.goto('/traducoes/soul-hackers/');
  await expect.poll(() => attempts).toBe(1);
  await expect(page.locator('h1')).toContainText('Soul Hackers');
  await page.getByRole('link', { name: 'Pular para o conteúdo' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('prévia local não coleta visitas na conta real', async ({ page }) => {
  const requests: string[] = [];
  await page.route('https://*.goatcounter.com/**', (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.goto('/traducoes/');
  await page.waitForLoadState('networkidle');
  expect(requests).toEqual([]);
});
