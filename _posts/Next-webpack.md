---
title: Next.jsがWebpackを使うから嫌いという話
date: '2022-02-09'
tag:
  - webpack
  - Next.js
  - JavaScript
---

今まであまりrequireとimportなどの違いを意識できていない人間。
Next.jsをプロジェクトに導入するのは賛成をとるが、個人のプロジェクトにはあまり使いたくないなーと思う程度の距離感を保っていた人間だった。現在無職。

しかし、新たな職場を探すにあたってReactは使うのにNext.jsを触ったことがないというのは自分の選択肢を狭めるだけだと考え、無職期間に作り直そうとしていたRuby(Jekyll)製ブログを、Next.jsのSSGの仕組みを用いて作ることにした。（本当はメジャーバージョンがリリースされたばかりのeleventy.jsを使って作りたかった。フレームワークに求めているもの的にもeleventyの方が合っていたと今も感じる。1週間ほどはeleventy.js製のブログだった時期もある。）

同リポジトリ内にマークダウンでブログ記事を上げるため、ビルド時に色々なものを生成したい要件が出てくる。Next.jsは内部でwebpackを使っていて`next.config.js`ではその一端を見ることができる。

```javascript
module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap.js')
    }
  }
}
```

webpackはCommonJSで書かれていることは事前知識として知っていた。

とは言ってもimportやexportが使いたい。`package.json`に`"type": "module"`を追加する方法などを試してみるが、最終的にproduction buildの際のfsモジュールが解決できないとか`Import trace for requested module:
./pages/_app.js`などのエラーメッセージを残して終了していくプログラムを見るとイライラしてくる。

勉強のためとはいえ、今度からNode.jsではなくDenoを使おうかなという気持ちになった。



### 周辺用語
- commonJS
- ESModules
- ES6(ES2015)

### 参考文献
- [Build a sitemap generator in Next.js - LogRocket Blog](https://blog.logrocket.com/build-sitemap-generator-nextjs/)
- [Support ES module format (ESM) in next.config.js #9607](https://github.com/vercel/next.js/issues/9607)
- [Support ES module format (ESM) in next.config.js #32239](https://github.com/vercel/next.js/discussions/32239)