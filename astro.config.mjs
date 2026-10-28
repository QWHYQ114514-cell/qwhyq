import { defineConfig } from 'astro/config';

export default defineConfig({
  // 没有买域名，正式地址就是 Cloudflare Pages 分配的地址。
  // canonical / og:url / og:image / sitemap / rss 全部从这里派生。
  site: 'https://qwhyq.pages.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
