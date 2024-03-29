---
title: フォントについて
date: '2022-02-06'
tag:
  - Webブラウザ
---
### フォント
デジタルデータとしてフォントを表示するには切っても切り離せない。
これはもちろんWebの世界でも、ネイティブアプリの世界でも一緒。

フォントがない世界はありえない。

### 歴史？
Adobeはフォントという存在を意識できる人なら誰でも知ってる。
「Adobe Illustrator」「Adobe Photoshop」などに始まり、印刷用に開発されたPostScriptなどを開発したりしていた。

truetype(.ttf)
woff(.wof)
woff2(.woff2)
などの拡張子がある。

### フォントをユーザーにどう届けるか
* クライアントにプリインストールされているフォントを使う
* 自サーバーから配信
* Webフォントを使う（配信されているものにタダ乗り）

#### ライアントにプリインストールされているフォントを使う

- macOS Big Sur
  - [https://support.apple.com/ja-jp/HT211240](https://support.apple.com/ja-jp/HT211240)
- Windows 11
  -  [https://docs.microsoft.com/en-us/typography/fonts/windows_11_font_list](https://docs.microsoft.com/en-us/typography/fonts/windows_11_font_list)
- iOS
  - [https://developer.apple.com/fonts/system-fonts/](https://developer.apple.com/fonts/system-fonts/)
- Android
  - 端末メーカーによる場合があり

#### 自サーバーから配信
主要ブラウザはwoff2に対応しているので、woff2で用意するば十分。

[対応ブラウザ](https://caniuse.com/woff2)

#### Webフォントを使う
有名なものとして
- [Google Fonts](https://googlefonts.github.io/japanese/)
- [REALTYPE](https://www.realtype.jp/)


### 参考文献
- [各OSの標準搭載フォント一覧へのリンク集  |  Rriver](https://parashuto.com/rriver/development/preinstalled-font-list-by-operating-system)

