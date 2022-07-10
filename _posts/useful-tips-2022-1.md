---
title: 最近知ったTips
description: 2022年度に知ったTipsまとめその1
date: '2022-07-09'
tag:
  - misc
  - shell
  - zsh
  - Webブラウザ
---

### 著者近況
転職を経てシステム開発会社に入社して2ヶ月。知らないことばかりが頭上を飛び交うドタバタの中、合間を縫って引っ越しをした。少し新しい生活に慣れ始めた今日この頃。久々に自分の興味を昇華しようとGitHubで他人のdotfilesを覗いたりしている。なお当人はMacのデフォルトのterminalを使い続け、特に設定にこだわろうとしたことすらなかったところ。

## Tips

### Webブラウザを簡易的なメモ帳として使う
アドレスバーに以下を入力しEnter
`data:text/html, <html contenteditable>`

htmlなのでstyleの指定やscriptタグも読み込める。
`data:text/html, <html contenteditable style="font-style: italic;">`

### Zsh
#### historyの検索
`control + r` でhistoryからの検索&実行ができる

#### cd系
pushdとpopdとこれらを使うのに便利な設定
```shell
# This is in ~/.zshrc
setopt auto_pushd
setopt pushd_ignore_dups
```

#### history系
```shell
# This is in ~/.zshrc
setopt hist_ignore_dups
setopt share_history
setopt inc_append_history
```

#### Zshのオプションの一覧(Web）はここ
[https://zsh.sourceforge.io/Doc/Release/Options-Index.html](https://zsh.sourceforge.io/Doc/Release/Options-Index.html)


### Mac標準TerminalとiTerm2
使ってて一番違うのが"色"という自分なりの結論。
[pastel](https://github.com/sharkdp/pastel)をbrew installして使ってみるのが体感しやすかった。
今まで標準のTerminalを使っていたが、nvimを試している中でiTerm2に乗り換えることにした。


### 周辺用語
- true color 
- 16bit color 
- 24bit color

### 参考文献
- [ブラウザのタブがメモ帳になる技が便利　とっさに何かメモりたいときなどに](https://nlab.itmedia.co.jp/nl/articles/2207/06/news129.html)
- [現役シリコンバレーエンジニアが教える NeoVim(VIM) + Tmux + Zsh 入門](https://www.udemy.com/course/vim-tmux-zsh/)