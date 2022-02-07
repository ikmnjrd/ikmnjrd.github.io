---
title: 疑問メモ_evalが頻出するのはなぜ
date: '2021-12-26'
layout: layouts/post.njk
scheduled: '2021-12-26'
---

### 疑問
なんでWebpack?esbuild?などでトランスパイルしたjsファイルにeval(withも?みたことはないけど)が頻出するの？
MDNを見たけど、危険ってことしかわからなかった。
自分なりに考えた理由としてはevalは機械語(ネイティブコード)に近いからコンパイルが楽になると予想した。

### 自分なりの回答
`eval`は[標準組み込みオブジェクト](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)として実装されているから、と言う説

### 周辺用語
- 


### 参考文献
- [標準組み込みオブジェクト](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)
