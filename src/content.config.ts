import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 四类内容。字段缺失或类型不对时，构建会直接失败 —— 这是故意的：
 * 让"内容有结构"变成机械保证，而不是靠记性。
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** seed = 只有想法 / building = 在写 / live = 做完了 / archived = 归档 */
    status: z.enum(['seed', 'building', 'live', 'archived']).default('seed'),
    start: z.string(), // 'YYYY-MM'
    role: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    cover: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

const contests = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contests' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    track: z.string(),
    team: z.string(),
    result: z.string(), // 参与 / 三等奖 / 第 12 名 / 备赛中
    cert: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/now' }),
  schema: z.object({
    updated: z.coerce.date(),
    learning: z.string(),
    building: z.string(),
    reading: z.string(),
    looking: z.string(),
  }),
});

export const collections = { projects, contests, thoughts, now };
