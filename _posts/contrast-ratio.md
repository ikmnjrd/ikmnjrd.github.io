---
title: コントラスト比とは何のことを言っているのか？
description: 場面によるコントラストという言葉が示すものとコントラスト比の計算方法
date: '2024-09-05'
tag:
  - Webブラウザ
  - JavaScript
---

## 表示デバイスの場合
表示デバイスの最大輝度と最小輝度
[https://the-simple.jp/what-is-contrast-ratio-brightness-expression-capability-of-the-display-device](https://the-simple.jp/what-is-contrast-ratio-brightness-expression-capability-of-the-display-device)


## 色の場合
[WCAG21](https://waic.jp/translations/WCAG21/)の「コントラスト比」の項より
(L1 + 0.05) / (L2 + 0.05)

同じく「相対輝度」の項より
最も暗い黒を 0 に、最も明るい白を 1 に正規化した色空間内の任意の点の相対的な明るさ。


古いバージョンの[WCAG20](https://waic.jp/translations/WCAG20/Overview.html)には計算方法が丁寧に記載されている。
```
注記 1: sRGB色空間においては、色の相対輝度は、L = 0.2126 * R + 0.7152 * G + 0.0722 * B と定義されており、R、G 及び B は以下のように定義される:

RsRGB <= 0.03928 の場合R = RsRGB/12.92 、そうでない場合 R = ((RsRGB+0.055)/1.055) ^ 2.4
GsRGB <= 0.03928 の場合G = GsRGB/12.92 、そうでない場合 G = ((GsRGB+0.055)/1.055) ^ 2.4
BsRGB <= 0.03928 の場合B = BsRGB/12.92 、そうでない場合 B = ((BsRGB+0.055)/1.055) ^ 2.4

そして、RsRGB、GsRGB、及び BsRGB は、次のように定義される:

RsRGB = R8bit/255

GsRGB = G8bit/255

BsRGB = B8bit/255

注記 2: ウェブコンテンツを閲覧するのに今日用いられているほとんどすべてのシステムは、sRGB符号化を前提としている。コンテンツを処理して表示するのに他の色空間が用いられているのでなければ、コンテンツ制作者は sRGB 色空間を用いて計算するべきである。もしその他の色空間を用いるのであれば、Understanding Success Criterion 1.4.3 を参照。
```

### 参考文献
- [コントラスト比とは？表示デバイスの明暗表現能力 | THE SIMPLE](https://the-simple.jp/what-is-contrast-ratio-brightness-expression-capability-of-the-display-device)
- [Web Content Accessibility Guidelines (WCAG) 2.1 (日本語訳)](https://waic.jp/translations/WCAG21/)
- [Web Content Accessibility Guidelines (WCAG) 2.0](https://waic.jp/translations/WCAG20/Overview.html)