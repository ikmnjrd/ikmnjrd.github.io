---
title: GitHubにpushした時に特定コマンドの実行結果でマージ可否の設定
description: GitHubでpushした時にマージ可否を設定する
date: '2022-09-11'
tag:
  - GitHub
  - CI/CD
---

## 手順

ワークフローの設定（コード管理できるもの）とGitHubのUI上から設定するものに分けて考える

### ワークフローの設定

例として貼り付けますが、[ここ](https://docs.github.com/ja/actions/examples/using-scripts-to-test-your-code-on-a-runner)を参考にするなど自分の環境に合わせカスタマイズしてください。

```yaml
name: exec-tests
on:
  push:

jobs:
  status-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Use Node.js ${{ inputs.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'

      - name: Get Cache Dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install Dependencies
        run: npm ci

      - name: Create avif images dir
        run: mkdir tmp

      - name: Build
        run: npm run build
        env:
          NODE_OPTIONS: '--max_old_space_size=4096'

      - name: Check by linter
        run: npm run lint

      - name: Check by TypeScript Compiler
        run: npm run typecheck

      - name: Run Tests
        run: npm run test

```

### リポジトリ(Web上から)の設定

以下の画面から編集
![create-protection](https://i.gyazo.com/b5ca6098ced1849a751945e9e45d2c62.png)
mainブランチの保護をするため、「main」と入力。  
「Require status checks to pass before merging」にチェックを入れ、検索窓から「status-check」を入力、選択。  
![入力例1](https://i.gyazo.com/7e5c454ddc160cff2b14487e48a12504.png)

ここまで設定できると、以下のような画面で表示できる。
![動作例1](https://i.gyazo.com/ccf3105509cc3d866b5cc6ca9cf26524.png)

この設定だと警告が出るがマージはぽちぽちとクリックすればできてしまうので、「Do not allow bypassing the above settings」の設定もしておく。
![設定例2](https://i.gyazo.com/31b6721b6b8636087028d71c1f906445.png)

これでマージするにはコードの変更を余儀なくされる。
![動作例2](https://i.gyazo.com/bf39f63f875bc6ca659adbaca36bc357.png)

## 余談

### 意図通りいかなかったこと

`npm ci --ignore-scripts`コマンドを使って依存関係のインストールが爆速になるかと思ったら、ビルド時に画像フォーマットの変換に使っているsharpを対象に以下のエラーが出た。

> Error:  
> Something went wrong installing the "sharp" module
> Cannot find module '../build/Release/sharp-linux-x64.node'
> Require stack:
>   /home/runner/work/ikmnjrd.github.io/ikmnjrd.github.io/node_modules/sharp/lib/sharp.js

そのため、`$ npm ci`とした。

### 参考文献

- [スクリプトを使ってランナーでコードをテストする - GitHub Docs](https://docs.github.com/ja/actions/examples/using-scripts-to-test-your-code-on-a-runner)
