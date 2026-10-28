import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const thoughts = await getCollection('thoughts');
  const contests = await getCollection('contests');
  const projects = await getCollection('projects');

  const items = [
    ...thoughts
      .filter((entry) => !entry.data.draft)
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.date,
        link: `/thoughts/${entry.id}/`,
        description: entry.data.summary ?? '',
      })),
    ...contests.map((entry) => ({
      title: `[竞赛] ${entry.data.title}`,
      pubDate: entry.data.date,
      link: `/contests/${entry.id}/`,
      description: `${entry.data.track} · ${entry.data.result}`,
    })),
    ...projects.map((entry) => ({
      title: `[项目] ${entry.data.title}`,
      pubDate: new Date(`${entry.data.start}-01T00:00:00Z`),
      link: `/projects/${entry.id}/`,
      description: entry.data.summary,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'WHY',
    description: '一个人工智能专业学生的成长档案：项目、竞赛、思考。',
    site: context.site ?? 'https://qwhyq.com',
    items,
    customData: '<language>zh-cn</language>',
  });
}
