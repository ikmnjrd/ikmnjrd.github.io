---
title: WeakMapの使い所
date: '2022-01-16'
layout: layouts/post.njk
scheduled: '2022-01-16'
---

### WeakMapとは
ES2015で追加された仕様。ハッシュテーブルの一種。
MDNには以下のように書かれています。
>The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced.

`weakly referenced keys`(弱い参照) という概念がキモ。


似たオブジェクトとの一番わかりやすい違いが、キーにすることができるデータ型です。
| オブジェクト | プロパティキーにできるもの | 値にできるもの |
|:-----------|:------------|:------------|
| WeakMap   | Object      | 任意            |
| Object    | 文字列, Symbol    | 任意       |
| Map       | 関数、オブジェクト、あらゆるプリミティブなど    | 任意      |

ちなみにArray型（配列）は、キーバリューのかたち（キー付きコレクション）ではないです。逆にArrayやInt8Arrayなどは索引付きコレクションと呼ばれています。[参考:「標準組み込みオブジェクト」](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)

上の表を見た個人的感想はWeakMapはObjectと似ているな、と思うので今回の比較に用いていきたいと思います。

### Objectとの違い、使い分け

雑な説明ですが、JavaScriptではプロトタイプチェーンの仕組みにより、新しいオブジェクトを作ると元にしたオブジェクトを参照しながらメモリに保持されます。

> キーによるオブジェクト参照は弱く保持され、そのオブジェクトへの参照が他に存在しないときはガベージコレクション (GC) の対象になります（出典: [MDN-キー付きコレクション](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object)）

これが"弱い参照"とされる理由の一つです。
> Map オブジェクトとの違いの１つは、WeakMap のキーは列挙可能ではないことです（すなわち、キーのリストを取得するメソッドがありません）。もしも列挙可能であれば、リストは非決定性をもたらす、ガベージコレクションの状態に依存することになってしまいます。（出典: [MDN-キー付きコレクション](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object)）



### 使い方の例

```javascript
  // HTMLMediaElement用
  var audioEle;
  var wm = new WeakMap();

  /* 〜中略〜 */

  // WeakMapでHTMLMediaElementを保持する
  if (wm.has(audioEle)) {
    audioSourceNode = wm.get(audioEle);
  } else {
    audioSourceNode = audioCtx.createMediaElementSource(audioEle);
    wm.set(audioEle, audioSourceNode);
  }
```
出典:[https://github.com/TakeshiOkamoto/waveform-spectrum/blob/master/waveform-spectrum.js](https://github.com/TakeshiOkamoto/waveform-spectrum/blob/master/waveform-spectrum.js)

### 参考
- [WeakMap Objects-sec](https://262.ecma-international.org/#sec-weakmap-objects)
- [tc39-GitHub](https://github.com/tc39/ecma262-6-src)
- [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [https://uhyohyo.net/javascript/16_1.html](https://uhyohyo.net/javascript/16_1.html)
- [https://github.com/TakeshiOkamoto/waveform-spectrum/blob/master/waveform-spectrum.js](https://github.com/TakeshiOkamoto/waveform-spectrum/blob/master/waveform-spectrum.js)
