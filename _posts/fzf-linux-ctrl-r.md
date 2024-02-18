---
title: fzfの履歴検索（Ctrl + r）が動いてないときに確認すること
date: '2024-02-18'
tag:
  - linux
  - EndeavourOS
  - fzf
---

### 対処前の状況
EndeavourOSにfzfをインストールしたが、fzfの履歴検索が機能しない
![対処前イメージ](https://i.gyazo.com/d3febdcaec7dd79a7c5f2d69a0fe3719.png)

### 対処方法
環境によって異なるが私の環境の場合は`/usr/share/fzf`にあった。人によっては`/usr/loxal/share/docs/fzf`などにある場合もあるらしい。
```
$ls /usr/share/fzf/
合計 52
drwxr-xr-x   2 root  4096  2月 15 22:54 .
drwxr-xr-x 177 root  4096  2月 15 22:55 ..
-rw-r--r--   1 root 14523  2月  4 00:41 completion.bash
-rw-r--r--   1 root 11766  2月  4 00:41 completion.zsh
-rw-r--r--   1 root  5524  2月  4 00:41 key-bindings.bash
-rw-r--r--   1 root  4115  2月  4 00:41 key-bindings.zsh
```


私はzshを使っているので.zshrcなどに以下を追記した
```bash
source /usr/share/fzf/key-bindings.zsh
```

### 参考文献
- [fzf bash history CTRL+R not working · Issue #1190 · junegunn/fzf](https://github.com/junegunn/fzf/issues/1190)
