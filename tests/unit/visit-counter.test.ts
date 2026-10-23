import { describe, expect, it } from 'vitest';
import { collectionAllowed, visitEventUrl } from '../../src/lib/visit-counter';

describe('visitas com privacidade', () => {
  it('respeita DNT e GPC independentemente', () => {
    expect(collectionAllowed({})).toBe(true);
    expect(collectionAllowed({ doNotTrack: '0' })).toBe(true);
    expect(collectionAllowed({ doNotTrack: '1' })).toBe(false);
    expect(collectionAllowed({ globalPrivacyControl: true })).toBe(false);
  });
  it('remove busca e fragmento, preserva a base e permite deduplicação no servidor', () => {
    const url = new URL(
      visitEventUrl(
        'https://counter-fixture.goatcounter.com/count',
        '/kiryoshi-translations/traducoes/?q=privado#downloads',
        'Traduções',
        'nonce-fixture',
      ),
    );
    expect(url.searchParams.get('p')).toBe('/kiryoshi-translations/traducoes/');
    expect(url.searchParams.get('r')).toBe('');
    expect(url.searchParams.get('t')).toBe('Traduções');
    expect([...url.searchParams.keys()].sort()).toEqual(['p', 'r', 'rnd', 't']);
    expect(url.href).not.toContain('privado');
  });
  it('sinaliza automação ao provedor sem criar um visitante identificável', () => {
    const url = new URL(
      visitEventUrl(
        'https://counter-fixture.goatcounter.com/count',
        '/',
        'Home',
        'nonce',
        true,
      ),
    );
    expect(url.searchParams.get('b')).toBe('153');
    expect(url.searchParams.has('e')).toBe(false);
    expect(url.searchParams.has('ns')).toBe(false);
  });
});
