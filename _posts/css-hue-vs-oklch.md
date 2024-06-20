---
title: CSSの色関数について調べたこと
description: 色関数について調べたことと感想
date: '2024-06-20'
tag:
  - CSS
  - デザイン
---

## 色関数とは
rgb(255,255,255)はもろに色関数。色関数にも種類があり、rgbのRGBAやHSLはCSS Color Module 3(2011年)のもの。次世代のCSS Color Module 4ではHWBやOklchなどがある。  


## HSLとOKLCHの比較

| 特性          | HSL                    | OKLCH                          |
|--------------|------------------------|--------------------------------|
| **CSSでの指定** | hsl(H S L[ / A])      |  oklch(L C H[ / A])             |
| **色相 (H)** | 0から360度の範囲        | 0から360度の範囲                |
| **彩度 (S/C)** | 0%から100% (パーセンテージ) | 数値で表され、最大値は色空間に依存 |
| **明度 (L)** | 0%から100% (パーセンテージ) | 0から100の範囲の数値             |
| **色の表現** | 直感的で使いやすい      | 色の知覚的均一性に優れる         |
| **用途**     | 一般的なWebデザインやアプリケーション | 専門的なデザインや色の一貫性が重要な用途 |
| **色の調整** | 色相を変えるだけで簡単に色のバリエーションを生成 | 明度や彩度を変えても色相が保持されるため、異なる明度での色の調和が容易 |

### 説明:

- **色相 (Hue)**: 両モデルともに色相は度数で表され、色の種類（赤、緑、青など）を定義します。
- **彩度 (Saturation/Chroma)**: HSLではパーセンテージで彩度を表し、色の鮮やかさを示す。OKLCHでは彩度が数値で表され、色の純度を示すため、より精密な色調整が可能
- **明度 (Lightness)**: HSLでは明度もパーセンテージで表され、0%が黒、100%が白。OKLCHでは明度が数値で表され、より広範な色調整が可能
- **色の表現と用途**: HSLは直感的で、誰でも簡単に色を選ぶことができるが、OKLCHは色の均一性を重視しており、専門的な用途に使われるらしい。

どちらにも基準の色から色を足し引き等で指定できる。  
hsl(from rgb(200 0 0) calc(h + 30) s calc(l + 30))  
oklch(from hsl(180 100% 50%) calc(l - 0.1) c h)  

## 感想
使うのは実際骨が折れそう。特にデザイナーは慣れない色指定方法になるだろうし。  
エンジニア視点だと基準を決めればそれに応じた色を出せるようになるというのは夢があるが。



### 参考文献
- [Xユーザーのjhey ▲🐻🎈さん: 「Use CSS relative color syntax to darken/lighten colors for borders, backgrounds, etc. 🔥](https://x.com/jh3yy/status/1770948509933445269)
- [Theming with CSS color functions 🤙](https://codepen.io/jh3y/pen/rNbmBrE)
- [oklch() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [hsl() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)
- [CSS の 色関数 について #CSS3 - Qiita](https://qiita.com/pon_u/items/0c216ee81f3b7aa04f98)
