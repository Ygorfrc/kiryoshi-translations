import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('catálogo busca, combina filtros, ordena e restaura a seleção da URL', async ({
  page,
}) => {
  await page.goto('/traducoes/');
  await expect(page.locator('#result-count')).toHaveText(
    '5 traduções encontradas',
  );
  await expect(page.locator('#catalog-grid h3')).toHaveText([
    'Soul Hackers',
    'Devil Survivor Overclocked',
    'Devil Survivor 2 Record Breaker',
    'Strange Journey Redux',
    'SMT IV: Apocalypse',
  ]);
  await page.getByLabel('Buscar tradução').fill('soul');
  await expect(page.locator('#result-count')).toHaveText(
    '1 tradução encontrada',
  );
  await expect(page.locator('#catalog-grid article:visible')).toHaveCount(1);
  await page.getByLabel('Status', { exact: true }).selectOption('Planejado');
  await expect(page.locator('#catalog-empty')).toBeVisible();
  await expect(page.locator('#result-count')).toHaveText(
    '0 traduções encontradas',
  );
  await page
    .getByRole('button', { name: 'Limpar filtros e ver todos' })
    .click();
  await expect(page.locator('#catalog-grid article:visible')).toHaveCount(5);
  await page
    .getByLabel('Plataforma', { exact: true })
    .selectOption('Nintendo 3DS');
  await page.getByLabel('Status', { exact: true }).selectOption('Planejado');
  await expect(page.locator('#catalog-grid article:visible')).toHaveCount(4);
  await page.getByLabel('Ordenar por').selectOption('updated');
  await page.reload();
  await expect(page.getByLabel('Status', { exact: true })).toHaveValue(
    'Planejado',
  );
  await expect(page.getByLabel('Ordenar por')).toHaveValue('updated');
  await expect(page.locator('#catalog-grid article:visible')).toHaveCount(4);
});

test('navegação principal por teclado e menu móvel', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Pular para o conteúdo' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#conteudo')).toBeFocused();
  if (isMobile) {
    const toggle = page.locator('.menu-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
  }
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Traduções', exact: true })
    .click();
  await expect(page).toHaveURL(/\/traducoes\/$/);
  await page
    .locator('#catalog-grid')
    .getByRole('link', { name: 'Soul Hackers', exact: true })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Soul Hackers',
  );
  await expect(page.locator('#downloads')).toContainText(
    'Nenhum patch disponível',
  );
  await expect(page.locator('#progresso')).toContainText('Não informado');
  await expect(page.locator('progress')).toHaveCount(0);
  await page.locator('#perguntas summary').first().click();
  await expect(page.locator('#perguntas details').first()).toHaveAttribute(
    'open',
    '',
  );
});

for (const route of [
  '/',
  '/traducoes/',
  '/traducoes/soul-hackers/',
  '/devlog/',
  '/sobre/',
  '/apoie/',
  '/contato/',
  '/privacidade/',
  '/aviso-legal/',
  '/devlog/01-boas-vindas/',
  '/devlog/categoria/tutoriais/',
]) {
  test(`rota, acessibilidade e largura: ${route}`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (message) => {
      if (/violat.*content security policy/i.test(message.text()))
        errors.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          message: node.any.map((check) => check.message),
        })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
    if (route === '/')
      await page.screenshot({
        path: `test-results/home-${testInfo.project.name}.png`,
        fullPage: true,
      });
  });
}

test('catálogo e menu sem JavaScript mantêm conteúdo navegável', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 740 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/traducoes/`);
  await expect(page.locator('#catalog-grid article')).toHaveCount(5);
  await expect(
    page.getByRole('navigation', { name: 'Navegação principal' }),
  ).toBeVisible();
  await expect(page.locator('#catalog-filters')).toBeHidden();
  await context.close();
});

test('categoria vazia e página 404', async ({ page }) => {
  await page.goto('/devlog/categoria/tutoriais/');
  await expect(
    page.getByRole('heading', { name: 'Novos registros virão.' }),
  ).toBeVisible();
  const response = await page.goto('/rota-que-nao-existe/');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Este mundo ainda não foi encontrado.' }),
  ).toBeVisible();
});

test('layout entre tablet e ultrawide', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A suíte móvel já verifica 320px.');
  for (const route of ['/', '/traducoes/', '/traducoes/soul-hackers/']) {
    await page.goto(route);
    for (const width of [580, 768, 1024, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} em ${width}px`,
      ).toBe(true);
    }
  }
});
