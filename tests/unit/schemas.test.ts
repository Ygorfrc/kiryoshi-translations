import { describe, expect, it } from 'vitest';
import {
  translationSchema,
  devlogSchema,
  releaseSchema,
} from '../../src/lib/schemas';
import { serializeJsonLd, formatDate } from '../../src/lib/format';
import { parseSiteUrl } from '../../src/config/url.mjs';
const project = {
  title: 'Jogo',
  shortTitle: 'Jogo',
  description: 'Teste',
  platform: 'Nintendo 3DS',
  status: 'Planejado',
};
describe('validação editorial', () => {
  it('aceita campos opcionais ausentes sem inventar progresso', () => {
    const data = translationSchema.parse(project);
    expect(data.progress).toEqual({});
    expect(data.updated).toBeUndefined();
    expect(data.releases).toEqual([]);
  });
  it('rejeita progresso inválido e mantém zero e 100 explícitos', () => {
    expect(
      translationSchema.safeParse({
        ...project,
        progress: { translation: 101 },
      }).success,
    ).toBe(false);
    expect(
      translationSchema.safeParse({ ...project, progress: { review: -1 } })
        .success,
    ).toBe(false);
    expect(
      translationSchema.parse({
        ...project,
        progress: { translation: 100, review: 0 },
      }).progress,
    ).toEqual({ translation: 100, review: 0 });
  });
  it('não permite disponível sem patch nem status desconhecido', () => {
    expect(
      translationSchema.safeParse({ ...project, status: 'Disponível' }).success,
    ).toBe(false);
    expect(
      translationSchema.safeParse({ ...project, status: 'Pronto' }).success,
    ).toBe(false);
  });
  it('exige autorização e rejeita hash malformado', () => {
    expect(releaseSchema.safeParse({ authorized: false }).success).toBe(false);
    expect(releaseSchema.shape.sha256.safeParse('abcd').success).toBe(false);
  });
  it('exige data de publicações reais, mas permite exemplo sem data', () => {
    const post = {
      title: 'Teste',
      description: 'Teste',
      category: 'Comunidade',
    };
    expect(devlogSchema.safeParse(post).success).toBe(false);
    expect(devlogSchema.safeParse({ ...post, demo: true }).success).toBe(true);
  });
  it('rejeita links javascript e imagens sem autorização', () => {
    expect(
      translationSchema.safeParse({
        ...project,
        cover: { src: '//external.test/image.png', permission: 'authorized' },
      }).success,
    ).toBe(false);
  });
});
describe('metadados', () => {
  it('desativa URL pública ausente e rejeita domínio de exemplo', () => {
    expect(parseSiteUrl('')).toBeUndefined();
    expect(() => parseSiteUrl('https://example.com')).toThrow();
    expect(() => parseSiteUrl('http://localhost:4321')).toThrow();
  });
  it('escapa elementos HTML em JSON-LD', () => {
    expect(serializeJsonLd({ title: '</script>' })).not.toContain('<');
  });
  it('trata datas ausentes e usa UTC para datas editoriais', () => {
    expect(formatDate()).toBe('Não informado');
    expect(formatDate(new Date('2026-10-22'))).toContain('22 de outubro');
  });
});
