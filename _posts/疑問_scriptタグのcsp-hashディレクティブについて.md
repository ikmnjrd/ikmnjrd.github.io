---
title: 疑問メモ_scriptタグのcsp-hashディレクティブについて
date: '2022-01-19'
layout: layouts/post.njk
scheduled: '2022-01-19'
---
### 疑問に遭遇した状況
ネットサーフィンをしていて`<head/>`を覗いていた

### 疑問
csp-hashディレクティブって何？なんのために使うの？

どうもcspは Content-Security-Policy の略っぽい。
```html
<script csp-hash>
  if (/Mac OS X/.test(navigator.userAgent))document.documentElement.classList.add('apple')
</script>
```

このブログがわかりやすかった気がしたが、わからなかった。[CSP(コンテンツセキュリティポリシー)について調べてみた - SSTエンジニアブログ](https://techblog.securesky-tech.com/entry/2020/05/21/)


### 参考文献
- [patterns.dev](https://www.patterns.dev/)
- [CSP(コンテンツセキュリティポリシー)について調べてみた - SSTエンジニアブログ](https://techblog.securesky-tech.com/entry/2020/05/21/)
