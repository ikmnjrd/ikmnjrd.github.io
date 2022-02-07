---
title: NotionでMarkdown記法的に画像を埋め込む（w/Gyazo）
date: '2022-01-23'
layout: layouts/post.njk
scheduled: '2022-01-23'
---

### 結論
**画像ファイル自体のリンクをNotionに貼り付ける**

![Notion埋め込み例](https://i.gyazo.com/7046c2a8fa7d00ff1cf6feb1503ce36c.png)

### 前提
私は画像を自身のブログに書くときなどにGyazo（スクリーショットの共有アプリ）を利用しています。

手元のテキストファイル（マークダウンファイル）として残しておく際には、`![hoge](url)`の記法で十分なのですが、Notionアプリ上でこの記法を使ってもそのまま画像を表示してくれません。

Gyazoを知らない人向けのイメージ画像。Gyazoを使ってスクリーンショットを撮ると、自動的にGyazoのクラウドサーバー（GCPを利用しているらしい）にアップロードされ、公開される。
![Gyazo画像](https://i.gyazo.com/34240519a32ac82716681aa70ef518fe.png)


### 作業の流れの例

Gyazoを利用して取得できるURL例:
https://gyazo.com/34240519a32ac82716681aa70ef518fe


Gyazoから自動的に与えられるURLをNotionに貼り付け(「Create bookmark」 「Create embed」を選択し)ても画像を綺麗に貼り付けられない。
![失敗例](https://i.gyazo.com/2f272328bf161c206970d572583f7b50.png)
↓
![続・失敗例](https://i.gyazo.com/26e64715a416362727c04054857d25d8.png)

Gyazoを使って生成されるリンクは、余分なWebページ情報が多く含まれている。そのためURLを次のようにしてからNotionに貼り付ける。
加工例（i.と拡張子.pngをつける）:
https://`i.`gyazo.com/34240519a32ac82716681aa70ef518fe`.png`


Notionに加工したURLを貼り付けると「Emged image」というオブションが選択できるので、選択すれば画像が埋め込まれる。
![成功例](https://i.gyazo.com/ef946f57d0800ca06f337425f98ec6fe.png)


