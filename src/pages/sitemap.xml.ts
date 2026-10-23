import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts } from '../lib/content';
import { publicRoutes } from '../config/routes';
import { categories } from '../lib/schemas';
import { categorySlug } from '../lib/categories';
import { withBase } from '../lib/paths';
import { previewOnly } from '../config/publication';
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getPosts()).filter((post) => !post.data.demo);
  const routes = publicRoutes.filter(
    (route) => route !== '/devlog/' || posts.length > 0,
  );
  const projects = await getCollection('translations');
  routes.push(
    ...projects
      .filter((p) => !p.data.example)
      .map((p) => `/traducoes/${p.id}/`),
  );
  routes.push(...posts.map((p) => `/devlog/${p.id}/`));
  routes.push(
    ...categories
      .filter((category) =>
        posts.some((post) => post.data.category === category),
      )
      .map((category) => `/devlog/categoria/${categorySlug(category)}/`),
  );
  const urls =
    site && !previewOnly
      ? routes
          .map(
            (path) =>
              `<url><loc>${new URL(withBase(path), site).href}</loc></url>`,
          )
          .join('')
      : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
