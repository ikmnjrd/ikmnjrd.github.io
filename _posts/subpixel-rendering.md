---
title: サブピクセルレンダリングってなんだ？
description: transformを過剰にあてた結果、ぼやけて表示されるフォントに救いのてはあるのか？いや、ない。
date: '2023-05-25'
tag:
  - HTML
  - CSS
  - デザイン
---

### 疑問に遭遇した状況
cssでtransformを使ったスタイリングが、なぜかWindows環境だけで見受けられるぼやけるという報告を受けて、ぼやっと[キャンバスの最適化](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)のページを見ていると次のような記述がありました。
> キャンバスで整数以外の値を使用してオブジェクトを描画すると、サブピクセルレンダリングを実行します。
> <cite>出典: [浮動小数点数値の座標を避けて整数を使用](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#%E6%B5%AE%E5%8B%95%E5%B0%8F%E6%95%B0%E7%82%B9%E6%95%B0%E5%80%A4%E3%81%AE%E5%BA%A7%E6%A8%99%E3%82%92%E9%81%BF%E3%81%91%E3%81%A6%E6%95%B4%E6%95%B0%E3%82%92%E4%BD%BF%E7%94%A8)</cite>

### サブピクセルレンダリングとは
wikipediaによると
> サブピクセルレンダリング(Subpixel rendering)とは、液晶・有機ELモニタ上のピクセルを構成する三原色の発光源を、仮想的にそれぞれ一つのピクセルとみなして横方向に三倍の解像度を得る技術のことである。 アンチエイリアスの一種。
> <cite>出典: [サブピクセルレンダリング - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B5%E3%83%96%E3%83%94%E3%82%AF%E3%82%BB%E3%83%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)</cite>
>

アンチエイリアスといえば、斜めにギザギザしたものをできるだけ真っ直ぐ見せるための技術と理解してる。  
各種ブラウザ（とOSが協調している）はデフォルトでアンチエイリアスが効いている。  
そしてCSSではfont-smoothというプロパティがある。  
```css
.something {
  -webkit-font-smoothing: antialiased; // auto | none | antialiased | subpixel-antialiased
  -moz-osx-font-smoothing: grayscale; // auto | grayscale
}
```
主にすでにかかったアンチエイリアスを効かせない方向に調整するためのもの。  
要は綺麗に見せたい場合では、ブラウザとOSに任せるしかなく、transformを適用しすぎてジャギジャギのままになった箇所はtransformによるスタイリングをやめるほかないと思う。  
試せていないが、遭遇したのは少数を含む指定だったので、transformを過剰に使ってもその指定が整数ならもしかするかもしれない（整数で済むような要件ならtransformを使っていない気がする）。

直接この答えになるような記事等は見つけられていないがMDNには次のような記述もある
> CSS 座標変換は、 GPU を使用しますのでより高速です。もっともよいのは拡大縮小しないことですが、そうでなければ大きなキャンバスを縮小するよりも小さなキャンバスを拡大したほうが良好です。
> <cite>出典: [CSS 座標変換を使用してキャンバスを拡大縮小する](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#css_%E5%BA%A7%E6%A8%99%E5%A4%89%E6%8F%9B%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%90%E3%82%B9%E3%82%92%E6%8B%A1%E5%A4%A7%E7%B8%AE%E5%B0%8F%E3%81%99%E3%82%8B)</cite>

canvasと同一視するのはどうかとも思うが、大きく離れてもいなさそうだと思う私でした。

### 参考文献
- [Webブラウザにおける文字のアンチエイリアスの現状の最適解 | dwango creators' blog（ドワンゴクリエイターズブログ）](http://creator.dwango.co.jp/14128.html)
- [CSS 座標変換の使用 - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)
- [font-smooth - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/font-smooth)