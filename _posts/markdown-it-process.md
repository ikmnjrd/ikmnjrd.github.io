---
title: markdown-itのプラグイン開発に失敗したのでメモ
date: '2022-08-07'
tag:
  - JavaScript
  - Node.js
---

失敗したけど、悔しいので調べたことのメモとそのプラグインの[リポジトリ](https://github.com/ikmnjrd/markdown-it-bqcite)
作ろうとした機能は、`<blockquote/>` 内の特定prefixから始まる箇所を`<cite/>`で囲もうとういうもの。

```markdown
> 内容はこれ
> --- 出典はこれ
```
こんなのを

> 内容はこれ
> <cite>出典はこれ</cite>

こんな風に出力したかった

### markdown-itの処理の大きな流れ
1. ソース(.md)をToken単位にまずparse。この際、inlineやblockといった固まりで放置されるものがある。
2. 1.でparseしたものをStringとして出力しながらinlineやblockで放置されたものをそれぞれのルールに従いながらパース。パースしながら出力


### 流れ
MarkdownIt#render(src)

MarkdownIt#parse(src)

state = new this.core.State(src, this, env);
// Tokenクラスの読み込み初期化など

this.core.process(state)
// coreルールを順にstateを引き回しながら実行
// stateをToken[]にparse終了


MarkdownIt#renderer#renderを実行。token.typeがinlineならRenderer#renderInlineを実行。独自ルールのあるtoken.typeならそのルールを実行。どちらにも当てはまらないならRenderer#renderTokenを実行
```js
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};
```

Renderer#renderInlinの処理例


Renderer#renderTokenの処理例
Token.hiddenなら空文字を返す


ouTokensに追加?意味わからん



### テストに使ってた.md
```markdown
> this
> is
> test
> --- in-cite

<!-- >>> second
--- in-cite -->


<!-- >>> aaa
bbb
ccc -->

> `hoge`
> hoge

> link in cite
> --- [link](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
```