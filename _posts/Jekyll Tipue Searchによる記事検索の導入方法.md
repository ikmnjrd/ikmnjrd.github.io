---
title: Jekyll Tipue Searchによる記事検索の導入方法
categories: tech
date: '2022-01-18'
layout: layouts/post.njk
scheduled: '2022-01-18'
---

Github Pagesで手軽にブログを作成する際に第一候補となるであろうStatic Site Generator「Jekyll」に自作ブログ内検索を手軽に導入する方法について記述します。

![完成イメージ図](https://gyazo.com/9f18a04650fb3bfaef972a88a25a00f2.png)


### 準備するもの
- すでに公開設定などを済ませたJekyll製ブログ
### 手順
1. 以下に示すソースコード（./assets）をダウンロードします。

[ソースコード(d4b5df7).zip](https://github.com/jekylltools/jekyll-tipue-search/archive/refs/heads/master.zip)

>[公式GitHubリポジトリ](https://github.com/jekylltools/jekyll-tipue-search)は2017年8月23日より新規コミットがないので、以下に直接zipのリンクを掲載しています。



2. 解凍し、自身のブログのソースコードにassetsフォルダの中身を丸ごとコピーします。

![image1](https://i.gyazo.com/e8456b0e9178d920970dcc32c088b62a.png)
![image2](https://i.gyazo.com/b1c5d6ca798cf6851b5b17db17b09e8e.png)

3. 利用しているテーマでheadタグを規定している部分に以下のソースコードを追記する。
   - 筆者の環境だと[minima](https://github.com/jekyll/minima)を利用しているので、`_includes/custom-head.html`が本手順の作業対象になります。

[ソース](https://github.com/jekylltools/jekyll-tipue-search)

![image3](https://i.gyazo.com/a75a11a735f7db802a1f1eaccabebad3.png)

1. 以下に示すコードを`search.html`としてコピペし、画像のように配置します。
   - [minima](https://github.com/jekyll/minima)であれば、統一感を持たせるためにファイル名`search.md`とするのが綺麗な気がするので、私は`search.md`としています。

[ソース](https://github.com/jekylltools/jekyll-tipue-search)

![image4](https://gyazo.com/e83c01861fea2707147a8970e8f31784.png)


5. あとは`_config.yml`をいじるなりしてヘッダー部分にパーマリンクを設置したり、CSSを少し変えてみたり、ビルド、デプロイをすれば完了です。
   - よろしければ[筆者の公開リポジトリ](https://github.com/ikmnjrd/ikmnjrd.github.io)を参考にしてみてください。

完成です。

![完成](https://i.gyazo.com/82a80325376d64d4e4560fc0b924881f.png)
