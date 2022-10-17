---
title: 音声認識モデルwhisperをインストールしてみた
description: whisper from openai を使ってみた際のメモ
date: '2022-10-17'
tag:
  - Python
  - 音声認識
  - 文字起こし
---

自分の環境のメモ的な意味合いが強いので、他のブログなどを参考にした方がいいです。  
[音声認識モデルwhisperの全モデル文字起こし比較 - 毎日がEveryday、日々 Day by Day](https://ysdyt.hatenablog.jp/entry/whisper)  
私は上のブログを見て使ってみようと思いました。

## 環境
| ソフト/ハード | バージョン |
|--------------:|---------:|
| iMac          | 27-inch, 2017     |
| macOS         | 12.6     |
| Python        | 3.9.6    |
| pip           | 22.3     |

普段pythonを使わない（言い訳）ので`% python3 hogehoge` `% pip3 hogehoge` とaliasすら貼ってない環境です。


## 手順
ffmpegをインストール
```sh
% brew install ffmpeg
```
whisperをインストール
```sh
% pip3 install git+https://github.com/openai/whisper.git
```
すると以下の警告が表示された。
```
Installing collected packages: whisper
  WARNING: The script whisper is installed in '/Users/ike/Library/Python/3.9/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed whisper-1.0
```
Pythonを日常使いすることないので、そうだったんだねー(どうやるのがスマートなんですか？)という気持ちで特にパスを通さず直接実行してみる。
```sh
% /Users/ike/Library/Python/3.9/bin/whisper /Users/ike/Downloads/recording.mp3 --language Japanese --model base
```
ちなみに自分の環境ではコマンド実行時に以下の警告が出た。
```
 UserWarning: FP16 is not supported on CPU; using FP32 instead
  warnings.warn("FP16 is not supported on CPU; using FP32 instead")
```

標準出力には以下のように出力される。
```
[00:00.000 --> 00:12.320] テストですと 本日はウィスパーの 紹介をしたいと思います
[00:12.320 --> 00:19.280] (恥ずかしいので省略)
[00:19.280 --> 00:26.720] トコマンドラインから実行することが できます
```

さらに、以下のようなファイルがカレントディレクトリに作成される。  
それぞれ形式違うらしいが標準出力とほぼ同じテキストファイル。
```
-rw-r--r--    1 ike   staff    319 Oct 17 20:02 recording.mp3.srt
-rw-r--r--    1 ike   staff    220 Oct 17 20:02 recording.mp3.txt
-rw-r--r--    1 ike   staff    303 Oct 17 20:02 recording.mp3.vtt
```

## まとめ
[GitHubのDiscussions](https://github.com/openai/whisper/discussions/categories/show-and-tell)内でwhisperを使ったツールなどが紹介されている。  
中にはリアルタイム文字起こしなどもあって眼福。  
個人的にはWeb会議を録音しておいて、議事録作成に役立てばすごく満足なので、一々上のコマンドを叩く使い方でしばらく使ってみようと思う。

### 周辺用語
- FP16
- FP32


### 参考文献
- [音声認識モデルwhisperの全モデル文字起こし比較 - 毎日がEveryday、日々 Day by Day](https://ysdyt.hatenablog.jp/entry/whisper)
- [openai/whisper: Robust Speech Recognition via Large-Scale Weak Supervision](https://github.com/openai/whisper)










