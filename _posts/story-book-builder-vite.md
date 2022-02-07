---
title: storybook-builder-viteを使ってみる
date: '2022-01-09'
layout: layouts/post.njk
scheduled: '2022-01-09'
---


使ってみたら使用感的にとてもよかった。
ただ、
[Getting started with React, Vite and Storybook (on a new project)]((https://github.com/eirslett/storybook-builder-vite#getting-started-with-react-vite-and-storybook-on-a-new-project))の中で紹介されていた`@vitejs/app`がdeprecatedだったので、修正したものを紹介する。

```bash
npm init vite@latest vite-react-app -- --template react-ts && cd vite-react-app
npm install # or yarn
npx sb@next init --builder storybook-builder-vite && npm run storybook
```



関係ないが、[viteの公式テンプレート集](https://github.com/vitejs/awesome-vite#templates)などもあるのでこれから参考にバイトライフをEnjoyしようと思います


### 参考
- [https://github.com/eirslett/storybook-builder-vite#getting-started-with-react-vite-and-storybook-on-a-new-project](https://github.com/eirslett/storybook-builder-vite#getting-started-with-react-vite-and-storybook-on-a-new-project)
- [https://vitejs.dev/guide/#scaffolding-your-first-vite-project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [https://github.com/vitejs/awesome-vite#templates](https://github.com/vitejs/awesome-vite#templates)
