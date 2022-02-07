---
title: 疑問メモ_TypeScriptをネイティブコンパイル
date: '2021-12-26'
layout: layouts/post.njk
scheduled: '2021-12-26'
---

### 疑問
WebブラウザではV8エンジンがJavaScriptを解釈・実行するのはわかったが、JavaScriptに埋め込まれたwasm（別言語・npm）で提供されている場合もV8エンジンが同一スレッド内でwasmを解釈・実行するの？
V8がhidden classを作成して、、、

### 参考文献
- [https://postd.cc/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code/](https://postd.cc/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code/)
