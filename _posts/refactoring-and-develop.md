---
title: リファクタリングしてますか？
description: 社のチーム内での共有に書いたメモの一部
date: '2024-04-27'
tag:
  - ポエム
  - リファクタリング
---


### 伝えたいことの結論
「リファクタリング」という言葉には新機能の追加タスクでも既存コードベースの改修が含まれる。

#### 自己紹介
前提として、私自身は小さな受託システム開発会社（50人規模）で働くWebエンジニアで主に新規開発を転々とやっています。


### いつやるか
コードを触る機会があったなら、それは常にリファクタリングするタイミング。

### 例え話
料金を表示するコードがあったとする。

```jsx
const price = 100

return (
  <div>
    {{
      price.toLocaleString("ja-JP", {
        style: "currency", currency: "JPY",
      })
    }}
  </div>
)
```

もし料金を国別の表にするという変更があったら、次のようにしたとする。  

```jsx
const priceJP = 100
const priceUS = 1

return (
  <div>
    <div>日本: {{
       priceJP.toLocaleString("ja-JP", {
         style: "currency", currency: "JPY",
       })
    }}</div>
    <div>米国: {{
       priceUS.toLocaleString("en-US", {
         style: "currency", currency: "USD",
       })
     }}</div>
  </div>
)
```

priceだったものが暗黙の了解として日本料金を示していたが、他の国が入ったことで暗黙の了解は崩れそれぞれを明示するに至った。  
私はこれをいい変更だと考えるものとして次の話に進む。  

### 実際によくあるやつ
この部分を既存コードの変更を嫌がって次のようにすることってまま稀によくあると思う。

```jsx
const price = 100 // 名前の変更もしない
const priceUS = 1 // 新しく追加
```

私はこういう時、変更の箇所が増えて自分が負わないでいい責任を負ってる感覚を味わうことがあるが、そこも含めてリファクタリングや仕様変更と呼びたい。  


しかもこういった部分は `price` のままにするとレビュワーからは差分にならないのでGitHub上から見えづらい。  

そのためレビュイーに頼る部分が多くなるが、善意でバグを発生させようとも善意を持ちたい（静的解析ツールを存分に頼ろう）