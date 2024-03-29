---
title: mp3について
description: NeoVimとvoltaを使うと必ずこの問題にぶち当たるのでは？
date: '2024-01-14'
tag:
  - mp3
  - 音楽
---

## まとめ
- 自分のモチベの言語化で人に見せるようではない。
- mp3の規格書は有料だからほぼ公開されてない。OSSの[Flac](https://gitlab.xiph.org/xiph/flac)でも読んでおけ


## この記事を書いた動機
[誰が音楽をタダにした？　巨大産業をぶっ潰した男たち (早川書房)](https://www.amazon.co.jp/%E8%AA%B0%E3%81%8C%E9%9F%B3%E6%A5%BD%E3%82%92%E3%82%BF%E3%83%80%E3%81%AB%E3%81%97%E3%81%9F%EF%BC%9F-%E5%B7%A8%E5%A4%A7%E7%94%A3%E6%A5%AD%E3%82%92%E3%81%B6%E3%81%A3%E6%BD%B0%E3%81%97%E3%81%9F%E7%94%B7%E3%81%9F%E3%81%A1-%E6%97%A9%E5%B7%9D%E6%9B%B8%E6%88%BF-%E3%82%B9%E3%83%86%E3%82%A3%E3%83%BC%E3%83%B4%E3%83%B3-%E3%82%A6%E3%82%A3%E3%83%83%E3%83%88-ebook/dp/B01LYMTJ0M)という本を読んでいたらmp3という音楽ファイルフォーマットの開発それ自体と規格として広げるための難しさが書かれていた。  
特に開発に関しては、音響心理学などに興味がある自分としては、人間の特性に合わせていくつもの（何個？）チューニングが施されてるとはなぜか想像していなかった（ローパスフィルターなどが1,2個だと思い込んでいた）ので、この機会にmp3を学ぶためのヒントとして読書途中に探した物を残しておく。


## 参考リンク一覧

- [デジタルオーディオの仕組み - 音声圧縮の原理 MP3, AAC, ATRAC, etc.](https://align-centre.hatenablog.com/entry/2014/04/28/222154)
  - すご〜くざっくりとmp3がどういう処理をしているのか思い出すのにいい。
- [Spotifyのオーディオファイル形式 - Spotify](https://support.spotify.com/jp/artists/article/audio-file-formats/)
  - spotifyはアーティストからFLAC形式でオーディオファイルを送信するのを推奨している。それをspotifyが適切な音質オプションに合わせて配信している。
- [MP3 - Wikipedia](https://ja.wikipedia.org/wiki/MP3)
  - mp3の状況（規格書が有料）をここで知った
- [CD 11172-3
CODING OF MOVING PICTURES AND ASSOCIATED AUDIO
FOR DIGITAL STORAGE MEDIA AT UP TO ABOUT 1.5 MBIT/s
Part 3 AUDIO
CONTENTS ](https://csclub.uwaterloo.ca/~pbarfuss/ISO11172-3.pdf)
  - mp3の規格書の極々一部と思われるもの
- [Xiph.Org / flac · GitLab](https://gitlab.xiph.org/xiph/flac)
  - 現在音楽業界で広く使われているFlacのソースコード