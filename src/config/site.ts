import { z } from 'zod';
import { httpsUrl, videoSchema } from '../lib/schemas';

// Cadastre somente canais públicos confirmados. Nenhum serviço é carregado automaticamente.
const settings = z.object({
  name: z.string(),
  slogan: z.string(),
  description: z.string(),
  googleSiteVerification: z
    .string()
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
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
  // Token público fornecido pelo Search Console; não é senha nem script de coleta.
  googleSiteVerification: 'twYeLTmcjNh_CVmC_0cVHzXMtzjRhjuFWS862Aj-FuA',
  // Conta pública fornecida pelo responsável; registra somente cliques em downloads.
  downloadCounterUrl: 'https://kiryoshi.goatcounter.com',
  channels: [],
  support: [],
  videos: [],
});
