---
title: へっぽこエンジニアの技術選定時の頭の中
date: '2022-01-07'
tag:
  - ポエム
---

私は2020年12月からWebエンジニアとして働いている小市民です。

## 2022/1
世の中のフロントエンドプロジェクトではstorybookなるものが使われているらしいな...
とりあえず神ツールであるReactとWebpackで使ってみるとするか...
最新のWebpack5だとWebpack4->5からの破壊的変更のせいでstorybookがそのまま使えないだと？！！バッチが配布されているらしいが...
じゃあWebpackではなく何やら爆速と話題のesbuildは、、、cssをインポートできないというブログがちらほら...？

[公式](https://esbuild.github.io/content-types/#css-from-js)によると、CSSモジュールとしてのインポートはまだできないって書いてある。
>You can also import CSS from JavaScript. When you do this, esbuild will gather all CSS files referenced from a given entry point and bundle it into a sibling CSS output file next to the JavaScript output file for that JavaScript entry point. So if esbuild generates app.js it would also generate app.css containing all CSS files referenced by app.js. Here's an example of importing a CSS file from JavaScript:
>```javascript
>import './button.css'
>
>export let Button = ({ text }) =>
>  <div className="button">{text}</div>
>```
>Note that esbuild doesn't yet support CSS modules, so the set of export names from a CSS file is currently always empty. Supporting a basic form of CSS modules is on the roadmap.


ふーん。とりあえずstorybookとviteをインストールして...ん？
今webpackって見えたような...webpackいるな...



```javascript
while (何かいいの見つかればな〜){
  （...GitHubで「storybook vite」で検索）
  （...!!...😣）
}
```

この文章はなんの役に立つんですかね？（疑問）
