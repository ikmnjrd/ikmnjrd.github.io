GitHub Pagesを利用したブログです。
ポイポイとマークダウン+フロントマターを投げて雑に使う。

## Get started
$ git clone

$ rm -rf .git _posts/*

$ npm i

$ vi .env
```bash
# .env
WEBSITE_URL=https://{YOUR_NAME}.github.io
GA_MEASUREMENT_ID={YOUR_GA4_ID}
```
$ npm run dev


## 主な利用しているもの
* Next.js(SSG)
* tailwind


## 運用
`/_posts/` マークダウン形式で記事を格納

### 記事内で画像を使う
スクリーンショット的なものであればGyazoを利用する。
1. gyazoでスクリーショットを撮影。自動的にブラウザが開く
2. アドレスバーの`https://gyazo.com/XXXX`をコピー
3. `https://i.gyazo.com/XXXX.png`を記事中に指定

### 記事のfront matter
~~以下のようにカテゴリーを設定する場合はtech、もしくはideaを設定する。~~
~~Zennに移行しやすいように合わせている。[参考](https://zenn.dev/tech-or-idea)~~
```yml
---
title: Macでオンライン会議を文字起こし
date: 2099-12-31
tag:
 - bash
 - ポエム
---
```