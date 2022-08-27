---
title: iTermで1単語分の移動をできるようにする
description: 僕の疑問に追記する形で更新しています。
date: '2022-08-27'
tag:
  - bash
  - zsh
  - iTerm
---
### 前提

terminal操作で`ctrl+a`を押せば行頭へ戻る  
`ctrl+e`を押せば行末へ移動  
`ctrl+u`を押せばカーソル位置から行頭まで削除  
ここまではいい。  

しかし、  
`option + b`や`option + f`を使って1単語分の移動をしようとすると筆記体のfやルート記号が入力され移動できない  
(MacのoptionはしばしばAltと同等)  

### 結論

iTerm側の設定を変更する。  
画像のLeft Option keyがNormalがデフォルトの設定のはずなので、Esc+に変更する
[!iTerm](https://i.gyazo.com/89dddef08769a9f3f3e3c59408a83ce9.png)

### 参考文献

- [macos - Bash keyboard shortcuts in iTerm like Alt+d and Alt+f - Stack Overflow](https://stackoverflow.com/questions/18923765/bash-keyboard-shortcuts-in-iterm-like-altd-and-altf)
