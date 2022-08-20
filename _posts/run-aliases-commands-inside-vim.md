---
title: vim内部(:r!)からエイリアスコマンドを利用する
description: vim(nvim)からエイリアスコマンドを利用する
date: 2022-08-18
tag:
  - terminal
  - vim
  - zsh
---

### 結論
`.zshenv`ならvim起動時にも読み込まれるので、エイリアスは`.zshenv`に記述する。
`.config/nvim/init.nvim` に以下を記述
```vim
set shell=zsh
```

### 余談
ブログを書くときに"yyyy-mm-dd"という形でいつも日付を書いていた。  
その時にvimから`date "+%Y-%m-%d"`と実行・挿入したかった。  
毎回オプションを書くぐらいならalias(名前day)として登録したが、`:r! day`で挿入されなかった.  (エラー内容: シェルが値を返しました 127)  


### 参考文献
- [terminal vim not loading .zshrc](https://stackoverflow.com/questions/11415428/terminal-vim-not-loading-zshrc)
