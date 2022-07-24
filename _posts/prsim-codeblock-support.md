---
title: 忘れがちなPrismJSがサポートしている言語
description: PrismJSでサポートされている
date: '2022-07-24'
tag:
  - Prism
  - JavaScript
  - マークダウン
---

### PrismJSでサポートされている言語を抜粋
`language-xxxx`の`xxxx`部分に当てはめればいいのがformatに書いてるやつ。

使う機会がありそうで忘れがちなやつをまとめた。jsstacktraceなんてよく使う機会あるはずなのに存在を知らなかった.
基本的には拡張子を指定すればいける。


| lang | format |
|:-----------|:------------|
| CSV| csv|
| Docker| docker|
| JSON5| json5|
| JSONP| jsonp|
| JS stack trace| jsstacktrace|
| JS Templates| js-templates|
| JS Extras| js-extras|
| Markdown| md|
| React TSX| tsx|
| React JSX| jsx|
| JSDoc| jsdoc|
| GraphQl| graphql|
| Go module| go-mod|
| Git| git|
| ignore| ignore, gitignore, hgignore, npmignore|
| Log file| log|
| SQL| sql|

### その他感想
nginxやapplescriptなどもサポートされてるみたいで懐が深い。

### 参考文献
- [prism - Supported Laungages](https://prismjs.com/#supported-languages)