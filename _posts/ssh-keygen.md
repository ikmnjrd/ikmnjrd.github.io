---
title: 自分のsshキーの作り方メモ
description: 僕の疑問に追記する形で更新しています。
date: '2022-07-14'
tag:
  - shell
  - 私的メモ
---
### 手順
`$ ssh-keygen -t ed25519`
パスフレーズ（パスワード）はナシ。自分しか使わないマシン上で使う鍵なので。もしマシンの管理者が自分以外ならしっかり設定しておく。

### github
```
$ ssh -T github
Hi ikmnjrd! You've successfully authenticated, but GitHub does not provide shell access.
```
認証は通ってるがいざcloneをしようとしたら `Permission denied (publickey).` のエラー。
```
$ ssh -vT git@github.com
```
よくわからなかったが類似エラーを適当に検索したら~/.ssh/configのHostの値が原因っぽかった。
```
====変更前
Host github
====変更後
Host github github.com
```
無事cloneできた。

### 周辺用語
- RSA
- Ed25519
- 楕円曲線暗号
- エドワーズ曲線デジタル署名アルゴリズム


### 参考文献
- [SSH認証に最強の「Ed25519鍵」を使おう | LFI](https://linuxfan.info/ssh-ed25519)
- [SSH 鍵 - ArchWiki](https://wiki.archlinux.jp/index.php/SSH_%E9%8D%B5)
- [git clone したら、Permission denied (publickey).のエラー - Qiita](https://qiita.com/hatorijobs/items/92d8df363020a7f6d9fb)