---
title: インサートモードから抜けたときに日本語入力モードから英字入力に自動で戻す(fcitx5)
description: インサートモードから離れたときにfcitx5のコマンドを呼び出す
date: '2024-10-03'
tag:
  - Linux
  - vim
  - InputMethod
---

### 結論
```vim
augroup fcitx5_integration
  autocmd!
  " autocmd InsertEnter * :call system('fcitx5-remote -o')
  autocmd InsertLeave * :call system('fcitx5-remote -c')
augroup END
```
### 環境
- neovim 0.10.1
- fcitx5 5.1.10

### 参考文献
- [keaising/im-select.nvim: Switch Input Method automatically depends on Neovim's edit mode](https://github.com/keaising/im-select.nvim)
- [brglng/vim-im-select: Improve Vim/Neovim experience with input methods.](https://github.com/brglng/vim-im-select)
