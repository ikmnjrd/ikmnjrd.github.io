---
title: 疑似要素を使ったチェックボックスを書いた際にSafariで困ったこと
date: '2023-03-31'
tag:
  - CSS
  - Safari
---

チェックボックスを少し洒落たデザインにする時、疑似要素の:beforeと:afterを使って実装すると思う。そんな時にsafariで困った時の備忘録。  

### 実装の雰囲気
```html
<div class="box">
  <input id="checkbox_1" type="checkbox" class="no-display" />
  <label for="checkbox_1" class="designed"><span>テキスト</span></label>
</div>
```
```css
.box {
  position: relative;
}
.no-display {
  display: none;
}
.designed:before,
.designed:after {
  position: absolute;
  content: "";
  display: block;
}
.designed:before {
  z-index: 1;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  left: 7px;
  width: 5px;
  height: 8px;
  top: 3px;
  transform: rotate(45deg);
  opacity: 0;
}
.designed:after {
  content: "";
  border: 1px solid #d3d5d5;
  border-radius: 4px;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  background-color: #fff;
}
.designed > span {
  margin-left: 24px;
}
.no-display:checked + .designed:before {
  opacity: 1;
}

```

### 問題の状態
問題になった箇所がsafariで、`position: absolute`をしていしているにも関わらず、疑似要素が before - 要素 - afterの順を崩してくれない。  
そのためbeforeとafterの要素を重ね合わせたいのに分離してしまっている。  

- safariでのレンダリング結果
![OSX-safari(16.0)でのレンダリング結果](https://i.gyazo.com/e63e9404ae95aa49af9b4616f9c4d15a.png)

- Chrome等でのレンダリング結果
![OSX-Braveでのレンダリング結果](https://i.gyazo.com/a4a4deec03d659f3a271762295f3c265.png)

### 対策
自分に何の理解が足りていないのかがいまいち判然としませんが、「span(非変形可能要素)にtransformが効かないようなものかな〜」と感じて、上記コードを次のようにすることで無理やり解決しました。


```css
.box {
  position: relative;
  display: flex;
  justify-content: left;
}
```

場当たり感が否めません。


### 検証に使ったsandbox
safari用のものが見たいならsafariで開き、chrome用のものが見たいならchromeで開いてください。頭痛が痛い。  
<iframe src="https://codesandbox.io/embed/pedantic-nash-sr1d7v?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="pedantic-nash-sr1d7v"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>