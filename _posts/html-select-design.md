---
title: select要素をCSSでカスタマイズする際に気をつけるべきブラウザごとの差
description: やっぱりsafariはおかしいね。select要素を少しカスタマイズしようとしたところにも地雷がある。
date: '2023-04-19'
tag:
  - HTML
  - Webブラウザ
  - デザイン
---

まずはこちらをご覧ください。毒々しいCSSが施されたselect要素です。
![chrome-normal](https://i.gyazo.com/a3079d8e10a42eb46b9d55d1f99e6c97.png)

上の画像のようなちょっと変わったデザインのselect要素を作った時、ChromeやOperaではfocus状態の時は次のようになります。  
![chrome-focus-default](https://i.gyazo.com/15638460feada9a82dfb8df92a5ccc7b.png)

毒々しくしたいのですがデフォルトの青い枠線が中途半端にかかり、邪魔になっています。
そんな時、borderとかなり似ている[outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)というプロパティを使います。
```css
.poison-select:focus {
  outline: 1px solid #ff0;
  /* Chromeなどでのデフォルトの色味を設定したい場合は「-webkit-focus-ring-color」を設定する */
  /* outline: 1px solid -webkit-focus-ring-color; */
}
```

![chrome-focus-custom](https://i.gyazo.com/81d1875832d0538bdded5a56d7af5895.png)

いい感じにすることができました。  
safariでも見てみましょう。

![safari-focus-without-offset](https://i.gyazo.com/151a452bffb8191e2c8949781dc14769.png)

違和感がありますよね？  
大きく2点で違いがあります。
* safariではselect要素の内側にfocus時の枠線ができる
* safariではoutline要素にradiusが効かない(※2023年3月27日リリースの[Safari V16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)から解消)

主に1点目の「select要素の内側にfocus時の枠線ができる」時の対策に[outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)を明示的に設定(0pxで)してあげます。

```css
.poison-select:focus {
  outline: 1px solid #ff0;
  outline-offset: 0px;
}
```
すると綺麗になります。  
![safari-focus-without-offset](https://i.gyazo.com/65572abbec5eaf9876f7e66ceef26857.png)


### Reproduction
<iframe src="https://codesandbox.io/embed/affectionate-surf-e2w97d?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="affectionate-surf-e2w97d"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### 参考文献
- [outlineプロパティで作った枠線は角丸にすることができない - dskd](https://dskd.jp/archives/73.html)
- [css - What is the default style of the blue focus outline in Chrome? - Stack Overflow](https://stackoverflow.com/questions/20609485/what-is-the-default-style-of-the-blue-focus-outline-in-chrome)