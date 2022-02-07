---
title: Macでオンライン会議を文字起こし
categories: misc
date: '2022-01-17'
layout: layouts/post.njk
scheduled: '2022-01-17'
---

### 調査
[Blackhole](https://github.com/ExistentialAudio/BlackHole)や[ladiocast](https://apps.apple.com/jp/app/ladiocast/id411213048)を使って録音した音声を文字起こしする方法がよく紹介されている。

リアルタイムでGoogle Docs上に文字起こしをしたかったが、Blackholeとlaidiocastでは実現できず。


### 無料で使えるリアルタイム文字起こしサービス
* Texta
* Sloos
* AI GIJIROKU


### 個人的な結論
普段のメモなどをGoogle Docsで管理しているため、Google Docsをマストとする。
そのためGoogle MeetやZoomを簡単に録音したい。
以上の理由から、[Blackhole](https://github.com/ExistentialAudio/BlackHole)と[ladiocast](https://apps.apple.com/jp/app/ladiocast/id411213048)で録音データをGoogle Docsに文字起こしする方式で、
録音自体を[Krisp](https://krisp.ai/)（ノイズ除去ソフト）で提供されている録音機能を使う。

