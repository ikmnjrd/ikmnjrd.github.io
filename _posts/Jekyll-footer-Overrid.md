---
title: Jekyllテーマのhtmlオーバーライド
date: '2021-12-22'
layout: layouts/post.njk
scheduled: '2021-12-22'
---

できるだけ楽をしてブログを続けるために仕方なくGitHub PagesでJekyllを使ってる人は僕以外にいることと思う。

~~今となっては古いデザインのものが多く、好みのテーマを見つけることすらめんどくさかった。それすら古さが漂う~~

せっかく見つけたテーマのうち1部分だけ気に入らない時の対処法を書く。
ちなみにテーマは[minima](https://github.com/jekyll/minima)です。

今回僕が気に入らなかったのが、footerにある「Subscribe」の文字部分。これを消したい。
![feeds削除前](https://i.gyazo.com/1c3f3779075834651e9c927a2ea096a4.png)


[minima](https://github.com/jekyll/minima)のソースコードを確認し、`/_incledes/footer.html`が気に入らなかった箇所があることを確認した。


**自身のリポジトリ**に`/_incledes/footer.html`を作成、今回はオリジナルのfooter.htmlから該当箇所を削除。

以下の画像のような状態になると思います。
![リポジトリルート](https://i.gyazo.com/aa22c02a8c6b29a6ed66c1d473d6695d.png)

いつも通りGitHubにpush。
消えたことが確認できました。
![feed削除後](https://i.gyazo.com/1d8dc36636e96098fa0bff06abe2a31f.png)
