import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

/** 固定页面 */
const STATIC_PATHS = ['/', '/projects/', '/contests/', '/thoughts/', '/now/', '/about/'];

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://qwhyq.com')).href.replace(/\/$/, '');

  const projects = await getCollection('projects');
  const contests = await getCollection('contests');
  const thoughts = (await getCollection('thoughts')).filter((t) => !t.data.draft);

  const paths = [
    ...STATIC_PATHS,
    ...projects.map((p) => `/projects/${p.id}/`),
    ...contests.map((c) => `/contests/${c.id}/`),
    ...thoughts.map((t) => `/thoughts/${t.id}/`),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${site}${path}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
