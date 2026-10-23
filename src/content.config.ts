import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  translationSchema,
  devlogSchema,
  installationGuideSchema,
} from './lib/schemas';

export const collections = {
  translations: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/translations' }),
    schema: translationSchema,
  }),
  devlogs: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/devlogs' }),
    schema: devlogSchema,
  }),
  installationGuides: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: './src/content/installation-guides',
    }),
    schema: installationGuideSchema,
  }),
};
