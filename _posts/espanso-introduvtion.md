---
title: shellコマンドにも対応したスニペットアプリespansoのすすめ
description: クロスプラットフォーム対応のスニペット管理ツールespansoの紹介
date: '2024-11-28'
tag:
  - テキスト入力
---

### はじめに
以下のどれかに当てはまる人にはぜひespansoをおすすめしたいです。
- slackのような記法(:emoji_name:)で絵文字を入力したい
- テキスト入力中にシェルから実行したコマンドの結果をシェルに移動せずに得たい
- スニペット管理ツールのショートカットを叩いて段階的に目的のスニペットを絞り込んでいくワークフローが最適だとは思わない


### espansoとは

> espansoは、キーワードに応じてテキストを自動展開するオープンソースのテキストエクスパンダーです。YAML形式でカスタマイズ可能な設定を作成でき、ショートカットやテンプレート入力の効率化に役立ちます。クロスプラットフォーム対応で、Windows、macOS、Linuxで利用可能です。

と、ChatGPTは言ってます。

パソコンによく使う単語を辞書登録して使っている人も多いと思います。自分も顔文字を登録して運用していたこともあったのですが読み仮名の登録をすべて"カオモジ"とする以外思いつかず結局予測変換の上に出てくるもので使用するものが固定化してしまいました。
espansoはその辞書登録の超強化版だとまずは理解してもらいたいです。  
特定のキーワードに対応した固定値を出すのはもちろん、fuzzyな絞り込みにも対応しています。  
さらに、シェルコマンドの実行結果も思いのまま出力できるので日時を出すのはもちろん、WebAPIの実行結果も表示できます。要は色々と応用が効くことが保証されてることと一緒です。文字入力する場所がどこでも簡易的なシェルになります。すごい。  
そして、yamlで管理できるので可読性があり、可搬性にも優れています。  
ついでに[espanso hub](https://hub.espanso.org/)というところで有志が公開しているパッケージを手元にかんたんにインストールできるので、使い始めてすぐに辞書（スニペット）を充実させられます。



### おすすめのパッケージ

- All Emojis
  - SlackやGitHubのように絵文字を使いたい人におすすめ。`:pray:`で🙏
  - https://hub.espanso.org/all-emojis
- Apple Symbols
  - ⌘などさらっと出せるとかっこいい
  - https://hub.espanso.org/apple-symbols
- Arrows
  - 地味に出すのが面倒な"→"系をさらっと出せる
  - https://hub.espanso.org/arrows
- curl Package
  - curlの組み立てを毎回ググるので、それならこっちのフォームで組み立てたほうがラク
  - https://hub.espanso.org/curl
- Hax
  - XSSやSQLインジェクションなどの対策ができているかの確認用
  - https://hub.espanso.org/hax

私はこれらの辞書登録をコロンから始めるのではなく、セミコロンから始めるようにカスタマイズして使っています。  
ぜひ皆さんも使ってみてください。おすすめです。



### 参考文献
- [Espanso - A Privacy-first, Cross-platform Text Expander](https://espanso.org)
- [Espanso Hub | Enhance your workflows with espanso packages](https://hub.espanso.org)
