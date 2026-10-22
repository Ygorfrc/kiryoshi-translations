import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getPosts } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  // No invented public origin: preview feed intentionally has no items and uses a relative link.
  if (!site)
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Kiryoshi Translations — prévia</title><link>/</link><description>Feed desativado. Configure PUBLIC_SITE_URL para ativar publicações reais.</description><language>pt-br</language></channel></rss>',
      { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
    );
  const posts = (await getPosts()).filter(
    (post) => !post.data.demo && post.data.published,
  );
  return rss({
    title: 'Kiryoshi Translations — Devlog',
    description: 'Novidades e bastidores das traduções independentes de JRPGs.',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published!,
      link: `/devlog/${post.id}/`,
    })),
    customData: '<language>pt-br</language>',
  });
};
