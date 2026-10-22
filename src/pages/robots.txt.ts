import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';
import { previewOnly } from '../config/publication';
export const GET: APIRoute = ({ site }) =>
  new Response(
    site && !previewOnly
      ? `User-agent: *\nAllow: ${withBase('/')}\nDisallow: ${withBase('/404.html')}\nSitemap: ${new URL(withBase('/sitemap.xml'), site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
