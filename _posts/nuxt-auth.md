---
title: Nuxt.jsのAuthモジュール(@nuxtjs/auth-next)をわからないなりにざっくり解説する
description: SPA・SSRの認証ライブラリらしい動きに焦点を当てて説明をする
date: '2023-05-21'
tag:
  - Nuxt.js
  - JavaScript
  - Vue
---

### TL;DR
- CookieとBrowser Storage(Local Storage)を使ってる
- Cookieが消失することを踏まえ、expires/max-ageは本来的な意味で使っていない

### 時勢の愚痴
Nuxt3.5のリリースが発表された最近ですが、nuxt-communityで開発されているAuthモジュールがいまだに3系に対応できておらず、よくわからん会社がNextAuth(Authentication for Next.js)をラップして作ってるものがNuxt3系をサポートしているよ！なんてことをREADMEに書く始末。  
そんなNuxtのAuthモジュールの、2系で動いてるものを見た時に理解した一部を説明します。

### 本解説の前提
ローカルスキーマを拡張した[リフレッシュスキーマ](https://auth.nuxtjs.org/schemes/refresh)をもとに解説しています。  
設定値の例としては以下です。
```js
auth: {
    cookie: {
      options: {
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 90
      }
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
      }
    }
}
```


### @nuxtjs/auth-nextの仕組み
認証に関わる情報が置かれる場所は主に以下の4つです。
- Local State(ライブラリ定義)
- Universal Storage(ライブラリ定義)
- Cookie(Web標準)
- Browser Storage(Local Storage)(Web標準)

Local Stateはローカルな変数やrefオブジェクトだと理解してもらうとして、CookieもBrowser Storageも情報の保存場所としては馴染み深いと思います。  
残るUniversal Storageは、gitでいうところのstagingエリアで、Local Stateに値を入れることをgit commitだと考えると良いかもです。

<img alt="手書き概要" src="https://i.gyazo.com/6f4ce193bc7158ddbc396e3743ebe384.png" height="250">

Universal Storageの必要性がないかと思われるかもしれませんが、次のような用途があります。  

Webサイトに初回のGETリクエストしたユーザーのブラウザに保存されてる認証情報から取り出せるのは基本的にCookieからのみです。  
そのため、期限が切れておらず正しい認証情報であれば、SSRをするのに必要な認証情報をLocal Stateに保存すればSSRした結果をユーザーが受け取れてハッピーですが、認証情報が切れている場合は最後までSSRさせてあげることができません。そんな時に役立つのがUniversal StateとBrowser Storageです。  

一般的にCookieよりもBrowser Storageに保存したデータの方が長くユーザーのブラウザ内で生き残ります。  
そのため、`@nuxtjs/auth-next`では、Cookieに保存する項目(key)が以下のようになっています。
- アクセストークン
- リフレッシュトークン
- アクセストークンの有効期限
- リフレッシュトークンの有効期限

Cookieには`expires/Max-Age`という項目がありますが、`@nuxtjs/auth-next`においてはデフォルトで2週間となっており、ドキュメント内で説明される有効期限とは`別物`となっています。そのため、
> アクセストークンの有効期限のvalue > `expires/Max-Age`
>
といった状況が生まれます。こうなった場合に`@nuxtjs/auth-next`では特に設定をしなくても使用することになっているBrowser Storageに保存していたアクセストークンやリフレッシュトークンの値を取り出し、認証チャレンジに使用することになっています。

<img alt="手書き概要2" src="https://i.gyazo.com/5ab80a9ae3b8ce6e8375aff6015ef72f.jpg" height="300">

ここまで読んでくれた人には申し訳ありませんが、私の理解はここまでです。

### CookieとBrowser Storageに分かれているメリット/デメリット
- メリット
  - Cookieのドメイン属性の変更をしてデプロイをしたとき、すでにユーザーが持ってるアクセストークン等が引き続き利用され、期限が切れたタイミングで新規Cookieに切り替わる
- デメリット
  - 複雑度が増す

### Nuxt3サポートがされない理由の考察
SPA/SSR/SSGモード、認証方式、fetchライブラリ、ストアなどの問題が一番絡み合い、当ライブラリとしても色々な認証方法をサポートしてきた歴史からも互換が切り切れず身動きが取れてない状態だと推測してます。  

超雑にようやくすると、「自分でやってくれ」というコメントが好意的なリアクションが多く、受け入れられているようです。
> It would be best if you had released this with at least some basic necessity modules (like auth). There are lots of people using Nuxt. Not all will get understand this thing they will have to do it on their own. It's good that you released it but its also affects people with extra burdens. Keep this in mind.
> 
> I am seeing many peoples not shifting to Nuxt 3 because of these basic things.
>
>People are just stuck in between because now you can't even install Nuxt 2 freshly. It throughs a Fatal error while running.
>
>Anyways, it's great to see you guys work so hard on so many things! I really appreciate your contributions to the world. No hard feelings! :)
> <cite>[Compatibility with Nuxt 3?
#1805](https://github.com/nuxt-community/auth-module/issues/1805#issuecomment-1328877117)</cite>

### 参考文献
- [GitHub - nuxt-community/auth-module: Zero-boilerplate authentication support for Nuxt.js!](https://github.com/nuxt-community/auth-module)
