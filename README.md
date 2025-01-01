GitHub Pages を利用したブログです。
ポイポイとマークダウン+フロントマターを投げて雑に使う。

## Get started

$ git clone

$ rm -rf .git \_posts/\*

$ npm i

$ vi .env

```bash
# .env
WEBSITE_URL=https://{YOUR_NAME}.github.io
GA_MEASUREMENT_ID={YOUR_GA4_ID}
```

$ npm run dev

## 主な利用しているもの

- Next.js(SSG)
- tailwind
- MarkdownIt(マークダウンパーサー)
- MiniSearch(検索エンジン)
- D3.js(タグ記事のビジュアライズ)

## 運用

`/_posts/` マークダウン形式で記事を格納

`/_posts/draft/` に含まれるファイルは html として公開しない

### 記事内で画像を使う

スクリーンショット的なものであれば Gyazo を利用する。

1. gyazo でスクリーショットを撮影。自動的にブラウザが開く
2. アドレスバーの`https://gyazo.com/XXXX`をコピー
3. `https://i.gyazo.com/XXXX.png`を記事中に指定

### 記事の front matter

~~以下のようにカテゴリーを設定する場合は tech、もしくは idea を設定する。~~
~~Zenn に移行しやすいように合わせている。[参考](https://zenn.dev/tech-or-idea)~~

```yml
---
title: Macでオンライン会議を文字起こし
date: 2099-12-31
tag:
  - bash
  - ポエム
---
```

### 記事内のコードブロック

[prismjs](https://prismjs.com/#supported-languages)でサポートされているものに当てはまらないと感じたらとりあえず`sh`を指定しておく

## dependency version

node-fetch(v3.2)が ESM のみになっているが ts-jest が ESM only のパッケージに対応していないようなので、node-fetch を 2 系でインストール。
https://github.com/node-fetch/node-fetch/discussions/1503
global fetch は型の部分で使い勝手が悪かった

## メモ

`npx prettier --config ./.prettierrc --write src/pages/about.tsx`
