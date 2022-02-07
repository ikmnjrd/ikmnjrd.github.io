---
title: 疑問メモ_cosole.logをソースコードに残しておくことのメモリへの影響について
date: '2022-01-05'
layout: layouts/post.njk
scheduled: '2022-01-05'
---

### 疑問
console.logの上書きで本番環境はデバッグメッセージを表示させないという技を知ったが、これがメモリに影響ないのかどうか知りたい。
```javascript
console.log = () => {}
```
ちなみに最近ディベロッパーツールでメモリーのスナップショットを撮るという技を知った。

Create React Appで適当に作ったプロジェクトで適当にconsole.logを出力してみた。
![ソース](https://i.gyazo.com/f55499b3db011a5c81d04c58d71b089b.png)

`console.log`の呼び出しを増やしてブラウザを更新->HEAP Snapshot取得すると`console.log`の呼び出し回数に応じてメモリ使用量が一見増えるように見えたが、しばらく放置して再びHEAP Snapshotを取得するとメモリ使用量が低水準にまで戻る。GCに回収されたのかな？と想像したが、よくわからない。
![メモリ](https://i.gyazo.com/1ef68f7e017d8ed2309a6ff90d9036ad.png)

### 周辺用語
- 


### 参考文献
- []()
