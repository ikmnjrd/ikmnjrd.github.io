---
title: Neumorphismサンプル
date: '2022-02-01'
layout: layouts/post.njk
scheduled: '2022-02-01'
---

## Sandbox


<iframe src="https://codesandbox.io/embed/beautiful-darwin-4gf3h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="beautiful-darwin-4gf3h"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## ポイント

### SVG化した文字に陰影をつける

cssではこのようにすると綺麗に抜ける。
```css
svg {
  filter: drop-shadow(3px 3px 3px #fff)
    drop-shadow(-3px -3px 1px rgba(0, 0, 0, 0.15));
}
```
html上では、適宜fillやstrokeを設定する。

[https://danmarshall.github.io/google-font-to-svg-path/](https://danmarshall.github.io/google-font-to-svg-path/)（[GitHubリポジトリ](https://github.com/danmarshall/google-font-to-svg-path)）を使って文字を事前にSVG化しておく。

npmパッケージで似たものを提供している人もいる[https://github.com/shrhdk/text-to-svg](https://github.com/shrhdk/text-to-svg)
