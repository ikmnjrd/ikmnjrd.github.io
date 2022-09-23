---
title: Chromeディベロッパーツールを使おう
description: ちょっと目に止まったディベロッパーツールの機能を紹介
date: '2022-09-23'
tag:
  - Webブラウザ
  - JavaScript
---

### JavaScriptの値をリアルタイムに監視する
![watch](https://i.gyazo.com/6672149b7ec1d9594b135a95b466d3df.png)　　
目のマークをクリック、監視したい対象を記述する。  

Next.jsのpropsなどもこのように指定することで見れる。  
![__NEXT_DATA](https://i.gyazo.com/c0aea2fc27e14a4e81581efbdf7accc3.png)

### minifyされたJSファイルを見やすくする
巷でいうpritty printは「{}」と表示された箇所をクリック
![minified](https://i.gyazo.com/6dc5d5259c2116dd0be1580eae2da93b.png)
![prittyprint](https://i.gyazo.com/5f7cc0e5ce0a3abed4685a13992fd689.png)

### ブレークポイント

| ブレークポイントの設定できるもの | 説明 |
|:-----------|:------------|
| Line-of-code|	On an exact region of code. |
| DOM|	On the code that changes or removes a specific DOM node, or its children.|
| XHR	|When an XHR URL contains a string pattern.|
| Event listener|	On the code that runs after an event, such as click, is fired.|
| Exception|	On the line of code that is throwing a caught or uncaught exception.|
| Function	| Whenever a specific function is called.|

詳しくは[ここ](https://developer.chrome.com/docs/devtools/javascript/breakpoints/)を見てくれ

DOMを右クリックして「BreakOn」から設定したり、Sourceタブの右側からXHR(Fetch)をリクエスト先を指定して設定したりできる。

### console
Node.jsで使うことの方が多いが、一応紹介
#### console.dir
HTML Elementを見るときなどにconsole.logだと出力してくれない情報などがあって便利
```js
const obj = getElementById('hoge')
console.dir(obj)
```

#### console.time
実行時間を調べたいとき
```js
console.time();
for (var i = 0; i < 100000; i++) {
  let square = i ** 2;
}
console.timeEnd();
```

![console.time実行結果](https://i.gyazo.com/1e32408254a932443cfc9763d5ad213e.png)

### その他一言
#### performanceタブ
ボトルネックになっている箇所を調べるときに。パフォーマンス改善したいならとりあえず見るとこ。

#### networkタブ
APIとのやりとりを見ようね。  

飽きた。

### 参考文献
- [Watch JavaScript values in real-time with Live Expressions - Chrome Developers](https://developer.chrome.com/docs/devtools/console/live-expressions/)
- [Pause your code with breakpoints - Chrome Developers](https://developer.chrome.com/docs/devtools/javascript/breakpoints/)
- [Console API reference - Chrome Developers](https://developer.chrome.com/docs/devtools/console/api/)