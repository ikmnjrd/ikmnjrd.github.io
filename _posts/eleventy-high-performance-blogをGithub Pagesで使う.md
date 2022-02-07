---
title: Googles製のテンプレート「eleventy-high-performance-blog」をGithub Pagesで使う
date: '2022-02-06'
layout: layouts/post.njk
scheduled: '2022-01-28'
---

そもそも11tyを使ったのは、Next.jsのexport(静的)

### Google Anarytics
cache.jsをオリジナルのコードに直す（）

プロキシ設定の解除


### docsディレクトリに静的ファイルを吐き出す設定
```javascript
// eleventy.js
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs",
    },
```

### git push時のビルド設定を削除
以下の記述を削除
```json
// package.json
  "pre-push": [
    "build"
  ],
```

### 周辺用語
- 


### 参考文献
- []()