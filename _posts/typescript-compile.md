---
title: TypeScriptをネイティブコンパイルするって？
date: '2021-12-26'
tag:
 - TypeScript
 - Deno
---

### 疑問
typescriptをjavascriptを挟まずにネイティブコードにコンパイルするようなプロジェクトはないのか？

### 自分なりの回答
ないよ。

DenoがTypeScriptコードをサポートしているが、中ではコンパイラが一度JavaScriptに変換している。
