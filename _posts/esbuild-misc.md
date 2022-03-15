---
title: esbuildを触った際の雑記
description: esbuildについての雑記
date: '2022-03-15'
tag:
  - Node.js
  - JavaScript
  - esbuild
  - TypeScript
---

Viteを使った方が楽だけど、できるだけシンプルな環境を作りたい気持ちでesbuildを触っています。


### configファイルを作成する場合
watchオプションを有効にした時、ビルド情報を出力するため[logLevel](https://esbuild.github.io/api/#log-level)をinfoにすると良い。
```javascript
// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  logLevel: 'info',
})
```
```json
// package.json
{
  ...
  "scripts": {
    "build": "node esbuild.config.js",
  }
  ...
}
```



### CSS Module + TypeScriptで利用したい場合
`esbuild-css-modules-plugin`をインストールしPluginとして読み込む([GitHubリポジトリ](https://github.com/indooorsman/esbuild-css-modules-plugin))


declareファイルを`src/`以下に置いておく。
```typescript
// index.d.ts
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
```


### 周辺用語
- CSS modules
- PostCSS


### 参考文献
- [GitHubリポジトリ - esbuild](https://github.com/evanw/esbuild)
- [How to set up CSS Modules with esbuild](https://how-to.dev/how-to-set-up-css-modules-with-esbuild)
- [GitHubリポジトリ - esbuild-css-modules-plugin](https://github.com/indooorsman/esbuild-css-modules-plugin))
- [esbuild の機能が足りないならプラグインを自作すればいいじゃない](https://www.kabuku.co.jp/developers/create-your-own-esbuild-plugin)