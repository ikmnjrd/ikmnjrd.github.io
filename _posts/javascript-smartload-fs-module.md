---
title: CommonJSでもスマートにfsモジュールを読み込む
date: '2022-02-03'
tag:
  - JavaScript
---
### 前提
Node.jsで開発するとき、`fs`はかなりよく使う。
そして私はまだwebpackの呪縛から逃れられていないので、CommonJSで書きたい場面が多い。
そして現在で使うときは大抵`Promise型`で使う。

### 結論
そんなときには次のように書くとスマート
```javascript
const { promises: fs } = require('fs')
```

こういう書き方でもいい。
```javascript
const fs = require('fs').promises;
```


### 参考文献
- [https://github.com/vercel/next.js/blob/canary/examples/blog/scripts/gen-rss.js](https://github.com/vercel/next.js/blob/canary/examples/blog/scripts/gen-rss.js)
- [[Node.js]fs.promises APIの使い方](https://tech.chakapoko.com/nodejs/file/promises.html)
