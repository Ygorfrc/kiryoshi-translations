import { z } from 'zod';
import { httpsUrl, videoSchema } from '../lib/schemas';

// Cadastre somente canais públicos confirmados. Nenhum serviço é carregado automaticamente.
const settings = z.object({
  name: z.string(),
  slogan: z.string(),
  description: z.string(),
  downloadCounterUrl: httpsUrl.optional(),
  channels: z.array(z.object({ label: z.string(), url: httpsUrl })),
  contactEmail: z.email().optional(),
  support: z.array(
    z.object({ label: z.string(), url: httpsUrl, description: z.string() }),
  ),
  videos: z.array(videoSchema),
});

export const site = settings.parse({
  name: 'Kiryoshi Translations',
  slogan: 'Traduzindo mundos. Conectando jogadores.',
  description:
    'Traduções independentes e gratuitas de JRPGs para português brasileiro. Acompanhe os projetos, o processo e as novidades de Kiryoshi.',
  // Conta pública fornecida pelo responsável; registra somente cliques em downloads.
  downloadCounterUrl: 'https://kiryoshi.goatcounter.com',
  channels: [],
  support: [],
  videos: [],
});
