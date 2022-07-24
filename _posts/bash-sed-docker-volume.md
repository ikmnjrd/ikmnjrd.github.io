---
title: ネーミングを忘れて大量にできたdocker volumeをまとめて削除する方法
description: docker volumeをshellscriptでまとめて削除する方法
date: '2022-07-24'
tag:
  - shellscript
  - bash
---

### 結論
```bash
$ docker volume ls | sed -e 's/local[[:space:]]*//g' | grep -E '.{64,64}' | xargs docker volume rm
```

Driverの部分(localとスペース)を削除。
64文字の（ハッシュで自動生成された）ものをリストアップ。
削除（使用中のボリュームは削除されない）。

### 説明
気づいたら溜まってしまったdocker volumeたち。。
ふと確認してみたらえらいことになってしまっていた。
`$ docker volume ls
```txt
DRIVER    VOLUME NAME
local     1d516cb7225f448d8bb634875487b5eaa35d329696f77f3ae2347a3abb6aa94a
local     1fbaf3b6210ce64906fffdc1ecf9d711f2d25ebe99dfc2ca3ad3f3aca1a33801
local     3b4da7efd093305d43c40a004c22669f0b8ae8ac5f933c582a4168c9dff51763
local     4aada75a0a85dc48abf02fdff03aab5c3fafeaf096567b6517fc6faf62511749
local     5aa299e15cfeb3a5e3b41c1ab53a17382a11c64101918d916ee9d1e95b0e4672
local     5cd2395082c05f3acb1f910cf77fb5a1ba1c0e845f8522912a5a82a37e0946ce
local     5d76f9a14aa7462eedd428b33c6473125ecc9e442e88fcaabf06e946e20b19d9
local     5f4ba17454db26acce81f3b4ce02d31e270e3c585238db4019b3a2a8482e2238
local     6b4605498282f9b00b367551dfb3d121e7dcaa89626a3785d5dd2914d6138712
```

これらをまとめて消したい。（ハッシュ値ではなく名前をきちっとつけてたものは消したくない。）

`$ sed -e 's/local[[:space:]]*//g'`で加工して、
`$ grep -E '.{64,64}'`で加工して、
docker volume rmコマンドの引数に渡す

### ハマったポイント

`$ sed -e "s/'local[[:space:]]+'//g` とやってみたが
`+`を1文字以上のマッチでズバッといけると思ったが`local`の部分もまとめて残ってしまった。

`sed -e 's/local[[:space:]]*//g`これだとうまくいった。0文字以上だからなんか不具合起きそうとしたが...shecllscriptの正規表現はこれだから...

スペースやタブを`\s`や`\t`で検出しようとしてたが、色々みてたら`[[:space"]]`の方が確実っぽいような書き方してるのがちらちらと見えた気がする




### 参考文献
- [Regex Space character in Sed - Stack Overflow](https://stackoverflow.com/questions/15509536/regex-space-character-in-sed)
- [正しく理解できる！シェルスクリプトとPOSIXの正規表現（令和最新版）〜 基本正規表現BREと拡張正規表現EREについて - Qiita](https://qiita.com/ko1nksm/items/53abc144558b9bb5629f)