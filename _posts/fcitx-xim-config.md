---
title: fcitxで日本語がインライン表示されないし、設定からximが見つからない
date: '2024-02-10'
tag:
  - linux
  - EndeavourOS
---

### 対処前の状況
EndeavourOSにfcitxとmozcをインストールした。
入力確定までは、入力補助ポップアップが表示されるが、カーソルが点滅してる位置には何も表示されない。

[ググって出てくる方法](https://dev.to/nabbisen/fcitx--1n59)も試すがGUIの「設定」を開いてもコンフィグファイルが開かれるだけでXIMの設定が見つからない
GUIの「設定」を開くと現れる設定ファイルは `~/.config/fcitx/config`である。

### 対処方法
`~/.config/fcitx/conf/fcitx-xim.config` を開く

```bash
vi ~/.config/fcitx/conf/fcitx-xim.config
```

開くといかのようになっていると思う
```text
[Xim]
# XIMで On The Spot スタイルを使う(起動中は変更できません)
# 可能な値:
# True False
# UseOnTheSpotStyle=False
```
コメントアウトを外すとともに、`UseOnTheSpotStyle=True`にする。
```text
[Xim]
# XIMで On The Spot スタイルを使う(起動中は変更できません)
# 可能な値:
# True False
UseOnTheSpotStyle=True
```


### 参考文献
- [Fcitx: リアルタイム入力（インライン入力）のための設定 - DEV Community](https://dev.to/nabbisen/fcitx--1n59)
