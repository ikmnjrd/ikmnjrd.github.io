---
title: jekyllでfaviconを設定
date: '2021-12-31'
layout: layouts/post.njk
scheduled: '2021-12-31'
---

## 前提
私はGitHub Pagesで[Jekyll/minima](https://github.com/jekyll/minima)を利用しているので、同様な構成な方に向けた記事です。


## favicon設定
./includes/custom-head.htmlに以下のコードを追記

```html
<link rel="icon" href="/favicon.ico">
```

用意したfaviconをルートディレクトリに配置。
![リポジトリ](https://i.gyazo.com/f1dd722b4abdecd1fa61907db9601047.png)


## 参考にしたもの
- [https://zenn.dev/pacchiy/articles/e4dcd7bd29d387](https://zenn.dev/pacchiy/articles/e4dcd7bd29d387)
