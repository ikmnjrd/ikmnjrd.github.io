---
title: TypeScriptをネイティブコンパイルするって？
description: 僕の疑問に追記する形で更新しています。
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

マイクロソフトがTypeScriptコンパイラAPIをwikiにしてくれている。
[https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)