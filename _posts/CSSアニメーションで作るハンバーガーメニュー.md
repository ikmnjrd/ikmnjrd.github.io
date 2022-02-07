---
title: CSSアニメーションで作るハンバーガーメニュー
date: '2022-01-12'
layout: layouts/post.njk
scheduled: '2022-01-12'
---

## サンプルコード

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwLeEOj" data-user="ikmnjrd" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/ikmnjrd/pen/RwLeEOj">
  CSS-hamburger</a> by ike (<a href="https://codepen.io/ikmnjrd">@ikmnjrd</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



### 重要なポイント

#### CSSプロパティ
```css
background: currentColor;
```
参考:[https://zenn.dev/phi/articles/css-tips-currentcolor](https://zenn.dev/phi/articles/css-tips-currentcolor)

#### アニメーションのイージング
- `cubic-bezier`
  - [cubic-bezier を知る。](https://qiita.com/96usa_koi/items/6f313f1d664806a77313)

#### アニメーション
座標変換の原点を設定する`transform-origin`

#### WAI-ARIA
aria-expanded="false"

