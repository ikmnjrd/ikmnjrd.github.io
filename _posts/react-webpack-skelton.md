---
title: reactスケルトン的な
date: '2020-03-01'
layout: layouts/post.njk
scheduled: '2020-03-01'
---

## リポジトリ
https://github.com/ikmnjrd/react-webpack-skelton

## 手順
`# npm init -y`

`# npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader`

package.jsonに追記
```json
"build": "webpack",
"watch": "webpack -w",
"start": "webpack serve"
```

`# npm i -S react react-dom react-router-dom @types/react @types/react-dom @types/react-router-dom`

tsconfig.json作成
```json
{
  "compilerOptions": {
    "sourceMap": true,
    // TSはECMAScript 5に変換
    "target": "ES5",
    // TSのモジュールはES Modulesとして出力
    "module": "ES2015",
    // JSXの書式を有効に設定
    "jsx": "react",
    "moduleResolution": "node",
    "lib": [
      "ES2020",
      "DOM"
    ]
  }
}
```

`webpack.config.js` を作成
```jsx
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.tsx",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],

	// ローカルサーバー（webpack-dev-server）
  devServer: {
		contentBase: `${__dirname}/dist`,
    hotOnly: true,
    port: 8080,
    host: '0.0.0.0',
  }
};
```

`/src` 配下に  `main.tsx` を作成
```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  return (
      <div>
        <h1>Hello React!</h1>
      </div>
  );
}

ReactDOM.render(<App/>, document.querySelector('#app'));
```



`/dist` にindex.htmlを作成
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my-app</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="main.js"></script>
  </body>
</html>
```


https://ics.media/entry/16329/

https://newcss.net/
