export type ProjectStatus = 'seed' | 'building' | 'live' | 'archived';

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  seed: '想法',
  building: '进行中',
  live: '已上线',
  archived: '归档',
};

/** 只有"进行中"用粉色标签 —— 粉色 = 正在动起来的东西 */
export const STATUS_TONE: Record<ProjectStatus, 'pink' | 'muted' | 'outline'> = {
  seed: 'outline',
  building: 'pink',
  live: 'muted',
  archived: 'outline',
};

export const fmtDate = (d: Date): string =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

/** 'YYYY-MM' -> '2026.10' */
export const fmtMonth = (m: string): string => m.replace('-', '.');

export const readingTime = (body: string | undefined): number => {
  if (!body) return 1;
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 400));
};
