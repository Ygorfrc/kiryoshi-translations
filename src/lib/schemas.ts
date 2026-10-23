import { z } from 'zod';

export const statuses = [
  'Planejado',
  'Em desenvolvimento',
  'Em revisão',
  'Em testes',
  'Disponível',
  'Pausado',
] as const;
export const categories = [
  'Atualizações',
  'Traduções',
  'Engenharia reversa',
  'Ferramentas',
  'Tutoriais',
  'Comunidade',
] as const;
export const progressLabels = {
  extraction: 'Extração de textos',
  translation: 'Tradução',
  review: 'Revisão',
  reinsertion: 'Reinserção',
  testing: 'Testes',
} as const;
export const httpsUrl = z
  .url()
  .refine(
    (value) => new URL(value).protocol === 'https:',
    'Use uma URL HTTPS.',
  );
const localPath = z
  .string()
  .regex(
    /^\/(?!\/)[^?#]*\.(avif|webp|png|jpg|jpeg|svg)$/i,
    'Use um asset local em /public.',
  );
const imageSchema = z.object({
  src: localPath,
  alt: z.string().min(5),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string().min(3),
  permission: z.literal('authorized'),
});
const coverSchema = z.union([
  imageSchema,
  z.object({
    asset: z
      .string()
      .regex(
        /^[^/\\]+\.(avif|webp|png|jpg|jpeg)$/i,
        'Use o nome de um arquivo da pasta images/.',
      ),
    alt: z.string().min(5),
    credit: z.string().min(3),
    permission: z.literal('authorized'),
  }),
]);
export const videoSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9_-]{11}$/),
  title: z.string(),
  thumbnail: imageSchema.optional(),
});
export const releaseSchema = z.object({
  version: z.string().min(1),
  date: z.coerce.date().optional(),
  target: z.string().min(1).optional(),
  prerelease: z.boolean().default(false),
  format: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  sha256: z
    .string()
    .regex(/^[a-fA-F0-9]{64}$/)
    .optional(),
  url: httpsUrl,
  provider: z.string().min(1).optional(),
  mirrors: z
    .array(z.object({ label: z.string().min(1), url: httpsUrl }))
    .default([]),
  authorized: z.literal(true),
  changelog: z.array(z.string()).min(1),
  tutorial: z.string().regex(/^\/(?!\/)/),
});
export const translationSchema = z
  .object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string().max(250),
    platform: z.string(),
    developer: z.string().optional(),
    publisher: z.string().optional(),
    genre: z.string().optional(),
    status: z.enum(statuses),
    displayOrder: z.number().int().nonnegative().default(100),
    featured: z.boolean().default(false),
    example: z.boolean().default(true),
    updated: z.coerce.date().optional(),
    accent: z
      .enum(['purple', 'cyan', 'orange', 'green', 'red'])
      .default('purple'),
    cover: coverSchema.optional(),
    progress: z
      .object({
        extraction: z.number().min(0).max(100).optional(),
        translation: z.number().min(0).max(100).optional(),
        review: z.number().min(0).max(100).optional(),
        reinsertion: z.number().min(0).max(100).optional(),
        testing: z.number().min(0).max(100).optional(),
      })
      .default({}),
    screenshots: z.array(imageSchema).default([]),
    video: videoSchema.optional(),
    releases: z.array(releaseSchema).default([]),
    credits: z
      .array(z.object({ name: z.string(), role: z.string() }))
      .default([]),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    requirements: z.array(z.string()).default([]),
    installationGuide: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === 'Disponível' && data.releases.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['releases'],
        message: 'Um projeto disponível precisa de um patch autorizado.',
      });
    }
  });
export const installationGuideSchema = z.object({ title: z.string().min(1) });

export const devlogSchema = z
  .object({
    title: z.string(),
    description: z.string().max(220),
    category: z.enum(categories),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: imageSchema.optional(),
    translation: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.demo && !data.published)
      ctx.addIssue({
        code: 'custom',
        path: ['published'],
        message: 'Publicações reais precisam de data.',
      });
    if (data.updated && data.published && data.updated < data.published)
      ctx.addIssue({
        code: 'custom',
        path: ['updated'],
        message: 'Atualização anterior à publicação.',
      });
  });
