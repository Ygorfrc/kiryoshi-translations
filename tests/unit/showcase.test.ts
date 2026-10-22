import { describe, expect, it } from 'vitest';
import { selectShowcase } from '../../src/lib/showcase';
const project = (
  id: string,
  status = 'Planejado',
  example = true,
  authorized = false,
) => ({
  id,
  data: {
    shortTitle: id,
    status,
    example,
    featured: id === 'soul-hackers',
    releases: authorized ? [{ authorized }] : [],
  },
});
describe('destaques da Home', () => {
  it('respeita a sequência editorial mesmo quando os arquivos chegam em outra ordem', () => {
    const expected = [
      'soul-hackers',
      'overclocked',
      'devil-survivor-2',
      'strange-journey',
      'apocalypse',
    ];
    const input = expected
      .map((id, index) => {
        const entry = project(id);
        return { ...entry, data: { ...entry.data, displayOrder: index + 1 } };
      })
      .reverse();
    expect(selectShowcase(input).projects.map((entry) => entry.id)).toEqual(
      expected,
    );
  });
  it('mostra os projetos reais quando ainda não há concluídos', () => {
    const result = selectShowcase([
      project('outro'),
      project('soul-hackers', 'Em desenvolvimento'),
    ]);
    expect(result.completedOnly).toBe(false);
    expect(result.projects.map((p) => p.id)).toEqual(['soul-hackers', 'outro']);
    expect(result.projects[0]?.data.status).toBe('Em desenvolvimento');
  });
  it('passa a destacar apenas disponíveis confirmados com patch autorizado', () => {
    const result = selectShowcase([
      project('planejado'),
      project('finalizado', 'Disponível', false, true),
    ]);
    expect(result.completedOnly).toBe(true);
    expect(result.projects.map((p) => p.id)).toEqual(['finalizado']);
  });
  it('não promove exemplos ou entradas sem patch como concluídos', () => {
    expect(
      selectShowcase([project('exemplo', 'Disponível', true, true)])
        .completedOnly,
    ).toBe(false);
    expect(
      selectShowcase([project('sem-patch', 'Disponível', false)]).completedOnly,
    ).toBe(false);
  });
  it('trata catálogo vazio e preserva a lista de origem', () => {
    const entries = [project('z'), project('a')];
    selectShowcase(entries);
    expect(entries[0]?.id).toBe('z');
    expect(selectShowcase([]).projects).toEqual([]);
  });
});
