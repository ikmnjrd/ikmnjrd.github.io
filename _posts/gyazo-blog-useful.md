---
title: Gyazoをブログ用の画像ホストとして使い倒す
date: '2022-02-11'
tag:
  - HTML
---

大好きなWebサービス「Gyazo」の紹介です。

簡単にこのサービスを説明すると、Gyazoを使ってスクリーンショットを撮ると無料のクラウドサーバーにアップロード&URLが発行され、共有が簡単にできるサービスです。

`https://gyazo.com/37f2d7be5ea5964c6aa339f0aa95c9f8`
![例](https://i.gyazo.com/37f2d7be5ea5964c6aa339f0aa95c9f8)


このようにすると、画像を直接指定できる。

`https://i.https://gyazo.com/37f2d7be5ea5964c6aa339f0aa95c9f8.png`

以下のようにするとサイズを指定できる

`https://i.gyazo.com/thumb/300/37f2d7be5ea5964c6aa339f0aa95c9f8.png`

これを応用すると、画像を自前でホストせずに、最適化した画像によるレスポンシブ対応がhtmlだけでできる。

```html
  <img
    src="https://i.gyazo.com/37f2d7be5ea5964c6aa339f0aa95c9f8.png"
    srcset="https://i.gyazo.com/thumb/320/37f2d7be5ea5964c6aa339f0aa95c9f8.png 320w,
            https://i.gyazo.com/thumb/640/37f2d7be5ea5964c6aa339f0aa95c9f8.png 640w,
            https://i.gyazo.com/thumb/1280/37f2d7be5ea5964c6aa339f0aa95c9f8.png 1280w"
    sizes="(max-width:1280px) 100vw, 1280px"
  >
```

`<picture/>`と`<source/>`を使えばより柔軟に設定できる。


### 周辺用語
- レスポンシブデザイン
- srcset
- ポリフィル「picturefill」

### 参考文献
- [レスポンシブ画像 - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [HTML 5.1のsrcset・sizes属性とpicture要素の使い方 - レスポンシブイメージで画像表示を最適化 - ICS MEDIA](https://ics.media/entry/13324/)
