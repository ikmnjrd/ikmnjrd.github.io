---
title: TypeScriptをネイティブコンパイルするって？
date: '2021-12-26'
layout: layouts/post.njk
scheduled: '2021-12-26'
---

### 疑問
typescriptをjavascriptを挟まずにネイティブコードにコンパイルするようなプロジェクトはないのか？

### 自分なりの回答
ないよ。

DenoがTypeScriptコードをサポートしているが、中ではコンパイラが一度JavaScriptに変換している。
