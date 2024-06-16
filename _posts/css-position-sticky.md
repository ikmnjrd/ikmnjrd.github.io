---
title: フッター固定のCSSトリックから学ぶsticky
description: 最優のフッター固定CSSからposition=stickyを動かして理解する
date: '2024-06-16'
tag:
  - HTML
  - CSS
---


## stickyを使ったフッターの実装
よく見る残念な実装に、コンテンツ量が少なくフッターが画面下に貼り付かないことがありますが、以下の例はコンテンツ量が少なくても大丈夫でこのコード量なので現時点でもっとも優れた実装だと思います。

```html
<html>
  <body>
    <main>
      ここには色々。100vhを超えるものも入ったり。
    </main>
    <footer>
      これはフッターです
    </footer>
  </body>
</html>
```

```css
body { min-height: 100%;}

body > footer {
  position: sticky;
  top: 100vh; // もしくはbottom: 0
}
```

## stickyの解説
そもそも、position: sticky とはMDNによれば

> `sticky`
> 要素は文書の通常のフローに従って配置され、直近のスクロールする祖先および包含ブロック（直近のブロックレベル祖先、表関連要素を含む）に対して top, right, bottom, left の値に基づいて相対配置されます。このオフセットは他の要素の配置には影響を与えません。
> この値は、常に新しい重ね合わせコンテキストを生成します。なお粘着要素は、直近の祖先がスクロールしない場合でも、「スクロールの仕組み」を持つ直近の祖先（overflow が hidden, scroll, auto, overlay として作成されたもの）に「粘着」します。
> <cite>引用元: [position - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/position#sticky)</cite>

難しい言葉がでてきますが、私なりに簡単に要約するなら「スクロールの機能を持つ直近の包含ブロックにくっつく」ことだと言ってみます。  

包含ブロックというのは「widthやheightを%指定したとき、その元となる要素（ブロック）」という理解でまずは大丈夫です。詳しくはMDNの[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/Containing_block#%E5%8C%85%E5%90%AB%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AE%E8%AD%98%E5%88%A5)のページで。



### stickyの理解のためのデモ

`try-change-height`クラスのheight指定部分を色々と触ってみてください。
<iframe src="https://codesandbox.io/p/devbox/position-sticky-ycj8mq?file=%2Fstyles.css&embed=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="position-sticky"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





### 参考文献
- [この実装方法は巧い！ コンテンツが少ない量でもフッタを一番下に配置するCSSのテクニック | コリス](https://coliss.com/articles/build-websites/operation/css/clever-sticky-footer-technique.html)
- [position - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/position#sticky)
- [レイアウトと包含ブロック - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Containing_block#%E5%8C%85%E5%90%AB%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AE%E8%AD%98%E5%88%A5)
