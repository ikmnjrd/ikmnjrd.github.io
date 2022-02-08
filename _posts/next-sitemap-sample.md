---
title: Next.jsのサンプル集を参考にサイトマップを作成しようとしたらエラー
date: '2022-02-08'
tag:
  - Node.js
  - Next.js
  - JavaScript
---
エラーに遭遇しました。

### 環境
- Node: v16.13.2
- Next.js: 12.0.10
- globby: 13.1.1

[公式のサンプル集の「with-sitemap」](https://github.com/vercel/next.js/tree/canary/examples/with-sitemap)では以下のようなスクリプトをサーバー実行時に（`next.config.js`のisServerオブションをフラグにして）実行している。


./scripts/generate-sitemap.js
```javascript
const fs = require('fs')
const globby = require('globby')

function addPage(page) {
  const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api',
  ])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()

```


遭遇したエラーは以下

```bash
Error [ERR_REQUIRE_ESM]: require() of ES Module ./node_modules/globby/index.js from ./scripts/generate-sitemap.js not supported.
Instead change the require of index.js in ./scripts/generate-sitemap.js to a dynamic import() which is available in all CommonJS modules.
```

最新のglobbyからはCommonJSが省かれたらしい。


### 解決策
package.jsonを以下のように書き換え、`$npm i`を実行
```json
"globby": "^13.1.1",
```
↓
```json
"globby": "^11.0.1",
```

インストール後、ビルド時に`./public/sitemap.xml`が無事出力された。


### 周辺用語
- commonJS
- ESModules


### 参考文献
- [Build a sitemap generator in Next.js - LogRocket Blog](https://blog.logrocket.com/build-sitemap-generator-nextjs/)