---
title: イベントキャプチャリングとバブリング（React）
categories: tech
date: '2022-01-17'
layout: layouts/post.njk
scheduled: '2022-01-17'
---
Reactはあまり関係ないです。

筆者はReactからWebの世界に入ったため、Reactの世界観からWeb標準技術を見ることが多いですが、Reactのドキュメントを読んでいるとWeb標準なのかReactの世界の話なのかがよくわからないまま進んでしまいます。そんな状況だったので、JavaScriptの勉強を改めてしていたところに「Reactをやっていて出てきた言葉だけど、なんかよくわからないからスルーしたやつだ！」と再会を果たしたので記念にこの記事を書いています。

### 例題

```javascript
function Hoge() {
  return (
    <div onClick={() => console.log("test")}>
      <p onClick={() => console.log("p")} >pだよ</p>
    </div>
  );
}
```
作成した`<p/>`をクリックすると次のようになります。これが何気なく目にしている挙動と書き方だと思います。

![実行結果1](https://i.gyazo.com/63f658d09ff5f2711823f9e01fc1c2a1.png)


次に`onClickCapture`という属性からconsole.logで結果を出力してみましょう。

```javascript
function Hoge() {
  return (
    <div onClickCapture={() => console.log("test")}>
      <p onClick={() => console.log("p")} >pだよ</p>
    </div>
  );
}
```

console.logで出力される順序が変わりました。

![実行結果2](https://i.gyazo.com/3fb88bf4ba65dbc23410e35d38cf89d9.png)

これはWEBの標準仕様、DOMのイベントフローに基づいた仕様なのでvanillaJSであろうが、Reactであろうが元の考え方は一緒です。


### イベントフロー
`キャプチャリングフェーズ` 親から子へイベントを見ていく処理
|
`ターゲットフェーズ` 発生源の要素に到達した後、その要素自体の処理
|
`バブリングフェーズ` 発生源から親へイベントを見ていく段階
参考: [https://www.w3.org/TR/DOM-Level-3-Events/#event-flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

### JavaScriptとReact
JavaScriptではaddEventListenrで初心者的に何も意識せずにイベントを追加すると、バブリングフェーズでイベントが発火します。

Reactでも通常、ほとんどのイベントでバブリングフェーズで発火します。
> 以下のイベントハンドラはイベント伝搬のバブリングフェーズで呼び出されます。キャプチャフェーズのイベントハンドラを登録するには、イベント名に Capture を追加します。たとえば、キャプチャフェーズでクリックイベントを処理するには onClick の代わりに onClickCapture を使用します。


### addEventListenerの第3引数（オプション）
第3引数にあたるものは`options`、もしくは`useCapture`のプロパティです。構造上、第3引数に急にBoolean(true/false)が現れたら、useCapture属性のことです。
以下に引用したMDNの小難しく感じる文章もそこそこ理解できるようになったのではないでしょうか。


- options
  - capture
    - Boolean値で、この型のイベントがDOMツリーで下に位置するEventTargetに配信dispatchされる前に、登録されたlistenerに配信されることを示します。
  - once
    - Boolean値で、listenerの呼び出しを一回のみのとしたいかどうかを値で指定します。trueを指定すると、listenerは一度実行された時に自動的に削除されます。
- useCapture
  - Boolean値で、この型のイベントが、DOMツリー内の下のEventTargetに配信される前に、登録されたlistenerに配信されるかどうかを示します。ツリーを上方向にバブリングしているイベントは、キャプチャーを使用するように指定されたリスナーを起動しません。イベントのバブリングとキャプチャーは、両方の要素がそのイベントのハンドラーを登録している場合に、別の要素内に入れ子になっている要素で発生するイベントを伝播する2つの方法です。イベント伝播モードは、要素がイベントを受け取る順番を決定します。詳細な説明は DOM Level 3 Events と JavaScript Event order を参照してください。指定されていない場合、useCaptureは既定でfalseとなります。


### 参考
- [https://uhyohyo.net/javascript/3_4.html](https://uhyohyo.net/javascript/3_4.html)
- [https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)
- [https://ja.reactjs.org/docs/events.html](https://ja.reactjs.org/docs/events.html)
- [https://ja.reactjs.org/blog/2020/08/10/react-v17-rc.html#no-event-pooling](https://ja.reactjs.org/blog/2020/08/10/react-v17-rc.html#no-event-pooling)
