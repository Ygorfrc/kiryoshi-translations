import { test, expect } from '@playwright/test';
test('carrossel permite trocar, selecionar e pausar com controles acessíveis', async ({
  page,
}) => {
  await page.goto('/');
  const showcase = page.locator('[data-showcase]');
  await expect(showcase.locator('.showcase-slide:visible')).toHaveCount(1);
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Soul Hackers',
  );
  await showcase
    .getByRole('button', { name: 'Próximo projeto', exact: true })
    .click();
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Devil Survivor Overclocked',
  );
  await showcase
    .getByRole('button', { name: 'Projeto anterior', exact: true })
    .click();
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Soul Hackers',
  );
  await showcase
    .getByRole('button', { name: 'Mostrar Strange Journey Redux', exact: true })
    .click();
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Strange Journey Redux',
  );
  await showcase
    .getByRole('button', { name: 'Pausar rotação automática', exact: true })
    .click();
  await expect(
    showcase.getByRole('button', {
      name: 'Reproduzir rotação automática',
      exact: true,
    }),
  ).toHaveAttribute('aria-pressed', 'true');
  await showcase
    .getByRole('button', { name: 'Próximo projeto', exact: true })
    .press('ArrowLeft');
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Devil Survivor 2',
  );
  await expect(showcase).toContainText('sem projetos concluídos confirmados');
});

test('reduced motion inicia o carrossel pausado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(
    page.getByRole('button', {
      name: 'Reproduzir rotação automática',
      exact: true,
    }),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('rotação automática muda de projeto e respeita a pausa', async ({
  page,
}) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const showcase = page.locator('[data-showcase]');
  await expect(showcase.locator('[data-showcase-controls]')).toBeVisible();
  await showcase.scrollIntoViewIfNeeded();
  await expect(showcase).toBeInViewport({ ratio: 0.2 });
  await page.clock.fastForward(7000);
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Devil Survivor Overclocked',
  );
  await showcase
    .getByRole('button', { name: 'Pausar rotação automática', exact: true })
    .click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(14000);
  await expect(showcase.locator('.showcase-slide:visible')).toContainText(
    'Devil Survivor Overclocked',
  );
});
