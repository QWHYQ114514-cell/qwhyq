# WHY

一个 AI 专业学生的成长档案：项目、竞赛、思考、Now。
纯静态站，内容全是 Markdown，没有数据库、没有后台、没有客户端框架。

- 站点：https://qwhyq.com ※ 品牌已改为 `WHY`，域名仍是 `qwhyq.com`（域名是独立的事，见文末）
- 技术栈：Astro 5 + TypeScript + 原生 CSS（设计 token 走 CSS 变量）
- 构建产物：13 个 HTML 页面，零框架 JS（只有约 20 行滚动揭示）

---

## 一、本地跑起来

需要 Node.js 20 或更高版本。

```bash
pnpm install
pnpm dev        # http://localhost:4321，改内容自动刷新
pnpm build      # 输出到 dist/
pnpm preview    # 预览构建结果
```

没有 pnpm 的话，先 `npm i -g pnpm`，或者直接用 `npx astro dev`。

---

## 二、加内容：只改 `src/content/`

四类内容，一个文件 = 一条记录。文件名就是 URL：

| 目录 | 变成的地址 |
|---|---|
| `src/content/projects/xxx.md` | `/projects/xxx/` |
| `src/content/contests/xxx.md` | `/contests/xxx/` |
| `src/content/thoughts/xxx.md` | `/thoughts/xxx/` |
| `src/content/now/now.md` | `/now/`（只有这一份，直接改） |

### 项目

```yaml
---
title: 用 NumPy 从零实现手写数字识别
status: building        # seed | building | live | archived
start: '2026-10'
role: 独立完成
stack: [Python, NumPy]
repo: https://github.com/QWHYQ114514-cell/xxx   # 可选
demo: https://...                               # 可选
cover: /images/xxx.jpg                          # 可选
summary: 一句话说清这个项目在干什么。
featured: true          # 上首页精选（最多 3 个）
---
```

`status` 决定卡片长相，这是全站最重要的一条产品规则：

- `seed` —— **虚线框**，表示只有想法。不会假装完成品。
- `building` —— **粉色标签「进行中」**。粉色全站只在这个状态上表示"正在动"。
- `live` —— 灰标签「已上线」。
- `archived` —— 不出现在列表里。

正文建议四段：`## 要解决什么` → `## 怎么做` → `## 结果 / 现在的进度` → `## 复盘 / 待解决`。

### 竞赛

```yaml
---
title: 2026 校程序设计新生赛
date: 2026-11-15
track: 个人赛
team: 个人
result: 备赛中        # 参与 / 三等奖 / 第 12 名 / 备赛中
cert: /images/certs/xxx.jpg   # 可选
---
```

正文建议：`## 赛题` → `## 准备` → `## 现场` → `## 复盘`。
没拿奖就写没拿奖，重点写卡在哪 —— 这比名次更有说服力。

### 思考

```yaml
---
title: 为什么我先补数学，再补框架
date: 2026-10-26
tags: [学习方法]
summary: 框架会过时，梯度不会。
draft: false          # true 就不会构建出来
---
```

300–800 字，结构：一个观点 → 一个例子 → 一句结论。

### Now

```yaml
---
updated: 2026-10-28
learning: 线性代数（矩阵分解）、Python 与 NumPy 基础
building: 从零实现的手写数字识别，卡在 softmax 的反向传播
reading: 《深度学习》第一章、《数学之美》
looking: 一个能长期做下去的方向，暂时不急着定
---
```

**字段写错或漏写，构建会直接失败** —— 这是故意的，为了不让格式错误悄悄上线。

---

## 三、改设计：只改 `src/styles/global.css`

文件顶部是全部设计 token：颜色、字号、间距、圆角、缓动曲线。改那里，全站跟着变。

改之前请读这几条规则，它们是这个站看起来不廉价的原因：

1. **粉色是品牌色，只允许出现在三处**：导航条整条底、首页 `WHY` 字、`进行中` 标签底。除此之外任何地方都不加粉。
2. **页面底是 `#F5F5F7`（245,245,247），卡片和区块是纯白**。需要灰层次就在墨色上加透明度，不要新增 hex。
3. **明朝体只用在 28px 以上的标题**。小字号明朝在 Windows 上会发虚，正文一律系统黑体。
4. **hover 不加下划线**。选中感靠整个模块浮起：卡片 `translateY(-3px) scale(1.008)` + 阴影，列表行变白 + 阴影，文字链接轻微放大。
5. **不做这些动效**：弹跳、视差滚动、自定义惯性滚动、打字机。
6. **没有实心按钮**。所有行动都是「文字 + 箭头 →」。

---

## 四、部署

仓库已经初始化并提交过（`git log` 里有一条 `feat: WHY 个人站`），本地是 `main` 分支。

1. 在 GitHub 建一个空仓库（不要勾选 README / .gitignore），然后：

   ```bash
   git remote add origin https://github.com/QWHYQ114514-cell/qwhyq.git
   git push -u origin main
   ```

2. 打开 [vercel.com](https://vercel.com) → Add New → Project → Import 这个仓库。
   框架会被自动识别为 **Astro**；构建命令 `pnpm build`、输出目录 `dist`，都不用改。
   环境变量一个都不需要。

3. 域名：Vercel 项目 → Settings → Domains → 添加 `qwhyq.com`，按提示到域名商改 DNS。
   还没配好之前，`<repo>.vercel.app` 就能直接用。

上线后自检这几项（都已经是现成的）：

| 检查 | 地址 |
|---|---|
| 首页 | `/` |
| 404 | 随便输一个不存在的路径 |
| RSS | `/rss.xml` |
| sitemap | `/sitemap.xml` |
| robots | `/robots.txt` |
| 分享图 | `/og.png` |

---

## 五、还要做的（TODO）

> **注意：页面上的正文目前是示例内容。** 三个项目、一个竞赛、两篇思考、Now、关于页的时间线，都是我为了让版式能看而写的，不是你的真实经历。**正式对外之前必须替换掉**，否则等于公开发布没发生过的事。

- [ ] 替换 `src/content/` 下全部示例内容（3 项目 / 1 竞赛 / 2 思考 / Now）
- [ ] About 页的「经历」「技能」改成你自己的
- [ ] `hi@qwhyq.com` 是占位邮箱（`src/components/Footer.astro`、`src/pages/about.astro`）
- [ ] 人像照：About 页现在没有照片位，照片到位后再加
- [ ] 可选：Pagefind 静态搜索（内容超过 20 篇再加）
- [ ] 可选：深色模式（颜色已经全部走变量，加一组值即可）

---

## 六、设计文档

完整的需求与设计决策见 [`个人网站方案.md`](./个人网站方案.md)：定位、读者动线、内容模型、技术选型理由、色彩与字体规格、hover 规则、排期。
