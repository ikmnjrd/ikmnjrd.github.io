---
title: contenteditable（HTML）とdataURIを使う際のTips
description: オフライン環境でも使えるブラウザベースの簡易マークダウンエディタを作った時に知ったことのまとめ
date: '2022-08-11'
tag:
  - HTML
  - JavaScript
---
## 概要
[オフライン環境でも使えるブラウザベースの簡易マークダウンエディタ](https://github.com/ikmnjrd/browser-local-md-editor)を作成した際に知ったことなど、
箇条書きな内容です。　　

## Tips
- `<pre>`と`<div>`の違い。contenteditable属性と合わせて使う場合、preは改行やスペースなど入力を入力したまま保持（入出力）してくれる が、divだと改行など特にエスケープされてしまうので、
contenteditableと使う場合はpreを使う方がベター
- `<head>`に`<style>`タグでcssを書くとパースがシビアになりすぐ変な挙動になるので、個々のhtmlタグのstyle属性に直書きする。今回作成した簡易的なマークダウンエディタなど、
htmlが少ないなら有効。
- dataURIでhtml、特にマークダウン書式を書くならマークダウンんで多用する「#」をURLエンコードに合わせることを意識しておく。#は「%23」で表現される。
- tabキーなど、文字入力は色々気を使わなくちゃいけない。onkeydownで処理するよりonkeyupで処理した方が都合が良いことが多い。
- contenteditableなhtmlで参考にすべきはTwitter。Twitterすごい。
- dataURLではWebStorageが使えない。


### 参考文献
- [How To Add New Line In Markdown? – WiseTut](https://wisetut.com/how-to-add-new-line-in-markdown/)
- [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)
- [jQueryでIME入力確定時にイベントを発行する - Qiita](https://qiita.com/hrdaya/items/6488d8dd3962cf35c0a0)