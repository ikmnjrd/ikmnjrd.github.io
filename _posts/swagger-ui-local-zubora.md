---
title: ズボラにローカルでswagger-uiを使う
description: ズボラにローカルでswagger-uiを使う
date: '2022-05-10'
tag:
  - Swagger
  - OpenAPI
---
### きっかけと対象読者
SwaggerことOpenAPI(以下、OAS)でドキュメントが書かれているが、特にそれが利用されているわけでもないプロジェクトに入ったばかりの頃（執筆している今）。
フロントエンドを中心に新規実装を担当していたが、APIの完成待ちの部分が多く、フロント・バックエンドともに未着手のAPI仕様を作る仕事が回ってきた。
手書きしてもいいが、どうせだったらOASの便利ツールにも手を出してみたくなったによるズボラ記事。
似た境遇じゃなきゃ以下の手順は参考にならないと思う。

### 手順
#### swagger-ui側
勝手にプロジェクトのリポジトリにインストールしたくないので、[git clone](https://github.com/swagger-api/swagger-ui)して使う。
`$ git clone git@github.com:swagger-api/swagger-ui.git && cd swagger-ui`
`$ cd swagger-ui`
`$ npm run dev`

localhost:3200でswagger-uiが起動するので開く

#### OASドキュメント側
`$ npm install -g http-server`
`$ cd {your-oas-document-dir}`
`$ http-server --cors`

localhost:8080でサーバー起動

![画面例](https://i.gyazo.com/5c53a9d6be78fafb5f4fda86a8d7d981.png)

テキストボックスに`http://localhost:8080/your-oas.json`などと入れてExploreボタンを押す。

### その他
swagger-ui起動時にはデフォルトで `https://petstore.swagger.io/v2/swagger.json`に接続される。

`swagger-ui/dev-helpers/dev-helper-initializer.js`に設定があったりするので、いじれる。ここらへんはしっかりと公式ドキュメントに書かれているのでぜひ見てみてください。
```javascript
// Build a system
  const ui = SwaggerUIBundle({
    url: "your-oas-file",
    dom_id: "#swagger-ui",
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    // requestSnippetsEnabled: true,
    layout: "StandaloneLayout"
  })
```

### 参考文献
- [how to load local .json file? · Issue #1110 · swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui/issues/1110#issuecomment-155873088)
- [治安のいいOpenAPIの開発環境を作る](https://tech.buysell-technologies.com/entry/2021/09/21/095238)
- [npm - swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [swagger-ui/setting-up.md at master · swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui/blob/master/docs/development/setting-up.md)