---
title: V8エンジン（JavaScript）が吐くアセンブリを見たい！
date: '2022-01-09'
tag:
 - JavaScript
 - Node.js
---

アセンブリを読みたい願望がある。
nodeでもV8エンジンの`--print-code`オプションが使える。
```bash
$ node --print-code sample.js
$ d8 --print-code sample.js
```

実際に出力してみたけど、自分で書いたコード部分すら見つからず、わけわからんかった。
（Raw Codeとして出力されると紹介されていたが、見当たらなかった。）


### 参考
- [v8でjsとwasmのアセンブリを取る方法](https://zenn.dev/umashiba/articles/d64fb62a09fb4f)
- [GitHubの公式ミラーリポジトリ](https://github.com/v8/v8)
- [公式Gitリポジトリ](https://chromium.googlesource.com/v8/v8.git)
- [https://v8.dev/docs](https://v8.dev/docs)
