---
title: ESモジュール内でJSONを読み込む方法
description: ESモジュール内でJSONを読み込む方法
date: '2022-08-06'
tag:
  - Node.js
  - JavaScript
  - JSON
---

### 楽ができるNodeのバージョン
Node.js`v17.5~`もしくは`v16`の`--experimental-json-modules`オブションを使えば利用できます。

```js
/* index.js */
// An import assertion in a static import
import info from `./package.json` assert { type: `json` };

// An import assertion in a dynamic import
const { default: info } = await import("./package.json", {
  assert: {
    type: "json",
  },
});
```
`v16`でオプション付きで実行する場合は`$ node --experimental-json-modules index.js`と実行します。
ちなみに`--experimental-wasm-modules`というオプションで`wasm`も読み込めます。

### 対象のバージョン以外でやる方法
1. JSONを読み込み自力でパースする
```js
import { readFile } from 'fs/promises';
const json = JSON.parse(
  await readFile(
    new URL('./some-file.json', import.meta.url)
  )
);
```
2. [createRequire](https://nodejs.org/api/module.html#module_module_createrequire_filename)を使う
```js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data.json");
```


### 参考
本記事のソースコードおよび内容は以下のリンク先から引用しています。
- [How to import JSON files in ES modules (Node.js)](https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/)
