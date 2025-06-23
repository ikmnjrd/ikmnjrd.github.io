---
title: alacrittyでbeep音を鳴らす(Mac,Linux)
description: alacrittyをLinuxで使うときに苦戦した
date: '2025-6-23'
tag:
  - ターミナル
  - alacritty
---

自分のLinux(X Window)環境ではハマったのでそれの紹介。Macでも設定したが得に難しいことはなかった。

### 前提
beepと度々出てくるがエイリアスでそれぞれの環境で次の設定を`.zshenv`にしている
```sh
# Mac
alias beep="afplay /System/Library/Sounds/Submarine.aiff"

# Linux
alias beep="paplay /usr/share/sounds/freedesktop/stereo/bell.oga"
```

### Macでの設定

```yaml
[bell]
command = { program = "osascript", args = ["-e", "beep"] }
```

### Linuxでの設定

```yaml
[bell]
command  = { program = "/usr/local/bin/alacritty-bell", args = [] }
```
yamlに書いたスクリプトを自分で書いてインストール(以下の例では`/usr/local/bin/`にしているがお好きなところで。不要になったらrmでOK)

```
# /usr/local/bin/alacritty-bell
#!/bin/sh
# 最初の 2 つの引数 "-e" "beep" を捨てて残りを無視
shift 2
exec paplay /usr/share/sounds/freedesktop/stereo/bell.oga
```

```sh
sudo install -m 755 alacritty-bell /usr/local/bin/alacritty-bell

# テストとして
printf '\a'
```

##### 設定のポイント
以下のように設定しても実行時には鳴らない。
```yaml
[bell]
command = { program = "paplay", args = ["/usr/share/sounds/freedesktop/stereo/bell.oga"] }
```
alacrittyのログを`alacritty -vvv`で起動して`printf '\a'`を実行してみると次のように、`-e beep`というオプションが追加されてしまっている。(今思ったがosascriptに渡したいargsをLinux環境でも渡されてることが原因?未検証です)
```
[75.645577126s] [DEBUG] [alacritty] Launched paplay with args ["-e", "beep", "/usr/share/sounds/freedesktop/stereo/bell.oga"]
```


### おまけ
#### tmuxのコンフィグ


### 参考文献
- [Add support for audio bell · Issue #1528 · alacritty/alacritty](https://github.com/alacritty/alacritty/issues/1528)
- [ChatGPTログ(非公開リンク)](https://chatgpt.com/c/68581981-a338-8013-b5fc-be3e617b8a53)
