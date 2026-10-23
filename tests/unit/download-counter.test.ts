import { describe, expect, it } from 'vitest';
import {
  assertDownloadCounterCsp,
  downloadEventUrl,
  parseDownloadCounter,
} from '../../src/lib/download-counter';

describe('contador opcional de cliques', () => {
  it('fica desativado sem uma conta configurada', () => {
    for (const value of [undefined, '', '  '])
      expect(parseDownloadCounter(value)).toBeUndefined();
    expect(() => assertDownloadCounterCsp(undefined, '')).not.toThrow();
  });
  it('normaliza somente a conta pública HTTPS do GoatCounter', () => {
    expect(
      parseDownloadCounter(' https://counter-fixture.goatcounter.com '),
    ).toBe('https://counter-fixture.goatcounter.com/count');
    expect(
      parseDownloadCounter('https://counter-fixture.goatcounter.com/count'),
    ).toBe('https://counter-fixture.goatcounter.com/count');
    for (const value of [
      'http://counter-fixture.goatcounter.com',
      'https://goatcounter.com',
      'https://counter-fixture.goatcounter.com.invalid',
      'https://user:secret@counter-fixture.goatcounter.com',
      'https://counter-fixture.goatcounter.com:8443',
      'https://counter-fixture.goatcounter.com/api',
      'https://counter-fixture.goatcounter.com/count?token=secret',
      'https://counter-fixture.goatcounter.com/#fragment',
    ])
      expect(() => parseDownloadCounter(value)).toThrow();
  });
  it('exige liberação exata em connect-src, sem aceitar curingas ou img-src', () => {
    const endpoint = 'https://counter-fixture.goatcounter.com/count';
    expect(() =>
      assertDownloadCounterCsp(
        endpoint,
        "default-src 'self'; connect-src 'self' https://counter-fixture.goatcounter.com; img-src 'self'",
      ),
    ).not.toThrow();
    for (const policy of [
      "connect-src 'self'",
      'connect-src https://*.goatcounter.com',
      'img-src https://counter-fixture.goatcounter.com',
    ])
      expect(() => assertDownloadCounterCsp(endpoint, policy)).toThrow(
        /connect-src/,
      );
  });
  it('envia evento por projeto e versão, sem URL do arquivo ou referrer', () => {
    const url = new URL(
      downloadEventUrl(
        'https://counter-fixture.goatcounter.com/count',
        'soul-hackers',
        'teste & revisão',
        'nonce-fixture',
      ),
    );
    expect(url.searchParams.get('p')).toBe(
      'download:soul-hackers:teste & revisão',
    );
    expect(url.searchParams.get('e')).toBe('true');
    expect(url.searchParams.get('ns')).toBe('true');
    expect(url.searchParams.get('r')).toBe('');
    expect(url.searchParams.get('rnd')).toBe('nonce-fixture');
    expect([...url.searchParams.keys()].sort()).toEqual([
      'e',
      'ns',
      'p',
      'r',
      'rnd',
      't',
    ]);
  });
});
