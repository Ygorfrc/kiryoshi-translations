import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts } from '../lib/content';
import { publicRoutes } from '../config/routes';
import { categories } from '../lib/schemas';
import { categorySlug } from '../lib/categories';
export const GET: APIRoute = async ({ site }) => {
  const routes = [...publicRoutes];
  const projects = await getCollection('translations');
  const posts = await getPosts();
  routes.push(
    ...projects
      .filter((p) => !p.data.example)
      .map((p) => `/traducoes/${p.id}/`),
  );
  routes.push(
    ...posts.filter((p) => !p.data.demo).map((p) => `/devlog/${p.id}/`),
  );
  routes.push(
    ...categories.map((c) => `/devlog/categoria/${categorySlug(c)}/`),
  );
  const urls = site
    ? routes
        .map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`)
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
